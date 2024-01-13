import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

async function main() {
  try {

    mongoose.set('strictQuery', true)

    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.rxskjll.mongodb.net/?retryWrites=true&w=majority`)

  } catch (err) {
    console.log(`Error connecting to the database: ${err}`)
  }
}

export default main