# TODO

Технический долг и задачи, отложенные на потом. Не забываем возвращаться.

## Логика авторизации

- [ ] Создать `entities/session/api/authApi.ts` с HTTP-функциями (login, register, forgotPassword, me).
- [ ] Переписать фичи `auth-*` — вызывать `authApi.*`, а не `apiClient.*` напрямую.
- [ ] Решить, куда положить `/me` — в `entities/session` или `entities/user`.

## Обработка ошибок API — договориться о едином подходе

Сейчас в формах два разных подхода: `RegisterForm` проверяет сырое тело через `isServerError`, а формы восстановления пароля используют `createApiError` / `isApiError` из `shared/api/apiError.ts`. Остальные формы (логин, логаут) пишем по договорённости, а не «как получится».

- [ ] Обсудить с командой и выбрать один подход. Кандидат: `createApiError` / `isApiError`.
- [ ] Сделать общую функцию в `shared/api` (например, `getErrorMessage(e): string`), которая превращает любое значение из `catch` в текст для юзера.
- [ ] Сетевые ошибки: сейчас в `catch` форм стоит `e instanceof Error ? e.message`, и при недоступном бэке или CORS юзер видит сырое «Failed to fetch». Показывать `e.message` только для `isApiError(e)`.
- [ ] Офлайн: мутации TanStack Query по умолчанию (`networkMode: 'online'`) встают на паузу без сети, и кнопка зависает в «Sending...» без сообщения. Решить: показывать «Нет сети» или менять `networkMode`.
- [ ] Перевести на выбранный подход все формы: `auth-register`, `auth-forgot-password`, `auth-recovery-password`, `auth-login`, логаут.

## Валидация пароля — вынести в общее место

Правила пароля (`min(6)`, `max(20)`, `PASSWORD_REGEX` и тексты ошибок) скопированы в `auth-register/model/register.schema.ts` и `auth-recovery-password/model/recovery.schema.ts`. Тексты уже разъехались: `'The passwords must match'` против `'Passwords do not match'`.

- [ ] Вынести общий `passwordSchema` ниже фич: в `shared/lib/validation` (или в `entities/user`, если решим, что правила пароля — часть доменной модели). Фичи будут собирать свои схемы из него.
- [ ] Выровнять тексты ошибок пароля и подтверждения пароля между формами.
- [ ] Подсказка под полем пароля (по макету — только «between 6 and 20 characters») не говорит о цифрах, регистре и спецсимволах. Писать полные требования во всех формах с паролем; отклонение от макета согласовать с дизайном.

## Инструменты команды

- [ ] Настроить `husky` + `lint-staged`: перед каждым коммитом автоматически прогонять `prettier --write`, `stylelint --fix` и `eslint --fix` по изменённым файлам, чтобы не полагаться на ручной `npm run lint:fix` перед пушем.

## Заготовки на будущее (линтер ругается)

- [ ] `features/auth-forgot-password/api/useForgotPassword.mutation.ts` — дореализовать `authStorage`, `queryClient`, `data`.
- [ ] `features/auth-login/ui/LoginForm.tsx` — дореализовать `result`.

## Сущности — скелеты

- [ ] `entities/session` — реализовать чтение токена из `authStorage`, реактивность, использовать в `app/page.tsx` и `features/auth-*`.
- [ ] `entities/user` — реализовать `getMe`, использовать в `widgets/header` (user-menu).

## `app/page.tsx`

- [ ] Убрать логику `isAuthorized` в `entities/session`, когда появится реальная проверка.
- [ ] Рассмотреть переезд логики `Header`/`Sidebar` в layout приложения, если это возможно без усложнения.
