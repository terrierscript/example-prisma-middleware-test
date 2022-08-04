
import { PrismaClient } from "@prisma/client"
import { expect, Task, test } from "vitest"
import { getTaskById } from "../task"

// test("Task test", async () => {
//   const defaultPrismaClient = new PrismaClient()
//   const task = await getTaskById(defaultPrismaClient, "a")
//   expect(task?.id).toBe("a")
// })

const mockedPrismaClient = () => {
  const prismaClient = new PrismaClient()
  prismaClient.$use(async (params, next) => {
    if (params.model === "Task") {
      return {
        id: "a",
        name: "hoge"
      } as Task
    }
    return await next(params)
  })
  return prismaClient
}

test("Task test", async () => {
  const prismaClient = mockedPrismaClient()
  const task = await getTaskById(prismaClient, "a")
  expect(task?.id).toBe("a")
})