import { Const } from "./const";

export namespace TimeTable {
  export type Item = {
    name:   string,
    value:  string,
    isLink: boolean,
    ref:    string | null
  }

  export type Field = {
    name:      string,
    items:     TimeTable.Item[]
  }

  export class Table {
    private dayOfWeeks: Const.DayOfWeek[];
    private periods: number[];
    private fields: TimeTable.Field[];

    constructor(dayOfWeeks: Const.DayOfWeek[], periods: number[]) {
      this.dayOfWeeks = dayOfWeeks;
      this.periods = periods;
      this.fields = Array(dayOfWeeks.length * periods.length);
      for (const dow of dayOfWeeks) {
        for (const p of periods) {
          this.fields[p * dayOfWeeks.length + dow] = this.initField();
        }
      }
    }

    public to_node(): Node {
      const n = document.createElement("table");

      /* ヘッダの作成 */
      const header = document.createElement("thead");
      const dowRow = document.createElement("tr");
      dowRow.appendChild(document.createElement("th")); // 左上の空白。
      for (const dow of this.dayOfWeeks) {
        const th = document.createElement("th");
        th.textContent = Const.DAY_OF_WEEK_CHARS[dow];
        dowRow.appendChild(th);
      }
      header.appendChild(dowRow);
      n.appendChild(header);

      /* ボディの作成 */
      /* 各行に対し、まず左端の時限を表すフィールドを追加、次いで各コマを表すフィールドを追加。 */
      const body = document.createElement("tbody");
      for (const p of this.periods) {
        const row = document.createElement("tr");
        const dowField = document.createElement("th");
        /* TODO: 時限を表すフィールドを作る。 */
        dowField.textContent = String(p);
        row.appendChild(dowField);
        for (const dow of this.dayOfWeeks) {
          row.appendChild(this.createTdNodeFrom(this.fields[p * this.dayOfWeeks.length + dow]));
        }
      }
      n.appendChild(body);

      return n;
    }

    private initField(): TimeTable.Field {
      return {
        name:  "",
        items: []
      }
    }

    private createTdNodeFrom(field: Field): Node {
      const td = document.createElement("td");
      const name = document.createElement("h3");
      name.textContent = field.name;
      td.appendChild(name);
      return td;
    }
  }
}
