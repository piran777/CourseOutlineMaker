
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './AssignInstructor.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import axios from 'axios';

export default function ExpandableRowGroupsDoc() {

    const [instructors, setInstructors] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        axios.get('/instructors').then(res => setInstructors(res.data));
    }, []);

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <span className="vertical-align-middle ml-2">{data.instructorName}</span>
            </React.Fragment>
        );
    }

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="4" style={{ textAlign: 'right' }}>Total Courses</td>
                <td>{calculateInstructorTotal(data.instructorName)}</td>
            </React.Fragment>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const calculateInstructorTotal = (name) => {
        let total = 0;

        if (instructors) {
            for (let course of instructors) {
                if (course.instructorName === name) {
                    total++;
                }
            }
        }

        return total;
    }

    return (
        <div className="card datatable-rowgroup-demo">
            <Toast ref={toast}></Toast>
            <DataTable value={instructors} rowGroupMode="subheader" groupRowsBy="instructorName"
                sortMode="single" sortField="instructorName" sortOrder={1} responsiveLayout="scroll"
                expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                <Column field="name" header="Course Name"></Column>
                <Column field="start" header="Start Date"></Column>
                <Column field="end" header="End Date"></Column>
            </DataTable>
        </div>
    );
}
