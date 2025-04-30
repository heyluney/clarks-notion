import { describe, test, expect } from 'vitest'

import { 
    createComponent,
    addChild, 
    removeChild, 
    getChildren 
} from './component';
import { ComponentEnum as CE } from './component_types';


describe("Component creation", () => {
    test("When given the input options, a component of a specified ComponentType can be created with those properties filled out", () => {
        const page = createComponent(CE.Page, 
            {parent_id: -1, title: "my new page!", emoji: "1f415"})
        // expect(page.id).toBe(1);
        expect(page.parent_id).toBe(-1);
        expect(page.title).toBe("my new page!");
        expect(page.type).toBe(CE.Page);
    })

    test("For options not supplied, the default value associated with that ComponentType will be used", () => {
        const page = createComponent(CE.Page, {parent_id: -1})
        // expect(page.id).toBe(1);
        expect(page.parent_id).toBe(-1);
        expect(page.title).toBe("default");
        expect(page.emoji).toBe("default");
        expect(page.type).toBe(CE.Page);
    })
})

describe("Adding child components", () => {
    test("Adds child to the end by default when no index is specified", () => {
        let page = createComponent(CE.Page, {parent_id: -1});
        const journal = createComponent(CE.Journal, {parent_id: page.id});
        const tasklist = createComponent(CE.Tasklist, {parent_id: page.id});
        page = addChild<CE.Page>(page, journal.id);
        page = addChild<CE.Page>(page, tasklist.id);
        expect(getChildren(page)).toEqual([journal.id, tasklist.id])
    })

    test("Adds child to the index position when index is specified", () => {
        let page = createComponent(CE.Page, {parent_id: -1})
        const journal = createComponent(CE.Journal, {parent_id: page.id});
        const tasklist = createComponent(CE.Tasklist, {parent_id: page.id});
        const emoji = createComponent(CE.Emoji, {parent_id: page.id})
        page = addChild<CE.Page>(page, journal.id);
        page = addChild<CE.Page>(page, tasklist.id, 0);
        page = addChild<CE.Page>(page, emoji.id, 1);

        expect(getChildren(page)).toEqual([tasklist.id, emoji.id, journal.id])
    })

    test("If index is out of bounds, throws an error", () => {
        let page = createComponent(CE.Page, {parent_id: -1})
        const journal = createComponent(CE.Journal, {parent_id: page.id});
        
        expect(() => addChild<CE.Page>(page, journal.id, -1))
            .toThrowError(/invalid index/);
        expect(() => addChild<CE.Page>(page, journal.id, 2))
            .toThrowError(/invalid index/);
    })
})


describe("Removing child components", () => {
    test("if child doesn not exist, an error is thrown", () => {
        let page = createComponent(CE.Page, {parent_id: -1})
        expect(() => removeChild(page, 3)).toThrowError(/not found/);
    })

    test("if child does exist, removes it from the child array", () => {
        let page = createComponent(CE.Page, {parent_id: -1})
        const journal = createComponent(CE.Journal, {parent_id: page.id});
        page = addChild<CE.Page>(page, journal.id);
        expect(getChildren(page)).toEqual([journal.id]);
        page = removeChild<CE.Page>(page, journal.id);
        expect(getChildren(page)).toEqual([]);
    })
})