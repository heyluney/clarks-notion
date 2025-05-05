import { test, expect, beforeEach } from 'vitest';

import { getNewTestId, readOnlyGetNewTestId, setCurrentTestId } from './test_id_generator';

beforeEach(() => {
    setCurrentTestId(-1);
})

test("getNewId returns a strictly monotonically increasing sequence (no duplicate ids) starting from 0", () => {
    expect(getNewTestId()).toBe(0);
    expect(getNewTestId()).toBe(1);
    expect(getNewTestId()).toBe(2);
})

test("readOnlyGetNewId should consistently return the same value when called", () => {
    expect(readOnlyGetNewTestId()).toBe(-1);
    expect(readOnlyGetNewTestId()).toBe(-1);
})


test("setCurrentId updates the floor of next available id", () => {
    setCurrentTestId(5);
    expect(getNewTestId()).toBe(6);
})




