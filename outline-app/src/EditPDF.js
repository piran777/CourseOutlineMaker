import React, { useState, useEffect, setState } from 'react';
import axios from 'axios';
const EditPDF = () => {
    const[fieldData, setFieldData] = useState({
        code: '',
        course: '',
        year: '',
        desc: '',
        instructor: '',
        calendar: '',
        contact: '',
        hours: 0,
        labhours: 0,
        anti: "",
        pre: "",
        co: "",
        CEAB: 0,
        nameDes: 0,
        reqText: "",
        reqRef: "",
        recRef: "",
        knowledge: "",
        engTools: "",
        impact: "",
        probAnaly: "",
        teamWork: "",
        ethics: "",
        investigation: "",
        comSkills: "",
        economics: "",
        design: "",
        professional: "",
        learning: "",
        topic1: "",
        a: "",
        b: "",
        topic2: "",
        a2: "",
        b2: "",
        topic3: "",
        a3: "",
        b3: "",
        hwAssign: 0,
        quizzes: 0,
        lab: 0,
        midterm: 0,
        hwAssign2: "",
        quizzes2: "",
        labora2: "",
        midterm2: "",
        submission: "",
        locker: 0,
        devices: "",
        clickers: "",
        outlineName: "",
    });

    const [outlineData, setOutlineData] = useState([]);
    const [pdfName, setPdfName] = useState('');

    const handleChange = (event) => {
        const { target: { value, name } } = event;
        setFieldData({ ...fieldData, [name]: value });
      };
    

    useEffect(() => {
        if (pdfName) {
            fetch(`/getOutline/${pdfName}`)
                .then(response => response.json())
                .then(data => setOutlineData(data));
        }
    }, [pdfName]);


    const handleSubmit = event => {
        event.preventDefault();
        setPdfName(event.target.elements.value.value);
    };

    const updatePDF = () => {
        axios.post(`/updatePDF/${pdfName}`, fieldData)
        .then(response => {
            console.log(response.json());
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="value" />
                <button type="submit">Submit</button>
            </form>
            {outlineData.map(data => (
                <div key={data.value}>
                    <div class="header">
                        <h1>Western University</h1>
                        <h2>Faculty of Engineering</h2>
                        <h3>Department of Electrical and Computer Engineering</h3>
                        <form className="titleInputs">
                            <h1>ECE {<input
                                type="text"
                                name="code"
                                defaultValue={data.code}
                                onChange={handleChange}
                                placeholder="XXXXA/B"
                            />}:<input
                                    type="text"
                                    name="course"
                                    onChange={handleChange}
                                    placeholder="Course Title"
                                /> </h1>
                            <h2>Course Outline<input
                                type="text"
                                name="year"
                                onChange={handleChange}
                                placeholder="20YY-YY"
                            /> </h2>

                        </form>

                    </div>













                    <button onClick={updatePDF}>Update PDF</button>
                </div>
            ))}

        </div>
    );
};

export default EditPDF;