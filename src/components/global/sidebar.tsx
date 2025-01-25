"use client"

import Image from "next/image"
import React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useQueryData } from "@/hooks/use-query-data"
import { getWorkSpaces } from "@/actions/workspace"
import type { WorkspaceResponse } from "@/app/types"

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter()

  const onChangeWorkSpace = (workspaceId: string) => {
    router.push(`/dashboard/${workspaceId}`)
  }

  const { data, isFetched } = useQueryData(["workspaces"], getWorkSpaces)

  const workspace = data as WorkspaceResponse | undefined

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src={"/brevity.svg"} width={40} height={40} alt={"brevity"} />
        <p className="text-2xl font-semibold">Brevity</p>
      </div>
      <Select defaultValue={activeWorkspaceId} onValueChange={onChangeWorkSpace}>
        <SelectTrigger className="mt-20 text-neutral-200 bg-zinc-800/70 border-none">
          <SelectValue placeholder="select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-zinc-800/70 border-none text-neutral-200 backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {!isFetched && <SelectItem value="loading">Loading...</SelectItem>}
            {isFetched && workspace?.data?.workspace?.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id} className="hover:bg-zinc-800 cursor-pointer">
                {workspace.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Sidebar

