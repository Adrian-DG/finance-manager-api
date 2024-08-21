export class MessageType {
  message: string;
  property: string;
}

export class ApiResponse<T> {
  title?: string;
  message?: string;
  code?: number;
  data?: T;
}
