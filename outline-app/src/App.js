import React, { Component, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';


// axios.get(`/outlineLoader/${this.state.value}`)
// .then ((respone) => {
//   console.log(respone.data)
// })
// .catch((error) => {
//   console.log(error);
//   // handle error
// });
class App extends Component {
  
  state = {
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
  }
   
   

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })
  handleChange2 = (e) =>{
    this.setState({value: e.target.value})
  }
  

  

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, `${this.state.value}.pdf`);
      })
  }

 

  render() {
    return (
      <div className="App">
         
        <div class="container">
       <div class="header">
         <h1>Western University</h1>
         <h2>Faculty of Engineering</h2>
         <h3>Department of Electrical and Computer Engineering</h3>
         <form className = "titleInputs">
         <h1>ECE {<input
            type="text"
            name = "code"
             onChange={this.handleChange}
            placeholder="XXXXA/B"
          />}:<input
          type="text"
          name = "course"
          onChange={this.handleChange}
          placeholder="Course Title"
        /> </h1>
         <h2>Course Outline<input
          type="text"
          name="year"
          onChange={this.handleChange}
          placeholder="20YY-YY"
        /> </h2>
       
        </form>
       
       </div>
       <div className = "textArea">
       <h4>Description: </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name ="desc"
             onChange={this.handleChange}
            placeholder=""
          />}
       </p>
         <h4>Instructor: </h4>
         <p>
         {<textarea className = "desc"
            type="text"
            name ="instructor"
             onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder="
           
    "
          />}
         </p>
         <h4>Contact Hours:
          {<input className='shortText'
          type="text"
          name="contact"
          onChange={this.handleChange}
          placeholder="X"
        />} lecture hours, <input className='shortText'
        type="number"
        name="hours"
        onChange={this.handleChange}
        placeholder="Y"
      /> laboratory hours, <input className='shortText'
      type="number"
      name="labhours"
      onChange={this.handleChange}
      placeholder="Z"
    /> tutorial hours, 0.5 course 
    </h4>
    <h4>
    Antirequisites: <input
          type="text"
          name="anti"
          onChange={this.handleChange}
          placeholder="ECE2238B"
        />
    </h4>
    <h4>
    Prerequisites: <input
          type="text"
          name="pre"
          onChange={this.handleChange}
          placeholder="ECE2238B"
        />


    </h4>
    <h4>
    Co-erequisites: <input
          type="text"
          name= "co"
          onChange={this.handleChange}
          placeholder="ECE2238B"
          
        />
      
    </h4>
    <h5>  Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</h5>
    <h4>CEAB Academic Units: Engineering Science {<input className='shortText'
          type="number"
          name="CEAB"
          onChange={this.handleChange}
          placeholder="X%"
        />} Engineering Design {<input className='shortText'
        type="number"
        name="nameDes"
        onChange={this.handleChange}
        placeholder="Y%"
      />}
           </h4>
           
           <h4>Required Textbooks:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="reqText"
             onChange={this.handleChange}
            placeholder=""
          />}
          </p>
          <h4>Other Required References:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="reqRef"
             onChange={this.handleChange}
            placeholder=""
          />}
          </p>
          <h4>Reccomended References:  </h4>
       <p>
       {<textarea className = "desc"
            type="text"
            name="recRef"
             onChange={this.handleChange}
            placeholder=""
          />}
          </p>
          <h4>General Learning Objectives (CEAB Graduate Attributes):  </h4>
          <table>
  <tr>
    <td>Knowledge Base</td>
    <td><input className='shortText'
        type="text"
        name="knowledge"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Use of Engineering Tools</td>
    <td><input className='shortText'
        type="text"
        name= "engTools"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Impact on Society and the Environment</td>
    <td><input className='shortText'
        type="text"
        name="impact"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
  </tr>
  <tr>
    <td>Problem Analysis</td>
    <td><input className='shortText'
        type="text"
        name="probAnaly"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Individual and Team Work</td>
    <td><input className='shortText'
        type="text"
        name="teamWork"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Ethics and Equity</td>
    <td><input className='shortText'
        type="text"
        name="ethics"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
  </tr>
  <tr>
    <td>Investigation</td>
    <td><input className='shortText'
        type="text"
        name="investigation"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Communication Skills</td>
    <td><input className='shortText'
        type="text"
        name="comSkills"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Economics and Project Management</td>
    <td><input className='shortText'
        type="text"
        name="economics"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
  </tr>
  <tr>
    <td>Design</td>
    <td><input className='shortText'
        type="text"
        name="design"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Professionalism</td>
    <td><input className='shortText'
        type="text"
        name="professional"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
    <td>Life-Long Learning</td>
    <td><input className='shortText'
        type="text"
        name="learning"
        onChange={this.handleChange}
        placeholder="x"
      /></td>
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
        onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b.<textarea className = "desc"
            type="text"
            name="b"
             onChange={this.handleChange}
            placeholder=""
          /></td>
    
  </tr>
   <tr>
    <td>Topic 2</td>
    <td className = "attributes"><input className='desc2'
        type="text"
        name="topic2"
        onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b. <textarea className = "desc"
            type="text"
            name="b2"
             onChange={this.handleChange}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>Topic 3</td>
    <td className = "attributes"><input className='desc2'
        type="text"
        name="topic3"
        onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          /></td>
    
  </tr>
  <tr>
    <td>b. <textarea className = "desc"
            type="text"
            name="b3"
             onChange={this.handleChange}
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
          onChange={this.handleChange}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td>Quizzes</td>
    <td ><input className='shortText'
          type="number"
          name="quizzes"
          onChange={this.handleChange}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td >Laboratory</td>
    <td ><input className='shortText'
          type="number"
          name="lab"
          onChange={this.handleChange}
          placeholder="X"
        />%</td>
  </tr>
  <tr>
    <td >Midterm Test</td>
    <td >{<input className='shortText'
          type="number"
          name="midterm"
          onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          />

       </p>
       <h4>Quizzes: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="quizzes2"
             onChange={this.handleChange}
            placeholder=""
          />

       </p>
       <h4>Laboratory: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="labora2"
             onChange={this.handleChange}
            placeholder=""
          />

       </p>
       <h4>Midterm Test: </h4>
       <p>
       <textarea className = "desc"
            type="text"
            name="midterm2"
             onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          />

       </p>
       <h4>Assignment Submission Locker:  </h4>
       <h5> Locker {<input className='shortText'
          type="number"
          name="locker"
          onChange={this.handleChange}
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
             onChange={this.handleChange}
            placeholder=""
          />}  </h5>
          <h4>Use of Personal Response Devices (“Clickers”):  </h4><h5> { <textarea className = "desc"
            type="text"
            name="clickers"
             onChange={this.handleChange}
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
      <input
      type = "text"
      name ="outlineName"
      value={this.state.value}
      onChange = { this.handleChange2 } >
      </input>
      <button onClick={this.createAndDownloadPdf}>Download PDF</button>
    </div>
    
   
       
      </div>
    );
  }
}

export default App;
