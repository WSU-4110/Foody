import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('HomePage renders', () => { 
  const wrapper = shallow( <HomePage/> );
  expect(wrapper.exists()).toBe(true);
});

test('map is loaded on the HomePage', () => {
  const wrapper = shallow( <HomePage/> );
  expect(wrapper.find('Map').exists()).toBe(true);
});
 