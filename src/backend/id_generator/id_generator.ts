let id: number = -1;

// Returns the highest assigned id currently in the database.
export const readOnlyGetNewId = (): number => {
    return id;
}

// Ensures that each component receives a unique id.
export const getNewId = (): number => {
    id++;
    return id;
}