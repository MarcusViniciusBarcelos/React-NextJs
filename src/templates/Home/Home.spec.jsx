import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title 1",
          body: "body 1",
          url: "img/img1.png",
        },
        {
          userId: 2,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "img/img2.png",
        },
        {
          userId: 3,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "img/img3.png",
        },
        {
          userId: 4,
          id: 4,
          title: "title 4",
          body: "body 4",
          url: "img/img4.png",
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render", () => {
    expect(true).toBeTruthy();
  });

  it("should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem Posts");
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/type your search/i);
    const images = screen.getAllByRole("img", { name: /title/i });
    const button = screen.getByRole("button", { name: /load more posts/i });
    expect(search).toBeInTheDocument();
    expect(images).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  it("should search for posts", async () => {
    render(<Home />);

    // Wait for the removal of the loading

    const noMorePosts = screen.getByText("Não existem Posts");
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/type your search/i);

    // Wait for the loading of the posts.

    expect(
      screen.getByRole("heading", { name: "title 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 3" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /load more posts/i }),
    ).toBeInTheDocument();

    // Search for post 1.

    act(() => {
      userEvent.type(search, "title 1");
    });
    expect(
      screen.getByRole("heading", { name: "title 1" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 3" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /load more posts/i }),
    ).not.toBeInTheDocument();

    // Search for post inexistent

    act(() => {
      userEvent.type(search, "post does not exist");
    });
    expect(screen.getByText("Não existem Posts")).toBeInTheDocument();

    // Remove the search.

    act(() => {
      userEvent.clear(search);
    });
    expect(
      screen.getByRole("heading", { name: "title 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 3" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /load more posts/i }),
    ).toBeInTheDocument();
  });

  it("should load more posts", async () => {
    render(<Home />);

    // Wait for the removal of the loading

    const noMorePosts = screen.getByText("Não existem Posts");
    await waitForElementToBeRemoved(noMorePosts);
    const button = screen.getByRole("button", {
      name: /load more posts/i,
    });

    // Load more posts.
    act(() => {
      userEvent.click(button);
    });
    expect(
      screen.getByRole("heading", { name: "title 3" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "title 4" }),
    ).toBeInTheDocument();
  });
});
