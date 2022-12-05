export class MenstrualCycleLog {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.menstrualCalendarId = anyJson.menstrualCalendarId;
    this.date = anyJson.date;
    this.menstruation = anyJson.menstruation;
    this.symptoms = anyJson.symptoms;

    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  id: string;
  menstrualCalendarId: string;
  date: Date;
  menstruation: boolean;
  symptoms: string[];
  createdAt: Date;
  updatedAt: Date;
}
