import { onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getWorkspaceFolders, getWorkspaceNotifications, getWorkSpaces, verifyWorkspaceAccess } from '@/actions/workspace'
import { IconLoader3 } from '@tabler/icons-react'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React, { ReactNode, Suspense } from 'react'

type Props = {
   children: ReactNode
   params: {
    workspaceId: string
   }
}

const Layout = async ({ children, params }: Props) => {
   const auth = await onAuthenticateUser()
   if (!auth.user?.workspace && !auth.user?.workspace.length) {
      return redirect('/sign-in')
   }
   const hasAccess = await verifyWorkspaceAccess(params.workspaceId)
   if (!hasAccess.data.workspace) {
      return redirect('/sign-in')
   }

   const query = new QueryClient()
   await query.prefetchQuery({
      queryKey: ['workspace-folders'],
      queryFn: () => getWorkspaceFolders(params.workspaceId)
   })

   await query.prefetchQuery({
      queryKey: ['user-videos'],
      queryFn: () => getAllUserVideos(params.workspaceId)
   })
   

   await query.prefetchQuery({
      queryKey: ['user-workspaces'],
      queryFn: () => getWorkSpaces()
   })

   await query.prefetchQuery({
      queryKey: ['user-notifications'],
      queryFn: () => getWorkspaceNotifications(auth.user.id)
   })

  return (
    <Suspense fallback={<IconLoader3 className='animate-spin size-20 my-auto' />}>
      {children}
    </Suspense>
  )
}

export default Layout
