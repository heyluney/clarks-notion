import { describe, test as base, expect } from 'vitest'

import { Component } from '../../types/component_type';
import { 
    createComponent,
    ComponentType,
    // createTestComponent, 
    addChild, 
    removeChild, 
    getChildren 
} from './component';

type fixtureShape = {
    page: Component,
    emoji: Component
}

describe("can create a component", () => {
    base("blahblah", () => {
        const page = createComponent(ComponentType.Page, {parent_id: 1, title: "my new page!", emoji: "1f415"})
        expect(page.id).toBe(1);
    })
})
// export const test = base.extend<fixtureShape>({
//     page: async ({ }, use) => {
//         const page : Component = createTestComponent(ComponentEnum.Page, 0, 1, [2]);
//         await use(page);
//     },
//     // Emoji component is a child of page component
//     emoji: async ({ }, use) => {
//         const emoji : Component = createTestComponent(ComponentEnum.Emoji, 1, 2);
//         await use(emoji);
//     },
// })

// describe("adding child components", () => {
//     test("without specifying index, adds to the end by default", ({ page, emoji }) => {
//         // Journal and tasklist should be added at the end.
//         const journal = createComponent(ComponentEnum.Journal, page.id);
//         const tasklist = createComponent(ComponentEnum.Tasklist, page.id);
//         page = addChild(page, journal.id);
//         page = addChild(page, tasklist.id);
//         expect(getChildren(page)).toEqual([emoji.id, journal.id, tasklist.id]);
//     })

//     test("if a specific index is specified, adds the component at specified index", ({ page, emoji }) => {
//         const journal = createComponent(ComponentEnum.Journal, page.id);
//         const tasklist = createComponent(ComponentEnum.Tasklist, page.id);
//         page = addChild(page, journal.id, 0);
//         page = addChild(page, tasklist.id, 1);
//         expect(getChildren(page)).toEqual([journal.id, tasklist.id, emoji.id]);
//     })

//     test("if the specified index is out of bounds, an error is thrown when there is an attempt to add a child", ({ page }) => {
//         const journal = createComponent(ComponentEnum.Journal, page.id);

//         expect(() => addChild(page, journal.id, -1)).toThrowError(/invalid index/);
//         expect(() => addChild(page, journal.id, 2)).toThrowError(/invalid index/);
//     })
// })

// describe("removing child components", () => {
//     test("if child doesn not exist, an error is thrown", ({ page }) => {
//         expect(() => removeChild(page, 3)).toThrowError(/not found/);
//     })

//     test("if child does exist, removes it from the child array", ({ page }) => {
//         page = removeChild(page, 2);
//         expect(getChildren(page)).toEqual([]);
//     })
// })