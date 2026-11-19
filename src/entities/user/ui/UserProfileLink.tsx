import React from 'react'
import Link from 'next/link'

type Props = {
  userId: number
  children: React.ReactNode
}

export const UserProfileLink = ({ userId, children }: Props) => {
  return (
    <Link href={`/profile/${userId}`} onClick={(event) => event.stopPropagation()}>
      {children}
    </Link>
  )
}
