export * from './menstrual-calendar.model';
export * from './menstrual-cycle-log.model';

export interface Symptom {
  name: string;
}

export interface MenstrualInfo {
  date: number;
  menstruation: boolean;
  symptoms: Symptom[];
}
