import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UtilityService {

  static settings = window['settings'];
  static jsSerializer = window['jsSerializer'];

  /**
   * Alpha-numeric regex
   */
  static alphaNumericRegex = '^[a-zA-Z0-9]+$';
  /**
   * This method clears values on both local and session storage on window
   * @param keys: Array of keys to remove
   */
  static clearBrowserStorage(keys) {
    for (const i of keys) {
      window.localStorage.removeItem(i);
      window.sessionStorage.removeItem(i);
    }
  }

  /**
   * A simple function that forces round up-to 2 decimal places.
   */
  static roundToTwoDecimalPlaces (value) {
    return Math.round(value * 100) / 100;
  }

  /**
   * Facebook api for retrieving user's profile image with his/her ID
   */
  static facebookProfileImage(fbId) {
    return 'https://graph.facebook.com/' + fbId + '/picture?type=small';
  }

  /**
   * Function that converts javascript date to ISO 8601 string
   */
  static convertDateToBack(date): string {
    const obj = date.split(/[\/-]+/);
    const d = new Date(parseInt(obj[2], 0), parseInt(obj[1], 0) - 1, parseInt(obj[0], 0));
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /**
   * Converts an ISO 8601 string to Javascript date object
   */
  static convertDateToFront (date?) {
    let d = new Date();
    if (date) {
      const obj = date.split(/[/-]+/);
       d = new Date(parseInt(obj[2], 0), parseInt(obj[1], 0) - 1, parseInt(obj[0], 0));
    }
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('/');
  }

  /**
   * Extract records from local-storage by key and returns a JSON parsed value or null
   */
  static getFromLocalStorage(key) {
    return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  /**
   * Extract records from session-storage by key and returns a JSON parsed value or null
   */
  static getFromSessionStorage(key) {
    return (sessionStorage.getItem(key)) ? JSON.parse(sessionStorage.getItem(key)) : null;
  }

  static groupBy = (array: any, f: any) => {
    const groups: any = {};
    array.forEach(function (o: any) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  static alphanumericKeyDown(e) {
    return (e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode === 8);
  }

  static escapeKeyDown(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static cancelKeyDown(e) {
    if ((e.keyCode === 27) || (e.ctrlKey && e.keyCode === 81)) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static acceptKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static addKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 78) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static editKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 69) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static deleteKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 68) {
      e.preventDefault();
      return true;
    }
    return false;
  }

  static keyDown(e, add?, edit?, remove?, back?, accept?, cancel?) {
    if (UtilityService.addKeyDown(e) && add) {
      add();
    } else if (UtilityService.editKeyDown(e) && edit) {
      edit();
    } else if (UtilityService.deleteKeyDown(e) && remove) {
      remove();
    } else if (UtilityService.escapeKeyDown(e) && back) {
      back();
    } else if (UtilityService.acceptKeyDown(e) && accept) {
      accept();
    } else if (UtilityService.cancelKeyDown(e) && cancel) {
      cancel();
    }
  }

  static handleError(res): Observable<any> {
    if (res.status === 0) {
      return throwError(null);
    }
    return throwError(res);
  }
}
