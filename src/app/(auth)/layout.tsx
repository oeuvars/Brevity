import React, { ReactNode } from 'react'

type Props = {
   children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className='container mx-auto h-screen flex items-center justify-center'>
      {children}
    </main>
  )
}

export default Layout
