import React from 'react';
import ReactDOM from 'react-dom';
import { ObjectInput } from 'components/misc/ObjectInput.js';

import { mount, shallow, render } from 'enzyme';
import { wrap } from 'module';

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

  it('renders with value and inputs', () => {

    const formData = {
      name: "server",
      href: "http://server:port"
    }
    const wrapper = shallow(
      <ObjectInput value={formData}>
        <input name="name" type="text" />
        <input name="href" type="text" />
      </ObjectInput>
    );

    expect(wrapper.find('[name="name"]').props().value).toBe(formData.name);
    expect(wrapper.find('[name="href"]').props().value).toBe(formData.href);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with sub objects', () => {
    const formData = {
      name: "server",
      href: "http://server:port",
      spec: {
        type: "speed",
        value: "100Mbps"
      }
    }
    const wrapper = shallow(
      <ObjectInput value={formData}>
        <input name="name" type="text" />
        <input name="href" type="text" />
        <input name="spec.type" type="text" />
        <input name="spec.value" type="text" />
      </ObjectInput>
    );

    expect(wrapper.find('[name="name"]').props().value).toBe(formData.name);
    expect(wrapper.find('[name="href"]').props().value).toBe(formData.href);
    
    expect(wrapper.find('[name="spec.type"]').props().value).toBe(formData.spec.type);
    expect(wrapper.find('[name="spec.value"]').props().value).toBe(formData.spec.value);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with nested ObjectInputs', () => {
    const formData = {
      name: "server",
      href: "http://server:port",
      spec: {
        type: "speed",
        value: "100Mbps"
      }
    }

    const wrapper = mount(
      <ObjectInput value={formData}>
        <input name="name" type="text" />
        <input name="href" type="text" />
        <ObjectInput name="spec">
          <input mapValue={(a)=>a} name="type" type="text" />
          <input onChange={jest.fn()} name="value" type="text" />
        </ObjectInput>
      </ObjectInput>
    );

    expect(wrapper.find('[name="name"]').props().value).toBe(formData.name);
    expect(wrapper.find('[name="href"]').props().value).toBe(formData.href);
    expect(wrapper.find('[name="spec"]').find('[name="type"]').props().value).toBe(formData.spec.type);
    expect(wrapper.find('[name="spec"]').find('[name="value"]').props().value).toBe(formData.spec.value);

  });

  it('mounts, changes props, simulates change and unmounts', () => {
    const formData = {
      name: "server",
      href: "http://server:port",
      spec: {
        type: "enabled",
        value: true
      }
    };

    const wrapper = mount(
      <ObjectInput value={formData}>
        <input name="name" type="text" />
        <input name="href" type="text" />
        <ObjectInput name="spec">
          <input name="type" type="text" />
          <input onCheck={jest.fn()} name="value" type="checkbox" />
        </ObjectInput>
      </ObjectInput>
    );

    formData.name = "notserver";
    wrapper.setProps({
      value: formData,
      onChange: jest.fn()
    });

    wrapper.update();

    expect(wrapper.find('[name="name"]').props().value).toBe(formData.name);
    expect(wrapper.find('[name="href"]').props().value).toBe(formData.href);
    
    const inner = wrapper.find('[name="spec"]');
    expect(inner.find('[name="type"]').props().value).toBe(formData.spec.type);
    expect(inner.find('[name="value"]').props().value).toBe(formData.spec.value);

    //wrapper.find('[name="value"]').simulate("change", "1234");
    //wrapper.find('[name="href"]').simulate("change", "5678");

    //expect(wrapper.props.onChange).toHaveBeenCalled();

    wrapper.unmount();
  });


});
