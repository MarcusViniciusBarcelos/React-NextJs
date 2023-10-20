import userEvent from '@testing-library/user-event';
import {TextInput} from '.';
import { render, screen } from "@testing-library/react";

describe('<TextInput />', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'} />);
        const input = screen.getByPlaceholderText(/type your search/i);
        expect(input.value).toBe('testando');
    });
    
    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} />);
        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';
    
        userEvent.type(input, value);
        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });
    
    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn} searchValue={'testando'} />);
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot();
    });
});