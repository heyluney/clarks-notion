import { describe, test as base, expect } from 'vitest'

import ComponentType from "../../../types/component_type";
import Component from '../component';

type fixtureShape = {
    page: Component,
    emoji: Component
}

export const test = base.extend<fixtureShape>({
    page: async ({ }, use) => {
        const page = new Component(0, ComponentType.Page, 1, [2]);
        await use(page);
    },
    // Emoji component is a child of page component
    emoji: async ({ }, use) => {
        const emoji = new Component(1, ComponentType.Emoji, 2, []);
        await use(emoji);
    }
})

describe("component's children", () => {
    test("getChildren successfully returns a component's child components", ({ page }) => {
        expect(page.getChildren()).toEqual([2]);
    })

    test("if a child is inserted without idx specified, by default it is inserted at the end", ({ page }) => {
        page.addChild(3);
        expect(page.getChildren()).toEqual([2, 3]);
    })

    test("if a child is inserted with idx specified, it will be inserted at that index", ({ emoji }) => {
        emoji.addChild(3, 0);
        expect(emoji.getChildren()).toEqual([3]);
        emoji.addChild(4, 1);
        expect(emoji.getChildren()).toEqual([3, 4]);
        emoji.addChild(5, 2);
        expect(emoji.getChildren()).toEqual([3, 4, 5]);
    })

    test("if a child is inserted with an invalid index, an error is thrown", ({ page }) => {
        expect(() => page.addChild(3, -1)).toThrowError(/invalid/);
        expect(() => page.addChild(3, 2)).toThrowError(/invalid/);
    })
})
