const { query } = require("express");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const moment = require("moment");

function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}
async function list(req, res, next) {
    const response = await service.list();    
    return res.json({ data: response });
}
async function validateTableReservation(req, res, next) {
    const ppl = await service.getPeople(req.body.data.reservation_id);
    const capacity = await service.getCapacity(req.params.table_id);
    const isOccupied = await service.isOccupied(req.params.table_id);
    if(ppl['people']>capacity['capacity']){
        return next({
            status: 400,
            message: `Insufficient number of seats`,
          });
    }else if(isOccupied.status){
        return next({
            status: 400,
            message: `Table is occupied`,
          });
    }
    next();
}
async function isNotOccupied(req, res, next) {
    const isOccupied = await service.isOccupied(req.params.table_id);
    if(!isOccupied.status){
        return next({
            status: 400,
            message: `Table is not occupied`,
          });
    }
    next();
}
async function reserveTable(req, res, next) {
    const response = await service.update(req.body.data.reservation_id,req.params.table_id);    
    return res.json({ data: response });
}
async function freeTable(req, res, next) {
    const response = await service.remove(req.params.table_id);    
    return res.json({ data: response });
}
module.exports = {
  create: [hasRequiredProperties, create],
  list,
  reserveTable: [validateTableReservation,reserveTable],
  remove:[isNotOccupied,freeTable]
};
