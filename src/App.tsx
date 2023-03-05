import React from 'react';

import { TimeTable } from './timetable'
import { CSS } from './style'

type DowSizeSelectProps = {
  dowSize: number;
  onDowSizeChange: (dowSize: number) => void;
}

const DowSizeSelect: React.FC<DowSizeSelectProps> = (props) => {
  const onDowSizeChange = (num: number) => {
    props.onDowSizeChange(num);
  }

  return (
    <>
      <p>何曜日まで入れるかを選んでください。</p>
      <select value={props.dowSize} onChange={event => onDowSizeChange(Number(event.target.value))}>
        <option value="1">月曜まで</option>
        <option value="2">火曜まで</option>
        <option value="3">水曜まで</option>
        <option value="4">木曜まで</option>
        <option value="5">金曜まで</option>
        <option value="6">土曜まで</option>
        <option value="7">日曜まで</option>
      </select>
    </>
  );
}

type LoadTableFileProps = {
  onJSONLoad: (json: string) => void;
  onHTMLLoad: (htmlString: string) => void;
}

const LoadTableFile: React.FC<LoadTableFileProps> = (props) => {
  const onJSONLoad = (file: File | undefined) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const result = fileReader.result;
        if (result) {
          props.onJSONLoad(result as string);
        }
      };
      fileReader.readAsText(file)
    }
  }

  const onHTMLLoad = (file: File | undefined) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const result = fileReader.result;
        if (result) {
          props.onHTMLLoad(result as string);
        }
      };
      fileReader.readAsText(file)
    }
  }

  return (
    <>
      <h2>JSONを読み込む</h2>
      <input type="file" accept=".json" onChange={event => onJSONLoad(event.target.files?.[0])}/>
      <h2>HTMLを読み込む</h2>
      <input type="file" accept=".html" onChange={event => onHTMLLoad(event.target.files?.[0])}/>
    </>
  );
}

type PeriodSizeSelectProps = {
  periodSize: number;
  onPeriodSizeChange: (periodSize: number) => void;
}

const PeriodSizeSelect: React.FC<PeriodSizeSelectProps> = (props) => {
  const onPeriodSizeChange = (num: number) => {
    props.onPeriodSizeChange(num);
  }

  return (
    <>
      <p>時限数を選んでください。</p>
      <select value={props.periodSize} onChange={event => onPeriodSizeChange(Number(event.target.value))}>
        <option value="1">1限まで</option>
        <option value="2">2限まで</option>
        <option value="3">3限まで</option>
        <option value="4">4限まで</option>
        <option value="5">5限まで</option>
        <option value="6">6限まで</option>
        <option value="7">7限まで</option>
        <option value="8">8限まで</option>
        <option value="9">9限まで</option>
        <option value="10">10限まで</option>
      </select>
    </>
  );
}

type PeriodRangeSelectProps = {
  period: number;
  periodRange: TimeTable.PeriodRange;
  onPeriodChange: (period: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) => void;
}

const PeriodRangeSelect: React.FC<PeriodRangeSelectProps> = (props) => {
  const onPeriodHourRangeStChange = (hour: string) => {
    props.onPeriodChange(props.period, hour, undefined, undefined, undefined);
  }
  const onPeriodMinuteRangeStChange = (minute: string) => {
    props.onPeriodChange(props.period, undefined, minute, undefined, undefined);
  }
  const onPeriodHourRangeEnChange = (hour: string) => {
    props.onPeriodChange(props.period, undefined, undefined, hour, undefined);
  }
  const onPeriodMinuteRangeEnChange = (minute: string) => {
    props.onPeriodChange(props.period, undefined, undefined, undefined, minute);
  }

  return (
    <>
      <select value={props.periodRange.startHour} name="hourRangeSt" onChange={event => onPeriodHourRangeStChange(event.target.value)}>
        <option value="00">00</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
      </select>
      :
      <select value={props.periodRange.startMin} name="minuteRangeSt" onChange={event => onPeriodMinuteRangeStChange(event.target.value)}>
        <option value="00">00</option>
        <option value="05">05</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
      </select>
      ~
      <select value={props.periodRange.endHour} name="hourRangeEn" onChange={event => onPeriodHourRangeEnChange(event.target.value)}>
        <option value="00">00</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
      </select>
      :
      <select value={props.periodRange.endMin} name="minuteRangeEn" onChange={event => onPeriodMinuteRangeEnChange(event.target.value)}>
        <option value="00">00</option>
        <option value="05">05</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
      </select>
    </>
  );
}

