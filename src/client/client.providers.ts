import { Connection } from 'mongoose';
import { Client } from 'src/schemas/client.schema';

export const clientProviders = [
    {
        provide: 'CLIENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Client', Client),
        inject: ['DATABASE_CONNECTION'],
    },
];