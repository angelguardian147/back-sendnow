import { Document } from 'mongoose';

export interface IContent extends Document{

    readonly user_email: string;
    readonly date: Date;
    readonly message: string;

}