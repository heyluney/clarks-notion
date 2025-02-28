// singleton

import { Component } from './component';

type DatabaseObject = {
    [key: number]: Component;
}

class Database {
    private static instance: Database;

    private database: DatabaseObject;

    private constructor() {
        this.database = {};
    }

    // when we start the app we need: let x = new Database();
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.getInstance;
    }

    getComponent(id: number) : Component {
        return this.database[id];
    }
}

export default Database;