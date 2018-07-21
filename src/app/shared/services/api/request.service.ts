import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { ApiUtils } from './api-utils';
import { UtilityService } from '../utility.service';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class RequestService {
  constructor(private httpClient: HttpClient, private coreService: CoreService) {}

  request(url: string, type: string, auth: boolean, hasReturnValue: boolean, searchParams?: any, data?: any): Observable<any> {
    let response: any;
    switch (type) {
      case 'post':
        response = this.httpClient.post(url, ApiUtils.convertToSnakeCase(data),
          { headers: this.coreService.authHeaders(auth), params: searchParams, responseType: 'text' });
        if (hasReturnValue) {
          return response.pipe(
            map((result: any) => ApiUtils.convertToCamelCase(JSON.parse(result))),
            catchError(res => UtilityService.handleError(res))
          );
        }
        return response;

      case 'put':
        response =  this.httpClient.put(url, ApiUtils.convertToSnakeCase(data),
          { headers: this.coreService.authHeaders(auth), params: searchParams, responseType: 'text' });
        if (hasReturnValue) {
          return response.pipe(
            map((result: any) => ApiUtils.convertToCamelCase(JSON.parse(result))),
            catchError(res => UtilityService.handleError(res))
          );
        }
        return response;

      case 'get':
        response = this.httpClient.get(url,
          { headers: this.coreService.authHeaders(auth), params: searchParams, responseType: 'text' });
        if (hasReturnValue) {
          return response.pipe(
            map((result: any) => ApiUtils.convertToCamelCase(JSON.parse(result))),
            catchError(res => UtilityService.handleError(res))
          );
        }
        return response;

      case 'delete':
        response = this.httpClient.delete(url,
          { headers: this.coreService.authHeaders(auth), params: searchParams, responseType: 'text' });
        if (hasReturnValue) {
          return response.pipe(
            map((result: any) => ApiUtils.convertToCamelCase(JSON.parse(result))),
            catchError(res => UtilityService.handleError(res))
          );
        }
        return response;

      default:
        return new Observable<any>();
    }
  }
}
