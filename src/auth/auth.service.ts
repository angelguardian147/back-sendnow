import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtResponse } from 'src/interfaces/jwt-response.interface';
import { UserService } from '../user/user.service';
import { UserDto } from 'src/dto/user.dto';
import { IClient } from 'src/interfaces/client.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {

    userLog: JwtResponse;
    
    constructor(private jwtService: JwtService, private userService: UserService){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOne(username);
        if(user && user.password === password){
            const userAlone = {
                email : user.data.email,
                username: user.userName
            }
            return userAlone;
        }
        return null;
    }

    async validateUserName(username: string): Promise<any>{
        const user = await this.userService.findOne(username);
        if(user){
            const userAlone = {
                email : user.data.email,
                username: user.userName
            }
            return userAlone;
        }
        return null;
    }

    async login(user: any){
        const payload = { username: user.username, email: user.email};
        this.userLog = {
            email: payload.email,
            username: payload.username,
            access_token: this.jwtService.sign(payload)
        };
        return this.userLog;
    }

    async create(userDto: UserDto): Promise<JwtResponse>{
        const createUser = await this.userService.create(userDto);
        this.userLog = await this.login(createUser);
        return this.userLog;
    }

    async addContact(user_email: string, email_contact: string): Promise<any>{
        const result = await this.userService.addContact(user_email, email_contact);
        return result;
    }

    async findAllContacts(email_user: string): Promise<any>{
        const result = await this.userService.findAllContacts(email_user);
        return result;
    }

    async deleteContact(email_user: string, email_contact: string): Promise<any>{
        const result = await this.userService.deleteContact(email_user, email_contact);
        return result;
    }

    async findUserEmail(email: string): Promise<IUser>{
        const result = await this.userService.findOneEmail(email);
        return result;
    }

}
