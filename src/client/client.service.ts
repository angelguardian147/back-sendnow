import { Model } from 'mongoose';
import { Injectable, Inject, Query } from '@nestjs/common';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { IClient } from 'src/interfaces/client.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ClientService {

    constructor(@Inject('CLIENT_MODEL') private clientModel: Model<IClient>, private readonly authService: AuthService){}

    // creating a contact and saving its id in user
    async create(email_user: string, createClientDto: CreateClientDto): Promise<IClient>{
        try{
            const createClient = new this.clientModel(createClientDto);
            const result = await createClient.save();
            if (result) {
                await this.authService.addContact(email_user, createClient.email);
            }
            return result;
        }catch(error){
            return error;
        }
    }

    // get all the client´s id in the user
    async findAll(email_user: string): Promise<any[]>{
        try {
            const contacts = await this.authService.findAllContacts(email_user);
            return contacts[0].data.contacts;
        } catch (error) {
            return error;
        }
    }

    // make a query with the client´s id 
    createQuery(clients_email: string[]): {}{
        try {
            let query = [];
            if (clients_email) {
                clients_email.forEach(item => {
                    query.push({ email: item });
                });
            }
        return query;
        } catch (error) {
            return {};
        }
    }

    // get all the clients from the query
    async findAllContacts(@Query() query: any): Promise<IClient[]>{
        try {
            if(query.length){
                const contacts = await this.clientModel.find({$or: query}).exec();
                return contacts;
            } 
        } catch (error) {
            return error;
        }
    }

    async findClient(email_client: string): Promise<IClient>{
        try {
            const result = await this.clientModel.findOne({email: email_client}).exec();
            return result;
        } catch (error) {
            return error;
        }
    }

    // get all the clients from the query
    async find(@Query() query: any, param: string): Promise<IClient[]>{
        try {
            if(query.length && param){
                const result = await this.clientModel.find(
                    {
                        $and: [
                            {
                                $or: query
                            },
                            {
                                $or: [
                                    {firstName: param}, 
                                    {lastName: param}, 
                                    {charge: param},
                                    {company: param},
                                    {address: param},
                                    {email: param}
                                ]
                            }
                        ]
                    });
                return result;
            }
        } catch (error) {
            return error;
        }   
    }

    async update(email_contact: string, createClientDto: CreateClientDto): Promise<any>{
        try {
            const result = await this.clientModel.updateOne(
                {
                    email: email_contact
                },
                {
                    $set: {
                        firstName: createClientDto.firstName,
                        lastName: createClientDto.lastName,
                        tel: createClientDto.tel,
                        estado: createClientDto.estado,
                        address: createClientDto.address,
                        charge: createClientDto.charge,
                        company: createClientDto.company,
                        email: createClientDto.email
                    }
                }
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    // remove the client with the id from the param
    async remove(email_user: string, email_contact: string): Promise<any>{
        try {
            const result = await this.clientModel.deleteOne({ email: email_contact });
            if (result) {
                await this.authService.deleteContact(email_user, email_contact);
            }
            return result;
        } catch (error) {
            return error;
        }
    }

}
