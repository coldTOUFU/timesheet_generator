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
    private dowMax: Const.DayOfWeek;
    private periodMax: number;
    private fields: TimeTable.Field[];

    constructor(dowMax: Const.DayOfWeek, periodMax: number) {
      if (periodMax <= 0 || periodMax > 10) {
        this.periodMax = 5;
      }
      else {
        this.periodMax = periodMax;
      }

      this.dowMax = dowMax;
      this.fields = Array((this.dowMax + 1) * this.periodMax);
      for (let d = 0; d <= this.dowMax; d++) {
        for (let p = 0; p < this.periodMax; p++) {
          this.fields[p * (this.dowMax + 1) + d] = this.initField();
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

      for (let d = 0; d <= this.dowMax; d++) {
        for (let p = 0; p < this.periodMax; p++) {
          this.fields[p * (this.dowMax + 1) + d] = {
            "name": this.fields[p * (this.dowMax + 1) + d]["name"],
            "items": JSON.parse(JSON.stringify(item_tmpl))
          };
        }
      }
    }

    public setField(f: TimeTable.Field, dow: Const.DayOfWeek, period: number) {
      this.fields[(period - 1) * (this.dowMax + 1) + dow] = JSON.parse(JSON.stringify(f));
    }

    public toObject(): { dowHeader: string[], periodHeader: string[], body: Field[] } {
      /* ヘッダの作成 */
      const dowHeader = this.range(0, this.dowMax).map(d => Const.DAY_OF_WEEK_CHARS[d]);
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
