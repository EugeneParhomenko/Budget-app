import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edm-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor() { }
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }

}
