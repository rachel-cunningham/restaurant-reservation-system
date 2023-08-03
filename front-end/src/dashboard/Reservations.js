import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, updateReservationStatus } from '../utils/api';
import "./ReservationsNav.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./Reservation.css"

export default function Reservations({keyString,value}) {
    const history = useHistory();
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    useEffect(loadDashboard, [keyString, value]);

    function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      const obj ={}
      obj[keyString] = value;
      if(value){
          listReservations(obj, abortController.signal)
            .then((resp)=>{
                setReservations(resp);
                setReservationsError(null);
            })
            .catch((err)=>{
                setReservations(null);
                setReservationsError(err.message)
            });
      }
      return () => abortController.abort();
    }
    const markSeated=reservation_id=>()=>{
        const abortController = new AbortController();
        updateReservationStatus(reservation_id,'seated',abortController.signal)
        .then((resp)=>{
            loadDashboard();
        })
        .catch((err)=>{
            console.log(err.message);
        })
        history.push(`/reservations/1/seat`);
    }
  return (
    <div>
        {reservationsError}
        <div>{Array.isArray(reservations) && reservations.length>0 &&
            reservations.map((reservation) => (
                <div className='main-card'>
                    <div className='card-res'>
                        <div className='info'>
                            <div className='name-wrapper'>
                                <h3 className='name'>{reservation.first_name}</h3>
                                <h3 className='name'>{reservation.last_name}</h3>
                            </div>
                            
                        </div>
                        <div className='subinfo-res'>
                            <div className='people'>Party of {reservation.people}</div>
                            <div className='desc-at'>At: {reservation.reservation_time}</div>
                        </div>
                        <div className='subinfo-res'>
                            <div className='desc-ct'>mobile: {reservation.mobile_number}</div>
                            {reservation.status?.toLowerCase()!=='seated' && <div className='people'>{reservation.status.toUpperCase()}</div>}
                        </div>    
                    </div>
                    <div className='buttons'>
                        <Stack direction="column" spacing={2} alignItems='left'>                            
                            {reservation.status?.toLowerCase()==='booked' && <Button variant="contained" onClick={markSeated(reservation.reservation_id)}>Seat</Button>}
                            {reservation.status?.toLowerCase()!=='booked' && <Button disabled>Seated</Button>}
                            <Button variant="contained">Edit</Button>
                            <Button variant="outlined">Cancel</Button>                            
                        </Stack>
                    </div>
                </div>
            ))
            
            }
        </div>
        
    </div>
  );
}