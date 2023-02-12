import { FailedToParseHTMLError, FailedToParseObjectError } from "./error/style_erorr"

export namespace CSS {
  export type Declarations = {
    [property: string]: string
  }

  export type Rules = {
    [selector: string]: Declarations
  }

  export class Style {
    private rules: Rules;

    constructor(rules?: Rules) {
      if (rules) {
        this.rules = rules;
      } else {
        this.rules = {};
      }
    }

    /* 一括指定プロパティに対応していないので注意(プロパティは新しいもので上書きされる)。 */
    public addRule(rules: Rules) {
      for (const selector in rules) {
        if (this.rules[selector]) {
          Object.assign(this.rules[selector], rules[selector]);
        } else {
          this.rules[selector] = rules[selector];
        }
      }
    }

    public toString(): string {
      let style_str = "";
      for (const selector in this.rules) {
        let declarations_str = "";
        for (const property in this.rules[selector]) {
          declarations_str += `${property}:${this.rules[selector][property]};`
        }
        style_str += `${selector} {${declarations_str}}`
      }
      return style_str;
    }

    public fromString(str: string) {
      this.rules = {};
      const rule_strs = str.split("}")
                           .map(rule => rule.trim())
                           .filter(rule => rule.length > 0); // 終端要素が""なので除く。
      rule_strs.forEach(rule_str => {
        const [selectors, declaration_str] = rule_str.split("{")
                                                     .map(str => str.trim());
        const declaration_strs = declaration_str.split(";")
                                                .map(dec => dec.trim())
                                                .filter(dec => dec.length > 0);
        const declarations: Declarations = {};
        declaration_strs.forEach(dec_str => {
          const [property, value] = dec_str.split(":")
                                           .map(e => e.trim());
          declarations[property] = value
        });
        selectors.split(",").forEach(selector => {
          this.addRule({ [selector]: declarations })
        })
      });
    }

    public fromJSON(json: string) {
      const src = JSON.parse(json);
      if (!src.style || !src.style.rules) {
        throw FailedToParseObjectError;
      }

      this.rules = src.style.rules;
    }

    public fromHTML(str: String) {
      const matches = str.match(/<style>.+<\/style>/g);
      if (!matches) { throw FailedToParseHTMLError; }

      this.fromString(matches[0].substring(7, matches[0].length - 8))
    }
  }
}
