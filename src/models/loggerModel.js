import mongoose from 'mongoose'

const { Schema } = mongoose

const loggerSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  }
}, {timestamps: true})

const Logger = mongoose.model('Logger', loggerSchema)

export default Logger