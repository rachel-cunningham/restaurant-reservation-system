import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import { listReservations, updateReservationStatus } from '../utils/api';
import "./ReservationsNav.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Reservations({keyString,value}) {
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
    }
  return (
    <div>
        {reservationsError && reservationsError}
        <div>{Array.isArray(reservations) && reservations.length>0 &&
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">Mobile Number</TableCell>
                    <TableCell align="left">Reservation Time</TableCell>
                    <TableCell align="left">People</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {reservations.map((row) => (
                    <TableRow>
                    <TableCell align='left'>
                        {row.first_name}
                    </TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.mobile_number}</TableCell>
                    <TableCell align="left">{row.reservation_time}</TableCell>
                    <TableCell align="left">{row.people}</TableCell>
                    <TableCell align="left">                        
                            {row.status}                        
                    </TableCell>
                    <TableCell align="left">                        
                        <Stack direction="row" spacing={2} alignItems='left'>                            
                            {row.status?.toLowerCase()==='booked' && <Button variant="contained" onClick={markSeated(row.reservation_id)}>Seat</Button>}
                            {row.status?.toLowerCase()!=='booked' && <Button disabled>Seated</Button>}                            
                        </Stack>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>}
        </div>
        
    </div>
  );
}