import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IContent } from '../interfaces/content.interface';

export type ChatDocument = Chats & Document;

@Schema()
export class Chats{

    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop()
    users_email: string[];

    @Prop({type: [{}]})
    content: IContent[];

}

export const Chat = SchemaFactory.createForClass(Chats);