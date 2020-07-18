import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bill } from 'src/app/common/bill.model';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/common/budget.service';

@Component({
  selector: 'edm-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  @Output() render = new EventEmitter<any>();

  constructor(
    private budgetService: BudgetService
  ) { }

  form: FormGroup;
  s1: Subscription;

  add(){
    let {amount, title} = this.form.value;
    let type: string = '';
    if(String(amount).indexOf('-') !== -1) {
      type = 'outcome';
      amount = Number(String(amount).substr(1));
    } else {
      type = 'income';
    }
    const bill: Bill = {amount, type, title};
    this.s1 = this.budgetService.add(bill)
      .subscribe(() => {
        this.form.setValue({
          amount: '',
          title: ''
        });
        this.render.emit();
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  ngOnDestroy() {
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
