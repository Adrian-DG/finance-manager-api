export class ApiResponse<T> {
  title?: string;
  message?: string;
  status?: boolean;
  code?: number;
  data?: T | any;
}
