import dayjs from "dayjs";

export default class DateTools {
  static getDateStrFromTimestamp(timestamp: number | undefined): string {
    if (!timestamp) return "";
    return DateTools.getDateStr(this.convertTimestampToDate(timestamp));
  }

  static getDateStr(obj: Date | null): string {
    if (!obj) return "";

    return dayjs(obj.toISOString()).format(DateTools.getDateFormatDayJs());
  }

  static getDateStrForDB(obj: Date | null): string {
    if (!obj) return "";

    return dayjs(obj.toISOString()).format(DateTools.getDateFormatDayJsForDB());
  }

  static getDayJsDate(obj: Date | null): any {
    if (!obj) return dayjs();
    return dayjs(obj);
  }

  static getDayJsDateFromTimestamp(timestamp: number | undefined): string {
    if (!timestamp) return "";
    return dayjs(this.convertTimestampToDate(timestamp)).format(DateTools.getDateFormatDayJsWithHoursAndMinutes());
  }
  static dayJsToDate(obj: any): Date {
    if(!obj) return new Date();
    return obj.toDate();
  }

  static convertDateFromDBToDate(date?: string): Date {
    if (!date) return new Date();
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return new Date();
    else if (newDate.toString() === "Invalid Date") return new Date();
    else if (newDate.toString() === "NaN") return new Date();
    else if (newDate.getFullYear() < 1900) return new Date();
    else return newDate;
  }

  static getDateTimeStamp(obj: Date | null): number | null {
    if (!obj) return null;

    const diffLocale = -1 * obj.getTimezoneOffset() * 60000;
    const timestamp = obj.getTime() + diffLocale;

    return Math.round(timestamp / 1000);
  }

  static getDateFormat(): any {
    return "dd.MM.yyyy";
  }

  static getDateFormatDayJs(): any {
    return "DD.MM.YYYY";
  }
  static getDateFormatDayJsWithHoursAndMinutes(): any {
    return "DD.MM.YYYY HH:mm";
  }
  static getDateFormatDayJsForDB(): any {
    return "YYYY-MM-DD";
  }

  static getDateTimeFormat(): any {
    return "dd.MM.yyyy HH:mm";
  }

  static getDate(incrementSecond?: any): any {
    incrementSecond = incrementSecond ? parseInt(incrementSecond) : 0;
    incrementSecond = isNaN(incrementSecond) ? 0 : incrementSecond;

    var rez = new Date();
    rez.setSeconds(rez.getSeconds() + incrementSecond);

    return rez;
  }

  static getTimeStamp(incrementSecond?: any): number {
    const date = this.getDate(incrementSecond);
    let timestamp = date.getTime();
    timestamp = timestamp / 1000;
    timestamp = Math.round(timestamp);

    return timestamp;
  }

  public static convertTimestampToDate(timestamp: number | undefined): Date {
    if (!timestamp) return new Date();
    const t = timestamp * 1000;
    return new Date(t);
  }

  public static convertToDate(value: any): Date {
    return new Date(value);
  }

  
}
