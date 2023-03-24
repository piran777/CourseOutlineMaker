import React, { Component, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
//import {useForm} from 'react-hook-form'


class App extends Component {
 constructor(string = ""){
  super(string);
    this.state = {

        code: '',
        course: '',
        year: '',
        desc: '',
        instructor: '',
        calendar: '',
        contact:'',
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
        outlineName:"",
        JustifyChange: "",
        email:""
        
      
    }
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })
  handleChange2 = (e) =>{
    this.setState({value: e.target.value})
  }

  createAndDownloadPdf = () => {
    axios.get(`http://localhost:4200/outlineLoader/${this.state.value}`).then(res=>{
        if(res.status===200){
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        
          saveAs(pdfBlob, `${this.state.value}.pdf`);
        
        
        })}
        else{
          alert("cant download")}
        
        
        
      }) .catch((error) => {
        console.log(error);
        alert("cant download")

      });
  }

  callPdfBackend = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))}
  

  
   handleSubmit = (event) => {
    event.preventDefault();
    
    axios.get(`http://localhost:4200/outlineLoader/${this.state.value}`).then(response => {
      let i =0;
      
      const data = response.data[response.data.length-1];
      if(response.status !== 200){
        alert("Not an approved outline. You can't turn this outline into a PDF")
        
      } else{
      this.setState({
        code: data.code,
        course: data.course,
        year: data.year,
        desc: data.desc,
        instructor: data.instructor,
        calendar: data.calendar,
        contact: data.contact,
        hours: data.hours,
        labhours: data.labhours,
        anti: data.anti,
        pre: data.pre,
        co: data.co,
        CEAB: data.CEAB,
        nameDes: data.nameDes,
        reqText: data.reqText,
        reqRef: data.reqRef,
        recRef: data.recRef,
        knowledge: data.knowledge,
        engTools: data.engTools,
        impact: data.impact,
        probAnaly: data.probAnaly,
        teamWork: data.teamWork,
        ethics: data.ethics,
        investigation: data.investigation,
        comSkills: data.comSkills,
        economics: data.economics,
        design: data.design,
        professional: data.professional,
        learning: data.learning,
        topic1: data.topic1,
        a: data.a,
        b: data.b,
        topic2: data.topic2,
        a2: data.a2,
        b2: data.b2,
        topic3: data.topic3,
        a3: data.a3,
        b3: data.b3,
        hwAssign: data.hwAssign,
        quizzes: data.quizzes,
        lab: data.lab,
        midterm: data.midterm,
        hwAssign2: data.hwAssign2,
        quizzes2: data.quizzes2,
        labora2: data.labora2,
        midterm2: data.midterm2,
        submission: data.submission,
        locker: data.locker,
        devices: data.devices,
        clickers: data.clickers,
        outlineName: data.outlineName,
        JustifyChange: data.JustifyChange,
        email: data.email


        
      });}

    })
       
      
      .catch((error) => {
        console.log(error);
        alert("Not an approved outline. You can't turn this outline into a PDF")

      });
      
  };
  
  handleChangeNew = (e) =>{
    this.setState({value: e.target.value})
  }
  render() {
    return (
      
      <div className="App">
         
        <div class="container">
       <div class="header">
         <h1>Western University</h1>
         <h2>Faculty of Engineering</h2>
         <h3>Department of Electrical and Computer Engineering</h3>
         
         <h1>ECE {<input
            type="text"
            name = "code"
              value={this.state.code}
             onChange={(e) => this.setState({ code: e.target.value })}
            placeholder="XXXXA/B"
          />}:<input
          type="text"
          name = "course"
          value={this.state.course}
          onChange={(e) => this.setState({ course: e.target.value })}
          placeholder="Course Title"
        /> </h1>
         <h2>Course Outline<input
          type="text"
          value={this.state.year}
             onChange={(e) => this.setState({ year: e.target.value })}
          placeholder="20YY-YY"
        /> </h2>
       
        
       
       </div>
       <div className = "textArea">
       <h4>Description: </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name ="desc"
            value={this.state.desc}
            onChange={(e) => this.setState({ desc: e.target.value })}
            placeholder=""
          />}
       </p>
         <h4>Instructor: </h4>
         <p>
         {<textarea className = "desc"
            type="text"
            name ="instructor"
            value={this.state.instructor}
             onChange={(e) => this.setState({ instructor: e.target.value })}
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
            name="calendar"
            value={this.state.calendar}
            onChange={(e) => this.setState({ calendar: e.target.value })}
            placeholder="
           
    "
          />}
         </p>
         <h4>Contact Hours:
          {<input className='shortText'
          type="text"
          name="contact"
          value={this.state.contact}
          onChange={(e) => this.setState({ contact: e.target.value })}
          placeholder="X"
        />} lecture hours, <input className='shortText'
        type="number"
        name="hours"
        value={this.state.hours}
        onChange={(e) => this.setState({ hours: e.target.value })}
        placeholder="Y"
      /> laboratory hours, <input className='shortText'
      type="number"
      name="labhours"
      value={this.state.labhours}
      onChange={(e) => this.setState({ labhours: e.target.value })}
      placeholder="Z"
    /> tutorial hours, 0.5 course 
    </h4>
    <h4>
    Antirequisites: <input
          type="text"
          name="anti"
          value={this.state.anti}
            onChange={(e) => this.setState({ anti: e.target.value })}
          placeholder="ECE2238B"
        />
    </h4>
    <h4>
    Prerequisites: <input
          type="text"
          name="pre"
          value={this.state.pre}
            onChange={(e) => this.setState({ pre: e.target.value })}
          placeholder="ECE2238B"
        />


    </h4>
    <h4>
    Co-erequisites: <input
          type="text"
          name= "co"
          value={this.state.co}
          onChange={(e) => this.setState({ co: e.target.value })}
          placeholder="ECE2238B"
          
        />
      
    </h4>
    <h5>  Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</h5>
    <h4>CEAB Academic Units: Engineering Science {<input className='shortText'
          type="number"
          name="CEAB"
          value={this.state.CEAB}
          onChange={(e) => this.setState({ CEAB: e.target.value })}
          placeholder="X%"
        />} Engineering Design {<input className='shortText'
        type="number"
        name="nameDes"
        value={this.state.nameDes}
            onChange={(e) => this.setState({ nameDes: e.target.value })}
        placeholder="Y%"
      />}
           </h4>
           
           <h4>Required Textbooks:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="reqText"
            value={this.state.reqText}
            onChange={(e) => this.setState({ reqText: e.target.value })}
            placeholder=""
          />}
          </p>
          <h4>Other Required References:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="reqRef"
            value={this.state.reqRef}
            onChange={(e) => this.setState({ reqRef: e.target.value })}
            placeholder=""
          />}
          </p>
          <h4>Reccomended References:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="recRef"
            value={this.state.recRef}
            onChange={(e) => this.setState({ recRef: e.target.value })}
            placeholder=""
          />}
          </p>
          <h4>General Learning Objectives (CEAB Graduate Attributes):  </h4>
          <table>
  <tr>
    <td>Knowledge Base</td>
    <td>
      <select name="knowledge"
                value={this.state.knowledge} 
                onChange={(e) => this.setState({knowledge: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Use of Engineering Tools</td>
    <td>
      <select name="engTools"
                value={this.state.engTools} 
                onChange={(e) => this.setState({engTools: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Impact on Society and the Environment</td>
    <td>
      <select name="impact"
                value={this.state.impact} 
                onChange={(e) => this.setState({impact: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
  </tr>
  <tr>
    <td>Problem Analysis</td>
    <td><select name="probAnaly"
                value={this.state.probAnaly} 
                onChange={(e) => this.setState({probAnaly: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Individual and Team Work</td>
    <td>
      <select name="teamWork"
                value={this.state.teamWork} 
                onChange={(e) => this.setState({teamWork: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Ethics and Equity</td>
    <td>
      <select name="ethics"
                value={this.state.ethics} 
                onChange={(e) => this.setState({ethics: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
  </tr>
  <tr>
    <td>Investigation</td>
    <td>
      <select name="investigation"
                value={this.state.investigation} 
                onChange={(e) => this.setState({investigation: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Communication Skills</td>
    <td>
      <select name="comSkills"
                value={this.state.comSkills} 
                onChange={(e) => this.setState({comSkills: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Economics and Project Management</td>
    <td>
      <select name="economics"
                value={this.state.economics} 
                onChange={(e) => this.setState({economics: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
  </tr>
  <tr>
    <td>Design</td>
    <td>
      <select name="design"
                value={this.state.design} 
                onChange={(e) => this.setState({design: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Professionalism</td>
    <td>
      <select name="professional"
                value={this.state.professional} 
                onChange={(e) => this.setState({professional: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
    <td>Life-Long Learning</td>
    <td>
      <select name="learning"
                value={this.state.learning} 
                onChange={(e) => this.setState({learning: e.target.value})}
                placeholder="x">
            <option>N/A</option>
            <option>I</option>
            <option>D</option>
            <option>A</option>
        </select></td>
  </tr>
</table>
<h5> Notation: where x be I: Introductory, D: Intermediate, A: Advanced, or empty. I – The instructor will introduce the topic at the level required.  It is not necessary for the student to have seen the material before. D – There may be a reminder or review, but the student is expected to have seen and been tested on the material before taking the course. A – It is expected that the student can apply the knowledge without prompting (e.g. no review).</h5>
              
       <table>
  <tr>
    <th>Course Topics and Specific Learning Outcomes</th>
    <th>CEAB Graduate Attributes Indicators</th>
  </tr>
  <tr>
    <td>Topic 1</td>
    <td className = "attributes" ><input className='desc2'
        type="text"
        name="topic1"
        value={this.state.topic1}
        onChange={(e) => this.setState({ topic1: e.target.value })}
        placeholder=""
      />  </td>
  </tr>
  <tr>
    <td>At the end of this section, students will be able to:</td>
    
    
  </tr>
  <tr>
    <td>a. <textarea className = "desc"
            type="text"
            name="a"
            value={this.state.a}
            onChange={(e) => this.setState({ a: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b.<textarea className = "desc"
            type="text"
            name="b"
            value={this.state.b}
            onChange={(e) => this.setState({ b: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
   <tr>
    <td>Topic 2</td>
    <td className = "attributes"><input className='desc2'
        type="text"
        name="topic2"
        value={this.state.topic2}
        onChange={(e) => this.setState({ topic2: e.target.value })}
        placeholder=""
      /> </td>
  </tr>
  <tr>
    <td>At the end of this section, students will be able to:</td>
    
  </tr>
  <tr>
    <td>a. <textarea className = "desc"
            type="text"
            name="a2"
            value={this.state.a2}
            onChange={(e) => this.setState({ a2: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b. <textarea className = "desc"
            type="text"
            name="b2"
            value={this.state.b2}
            onChange={(e) => this.setState({ b2: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>Topic 3</td>
    <td className = "attributes"><input className='desc2'
        type="text"
        name="topic3"
        value={this.state.topic3}
        onChange={(e) => this.setState({ topic3: e.target.value })}
        placeholder=""
      /> </td>
  </tr>
  <tr>
    <td>At the end of this section, students will be able to:</td>
  
  </tr>
  <tr>
    <td>a. <textarea className = "desc"
            type="text"
            name="a3"
            value={this.state.a3}
            onChange={(e) => this.setState({ a3: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b. <textarea className = "desc"
            type="text"
            name="b3"
            value={this.state.b3}
            onChange={(e) => this.setState({ b3: e.target.value })}
            placeholder=""
          /></td>
    
  </tr>
</table>
<h4> Evaluation: </h4>

<table >
  <tr>
    <th >Course Component</th>
    <th >Weight</th>
  </tr>
  <tr>
    <td >Homework Assignments</td>
    <td ><input className='shortText'
          type="number"
          name="hwAssign"
          value={this.state.hwAssign}
          onChange={(e) => this.setState({ hwAssign: e.target.value })}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td>Quizzes</td>
    <td ><input className='shortText'
          type="number"
          name="quizzes"
          value={this.state.quizzes}
          onChange={(e) => this.setState({ quizzes: e.target.value })}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td >Laboratory</td>
    <td ><input className='shortText'
          type="number"
          name="lab"
          value={this.state.lab}
            onChange={(e) => this.setState({ lab: e.target.value })}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td >Midterm Test</td>
    <td >{<input className='shortText'
          type="number"
          name="midterm"
          value={this.state.midterm}
          onChange={(e) => this.setState({ midterm: e.target.value })}
          placeholder="X"
        />}%</td>
  </tr>
  <tr>
    <td >Final Examination</td>
    <td >50%</td>
  </tr>
</table>
<h5> To obtain a passing grade in the course, a mark of 50% or more must be achieved on the final examination as well as on the laboratory. A final examination or laboratory mark less than 50% will result in a final course grade of 48% or less.</h5>
       <h4>Homework Assignments: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="hwAssign2"
            value={this.state.hwAssign2}
            onChange={(e) => this.setState({ hwAssign2: e.target.value })}
            placeholder=""
          />

       </p>
       <h4>Quizzes: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="quizzes2"
            value={this.state.quizzes2}
            onChange={(e) => this.setState({ quizzes2: e.target.value })}
            placeholder=""
          />

       </p>
       <h4>Laboratory: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="labora2"
            value={this.state.labora2}
            onChange={(e) => this.setState({ labora2: e.target.value })}
            placeholder=""
          />

       </p>
       <h4>Midterm Test: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="midterm2"
            value={this.state.midterm2}
            onChange={(e) => this.setState({ midterm2: e.target.value })}
            placeholder=""
          />

       </p>
       <h4>Final Examination:  </h4>
       <h5>The final examination will be take place during the regular examination period. </h5>
       <h4>Late Submission Policy: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="submission"
            value={this.state.submission}
            onChange={(e) => this.setState({ submission: e.target.value })}
            placeholder=""
          />

       </p>
       <h4>Assignment Submission Locker:  </h4>
       <h5> Locker {<input className='shortText'
          type="number"
          name="locker"
          value={this.state.locker}
          onChange={(e) => this.setState({ locker: e.target.value })}
          placeholder="X"
        />} located on the second floor of TEB</h5>
<h4>Use of English:</h4><h5> In accordance with Senate and Faculty Policy, students may be penalized up to 10% of the marks on all assignments, tests, and examinations for improper use of English. Additionally, poorly written work with the exception of the final examination may be returned without grading. If resubmission of the work is permitted, it may be graded with marks deducted for poor English and/or late submission </h5>
<h4>Attendence:</h4><h5> Any student who, in the opinion of the instructor, is absent too frequently from class, laboratory, or tutorial periods will be reported to the Dean (after due warning has been given). On the recommendation of the department, and with the permission of the Dean, the student will be debarred from taking the regular final examination in the course. </h5>
<h4>Absence Due to Illness or Other Circumstances: </h4><h5> Students should immediately consult with the instructor or department Chair if they have any problems that could affect their performance in the course. Where appropriate, the problems should be documented (see the attached “Instructions for Students Unable to Write Tests or Examinations or Submit Assignments as Scheduled”). The student should seek advice from the instructor or department Chair regarding how best to deal with the problem. Failure to notify the instructor or department Chair immediately (or as soon as possible thereafter) will have a negative effect on any appeal.


For more information concerning accommodations for religious holidays, see the relevant section of the Academic Handbook:
<a href=" http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_religious.pdf"> http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_religious.pdf</a>
</h5>


<h4>Missed Midterm Examinations:</h4><h5> If a student misses a midterm examination, she or he must follow the Instructions for Students Unable to Write Tests and provide documentation to Undergraduate Services Office within 24 hours of the missed test. If accommodation is granted, the department will decide whether to provide a make-up test or allow reweighting of the test, where reweighting means the marks normally allotted for the midterm will be added to the final exam. If no reasonable justification for missing the test can be found, then the student will receive a mark of zero for the test.

If a student is going to miss the midterm examination for religious reasons, they must inform the instructor in writing within 48 hours of the announcement of the exam date or they will be required to write the exam. 
</h5>
<h4>Cheating and Plagiarism:</h4><h5> Students must write their essays and assignments in their own words. Whenever students take an idea or a passage from another author, they must acknowledge their debt both by using quotation marks where appropriate and by proper referencing such as footnotes or citations. University policy states that cheating, including plagiarism, is a scholastic offence. The commission of a scholastic offence is attended by academic penalties, which might include expulsion from the program. If you are caught cheating, there will be no second warning.

All required papers may be subject to submission for textual similarity review to commercial plagiarism-detection software under license to the University for the detection of plagiarism. All papers submitted will be included as source documents on the reference database for the purpose of detecting plagiarism of papers subsequently submitted to the system. Use of the service is subject to the licensing agreement, currently between the University of Western Ontario and Turnitin.com (<a href=" http://www.turnitin.com"> http://www.turnitin.com</a>).

Scholastic offences are taken seriously and students are directed to read the appropriate policy, specifically, the definition of what constitutes a Scholastic Offence, in the relevant section of the Academic Handbook:
(<a href=" http://www.uwo.ca/univsec/pdf/academic_policies/appeals/scholastic_discipline_undergrad.pdf"> http://www.uwo.ca/univsec/pdf/academic_policies/appeals/scholastic_discipline_undergrad.pdf</a>)

 </h5>

 <h4>Use of Electronic Devices: </h4><h5> { <textarea className = "desc"
            type="text"
            name="devices"
            value={this.state.devices}
            onChange={(e) => this.setState({ devices: e.target.value })}
            placeholder=""
          />}  </h5>
          <h4>Use of Personal Response Devices (“Clickers”):  </h4><h5> { <textarea className = "desc"
            type="text"
            name="clickers"
            value={this.state.clickers}
            onChange={(e) => this.setState({ clickers: e.target.value })}
            placeholder=""
          />}  </h5>


<h4>Policy on Repeating All Components of a Course: </h4><h5> Students who are required to repeat an Engineering course must repeat all components of the course. No special permissions will be granted enabling a student to retain laboratory, assignment, or test marks from previous years. Previously completed assignments and laboratories cannot be resubmitted by the student for grading in subsequent years. </h5>

<h4>Internet and Electronic Mail: </h4><h5> Students are responsible for regularly checking their Western e mail and the course web site (<a href=" https://owl.uwo.ca/portal/"> https://owl.uwo.ca/portal/</a>) and making themselves aware of any information that is posted about the course. </h5>
<h4>Accessibility: </h4><h5> : Please contact the course instructor if you require material in an alternate format or if any other arrangements can make this course more accessible to you. You may also wish to contact Services for Students with Disabilities (SSD) at 519-661-2111 ext. 82147 for any specific question regarding an accommodation. </h5>

<h4>Support Services: </h4><h5> Office of the Registrar, <a href=" http://www.registrar.uwo.ca/"> http://www.registrar.uwo.ca/</a>
					Student Development Centre, <a href="http://www.sdc.uwo.ca/">http://www.sdc.uwo.ca/</a>
					Engineering Undergraduate Services, <a href=" http://www.eng.uwo.ca/undergraduate/"> http://www.eng.uwo.ca/undergraduate/</a> 
					USC Student Support Services, <a href=" http://westernusc.ca/services/"> http://westernusc.ca/services/</a> 

Students who are in emotional/mental distress should refer to Mental Health @ Western, <a href=" http://www.health.uwo.ca/mental_health/"> http://www.health.uwo.ca/mental_health/</a>, for a complete list of options about how to obtain help
 </h5>
 <h4>Justification:</h4>
 <textarea className = "desc"
            type="text"
            name="JustifyChange"
            value={this.state.JustifyChange}
            onChange={(e) => this.setState({ JustifyChange: e.target.value })}
            placeholder=""
          />
  <div>Email
  <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder=""
            required
          />
       </div>
       </div>
      <input
      type = "text"
      name ="outlineName"
      
      onChange = { this.handleChange2 } >
      </input>
      <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      
      <button type="submit" onClick={this.handleSubmit}>Load </button>
       
    </div>
    
   
       
      </div>
     
        
     
      
    );
  }
}

export default App;
