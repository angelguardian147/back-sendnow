import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';
import { EmailGuard } from './email.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UsernameGuard } from './username.guard';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService ){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req){
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/finduser/:email')
    async getUserEmail(@Res() res, @Param('email') email: string): Promise<IUser>{
        const result = await this.authService.findUserEmail(email);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(UsernameGuard)
    @UseGuards(EmailGuard)
    @Post('/create')
    create(@Body() user: UserDto){
        return this.authService.create(user); 
    }

    @Get('/authenticated')
    @UseGuards(JwtAuthGuard)
    getAuthenticated(){
        return true;
    }

}
