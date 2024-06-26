import { IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  trainName: string;
  @IsString()
  departureTime: string;
  @IsString()
  arrivalTime: string;
  @IsString()
  origin: string;
  @IsString()
  destination: string;
}