import { describe, test, expect } from 'vitest';
import { ComponentType, ComponentEnum } from '../../types/component_type';
import { DatabaseType } from '../../types/database_type';

import { createComponent }from '../component/component';
import { 
    addComponent, 
    getComponent, 
    duplicateComponent, 
    deleteComponent, 
    moveComponent
} from './database';

import { Blah } from '../id_generator/id_generator.test';
import { id, getNewId } from '../id_generator/id_generator';

// console.log('testArray', testArray);

console.log("top level in database test", getNewId(), id)

const databaseTest = test.extend<{ database: DatabaseType }>({
    database: async ({ }, use) => {
        const database: DatabaseType = {
            1: createComponent(ComponentEnum.Page, 0, 1, [2]),
            2: createComponent(ComponentEnum.Emoji, 1, 2, [])
        };
        // console.log('id inside databasetest', readOnlyGetNewId());
        // setNextAvailableId(3);

        await use(database);
    },
})

describe("component insertion", () => {
    databaseTest('component can be added to database', ({ database }) => {
        const journal : ComponentType = 
            createComponent(ComponentEnum.Journal, 1, 3, []);
        database = addComponent(database, journal);

        expect(Object.keys(database)).toEqual(["1", "2", "3"]);
        expect(getComponent(database, 3)).toEqual(journal);
    })
})

// describe("component duplication", () => {
//     databaseTest("can duplicate a component", ({ database }) => {
//         const emoji = getComponent(database, 2);
        
//         database = duplicateComponent(database, emoji);

//         expect(Object.keys(database)).toEqual(["1", "2", "3"]);
//         const duplicatedEmoji: ComponentType = getComponent(database, 3);

//         expect(duplicatedEmoji.id).not.toBe(emoji.id);
//         expect(duplicatedEmoji.component_type).toBe(emoji.component_type);
//         expect(duplicatedEmoji.parent_id).toBe(emoji.parent_id);
//         expect(duplicatedEmoji.children.length).toBe(emoji.children.length);
//     })

//     databaseTest("if a component is duplicated, it's children are duplicated as well", ({ database }) => {
//         const page = getComponent(database, 1);
        
//         database = duplicateComponent(database, page);

//         expect(Object.keys(database)).toEqual(["1", "2", "3", "4"]);
//         const duplicatedPage: ComponentType = getComponent(database, 3);
//         const duplicatedEmoji: ComponentType = getComponent(database, 4);

//         // The original page had emoji as it's child. Therefore, the duplicated page should have the duplicated emoji as it's child.
//         expect(duplicatedPage.children).toContain(duplicatedEmoji.id);
//     })
// })

// // database: DatabaseType, 
// // componentMovedFrom: ComponentType, 
// // componentMovedTo: ComponentType, 
// // childId: number, 
// // idx: number = componentMovedTo.children.length
// describe("moving a component", () => {
//     databaseTest("a component can be moved", ({ database }) => {
//         const anotherPage : ComponentType = 
//             createComponent(ComponentEnum.Page, 0, 3, []);
//         database = addComponent(database, anotherPage);

//         database = moveComponent(database, getComponent(database, 1), getComponent(database, 3), 2);
//         // console.log('id', database);
//         // database = duplicateComponent(database, page);

//         // expect(Object.keys(database)).toEqual(["1", "2", "3", "4"]);
//         // const duplicatedPage: ComponentType = getComponent(database, 3);
//         // const duplicatedEmoji: ComponentType = getComponent(database, 4);
//         // expect(duplicatedPage.children).toContain(duplicatedEmoji.id);
//     })
// })

// describe('blah', () => {
//     databaseTest('blah2', ({database}) => {
//         expect(getNewId()).toBe(3);
//     })
// })
// // describe("component deletion", () => {
// //     skip();
// //     databaseTest("a component can be deleted", ({ database }) => {
// //         const emoji = getComponent(2, database);
// //         database = deleteComponent(emoji, database);

// //         expect(Object.keys(database)).toEqual(["1"]);
// //     })

// //     databaseTest("a component being deleted will remove it's children", ({ database }) => {
// //         const page = getComponent(1, database);
// //         database = deleteComponent(page, database);

// //         expect(Object.keys(database)).toEqual([]);
// //     })
// // })

