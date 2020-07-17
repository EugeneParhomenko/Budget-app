import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BudgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
