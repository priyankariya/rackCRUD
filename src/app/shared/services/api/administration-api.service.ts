import { Injectable } from '@angular/core';


import { RequestService } from './request.service';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class AdministrationApiService {

  constructor(private requestService: RequestService, private coreService: CoreService) {}

  /**
   * Method for listing branch
   *
   * @param searchParams: Object that is given as input payload to backend service
   * 1. name: name of branch
   *
   *  example: data = { name: 'jo' } retrieves the branches contains letter 'jo'
   */
  listBranch(searchParams?: {username: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/branch/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  listBranchMenu(searchParams?: {client_id: number}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/branch/menu/',
      'get',
      true,
      true,
      searchParams
    );
  }

  /**
   * Method for creating new branch
   *
   * @param data: Object that are given as input payload to backend service
   *  1. name (Indicates the branch's name)
   *  2. branchType (Type of Branch)
   *  3. displayName (Display name for the branch)
   *  4. address (Location of the Branch)
   *  5. mobile (Branch verified mobile no)
   *  6. phone (Branch verified phone no)
   *  7. email (Branch verified email)
   *  8. dlNo (Drug license number of the branch)
   *  9. users (Users assigned for the branch)
   *
   *  example: data = { name: 'john', branchType: 2, displayName: 'John', users: [1, 2] } register the user his information on success
   */
  createBranch(data: {name: string, branchType: number, displayName?: string, address?: string; mobile?: string, phone?: string,
    email?: string, dlNo?: string, users?: number[]}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/branch/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  /**
   * Method for retrieving an branch's information
   *
   * @param data: Object that are given as input payload to backend service
   *  1. id: id of the branch
   *
   *  example: data = { id: 5 } retrieves the branch having id 5
   */
  getBranch(data: {id: number}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/branch/' + data.id + '/',
      'get',
      true,
      true,
      undefined,
      data
    );
  }

  /**
   * Method for updating a branch
   *
   * @param data: Object that are given as input payload to backend service
   *  1. id (Indicates the branch's id)
   *  2. name (Indicates the branch's name)
   *  3. branchType (Type of Branch)
   *  4. displayName (Display name for the branch)
   *  5. address (Location of the Branch)
   *  6. mobile (Branch verified mobile no)
   *  7. phone (Branch verified phone no)
   *  8. email (Branch verified email)
   *  9. dlNo (Drug license number of the branch)
   *  10. users (Users assigned for the branch)
   *
   *  example: data = { id: 5, name: 'john', branchType: 2, displayName: 'John', users: [1, 2] } updates the branch which has id 5
   */
  updateBranch(data: {id: number, name: string, branchType: number, displayName?: string, address?: string; mobile?: string, phone?: string,
    email?: string, dlNo?: string, users?: number[]}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/branch/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  listFinancialYear(searchParams?: {username: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/financial-year/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  createFinancialYear(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/financial-year/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  getFinancialYear(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/financial-year/' + id + '/',
      'get',
      true,
      true,
    );
  }

  updateFinancialYear(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/financial-year/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteFinancialYear(id: number ) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/financial-year/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  updateVoucherNumbering(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/voucher-numbering/',
      'post',
      true,
      false,
      undefined,
      data
    );
  }

  getVoucherNumbering(searchParams: {financial_year_id: number, branch_id: number}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/administration/voucher-numbering/',
      'get',
      true,
      true,
      searchParams
    );
  }

}
