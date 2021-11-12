'use strict'
module.exports = {
  submitStocks: async (stocks, date) => {
    const axios = require('axios')
    axios.post(`https://market-today.herokuapp.com/stock/${date}`, {
      data: stocks
    }).then(res => {
      console.log(res.status)
    }).catch(err => {
      console.error(err)
    })
  },

  submitFunds(funds, date) {
    const axios = require('axios')
    axios.post(`https://market-today.herokuapp.com/fund/${date}`, {
      data: funds
    }).then(res => {
      console.log(res.status)
    }).catch(err => {
      console.error(err)
    })
  }
}