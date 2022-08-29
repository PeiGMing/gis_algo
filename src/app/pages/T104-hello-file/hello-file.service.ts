import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HelloFileService {

  //TODO: code属性的含义，程序中是如何使用的?
  private _code;
  public get code() {
    if ((this._code == null) || (this._code == undefined)) {
      this._code = '';
    }
    return this._code;
  }
  public set code(value) {
    this._code = value;
  }

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) {
    this._code = '';
  }

  /**
   *
   * @returns
   */
  public createFileName() {
    return uuidv4() + '.json';
  }

  /**
   *
   * @param file
   */
  public openFile(file: File) {
    //TODO: FileReader的使用，请同学们实现

  }

  /**
   *
   * @param url
   */
  public downloadFile(url: string) {
    //TODO: HttpClient 的使用，请同学们实现

  }

  /**
   *
   */
  public saveFile(filename) {
    //TODO: 文件保存，请同学们实现

  }
}
