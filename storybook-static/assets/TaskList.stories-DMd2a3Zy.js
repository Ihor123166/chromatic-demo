import { j as s } from './jsx-runtime-u17CrQMm.js'
import { T as k, A as T, D as t } from './task.stories-D6nQdp92.js'
function c({ loading: d = !1, tasks: l, onPinTask: g, onArchiveTask: m }) {
  const u = { onPinTask: g, onArchiveTask: m },
    e = s.jsxs('div', {
      className: 'loading-item',
      children: [
        s.jsx('span', { className: 'glow-checkbox' }),
        s.jsxs('span', {
          className: 'glow-text',
          children: [
            s.jsx('span', { children: 'Loading' }),
            ' ',
            s.jsx('span', { children: 'cool' }),
            ' ',
            s.jsx('span', { children: 'state' }),
          ],
        }),
      ],
    })
  if (d)
    return s.jsxs(
      'div',
      {
        className: 'list-items',
        'data-testid': 'loading',
        children: [e, e, e, e, e, e],
      },
      'loading'
    )
  if (l.length === 0)
    return s.jsx(
      'div',
      {
        className: 'list-items',
        'data-testid': 'empty',
        children: s.jsxs('div', {
          className: 'wrapper-message',
          children: [
            s.jsx('span', { className: 'icon-check' }),
            s.jsx('p', {
              className: 'title-message',
              children: 'You have no tasks',
            }),
            s.jsx('p', {
              className: 'subtitle-message',
              children: 'Sit back and relax',
            }),
          ],
        }),
      },
      'empty'
    )
  const p = [
    ...l.filter((a) => a.state === 'TASK_PINNED'),
    ...l.filter((a) => a.state !== 'TASK_PINNED'),
  ]
  return s.jsx('div', {
    className: 'list-items',
    children: p.map((a) => s.jsx(k, { task: a, ...u }, a.id)),
  })
}
c.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'TaskList',
  props: {
    loading: {
      required: !1,
      tsType: { name: 'boolean' },
      description: "Checks if it's in loading state",
      defaultValue: { value: 'false', computed: !1 },
    },
    tasks: {
      required: !0,
      tsType: {
        name: 'Array',
        elements: [
          {
            name: 'signature',
            type: 'object',
            raw: `{
  id: string;
  title: string;
  state: 'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED';
}`,
            signature: {
              properties: [
                { key: 'id', value: { name: 'string', required: !0 } },
                { key: 'title', value: { name: 'string', required: !0 } },
                {
                  key: 'state',
                  value: {
                    name: 'union',
                    raw: "'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED'",
                    elements: [
                      { name: 'literal', value: "'TASK_ARCHIVED'" },
                      { name: 'literal', value: "'TASK_INBOX'" },
                      { name: 'literal', value: "'TASK_PINNED'" },
                    ],
                    required: !0,
                  },
                },
              ],
            },
          },
        ],
        raw: 'TaskData[]',
      },
      description: 'The list of tasks',
    },
    onPinTask: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(id: string) => void',
        signature: {
          arguments: [{ type: { name: 'string' }, name: 'id' }],
          return: { name: 'void' },
        },
      },
      description: 'Event to change the task to pinned',
    },
    onArchiveTask: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(id: string) => void',
        signature: {
          arguments: [{ type: { name: 'string' }, name: 'id' }],
          return: { name: 'void' },
        },
      },
      description: 'Event to change the task to archived',
    },
  },
}
const N = {
    component: c,
    title: 'TaskList',
    decorators: [
      (d) => s.jsx('div', { style: { margin: '3rem' }, children: d() }),
    ],
    tags: ['autodocs'],
    args: { ...T },
  },
  n = {
    args: {
      tasks: [
        { ...t.args.task, id: '1', title: 'Task 1' },
        { ...t.args.task, id: '2', title: 'Task 2' },
        { ...t.args.task, id: '3', title: 'Task 3' },
        { ...t.args.task, id: '4', title: 'Task 4' },
        { ...t.args.task, id: '5', title: 'Task 5' },
        { ...t.args.task, id: '6', title: 'Task 6' },
      ],
    },
  },
  i = {
    args: {
      tasks: [
        ...n.args.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
      ],
    },
  },
  r = { args: { tasks: [], loading: !0 } },
  o = { args: { ...r.args, loading: !1 } }
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.tsx.
    tasks: [{
      ...TaskStories.Default.args.task,
      id: '1',
      title: 'Task 1'
    }, {
      ...TaskStories.Default.args.task,
      id: '2',
      title: 'Task 2'
    }, {
      ...TaskStories.Default.args.task,
      id: '3',
      title: 'Task 3'
    }, {
      ...TaskStories.Default.args.task,
      id: '4',
      title: 'Task 4'
    }, {
      ...TaskStories.Default.args.task,
      id: '5',
      title: 'Task 5'
    }, {
      ...TaskStories.Default.args.task,
      id: '6',
      title: 'Task 6'
    }]
  }
}`,
      ...n.parameters?.docs?.source,
    },
  },
}
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    tasks: [...Default.args.tasks.slice(0, 5), {
      id: '6',
      title: 'Task 6 (pinned)',
      state: 'TASK_PINNED'
    }]
  }
}`,
      ...i.parameters?.docs?.source,
    },
  },
}
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    tasks: [],
    loading: true
  }
}`,
      ...r.parameters?.docs?.source,
    },
  },
}
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false
  }
}`,
      ...o.parameters?.docs?.source,
    },
  },
}
const S = ['Default', 'WithPinnedTasks', 'Loading', 'Empty']
export {
  n as Default,
  o as Empty,
  r as Loading,
  i as WithPinnedTasks,
  S as __namedExportsOrder,
  N as default,
}
