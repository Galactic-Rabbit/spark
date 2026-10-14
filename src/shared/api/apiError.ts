import { isServerError } from './isServerError'

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.'
const RATE_LIMIT_MESSAGE = 'Too many attempts. Please wait a few seconds and try again.'
const SERVER_ERROR_MESSAGE = 'Server is unavailable. Please try again later.'

/**
 * openapi-fetch отдаёт ошибку как распарсенное тело ответа, то есть обычный объект,
 * а не Error. Из-за этого `e instanceof Error` в компонентах всегда был false и все
 * сообщения бэка молча подменялись на generic.
 */
export const getApiErrorMessage = (status: number, body: unknown): string => {
  if (isServerError(body)) {
    return body.messages.map(({ message }) => message).join('. ')
  }
  if (status === 429) return RATE_LIMIT_MESSAGE
  if (status >= 500) return SERVER_ERROR_MESSAGE
  return DEFAULT_MESSAGE
}

export type ApiError = Error & {
  readonly status: number
  readonly body: unknown
}

export const isApiError = (value: unknown): value is ApiError =>
  value instanceof Error && typeof (value as { status?: unknown }).status === 'number'

/**
 * Обычный Error с приклеенными status и body.
 * Именно Error, а не голый объект, чтобы `e instanceof Error ? e.message` в формах
 * продолжал работать без правок.
 */
export const createApiError = (status: number, body: unknown): ApiError =>
  Object.assign(new Error(getApiErrorMessage(status, body)), {
    name: 'ApiError',
    status,
    body,
  })
