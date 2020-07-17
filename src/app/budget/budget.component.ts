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

  showEdit: boolean = false;

  render() {
    this.s1 = this.budgetService.getList()
    .subscribe((list: Bill[]) => {
      list.filter((i) => {
        const t = Object.assign({}, i);
        if(t.type == 'income'){
          this.incomeList.push(t);
          this.total = this.total + t.amount;
        } 
        if(t.type == 'outcome'){
          this.outcomeList.push(t);
          this.total = this.total - t.amount;
        } 
      });
    });
  }

  toggleEdit(show:boolean) {
    return show = !show;
  }
  

  ngOnInit(): void {
    this.render();
  }

  ngOnDestroy() {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
