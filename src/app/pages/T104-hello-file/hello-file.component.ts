import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';

import { HelloFileService } from './hello-file.service';

@Component({
  selector: 't104-hello-file',
  templateUrl: './hello-file.component.html',
  styleUrls: ['./hello-file.component.scss']
})
export class HelloFileComponent implements OnInit, AfterViewInit, OnDestroy {

  public title = environment.t104_hello_file.title;

  public get code() { //属性code，即文本 在html里被双向绑定了 在service里取
    return this.service.code;
  };
  public set code(value) {
    this.service.code = value;
  }

  constructor(
    private service: HelloFileService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  public onOpenClick() {
    this.openFileDialog((event) => {
      this.service.openFile(event.target.files[0]); //回调匿名函数
    });
  }

  public onDownloadClick() {
    const url = environment.t104_hello_file.dataUrl;
    this.service.downloadFile(url); //封装下载文件的方法
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
    //TODO: 文件对话框是如何创建和使用的?
    //TODO：什么是回调函数?
    let inputEl = document.createElement("input"); //创建html元素input
    inputEl.type = "file";
    inputEl.accept = "application/json, text/plain";
    inputEl.multiple = false;
    if (typeof callback === "function") {
      inputEl.addEventListener("change", callback); //当打开完成后，回调这个函数
    }
    inputEl.dispatchEvent(new MouseEvent("click"));
  }
}
