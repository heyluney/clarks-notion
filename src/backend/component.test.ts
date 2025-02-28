import { test, expectTypeOf } from 'vitest'

import { Component } from './component';



test('ComponentType works', () => {
    const testComponent = 
        new Component(/*parent_id=*/3, /*component_type=*/4);
    expectTypeOf(testComponent).toBeObject;
})