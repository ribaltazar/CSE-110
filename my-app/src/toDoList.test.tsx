import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { BrowserRouter } from "react-router-dom";
import { dummyGroceryList } from "./constants";

describe("ToDoList Component", () => {

    //check if all items are displayeda
    test("displays all grocery items", () => {
        render(<ToDoList />);
      
        dummyGroceryList.forEach((item) => {
          const listItem = screen.getByText(item.name);
          expect(listItem).toBeInTheDocument();
        });
      });

    //check if count gets updated
    test("updates checked items count", () => {
      render(<ToDoList />);
    
      //checking the "Apples" checkbox
      const checkbox = screen.getByRole('checkbox', { name: /Apples/i });
      fireEvent.click(checkbox);
    
      const countDisplay = screen.getByText(/Items bought: 1/i);
      expect(countDisplay).toBeInTheDocument();
     });
  });