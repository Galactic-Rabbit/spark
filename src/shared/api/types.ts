//Закинул пока просто в дипсик со сваггера, потом будем смотреть, если сваггер фигово поддерживается,
// то будем вручную писать если беки будут сваггер хорошо прописывать, можно будет обновлять типы одной командо через openapi

//Закинул пока просто в дипсик со сваггера, потом будем смотреть, если сваггер фигово поддерживается,
// то будем вручную писать если беки будут сваггер хорошо прописывать, можно будет обновлять типы одной командо через openapi

export type paths = {
  '/api': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': string
          }
        }
      }
    }
  }
  '/api/auth/registration': {
    post: {
      description: 'Создаёт пользователя с isConfirmed=false и отправляет письмо с кодом.'
      summary: 'Регистрация'
      requestBody: {
        required: true
        content: {
          'application/json': RegistrationDto
        }
      }
      responses: {
        204: {
          description: 'Пользователь создан'
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/registration-confirmation': {
    post: {
      summary: 'Подтверждение email по коду из письма'
      requestBody: {
        required: true
        content: {
          'application/json': RegistrationConfirmationDto
        }
      }
      responses: {
        204: {
          description: 'Email подтверждён'
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/registration-email-resending': {
    post: {
      summary: 'Повторная отправка письма подтверждения'
      requestBody: {
        required: true
        content: {
          'application/json': RegistrationEmailResendingDto
        }
      }
      responses: {
        204: {
          description: 'Письмо отправлено повторно'
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
        404: {
          description: 'Ресурс не найден'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/password-recovery': {
    post: {
      description: 'Отправляет письмо со ссылкой для смены пароля.'
      summary: 'Восстановление пароля'
      requestBody: {
        required: true
        content: {
          'application/json': PasswordRecoveryDto
        }
      }
      responses: {
        204: {
          description: 'Письмо отправлено'
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
        404: {
          description: 'Ресурс не найден'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/new-password': {
    post: {
      description: 'Меняет пароль и инвалидирует все сессии пользователя.'
      summary: 'Новый пароль по recovery-коду'
      requestBody: {
        required: true
        content: {
          'application/json': NewPasswordDto
        }
      }
      responses: {
        204: {
          description: 'Пароль обновлён'
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/login': {
    post: {
      description: 'Возвращает accessToken в теле; refreshToken уходит httpOnly-cookie и в теле ответа не появляется.'
      summary: 'Вход по email и паролю'
      requestBody: {
        required: true
        content: {
          'application/json': LoginDto
        }
      }
      responses: {
        200: {
          description: 'Вход выполнен'
          content: {
            'application/json': LoginResponseDto
          }
        }
        400: {
          description: 'Невалидный запрос или ошибка валидации'
          content: {
            'application/json': ApiErrorDto
          }
        }
        401: {
          description: 'Нет авторизации или токен истёк'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
  '/api/auth/oauth/vk': {
    get: {
      description: 'Редирект на страницу авторизации VK. После согласия браузер вернётся на /api/auth/oauth/vk/callback.'
      summary: 'Вход через VK'
      responses: {
        302: {
          description: 'Redirect на oauth.vk.com'
        }
      }
    }
  }
  '/api/auth/oauth/vk/callback': {
    get: {
      description: 'Меняет code на профиль VK, логинит пользователя и редиректит на фронт. accessToken уходит в query, refreshToken — httpOnly-cookie. При ошибке query содержит error с машинным кодом.'
      summary: 'Callback VK OAuth'
      responses: {
        302: {
          description: 'Redirect на FRONTEND_URL/auth/oauth'
        }
      }
    }
  }
  '/api/auth/me': {
    get: {
      summary: 'Профиль текущего пользователя'
      security: {
        bearer: []
      }
      responses: {
        200: {
          description: 'Профиль пользователя'
          content: {
            'application/json': UserProfileDto
          }
        }
        401: {
          description: 'Нет авторизации или токен истёк'
          content: {
            'application/json': ApiErrorDto
          }
        }
      }
    }
  }
}

// ============ SCHEMAS ============

export type RegistrationDto = {
  /** Уникальный username */
  username: string
  /** Email нового пользователя */
  email: string
  /** Пароль от аккаунта (min 6, max 20) */
  password: string
  /** Подтверждение пароля */
  passwordConfirmation: string
  /** Имя */
  firstName: string
  /** Фамилия */
  lastName: string
}

export type RegistrationConfirmationDto = {
  /** Код подтверждения из ссылки в письме */
  code: string
}

export type RegistrationEmailResendingDto = {
  /** Email неподтверждённого пользователя */
  email: string
}

export type PasswordRecoveryDto = {
  /** Email пользователя */
  email: string
  /** Токен Google reCAPTCHA v2 (checkbox) с фронтенда */
  recaptchaToken: string
}

export type NewPasswordDto = {
  /** Новый пароль (min 6, max 20) */
  newPassword: string
  /** Подтверждение нового пароля */
  passwordConfirmation: string
  /** Код восстановления из ссылки в письме */
  recoveryCode: string
}

export type LoginDto = {
  /** Email зарегистрированного пользователя */
  email: string
  /** Пароль от аккаунта (min 8) */
  password: string
}

export type LoginResponseDto = {
  /** JWT для заголовка Authorization: Bearer <token>. Живёт 15 минут */
  accessToken: string
}

export type UserProfileDto = {
  /** Идентификатор пользователя (UUID) */
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  /** Дата регистрации, ISO 8601 в UTC */
  createdAt: string
}

export type ErrorDetailDto = {
  /** Поле запроса, к которому относится ошибка */
  field: string
  /** Текст ошибки для этого поля */
  message: string
}

export type ApiErrorDto = {
  /** Стабильный машинный код ошибки в UPPER_SNAKE_CASE. Клиент ветвится по нему, а не по message */
  code: string
  /** Человекочитаемый текст для пользователя */
  message: string
  /** Уточнения по полям, если ошибка относится к конкретным полям */
  details?: ErrorDetailDto[]
}
