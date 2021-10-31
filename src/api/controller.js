'use strict'
module.exports = {
  welcome: (req, res) => {
    return res.json({ message: "Application already"})
  },

  fetchStock(req, res) {
    return res.json({ message: `Fetch price of ${req.params.code}`});
  }
}