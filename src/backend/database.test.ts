import { describe, beforeEach, test, expect } from 'vitest'

import Database from './database';
import { Component, ComponentType } from './component';

describe('Database', () => {
    let database: Database;

    // Create several test components.
    const page = new Component(/*parent_id=*/0, ComponentType.Page);
    const emoji = new Component(/*parent_id=*/page.id, ComponentType.Emoji);
    page.addChild(emoji.id);

    // Empty database before each test.
    beforeEach(() => {
        database = Database.getInstance();
        database.reset();
    })

    test('component can be added to database', () => {
        database.addComponent(page);
        const expectedDatabase = {
            [page.id]: {
                id: page.id,
                parent_id: 0,
                children: [emoji.id],
                component_type: ComponentType.Page
            }
        }

        expect(database.numberOfComponents()).toBe(1);
        expect(database.getDatabase()).toMatchObject(expectedDatabase);
    })

    test('if a component exists in the database, it can be retrieved', () => {
        database.addComponent(emoji);
        const expectedComponent = {
            id: emoji.id,
            parent_id: page.id,
            children: [],
            component_type: ComponentType.Emoji
        }

        expect(database.getComponent(emoji.id)).toMatchObject(expectedComponent);
    })

    test("a component can be deleted", () => {
        database.addComponent(page);
        database.addComponent(emoji);
        
        expect(database.numberOfComponents()).toBe(2);

        database.deleteComponent(emoji.id);

        expect(database.numberOfComponents()).toBe(1);
    })

    test("if a component's parent is deleted, it will be deleted as well", () => {
        database.addComponent(page);
        database.addComponent(emoji);

        expect(database.numberOfComponents()).toBe(2);

        database.deleteComponent(page.id);

        expect(database.numberOfComponents()).toBe(0);
    })
})