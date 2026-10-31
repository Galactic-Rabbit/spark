export type ApiErrorFieldMessage = {
  message: string
  field: string
}

export type ApiErrorResponse = {
  statusCode: number
  error: string
  messages: ApiErrorFieldMessage[]
}

export const isServerError = (e: unknown): e is ApiErrorResponse =>
  typeof e === 'object' &&
  e !== null &&
  'statusCode' in e &&
  typeof e.statusCode === 'number' &&
  'error' in e &&
  typeof e.error === 'string' &&
  'messages' in e &&
  Array.isArray(e.messages) &&
  e.messages.length > 0 &&
  e.messages.every(
    (m) =>
      typeof m === 'object' &&
      m !== null &&
      'message' in m &&
      typeof m.message === 'string' &&
      'field' in m &&
      typeof m.field === 'string',
  )
