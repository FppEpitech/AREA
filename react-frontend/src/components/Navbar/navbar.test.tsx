import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './navbar';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Navbar Component', () => {


    beforeEach(() => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the main navbar', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check for the logo
        expect(screen.getByAltText('Plumpy logo')).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByText('Explore')).toBeInTheDocument();
        expect(screen.getByText('My Plums')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    test('toggles dropdown menu on button click', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Open dropdown menu
        const menuButton = screen.getByAltText('menuLogo');
        fireEvent.click(menuButton);

        // Check dropdown menu is displayed
        expect(screen.getByText('Explore')).toBeInTheDocument();
        expect(screen.getByText('My Plums')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();

        // Close dropdown menu
        fireEvent.click(menuButton);
        expect(screen.queryByText('My Plums')).not.toBeInTheDocument();
    });

    test('navigates to correct routes on button clicks', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('My Plums'));
        expect(navigateMock).toHaveBeenCalledWith('/myPlums');

        fireEvent.click(screen.getByText('Create'));
        expect(navigateMock).toHaveBeenCalledWith('/create');
    });
});
