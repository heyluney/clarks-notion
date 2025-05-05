import { describe, test, expect } from 'vitest';
import { Component, ComponentEnum as CE } from '../component/component_type';
import { Database } from './database_type';

import { createTestComponent }from '../component/component';
import { 
    insertComponent, 
    duplicateComponent, 
    deleteComponent, 
    moveComponent,
    getComponent
} from './test_database';

import { setCurrentTestId, readOnlyGetNewTestId } from '../id_generator/test_id_generator';


const databaseTest = test.extend<{ database: Database }>({
    database: async ({ }, use) => {
        // Multiple layers of nesting is necessary to demonstrate that full duplication works.
        const database: Database = {
            0: createTestComponent(CE.App, 0, -1, [1]),
            1: createTestComponent(CE.Page, 1, 0, [2]),
            2: createTestComponent(CE.Comment, 2, 1, [3],
                {title: "my silly comment", emoji: "hello"}),
            3: createTestComponent(CE.Emoji, 3, 2, [],
                {title: "my emoji", emoji: "clark!"}
            )
        };

        setCurrentTestId(3);

        await use(database);
    },
})

describe("component insertion", () => {
    databaseTest("component can be inserted into to database", ({ database }) => {
        const journal : Component = createTestComponent(CE.Journal, 4, 1);
        database = insertComponent(database, journal);

        expect(Object.keys(database)).toEqual(["0", "1", "2", "3", "4"]);
        expect(getComponent(database, 4)).toEqual(journal);
    })

    databaseTest("if parent does not exist, component is not inserted", ({ database }) => {
        const journal : Component = createTestComponent(CE.Journal, 3, -1);
        expect(() => insertComponent(database, journal))
                        .toThrowError(/parent component not found/);
    })
})

describe("component duplication", () => {
    databaseTest("Will duplicate all attributes of a component", ({ database }) => {
        // Retrieve leaf component.
        const emoji = getComponent(database, 3);
        
        // Duplicate the component and insert its duplicate to the database.
        database = duplicateComponent(database, emoji);

        // The duplicate's id should be distinct from the original.
        expect(readOnlyGetNewTestId()).toEqual(4);
        const duplicatedEmoji = getComponent(database, 4);
        expect(duplicatedEmoji.id).not.toBe(emoji.id);

        // Aside from the id, all other attributes should be identical.
        expect(duplicatedEmoji.title).toBe(emoji.title);
        expect(duplicatedEmoji.emoji).toBe(emoji.emoji);
        expect(duplicatedEmoji.children).toHaveLength(0);
        expect(duplicatedEmoji.parent_id).toBe(emoji.parent_id);
    })

    databaseTest("if a component is duplicated, it's children are duplicated as well", ({ database }) => {
        // Retrieve non-leaf component.
        const page = getComponent(database, 1);
        
        expect(Object.keys(database).length).toEqual(4);
        database = duplicateComponent(database, page);

        // When the page is duplicated, it's nested comment and emoji are duplicated as well, so 3 new components are added.
        expect(Object.keys(database).length).toEqual(7);

        const duplicatedPage: Component = getComponent(database, 4);
        const duplicatedComment: Component = getComponent(database, 5);
        const duplicatedEmoji: Component = getComponent(database, 6);

        // Check that the parent-to-child relationships are kept.
        const app = getComponent(database, 0);
        expect(app.children).toContain(duplicatedPage.id);
        expect(duplicatedPage.children).toContain(duplicatedComment.id);
        expect(duplicatedComment.children).toContain(duplicatedEmoji.id);
    })
})

describe("component deletion", () => {
    databaseTest("a component can be deleted", ({ database }) => {
        const emoji = getComponent(database, 3);
        database = deleteComponent(database, emoji);

        expect(Object.keys(database)).toEqual(["0", "1", "2"]);
    })

    databaseTest("a component being deleted will remove it's children", ({ database }) => {
        const page = getComponent(database, 1);
        database = deleteComponent(database, page);

        // Deleting the page deletes it's child comment and emoji.
        expect(Object.keys(database)).toEqual(["0"]);
    })
})

describe("moving a component", () => {
    databaseTest("a component can be moved", ({ database }) => {
        let otherPage = createTestComponent(CE.Page, 4, 0);
        database = insertComponent(database, otherPage);
        let page = getComponent(database, 1);
    
        // Move the comment (and in turn nested emoji) from page to another Page.
        database = moveComponent(database, page, otherPage, 2);

        page = getComponent(database, 1);
        let updatedOtherPage = getComponent(database, 4);
        let comment = getComponent(database, 2);

        expect(page.children).toEqual([]);
        expect(updatedOtherPage.children).toEqual([2]);
        expect(comment.parent_id).toEqual(4);
    })

    databaseTest("a component can be moved to and from the same parent (reordering)", ({database}) => {
        const secondComment = createTestComponent(CE.Comment, 4, 1);
        database = insertComponent(database, secondComment);
        const page = getComponent(database, 1);

        // Reordering the second comment to be first in order.
        database = moveComponent(database, page, page, 4, 0);

        expect(getComponent(database, 1).children).toEqual([4, 2])
    })
})




