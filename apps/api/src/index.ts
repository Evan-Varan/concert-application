import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Client } from 'pg'
import 'dotenv/config'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: true
})

const databaseUrl = process.env.DATABASE_URL
const port = Number(process.env.PORT ?? 4000)

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

app.get('/health', async () => {
  return { ok: true }
})

app.get('/health/db', async () => {
  const client = new Client({ connectionString: databaseUrl })

  try {
    await client.connect()
    const result = await client.query('SELECT NOW() AS now')
    return {
      ok: true,
      db: 'connected',
      now: result.rows[0]?.now ?? null
    }
  } catch (error) {
    app.log.error(error)
    return {
      ok: false,
      db: 'disconnected'
    }
  } finally {
    await client.end().catch(() => {})
  }
})

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()