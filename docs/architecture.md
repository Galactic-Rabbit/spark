# Архитектура проекта (FSD)

Проект построен по методологии **Feature-Sliced Design**. Ниже — правила, которых придерживаемся. Если кажется, что правило мешает — обсуждаем, а не игнорируем.

## Слои

Сверху вниз:

```
app → _pages → widgets → features → entities → shared
```

Правило импортов: **слой может импортировать только из слоёв ниже себя**. Обратные импорты запрещены и ловятся линтером (`eslint-plugin-boundaries`).

## Что где лежит

### `app/` — Next.js App Router

**Только роутинг.** Никакой бизнес-логики.

- `page.tsx` — тонкая обёртка: `export { XPage as default } from '@pages/x'`
- `layout.tsx` — общий layout группы
- `route.ts` — API-роуты (если нужны)
- `globals.css` — глобальные стили

**Не кладём в `app/`:** компоненты, хуки, бизнес-логику, состояние.

### `src/_app/` — инициализация приложения

Всё, что «настраивает» приложение:

- `Providers.tsx` — провайдеры (React Query и т.п.)
- `store/` — глобальные Zustand-сторы (например, модалки)
- `styles/` — токены, reset, типографика
- `ui/` — компоненты уровня приложения (например, `ModalsRoot`)

### `src/_pages/` — страницы

Композиция виджетов и фич. Каждая страница — отдельный слайс:

```
_pages/feed/
├── ui/FeedPage.tsx
└── index.ts
```

**Не кладём в `_pages/`:** бизнес-логику, запросы к API, компоненты, которые переиспользуются.

### `src/widgets/` — самостоятельные блоки UI

Крупные блоки, которые можно переиспользовать на разных страницах:

- `header`, `sidebar`, `post-list`, `user-menu`.

Виджет **может импортировать** `features`, `entities`, `shared`.

### `src/features/` — пользовательские сценарии

**Одна фича = один сценарий.** Не сливаем сценарии в одну фичу.

Примеры:

- ✅ `auth-login`, `auth-register`, `auth-forgot-password`
- ❌ `auth` (свалка из четырёх сценариев)

Именование: `префикс-действие` (`auth-login`, `post-create`, `user-follow`).

**Где живут мутации:** в фичах. `useDeletePlaylist`, `useCreatePost` — фича, не сущность.

**Как пишем мутацию:** один файл `api/useX.mutation.ts`, запрос — прямо в `mutationFn`. Отдельный файл с функцией запроса (`api/x.ts`) в фиче не заводим: кроме этого хука, его никто не вызывает.

```ts
// features/auth-register/api/useSignUp.mutation.ts
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: RegistrationDto): Promise<void> => {
      const { error } = await apiClient.POST('/api/v1/auth/registration', { body: data })
      if (error) throw error
    },
  })
}
```

**Где живут схемы форм:** в фичах (`model/*.schema.ts`). Это UI-правила, не контракт с бэком.

### `src/entities/` — бизнес-сущности

Что такое сущность:

- `user`, `session`, `post`, `playlist`.

Что внутри:

- `model/types.ts` — доменный тип (может отличаться от DTO бэка)
- `api/x.ts` — HTTP-обёртка, функция запроса (`getMe`). В сущности её держим отдельно: кроме хука, она может понадобиться, например, `queryClient.fetchQuery` при защите страниц
- `api/useX.query.ts` — хук **чтения** React Query (`useGetMe`)
- `model/useX.ts` — хук, который **вычисляет** что-то из уже полученных данных и сам в сеть не ходит (`useSession` считает статус из `useGetMe`)
- `ui/*` — отображение сущности (карточка, аватар)

**Правило для хуков:** ходит в сеть (`useQuery`, `useMutation`) — в `api/`; вычисляет из готовых данных — в `model/`. Подпапку `hooks/` не заводим: FSD называет сегменты по назначению (`api`, `model`, `ui`), а не по типу кода (`hooks`, `components`, `types`).

**Не кладём в `entities/`:** мутации, тосты, редиректы, confirm'ы — это фичи.

### `src/shared/` — инфраструктура

Ничего о домене:

- `ui/` — UI-кит (Button, Input, Modal, AuthFormWrapper)
- `api/` — HTTP-клиент, `authStorage`, `paths` из OpenAPI
- `lib/` — утилиты (toast, formatDate)
- `types/` — глобальные типы (svg.d.ts)

## Правила импортов

**Разрешено:**

```ts
// features/auth-login/ui/LoginForm.tsx
import { Button } from '@shared/ui/Button' // ✅ shared
import { useSession } from '@entities/session' // ✅ entities
```

**Запрещено:**

```ts
// entities/session/model/useSession.ts
import { LoginForm } from '@features/auth-login' // ❌ features выше entities
import { Header } from '@widgets/header' // ❌ widgets выше entities
```

Если очень нужно — обсуждаем, но скорее всего архитектура неправильная.

## Что где хранить — шпаргалка

| Что                                      | Где                                          |
| ---------------------------------------- | -------------------------------------------- |
| Данные с бэка                            | `entities/*/api/useX.query.ts` (React Query) |
| Хук-вычисление из данных (`useSession`)  | `entities/*/model/useX.ts`                   |
| Мутации (создать, удалить, изменить)     | `features/*/api/useX.mutation.ts`            |
| Глобальное UI-состояние (модалки, тема)  | `_app/store` (Zustand)                       |
| Локальное UI-состояние (открыта модалка) | `useState` внутри фичи                       |
| Форма                                    | `react-hook-form` внутри фичи                |
| Схема валидации формы                    | `features/*/model/*.schema.ts`               |
| DTO запроса к бэку                       | Из `paths` OpenAPI                           |
| Доменный тип (`User`)                    | `entities/*/model/types.ts`                  |
| Переиспользуемая кнопка                  | `shared/ui/Button`                           |
| Карточка поста                           | `entities/post/ui/PostCard`                  |
| Кнопка «лайкнуть»                        | `features/post-like`                         |

## Стек

- **Next.js 16** (App Router)
- **React 19**
- **TanStack Query** — server state
- **Zustand** — client UI state
- **react-hook-form** + **zod** — формы
- **openapi-fetch** — HTTP-клиент с типами из OpenAPI
- **CSS Modules** + **stylelint**

**Redux не используем.** Новый стейт-менеджмент — только через обсуждение.

## Полезные ссылки

- [FSD официальная документация](https://feature-sliced.design/)
- [FSD + Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs)
