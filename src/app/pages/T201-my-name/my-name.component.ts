import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 't201-my-name',
  templateUrl: './my-name.component.html',
  styleUrls: ['./my-name.component.scss']
})
export class MyNameComponent implements OnInit {

  public title = environment.t201_my_name.title;

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenClick() {

  }

  public onSaveClick() {

  }
}
