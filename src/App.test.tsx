import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import App from './App'
import { filterAndSortResources } from './components/ResourceListings'
import { data } from './services/data'
import { ContentItem } from './types'
import { formatDate } from './utils/resources'

test('renders heading and increments counter', async () => {
  const user = userEvent.setup()

  render(<App />)

  expect(
    screen.getByRole('heading', { name: /resource centre/i }),
  ).toBeInTheDocument()
})

function getResourceCardButtons() {
  return screen.queryAllByRole('button').filter((button) => {
    const label = button.getAttribute('aria-label') ?? ''
    return data.some((item) => label.startsWith(`${item.title},`))
  })
}

function getDisplayedTitles() {
  return getResourceCardButtons().map((button) => {
    const label = button.getAttribute('aria-label')!
    return data.find((item) => label.startsWith(`${item.title},`))!.title
  })
}

test('loads all resources', () => {
  render(<App />)

  expect(getResourceCardButtons()).toHaveLength(data.length)
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

// Filter
test('loads all resources sorted by newest date', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort resources/i }),
    'newest',
  )

  expect(getResourceCardButtons()).toHaveLength(data.length)
  for (const resource of data) {
    expect(
      screen.getByRole('button', {
        name: new RegExp(`^${resource.title},`, 'i'),
      }),
    ).toBeInTheDocument()
  }

  const expectedOrder = filterAndSortResources(data, 'All', 'newest', '').map(
    (item) => item.title,
  )
  expect(getDisplayedTitles()).toEqual(expectedOrder)
})

test('sorts resources by oldest date', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort resources/i }),
    'oldest',
  )

  const expectedOrder = filterAndSortResources(data, 'All', 'oldest', '').map(
    (item) => item.title,
  )
  expect(getDisplayedTitles()).toEqual(expectedOrder)
})

test('shows grouped categories when sorting by category', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort resources/i }),
    'category',
  )

  const categoriesInData = [...new Set(data.map((item) => item.category))]
  for (const category of categoriesInData) {
    expect(
      screen.getByRole('heading', { name: category, level: 3 }),
    ).toBeInTheDocument()
  }
})

// Search Bar
test('shows message when no resources are found', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.type(
    screen.getByRole('searchbox', { name: /search resources/i }),
    'nonexistent query',
  )

  expect(getResourceCardButtons()).toHaveLength(0)
  expect(screen.getByText('No resources found')).toBeInTheDocument()
  expect(
    screen.getByText('Try another title, tag or category.'),
  ).toBeInTheDocument()
})

test('filters resources by title', async () => {
  const user = userEvent.setup()

  render(<App />)
  expect(getResourceCardButtons()).toHaveLength(data.length)

  const searchInput = screen.getByRole('searchbox', {
    name: /search resources/i,
  })
  await user.type(searchInput, 'Mindful Moments')
  expect(getResourceCardButtons()).toHaveLength(1)
  expect(
    screen.getByRole('button', { name: /^Mindful Moments,/i }),
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /^The Science of Sleep,/i }),
  ).not.toBeInTheDocument()

  await user.clear(searchInput)
  await user.type(searchInput, 'science of sleep')

  expect(getResourceCardButtons()).toHaveLength(1)
  expect(
    screen.getByRole('button', { name: /^The Science of Sleep,/i }),
  ).toBeInTheDocument()

  await user.clear(searchInput)
  await user.type(searchInput, 'nonexistent title')

  expect(getResourceCardButtons()).toHaveLength(0)
  expect(
    screen.getByRole('heading', { name: /no resources found/i }),
  ).toBeInTheDocument()
})

test('filters resources by tag', async () => {
  const user = userEvent.setup()

  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: /search resources/i,
  })

  await user.type(searchInput, 'mindfulness')

  expect(getResourceCardButtons()).toHaveLength(2)
  expect(
    screen.getByRole('button', { name: /^Mindful Moments,/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /^Wellness Weekly,/i }),
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /^The Science of Sleep,/i }),
  ).not.toBeInTheDocument()

  await user.clear(searchInput)
  await user.type(searchInput, 'mobility')

  expect(getResourceCardButtons()).toHaveLength(1)
  expect(
    screen.getByRole('button', { name: /^10-Minute Morning Stretch,/i }),
  ).toBeInTheDocument()

  await user.clear(searchInput)
  await user.type(searchInput, 'nonexistent-tag')

  expect(getResourceCardButtons()).toHaveLength(0)
  expect(
    screen.getByRole('heading', { name: /no resources found/i }),
  ).toBeInTheDocument()
})

// Show complete resource info
test.each(data)('shows all data when opening $title', async (resource) => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(
    screen.getByRole('button', {
      name: new RegExp(`^${resource.title},`, 'i'),
    }),
  )

  const dialog = screen.getByRole('dialog', {
    name: new RegExp(resource.title, 'i'),
  })
  expectResourceDataInModal(resource, dialog)
})

function expectResourceDataInModal(resource: ContentItem, dialog: HTMLElement) {
  const view = within(dialog)

  expect(
    view.getByRole('heading', { level: 2, name: resource.title }),
  ).toBeInTheDocument()
  expect(view.getByText(resource.category)).toBeInTheDocument()
  expect(view.getByText(resource.description)).toBeInTheDocument()
  expect(view.getByText(`${resource.duration} min`)).toBeInTheDocument()
  expect(view.getByText(formatDate(resource.date_uploaded))).toBeInTheDocument()

  for (const tag of resource.tags.slice(0, 3)) {
    expect(view.getAllByText(tag).length).toBeGreaterThan(0)
  }

  expect(dialog.querySelector(`img[src="${resource.thumbnail}"]`)).toBeTruthy()

  const aboutText = `${resource.title} is a carefully selected ${resource.category.toLowerCase()} resource designed to support your wellbeing. Explore this resource at your own pace and make it part of your personal wellbeing routine.`
  expect(view.getByText(aboutText)).toBeInTheDocument()
}

test('renders resource centre and opens a resource modal', async () => {
  const user = userEvent.setup()

  render(<App />)

  expect(
    screen.getByRole('heading', { name: /resource centre/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByPlaceholderText(/search by title or tags/i),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /mindful moments/i }),
  ).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /mindful moments/i }))

  expect(
    screen.getByRole('dialog', { name: /mindful moments/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: /mindful moments/i, level: 2 }),
  ).toBeInTheDocument()
})
