export class MenstrualCalendar {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.addressId = anyJson.addressId;
    this.averageCycle = anyJson.averageCycle;
    this.cycleLog = anyJson.cycleLog;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  id: string;
  addressId: string;
  averageCycle: number;
  cycleLog: string[];
  createdAt: Date;
  updatedAt: Date;
}
