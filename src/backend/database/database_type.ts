import { Component } from "../component/component_type";

// const myMap: Map<string, string | number> = new Map();

// A database is a map from component id to component.
export type Database = {
    [key: number]: Component;
}