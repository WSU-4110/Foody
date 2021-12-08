import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../Register';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


test('testing the back-arrow link', () => {
  const wrapper = shallow(<Register/>);
  const backarrow = wrapper.find('.back-arrow');
  expect(backarrow.length).toEqual(1); // 
});    

  
test('onSubmit function of the register component', () => {
  const wrapper = shallow( <Register form="test"/> );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
});


test('Check default state of register button is disabled', () => {
  const wrapper = shallow( <Register form="test"/> );
  expect(wrapper.find('[type="submit"]').at(0));
});

 
test('Check all the text fields are on the page', () => {
  const wrapper = shallow( <Register form="test"/> );
  expect(wrapper.find('[type="text"]').length).toBe(2);
  expect(wrapper.find('[type="password"]').length).toBe(1);
});


