const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const secret = 'Segredo!'

const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user.findOne({ mail: req.body.mail })
      .then((user) => {
        if(!user) {
          throw ValidationError('Usuário ou senha inválido')
        } else if(bcrypt.compareSync(req.body.passwd, user.passwd)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          }
          const token = jwt.encode(payload, secret)
          res.status(200).json({token})
        } else {
          throw new ValidationError('Usuário ou senha inválido')
        }
      }).catch(err => next(err))
  }

  return { signin }
}