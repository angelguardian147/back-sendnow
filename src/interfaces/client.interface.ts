import { Document } from 'mongoose';

export interface IClient extends Document{

    readonly _id: string;

    readonly firstName: string;

    readonly lastName: string;

    readonly tel: number;

    readonly estado: string;

    readonly address: string;

    readonly charge: string;

    readonly company: string;

    readonly email: string;

    readonly contacts: string[];

}