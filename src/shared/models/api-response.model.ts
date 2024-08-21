export class ApiResponse<T> {
  title?: string;
  message?: string;
  code?: number;
  data?: T;
}
