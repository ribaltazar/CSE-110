import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { BrowserRouter } from "react-router-dom";
import { dummyGroceryList } from "./constants"; // Import the dummy list for reference

describe("ToDoList Component", () => {

    test("displays all grocery items", () => {
        render(<ToDoList />);
      
        dummyGroceryList.forEach((item) => {
          const listItem = screen.getByText(item.name);
          expect(listItem).toBeInTheDocument();
        });
      });

      test("updates checked items count", () => {
        render(<ToDoList />);
      
        // Simulate checking the "Apples" checkbox
        const checkbox = screen.getByRole('checkbox', { name: /Apples/i });
        fireEvent.click(checkbox);
      
        const countDisplay = screen.getByText(/Items bought: 1/i);
        expect(countDisplay).toBeInTheDocument();
      });
    });