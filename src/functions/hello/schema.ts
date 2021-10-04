export const requestBody = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
} as const
