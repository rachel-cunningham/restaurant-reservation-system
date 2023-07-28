import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Reservations from "./Reservations";
import ReservationsNav from "./ReservationsNav";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }){
  const [displayDate, setDisplayDate] = useState(date);
  const handleDate=(date)=>{
    setDisplayDate(date);
  }
  React.useEffect(()=>{
    const queryParameters = new URLSearchParams(window.location.search)
    const dateParam = queryParameters.get("date")
    if(dateParam){
      setDisplayDate(dateParam);
    }    
  },[])
  return (
    <main>  
      <h1>Reservations for {displayDate}</h1>
      <Reservations keyString='date' value={displayDate}></Reservations>
      <ReservationsNav date={displayDate} onDateChange={handleDate}></ReservationsNav>
    </main>
  );
}

export default Dashboard;
