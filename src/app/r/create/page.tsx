"use client"

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { CreateSubredditPayload } from '@/lib/validators/subreddit';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { toast } from "@/hooks/use-toast"

function page() {

  const [input, inputSet] = useState('');
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {

      const payload: CreateSubredditPayload = {
        name: input
      }
      const response = await fetch("/api/subreddit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        if (response.status === 401) {
          return loginToast()
        }
        if (response.status === 422) {
          return toast({
            title: 'Invalid subreddit name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive',
          })
        }
        if (response.status === 409) {
          return toast({
            title: 'Subreddit already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive',
          })
        }
        toast({
          title: "There was an error.",
          description: "Could not create a subreddit.",
          variant: "destructive",
        })
      } else {
        router.push(`/r/${input}`);
        toast({
          title: "Success",
          description: "Subreddit created successfully.",
          variant: "default",
        })
      }
    },
  })

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
              r/
            </p>
            <Input
              value={input}
              placeholder='Enter community name'
              onChange={(e) => inputSet(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            disabled={isLoading}
            variant='subtle'
            onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}>
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
