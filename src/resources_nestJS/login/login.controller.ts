import { Controller, Param, Post } from '@nestjs/common';
import { AuthorizationUserDTO } from './dto/AuthorizationUser.dto';
import { IToken } from './interfaces/IToken';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Param() params: AuthorizationUserDTO): Promise<IToken> {
    return this.loginService.login(params.login, params.password);
  }
}
