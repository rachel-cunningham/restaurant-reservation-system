import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import { listTables } from '../utils/api';
import "./Tables.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Tables() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    
    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);      
        listTables()
            .then((resp)=>{
                setTables(resp);
                setTablesError(null);
            })
            .catch((err)=>{
                setTables(null);
                setTablesError(err.message)
            });
      
      return () => abortController.abort();
    }
    useEffect(() => {
        loadTables();
      }, []);
  return (
    <div>
        
        {tablesError}
        <div>{Array.isArray(tables) && tables.length>0 &&
            tables.map((table) => (
                <div className='card'>
                    <div className='t-name name'>Table #{table.table_id} - {table.table_name}</div>                                            
                    <div className='name'>Seats: {table.capacity}</div>
                    <div className='name'>Currently: {table.status}</div>                    
                </div>
            ))
            
            }
        </div>
        
    </div>
  );
}