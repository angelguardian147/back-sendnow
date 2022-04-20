import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class EmailGuard implements CanActivate {

  constructor(private authService: AuthService){}

  async canActivate( context: ExecutionContext ): Promise<any> {
    const user = context.switchToHttp().getRequest();
    const result = await this.authService.findUserEmail(user.body.email);
    if(result){
      throw new HttpException('This Email Already Exist!', HttpStatus.FORBIDDEN);
    }
    return user.body;
  }

}
