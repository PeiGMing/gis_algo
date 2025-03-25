import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyNameService } from './my-name.service';

@Component({
  selector: 't201-my-name',
  templateUrl: './my-name.component.html',
  styleUrls: ['./my-name.component.scss']
})
export class MyNameComponent implements OnInit, AfterViewInit, OnDestroy {

  public title = environment.t201_my_name.title;

  public get geojson() {
    return this.service.geojson;
  }

  public get features() {
    return this.service.features;
  }

  constructor(private service: MyNameService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  public onOpenClick() {
    this.openFileDialog((event) => {
      this.service.openFile(event.target.files[0]);
    });
  }

  public onSaveClick() {
    const filename = this.service.createFileName();
    this.service.saveFile(filename);
  }

/**
   *
   * @param callback
   */
 private openFileDialog(callback) {
  var inputEl = document.createElement("input");
  inputEl.type = "file";
  inputEl.accept = "application/json, text/plain";
  inputEl.multiple = false;
  if (typeof callback === "function") {
    inputEl.addEventListener("change", callback);
  }
  inputEl.dispatchEvent(new MouseEvent("click"));
}

}
