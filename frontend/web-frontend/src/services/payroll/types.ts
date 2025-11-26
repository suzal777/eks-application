export interface Payroll {
  id: number;
  employeeId: number | string;
  salary: string; // storing as string in UI
  month: string;
}
