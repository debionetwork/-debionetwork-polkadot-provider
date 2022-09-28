export * from './menstrual-calendar.model';
export * from './menstrual-cycle-log.model';

export interface Symptom {
  name: string;
}

export interface MenstrualCycleLogModel {
  id: string;
  menstrualCalendarId: string;
  date: number;
  menstruation: boolean;
  symptoms: Array<Symptom>;
  createdAt: number;
  updatedAt: number;
}