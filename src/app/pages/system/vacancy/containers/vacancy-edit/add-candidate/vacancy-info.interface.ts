export interface VacancyInfo {
  id: number;
  name: string;
  description: string;
  position: string;
  status: VacancyStatusEnum;
}

export enum VacancyStatusEnum {
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELED = 'canceled',
}
