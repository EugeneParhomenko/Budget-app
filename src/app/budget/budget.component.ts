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
  s2:Subscription;
  incomeList: Bill[] = [];
  outcomeList: Bill[] = [];
  bill: Bill;

  showEdit: boolean = false;

  render() {
    this.incomeList = [];
    this.outcomeList = [];
    this.total = 0;

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

  toggleEdit(){
    this.showEdit = !this.showEdit;
  }

  delete(id: string){
    this.budgetService.delete(`bill/${id}`).subscribe(
      ()=>{
        console.log(`${id} deleted`);
        this.render();
      },
      (err) => console.log(err)
    );
  }

  edit(id:string) {
    this.s2 = this.budgetService.getItem(id)
      .subscribe((bill: Bill) => {
        this.bill = bill;
        this.showEdit = true;
      });
  }
  

  ngOnInit(): void {
    this.render();
  }

  ngOnDestroy() {
    if(this.s1) {
      this.s1.unsubscribe();
    }
    if(this.s2) {
      this.s2.unsubscribe();
    }
  }

}
