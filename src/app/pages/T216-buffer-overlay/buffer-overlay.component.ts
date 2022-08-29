import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 't216-buffer-overlay',
  templateUrl: './buffer-overlay.component.html',
  styleUrls: ['./buffer-overlay.component.scss']
})
export class BufferOverlayComponent implements OnInit {

  public title = environment.t216_buffer_overlay.title;

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenClick() {

  }

  public onSaveClick() {

  }

  public onOverlayClick() {

  }

}
