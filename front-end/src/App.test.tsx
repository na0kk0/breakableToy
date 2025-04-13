import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import App from './App';

describe("Checking if all the components are being rendered inside App", () => {
   test("Renders the components for the app", ()=>{
        render(<App />);
        expect(screen.getByTestId("SearchFilter")).toBeInTheDocument();
        expect(screen.getByTestId("NewToDo")).toBeInTheDocument();
        expect(screen.getByTestId("TaskTable")).toBeInTheDocument();
   });
});
