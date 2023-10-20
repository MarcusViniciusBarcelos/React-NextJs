import { PostCard } from ".";
import { render, screen } from "@testing-library/react";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: /title 1/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /title 1/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("body 1")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /title 1/i })).toHaveAttribute(
      "src",
      "img/img.png",
    );
    expect(screen.getByRole("img", { name: /title 1/i })).toHaveAttribute(
      "alt",
      "title 1",
    );
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
