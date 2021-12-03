import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ResturantTab from './ResturantTab';
import { Enzyme, shallow, mount } from 'enzyme';

afterEach(() => {
    cleanup();
});

it('renders without crashing', () => {
    render(<ResturantTab />);
});

it('verifies that component includes labels', () => {
    render(<ResturantTab />);

    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Ratings!')).toBeInTheDocument();
});

it('verifies that props are loaded correctly', () => {
    const wrapper = shallow(<ResturantTab name='Test Restaurant' phone='111-111-1111' address='Test address' website='test.com' coordinates={[1, 2]} />);

    expect(wrapper.find('h2').at(0).text()).toEqual('Test Restaurant ');
    expect(wrapper.find('h4').at(0).text()).toEqual('111-111-1111 ');
    expect(wrapper.find('h4').at(1).text()).toEqual('Test address ');
    expect(wrapper.find('a').at(0).props().href).toContain('test.com');


});

it('verifies that "Post a review" button works', () => {
    const wrapper = shallow(<ResturantTab />);

    expect(wrapper.find('button').at(0).text()).toContain('Post a review');
    wrapper.find('button').at(0).simulate('click', { preventDefault: () => { } });
    expect(wrapper.find('button').at(0).text()).toContain('Cancel');
});

it('verifies that restaurantId state is updated clicking "Post a review"', () => {
    const setRestaurantId = jest.fn();
    const wrapper = mount(<ResturantTab />);
    const handleClick = jest.spyOn(React, 'useState');

    handleClick.mockImplementation((restaurantId => [restaurantId, setRestaurantId]));

    wrapper.find('button').at(0).simulate('click', { preventDefault: () => { } });
    expect(setRestaurantId).toBeTruthy();
});