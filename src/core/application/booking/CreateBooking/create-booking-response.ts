export class CreateBookingResponse {
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
