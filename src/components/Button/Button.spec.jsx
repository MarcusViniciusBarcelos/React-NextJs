import { render, screen } from "@testing-library/react";
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text="Load more" />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });
        button.click();

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        render(<Button text="Load more" disabled={true} />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeEnabled();
    });

    it('should match snapshot', () => {
        const { container } = render(<Button text="Load more" disabled={false} />);
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot();
    });

});