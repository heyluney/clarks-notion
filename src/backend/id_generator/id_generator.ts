let id: number = -1;

// Should only be used for testing.
export const setCurrentId = (val: any): void => {
    id = val;
}

export const readOnlyGetNewId = (): number => {
    return id;
}

export const getNewId = (): number => {
    id++;
    return id;
}