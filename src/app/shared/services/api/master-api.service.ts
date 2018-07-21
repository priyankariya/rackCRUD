import { Injectable } from '@angular/core';


import { RequestService } from './request.service';
import { LedgerSetInterface, LedgerListInterface } from '../../interfaces/ledger';
import { LedgerGroupSetInterface, LedgerGroupListInterface } from '../../interfaces/ledger-group';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class MasterApiService {

  constructor(private requestService: RequestService, private coreService: CoreService) {
  }

  createLedger(dataParams: LedgerSetInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listLedger(searchParams: LedgerListInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getLedger(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateLedger(data: LedgerSetInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteLedger(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createLedgerGroup(dataParams: LedgerGroupSetInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger-group/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listLedgerGroup(searchParams: LedgerGroupListInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger-group/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getLedgerGroup(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger-group/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateLedgerGroup(data: LedgerGroupSetInterface) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger-group/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteLedgerGroup(id: number ) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger-group/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createSection(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/section/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  listSection(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/section/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getSection(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/section/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateSection(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/section/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteSection(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/section/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createTherapy(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/therapy/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  listTherapy(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/therapy/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getTherapy(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/therapy/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateTherapy(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/therapy/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteTherapy(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/therapy/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }


  createUnit(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  listUnit(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  listSecondaryUnit(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/secondary-list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getUnit(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateUnit(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteUnit(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/unit/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createSalt(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/salt/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  listSalt(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/salt/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getSalt(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/salt/' + id + '/',
      'get',
      true,
      true,
    );
  }

  updateSalt(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/salt/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteSalt(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/salt/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createRack(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/rack/create/',
      'post',
      true,
      true,
      undefined,
      data
    );
  }

  listRack(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/rack/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getRack(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/rack/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateRack(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/rack/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteRack(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/rack/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createManufacturer(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/manufacturer/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listManufacturer(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/manufacturer/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getManufacturer(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/manufacturer/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateManufacturer(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/manufacturer/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteManufacturer(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/manufacturer/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createTax(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/tax/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listTax(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/tax/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getTax(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/tax/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateTax(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/tax/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteTax(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/tax/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createProduct(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  createOpeningInventory(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/' + data.id + '/opening/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  listProduct(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getProduct(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateProduct(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteProduct(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/product/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  listDrugSchedule(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/drug-schedule/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  createVoucherModel(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-model/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listVoucherModel(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-model/list/',
      'get',
      true,
      true,
      searchParams,
      undefined
    );
  }

  getVoucherModel(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-model/' + id + '/',
      'get',
      true,
      true
    );
  }


  updateVoucherModel(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-model/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteVoucherModel(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-model/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  getLedgerCash(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/ledger/' + id + '/balance/',
      'get',
      true,
      true
    );
  }

  listVoucherLedger(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/master/voucher-ledger/list/',
      'get',
      true,
      true,
      searchParams
    );
  }
}
