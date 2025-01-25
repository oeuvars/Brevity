"use server"

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403, user: null }
    }

    const userExist = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    })
    if (userExist) {
      return { status: 200, user: userExist }
    }

    const newUser = await prisma.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    })
    if (newUser) {
      return { status: 201, user: newUser }
    }
    return { status: 400, user: null }
  } catch (error) {
    return { status: 500, user: null }
  }
}

export const getNotifications = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404, data: [] }
    const notifications = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      }
    })
    if (notifications) {
      return { status: 200, data: notifications }
    }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, data: [] }
  }
}
