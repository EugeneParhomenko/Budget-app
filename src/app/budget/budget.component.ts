import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bill } from '../common/bill.model';
import { BudgetService } from '../common/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edm-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {

  constructor(
    private budgetService: BudgetService
  ) { }

  total = 0;
  s1:Subscription;
  incomeList: Bill[] = [];
  outcomeList: Bill[] = [];

  renderIncome() {
    this.s1 = this.budgetService.getList()
    .subscribe((list: Bill[]) => {
      list.filter((i) => {
        const t = Object.assign({}, i);
        console.log(t);
        if(t.type = 'income'){
          return this.incomeList.push(t);
        } 
      });
      console.log('Render INCOME');
      console.log(this.incomeList);
    });
  }

  renderOutcome() {
    this.s1 = this.budgetService.getList()
    .subscribe((list: Bill[]) => {
      list.filter((i) => {
        const t = Object.assign({}, i);
        if(t.type = 'outcome'){
          return this.outcomeList.push(t);
        } 
      });
      console.log('Render OUTCOME');
      console.log(this.outcomeList);
    });
  }
  

  ngOnInit(): void {
    this.renderOutcome();
    this.renderIncome();
  }

  ngOnDestroy() {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
