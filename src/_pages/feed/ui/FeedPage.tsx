'use client'

import { Post, useGetAllPosts } from '@entities/post'
import { PostCardFeed } from '@entities/post/ui/PostCardFeed'
import { DropdownMenuCustom, DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'
import { MoreHorizontal } from '@shared/ui/icons'
import { CommentList } from '@widgets/comment-list'
import { PostActions } from '@widgets/post-actions'

//временное решение, исключительно для того что бы посмотреть на карточку поста
//в дальнейшем, надо будет обдумать рефакторинг виджета post-list.
// На первый взгляд, логика загрузки постов на майнпейдж, профайл и ленте новостей одна.
//но подумать надо хорошо

export const FeedPage = () => {
  const { data: posts } = useGetAllPosts()

  console.log(posts?.pages[1])
  return (
    <ul>
      {posts?.pages[1].items.map((item: Post) => (
        <PostCardFeed
          key={item.id}
          post={item}
          postMenu={
            <DropdownMenuCustom
              ariaLabel="Open menu"
              trigger={<MoreHorizontal width={24} height={24} />}
            >
              <DropdownMenuItem onSelect={() => console.log('follow')}>Follow</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log('copy link')}>
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuCustom>
          }
          comments={<CommentList />}
          postActions={<PostActions isLiked={item.isLiked} postId={item.id} variant="all" />}
        />
      ))}
    </ul>
  )
}
