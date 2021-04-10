import React from 'react'
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { useHotkeys } from 'react-hotkeys-hook';
const _filefy = require("filefy");

const headCells = [
    { field: 'empName', id: 'empName', numeric: false, disablePadding: true, title: 'Fullname' },
    { field: 'empAdd', id: 'empAdd', numeric: true, disablePadding: false, title: 'Address' },
    { field: 'mutualStatus', id: 'mutualStatus', numeric: true, disablePadding: false, title: 'Mutual Status' },
    { field: 'empPhone', id: 'empPhone', numeric: true, disablePadding: false, title: 'Contact' },
    { field: 'empEmail', id: 'empEmail', numeric: true, disablePadding: false, title: 'Email' },
    { field: 'jobTitle', id: 'jobTitle', numeric: true, disablePadding: false, title: 'Job Title' },
];

function createData(empName, empAdd, mutualStatus, empPhone, empEmail, jobTitle) {
    return { empName, empAdd, mutualStatus, empPhone, empEmail, jobTitle };
}

const rows = [
    createData("منيب احمد جسن الشريف", "الكلاكلة القبة", "مطلق", "111067996", "alsalha@yahoo.com", "مهندس شبكات"),
    createData("siddig hamoda", "omdurman almansura", "اعزب", "920035753", "noory4433@gmail.com", "مهندس شبكات"),
    createData("siddig abdallh", "omdurman almansura", "منفصل", "920035753", "noory4433@gmail.com", "مهندس شبكات"),
    createData("محمد عمر", "امدرمان", "متزوج", "906257778", "gmail@mn.com", "مهندس شبكات"),
    createData("عبد الصمد", "بحري", "متزوج", "111067996", "NJGT@GAMIL.COM", "مهندس شبكات"),
    createData("محمد  علي", "الخرطوم", "متزوج", "111067996", "om@gmail.com", "مهندس شبكات"),
    createData("abdallh hamoda", "omdurman almansura", "مطلق", "111067996", "noory4433@gmail.com", "تقنية المعلومات"),
    createData("محمد عمر", "امدرمان", "اعزب", "920035753", "noory4433@gmail.com", "تقنية المعلومات"),
    createData("عبد الصمد", "بحري", "منفصل", "920035753", "gmail@mn.com", "تقنية المعلومات"),
    createData("محمد  علي", "الخرطوم", "متزوج", "906257778", "NJGT@GAMIL.COM", "تقنية المعلومات"),
];

const useStyles = makeStyles(() => ({
    root: {
        marginRight: 20,
        marginLeft: 20
    },
    paper: {
        width: '90%',
        padding: 10,
    }
}));

export default function RenderTable() {
    const classes = useStyles();
    useHotkeys('ctrl+e', () => exportCsv(headCells,rows));

    const exportCsv = (allColumns, allData) => {
        const columns = allColumns.filter(columnDef => columnDef["export"] !== false);
        const exportedData = allData.map(rowData => columns.map(columnDef => rowData[columnDef.field]));
        new _filefy.CsvBuilder('filename_' + moment().format('YYYY-MM-DDTHHmmss'))
            .setDelimeter(';')
            .setColumns(columns.map(columnDef => columnDef.title))
            .addRows(exportedData)
            .exportFile();
    }

    return (
        <div className={classes.root} >
            <MaterialTable
                options={{
                    exportButton: {
                        csv: true,
                        pdf: false
                    }, exportCsv,
                }}
                title="Employees data"
                columns={headCells}
                data={rows}
            />
        </div>
    )
}
