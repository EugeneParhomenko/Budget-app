import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BudgetComponent } from './budget/budget.component';
import { AddComponent } from './budget/add/add.component';
import { EditComponent } from './budget/edit/edit.component';
import { BudgetService } from './common/budget.service';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BudgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
