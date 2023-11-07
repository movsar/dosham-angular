import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private _requestService: ApiRequestService) { }

  Search(s: string) {

  }

  async GetRandoms(count: number) {
    console.log("get randoms");
    try {
      const result = await this._requestService.getRandomsRequest(count);

      if (result.success && result.serializedData) {
        // Deserialize the serialized data
        return JSON.parse(result.serializedData);
      } else {
        // Handle the error scenario
        throw new Error(result.errorMessage);
      }
    } catch (error) {
      console.error('Error in useGetRandomsMethod:', error);
      throw error; // rethrow the error or return a default value
    }
  }
}
