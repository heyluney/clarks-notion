import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from './App';

it("App renders successfully on page.", () => {
    render(<App/>);

    const element = screen.getByText(/hi/i);
    expect(element).toBeDefined();
    screen.debug(); // prints rendered JSX to command line
})