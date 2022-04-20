import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IClient } from "src/interfaces/client.interface";


export type UserDocument = Users & Document;

@Schema()
export class Users{

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop({type: {}})
    data: IClient;

}

export const User = SchemaFactory.createForClass(Users);