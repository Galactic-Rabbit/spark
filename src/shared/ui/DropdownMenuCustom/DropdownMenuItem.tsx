import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './DropdownMenuItem.module.css'

export const DropdownMenuItem = (props: DropdownMenu.DropdownMenuItemProps) => (
  <DropdownMenu.Item {...props} className={s.dropdownItem} />
)
