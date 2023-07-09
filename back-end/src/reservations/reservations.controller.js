const { query } = require("express");
const service = require("./reservations.service");

async function list(req, res, next) {
  const date = req.query?.date;
  let response;
  if (date) {
    response = await service.listByDate(date);
  } else {
    response = await service.list();
  }
  return res.json({ data: response });
}

module.exports = {
  list,
};
