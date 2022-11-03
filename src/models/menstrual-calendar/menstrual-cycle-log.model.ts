import { Symptom } from './symptom';

export class MenstrualCycleLog {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.menstrualCalendarId = anyJson.menstrualCalendarId;
    this.date = anyJson.date;
    this.menstruation = anyJson.menstruation;
    this.symptoms = new Array<Symptom>();

    for (const symptom of anyJson.symptoms) {
      this.symptoms.push(new Symptom(symptom.name));
    }

    this.createdAt = anyJson.createdAt;
  }

  id: string;
  menstrualCalendarId: string;
  date: Date;
  menstruation: boolean;
  symptoms: Symptom[];
  createdAt: Date;
  updatedAt: Date;
}
