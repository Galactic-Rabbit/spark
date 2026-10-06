# TODO

Технический долг и задачи, отложенные на потом. Не забываем возвращаться.

## Логика авторизации

- [ ] Создать `entities/session/api/authApi.ts` с HTTP-функциями (login, register, forgotPassword, me).
- [ ] Переписать фичи `auth-*` — вызывать `authApi.*`, а не `apiClient.*` напрямую.
- [ ] Решить, куда положить `/me` — в `entities/session` или `entities/user`.

## Заготовки на будущее (линтер ругается)

- [ ] `features/auth-forgot-password/api/useForgotPassword.mutation.ts` — дореализовать `authStorage`, `queryClient`, `data`.
- [ ] `features/auth-login/ui/LoginForm.tsx` — дореализовать `result`.
- [ ] `features/auth-register/ui/RegisterForm.tsx` — дореализовать `terms`.

## Сущности — скелеты

- [ ] `entities/session` — реализовать чтение токена из `authStorage`, реактивность, использовать в `app/page.tsx` и `features/auth-*`.
- [ ] `entities/user` — реализовать `getMe`, использовать в `widgets/header` (user-menu).

## `app/page.tsx`

- [ ] Убрать логику `isAuthorized` в `entities/session`, когда появится реальная проверка.
- [ ] Рассмотреть переезд логики `Header`/`Sidebar` в layout приложения, если это возможно без усложнения.

## Email Verification

- [ ] `features/auth-verify-email` создан, но нигде не используется. Подключить, когда будет страница подтверждения email.
