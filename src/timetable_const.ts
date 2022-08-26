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
  export type DayOfWeek = typeof dayOfWeeks[number];
}