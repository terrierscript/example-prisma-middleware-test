
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
    console.log(params)
    return {
      id: "a",
      name: "hoge"
    } as Task
  })
  return prismaClient
}
const mockedPrismaClient2 = () => {
  const prismaClient = new PrismaClient()
  prismaClient.$use(async (params, next) => {
    if (params.model === "Task") {
      return {
        id: "foo",
        name: "hoge"
      } as Task
    }
    return await next(params)
  })
  return prismaClient
}

test("Task test", async () => {

  test("Task test", async () => {
    const prismaClient = mockedPrismaClient()
    const task = await getTaskById(prismaClient, "foo")
    expect(task?.name).toBe("hoge")
  })
})