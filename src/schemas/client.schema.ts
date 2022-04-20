import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

export type ClientDocument = ClientS & Document;

@Schema()
export class ClientS{

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    tel: number;

    @Prop()
    estado: string;

    @Prop()
    address: string;

    @Prop()
    charge: string;

    @Prop()
    company: string;

    @Prop()
    email: string;

    @Prop()
    contacts: string[];

}

export const Client = SchemaFactory.createForClass(ClientS);

// import * as mongoose from 'mongoose';

// export const Client = new mongoose.Schema({

//     firstName: String,

//     lastName: String,

//     tel: Number,

//     estado: String,

//     address: String,

//     charge: String,

//     company: String,

//     email: String,

// });