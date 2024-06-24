import { config as dotenvConfig } from 'dotenv';

export const jwtConstants: () => string = () => {
  dotenvConfig();
  const secret: string = process.env.JWT_SECRET;
  return secret;
};
