const { object } = require("joi")
const request = require("supertest")
const app = require("../../app")
require("dotenv").config({ path: ".env.test" })
const facade = require("../../facade/constructUnity")

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Teste Nome",
      description: "Teste Descrição",
    }

    const result = await facade.insert(object)

    expect(result).toEqual([2])
  })

  test("GET", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const result = await facade.get()
    expect(result).toHaveLength(1)
    result.forEach((obj) => {
      expect(obj).toHaveProperty("id", 1)
      expect(obj).toHaveProperty("name", "Seed Nome")
      expect(obj).toHaveProperty("description", "Seed Descrição")
      expect(obj).toHaveProperty("createdAt")
      expect(obj).toHaveProperty("updatedAt")
      expect(obj).toHaveProperty("deletedAt")
    })
  })

  test("GET BY ID", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const obj = await facade.getById(1)

    expect(obj).toHaveProperty("id", 1)
    expect(obj).toHaveProperty("name", "Seed Nome")
    expect(obj).toHaveProperty("description", "Seed Descrição")
    expect(obj).toHaveProperty("createdAt")
    expect(obj).toHaveProperty("updatedAt")
    expect(obj).toHaveProperty("deletedAt")
  })

  test("SEARCH PADRÃO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Nome",
      description: "Seed Descrição",
    }

    const params = [{ column: "id", signal: "=", value: 1 }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH AND", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Nome",
      description: "Seed Descrição",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "AND" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Nome",
      description: "Seed Descrição",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "OR" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Nome",
      description: "Seed Descrição",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "LIKE" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Nome",
      description: "Seed Descrição",
    }
    await facade.insert(object)

    const params = [
      {
        column: "id",
        signal: "=",
        value: [1, 2],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toHaveLength(2)
  })

  test("UPDATE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Teste Nome",
      description: "Teste Descrição",
    }

    await facade.update(object, 1)

    const result = await facade.getById(1)

    expect(result).toHaveProperty("id", 1)
    expect(result).toHaveProperty("name", "Teste Nome")
    expect(result).toHaveProperty("description", "Teste Descrição")
    expect(result).toHaveProperty("createdAt")
    expect(result).toHaveProperty("updatedAt")
    expect(result).toHaveProperty("deletedAt")
  })

  test("DELETE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    await facade.remove(1)

    const result2 = await facade.get()
    expect(result2).toHaveLength(0)
  })

  test("INSERT INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = { teste: "User" }
    const result = await facade.insert(object)

    expect(result).toEqual({
      errors: ['"name" is required', '"teste" is not allowed'],
    })
  })

  test("GET VAZIO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    await facade.remove(1)

    const result = await facade.get()
    expect(result).toHaveLength(0)
  })

  test("GET BY ID INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const result = await facade.getById(2)
    expect(result).toBe(undefined)
  })

  test("SEARCH PADRÃO INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH AND INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: "Aleatorio",
        operator: "LIKE",
      },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: ["Aleatorio", "Aleatorio"],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("UPDATE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      TESTE: "TESTE",
    }

    result = await facade.update(object, 1)
    console.log(result)
    expect(result).toEqual({
      errors: ['"name" is required', '"TESTE" is not allowed'],
    })
  })

  test("DELETE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    result = await facade.remove(2)

    expect(result).toBe(0)
  })
})
