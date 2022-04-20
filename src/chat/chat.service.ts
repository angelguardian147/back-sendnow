import { Inject, Injectable } from '@nestjs/common';
import { IChat } from 'src/interfaces/chat.interface';
import { Model } from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { IUser } from 'src/interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { ClientService } from 'src/client/client.service';
import { IClient } from 'src/interfaces/client.interface';

@Injectable()
export class ChatService {

    constructor(@Inject('CHAT_MODEL') private chatModel: Model<IChat>, 
                private authService: AuthService,
                private clientService: ClientService){}

    async create(user_email: string, chat: ChatDto): Promise<any>{
        if(user_email && chat.users_email[0]){
            const chat_users = await this.findAllByEmails(chat.users_email[0], user_email);
            if (chat_users) {
                const result = await this.chatModel.updateOne(
                    {
                        users_email: { $all: [chat.users_email[0], user_email] }
                    },
                    {
                        $push: {
                            content: chat.content[0]
                        }
                    }
                );
                return result;
            } else {
                const createChat = new this.chatModel(chat);
                const result = await createChat.save();
                if (result) {
                    await this.updateMore(user_email, result._id);
                }
                return result;
            }
        }
    }

    async updateMore(user_email: string, _id: string): Promise<any>{
        const result = await this.chatModel.updateOne(
            {
                _id: _id
            },
            {
                $push: {
                    users_email: user_email
                }
            }
        );
        return result;
    }

    async findAll(): Promise<IChat[]>{
        const result = await this.chatModel.find().exec();
        return result;
    }

    async findAllByEmail(email: string): Promise<IChat[]>{
        const result = await this.chatModel.find({users_email: {$in: email}}).exec();
        return result;
    }

    async findAllByEmails(email_contact: string, user_email: string): Promise<IChat>{
        const result = await this.chatModel.findOne({users_email: {$all: [email_contact, user_email]}}).exec();
        return result;
    }

    async validateContactEmail(email: string): Promise<IUser>{
        const result = await this.authService.findUserEmail(email);
        return result;
    }

    async findClient(email: string): Promise<IClient>{
        const result = await this.clientService.findClient(email);
        return result;
    }

}
