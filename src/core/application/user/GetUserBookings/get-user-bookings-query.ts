export class GetUserBookingsQuery {
  constructor(
    public readonly id: string,
    public readonly logedInId: string,
    public readonly ignorePrevious: boolean = true,
  ) {}
}
