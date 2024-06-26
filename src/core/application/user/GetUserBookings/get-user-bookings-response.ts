export class GetUserBookingsResponse {
  constructor(public readonly bookings: UserBooking[]) {}
}

export class UserBooking {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly trainName: string,
    public readonly departureTime: string,
    public readonly arrivalTime: string,
    public readonly origin: string,
    public readonly destination: string,
  ) {}
}
