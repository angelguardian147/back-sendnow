import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { UserDto } from 'src/dto/user.dto';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(@Inject('USER_MODEL') private userModel: Model<IUser>){}

    async create(userDto: UserDto): Promise<IUser>{
        const createUser = new this.userModel(userDto);
        const result = await createUser.save();
        return result;
    }

    async findOne(userName: string): Promise<IUser>{
        const result = await this.userModel.findOne({userName: userName}).exec();
        return result;
    }

    async findOneEmail(email: string): Promise<IUser>{
        const result = await this.userModel.findOne({'data.email': email}, {_id:0, 'data.email': 1}).exec();
        return result;
    }

    async addContact(email_user: string, email_contact: string): Promise<any>{
        const result = await this.userModel.updateOne({'data.email': email_user}, {$push: {"data.contacts": email_contact}});
        return result;
    }

    async findAllContacts(email_user: string): Promise<any>{
        const result = await this.userModel.find({'data.email': email_user}, {'data.contacts': 1, _id: 0}).exec();
        return result;
    }

    async deleteContact(email_user: string, email_contact: string): Promise<any>{
        const result = await this.userModel.updateOne({'data.email': email_user}, {$pull: {'data.contacts': email_contact}});
        return result;
    }

}
