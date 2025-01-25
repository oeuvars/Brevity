import { getNotifications, onAuthenticateUser } from "@/actions/user"
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyWorkspaceAccess } from "@/actions/workspace"
import Sidebar from "@/components/global/sidebar"
import { IconLoader3 } from "@tabler/icons-react"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { type ReactNode, Suspense } from "react"

type Props = {
  children: ReactNode
  params: Promise<{ workspaceId: string }>
}

const Layout = async ({ children, params }: Props) => {
  const { workspaceId } = await params
  const auth = await onAuthenticateUser()

  if (!auth.user?.workspace || auth.user.workspace.length === 0) {
    return redirect("/sign-in")
  }
  const hasAccess = await verifyWorkspaceAccess(workspaceId)
  if (!hasAccess.data.workspace) {
    return redirect("/sign-in")
  }

  const query = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: async () => getWorkspaceFolders(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  })

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <Suspense fallback={<IconLoader3 className="size-20 my-auto" />}>
        <main className="flex h-screen w-screen">
          <Sidebar activeWorkspaceId={workspaceId} />
          {children}
        </main>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Layout

