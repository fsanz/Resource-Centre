import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import "@testing-library/jest-dom";
import App from "./App";
import { data } from "./services/data"

test("renders heading and increments counter", async () => {
  const user = userEvent.setup();

  render(<App />);

  expect(
    screen.getByRole("heading", { name: /resource centre/i }),
  ).toBeInTheDocument();
});

function getResourceCardButtons() {
  return screen.getAllByRole('button').filter((button) => {
    const label = button.getAttribute('aria-label') ?? ''
    return data.some((item) => label.startsWith(`${item.title},`))
  })
}

test('loads all resources', () => {
  render(<App />)

  expect(getResourceCardButtons()).toHaveLength(data.length);
})

test('shows grouped categories', () => {
  render(<App />)
  
  // gets a list of categories from the data
  const categoriesInData = [...new Set(data.map((item) => item.category))]

  // checks every category from the data is on screen
  for (const category of categoriesInData) {
    expect(
      screen.getByRole('heading', { name: category, level: 3 }),
    ).toBeInTheDocument()
  }
})