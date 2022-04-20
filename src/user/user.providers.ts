import { Connection } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export const userProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('user', User),
        inject: ['DATABASE_CONNECTION'],
    },
];