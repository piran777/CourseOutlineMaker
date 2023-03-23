
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './OutlineHistory.css';
import axios from 'axios';

export default function TemplateDemo() {
    const navigate = useNavigate();
    const [selectedOutline, setSelectedOutline] = useState(null);
    const [outlineNames, setOutlineNames] = useState([]);
    const [events, setEvents] = useState([
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-cog', color: '#9C27B0' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-cog', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-cog', color: '#607D8B' }
    ]);

    useEffect(() => {
        axios.get('/getPdfNames')
            .then(res => {
                let outlines = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (!outlines.includes(res.data[i])) { outlines.push(res.data[i]); }
                }
                setOutlineNames(outlines)
            })
            .catch(error => console.error(error));
    }, []);

    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    function updateOutline(outline) {
        setSelectedOutline(outline)
        // Get list of all outline activity/edits from backend
        axios.get('/outline/history?value=' + outline).then(res => {
            // Update events
            res.data.sort(function (d1, d2) { return new Date(d1.timestamp) < new Date(d2.timestamp) })
            setEvents(res.data)
        }).catch(error => console.error(error));
    }

    const openOutline = (outline) => {
        // route to displayPDF with this outline preloaded into the boxes
        navigate('/DisplayPdf?fromHistory=' + JSON.stringify(outline))
    }

    const customizedContent = (item) => {
        return (
            <Card title={item.timestamp} subTitle={item.instructor}>
                <p>{item.code}</p>
                <p>{item.course}</p>
                <p>{item.year}</p>
                <p>{item.desc}</p>
                <Button label="More Info" className="p-button-text" onClick={() => openOutline(item)}></Button>
            </Card>
        );
    };

    return (
        <div className="card">
            <div className="card flex justify-content-center m-5">
                <Dropdown value={selectedOutline} onChange={(e) => updateOutline(e.value)} options={outlineNames}
                    placeholder="Select an Outline" className="w-full md:w-14rem" />
            </div>
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>
    )
}
