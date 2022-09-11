export namespace TimeTableConst {
  export const MON = 0;
  export const TUE = 1;
  export const WED = 2;
  export const THU = 3;
  export const FRI = 4;
  export const SAT = 5;
  export const SUN = 6;

  export const DAY_OF_WEEK_CHARS = ["月", "火", "水", "木", "金", "土", "日"] as const;
  export const dayOfWeeks = [MON, TUE, WED, THU, FRI, SAT, SUN] as const;

  export const periodMaxSize = 8;
  export const periodDefaultSize = 5;
  export const dowDefaultSize = 5;

  /* jsでは時刻単体のクラスがないので、日付をbaseDateに固定した日時クラスで時刻を扱う。 */
  export const baseDate = new Date("2000-01-01 00:00:00");
}