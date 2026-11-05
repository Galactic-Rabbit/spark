// Временный мок — удалить, когда появится useGetComments.
// Форма повторяет живой ответ GET /api/v1/public-posts/{postId}/comments (поле items).
// Аватарки — настоящие ссылки со staging-S3 (разрешён в next.config.ts → remotePatterns),
// имена и тексты выдуманы.
// Бэк отдаёт аватар в двух размерах (192x192 и 45x45), а у юзера без аватарки — пустой массив.

const S3 = 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image'

export const commentsMock = [
  {
    id: 1,
    postId: 1,
    from: {
      id: 71,
      username: 'anna_travels',
      avatars: [
        {
          url: `${S3}/e4254db8-7988-4671-9ade-bc96b90cc42a_users/71/avatar/fc58401a-f59c-4876-9173-9c99a8fd39a9-images-192x192`,
          width: 192,
          height: 192,
          fileSize: 2752,
          createdAt: '2026-03-08T20:51:56.592Z',
        },
        {
          url: `${S3}/0ebb560a-846d-470c-8c29-97c816d85968_users/71/avatar/fc58401a-f59c-4876-9173-9c99a8fd39a9-images-45x45`,
          width: 45,
          height: 45,
          fileSize: 766,
          createdAt: '2026-03-08T20:51:56.592Z',
        },
      ],
    },
    content: 'Какой свет! Это на закате снимала?',
    createdAt: '2026-11-05T08:12:00.000Z',
    answerCount: 2,
    likeCount: 5,
    isLiked: true,
  },
  {
    id: 2,
    postId: 1,
    from: {
      id: 467,
      username: 'max.frontend',
      avatars: [
        {
          url: `${S3}/ec86a50e-55b1-4c8d-934d-f1bb0f60b40e_users/467/avatar/f5f287e3-9de0-44c3-8394-c2acecfc291b-images-192x192`,
          width: 192,
          height: 192,
          fileSize: 8168,
          createdAt: '2026-04-11T19:40:37.347Z',
        },
        {
          url: `${S3}/9c818b2e-bbd4-480a-a6ed-ee647d4aa408_users/467/avatar/f5f287e3-9de0-44c3-8394-c2acecfc291b-images-45x45`,
          width: 45,
          height: 45,
          fileSize: 1080,
          createdAt: '2026-04-11T19:40:37.347Z',
        },
      ],
    },
    content: '🔥🔥🔥',
    createdAt: '2026-11-04T19:40:00.000Z',
    answerCount: 0,
    likeCount: 0,
    isLiked: false,
  },
  {
    id: 3,
    postId: 1,
    from: {
      id: 105,
      username: 'no_avatar_user',
      avatars: [], // так бэк отдаёт пользователя без аватарки — проверка заглушки
    },
    content: 'А где это? Хочу туда следующим летом 😍',
    createdAt: '2026-11-02T10:05:00.000Z',
    answerCount: 1,
    likeCount: 1,
    isLiked: false,
  },
  {
    id: 4,
    postId: 1,
    from: {
      id: 228,
      username: 'very_long_username_for_layout_check',
      avatars: [
        {
          url: `${S3}/595baee3-07b7-4d75-ad70-0e8aab718964_users/228/avatar/f21489ea-5b0e-45c8-8ba4-2d9d63e70e0b-images-45x45`,
          width: 45,
          height: 45,
          fileSize: 1001,
          createdAt: '2026-03-04T11:45:58.882Z',
        },
      ],
    },
    // длинный текст — проверить перенос строк и что аватарка не сжимается
    content:
      'Очень давно хотела съездить в эти края, и вот наконец увидела, как это выглядит вживую — пусть и на фото. Сохранила себе в избранное, буду показывать друзьям, когда будем планировать отпуск. Спасибо, что делишься!',
    createdAt: '2026-10-28T16:30:00.000Z',
    answerCount: 0,
    likeCount: 12,
    isLiked: false,
  },
  {
    id: 5,
    postId: 1,
    from: {
      id: 63,
      username: 'kate_m',
      avatars: [
        {
          url: `${S3}/c3ad45bd-bf4f-47cd-96a4-205365a52998_users/63/avatar/5945b65f-d362-444a-b26b-2a8ed3b547b8-images-45x45`,
          width: 45,
          height: 45,
          fileSize: 918,
          createdAt: '2026-06-05T08:08:18.956Z',
        },
      ],
    },
    content: 'Согласна с Анной, кадр шикарный',
    createdAt: '2026-09-15T12:00:00.000Z',
    answerCount: 0,
    likeCount: 3,
    isLiked: true,
  },
]
