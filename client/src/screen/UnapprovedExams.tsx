import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {getUnapprovedExams} from "../api";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function UnapprovedExams() {
    const navigate = useNavigate();
    const [unapprovedExams, setUnapprovedExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUnapprovedExams()
            .then((data) => {
                setUnapprovedExams(data.data.exams.unapprovedExams)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    const handleClick = (id: string, row: any) => {
        navigate(`/approve-exam/${id}`, { state: row })
    }


    return (
        <div className="p-28 px-64">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sınav Id</TableCell>
                            <TableCell align="right">Öğrenci Adı</TableCell>
                            <TableCell align="right">Aksiyonlar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unapprovedExams.map((row: any) => (
                            <TableRow
                                key={row.exam._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">{row.exam._id}</TableCell>
                                <TableCell align="right">
                                    {row.student.firstname}&nbsp;{row.student.lastname}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => handleClick(row._id, row)}
                                        size="small"
                                        sx={{ ml: 2 }}
                                    >
                                        <EditIcon/>

                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