type PeriodRangeSelectsProps = {
  periodSize: number;
  periodRangeSelects: TimeTable.PeriodRange[];
  onPeriodChange: (period: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) => void;
}

const PeriodRangeSelects: React.FC<PeriodRangeSelectsProps> = (props) => {
  return (
    <>
      <p>開講時間の範囲を入力してください。</p>
      {
        [...Array(props.periodSize).keys()].map((i) => {
          return (
            <div key={i.toString()}>
              <PeriodRangeSelect
                periodRange={props.periodRangeSelects[i]}
                period={i}
                onPeriodChange={props.onPeriodChange}
              />
            </div>
          )
        })
      }
    </>
  );
}

type ItemInputProps = {
  items: TimeTable.Item[];
  onItemCheckBoxChange: (idx: number, checked: boolean) => void;
  onItemNameChange: (idx: number, txt: string) => void;
}

const ItemInput: React.FC<ItemInputProps> = (props) => {
  const onItemCheckBoxChange = (idx: number, checked: boolean) => {
    props.onItemCheckBoxChange(idx, checked);
  }
  const onItemNameChange = (idx: number, text: string) => {
    props.onItemNameChange(idx, text);
  }

  return (
    <>
      <div>
        <h3>項目1</h3>
        リンク有<input type="checkbox" checked={props.items[0].isLink} onChange={event => onItemCheckBoxChange(0, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" value={props.items[0].name} onChange={event => onItemNameChange(0, event.target.value)}/>
      </div>
      <div>
        <h3>項目2</h3>
        リンク有<input type="checkbox" checked={props.items[1].isLink} onChange={event => onItemCheckBoxChange(1, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" value={props.items[1].name} onChange={event => onItemNameChange(1, event.target.value)}/>
      </div>
      <div>
        <h3>項目3</h3>
        リンク有<input type="checkbox" checked={props.items[2].isLink} onChange={event => onItemCheckBoxChange(2, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" value={props.items[2].name} onChange={event => onItemNameChange(2, event.target.value)}/>
      </div>
    </>
  );
}

type EditTableProps = {
  table: TimeTable.Table;
  onFieldNameChange: (dowIdx: number, periodIdx: number, txt: string) => void;
  onItemValueChange: (dowIdx: number, periodIdx: number, itemIdx: number, txt: string) => void;
}

const EditTable: React.FC<EditTableProps> = (props) => {
  const dowSize = props.table.getDowSize();
  const periodSize = props.table.getPeriodSize();
  const onFieldNameChange = (dowIdx: number, periodIdx: number, text: string) => {
    props.onFieldNameChange(dowIdx, periodIdx, text);
  }
  const onItemValueChange = (dowIdx: number, periodIdx: number, itemIdx: number, text: string) => {
    props.onItemValueChange(dowIdx, periodIdx, itemIdx, text);
  }

  return (
    <>
      <p>各授業の名前や項目の値を入力してください．</p>
      <table border={1}>
        <thead>
          <tr>
            <th/>
            {
              props.table.getDowArray().map((e, idx) => {
                return <th key={idx.toString()}>{e}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            /* 各i時限に対する処理。 */
            [...Array(periodSize).keys()].map((periodIdx) => {
              return (
                <tr key={periodIdx.toString()}>
                  <td>{props.table.getPeriodArray()[periodIdx].period}</td>
                  {
                    /* i時限の行を曜日列方向になめる。 */
                    [...Array(dowSize).keys()].map((dowIdx) => {
                      const field = props.table.getFields()[dowIdx][periodIdx];
                      /* セル中の各項目。 */
                      return (
                        <td key={dowIdx.toString()}>
                          <input type="text" name="fieldTitle" placeholder="タイトル" value={field.name}
                              onChange={event => onFieldNameChange(dowIdx, periodIdx, event.target.value)}/>
                          {
                            field.items.map((item, itemIdx) => {
                              const placeholder = item.name + (item.isLink ? "のURL" : "");
                              return <div key={itemIdx.toString()}>
                                       <input type="text" name="fieldText" placeholder={placeholder} value={item.value}
                                              onChange={event => onItemValueChange(dowIdx, periodIdx, itemIdx, event.target.value)}/>
                                     </div>
                            })
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  );
}

type StyleListProps = {
  style: CSS.Style;
  onStyleChange: (style: CSS.Rules) => void;
}

const StyleList: React.FC<StyleListProps> = (props) => {
  const onStyleChange = (selector: string, property: string, value: string) => {
    const declarations: CSS.Declarations = {[property]: value};
    props.onStyleChange({[selector]: declarations});
  }

  return (
    <>
      <p>ヘッダの背景色</p>
      <input list="header-background-colors" value={props.style.getRules()['th']?.['background-color'] || ''} onChange={event => onStyleChange('th', 'background-color', event.target.value)}>
      </input>
      <datalist id="header-background-colors">
        <option value="white"/>
        <option value="gray"/>
        <option value="black"/>
        <option value="red"/>
        <option value="orange"/>
        <option value="yellow"/>
        <option value="limegreen"/>
        <option value="green"/>
        <option value="blue-green"/>
        <option value="cyan"/>
        <option value="skyblue"/>
        <option value="blue"/>
        <option value="purple"/>
        <option value="magenta"/>
        <option value="pink"/>
      </datalist>
      <p>ヘッダの文字色</p>
      <input list="header-char-colors" value={props.style.getRules()['th']?.['color'] || ''} onChange={event => onStyleChange('th', 'color', event.target.value)}>
      </input>
      <datalist id="header-char-colors">
        <option value="white"/>
        <option value="gray"/>
        <option value="black"/>
        <option value="red"/>
        <option value="orange"/>
        <option value="yellow"/>
        <option value="limegreen"/>
        <option value="green"/>
        <option value="blue-green"/>
        <option value="cyan"/>
        <option value="skyblue"/>
        <option value="blue"/>
        <option value="purple"/>
        <option value="magenta"/>
        <option value="pink"/>
      </datalist>
      <p>ボディの背景色</p>
      <input list="body-background-colors" value={props.style.getRules()['td']?.['background-color'] || ''} onChange={event => onStyleChange('td', 'background-color', event.target.value)}>
      </input>
      <datalist id="body-background-colors">
        <option value="white"/>
        <option value="gray"/>
        <option value="black"/>
        <option value="red"/>
        <option value="orange"/>
        <option value="yellow"/>
        <option value="limegreen"/>
        <option value="green"/>
        <option value="blue-green"/>
        <option value="cyan"/>
        <option value="skyblue"/>
        <option value="blue"/>
        <option value="purple"/>
        <option value="magenta"/>
        <option value="pink"/>
      </datalist>
      <p>ボディの文字色</p>
      <input list="body-char-colors" value={props.style.getRules()['td']?.['color'] || ''} onChange={event => onStyleChange('td', 'color', event.target.value)}>
      </input>
      <datalist id="body-char-colors">
        <option value="white"/>
        <option value="gray"/>
        <option value="black"/>
        <option value="red"/>
        <option value="orange"/>
        <option value="yellow"/>
        <option value="limegreen"/>
        <option value="green"/>
        <option value="blue-green"/>
        <option value="cyan"/>
        <option value="skyblue"/>
        <option value="blue"/>
        <option value="purple"/>
        <option value="magenta"/>
        <option value="pink"/>
      </datalist>
    </>
  );
}

type PreviewTableProps = {
  htmlString: string;
}

const PreviewTable: React.FC<PreviewTableProps> = (props) => {
  const onPreviewClick = () => {
    const newWindow = window.open('', '時間割プレビュー');
    if (newWindow) {
      newWindow.document.body.innerHTML = props.htmlString;
      newWindow.focus();
    }
  }

  return (
    <button onClick={onPreviewClick}>
      プレビュー
    </button>
  );
}

const DownloadString = (filename: string, str: string) => {
  const blob = new Blob([str], {type: 'text/plain'});
  const download_link = document.createElement('a');
  download_link.href = URL.createObjectURL(blob);
  download_link.download = filename;
  download_link.click();
}

type JSONDownloadButtonProps = {
  jsonStr: string;
}

const JSONDownloadButton: React.FC<JSONDownloadButtonProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.json", props.jsonStr)}
        value="JSONとして保存"/>
  );
}

type MarkdownDownloadButtonProps = {
  markdownStr: string;
}

const MarkdownDownloadButton: React.FC<MarkdownDownloadButtonProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.md", props.markdownStr)}
        value="マークダウンとして保存"/>
  );
}

type HTMLDownloadButtonProps = {
  htmlStr: string;
}

const HTMLDownloadButton: React.FC<HTMLDownloadButtonProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.html", props.htmlStr)}
        value="HTMLとして保存"/>
  );
}

type TimeTableRendererState = {
  table: TimeTable.Table;
  style: CSS.Style;
}
class TimeTableRenderer extends React.Component<{}, TimeTableRendererState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      table: new TimeTable.Table(),
      style: new CSS.Style()
    };
  }

  private updateFromJSON = (json: string) => {
    const table = this.state.table;
    table.fromJSON(json);
    const style = new CSS.Style();
    style.fromJSON(json);
    this.setState({ table: table, style: style });
  }

  private updateFromHTML = (htmlString: string) => {
    const table = new TimeTable.Table();
    table.fromHTML(htmlString);
    const style = new CSS.Style();
    style.fromHTML(htmlString);
    this.setState({ table: table, style: style });
  }

  private updateDowSize = (num: number) => {
    const table = this.state.table;
    table.setDowSize(num);
    this.setState({ table: table });
  };

  private updatePeriodSize = (num: number) => {
    const table = this.state.table;
    table.setPeriodSize(num);
    this.setState({ table: table });
  };

  private updatePeriodRanges = (period: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) => {
    const table = this.state.table;
    table.setPeriodRange(period, startHour, startMin, endHour, endMin);
    this.setState({ table: table });
  };

  private updateFieldName = (dowIdx: number, periodIdx: number, title: string) => {
    const field = this.state.table.getField(dowIdx, periodIdx);
    field.name = title;
    const table = this.state.table;
    table.setField(field, dowIdx, periodIdx);
    this.setState({ table: table });
  };

  private updateItemIsLink = (idx: number, isLink: boolean) => {
    const item_tmpls = this.state.table.getItemStructure();
    item_tmpls[idx].isLink = isLink;
    const table = this.state.table;
    table.setItemStructure(item_tmpls);
    this.setState({ table: table });
  };

  private updateItemName = (idx: number, name: string) => {
    const item_tmpls = this.state.table.getItemStructure();
    item_tmpls[idx].name = name;
    const table = this.state.table;
    table.setItemStructure(item_tmpls);
    this.setState({ table: table });
  };

  private updateItemValue = (dowIdx: number, periodIdx: number, itemIdx: number, value: string) => {
    const field = this.state.table.getField(dowIdx, periodIdx);
    field.items[itemIdx].value = value;
    const table = this.state.table;
    table.setField(field, dowIdx, periodIdx);
    this.setState({ table: table });
  };

  private updateStyle = (rule: CSS.Rules) => {
    const style = this.state.style;
    style.addRule(rule)
    this.setState({ style: style });
  };

  render() {
    const table = this.state.table;
    const loadTableFile = <LoadTableFile onJSONLoad={string => this.updateFromJSON(string)} onHTMLLoad={string => this.updateFromHTML(string)}/>;
    const dowSizeSelect = <DowSizeSelect dowSize={table.getDowSize()} onDowSizeChange={num => this.updateDowSize(num)}/>;
    const periodSizeSelect = <PeriodSizeSelect periodSize={table.getPeriodSize()}  onPeriodSizeChange={num => this.updatePeriodSize(num)}/>;
    const periodRangeSelects = <PeriodRangeSelects periodSize={table.getPeriodSize()} periodRangeSelects={table.getPeriodRanges()} onPeriodChange={this.updatePeriodRanges}/>;
    const itemInput = <ItemInput items={table.getItemStructure()} onItemCheckBoxChange={this.updateItemIsLink} onItemNameChange={this.updateItemName}/>;
    const editTable = <EditTable table={table} onFieldNameChange={this.updateFieldName} onItemValueChange={this.updateItemValue}/>;
    const styleList = <StyleList style={this.state.style} onStyleChange={this.updateStyle}/>;
    const previewTable = <PreviewTable htmlString={this.state.table.toHTML(this.state.style.toString())}/>;
    const jsonDownloadButton = <JSONDownloadButton jsonStr={JSON.stringify({ table: this.state.table, style: this.state.style })}/>;
    const markdownDownloadButton = <MarkdownDownloadButton markdownStr={this.state.table.toMarkdown()}/>;
    const htmlDownloadButton = <HTMLDownloadButton htmlStr={this.state.table.toHTML(this.state.style.toString())}/>;
    return (
      <>
        <div>
          <h1>時間割データの読込</h1>
          <p>過去に保存した時間割データを読み込めば、編集ができます。</p>
          {loadTableFile}
        </div>
        <div>
          <h1>時間割の入力</h1>
        </div>
        <div>
          <h2>曜日</h2>
          {dowSizeSelect}
        </div>
        <div>
          <h2>時限</h2>
          {periodSizeSelect}
        </div>
        <div>
          <h2>時限の範囲</h2>
          {periodRangeSelects}
        </div>
        <div>
          <h2>コマの項目</h2>
          {itemInput}
        </div>
        <div>
          <h2>時間割の入力</h2>
          {editTable}
        </div>
        <div>
          <h1>デザインの設定</h1>
          <p>HTMLのデザイン(色・罫線)を設定できます。</p>
          {styleList}
        </div>
        <div>
          <h1>時間割をプレビューする</h1>
          <p>クリックすると別ウィンドウを開きます。</p>
          {previewTable}
        </div>
        <div>
          <h1>時間割データの保存</h1>
          <p>時間割データは、JSON、Markdown、HTMLのいずれかの形式で保存できます。</p>
          <p>JSONまたはHTMLの場合、このページで読み込めば既存の時間割を編集できます。</p>
          <p>ただし、HTMLで読み込む場合はセルのリンクなし項目のプレースホルダが保存されません。ご了承ください。</p>
        </div>
        <div>
          <h2>時間割をJSONで保存</h2>
          {jsonDownloadButton}
        </div>
        <div>
          <h2>時間割をMarkdownで保存</h2>
          {markdownDownloadButton}
        </div>
        <div>
          <h2>時間割をHTMLで保存</h2>
          {htmlDownloadButton}
        </div>
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <TimeTableRenderer />
    </div>
  );
}

export default App;
