import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Controls from "./Controls"
afterEach(rtl.cleanup);

// Test away!
/*
- provide buttons to toggle the `closed` and `locked` states.
- buttons' text changes to reflect the state the door will be in if clicked
- the closed toggle button is disabled if the gate is locked
- the locked toggle button is disabled if the gate is open
*/
function testButton(btn, spy) {
   for (let i=1; i < 10; i++) {
      rtl.act(() => {
         rtl.fireEvent.click(btn);
      });
      expect(spy).toHaveBeenCalledTimes(i);
   }
   rtl.cleanup();
};

test("Toggle buttons are rendered", () => {
   const controls = rtl.render(<Controls />);
   const buttons = controls.getAllByRole("button");

   expect(buttons.length).toBe(2);
   controls.getByText(/lock gate/i);
   controls.getByText(/close gate/i);
});

describe("Buttons' text changes to reflect the state the door will be in if clicked", () => {
   it("Lock button displays 'Lock Gate' when 'locked' is 'false'", () => {
      const controls = rtl.render(<Controls locked={false} />);

      controls.getByText(/lock gate/i);
   });
   it("Lock button displays 'Unlock Gate' when 'locked' is 'true'", () => {
      const controls = rtl.render(<Controls locked={true} />);

      controls.getByText(/unlock gate/i);
   });
   it("Close button displays 'Close Gate' when 'closed' is 'false'", () => {
      const controls = rtl.render(<Controls closed={false} />);

      controls.getByText(/close gate/i);
   });
   it("Close button displays 'Open Gate' when 'closed' is 'true'", () => {
      const controls = rtl.render(<Controls closed={true} />);

      controls.getByText(/open gate/i);
   });
});

describe("Test Controls functionality", () => {
   it("Close button is disabled if the gate is locked", () => {
      const controls = rtl.render(<Controls closed={false} locked={true} />);
      expect(controls.getByText(/close gate/i)).toBeDisabled();

      controls.rerender(<Controls closed={false} locked={false} />);
      expect(controls.getByText(/close gate/i)).not.toBeDisabled();
   });

   it("Lock button is disabled if the gate is open", () => {
      const controls = rtl.render(<Controls closed={false} locked={false} />);
      expect(controls.getByText(/lock gate/i)).toBeDisabled();

      controls.rerender(<Controls closed={true} locked={false} />);
      expect(controls.getByText(/lock gate/i)).not.toBeDisabled();
   });

   it("Close button onclick triggers `toggleClosed` prop", () => {
      const closeToggleSpy = jest.fn();
      const controls = rtl.render(<Controls toggleClosed={closeToggleSpy} />);

      testButton(controls.getByText(/close gate/i), closeToggleSpy);
   });

   it("Lock button onclick triggers `toggleLocked` prop", () => {
      const lockToggleSpy = jest.fn();
      const controls = rtl.render(<Controls closed={true} toggleLocked={lockToggleSpy} />);

      testButton(controls.getByText(/lock gate/i), lockToggleSpy);
   });
});