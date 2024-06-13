import {Injectable} from '@angular/core';
import * as Realm from 'realm-web';
import {UniquePatient} from "../models/patient";

// import * as process from "node:process";

@Injectable({
    providedIn: 'root'
})
export class MongodbService {
    private app: Realm.App;
    private readonly credentials: Realm.Credentials;
    mongo_id = import.meta.env.NG_APP_MONGO_ID;

    constructor() {
        this.app = new Realm.App({ id: this.mongo_id });
        this.credentials = Realm.Credentials.anonymous();
    }

    async login() {
        if (!this.app.currentUser) {
            await this.app.logIn(this.credentials);
        }
    }

    async getUsers() {
        await this.login();
        return this.app.currentUser.functions.callFunction('getUsers');
    }

    async getUserById(userId: number) {
        await this.login();
        return this.app.currentUser.functions.callFunction('getUserById', userId);
    }
    async getPatientHealthStatus(userId: number) {
        await this.login();
        return this.app.currentUser.functions.callFunction('getPatientHealthStatus', userId);
    }
    async getUniquePatients(){
        await this.login();
        return this.app.currentUser.functions.callFunction('getUniquePatients');
    }

    async addNewPatient(patient: UniquePatient){
        await this.login();
        return this.app.currentUser.functions.callFunction('addNewPatient', patient);
    }

    async getPatientLatestData(){
        await this.login();
        return this.app.currentUser.functions.callFunction('getPatientLatestData');

    }

    async getStats(){
        await this.login();
        return this.app.currentUser.functions.callFunction('getStats');

    }
}
