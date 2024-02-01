import { randomUUID } from 'node:crypto'
import { DataBase } from './database.js'

const database = new DataBase()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const users = database.get('tasks')

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const user = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.set('tasks', user)

      return res.writeHead(201).end()
    }
  }
]