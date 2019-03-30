import {Position} from './positions'; //importing Position class that's a type of my Employee class

//Class to be exported and used that matches the Employee data (to be fetched) from my API
export class Employee{
    _id: string;
    FirstName: string;
    LastName: string;
    AddressStreet: string;
    AddressState: string;
    AddressCity: string;
    AddressZip: string;
    PhoneNum: string;
    Extension: number;
    Position: Position;
    HireDate: string;
    SalaryBonus: number;
    ___v: number;
}