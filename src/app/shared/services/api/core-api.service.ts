import { Injectable } from '@angular/core';

import { RequestService } from './request.service';
import { CoreService } from '../../../core/core.service';
import { UtilityService } from '../utility.service';


@Injectable()
export class CoreApiService {

  constructor(private coreService: CoreService, private requestService: RequestService) { }

  ping() {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/ping/',
      'get',
      false,
      false,
      false
    );
  }

  registerClient(data: {displayName: string, activationKey: string, baseboard: string}) {
    return this.requestService.request(
      this.coreService.api + '/api/register-client/',
      'post',
      false,
      true,
      undefined,
      data
    );
  }

  validateClient(data: {clientId: string, token: string, si: any}) {
    return this.requestService.request(
      this.coreService.api + '/api/validate-client/',
      'post',
      false,
      true,
      undefined,
      data
    );
  }

  listOrganization(searchParams: {client_id: number}) {
    return this.requestService.request(
      this.coreService.api + '/api/organization/',
      'get',
      false,
      true,
      searchParams
    );
  }

  listClient(searchParams: {name: string}) {
    searchParams['organization_id'] = this.coreService.getProperty('organization').id;
    return this.requestService.request(
      this.coreService.api + '/api/client/',
      'get',
      false,
      true,
      searchParams
    );
  }

  /**
   * Method for logging a user in
   *
   * @param data: Object that are given as input payload to backend service
   *  1. username (Indicates the user's name)
   *  2. password (Indicates the user's password)
   *
   *  example: data = { username: 'john', password: 'wick' } logs the user in and returns the user's information on success
   */
  login(data: {username: string, password: string, organization: number}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain  + '/core/api/user/login/',
      'post',
      false,
      true,
      undefined,
      data
    );
  }

  /**
   * Method for registering a user
   *
   * @param data: Object that are given as input payload to backend service
   *  1. username (Indicates the user's name)
   *  2. password (Indicates the user's password)
   *  3. email (Indicates the user's email)
   *
   *  example: data = { username: 'john', password: 'wick', email: 'johwick@somemail.com' } register the user his information on success
   */
  register(data: {username: string, password: string, email?: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/user/register/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  /**
   * Method for retrieving an user's information
   *
   * @param data: Object that are given as input payload to backend service
   *  1. id: id of an user
   *
   *  example: data = { id: 5 } retrieves the user having id 5
   */
  getUser(data: {id: number}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/user/' + data.id + '/',
      'get',
      true,
      true,
      undefined,
      data
    );
  }

  /**
   * Method for updating an user
   *
   * @param data: Object that are given as input payload to backend service
   *  1. id: id of an user
   *  2. username (Indicates the user's name)
   *  3. email (Indicates the user's email)
   *
   * example: data = { id: 5, username: 'john' } updates the user with payload data.
   */
  updateUser(data: {id: number, username: string, email?: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/user/' + data.id + '/update/',
      'put',
      true,
      false,
      undefined,
      data
    );
  }

  /**
   * Method for listing application users
   *
   * @param searchParams: Object that is given as input payload to backend service
   * 1. username: username of user
   *
   *  example: data = { username: 'jo' } retrieves the users whose username contains letter jo
   */
  listUser(searchParams?: {username: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/user/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  /**
   * This method returns all actions that are available for users
   */
  listAction() {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/action/list/',
      'get',
      true,
      true
    );
  }

  listTaxType(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/tax-type/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  listVoucherType(searchParams?) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/core/api/voucher-type/list/',
      'get',
      true,
      true,
      searchParams
    );
  }
}
