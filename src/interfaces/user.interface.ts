import {Document} from 'mongoose';
import { IClient } from './client.interface';

export interface IUser extends Document{

    readonly _id: string;
    readonly userName: string;
    readonly password: string;
    readonly data: IClient;
    
}