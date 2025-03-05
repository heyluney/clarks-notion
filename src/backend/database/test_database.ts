import { Component } from "../components/component";
import Database from "./database";

type DataShape = {
    [key: number]: Component;
}


class TestDatabase extends Database {
    protected constructor(database: DataShape) {
        super(database);
    }

    reset(): void {
        this.database = {};
    }
}

export default TestDatabase;