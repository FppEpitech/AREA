import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './signup';
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockRouter = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockRouter,
    };
});

describe('Signup Component', () => {
    test('renders the logo and sign-up form', () => {
        render(
            <Router>
                <Signup />
            </Router>
        );

        const logo = screen.getByAltText('Plumpy Logo');
        expect(logo).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Create Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const signUpButton = screen.getByText('Sign up');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();
    });

    test('shows an error message if passwords do not match', async () => {
        render(
            <Router>
                <Signup />
            </Router>
        );

        const passwordInput = screen.getByPlaceholderText('Create Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const signUpButton = screen.getByText('Sign up');

        userEvent.type(passwordInput, 'password123');
        userEvent.type(confirmPasswordInput, 'password456');
        fireEvent.click(signUpButton);

        const errorMessage = await screen.findByText('Passwords do not match');
        expect(errorMessage).toBeInTheDocument();
    });

    test('navigates to the login page when "Login" is clicked', async () => {
        const navigate = vi.fn();
        render(
            <Router>
                <Signup />
            </Router>
        );

        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeDefined();
        expect(loginLink).toHaveAttribute('href', '/login');
    });
});
