import React from 'react'
import { IconLoader3 } from '@tabler/icons-react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <main className='flex h-screen w-screen items-center justify-center'>
      <IconLoader3 className='animate-spin size-6 my-auto' />
    </main>
  )
}

export default Loading
