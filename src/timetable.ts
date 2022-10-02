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

  export type PeriodRange = {
    start: Date,
    end:   Date
  }

  export class Table {
    private dowSize: number;
    private periodSize: number;
    private periodRanges: PeriodRange[];
    private fields: TimeTable.Field[][]; // 曜日ごとで触りたいので、[dowIdx][periodIdx]の形でアクセスすること。

    constructor(dowSize: number, periodSize: number) {
      if (dowSize <= 0 || dowSize > 7) { dowSize = TimeTableConst.dowDefaultSize; }
      if (periodSize <= 0 || periodSize > TimeTableConst.periodMaxSize) { periodSize = TimeTableConst.periodDefaultSize; }

      this.dowSize = dowSize;
      this.periodSize = periodSize;

      this.periodRanges = new Array(this.periodSize).fill({
          start: new Date(TimeTableConst.baseDate),
          end:   new Date(TimeTableConst.baseDate)
      });

      this.fields = Array(this.dowSize);
      for (let dowIdx = 0; dowIdx < this.dowSize; dowIdx++) {
        this.fields[dowIdx] = new Array(this.periodSize).fill(this.initField());
      }
    }

    public setDowSize(dowSize: number) {
      if (dowSize <= 0 || dowSize > 7) { return; }

      if (dowSize > this.dowSize) {
        for (let dowIdx = this.dowSize; dowIdx < dowSize; dowIdx++) {
          this.fields[dowIdx] = new Array(this.periodSize).fill(this.initField());

        }
      }
      else if (dowSize < this.dowSize) {
        this.fields = this.fields.slice(0, dowSize);
      }
    }

    public setPeriodSize(periodSize: number) {
      if (periodSize <= 0 || periodSize > TimeTableConst.periodMaxSize) { return; }

      if (periodSize > this.periodSize) {
        for (let periodIdx = this.periodSize; periodIdx < periodSize; periodIdx++) {
          this.periodRanges[periodIdx] = {
            start: new Date(TimeTableConst.baseDate),
            end:   new Date(TimeTableConst.baseDate)
          };
        }
        for (let dowIdx = 0; dowIdx < this.dowSize; dowIdx++) {
          for (let periodIdx = this.periodSize; periodIdx < periodSize; periodIdx++) {
            this.fields[dowIdx][periodIdx] = this.initField();
          }
        }
      }
      else if (periodSize < this.periodSize) {
        this.periodRanges = this.periodRanges.slice(0, periodSize);
        for (let dowIdx = 0; dowIdx < this.dowSize; dowIdx++) {
          this.fields[dowIdx] = this.fields[dowIdx].slice(0, periodSize);
        }
      }
    }

    public setPeriodRange(periodIdx: number, startHour: number | null, startMin: number | null, endHour: number | null, endMin: number | null) {
      if (periodIdx >= this.periodSize || periodIdx < 0) { throw PeriodOutOfRangeError; }

      let start = new Date(TimeTableConst.baseDate);
      let end = new Date(TimeTableConst.baseDate);
      if (startHour) { start.setHours(startHour); }
      if (startMin) { start.setMinutes(startMin); }
      if (endHour) { end.setHours(endHour); }
      if (endMin) { end.setMinutes(endMin); }

      this.periodRanges[periodIdx] = {
        start: start,
        end:   end
      };
    }

    public setItemStructure(items: Item[]) {
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
          this.fields[dowIdx][periodIdx] = {
            "name":  this.fields[dowIdx][periodIdx]["name"],
            "items": this.cloneJSON(item_tmpl)
          };
        }
      }
    }

    public getItemStructure(): Item[] {
      return this.fields[0][0].items.map(i => {
        return {
          "name": i["name"],
          "value": "",
          "isLink": i["isLink"],
          "ref": ""
        }
      });
    }

    public setField(f: TimeTable.Field, dowIdx: number, periodIdx: number) {
      if (periodIdx >= this.periodSize || periodIdx < 0) { throw PeriodOutOfRangeError; }
      if (dowIdx >= this.dowSize || dowIdx < 0) { throw DayOfWeekOutOfRangeError; }

      /* 引数で与えられたFieldの構造が正しいか確認。 */
      const targetField = this.fields[dowIdx][periodIdx];
      if (!this.isSameJsonStructure(targetField, f)) { throw WrongItemStructureError; }
      for (let i = 0; i < f.items.length; i++) {
        if (targetField.items[i].name !== f.items[i].name) { throw WrongItemStructureError; }
        if (targetField.items[i].isLink !== f.items[i].isLink) { throw WrongItemStructureError; }
      }

      this.fields[dowIdx][periodIdx] = this.cloneJSON(f);
    }

    public getField(dow: number, period: number): Field {
      const periodIdx = period - 1;
      const dowIdx = dow - 1;
      return this.fields[dowIdx][periodIdx];
    }

    public toObject(): { dowHeader: string[], periodHeader: {period: number, start: Date, end: Date}[], body: Field[][] } {
      /* ヘッダの作成 */
      const dowHeader = this.range(0, this.dowSize - 1).map(dowIdx => TimeTableConst.DAY_OF_WEEK_CHARS[dowIdx]);
      const periodHeader = this.periodRanges.map((periodRange, idx) => {return {
        period: idx + 1,
        start:  periodRange["start"],
        end:    periodRange["end"]
      }});

      /* ボディの作成 */
      const body: Field[][] = this.cloneJSON(this.fields);

      return { "dowHeader": dowHeader, "periodHeader": periodHeader, "body": body };
    }

    private initField(): TimeTable.Field {
      return {
        name:  "",
        items: [
          {
            "name": "",
            "value": "",
            "isLink": false,
            "ref": ""
          },
          {
            "name": "",
            "value": "",
            "isLink": false,
            "ref": ""
          },
          {
            "name": "",
            "value": "",
            "isLink": false,
            "ref": ""
          }
        ]
      }
    }

    private range(min: number, max: number): number[] {
      const r: number[] = [];
      for (let i = min; i <= max; i++) {
        r.push(i);
      }
      return r;
    }

    private cloneJSON(obj: Object) {
      return JSON.parse(JSON.stringify(obj))
    }

    private isSameJsonStructure(obj1: any,obj2: any): boolean {
      /* どちらかがオブジェクトでない(プリミティブである)なら、両方プリミティブの場合のみOK。 */
      if (typeof(obj1) !== "object" || typeof(obj2) != "object") { return (typeof(obj1) != "object") && (typeof(obj2) != "object"); }
      /* 利用上の想定では、この時点でどちらも配列か連想配列なので、両方同じ種類か確認。 */
      if (Array.isArray(obj1) !== Array.isArray(obj2)) { return false; }

      /* キー(配列なら添数、連想配列ならプロパティ)が同じか確認 */
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) { return false; }
      if (!keys1.every(k => keys2.includes(k))) { return false; }

      return keys1.every(k => this.isSameJsonStructure(obj1[k], obj2[k]));
    }
  }
}
