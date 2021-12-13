import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../ProfilePage';
import RecentReviews from '../RecentReviews';
import Footer from '../Footer';
import Navigation from '../Navigation';
import { Star } from 'react-star';
import ModalImage from "react-modal-image";

afterEach(() => {
    cleanup();
});

test('should render ProfilePage component', () => {
    render(
        <Router>
            <ProfilePage />
        </Router>
    );
})

test('should render Navigation component', () => {
    render(
        <Router>
            <Navigation />
        </Router>
    );
})

test('should render RecentReviews component', () => {
    render(
        <Router>
            <RecentReviews />
        </Router>
    );
})

test('should render Footer component', () => {
    render(
        <Router>
            <Footer />
        </Router>
    );
})

test('should render Star component', () => {
    render(
        <Router>
            <Star />
        </Router>
    );
})

test('should render ModalImage component', () => {
    render(
        <Router>
            <ModalImage />
        </Router>
    );
})