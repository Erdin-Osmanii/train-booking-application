export class CreateUserResponse {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
  ) {}
}
