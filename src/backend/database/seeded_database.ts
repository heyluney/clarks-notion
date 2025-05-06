import { ComponentEnum as CE } from "../component/component_type";
import { Database } from "./database_type";
import { setProductionId } from "../id_generator/id_generator";

const seedDB : Database = {
    0: { id: 0, type: CE.App, parent_id: -1, children: [1, 2]},
    1: { id: 1, type: CE.Page, parent_id: 0, children: [], title: "Clark's day out", emoji: "dog"},
    2: { id: 2, type: CE.Page, parent_id: 0, children: [], title: "Ball time!", emoji: "ball"}
}

// Set the first available production id to be the lowest unused id after seeding.
setProductionId(2);

export const seedDatabase = () => {
    localStorage.setItem('database', JSON.stringify(seedDB));
}