module.exports = function ValidationRequiredError(field) {
  this.name = 'ValidationRequiredError'
  this.message = `${field} é um atributo obrigatório`
}