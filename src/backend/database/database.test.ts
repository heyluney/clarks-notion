import { describe, test, expect } from 'vitest';
import { Component, ComponentEnum } from '../../types/component_type';
import { Database } from '../../types/database_type';

import { createTestComponent }from '../component/component';
import { 
    addComponent, 
    getComponent, 
    duplicateComponent, 
    deleteComponent, 
    moveComponent
} from './database';

import { setCurrentId } from '../id_generator/id_generator';


const databaseTest = test.extend<{ database: Database }>({
    database: async ({ }, use) => {
        const database: Database = {
            1: createTestComponent(ComponentEnum.Page, 0, 1, [2]),
            2: createTestComponent(ComponentEnum.Emoji, 1, 2, [])
        };

        setCurrentId(3);

        await use(database);
    },
})

describe("component insertion", () => {
    databaseTest('component can be added to database', ({ database }) => {
        const journal : Component = 
            createTestComponent(ComponentEnum.Journal, 1, 3, []);
        database = addComponent(database, journal);

        expect(Object.keys(database)).toEqual(["1", "2", "3"]);
        expect(getComponent(database, 3)).toEqual(journal);
    })
})

describe("component duplication", () => {
    databaseTest("can duplicate a component", ({ database }) => {
        const emoji = getComponent(database, 2);
        
        database = duplicateComponent(database, emoji);

        expect(Object.keys(database)).toEqual(["1", "2", "3"]);
        const duplicatedEmoji: Component = getComponent(database, 3);

        expect(duplicatedEmoji.id).not.toBe(emoji.id);
        expect(duplicatedEmoji.component_type).toBe(emoji.component_type);
        expect(duplicatedEmoji.parent_id).toBe(emoji.parent_id);
        expect(duplicatedEmoji.children.length).toBe(emoji.children.length);
    })

    databaseTest("if a component is duplicated, it's children are duplicated as well", ({ database }) => {
        const page = getComponent(database, 1);
        
        database = duplicateComponent(database, page);

        expect(Object.keys(database)).toEqual(["1", "2", "3", "4"]);
        const duplicatedPage: Component = getComponent(database, 3);
        const duplicatedEmoji: Component = getComponent(database, 4);

        // The original page had emoji as it's child. Therefore, the duplicated page should have the duplicated emoji as it's child.
        expect(duplicatedPage.children).toContain(duplicatedEmoji.id);
    })
})

// database: Database, 
// componentMovedFrom: Component, 
// componentMovedTo: Component, 
// childId: number, 
// idx: number = componentMovedTo.children.length
describe("moving a component", () => {
    databaseTest("a component can be moved", ({ database }) => {
        const anotherPage : Component = 
            createTestComponent(ComponentEnum.Page, 0, 3, []);
        database = addComponent(database, anotherPage);

        const page = getComponent(database, 1);
        database = moveComponent(database, page, anotherPage, 2);

        database = duplicateComponent(database, page);

        expect(Object.keys(database)).toEqual(["1", "2", "3", "4"]);
        const duplicatedPage: Component = getComponent(database, 3);
        const duplicatedEmoji: Component = getComponent(database, 4);
        expect(duplicatedPage.children).toContain(duplicatedEmoji.id);
    })
})


describe("component deletion", () => {
    databaseTest("a component can be deleted", ({ database }) => {
        const emoji = getComponent(database, 2);
        database = deleteComponent(database, emoji);

        expect(Object.keys(database)).toEqual(["1"]);
    })

    databaseTest("a component being deleted will remove it's children", ({ database }) => {
        const page = getComponent(database, 1);
        database = deleteComponent(database, page);

        expect(Object.keys(database)).toEqual([]);
    })
})

