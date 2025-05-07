import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
// import '@testing-library/jest-dom'
// import * as matchers from '@testing-library/jest-dom/matchers';

import Page from "./components/Page";
import { createTestComponent } from "./backend/component/component";
import { ComponentEnum as CE } from "./backend/component/component_type";
import SideBar from "./components/Sidebar";
import App from "./App";


  // async 
it("Regardless of which route, the sidebar is always there.",  () => {
    render(
        <MemoryRouter initialEntries={['/clarks-notion/pages/2']}>
            <App />
        </MemoryRouter>
    );


    // await waitFor(() => {
    //     screen.getByText('app');
    // }, {timeout: 1000})
    screen.debug(); // prints rendered JSX to command line

    // const elements = document.querySelectorAll("sidebar");
    // expect(elements.length).toBeGreaterThan(0);

})
// it("When navigating to a specific page, the text from that page will show", () => {
//     render(
//         <MemoryRouter initialEntries={['/clarks-notion/pages/1']}>
//             <TestApp />
//         </MemoryRouter>
//     );
//     const element = screen.getByText("Clark's day out");
//     expect(element).toBeDefined();
//     screen.debug();
//     // expect(element).toBeDefined();
//     // screen.debug(); // prints rendered JSX to command line
// })