import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FetchResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';

interface RequestResult {
  success: boolean;
  errorMessage: string;
  serializedData: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(private apollo: Apollo) {}

  // Use async/await to handle the Promise returned by the mutate method
  public async getRandomsRequest(count: number): Promise<RequestResult> {
    const GET_RANDOMS_MUTATION = gql`
      mutation getRandoms($count: Int!) {
        getRandoms(count: $count) {
          success
          errorMessage
          serializedData
        }
      }
    `;

    try {
      // Await the mutate method which returns a Promise
      const result = await this.apollo.mutate<RequestResult>({
        mutation: GET_RANDOMS_MUTATION,
        variables: { count },
      }).toPromise(); // convert the Observable to a Promise

      // Check if the result has data and return it, or throw an error
      if (result?.data) {
        return result.data;
      } else {
        throw new Error('No data received from the GraphQL mutation');
      }
    } catch (error) {
      throw error; // or handle the error as needed
    }
  }
}
