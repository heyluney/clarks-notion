import { describe, test, expect, vi } from 'vitest'

import TestDatabase from './test_database';
import ComponentType from '../../../types/component_type';
import TestComponent from '../../components/test/test_component';

const databaseTest = test.extend<{ database: TestDatabase }>({
    database: async ({ }, use) => {
        const page = new TestComponent(0, ComponentType.Page, 1, [2]);
        const emoji = new TestComponent(page.id, ComponentType.Emoji, 2, []);

        const database: TestDatabase = new TestDatabase({
            1: page,
            2: emoji
        });

        await use(database);
    },
})

describe("TestDatabase-specific methods", () => {
    databaseTest("retrieve keys fetches keys in order", ({ database }) => {
        expect(database.retrieveKeys()).toEqual([1, 2]);
    })

    databaseTest("retrieveNextAvailableKey fetches the next key", ({ database }) => {
        expect(database.retrieveNextAvailableKey()).toBe(3);
    })
})

describe("component retrieval", () => {
    databaseTest("database returns undefined if component doesn't exist", ({ database }) => {
        expect(() => database.getComponent(3)).toThrowError(/not possible/);
    })

    databaseTest("retrieves correct component if component exists", ({ database }) => {
        const expectedComponent = {
            id: 2,
            parent_id: 1,
            children: [],
            component_type: ComponentType.Emoji
        }

        expect(database.getComponent(2)).toMatchObject(expectedComponent);
    })
})

describe("component insertion", () => {
    databaseTest('component can be added to database', ({ database }) => {
        const component = new TestComponent(0, ComponentType.Journal, 3, []);
        database.addComponent(component);

        expect(database.retrieveKeys()).toEqual([1, 2, 3]);
    })
})

describe("component deletion", () => {
    databaseTest("a delete component is properly removed from the database", ({ database }) => {
        database.deleteComponent(2);

        expect(database.retrieveKeys()).toEqual([1]);
    })

    databaseTest("if a component's parent is deleted, it will be deleted as well", ({ database }) => {
        // Emoji component is a child of page component, so should also be deleted.
        database.deleteComponent(1);

        expect(database.retrieveKeys()).toEqual([]);
    })
})

describe("component duplication", () => {
    databaseTest("a component can be duplicated", ({ database }) => {
        database.logger();
        const duplicates = database.duplicateComponent(1, 0);
        console.log('arr', duplicates)
        // const duplicateComponentSpy = vi.spyOn(database, 'duplicateComponent');
        // database.duplicateComponent(2);
        
        // expect(duplicateComponentSpy.mock.calls.length).toEqual(1);
    })
})