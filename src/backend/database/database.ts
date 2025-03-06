import Component from '../components/component';
import DatabaseType from '../../types/database_type';

class Database {
    constructor(protected database: DatabaseType = {}) {}

    getDatabase() : DatabaseType {
        return this.database;
    }

    addComponent(component: Component): void {
        this.database[component.id] = component;
    }

    getComponent(id: number): Component {
        if (this.database[id] === undefined) throw Error('not possible')
        return this.database[id];
    }

    duplicateComponent(id: number, duplicated_parent_id: number) : Component[] {
        const currentComponent = this.getComponent(id);
        if (currentComponent === undefined) return [];

        const duplicatedComponent : Component =
            new Component(duplicated_parent_id, currentComponent.component_type);
        const duplicates : Component[] = [];

        for (let child of currentComponent.children) {
            const duplicatedDescendants = this.duplicateComponent(child, duplicatedComponent.id);
            for (let duplicatedChild of duplicatedDescendants) {
                duplicates.push(duplicatedChild);
                duplicatedComponent.children.push(duplicatedChild.id);
            }
        }
        duplicates.push(duplicatedComponent);

        return duplicates.sort((a,b) => a.id - b.id);
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