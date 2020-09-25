module.exports = function RecursoIndevidoError(message = 'Este recurso não pertence ao usuário informado') {
  this.name = 'RecursoIndevidoError'
  this.message = message
}