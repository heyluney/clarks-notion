import { test, expect, beforeEach } from 'vitest';

import { getNewId, readOnlyGetNewId, setCurrentId } from './id_generator';

beforeEach(() => {
    setCurrentId(-1);
})

test("getNewId returns a strictly monotonically increasing sequence (no duplicate ids) starting from 0", () => {
    expect(getNewId()).toBe(0);
    expect(getNewId()).toBe(1);
    expect(getNewId()).toBe(2);
})

test("readOnlyGetNewId should not change next available id when called", () => {
    expect(readOnlyGetNewId()).toBe(-1);
    expect(readOnlyGetNewId()).toBe(-1);
})


test("setCurrentId updates the floor of next available id", () => {
    setCurrentId(5);
    expect(getNewId()).toBe(6);
    expect(getNewId()).toBe(7);
    expect(getNewId()).toBe(8);
})




