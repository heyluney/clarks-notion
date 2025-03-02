import { Component } from './component';

type DataShape = {
    [key: number]: Component;
}

// I think component should be an abstract class
class Database {
    private static instance: Database;

    private constructor(private database: DataShape = {}) {
        this.database = {};
    }

    // Singleton pattern.
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    numberOfComponents() : number {
        return Object.keys(this.database).length;
    }

    addComponent(component: Component): undefined {
        this.database[component.id] = component;
    }

    reset(): void {
        this.database = {};
    }

    getDatabase() : DataShape {
        return this.database;
    }

    getComponent(id: number): Component | undefined {
        return this.database[id];
    }

    deleteComponent(id: number): void {
        const component: Component | undefined = this.database[id];
        if (component === undefined) return;

        // Recursively iterate through and remove children from database as well.
        for (let child of component.getChildren()) {
            this.deleteComponent(child);
        }

        delete this.database[id];
    }
}

export default Database;