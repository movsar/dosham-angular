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

  // Use async/await to handle the Promise returned by the mutate method
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

    try {
      // Make the request
      const response = await firstValueFrom(this.apollo.query<any>({
        query: GET_RANDOMS_QUERY,
        variables: { count },
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
