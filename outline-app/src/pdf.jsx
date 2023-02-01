import React, { useState } from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import axios from 'axios';
import {saveAs} from 'file-saver';
const CourseOutline = () => {
  const [outline, setOutline] = useState([
    { title: 'Description:', items: ['Description:', 'Learning objectives', 'Course structure and format'] },
    { title: 'Instructor:', items: ['Basic concepts and terminology', 'Key principles and techniques', 'Hands-on exercises and projects'] },
    { title: 'Advanced Calender Copy:', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Contact Hours:', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Antirequiresite:', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Prerequisites:', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Co-requisite: ', items: ['Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'CEAB Academic Units:', items: ['Engineering Science X%, Engineering Design Y%.', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Required Textbook:', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Other Required References: ', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Recommended References: ', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'General Learning Objectives (CEAB Graduate Attributes)', items: ['Knowledge Base: X' ,"Problem Analysis: X","Investigation: X","Design: X","Use of Engineering Tools: X","Individual and Team Work: X","Communication Skills: X","Professionalism: X","Impact on Society and the Envoironment: X","Ethics and Equity: X","Economic and Porject Management: X","Life-Long Learning: X", "Notation: where x be I: Introductory, D: Intermediate, A: Advanced, or empty. I – The instructor will introduce the topic at the level required.  It is not necessary for the student to have seen the material before. D – There may be a reminder or review, but the student is expected to have seen and been tested on the material before taking the course. A – It is expected that the student can apply the knowledge without prompting (e.g. no review)." ] },
    
    { title: 'Advanced Calender Copy', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Advanced Calender Copy', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Advanced Calender Copy', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
    { title: 'Advanced Calender Copy', items: ['In-depth analysis and discussion', 'Case studies and real-world examples', 'Opportunities for further exploration'] },
  ]);
  const [data, setData] = useState({});
  const handleAddSection = () => {
    setOutline([...outline, { title: '', items: [] }]);
  };

  const handleChangeSectionTitle = (index, title) => {
    const updatedOutline = [...outline];
    updatedOutline[index].title = title;
    setOutline(updatedOutline);
  };

  const handleAddItem = (sectionIndex) => {
    const updatedOutline = [...outline];
    updatedOutline[sectionIndex].items.push('');
    setOutline(updatedOutline);
  };

  const handleChangeItem = (sectionIndex, itemIndex, item) => {
    const updatedOutline = [...outline];
    updatedOutline[sectionIndex].items[itemIndex] = item;
    setOutline(updatedOutline);
  };

  const handleChange = ({currentTarget: input}) => {
    setData({...data,[input.name]: input.value });
};
  return (
    <Document>
        <Page size = "A4">
        
        <div class="container">
       <div class="header">
         <h1>Western University</h1>
         <h2>Faculty of Engineering</h2>
         <h3>Department of Electrical and Computer Engineering</h3>
         <form className = "titleInputs">
         <h1>ECE {<input
            type="text"
             onChange={handleChange}
            placeholder="XXXXA/B"
          />}:<input
          type="text"
          onChange={handleChange}
          placeholder="Course Title"
        /> </h1>
         <h2>Course Outline<input
          type="text"
          onChange={handleChange}
          placeholder="20YY-YY"
        /> </h2>
        </form>
       
       </div>
       <div className = "textArea">
       <h4>Description: </h4>
       <p>
       {<textarea className = "desc"
            type="text"
             onChange={handleChange}
            placeholder=""
          />}
       </p>
         <h4>Instructor: </h4>
         <p>
         {<textarea className = "desc"
            type="text"
             onChange={handleChange}
            placeholder="
            Dr. Name, P.Eng.
            TEB XXX, 519-661-2111 ext. XXXXX, UWO e-mail address as hyperlink
            Consultation hours: 
    "
          />}
         </p>
         <h4>Academic Calendar Copy: </h4>
         <p>
         {<textarea className = "desc"
            type="text"
             onChange={handleChange}
            placeholder="
           
    "
          />}
         </p>
         <h4>Contact Hours:
          {<input className='shortText'
          type="text"
          onChange={handleChange}
          placeholder="X"
        />} lecture hours, <input className='shortText'
        type="number"
        onChange={handleChange}
        placeholder="Y"
      /> laboratory hours, <input className='shortText'
      type="number"
      onChange={handleChange}
      placeholder="Z"
    /> tutorial hours, 0.5 course 
    </h4>
    <h4>
    Antirequisites: <input
          type="text"
          onChange={handleChange}
          placeholder="ECE2238B"
        />
    </h4>
    <h4>
    Prerequisites: <input
          type="text"
          onChange={handleChange}
          placeholder="ECE2238B"
        />


    </h4>
    <h4>
    Co-erequisites: <input
          type="text"
          onChange={handleChange}
          placeholder="ECE2238B"
          
        />
      
    </h4>
    <h5>  Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</h5>
    <h4>CEAB Academic Units: Engineering Science {<input className='shortText'
          type="number"
          onChange={handleChange}
          placeholder="X%"
        />} Engineering Design {<input className='shortText'
        type="number"
        onChange={handleChange}
        placeholder="Y%"
      />}
           </h4>
        </div>
      {/* {outline.map((section, sectionIndex) => (
        <div className="course-outline-section" key={sectionIndex}>
          <input
            type="text"
            value={section.title}
            onChange={(event) => handleChangeSectionTitle(sectionIndex, event.target.value)}
            placeholder="Enter section title"
          />
          
          
          <button onClick={() => handleAddItem(sectionIndex)}>Add Item</button>
          <div className="course-outline-section-content">
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <input
                    type="text"
                    value={item}
                    onChange={(event) => handleChangeItem(sectionIndex, itemIndex, event.target.value)}
                    placeholder="Enter item"
                  />
                  
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        
      {/* ))} */}
      <button onClick={handleAddSection}>Add Section</button>
    </div>
    </Page>
    </Document>
  );
};

export default CourseOutline;