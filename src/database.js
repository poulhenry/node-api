import fs from 'node:fs/promises'

const databasePath = new URL('../database.json', import.meta.url)

export class DataBase {
  #database = {}

  constructor () {
    fs.readFile(databasePath)
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#saveDatabase()
      })
  }

  #saveDatabase() {
    return fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  set (key, value) {
    if (Array.isArray(this.#database[key])) {
      this.#database[key].push(value)
    } else {
      this.#database[key] = [value]
    }

    this.#saveDatabase()

    return this
  }

  get (key) {
    return this.#database ?? []
  }
}
