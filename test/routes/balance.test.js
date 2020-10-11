// const request = require('supertest')
// const moment = require('moment')
// const app = require('../../src/app')

// const MAIN_ROUTE = '/v1/balance'
// const ROUTE_TRANSACTION = '/v1/transactions'
// const ROUTE_TRANSFER = '/v1/transfers'

// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMTAwIiwibmFtZSI6IlVzZXIgIzMiLCJtYWlsIjoidXNlcjNAbWFpbC5jb20ifQ.sF6OX-uaBpNaUvfEbUxR3EB4uMg3Yj9ziSPjr-DPz1I'

// const TOKEN_GERAL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMTAyIiwibmFtZSI6IlVzZXIgIzUiLCJtYWlsIjoidXNlcjNAbWFpbC5jb20ifQ.RyeO6_818QU-6F7CubecpcTuy3R-syu4VvcGMppsRow'

// beforeAll(async () => {
//   await app.db.seed.run()
// })

// describe('Ao calcular o saldo do usuário', () => {
//   test('Deve retornar apenas as contas com alguma transação', () => {
//     return request(app).get(MAIN_ROUTE)
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         expect(res.status).toBe(200)
//         expect(res.body).toHaveLength(0)
//       })
//   })

//   test('Deve adicionar valores de entrada', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({description: '1', date: new Date(), amount: 100, type: 'I', acc_id: 10100, status: true})
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(1)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('100.00')
//           })
//       })
//   })

//   test('Deve subtrair valores de saída', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({description: '1', date: new Date(), amount: 200, type: 'O', acc_id: 10100, status: true})
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(1)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('-100.00')
//           })
//       })
//   })

//   test('Não deve considerar transações pendentes', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({ description: '1', date: new Date(), amount: 200, type: 'O', acc_id: 10100, status: false })
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(1)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('-100.00')
//           })
//       })
//   })

//   test('Não deve considerar saldo de contas distintas', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({ description: '1', date: new Date(), amount: 50, type: 'I', acc_id: 10101, status: true })
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(2)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('-100.00')
//             expect(res.body[0].id).toHaveLength(10101)
//             expect(res.body[0].sum).toHaveLength('50.00')
//           })
//       })
//   })

//   test('Não deve considerar contas de outros usuários', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//     .send({ description: '1', date: new Date(), amount: 200, type: 'O', acc_id: 10100, status: false })
//     .set('authorization', `bearer ${TOKEN}`)
//     .then((res) => {
//       return request(app).get(MAIN_ROUTE)
//         .set('authorization', `bearer ${TOKEN}`)
//         .then((res) => {
//           expect(res.status).toBe(200)
//           expect(res.body).toHaveLength(2)
//           expect(res.body[0].id).toHaveLength(10100)
//           expect(res.body[0].sum).toHaveLength('-100.00')
//           expect(res.body[0].id).toHaveLength(10101)
//           expect(res.body[0].sum).toHaveLength('50.00')
//         })
//     })
//   })

//   test('Não deve considerar transação passada', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({ description: '1', date: moment().subtract({ days: 5 }), amount: 250, type: 'I', acc_id: 10100, status: true })
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(2)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('150.00')
//             expect(res.body[0].id).toHaveLength(10101)
//             expect(res.body[0].sum).toHaveLength('50.00')
//           })
//       })
//   })

//   test('Não deve considerar transação futura', () => {
//     return request(app).post(ROUTE_TRANSACTION)
//       .send({ description: '1', date: moment().add({ days: 5 }), amount: 250, type: 'I', acc_id: 10100, status: true })
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(2)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('150.00')
//             expect(res.body[0].id).toHaveLength(10101)
//             expect(res.body[0].sum).toHaveLength('50.00')
//           })
//       })
//   })

//   test('Deve considerar transferências', () => {
//     return request(app).post(ROUTE_TRANSFER)
//       .send({ description: '1', date: new Date(), amount: 250, acc_ori_id: 10100, acc_dest_id: 10101 })
//       .set('authorization', `bearer ${TOKEN}`)
//       .then((res) => {
//         return request(app).get(MAIN_ROUTE)
//           .set('authorization', `bearer ${TOKEN}`)
//           .then((res) => {
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveLength(2)
//             expect(res.body[0].id).toHaveLength(10100)
//             expect(res.body[0].sum).toHaveLength('-100.00')
//             expect(res.body[0].id).toHaveLength(10101)
//             expect(res.body[0].sum).toHaveLength('250.00')
//           })
//       })
//   })

//   test('Deve calcular saldo das contas do usuário', () => {
//     return request(app).get(MAIN_ROUTE)
//       .set('authorization', `bearer ${TOKEN_GERAL}`)
//       .then((res) => {
//         expect(res.status).toBe(200)
//         expect(res.body).toHaveLength(2)
//         expect(res.body[0].id).toHaveLength(10104)
//         expect(res.body[0].sum).toHaveLength('162.00')
//         expect(res.body[1].id).toHaveLength(10105)
//         expect(res.body[1].sum).toHaveLength('-248.00')
//       })
//   })
// })