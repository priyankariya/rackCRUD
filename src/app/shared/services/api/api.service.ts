import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ApiService {

  remoteConnectivity: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleError(res): Observable<any> {
    if (res.status === 0) {
      this.remoteConnectivity.emit(false);
      return throwError(null);
    }
    return throwError(res);
  }
}
