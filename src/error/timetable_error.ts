import { BaseError } from "./base_error";

export class PeriodOutOfRangeError extends BaseError {}
export class DayOfWeekOutOfRangeError extends BaseError {}
export class WrongItemStructureError extends BaseError {}
export class FailedToParseObjectError extends BaseError {}
export class FailedToParseHTMLError extends BaseError {}
