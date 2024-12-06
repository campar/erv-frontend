export class AppDate {
  private date!: Date;

  private constructor() {
  }

  static now(): AppDate {
    let appDate = new AppDate();
    appDate.date = new Date();
    return appDate;
  }

  static from(date: Date): AppDate {
    return this.createInstance(date)
  }

  static fromZonedDate(date: Date): AppDate {
    return this.createInstance(date)
  }

  private static createInstance(date: Date | null = null) {
    let appDate = new AppDate();
    if (date == null)
      appDate.date = new Date();
    else
      appDate.date = date;
    return appDate;
  }


  public toEndOfDay() {
    this.date.setHours(23);
    this.date.setMinutes(59);
    this.date.setSeconds(59);
    return this;
  }

  toStartOfDay() {
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    return this;
  }

  public minusDays(dayNumber: number): this {
    this.date.setDate(this.date.getDate() - dayNumber);
    return this;
  }

  public minusMonths(monthNumber: number): this {
    this.date.setMonth(this.date.getMonth() - monthNumber);
    return this;
  }

  public minusYears(yearNumber: number): this {
    this.date.setFullYear(this.date.getFullYear() - yearNumber);
    return this;
  }

  public plusDays(dayNumber: number): this {
    this.date.setDate(this.date.getDate() + dayNumber);
    return this;
  }

  public plusMonths(monthNumber: number): this {
    this.date.setMonth(this.date.getMonth() + monthNumber);
    return this;
  }

  public plusYears(yearNumber: number): this {
    this.date.setFullYear(this.date.getFullYear() + yearNumber);
    return this;
  }

  toString(): string {
    return this.toLocalISOString();
  }

  toDate(): Date {
    return this.date;
  }

  private toLocalISOString(): string {
    const offset = this.date.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localDate = new Date(this.date.getTime() - offset); // Adjust the date to local time
    return localDate.toISOString().replace('Z', '')
      ;
  }

  toLocalDate(): Date {
    // const offset = this.date.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    return new Date(this.date.getTime()); // Adjust the date to local time
  }

  toOffsetDateTimeString(): string {
    // Get the timezone offset in minutes
    const offsetMinutes = this.date.getTimezoneOffset();
    const absOffsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const absOffsetMinutes = Math.abs(offsetMinutes) % 60;

    // Construct the offset string
    const offsetSign = offsetMinutes > 0 ? '-' : '+';
    const offsetString = `${offsetSign}${String(absOffsetHours).padStart(2, '0')}:${String(absOffsetMinutes).padStart(2, '0')}`;

    // Format the date to include the offset
    const isoString = this.date.toISOString().replace('Z', '');
    return `${isoString}${offsetString}`;
  }

}
