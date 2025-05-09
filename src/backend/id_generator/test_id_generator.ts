let testId: number = -1;

export const setCurrentTestId = (val: any): void => {
    testId = val;
}

// Returns the highest assigned test id currently in the database.
export const readOnlyGetNewTestId = (): number => {
    return testId;
}

export const getNewTestId = (): number => {
    testId++;
    return testId;
}