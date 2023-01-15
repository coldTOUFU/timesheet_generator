import { TimeTableConst } from "./timetable_const";
import { PeriodOutOfRangeError, DayOfWeekOutOfRangeError, WrongItemStructureError, FailedToParseHTMLError, FailedToParseObjectError } from "./error/timetable_error";

export namespace TimeTable {
  export type Item = {
    name:   string,
    value:  string,
    isLink: boolean
  }

  export type Field = {
    name:      string,
    items:     TimeTable.Item[]
  }

  export type PeriodRange = {
    startHour: string,
    startMin:  string,
    endHour:   string
    endMin:    string
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

      this.periodRanges = [];
      for (let periodIdx = 0; periodIdx < this.periodSize; periodIdx++) {
        this.periodRanges.push({
          startHour: "00",
          startMin:  "00",
          endHour:   "00",
          endMin:    "00"
        });
      }

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

      this.dowSize = dowSize;
    }

    public getDowSize(): number { return this.dowSize; }

    public getDowArray(): string[] {
      return this.range(0, this.dowSize - 1).map(dowIdx => TimeTableConst.DAY_OF_WEEK_CHARS[dowIdx]);
    }

    public setPeriodSize(periodSize: number) {
      if (periodSize <= 0 || periodSize > TimeTableConst.periodMaxSize) { return; }

      if (periodSize > this.periodSize) {
        for (let periodIdx = this.periodSize; periodIdx < periodSize; periodIdx++) {
          this.periodRanges[periodIdx] = {
            startHour: "00",
            startMin:  "00",
            endHour:   "00",
            endMin:    "00"
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

      this.periodSize = periodSize;
    }

    public getPeriodSize(): number { return this.periodSize; }

    public getPeriodArray(): {period: number, start: string, end: string}[] {
      return this.periodRanges.map((periodRange, idx) => {return {
        period: idx + 1,
        start:  `${periodRange.startHour}:${periodRange.startMin}`,
        end:    `${periodRange.endHour}:${periodRange.endMin}`
      }});
    }

    public setPeriodRange(periodIdx: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) {
      if (periodIdx >= this.periodSize || periodIdx < 0) { throw PeriodOutOfRangeError; }

      if (startHour) { this.periodRanges[periodIdx].startHour = startHour; }
      if (startMin) { this.periodRanges[periodIdx].startMin = startMin; }
      if (endHour) { this.periodRanges[periodIdx].endHour = endHour; }
      if (endMin) { this.periodRanges[periodIdx].endMin = endMin; }
    }

    public setItemStructure(items: Item[]) {
      /* ひな形用itemsに固有の値が入っているかもしれないので、固有の値はそぎ落とす。 */
      const item_tmpl = items.map(i => {
        return {
          "name": i["name"],
          "value": "",
          "isLink": i["isLink"]
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
          "isLink": i["isLink"]
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

    public getField(dowIdx: number, periodIdx: number): Field {
      return this.fields[dowIdx][periodIdx];
    }

    public getFields(): Field[][] {
      return this.fields;
    }

    public toObject(): { dowSize: number, periodSize: number, periodRanges : PeriodRange[], fields: Field[][] } {
      return {
        dowSize: this.dowSize,
        periodSize: this.periodSize,
        periodRanges: this.periodRanges,
        fields: this.fields
      };
    }

    public toMarkdown(): string {
      const dowArray = this.getDowArray();
      const periodArray = this.getPeriodArray();

      /* 曜日ヘッダと、表の太線を作る。 */
      let mdStr = `|   | ${dowArray.join(" | ")} |\n`;
      mdStr += `| --- | ${dowArray.map(_ => " --- ").join(" | ")} |\n`;

      /* 表のボディを作る。 */
      /* 表の行は時限と対応しているから、各時限で回して行をつなげ、表を作る。 */
      mdStr += periodArray.map((period, periodIdx) => {
        /* 行ヘッダー部。 */
        const periodStr = `${period.period}<br>${period.start}<br>～<br>${period.end}`;
        /* 行のヘッダー以外を作る。 */
        /* 列は曜日と対応しているから、今見ている時限の各曜日で回して連結すれば、対応する行ができる。 */
        const rowStr = dowArray.map((_, dowIdx) => {
          /* セル1つ分を作る。fieldsの2次元配列は曜日、時限の順にアクセスすることに注意。 */
          const itemsStr = this.fields[dowIdx][periodIdx].items
              .map(item => item.isLink ?
                  `[${item.name}](${item.value})` :
                  item.value).join("<br>");
          return `${this.fields[dowIdx][periodIdx].name}<br>${itemsStr}`;
        }).join(" | ");
        return `| ${periodStr} | ${rowStr} |`;
      }).join("\n");
      return mdStr;
    }

    public toHTML(css_txt=""): string {
      const dowArray = this.getDowArray();
      const periodArray = this.getPeriodArray();

      /* 曜日ヘッダを作る。 */
      let thStr = `<tr><th></th><th>${dowArray.join("</th><th>")}</th></tr>`

      /* 表のボディを作る。 */
      /* 表の行は時限と対応しているから、各時限で回して行をつなげ、表を作る。 */
      let tbodyStr = periodArray.map((period, periodIdx) => {
        /* 行ヘッダー部。 */
        const periodStr = `<th>${period.period}<br>${period.start}<br>～<br>${period.end}</th>`;
        /* 行のヘッダー以外を作る。 */
        /* 列は曜日と対応しているから、今見ている時限の各曜日で回して連結すれば、対応する行ができる。 */
        const rowStr = dowArray.map((_, dowIdx) => {
          /* セル1つ分を作る。fieldsの2次元配列は曜日、時限の順にアクセスすることに注意。 */
          const itemsStr = this.fields[dowIdx][periodIdx].items
              .map(item => item.isLink ?
              `<a href="${item.value}">${item.name}</a>` :
              item.value).join("<br>");
          return `<td>${this.fields[dowIdx][periodIdx].name}<br>${itemsStr}</td>`;
        }).join("");
        return `<tr>${periodStr}${rowStr}</tr>`;
      }).join("\n");
      return `<html><head><style>${css_txt}</style></head><body><table><thead>${thStr}</thead><tbody>${tbodyStr}</tbody></table></body></html>`;
    }

    public fromJSON(json: string) {
      const src = JSON.parse(json);
      if (!src.dowSize || !src.periodSize || !src.periodRanges || !src.fields) {
        throw FailedToParseObjectError;
      }
      this.dowSize = src.dowSize;
      this.periodSize = src.periodSize;
      this.periodRanges = src.periodRanges;
      this.fields = src.fields;
    }

    public fromHTML(src: string) {
      const htmlNode = this.parseHTML(src);
      if (!htmlNode) { throw FailedToParseHTMLError; }

      this.dowSize = htmlNode.querySelectorAll("thead th").length - 1;
      this.periodSize = htmlNode.querySelectorAll("tbody tr").length;

      const rows = Array.from(htmlNode.querySelectorAll("tbody tr")) as HTMLTableRowElement[];
      if (rows.length === 0) { throw FailedToParseHTMLError; }
      this.periodRanges = rows.map((tr) => {
        const matches = tr.querySelector("th")?.innerHTML?.match(/\d\d:\d\d/);
        if (!matches) { throw FailedToParseHTMLError; }
        return {
          startHour: matches[0].substring(0, 2),
          startMin:  matches[0].substring(3, 5),
          endHour:   matches[1].substring(0, 2),
          endMin:    matches[1].substring(3, 5)
        }
      });
      const cells = rows.map(tr => Array.from(tr.querySelectorAll("td"))) as HTMLTableCellElement[][];
      this.fields = this.range(0, this.dowSize - 1).map(dow => {
        return this.range(0, this.periodSize - 1).map(period => {
          const items = cells[period][dow].innerHTML.split("<br>")
          return {
            name: items[0],
            items: items.slice(1, items.length).map(item => {
              let isLink = false;
              let name = "";
              let value = "";
              if (item.includes("<a")) {
                isLink = true;
                name = item.replace(/<.+>/g, '');
                value = item.replace(/^<a href="/, '').replace(/".+/, '');
              } else {
                value = item
              }
              return {
                name: name,
                value: value,
                isLink: isLink
              }
            })
          }
        });
      });
    }

    private initField(): TimeTable.Field {
      return {
        name:  "",
        items: [
          {
            "name":   "",
            "value":  "",
            "isLink": false
          },
          {
            "name":   "",
            "value":  "",
            "isLink": false
          },
          {
            "name":   "",
            "value":  "",
            "isLink": false
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

    private parseHTML(src: string): HTMLElement | null{
      const parser = new DOMParser();
      return parser.parseFromString(src, 'text/html')?.body;
    }
  }
}
