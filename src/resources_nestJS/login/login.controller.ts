import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationUserDTO } from './dto/AuthorizationUser.dto';
import { IToken } from './interfaces/IToken';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() body: AuthorizationUserDTO): Promise<IToken> {
    return this.loginService.login(body.login, body.password);
  }
}
