import { describe, test, expect } from 'vitest'

import Database from './database';
import ComponentType from '../../types/component_type';

import { TestComponent } from '../components/component';

const databaseTest = test.extend<{
    database: Database, 
}>({
    database: async({ }, use) => {
        const database: Database = Database.getOrCreateInstance();

        const page  = new TestComponent(
            /*parent_id=*/0, 
            ComponentType.Page, 
            /*id=*/1);
        const emoji = new TestComponent(
            /*parent_id=*/page.id, 
            ComponentType.Emoji, 
            /*id=*/2);
        page.addChild(emoji.id);

        database.addComponent(page);
        database.addComponent(emoji);

        await use(database);
        database.reset();
    },
})


describe('Database', () => {
    databaseTest('database uses singleton pattern', ({ database }) => {
        const secondDatabase = Database.getOrCreateInstance();
        expect(database).toMatchObject(secondDatabase);
    })

    databaseTest('if a component does not exist in database, we return undefined', ({
    database}) => {
        expect(database.getComponent(3)).toBe(undefined);
    })

    databaseTest('if a component exists in the database, it can be retrieved', ({ database }) => {
        const expectedComponent = {
            id: 2,
            parent_id: 1,
            children: [],
            component_type: ComponentType.Emoji
        }

        expect(database.getComponent(2)).toMatchObject(expectedComponent);
    })

    databaseTest('component can be added to database', ({ database }) => {
        const component = new TestComponent(0, ComponentType.Journal);
        database.addComponent(component);
     
        expect(database.numberOfComponents()).toBe(3);
    })

    databaseTest("a component can be deleted", ({ database }) => {
        expect(database.numberOfComponents()).toBe(2);

        database.deleteComponent(2);

        expect(database.numberOfComponents()).toBe(1);
    })

    databaseTest("if a component's parent is deleted, it will be deleted as well", ({ database }) => {
        expect(database.numberOfComponents()).toBe(2);

        // Emoji component is a child of page component, so should also be deleted.
        database.deleteComponent(1);

        expect(database.numberOfComponents()).toBe(0);
    })
})