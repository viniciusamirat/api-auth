import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
},{ timestamps: true })

const User = mongoose.model('User', userSchema)

export default User