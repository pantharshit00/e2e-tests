const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Prisma', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should return Prisma version', () => {
    const pjson = require('./package.json')
    expect(Prisma.prismaVersion.client).toBe(
      pjson.dependencies['@prisma/client'],
    )
  })

  it('should be able to query the database', async () => {
    const data = await prisma.user.findMany()
    expect(data).toMatchObject([])
  })

  it('should use the correct engine files', async () => {
    const fs = require('fs')
    const path = require('path')
    const files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))
    if (process.env.PRISMA_CLIENT_ENGINE_TYPE !== 'binary') {
      expect(files).toMatchInlineSnapshot(`
Array [
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "libquery_engine-linux-arm-openssl-1.0.x.so.node",
  "package.json",
  "schema.prisma",
]
`)
    } else {
      expect(files).toMatchInlineSnapshot(`
Array [
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-linux-arm-openssl-1.0.x",
  "schema.prisma",
]
`)
    }
  })

})
