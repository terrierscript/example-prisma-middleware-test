import { PrismaClient } from "@prisma/client"

// class pattern
export class TaskRepository {
  prisma: PrismaClient
  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }
  getTaskById = (id: string) => {
    return this.prisma.task.findUnique({ where: { id } })
  }
}

