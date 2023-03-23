
import React, { useState, useEffect, useRef } from 'react';
import './AssignInstructor.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import axios from 'axios';

export default function ExpandableRowGroupsDoc() {

    const [assignedInstructors, setAssignedInstructors] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState(null);
    const [dates, setDates] = useState(null);

    const toast = useRef(null);

    useEffect(() => {
        axios.get('/instructors/assigned').then(res => setAssignedInstructors(res.data));
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
                <td colSpan="3" style={{ textAlign: 'center' }}>Total Courses: {calculateInstructorTotal(data.instructorName)}</td>
            </React.Fragment>
        );
    }

    const calculateInstructorTotal = (name) => {
        let total = 0;

        if (assignedInstructors) {
            for (let course of assignedInstructors) {
                if (course.instructorName === name) {
                    total++;
                }
            }
        }

        return total;
    }

    const leftToolbar = () => {
        return (
            <React.Fragment>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search by course/date" />
                </span>
            </React.Fragment>
        );
    }

    const rightToolbar = () => {
        return (
            <React.Fragment>
                <Button className="p-button-success p-button-rounded" label="Assign Instructor" icon="pi pi-plus" onClick={() => setVisible(true)}></Button>
            </React.Fragment>
        );
    }

    const selectedInstructorTemplate = (option, props) => {
        if (option) {
            return (
                <div>{option.firstName} {option.lastName}</div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const save = () => {
        if (!selectedInstructor || !selectedCourseName || !dates) {
            toast.current.show({ severity: 'error', summary: 'Missing Fields', detail: 'Please fill in all fields.' });
        } else {
            const body = {
                name: selectedCourseName,
                instructorName: selectedInstructor.firstName + ' ' + selectedInstructor.lastName,
                start: dates[0].toLocaleDateString(),
                end: dates[1].toLocaleDateString()
            }
            notify(body);
            setVisible(false);
            axios.post('/instructors', body).then((res) => {
                toast.current.show({ severity: (res ? 'success' : 'error'), summary: (res ? 'Success' : 'Error'), detail: (res ? 'Saved Successfully.' : 'Unable to save.') });
                if (res) { axios.get('/instructors/assigned').then(res => setAssignedInstructors(res.data)); }
            });
        }
    }

    // Add to collection for an instructor notification
    const notify = (properties) => {

        let iName = properties.instructorName;
        let nameStruct = iName.split(" ");
        const body = {
            name: properties.name,
            fName: nameStruct[0],
            lName: nameStruct[1],
            start: properties.start,
            end: properties.end
        }

        axios.post('/new-outline', body);
    }

    return (
        <div>
            <Dialog header="Assign Instructor" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Dropdown className="assign-instructor m-3" value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.value)} options={instructors} optionLabel="name"
                    valueTemplate={selectedInstructorTemplate} itemTemplate={selectedInstructorTemplate} placeholder="Select an Instructor" />
                <InputText className="assign-instructor m-3" type="text" onInput={(e) => setSelectedCourseName(e.target.value)} placeholder="Course Name" />
                <Calendar className="assign-instructor m-3" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput placeholder="Start to End" />
                <Button className="assign-instructor p-button-rounded m-3" label="Save" icon="pi pi-check" onClick={save}></Button>
            </Dialog>
            <Toast ref={toast}></Toast>
            <Toolbar className="m-3" left={leftToolbar} right={rightToolbar}></Toolbar>
            <div className="datatable-rowgroup-demo m-3">
                <DataTable value={assignedInstructors} rowGroupMode="subheader" groupRowsBy="instructorName"
                    sortMode="single" sortField="instructorName" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} globalFilter={globalFilter} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column field="name" header="Course Name"></Column>
                    <Column field="start" header="Start Date"></Column>
                    <Column field="end" header="End Date"></Column>
                </DataTable>
            </div>
        </div>
    );
}
