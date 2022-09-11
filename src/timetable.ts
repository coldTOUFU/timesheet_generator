import { TimeTableConst } from "./timetable_const";
import { PeriodOutOfRangeError, DayOfWeekOutOfRangeError, WrongItemStructureError } from "./error/timetable_error";

export namespace TimeTable {
  export type Item = {
    name:   string,
    value:  string,
    isLink: boolean,
    ref:    string
  }

  export type Field = {
    name:      string,
    items:     TimeTable.Item[]
  }

  export class Table {
    private dowSize: number;
    private periodSize: number;
    private fields: TimeTable.Field[];

    constructor(dowSize: number, periodSize: number) {
      if (dowSize <= 0 || dowSize > 7) { dowSize = 5; }
      if (periodSize <= 0 || periodSize > TimeTableConst.periodMaxSize) { periodSize = 5; }

      this.dowSize = dowSize;
      this.periodSize = periodSize;

      this.fields = Array((this.dowSize) * this.periodSize);
      for (let dowIdx = 0; dowIdx < this.dowSize; dowIdx++) {
        for (let periodIdx = 0; periodIdx < this.periodSize; periodIdx++) {
          this.fields[periodIdx * this.dowSize + dowIdx] = this.initField();
        }
      }
    }

    public changeItemStructure(items: Item[]) {
      /* ひな形用itemsに固有の値が入っているかもしれないので、固有の値はそぎ落とす。 */
      const item_tmpl = items.map(i => {
        return {
          "name": i["name"],
          "value": "",
          "isLink": i["isLink"],
          "ref": ""
        }
      });

      for (let dowIdx = 0; dowIdx < this.dowSize; dowIdx++) {
        for (let periodIdx = 0; periodIdx < this.periodSize; periodIdx++) {
          this.fields[periodIdx * this.dowSize + dowIdx] = {
            "name":  this.fields[periodIdx * this.dowSize + dowIdx]["name"],
            "items": JSON.parse(JSON.stringify(item_tmpl))
          };
        }
      }
    }

    public setField(f: TimeTable.Field, dow: number, period: number) {
      if (period > this.periodSize || period <= 0) { throw PeriodOutOfRangeError; }
      if (dow > this.dowSize || dow <= 0) { throw DayOfWeekOutOfRangeError; }

      const periodIdx = period - 1;
      const dowIdx = dow - 1;
      const targetField = this.fields[periodIdx * this.dowSize + dowIdx];
      if (!this.cmpJSONStructure(targetField, f)) { throw WrongItemStructureError; }
      for (let i = 0; i < f.items.length; i++) {
        if (targetField.items[i].name !== f.items[i].name) { throw WrongItemStructureError; }
        if (targetField.items[i].isLink !== f.items[i].isLink) { throw WrongItemStructureError; }
      }

      this.fields[periodIdx * this.dowSize + dowIdx] = JSON.parse(JSON.stringify(f));
    }

    public toObject(): { dowHeader: string[], periodHeader: string[], body: Field[] } {
      /* ヘッダの作成 */
      const dowHeader = this.range(0, this.dowSize - 1).map(dowIdx => TimeTableConst.DAY_OF_WEEK_CHARS[dowIdx]);
      const periodHeader = this.range(1, this.periodSize - 1).map(period => String(period));

      /* ボディの作成 */
      const body = JSON.parse(JSON.stringify(this.fields));

      return { "dowHeader": dowHeader, "periodHeader": periodHeader, "body": body };
    }

    private initField(): TimeTable.Field {
      return {
        name:  "",
        items: []
      }
    }

    private range(min: number, max: number): number[] {
      const r: number[] = [];
      for (let i = min; i <= max; i++) {
        r.push(i);
      }
      return r;
    }

    private cmpJSONStructure(obj1: any,obj2: any): boolean {
      /* どちらかがオブジェクトでない(プリミティブである)なら、両方プリミティブの場合のみOK。 */
      if (typeof(obj1) !== "object" || typeof(obj2) != "object") { return (typeof(obj1) != "object") && (typeof(obj2) != "object"); }
      /* 利用上の想定では、この時点でどちらも配列か連想配列なので、両方同じ種類か確認。 */
      if (Array.isArray(obj1) !== Array.isArray(obj2)) { return false; }

      /* キー(配列なら添数、連想配列ならプロパティ)が同じか確認 */
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) { return false; }
      if (!keys1.every(k => keys2.includes(k))) { return false; }

      return keys1.every(k => this.cmpJSONStructure(obj1[k], obj2[k]));
    }
  }
}
