import React from 'react';
import ReactDOM from 'react-dom';
import { ListInput } from 'components/misc/ListInput.js';

import { mount, shallow } from 'enzyme';



describe('ListInput', () => {
  
  it('renders with no props', () => {
    const wrapper = shallow(<ListInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
