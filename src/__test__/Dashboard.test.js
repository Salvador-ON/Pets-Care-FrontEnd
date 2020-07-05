import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from './test-utils';
import '@testing-library/jest-dom'
import axios from "axios";
import App from '../containers/App';
afterEach(cleanup);

describe('App', () => {

  axios.get.mockResolvedValueOnce({
    data: { 
      logged_in: "LOGGED_IN", 
      user:{
        name: "Jhon", 
        role: "admin"}}
})

  test("user is logged and dashboar button shows",  async () => {

    const { container, getByTestId } = render(<App />);

    const dashboard = await waitForElement(() => 
      getByTestId("HidenDash")
    )

    expect(dashboard.innerHTML).toMatch('Dashboard')
    fireEvent.click(dashboard);
    expect(container.innerHTML).toMatch("Welcome");
    expect(container.innerHTML).toMatch("Jhon");
    expect(container.innerHTML).toMatch("Services");
    expect(container.innerHTML).toMatch("Add Services");
    expect(container.innerHTML).toMatch("Appointments");
    expect(container.innerHTML).toMatch("My Appointments");

});




  

  
});
 
