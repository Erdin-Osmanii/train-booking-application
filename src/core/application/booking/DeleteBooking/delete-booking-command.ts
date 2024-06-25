export class DeleteBookingCommand {
    constructor(
        public readonly id: string,
        public readonly userId: string,
    ) {}
}
