import app from './src/app.js'

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT || 3030, () => console.log(`Server running on port ${SERVER_PORT}`))