import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatDto } from 'src/dto/chat.dto';
import { IChat } from 'src/interfaces/chat.interface';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async create(@Res() res, @Body() chat: ChatDto, @Auth() { email } : any): Promise<IChat>{
        const result = await this.chatService.create(email, chat);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async findAll(@Res() res): Promise<IChat[]>{
        const result = await this.chatService.findAll();
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async findAllById(@Res() res, @Auth() { email } : any): Promise<IChat[]>{
        const result = await this.chatService.findAllByEmail(email);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/listids/:email')
    async findAllByIds(@Res() res, @Param('email') email_client: string, @Auth() { email } : any): Promise<IChat>{
        const result = await this.chatService.findAllByEmails(email_client, email);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

}
