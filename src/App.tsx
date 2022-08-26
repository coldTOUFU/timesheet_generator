import React from 'react';

import { TimeTable } from './timetable'

const DowMaxies: React.FC = () => {
  return (
    <>
      <p>何曜日まで入れるかを選んでください。</p>
      <select>
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

const PeriodMaxies: React.FC = () => {
  return (
    <>
      <p>時限数を選んでください。</p>
      <select>
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

const PeriodRange: React.FC = () => {
  return (
    <>
      <select name="hourRangeSt">
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
      <select name="minuteRangeSt">
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
      <select name="hourRangeEn">
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
      <select name="minuteRangeEn">
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
}

const PeriodRanges: React.FC<PeriodRangesProps> = props => {
  let rangeElements: JSX.Element[] = [];
  for(let i = 0; i < props.maxPeriod; i++) {
    rangeElements.push(<PeriodRange/>);
    if (i < props.maxPeriod - 1) {
      rangeElements.push(<br></br>);
    }
  }

  return (
    <>
      <p>開講時間の範囲を入力してください。</p>
      {
        [...Array(props.maxPeriod).keys()].map((i) => {
          return <div key={i.toString()}><PeriodRange/></div>
        })
      }
    </>
  );
}

const FieldItems: React.FC = () => {
  return (
    <>
      <div>
        <h3>項目1</h3>
        <input type="checkbox"/>リンク有
        <br/>
        <input type="text" placeholder="表示名"/>
      </div>
      <div>
        <h3>項目2</h3>
        <input type="checkbox"/>リンク有
        <br/>
        <input type="text" placeholder="表示名"/>
      </div>
      <div>
        <h3>項目3</h3>
        <input type="checkbox"/>リンク有
        <br/>
        <input type="text" placeholder="表示名"/>
      </div>
    </>
  );
}

type EditTableProps = {
  tableContent: { dowHeader: string[], periodHeader: string[], body: TimeTable.Field[] };
}

const EditTable: React.FC<EditTableProps> = props => {
  const dowN = props.tableContent.dowHeader.length;
  const periodN = props.tableContent.periodHeader.length;

  return (
    <>
      <p>曜日、時間割、フィールド設定の入力が終わったら、下の「時間割の構造設定を反映」ボタンを押してください．</p>
      <p>その後、各授業の名前や項目の値を入力してください．</p>
      <button type="button">時間割の構造設定を反映</button>
      <table>
        <thead>
          <tr>
            {
              props.tableContent.dowHeader.map((e, idx) => {
                return <th key={idx.toString()}>{e}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            [...Array(periodN).keys()].map((i) => {
              return (
                <tr key={i.toString()}>
                  <td>{props.tableContent.periodHeader[i]}</td>
                  {
                    /* i時限目のセル群(時間割テーブルの横方向)。 */
                    props.tableContent.body.slice(i * dowN, (i + 1) * dowN).map(body => {
                      return body.items.map(item => {
                        const placeholder = item.isLink ? "リンク" : "表示する文字";
                        return <td><input type="text" name="fieldText" placeholder={placeholder}/></td>
                      })
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

type TimeTableRendererState = {
  table: TimeTable.Table;
}

class TimeTableRenderer extends React.Component<{}, TimeTableRendererState> {
  constructor(props: {}) {
    super(props);
    this.state = { table: new TimeTable.Table(5, 5) };
  }

  render() {
    const tableContent = this.state.table.toObject();
    const dowMaxies = <DowMaxies/>;
    const periodMaxies = <PeriodMaxies/>;
    const periodRanges = <PeriodRanges maxPeriod={tableContent.dowHeader.length}/>;
    const fieldItems = <FieldItems/>;
    const editTable = <EditTable tableContent={tableContent}/>;

    return (
      <>
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
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <h1>時間割ジェネレータ</h1>
      <TimeTableRenderer/>
    </div>
  );
}

export default App;
