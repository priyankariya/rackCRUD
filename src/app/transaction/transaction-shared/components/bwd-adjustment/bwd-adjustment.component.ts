import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { TransactionApiService } from '../../../../shared/services/api/transaction-api.service';

@Component({
  selector: 'app-bwd-adjustment',
  templateUrl: 'bwd-adjustment.component.html',
  styleUrls: ['bwd-adjustment.component.scss']
})
export class BwdAdjustmentComponent implements OnInit {
  transactionAdjusted: EventEmitter<any> = new EventEmitter<any>();
  accountTransaction;
  bwd = [];
  newRef = {id: null, adjId: null, refNo: null, amount: null};
  pending: any[] = [];
  adjustment = 0;

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 27) {
      this.transactionAdjusted.emit(undefined);
    }
  }

  constructor(private transactionApiService: TransactionApiService) {}

  ngOnInit() {
    this.adjustment = (this.accountTransaction.debit) ? this.accountTransaction.debit : this.accountTransaction.credit * (-1);
    this.transactionApiService.listPending({
      ledger_id: this.accountTransaction.ledger.id,
      position: (this.adjustment > 0) ? 'dr' : 'cr'
    }).subscribe((resultPending) => {
      for (const i of resultPending) {
        i.id = null;
        i.amount = null;
        for (const j of this.accountTransaction.bwd || []) {
          if (j.id === j.adjId) {
            this.newRef = {id: j.id, refNo: null, adjId: j.adjId, amount: Math.abs(j.amount)};
          } else if (i.adjId === j.adjId) {
            i.id = j.id;
            i.amount = Math.abs(j.amount);
          }
        }
        this.pending.push({
          id: i.id,
          adjId: i.adjId,
          refNo: i.refNo,
          billAmount: Math.abs(i.billAmount),
          pendingAmount: Math.abs(i.pendingAmount),
          amount: i.amount
        });
      }
    });
  }

  save() {
    let adjusted = 0;
    for (const i of this.pending) {
      adjusted += (this.adjustment > 0) ? i.amount : i.amount * (-1);
    }
    const adj = (this.adjustment > 0) ? this.newRef.amount : (this.newRef.amount * (-1));
    if (adj + adjusted === this.adjustment) {
      if (this.newRef.amount > 0) {
        this.newRef.amount = (this.adjustment > 0) ? this.newRef.amount : this.newRef.amount * (-1);
        this.newRef.refNo = 'New Ref';
        this.bwd.push(this.newRef);
      }
      for (const i of this.pending) {
        if (i.amount > 0) {
          this.bwd.push({
            id: i.id || null,
            adjId: i.adjId,
            refNo: i.refNo,
            amount: (this.adjustment > 0) ? i.amount : i.amount * (-1)
          });
        }
      }
      this.accountTransaction.bwd = this.bwd;
      this.transactionAdjusted.emit(this.accountTransaction);
    }
  }
}

