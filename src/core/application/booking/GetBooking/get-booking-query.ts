export class GetBookingQuery {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
