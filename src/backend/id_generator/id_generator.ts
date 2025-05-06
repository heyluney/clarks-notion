// We start with database already populated with app component.
let id: number = 0;

export const setProductionId = (val: any): void => {
    id = val;
}

// Returns the highest assigned id currently in the database.
export const readOnlyGetNewId = (): number => {
    return id;
}

// Ensures that each component receives a unique id.
export const getNewId = (): number => {
    id++;
    return id;
}

