import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Dashboard from "./Dashboard";

// Test away
afterEach(rtl.cleanup);

test("Dashboard Renders both Controls and Display", () => {
   const wrapper = rtl.render(<Dashboard />);
   expect(wrapper.asFragment()).toMatchSnapshot();
});

// describe("Test Dashboard UI elements", () => {
//    it("Matches the snapshot", () => {
//       const wrapper = rtl.render(<Dashboard />);
//       expect(wrapper.asFragment()).toMatchSnapshot();
//    })
// });