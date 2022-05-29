import { assert } from "chai";
import { describe, it } from "mocha";
import { Const } from "../src/const";
import { TimeTable } from "../src/timetable";

describe("TimeTableクラスの初期化", () => {
  describe("異常な入力", () => {
    describe("曜日が空の場合．", () => {
      const table = new TimeTable.Table([], 5);
      const tableObj = table.toObject();

      it("月 火 水 木 金 になる．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 5);
        assert.deepEqual(dowHeaders, ["月", "火", "水", "木", "金"]);
      });
    });

    describe("時限が0の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], 0);
      const tableObj = table.toObject();

      it ("1 2 3 4 5 になる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 5);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4", "5"]);
      });
    });

    describe("時限が0未満の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], -5);
      const tableObj = table.toObject();

      it ("1 2 3 4 5 になる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 5);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4", "5"]);
      });
    });

    describe("時限が11の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], 11);
      const tableObj = table.toObject();

      it ("1 2 3 4 5 になる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 5);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4", "5"]);
      });
    });

    describe("時限が12以上の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], 100);
      const tableObj = table.toObject();

      it ("1 2 3 4 5 になる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 5);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4", "5"]);
      });
    });
  });

  describe("正常な入力", () => {
    describe("曜日が月のみの場合．", () => {
      const table = new TimeTable.Table([Const.MON], 5);
      const tableObj = table.toObject();

      it("月のみになる．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 1);
        assert.deepEqual(dowHeaders, ["月"]);
      });
    });

    describe("曜日が全曜日の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.TUE, Const.WED, Const.THU, Const.FRI, Const.SAT, Const.SUN], 5);
      const tableObj = table.toObject();

      it("全曜日になる．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 7);
        assert.deepEqual(dowHeaders, ["月", "火", "水", "木", "金", "土", "日"]);
      });
    });

    describe("曜日が順番通りでない場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.WED, Const.TUE], 3);
      const tableObj = table.toObject();

      it("入力通りになる．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 3);
        assert.deepEqual(dowHeaders, ["月", "水", "火"]);
      });
    });

    describe("曜日が飛んでいる場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.WED, Const.FRI], 3);
      const tableObj = table.toObject();

      it("入力通りになる．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 3);
        assert.deepEqual(dowHeaders, ["月", "水", "金"]);
      });
    });

    describe("時限が1のみの場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], 1);
      const tableObj = table.toObject();

      it("1のみになる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 1);
        assert.deepEqual(periodHeaders, ["1"]);
      });
    });

    describe("時限が10までの場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.THU, Const.WED], 10);
      const tableObj = table.toObject();

      it("10までになる．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 10);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
      });
    });

    describe("通常の入力の場合．", () => {
      const table = new TimeTable.Table([Const.MON, Const.TUE, Const.WED], 4);
      const tableObj = table.toObject();

      it("曜日の数が等しい．", () => {
        const dowHeaders = tableObj["dowHeader"];

        assert.lengthOf(dowHeaders, 3);
        assert.deepEqual(dowHeaders, ["月", "火", "水"]);
      });

      it("時限の数が等しい．", () => {
        const periodHeaders = tableObj["periodHeader"];

        assert.lengthOf(periodHeaders, 4);
        assert.deepEqual(periodHeaders, ["1", "2", "3", "4"]);
      });
    });
  });
});

describe("フィールド構造の設定", () => {
  describe("正常な入力", () => {
    describe("項目が空の場合", () => {
    });

    describe("通常の場合", () => {
    });
  });
});

describe("フィールド値の設定", () => {
  describe("異常な入力", () => {
    describe("時間割に存在しない曜日を指定した場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割に存在しない時限を指定した場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割のフィールドには項目があり、入力には項目がない場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割のフィールドの項目数より少ない場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割のフィールドの項目数より多い場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割のフィールドの項目名と異なる場合", () => {
      it("エラーを返す", () => {
      })
    });

    describe("時間割のフィールドの項目のリンク有フラグと異なる場合", () => {
      it("エラーを返す", () => {
      })
    });
  });

  describe("正常な入力", () => {
    describe("フィールド名が空文字列の場合", () => {
    });

    describe("項目の値が空文字列の場合", () => {
    });

    describe("項目の値がすべて空文字列ではない場合", () => {
    });

    describe("リンク有で、リンクが空文字列の場合", () => {
    });

    describe("リンク無で、リンクが空文字列でない場合", () => {
    });

    describe("リンク無で、リンクが空文字列の場合", () => {
    });

    describe("リンク有で、リンクが空文字列でない場合", () => {
    });
  })
});
