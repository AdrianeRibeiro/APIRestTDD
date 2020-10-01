const ValidationRequiredError = require('../errors/ValidationRequiredError')
const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const find = (userId, filter = {}) => {
    return app.db('transactions')
      .join('accounts', 'accounts.id', 'acc_id')
      .where(filter)
      .andWhere('accounts.user_id', '=', userId)
      .select()
  }

  const save = (transaction) => {
    if (!transaction.description) throw new ValidationRequiredError('Descrição')
    if (!transaction.amount) throw new ValidationRequiredError('Valor')
    if (!transaction.date) throw new ValidationRequiredError('Data')
    if (!transaction.acc_id) throw new ValidationRequiredError('Conta')
    if (!transaction.type) throw new ValidationRequiredError('Tipo')

    if(!(transaction.type === 'I' || transaction.type === 'O')) throw new ValidationError('Tipo inválido')

    if((transaction.type === 'I' && transaction.amount < 0) || (transaction.type === 'O' && transaction.amount > 0)) {
      transaction.amount *= -1
    }

    return app.db('transactions')
      .insert(transaction, '*')
  }

  const findOne = (filter) => {
    return app.db('transactions')
      .where(filter)
      .first()
  }

  const update = (id, transaction) => {
    return app.db('transactions')
      .where({id})
      .update(transaction, '*')
  }

  const remove = (id) => {
    return app.db('transactions')
      .where({id})
      .del()
  }

  return { find, save, findOne, update, remove }
}