import { Const } from "./const";

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
    private dayOfWeeks: Const.DayOfWeek[];
    private periodMax: number;
    private fieldTemplete: TimeTable.Field;
    private fields: TimeTable.Field[];

    constructor(dayOfWeeks: Const.DayOfWeek[], periodMax: number) {
      if (dayOfWeeks.length <= 0) {
        dayOfWeeks = [Const.MON, Const.TUE, Const.WED, Const.THU, Const.FRI];
      }
      if (periodMax <= 0 || periodMax > 10) {
        periodMax = 5;
      }

      this.dayOfWeeks = dayOfWeeks;
      this.periodMax = periodMax;
      this.fieldTemplete = this.initField();
      this.fields = Array(dayOfWeeks.length * periodMax);
      for (const dow of dayOfWeeks) {
        for (let p = 0; p < periodMax; p++) {
          this.fields[p * dayOfWeeks.length + dow] = this.initField();
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

      for (const dow of this.dayOfWeeks) {
        for (let p = 0; p < this.periodMax; p++) {
          this.fields[p * this.dayOfWeeks.length + dow] = JSON.parse(JSON.stringify(item_tmpl));
        }
      }
    }

    public setField(f: TimeTable.Field, dow: Const.DayOfWeek, period: number) {
    }

    public toObject(): { dowHeader: string[], periodHeader: string[], body: Field[] } {
      /* ヘッダの作成 */
      const dowHeader = this.dayOfWeeks.map(dow => Const.DAY_OF_WEEK_CHARS[dow]);
      const periodHeader = this.range(1, this.periodMax).map(i => String(i));

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
      const r = [];
      for (let i = min; i <= max; i++) {
        r.push(i);
      }
      return r;
    }
  }
}
