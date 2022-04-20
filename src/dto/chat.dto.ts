import { IContent } from "src/interfaces/content.interface";

export class ChatDto{

    _id: string;

    type: string;

    name: string;

    users_email: string[];

    content: IContent[];
    
}