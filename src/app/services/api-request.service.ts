import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

interface RequestResult {
  success: boolean;
  errorMessage: string;
  serializedData: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(private apollo: Apollo) { }

  public async findEntries(inputText: string): Promise<RequestResult> {
    const method = "find";
    const FIND_ENTRIES_QUERY = gql`
      query ${method}($inputText: String!) {
        ${method}(inputText: $inputText) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    return await this.makeRequest(method, FIND_ENTRIES_QUERY, { inputText }, 'network-only');
  }

  public async getRandomEntriesRequest(count: number): Promise<RequestResult> {
    const method = "randomEntries";
    const GET_RANDOMS_QUERY = gql`
      query ${method}($count: Int!) {
        ${method}(count: $count) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    return await this.makeRequest(method, GET_RANDOMS_QUERY, { count }, 'network-only');
  }

  private async makeRequest(method: any, query: any, variables: any, fetchPolicy: any): Promise<RequestResult> {
    try {
      // Make the request
      const response = await firstValueFrom(this.apollo.query<any>({
        query: query,
        variables: variables,
        fetchPolicy: fetchPolicy,
      }));

      // Check whether the request has been made successfully
      if (!response || !response.data) {
        throw new Error('GraphQL request failed');
      }

      // Extract the response data
      const data = response.data[method];
      return data;
    } catch (error) {
      throw error; // or handle the error as needed
    }
  }
}
