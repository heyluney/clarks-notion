import { describe, test, expect } from 'vitest'

import { 
    createTestComponent,
    addChild, 
    removeChild, 
    getChildren 
} from './component';
import { ComponentEnum as CE } from './component_type';


describe("Component creation", () => {
    test("When given the input options, a component of a specified ComponentType can be created with those properties filled out", () => {
        const page = createTestComponent(
            CE.Page, 1, 0, [], {title: "my new page!", emoji: "0x1f415"});
        expect(page.id).toBe(1);
        expect(page.parent_id).toBe(0);
        expect(page.children).toHaveLength(0);
        expect(page.title).toBe("my new page!");
        expect(page.emoji).toBe("0x1f415");
        expect(page.type).toBe(CE.Page);
    })

    test("For options not supplied, the default value associated with that ComponentType will be used", () => {
        const page = createTestComponent(CE.Page, 1);
        expect(page.id).toBe(1);
        expect(page.parent_id).toBe(-1);
        expect(page.title).toBe("default");
        expect(page.emoji).toBe("default");
        expect(page.type).toBe(CE.Page);
    })
})

describe("Adding child components", () => {
    test("Adds child to the end by default when no index is specified", () => {
        let page = createTestComponent(CE.Page, 1);
        const journal = createTestComponent(CE.Journal, 2, 1);
        const tasklist = createTestComponent(CE.Tasklist, 3, 1);

        page = addChild<CE.Page>(page, journal.id);
        page = addChild<CE.Page>(page, tasklist.id);
        expect(getChildren(page)).toEqual([2, 3])
    })

    test("Adds child to the index position when index is specified", () => {
        let page = createTestComponent(CE.Page, 1)
        const journal = createTestComponent(CE.Journal, 2);
        const tasklist = createTestComponent(CE.Tasklist, 3);
        const emoji = createTestComponent(CE.Emoji, 4)
        page = addChild<CE.Page>(page, journal.id);
        page = addChild<CE.Page>(page, tasklist.id, 0);
        page = addChild<CE.Page>(page, emoji.id, 1);

        expect(getChildren(page)).toEqual([tasklist.id, emoji.id, journal.id])
    })

    test("If index is out of bounds, throws an error", () => {
        const page = createTestComponent(CE.Page, 1)
        const journal = createTestComponent(CE.Journal, 2);
        
        expect(() => addChild<CE.Page>(page, journal.id, -1))
            .toThrowError(/invalid index/);
        expect(() => addChild<CE.Page>(page, journal.id, 2))
            .toThrowError(/invalid index/);
    })
})

describe("Removing child components", () => {
    test("if child doesn not exist, an error is thrown", () => {
        let page = createTestComponent(CE.Page, 1)
        expect(() => removeChild(page, 3)).toThrowError(/not found/);
    })

    test("if child does exist, removes it from the child array", () => {
        let page = createTestComponent(CE.Page, 1, 0, [2])
        page = removeChild<CE.Page>(page, 2);
        expect(getChildren(page)).toEqual([]);
    })
})