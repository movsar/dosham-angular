import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { IFiltrationFlags } from '../models/filtration-flags.model';
import { RecordType } from '../enums/record-type.enum';
import { EntryType } from '../models/entry.model';

interface RequestResult {
  success: boolean;
  errorMessage: string;
  serializedData: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  FETCH_POLICY_CACHE_FIRST = 'cache-first';
  FETCH_POLICY_NETWORK_ONLY = 'network-only';

  constructor(private apollo: Apollo) {}

  public async logInEmailPassword(email :string, password :string): Promise<RequestResult> {
    const method = 'loginEmailPassword';
    const FIND_ENTRIES_QUERY = gql`
      mutation ${method}($email: String!, $password: String!) {
        ${method}(email: $email, password: $password) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    const variables = {
      email: email,
      password: password,
    };

    const response = await this.makeRequest(
      method,
      FIND_ENTRIES_QUERY,
      variables,
      this.FETCH_POLICY_CACHE_FIRST
    );
    return response;
  }

  public async getCount(
    recordType: RecordType,
    filtrationFlags: IFiltrationFlags
  ): Promise<RequestResult> {
    const method = 'count';
    const FIND_ENTRIES_QUERY = gql`
      query ${method}($recordTypeName: String!, $filtrationFlags: FiltrationFlagsInput) {
        ${method}(recordTypeName: $recordTypeName, filtrationFlags: $filtrationFlags) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    const variables = {
      recordTypeName: RecordType[recordType],
      filtrationFlags: this.adjustFiltrationFlags(filtrationFlags),
    };

    const response = await this.makeRequest(
      method,
      FIND_ENTRIES_QUERY,
      variables,
      this.FETCH_POLICY_CACHE_FIRST
    );
    return response;
  }

  public async take(
    recordType: RecordType,
    offset: number,
    limit: number,
    filtrationFlags: IFiltrationFlags
  ): Promise<RequestResult> {
    const method = 'take';
    const FIND_ENTRIES_QUERY = gql`
      query ${method}($recordTypeName: String!, $offset: Int!, $limit: Int!, $filtrationFlags: FiltrationFlagsInput) {
        ${method}(recordTypeName: $recordTypeName, offset: $offset, limit: $limit, filtrationFlags: $filtrationFlags) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    const variables = {
      recordTypeName: recordType.toString(),
      offset,
      limit,
      filtrationFlags: this.adjustFiltrationFlags(filtrationFlags),
    };

    const response = await this.makeRequest(
      method,
      FIND_ENTRIES_QUERY,
      variables,
      this.FETCH_POLICY_CACHE_FIRST
    );
    return response;
  }

  public async findEntries(inputText: string): Promise<RequestResult> {
    const method = 'find';
    const FIND_ENTRIES_QUERY = gql`
      query ${method}($inputText: String!) {
        ${method}(inputText: $inputText) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    return await this.makeRequest(
      method,
      FIND_ENTRIES_QUERY,
      { inputText },
      this.FETCH_POLICY_CACHE_FIRST
    );
  }

  public async getRandomEntriesRequest(count: number): Promise<RequestResult> {
    const method = 'randomEntries';
    const GET_RANDOMS_QUERY = gql`
      query ${method}($count: Int!) {
        ${method}(count: $count) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    return await this.makeRequest(
      method,
      GET_RANDOMS_QUERY,
      { count },
      this.FETCH_POLICY_NETWORK_ONLY
    );
  }

  private async makeRequest(
    method: any,
    query: any,
    variables: any,
    fetchPolicy: any
  ): Promise<RequestResult> {
    try {
      // Make the request
      const response = await firstValueFrom(
        this.apollo.query<any>({
          query: query,
          variables: variables,
          fetchPolicy: fetchPolicy,
        })
      );

      // Check whether the request has been made successfully
      if (!response || !response.data) {
        throw new Error('GraphQL request failed');
      }

      // Extract the response data
      const data = response.data[method];
      return data;
    } catch (error: any) {
      throw error.networkError.error?.errors;
    }
  }

  adjustFiltrationFlags(filtrationFlags: IFiltrationFlags) {
    // Create a deep copy of the filtrationFlags object
    const modifiedFiltrationFlags: any = JSON.parse(
      JSON.stringify(filtrationFlags)
    );

    // Modify entryTypes in the copy
    if (modifiedFiltrationFlags.entryFilters?.entryTypes) {
      modifiedFiltrationFlags.entryFilters.entryTypes =
        modifiedFiltrationFlags.entryFilters.entryTypes.map((type: EntryType) =>
          EntryType[type].toUpperCase()
        );
    }

    return modifiedFiltrationFlags;
  }
}
