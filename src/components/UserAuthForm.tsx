"use client"

import React, { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { Icons } from './Icons';
import { signIn } from "next-auth/react"
import { useToast } from '../hooks/use-toast';
import { Toast } from './ui/Toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const loginWithGoogle = async () => {

        setIsLoading(true)

        try {
            // throw new Error("something happened man!!")
            await signIn('google')
            // throw ("")
        } catch (error) {
            Toast({
                title: 'Error happened man!',
                variant: 'destructive'
            })

        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                isLoading={isLoading}
                type='button'
                size='sm'
                className='w-full'
                onClick={loginWithGoogle}
                disabled={isLoading}>
                {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
                Google
            </Button>
        </div >
    )
}

export default UserAuthForm