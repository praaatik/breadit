"use client"

import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { User } from 'next-auth'
import React, { FC } from 'react'
import UserAvatar from './UserAvatar'

interface UserAccountNavProps {
    user: Pick<User, 'email' | 'image' | 'name'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={{ name: user.name || null, image: user.image || null }} />
            </DropdownMenuTrigger>
        </DropdownMenu>

    )
}

export default UserAccountNav   