import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bill } from 'src/app/common/bill.model';
import { BudgetService } from 'src/app/common/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  
  @Input() showEdit:boolean;
  @Input() bill:Bill;
  @Output() render = new EventEmitter<any>();

  constructor(
    private budgetService: BudgetService
  ) { }

  s1: Subscription;
  form: FormGroup;

  closePopup(){
    this.showEdit = false;
  }

  change(){
    let {amount, title} = this.form.value;
    let type: string = '';
    let id: number = this.bill.id;
    if(String(amount).indexOf('-') !== -1) {
      type = 'outcome';
      amount = Number(String(amount).substr(1));
    } else {
      type = 'income';
    }
    const bill: Bill = {amount, type, title, id};
    this.s1 = this.budgetService.update(bill)
      .subscribe(() => {
        this.render.emit();
        this.showEdit = false;
        this.form.setValue({
          amount: '',
          title: ''
        });
      });
  }

  ngOnInit(): void {
    if(this.bill) {
      if(this.bill.type == 'outcome') {
        this.bill.amount = Number('-' + this.bill.amount);
      }
      this.form = new FormGroup({
        amount: new FormControl(this.bill.amount, Validators.required),
        title: new FormControl(this.bill.title, [Validators.required, Validators.minLength(2)]),
      });
    }
  }

  ngOnDestroy(){
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
