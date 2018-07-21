import { Injectable } from '@angular/core';


import { RequestService } from './request.service';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class TransactionApiService {

  constructor(private requestService: RequestService, private coreService: CoreService) {}

  createJournal(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/journal/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listJournal(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/journal/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getJournal(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/journal/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateJournal(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/journal/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteJournal(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/journal/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  listPending(searchParams: {ledger_id: number, position: string}) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/pending/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  createContra(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/contra/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listContra(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/contra/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getContra(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/contra/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateContra(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/contra/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteContra(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/contra/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createPayment(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/payment/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listPayment(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/payment/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getPayment(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/payment/' + id + '/',
      'get',
      true,
      true
    );
  }

  updatePayment(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/payment/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deletePayment(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/payment/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }

  createReceipt(dataParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/receipt/create/',
      'post',
      true,
      true,
      undefined,
      dataParams
    );
  }

  listReceipt(searchParams) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/receipt/list/',
      'get',
      true,
      true,
      searchParams
    );
  }

  getReceipt(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/receipt/' + id + '/',
      'get',
      true,
      true
    );
  }

  updateReceipt(data) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/receipt/' + data.id + '/update/',
      'put',
      true,
      true,
      undefined,
      data
    );
  }

  deleteReceipt(id: number) {
    return this.requestService.request(
      this.coreService.getProperty('organization').domain + '/pharmacy/api/transaction/receipt/' + id + '/delete/',
      'delete',
      true,
      false
    );
  }
}
