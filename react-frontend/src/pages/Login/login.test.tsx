import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Login from './login';

const mockRouter = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockRouter,
    };
});

describe('Login Component', () => {
    test('renders the logo and login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const logo = screen.getByAltText('Plumpy Logo');
        expect(logo).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    test('shows an error message if login fails', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        const errorMessage = await screen.findByText("Wrong login");
        expect(errorMessage).toBeInTheDocument();
    });

    test('navigates to the sign-up page when "Register here" is clicked', async () => {
        const navigate = vi.fn();
        render(
            <Router>
                <Login />
            </Router>
        );

        const registerLink = screen.getByText('Register here');
        expect(registerLink).toBeDefined();
        expect(registerLink).toHaveAttribute('href', '/signup');
    });
});
