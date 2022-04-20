import { Connection } from 'mongoose';
import { Chat } from '../schemas/chat.schema';

export const chatProviders = [
    {
        provide: 'CHAT_MODEL',
        useFactory: (connection: Connection) => connection.model('Chat', Chat),
        inject: ['DATABASE_CONNECTION'],
    },
];