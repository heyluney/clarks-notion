import { describe, test as base, expect } from 'vitest'

import { PageComponent, AppComponent, EmojiComponent, Component, ComponentType } from './component';


type fixtureShape = {
    page: PageComponent,
    emoji: AppComponent
}

export const test = base.extend<fixtureShape>({
    page: async({}, use) => {
        const page = new PageComponent(0);
        await use(page);
    },
    // Emoji component is a child of page component
    emoji: async({}, use) => {
        const emoji = new EmojiComponent(1);
        await use(emoji);
    }
})

describe("default behavior", () => {
    base("validate default properties", () => {
        const app = new AppComponent(-1);

        expect(app.id).toBe(0);
        expect(app.parent_id).toBe(-1);
        expect(app.children).toMatchObject([]);
        expect(app.component_type).toBe(ComponentType.App);
    })

    base("auto incrementation works for unspecified ids", () => {
        const component1 = new AppComponent(-1);
        const component2 = new AppComponent(-1);
     
        expect([component1.id, component2.id]).not.toEqual([0, 1]);
    })
})


describe("component's children", () => {
    test("getChildren successfully returns a component's child components", ({ page }) => {
        page.addChild(2);
        expect(page.getChildren()).toEqual([2]);
    })

    test("if a child is inserted without idx specified, by default it is inserted at the end", ({ page }) => {
        page.addChild(2);
        page.addChild(3);
        expect(page.getChildren()).toEqual([2, 3]);
    })

    test("if a child is inserted with idx specified, it will be inserted at that index", ({ page }) => {
        page.addChild(3, 0);
        expect(page.getChildren()).toEqual([3]);
        page.addChild(4, 1);
        expect(page.getChildren()).toEqual([3, 4]);
        page.addChild(5, 2);
        expect(page.getChildren()).toEqual([3, 4, 5]);
    })

    test("if a child is inserted with an invalid index, an error is thrown", ({ page }) => {
        expect(() => page.addChild(3, -1)).toThrowError(/invalid/);
        expect(() => page.addChild(3, 2)).toThrowError(/invalid/);
    })
})
