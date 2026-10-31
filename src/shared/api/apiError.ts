import { isServerError } from './isServerError'
import type { ApiErrorResponse } from './isServerError'

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.'
const RATE_LIMIT_MESSAGE = 'Too many attempts. Please wait a few seconds and try again.' //429 ошибка
const SERVER_ERROR_MESSAGE = 'Server is unavailable. Please try again later.'
const UNAUTHORIZED_MESSAGE = 'Your session has expired. Please log in again.' //401 ошибка
const BAD_REQUEST_MESSAGE = 'Invalid request. Please check the entered data and try again.' // 400 ошибка без тела

/**
 * openapi-fetch отдаёт ошибку как распарсенное тело ответа, то есть обычный объект,
 * а не Error. Из-за этого `e instanceof Error` в компонентах всегда был false и все
 * сообщения бэка молча подменялись на generic.
 */
export const getApiErrorMessage = (status: number, body: unknown): string => {
  if (typeof body === 'object' && body !== null && 'messages' in body) {
    const message = body.messages
    if (typeof message === 'string') {
      const trimmed = message.trim()
      if (trimmed) return trimmed
    }
  }
  if (isServerError(body)) {
    return body.messages.map(({ message }) => message).join('. ')
  }
  if (status === 401) return UNAUTHORIZED_MESSAGE
  if (status === 400) return BAD_REQUEST_MESSAGE
  if (status === 429) return RATE_LIMIT_MESSAGE
  if (status >= 500) return SERVER_ERROR_MESSAGE
  return DEFAULT_MESSAGE
}

export type ApiError = Error & {
  readonly status: number
  /** Тело ошибки в форме сваггера. Если бэк прислал что-то другое (или сети не было) — null. */
  readonly body: ApiErrorResponse | null
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
    body: isServerError(body) ? body : null,
  })
