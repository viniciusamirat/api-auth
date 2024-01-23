import LoggerModel from '../models/loggerModel.js'

class Logger {
  constructor() {
    this.message = null
    this.level = null
  }

  async save(message, level = 'error') {
    this.message = message

    switch(level) {
      case 'error':
        this.level = level
      break;
      case 'warn':
        this.level = level
      break;
      case 'info':
        this.level = level
      break
      default:
        this.level = 'error'
      break
    }

    await this.upload()
  }

  async upload() {
    const log = {
      description: this.message,
      level: this.level
    }

    await LoggerModel.create(log)
  }
}

export default Logger