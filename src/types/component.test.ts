import { test, expectTypeOf } from 'vitest'

import { Component } from './component';



test('ComponentType works', () => {
    expectTypeOf(Component).toBeObject;

    const testComponent = 
        new Component(/*parent_id=*/3, /*component_type=*/4);


    expectTypeOf(testComponent).toEqualTypeOf<{
        id: number,
        parent_id: number,
        children: number[],
        component_type: number
    }>
})