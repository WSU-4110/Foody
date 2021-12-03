import { render, screen, userEvent, cleanup } from '@testing-library/react';
import RestaurantReview from './RestaurantReview';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';

afterEach(() => {
    cleanup();
});

it('renders without crashing', () => {
    render(<RestaurantReview />);
});

it('verifies that labels are present', () => {
    render(<RestaurantReview />);

    expect(screen.getByPlaceholderText('Add review (500 characters limit)')).toBeInTheDocument();
    expect(screen.getByText('Deliciousness')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
});


it('verifies that proper errors showing for invalid input', () => {
    let wrapper = mount(<RestaurantReview />);

    const form = wrapper.find('.form-group');
    const infoMsg = wrapper.find('div').at(0);

    expect(infoMsg.text()).toEqual('');
    form.simulate('submit', { preventDefault: () => { } });
    expect(infoMsg.text()).toEqual('Review cannot be blank; Pricing value cannot be blank');

});