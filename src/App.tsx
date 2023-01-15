import React from 'react';

import { TimeTable } from './timetable'

type DowMaxiesProps = {
  onDowMaxChange: (dowMax: number) => void;
}

const DowMaxies: React.FC<DowMaxiesProps> = (props) => {
  const onDowMaxChange = (num: number) => {
    props.onDowMaxChange(num);
  }

  return (
    <>
      <p>何曜日まで入れるかを選んでください。</p>
      <select defaultValue="5" onChange={event => onDowMaxChange(Number(event.target.value))}>
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

type LoadTableProps = {
  onJSONLoad: (json: string) => void;
  onHTMLLoad: (htmlString: string) => void;
}

const LoadTable: React.FC<LoadTableProps> = (props) => {
  const onJSONLoad = (json: string) => {
    props.onJSONLoad(json);
  }

  const onHTMLLoad = (htmlString: string) => {
    props.onHTMLLoad(htmlString);
  }

  return (
    <>
      <input type="button" ref="file"></input>
      <input type="button" value="JSONを読み込む" onClick={event => onJSONLoad(event.button.toString())}/>
      <input type="button" value="HTMLを読み込む" onClick={event => onHTMLLoad(event.button.toString())}/>
    </>
  );
}

type PeriodMaxiesProps = {
  onPeriodMaxChange: (periodMax: number) => void;
}

const PeriodMaxies: React.FC<PeriodMaxiesProps> = (props) => {
  const onPeriodMaxChange = (num: number) => {
    props.onPeriodMaxChange(num);
  }

  return (
    <>
      <p>時限数を選んでください。</p>
      <select defaultValue="5" onChange={event => onPeriodMaxChange(Number(event.target.value))}>
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

type PeriodRangeProps = {
  period: number;
  onPeriodChange: (period: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) => void;
}

const PeriodRange: React.FC<PeriodRangeProps> = (props) => {
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
      <select name="hourRangeSt" onChange={event => onPeriodHourRangeStChange(event.target.value)}>
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
      <select name="minuteRangeSt" onChange={event => onPeriodMinuteRangeStChange(event.target.value)}>
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
      <select name="hourRangeEn" onChange={event => onPeriodHourRangeEnChange(event.target.value)}>
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
      <select name="minuteRangeEn" onChange={event => onPeriodMinuteRangeEnChange(event.target.value)}>
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

type PeriodRangesProps = {
  maxPeriod: number;
  onPeriodChange: (period: number, startHour?: string, startMin?: string, endHour?: string, endMin?: string) => void;
}

const PeriodRanges: React.FC<PeriodRangesProps> = (props) => {
  return (
    <>
      <p>開講時間の範囲を入力してください。</p>
      {
        [...Array(props.maxPeriod).keys()].map((i) => {
          return (
            <div key={i.toString()}>
              <PeriodRange
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

type FieldItemsProps = {
  onFieldItemCheckBoxChange: (idx: number, checked: boolean) => void;
  onFieldItemNameChange: (idx: number, txt: string) => void;
}

const FieldItems: React.FC<FieldItemsProps> = (props) => {
  const onFieldItemCheckBoxChange = (idx: number, checked: boolean) => {
    props.onFieldItemCheckBoxChange(idx, checked);
  }
  const onFieldItemNameChange = (idx: number, text: string) => {
    props.onFieldItemNameChange(idx, text);
  }

  return (
    <>
      <div>
        <h3>項目1</h3>
        リンク有<input type="checkbox" onChange={event => onFieldItemCheckBoxChange(0, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" onChange={event => onFieldItemNameChange(0, event.target.value)}/>
      </div>
      <div>
        <h3>項目2</h3>
        リンク有<input type="checkbox" onChange={event => onFieldItemCheckBoxChange(1, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" onChange={event => onFieldItemNameChange(1, event.target.value)}/>
      </div>
      <div>
        <h3>項目3</h3>
        リンク有<input type="checkbox" onChange={event => onFieldItemCheckBoxChange(2, event.target.checked)}/>
        <br/>
        <input type="text" placeholder="表示名" onChange={event => onFieldItemNameChange(2, event.target.value)}/>
      </div>
    </>
  );
}

type EditTableProps = {
  table: TimeTable.Table;
  onEditFieldTitleChange: (dowIdx: number, periodIdx: number, txt: string) => void;
  onEditFieldItemChange: (dowIdx: number, periodIdx: number, itemIdx: number, txt: string) => void;
}

const EditTable: React.FC<EditTableProps> = (props) => {
  const dowN = props.table.getDowSize();
  const periodN = props.table.getPeriodSize();
  const onEditFieldTitleChange = (dowIdx: number, periodIdx: number, text: string) => {
    props.onEditFieldTitleChange(dowIdx, periodIdx, text);
  }
  const onEditFieldItemChange = (dowIdx: number, periodIdx: number, itemIdx: number, text: string) => {
    props.onEditFieldItemChange(dowIdx, periodIdx, itemIdx, text);
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
            [...Array(periodN).keys()].map((periodIdx) => {
              return (
                <tr key={periodIdx.toString()}>
                  <td>{props.table.getPeriodArray()[periodIdx].period}</td>
                  {
                    /* i時限の行を曜日列方向になめる。 */
                    [...Array(dowN).keys()].map((dowIdx) => {
                      /* セル中の各項目。 */
                      return (
                        <td key={dowIdx.toString()}>
                          <input type="text" name="fieldTitle" placeholder="タイトル"
                              onChange={event => onEditFieldTitleChange(dowIdx, periodIdx, event.target.value)}/>
                          {
                            props.table.getFields()[dowIdx][periodIdx].items.map((item, itemIdx) => {
                              const placeholder = item.name + (item.isLink ? "のURL" : "");
                              return <div key={itemIdx.toString()}>
                                       <input type="text" name="fieldText" placeholder={placeholder}
                                              onChange={event => onEditFieldItemChange(dowIdx, periodIdx, itemIdx, event.target.value)}/>
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

const DownloadString = (filename: string, str: string) => {
  const blob = new Blob([str], {type: 'text/plain'});
  const download_link = document.createElement('a');
  download_link.href = URL.createObjectURL(blob);
  download_link.download = filename;
  download_link.click();
}

type DownloadAsJSONProps = {
  jsonStr: string;
}

const DownloadAsJSON: React.FC<DownloadAsJSONProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.json", props.jsonStr)}
        value="JSONとして保存"/>
  );
}

type DownloadAsMarkdownProps = {
  markdownStr: string;
}

const DownloadAsMarkdown: React.FC<DownloadAsMarkdownProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.md", props.markdownStr)}
        value="マークダウンとして保存"/>
  );
}

type DownloadAsHTMLProps = {
  htmlStr: string;
}

const DownloadAsHTML: React.FC<DownloadAsHTMLProps> = (props) => {
  return (
    <input type="button"
        onClick={() => DownloadString("timetable.html", props.htmlStr)}
        value="HTMLとして保存"/>
  );
}

type TimeTableRendererState = {
  table: TimeTable.Table;
}
class TimeTableRenderer extends React.Component<{}, TimeTableRendererState> {
  constructor(props: {}) {
    super(props);
    this.state = { table: new TimeTable.Table(5, 5) };
  }

  private updateFromJSON = (json: string) => {
    const table = this.state.table;
    table.fromJSON(json);
    this.setState({ table: table });
  }

  private updateFromHTML = (htmlString: string) => {
    const table = this.state.table;
    table.fromHTML(htmlString);
    this.setState({ table: table });
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

  private updateFieldTitle = (dowIdx: number, periodIdx: number, title: string) => {
    const field = this.state.table.getField(periodIdx, dowIdx);
    field.name = title;
    const table = this.state.table;
    table.setField(field, dowIdx, periodIdx);
    this.setState({ table: table });
  };

  private updateFieldItemIsLink = (idx: number, isLink: boolean) => {
    const item_tmpls = this.state.table.getItemStructure();
    item_tmpls[idx].isLink = isLink;
    const table = this.state.table;
    table.setItemStructure(item_tmpls);
    this.setState({ table: table });
  };

  private updateFieldItemName = (idx: number, name: string) => {
    const item_tmpls = this.state.table.getItemStructure();
    item_tmpls[idx].name = name;
    const table = this.state.table;
    table.setItemStructure(item_tmpls);
    this.setState({ table: table });
  };

  private updateFieldItemValue = (dowIdx: number, periodIdx: number, itemIdx: number, value: string) => {
    const field = this.state.table.getField(periodIdx, dowIdx);
    field.items[itemIdx].value = value;
    const table = this.state.table;
    table.setField(field, dowIdx, periodIdx);
    this.setState({ table: table });
  };

  render() {
    const table = this.state.table;
    const loadTable = <LoadTable onJSONLoad={string => this.updateFromJSON(string)} onHTMLLoad={string => this.updateFromHTML(string)}/>;
    const dowMaxies = <DowMaxies onDowMaxChange={num => this.updateDowSize(num)}/>;
    const periodMaxies = <PeriodMaxies onPeriodMaxChange={num => this.updatePeriodSize(num)}/>;
    const periodRanges = <PeriodRanges maxPeriod={table.getPeriodSize()} onPeriodChange={this.updatePeriodRanges}/>;
    const fieldItems = <FieldItems onFieldItemCheckBoxChange={this.updateFieldItemIsLink} onFieldItemNameChange={this.updateFieldItemName}/>;
    const editTable = <EditTable table={table} onEditFieldTitleChange={this.updateFieldTitle} onEditFieldItemChange={this.updateFieldItemValue}/>;
    const downloadAsJSON = <DownloadAsJSON jsonStr={JSON.stringify(this.state.table.toObject())}/>;
    const downloadAsMarkdown = <DownloadAsMarkdown markdownStr={this.state.table.toMarkdown()}/>;
    const downloadAsHTML = <DownloadAsHTML htmlStr={this.state.table.toHTML('th {background-color: gray;}table,th,td {border: solid;}')}/>;
    return (
      <>
        <div>
          <h1>時間割データの読込</h1>
          <p>過去に保存した時間割データを読み込めば、編集ができます。</p>
          {loadTable}
        </div>
        <div>
          <h1>時間割の入力</h1>
        </div>
        <div>
          <h2>曜日</h2>
          {dowMaxies}
        </div>
        <div>
          <h2>時限</h2>
          {periodMaxies}
        </div>
        <div>
          <h2>時限の範囲</h2>
          {periodRanges}
        </div>
        <div>
          <h2>コマの項目</h2>
          {fieldItems}
        </div>
        <div>
          <h2>時間割の入力</h2>
          {editTable}
        </div>
        <div>
          <h1>時間割データの保存</h1>
          <p>時間割データは、JSON、Markdown、HTMLのいずれかの形式で保存できます。</p>
          <p>JSONまたはHTMLの場合、このページで読み込めば既存の時間割を編集できます。</p>
          <p>ただし、HTMLで読み込む場合はセルのリンクなし項目のプレースホルダが保存されません。ご了承ください。</p>
        </div>
        <div>
          <h2>時間割をJSONで保存</h2>
          {downloadAsJSON}
        </div>
        <div>
          <h2>時間割をMarkdownで保存</h2>
          {downloadAsMarkdown}
        </div>
        <div>
          <h2>時間割をHTMLで保存</h2>
          {downloadAsHTML}
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
