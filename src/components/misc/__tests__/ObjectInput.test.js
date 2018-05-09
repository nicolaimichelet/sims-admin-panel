import React from 'react';
import ReactDOM from 'react-dom';
import { ObjectInput } from 'components/misc/ObjectInput.js';

import { mount, shallow } from 'enzyme';



describe('ObjectInput', () => {
  
  it('renders with no props', () => {
    const wrapper = shallow(<ObjectInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with inputs', () => {
    const wrapper = shallow(
      <ObjectInput>
        <input name="name" type="text" />
        <input name="href" type="text" />
      </ObjectInput>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
