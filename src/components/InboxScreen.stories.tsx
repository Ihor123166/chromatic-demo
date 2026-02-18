import type { Meta, StoryObj } from '@storybook/react-vite'

import { http, HttpResponse } from 'msw'

import { MockedState } from './TaskList.stories'

import { Provider } from 'react-redux'

import InboxScreen from './InboxScreen'

import store from '../lib/store'

import {
  expect,
  userEvent,
  findByRole,
  within,
  getByLabelText,
} from '@storybook/test'

const meta = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
} satisfies Meta<typeof InboxScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(MockedState.tasks)
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return new HttpResponse(null, {
            status: 403,
          })
        }),
      ],
    },
  },
}

export const PinTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const getTask = (id: string) => canvas.findByLabelText(id)

    const itemToPin = await getTask('task-4')
    // Find the pin button
    const pinButton = await findByRole(itemToPin, 'button', {
      name: 'pinTask-4',
    })
    // Click the pin button
    await userEvent.click(pinButton)
    // Check that the pin button is now a unpin button
    const unpinButton = within(itemToPin).getByRole('button', {
      name: 'pinTask-4',
    })
    await expect(unpinButton).toBeInTheDocument()
  },
}

export const ArchiveTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const getTask = (id: string) => canvas.findByLabelText(id)

    const itemToArchive = await getTask('task-2')
    const archiveButton = await getByLabelText(itemToArchive, 'check-2')
    await userEvent.click(archiveButton)
  },
}

// Failed test
// export const ErrorTask = {
//   parameters: {
//     ...Default.parameters,
//   },
//   play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
//     const canvas = within(canvasElement)
//     const getTask = (id: string) => canvas.findByLabelText(id)

//     const itemToArchive = await getTask('task-888')
//     const archiveButton = await getByLabelText(itemToArchive, 'check-2')
//     await userEvent.click(archiveButton)
//   },
// }