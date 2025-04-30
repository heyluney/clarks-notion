import { ComponentEnum } from "../component/component_type";
import { componentType } from "../component/component_type";

// A database is a map from component id to component.
export type Database = {
    [key: number]: componentType<key in ComponentEnum>;
}