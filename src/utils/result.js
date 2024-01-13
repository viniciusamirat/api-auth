export default class Result {
  constructor(status = null, message = null, content = null) {
    this.status = status
    this.message = message
    this.content = content
  }

  setSuccess(content = null) {
    this.status = 'success'
    this.message = null
    this.content = content
  }

  setWarn(message = null) {
    this.status = 'warn'
    this.message = message
    this.content = null
  }

  setError(message = null) {
    this.status = 'error'
    this.message = null
    this.content = null
  }

  get() {
    return this
  }
}