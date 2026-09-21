# TODO

Технический долг и задачи, отложенные на потом. Не забываем возвращаться.

## API-типы

- [ ] заменить ручные типы в апи-авторизации на тип из `paths`, когда сваггер будет актуальным.
- [ ] `auth-register`: уточнить у бэков, зачем обязательные `firstName`/`lastName` в регистрации. Если не нужны — попросить сделать опциональными (сейчас отправляем пустые строки).
- [ ] `shared/api/types.ts`: сгенерировать полный `paths` из OpenAPI.

## Заготовки на будущее (линтер ругается)

- [ ] `features/auth-forgot-password/api/useForgotPassword.mutation.ts` — дореализовать `authStorage`, `queryClient`, `data`.
- [ ] `features/auth-login/ui/LoginForm.tsx` — дореализовать `result`.
- [ ] `features/auth-register/ui/RegisterForm.tsx` — дореализовать `terms`.
- [ ] `shared/api/client.ts` — подключить `authMiddleware` в `apiClient`.

## Сущности — скелеты

- [ ] `entities/session` — реализовать чтение токена из `authStorage`, реактивность, использовать в `app/page.tsx` и `features/auth-*`.
- [ ] `entities/user` — реализовать `getMe`, использовать в `widgets/header` (user-menu).

## `app/page.tsx`

- [ ] Убрать логику `isAuthorized` в `entities/session`, когда появится реальная проверка.
- [ ] Рассмотреть переезд логики `Header`/`Sidebar` в layout приложения, если это возможно без усложнения.

## Email Verification

- [ ] `features/auth-verify-email` создан, но нигде не используется. Подключить, когда будет страница подтверждения email.
