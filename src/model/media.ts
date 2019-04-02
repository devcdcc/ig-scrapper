import {Model} from 'sequelize';

export class Media extends Model{
    public id!:number;
    public username!: string;
    public fullName!: string;
}