const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listByDate(date) {
  return knex("reservations").select("*").where({ reservation_date: date }).orderBy("reservation_time");
}
function listByMobileNumber(mobile_number){
  return knex("reservations").select("*").where({ mobile_number: mobile_number }).orderBy("reservation_time");
}
function reservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id: reservation_id });
}
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
function update(reservation_id,data) {
  return knex("reservations")
      .where({ reservation_id: reservation_id })
      .update(data)
      .select("*");
}
module.exports = {
  list,
  listByDate,
  create,
  update,
  reservationById,
  listByMobileNumber
};
