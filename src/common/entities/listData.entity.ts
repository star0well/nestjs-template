export class ListData {
  constructor(options: { list: object[]; total: number }) {
    Object.assign(this, options);
  }
}
