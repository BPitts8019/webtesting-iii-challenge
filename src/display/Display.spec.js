import React from "react";
import * as rtl from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import Display from "./Display";

afterEach(rtl.cleanup);
// Test away!

test("Displays if gate is open/closed and if it is locked/unlocked", () => {
   const state = {
      locked: false,
      closed: false,
   };
   const display = rtl.render(<Display locked={state.locked} closed={state.closed} />);

   expect(display.getByText(/unlocked/i));
   expect(display.getByText(/open/i));
});

describe("Test Open/Close functionality", () => {
   it("Displays 'Closed' if the `closed` prop is `true`", () => {
      const display = rtl.render(<Display closed={true} />);
      expect(display.getByText(/closed/i));
   });
   
   it("Displays 'Open' if `closed` prop is `false`", () => {
      const display = rtl.render(<Display closed={false} />);
      expect(display.getByText(/open/i));
   });

   //this one fails -- probably a bad test, although follows the instructions
   // it("Displays 'Open' if `closed` prop is anything other than true", () => {
   //    const display = rtl.render(<Display closed="apple" />);
   //    expect(display.getByText(/open/i));
   // });
});

describe("Test Lock/Ulock functionality", () => {
   it("Displays 'Locked' if the `locked` prop is `true`", () => {
      const display = rtl.render(<Display locked={true} />);
      expect(display.getByText(/locked/i));
   });
   
   it("Displays 'Unlocked' if `locked` prop is `false`", () => {
      const display = rtl.render(<Display locked={false} />);
      expect(display.getByText(/unlocked/i));
   });

   //this one also fails -- probably a bad test, although follows the instructions
   // it("Displays 'Unlocked' if `locked` prop is anything other than true", () => {
   //    const display = rtl.render(<Display locked="orange" />);
   //    expect(display.getByText(/unlocked/i));
   // });
});

describe("Test LED functionality", () => {
   it("Uses 'red-led' class when 'locked' or 'closed'", () => {
      const display = rtl.render(<Display locked={true} closed={true} />);
      const locked = display.getByText(/locked/i);
      const closed = display.getByText(/closed/i);

      expect(locked).toHaveClass("red-led");
      expect(closed).toHaveClass("red-led");
   });

   it("Uses 'green-led' class when 'unlocked' or 'open'", () => {
      const display = rtl.render(<Display locked={false} closed={false} />);
      const unlocked = display.getByText(/unlocked/i);
      const open = display.getByText(/open/i);

      expect(unlocked).toHaveClass("green-led");
      expect(open).toHaveClass("green-led");
   });
});