import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';

@Injectable({
    providedIn: 'root'
})
export class MongodbService {
    private app: Realm.App;
    private readonly credentials: Realm.Credentials;

    constructor() {
        this.app = new Realm.App({ id: 'med4life-azhmzdb' }); // Replace with your Realm app ID
        this.credentials = Realm.Credentials.anonymous(); // Use your preferred authentication method
    }

    async login() {
        if (!this.app.currentUser) {
            await this.app.logIn(this.credentials);
        }
    }

    async getUsers() {
        await this.login();
        const users = this.app.currentUser.functions.callFunction('getUsers');
        console.log(users.then())
        return users;
    }

    async getUserById(userId: number) {
        await this.login();
        const users = this.app.currentUser.functions.callFunction('getUserById', userId);
        console.log(users.then())
        return users;
    }
    async getPatientHealthStatus(userId: number) {
        await this.login();
        const users = this.app.currentUser.functions.callFunction('getPatientHealthStatus', userId);
        return users;
    }
}
