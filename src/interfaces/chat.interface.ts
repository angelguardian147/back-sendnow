import { Document } from 'mongoose';
import { IContent } from './content.interface';

export interface IChat extends Document{

    readonly _id: string;
    readonly type: string;
    readonly name: string;
    readonly users_email: string[];
    readonly content: IContent[];

}