export class PagedData<T> {
  page: number;
  size: number;
  records: T[];
  totalCount: number;
}
