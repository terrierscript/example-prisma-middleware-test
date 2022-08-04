import { PrismaClient } from '@prisma/client'


export const getTaskById = (prisma: PrismaClient, id: string) => {
  return prisma.task.findUnique({ where: { id } })
}