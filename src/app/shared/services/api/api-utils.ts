import { HttpHeaders } from '@angular/common/http';


import * as _ from 'lodash';
import { UtilityService } from '../utility.service';


export class ApiUtils {
  /**
   * This method is responsible for converting snake-case objects to camel-case object
   * Works for nested objects and arrays recursively
   */
  static convertToCamelCase (obj) {
    let camelCaseObject = _.cloneDeep(obj);

    if (_.isArray(camelCaseObject)) {
      return _.map(camelCaseObject, ApiUtils.convertToCamelCase);
    } else {
      camelCaseObject = _.mapKeys(camelCaseObject, (value, key: any) => {
        return _.camelCase(key);
      });

      // Recursively apply throughout object
      return _.mapValues(camelCaseObject, (value) => {
        if (_.isPlainObject(value)) {
          return ApiUtils.convertToCamelCase(value);
        } else if (_.isArray(value)) {
          return _.map(value, ApiUtils.convertToCamelCase);
        } else {
          return value;
        }
      });
    }
  }

  /**
   *
   * @param auth: A boolean parameter that states the authenticity of the HTTP header.
   * @returns: Generates a HTTP header based on the input parameter.
   */
  static AuthHeaders(auth: boolean): HttpHeaders {
    if (auth) {
      const loggedInUser = UtilityService.getFromLocalStorage('user');
      if (loggedInUser && loggedInUser.token) {
        return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT ' + loggedInUser.token);
      }
    }
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  /**
   * This method is responsible for converting camel-case objects to snake-case object
   * Works for nested objects and arrays recursively
   */
  static convertToSnakeCase(oldObject) {
    let newObject;

    if (
      !oldObject ||
      typeof oldObject !== 'object' ||
      !Object.keys(oldObject).length
    ) {
      return oldObject;
    }

    if (Array.isArray(oldObject)) {
      newObject = oldObject.map(element =>
        ApiUtils.convertToSnakeCase(element)
      );
    } else {
      newObject = {};
      Object.keys(oldObject).forEach(oldKey => {
        const newKey = _.snakeCase(oldKey);
        newObject[newKey] = ApiUtils.convertToSnakeCase(oldObject[oldKey]);
      });
    }

    return newObject;
  }
}
