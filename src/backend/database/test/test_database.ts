import DatabaseType from "../../../types/database_type";
import Database from "../database";

import TestComponent from "../../components/test/test_component";

class TestDatabase extends Database {
    constructor(database: DatabaseType) {
        super(database);
    }
    
    // Returns database primary key sorted in ascending order.
    retrieveKeys() : number[] {
        return Object.keys(this.database).map(key => parseInt(key)).sort((a,b) => a-b);
    }

    retrieveNextAvailableKey() : number {
        const keys = this.retrieveKeys();
        return keys[keys.length-1] + 1;
    }

    logger() : void {
        for (let key in this.database) {
            this.database[key].logger();
        }
    }

    // should be renamed retrieve duplicates
    duplicateComponent(id: number, 
        duplicated_parent_id: number, 
        nextKey: number = this.retrieveNextAvailableKey()) : TestComponent[] {
        const currentComponent = this.getComponent(id);

        const duplicatedComponent : TestComponent =
            new TestComponent(duplicated_parent_id, currentComponent.component_type, nextKey, []);
        const duplicates : TestComponent[] = [];

        let available = nextKey;
        for (let child of currentComponent.children) {
            available++;
            const duplicatedDescendants 
            = this.duplicateComponent(child, duplicatedComponent.id, available);
            for (let duplicatedChild of duplicatedDescendants) {
                duplicates.push(duplicatedChild);
                duplicatedComponent.children.push(duplicatedChild.id);
            }
        }
        duplicates.push(duplicatedComponent);

        return duplicates.sort((a, b) => a.id - b.id);
    }
}

export default TestDatabase;