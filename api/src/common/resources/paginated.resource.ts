export class PaginatedResource<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;

  constructor(
    data: any[],
    ResourceClass: new (entity: any) => T,
    page: number,
    limit: number,
    total: number,
  ) {
    this.items = data.map((item) => new ResourceClass(item));
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}
