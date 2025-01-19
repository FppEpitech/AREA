import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navbar';
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

describe('Navbar Component', () => {
    test('renders logo and navigation buttons', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const logo = screen.getByAltText('Plumpy logo');
        expect(logo).toBeInTheDocument();

        const exploreButton = screen.getByText('Explore');
        const myPlumsButton = screen.getByText('My Plums');
        const createButton = screen.getByText('Create');

        expect(exploreButton).toBeInTheDocument();
        expect(myPlumsButton).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();
    });

    test('dropdown opens on mobile view when menu button is clicked', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const menuButton = screen.getByAltText('menuLogo');
        fireEvent.click(menuButton);

        const exploreButtonInDropdown = screen.getByText('Explore');
        const myPlumsButtonInDropdown = screen.getByText('My Plums');
        const createButtonInDropdown = screen.getByText('Create');
        const userButtonInDropdown = screen.getByAltText('userLogo');

        expect(exploreButtonInDropdown).toBeInTheDocument();
        expect(myPlumsButtonInDropdown).toBeInTheDocument();
        expect(createButtonInDropdown).toBeInTheDocument();
        expect(userButtonInDropdown).toBeInTheDocument();
    });

    test('navigates to /myPlums when the "My Plums" button is clicked', async () => {
        const navigate = vi.fn(); // Create the mock function for navigate
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const myPlumsButton = screen.getByText('My Plums');
        expect(myPlumsButton).toBeDefined();
        userEvent.click(myPlumsButton);

        expect(mockRouter).toHaveBeenCalledWith('/myPlums');
    });

    test('navigates to /create when the "Create" button is clicked', async () => {
        const navigate = vi.fn(); // Create the mock function for navigate
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const createButton = screen.getByText('Create');
        expect(createButton).toBeDefined();
        userEvent.click(createButton);

        expect(mockRouter).toHaveBeenCalledWith('/create');
    });

    test('navigates to / when the "Explore" button is clicked', async () => {
        const navigate = vi.fn(); // Create the mock function for navigate
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const exploreButton = screen.getByText('Explore');
        expect(exploreButton).toBeDefined();
        userEvent.click(exploreButton);

        expect(mockRouter).toHaveBeenCalledWith('/explore');
    });
});
