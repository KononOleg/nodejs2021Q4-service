import { IsString } from 'class-validator';

export class AuthorizationUserDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
