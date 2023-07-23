const { query } = require("express");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name","mobile_number","reservation_date","reservation_time","people");
const moment = require("moment");
function reservationDateCheck(req, res, next) {
  const { data = {} } = req.body;
  const day = moment(data.reservation_date).format('dddd');
  const time = moment(data.reservation_time,'HH:mm:ss');
  const date = moment(data.reservation_date);
  date.set({
    hour:   time.get('hour'),
    minute: time.get('minute'),
    second: time.get('second')
  });
  const diff = date.diff(moment());
  const startTime = moment('10:29:59','HH:mm:ss');
  const endTime = moment('21:31:00','HH:mm:ss');
  if(diff<=0){
    return next({
      status: 400,
      message: `Reservations available only for future dates`,
    });
  }else if(day.toLowerCase() === 'Tuesday'.toLocaleLowerCase()){
    return next({
      status: 400,
      message: `No reservations available for Tuesday`,
    });
  }else if(!time.isBetween(startTime,endTime)){
    return next({
      status: 400,
      message: `Reservations available only between 10.30 am and 09.30 pm`,
    });
  }
  return next();
}
async function list(req, res, next) {
  const date = req.query?.date;
  const mobile_number = req.query?.mobile_number;
  let response;
  if (date) {
    response = await service.listByDate(date);
  } else if(mobile_number){
    response = await service.listByMobileNumber(mobile_number);
  } else {
    response = await service.list();
  }
  if(response.length===0){
    return next({
      status: 400,
      message: `No reservations found`,
    });
  }
  return res.json({ data: response });
}
async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id;
  let response;
  response = await service.reservationById(reservation_id);
  if(response.length===0){
    return next({
      status: 400,
      message: `Reservation does not exist`,
    });
  }
  return next();
}

function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

function update(req, res, next){
  service
  .update(req.params.reservation_id,req.body.data)
  .then((data)=>res.status(201).json({data}))
  .catch(next);
}

module.exports = {
  list,
  create: [hasRequiredProperties, reservationDateCheck, create],
  update:[reservationExists,update]
};
