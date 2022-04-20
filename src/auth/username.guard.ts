import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class UsernameGuard implements CanActivate {

  constructor(private authService: AuthService){}

  async canActivate( context: ExecutionContext ): Promise<any>{
    const user = context.switchToHttp().getRequest();
    const result = await this.authService.validateUserName(user.body.userName);
    if (result) {
      throw new HttpException('This User Already Exists!', HttpStatus.FORBIDDEN);
    }
    return user.body;
  }
}
