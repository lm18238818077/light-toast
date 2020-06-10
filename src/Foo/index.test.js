import { shallow } from 'enzyme';
import Foo from './index.js';

describe('<Foo />', () => {
    it('render Foo', () => {
        const wrapper = shallow(<Foo type="danger">hello, button</Foo>);
        expect(wrapper.children().text()).toEqual('hello, button');
    });
});