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

    static parseStyleSheet(txt: string): Style {
      let style = new Style();
      const rule_txts = txt.split("}")
                           .map(rule => rule.trim())
                           .filter(rule => rule.length > 0); // 終端要素が""なので除く。
      rule_txts.forEach(rule_txt => {
        const [selectors, declaration_txt] = rule_txt.split("{")
                                                     .map(txt => txt.trim());
        const declaration_txts = declaration_txt.split(";")
                                                .map(dec => dec.trim())
                                                .filter(dec => dec.length > 0);
        const declarations: Declarations = {};
        declaration_txts.forEach(dec_txt => {
          const [property, value] = dec_txt.split(":")
                                           .map(e => e.trim());
          declarations[property] = value
        });
        selectors.split(",").forEach(selector => {
          style.addRule({ [selector]: declarations })
        })
      });

// th {background-color: gray;}table,th,td {border: solid;}
      

// const cssObject = cssString
//   .split("}")
//   .map((rule) => rule.trim())
//   .filter((rule) => rule.length > 0)
//   .reduce((acc, rule) => {
//     const [selectors, styles] = rule.split("{");
//     selectors
//       .split(",")
//       .map((selector) => selector.trim())
//       .forEach((selector) => {
//         acc[selector] = styles;
//       });
//     return acc;
//   }, {});

      return style;
    }
  }
}
