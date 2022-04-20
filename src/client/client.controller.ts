import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { IClient } from 'src/interfaces/client.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/list/:email')
    async findAll(@Res() res, @Param('email') email_user : string): Promise<IClient[]> {
        const emails = await this.clientService.findAll(email_user);
        const query = this.clientService.createQuery(emails);
        const clients = await this.clientService.findAllContacts(query);
        return res.status(HttpStatus.OK).json({
            clients
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/findClient/:email')
    async findClient(@Res() res, @Param('email') email_contact: string): Promise<IClient>{
        const result = await this.clientService.findClient(email_contact);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search/:param')
    async find(@Res() res, @Param('param') param: string, @Auth() { email } : any): Promise<IClient[]>{
        const emails = await this.clientService.findAll(email);
        const query = this.clientService.createQuery(emails);
        const result = await this.clientService.find(query, param);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create/:email')
    async create(@Res() res, @Body() client: CreateClientDto, @Param('email') email_user  : string): Promise<IClient>{
        const result = await this.clientService.create(email_user, client);
        return res.status(HttpStatus.OK).json({
            result
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:email')
    async remove(@Res() res, @Param('email') email_contact: string, @Auth() { email } : any): Promise<IClient>{
        const result = await this.clientService.remove(email, email_contact);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:email')
    async update(@Res() res, @Param('email') email_contact: string, @Body() client: CreateClientDto): Promise<IClient>{
        const result = await this.clientService.update(email_contact, client);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

}
