export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly logedInId: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
