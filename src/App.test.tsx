import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders heading and increments counter', async () => {
  const user = userEvent.setup()

  render(<App />)

  expect(
    screen.getByRole('heading', { name: /resource centre/i }),
  ).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /count is 0/i }))

  expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
})
