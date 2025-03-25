
/**
 * 四叉树四进制Morton编码
 */
export class QuaternaryCode {

  /**
   *
   * @param row
   * @param column
   * @param deep
   */
  public encoding(row, column, deep) {
    //TODO: 请同学们完成
    let rowBstr = row.toString(2);
    let columnBstr = column.toString(2);
    let rowb = parseInt(rowBstr);
    let columnb = parseInt(columnBstr);
    let morton = 2 * rowb + columnb;

    var arr1 = [];
    let sNumber = morton.toString()
    for (var i = 0 ; i < deep; i += 1) {
      arr1.push(+sNumber.charAt(i))
    }

    var arr2 = [];
    arr2.push('t');
    for (var j = 0; j < deep; j += 1) {
      let num = 'x';
      switch (arr1[j]) {
        case 0:
          num = 't';
          break;
        case 1:
          num = 's';
          break;
        case 2:
          num = 'q';
          break;
        case 3:
          num = 'r';
          break;
      }
      arr2.push(num);
    }
    var arr3 = arr2.join('');
    return arr3;
  }
 
  /**
   *
   * @param code
   */
  public decoding(code) {
    //TODO: 请同学们完成
    var n = code.split("")
    var sum = [];
    for (var i = 1, len = n.length; i < len; i += 1) {
      let num = -1;
      switch (n[i]) {
        case 't':
          num = 0;
          break;
        case 's':
          num = 1;
          break;
        case 'q':
          num = 2;
          break;
        case 'r':
          num = 3;
          break;
      }
      sum.push(num);
    }

    var row = [];
    var column = [];
    for (var j = 0, le = sum.length; j < le; j += 1) {
      let rnum = -1;
      let cnum = -1;
      switch (sum[j]) {
        case 0:
          rnum = 0;
          cnum = 0;
          break;
        case 1:
          rnum = 0;
          cnum = 1;
          break;
        case 2:
          rnum = 1;
          cnum = 0;
          break;
        case 3:
          rnum = 1;
          cnum = 1;
          break;
      }
      row.push(rnum);
      column.push(cnum);
    }
    var r = parseInt(row.join(''), 2);
    var c = parseInt(column.join(''), 2);
    return { row: r, column: c, deep: sum.length };
  }
}
