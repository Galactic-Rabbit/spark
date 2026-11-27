'use client'

import { DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'
import { Copy } from '@shared/ui/icons'
import { copyPostLink } from '../lib/copyPostLink'
import s from './CopyPostLinkMenuItem.module.css'

type Props = {
  postId: number
}

export const CopyPostLinkMenuItem = ({ postId }: Props) => {
  const handleCopy = async () => {
    try {
      await copyPostLink(postId)
    } catch (error) {
      console.error('Failed to copy post link', error)
    }
  }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Copy width={24} height={24} className={s.icon} />
      Copy Link
    </DropdownMenuItem>
  )
}
