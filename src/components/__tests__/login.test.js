import { render, screen, cleanup } from '@testing-library/react';
import Login from '../Login';
import Footer from '../Footer';
import { useHistory } from 'react-router';
import {createMemoryHistory} from 'history';
import {Route, Switch, Router} from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import userLoginRequest from "../Login"
import Register from '../Register';
import {getByRole, findByText, getByPlaceholderText} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'


afterEach(() => {
    cleanup();
});

test('should render login component', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    const loginElement = screen.getByTestId('login-1');
    expect(loginElement).toBeInTheDocument();
})

test('should render footer component', () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const footerElement = screen.getByTestId('footer-1');
    expect(footerElement).toBeInTheDocument();
})

test('view registration form', () => {
    const history = createMemoryHistory()
    history.push('/components/Register.js');
    render(
      <Router history={history}>
        <Register />
      </Router>,
    )
  
    expect(screen.getByTestId('register-1')).toBeInTheDocument();
  })

  test('user input username value state changes based on typed username input', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    const username = screen.getByPlaceholderText('Username');
    const textEntry = 'JordanUnitTest'
    userEvent.type(username, textEntry);
    expect(username.value).toEqual(textEntry);
  })

  test('user input password value state changes based on typed password input', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    const password = screen.getByPlaceholderText('Password');
    const textEntry = 'JordanUnitTest'
    userEvent.type(password, textEntry);
    expect(password.value).toEqual(textEntry);
  })

  test('user must have valid username and password in order to login', async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    userEvent.click(screen.getByPlaceholderText('Login'));
    expect(await screen.findByText('Invalid Username or Password! Please try again!')).toBeVisible();
  })





