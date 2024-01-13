import app from './src/app.js'
// import dotenv from 'dotenv'
// console.log(dotenv.config())

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT || 3030, () => console.log(`Server running on port ${SERVER_PORT}`))