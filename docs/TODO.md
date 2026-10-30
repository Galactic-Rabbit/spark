# TODO

Технический долг и задачи, отложенные на потом. Не забываем возвращаться.

## Обработка ошибок API — договориться о едином подходе — @VitaMirosh

На созвоне 29.10 Вита взяла разработку единого подхода; когда будет готово, расскажет команде.

Сейчас в формах два разных подхода: `RegisterForm` и `EmailVerificationExpired` проверяют сырое тело через `isServerError`, а логин и формы восстановления пароля используют `createApiError` / `isApiError` из `shared/api/apiError.ts`. Остальные формы (логаут) пишем по договорённости, а не «как получится».

- [ ] Сделать общую функцию в `shared/api` (например, `getErrorMessage(e): string`), которая превращает любое значение из `catch` в текст для юзера.
- [ ] Сетевые ошибки: сейчас в `catch` форм стоит `e instanceof Error ? e.message`, и при недоступном бэке или CORS юзер видит сырое «Failed to fetch». Показывать `e.message` только для `isApiError(e)`.
- [ ] Офлайн: мутации TanStack Query по умолчанию (`networkMode: 'online'`) встают на паузу без сети, и кнопка зависает в «Sending...» без сообщения. Решить: показывать «Нет сети» или менять `networkMode`.
- [ ] Перевести на выбранный подход все формы: `auth-register`, `auth-confirm-registration`, `auth-forgot-password`, `auth-recovery-password`, `auth-login`, логаут.

## Валидация пароля — вынести в общее место — @BalandinaM

Правила пароля (`min(6)`, `max(20)`, `PASSWORD_REGEX` и тексты ошибок) скопированы в `auth-register/model/register.schema.ts` и `auth-recovery-password/model/recovery.schema.ts`. Тексты уже разъехались: `'The passwords must match'` против `'Passwords do not match'`.

- [ ] Вынести общий `passwordSchema` ниже фич: в `shared/lib/validation` (или в `entities/user`, если решим, что правила пароля — часть доменной модели). Фичи будут собирать свои схемы из него.
- [ ] Выровнять тексты ошибок пароля и подтверждения пароля между формами.
- [ ] Подсказка под полем пароля (по макету — только «between 6 and 20 characters») не говорит о цифрах, регистре и спецсимволах. Писать полные требования во всех формах с паролем; отклонение от макета согласовать с дизайном.

## Защита страниц и общий layout — @BalandinaM

`useSession` уже определяет авторизацию через `/auth/me` (React Query) и обновляется после логина и логаута. Но страницы из `(authorized)` ничем не защищены: разлогиненный пользователь открывает `/feed` по адресу.

- [ ] Защитить страницы из `(authorized)`: без авторизации — редирект на `/login`.
- [ ] Рассмотреть переезд логики `Header`/`Sidebar` в layout приложения, если это возможно без усложнения: сейчас `_pages/main/ui/MainPage.tsx` повторяет разметку `app/(authorized)/layout.tsx`.

## React Query — на потом

Где лежат запросы и хуки, записано в `docs/architecture.md` (разделы про `features/` и `entities/`).

- [ ] Когда запросов станет больше, рассмотреть фабрики `queryOptions` в `*.query.ts` вместо хуков, как в [гайде FSD](https://feature-sliced.design/docs/guides/tech/with-react-query), — чтобы ключ (`['auth', 'me']`) жил в одном месте и его удобно было передавать в `invalidateQueries`.
