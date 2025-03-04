import { Component } from './component';

type DataShape = {
    [key: number]: Component;
}

// class Database where I am able to explicitly set the database myself
class Database {
    private static instance: Database;

    private constructor(private database: DataShape) {
        this.database = database;
    }

    // Singleton pattern.
    public static getOrCreateInstance(database: DataShape = {}): Database {
        if (!Database.instance) {
            Database.instance = new Database(database);
        }
        return Database.instance;
    }

    // I feel like this shouldn't be a public method
    // restart database method that 
    reset(): void {
        this.database = {};
    }

    numberOfComponents() : number {
        return Object.keys(this.database).length;
    }

    addComponent(component: Component): undefined {
        this.database[component.id] = component;
    }

    getDatabase() : DataShape {
        return this.database;
    }

    getComponent(id: number): Component | undefined {
        return this.database[id];
    }

    duplicateComponent(id: number, duplicated_parent_id: number) : number {
        // create a new component
        const currentComponent = this.getComponent(id);
        if (currentComponent === undefined) return -1;

        const duplicatedComponent : Component = new Component(duplicated_parent_id, currentComponent.component_type);
        for (let child of currentComponent.children) {
            const duplicated_child_id = 
                this.duplicateComponent(child, duplicatedComponent.id);
            if (duplicated_child_id !== -1)
                duplicatedComponent.children.push(duplicated_child_id);
        }

        return duplicatedComponent.id;
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