module.exports = ({ code, course, year, desc, instructor, calendar, contact, hours, labhours, anti, pre, co,
   CEAB, nameDes, reqText, reqRef, recRef,knowledge, engTools, impact,
probAnaly, teamWork, ethics, investigation, comSkills, economics, design,
 professional, learning, topic1, a, b, topic2, a2, b2, topic3, a3,b3, hwAssign, quizzes,lab, midterm, 
 hwAssign2, quizzes2, labora2, midterm2, submission, locker, devices, clickers}) => {
   const today = new Date();
return `
   <!doctype html>
   <html>
   <head>
     <title>ECE: Course Title</title>
     <style>
       /* Add your CSS styles here */
       body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      .course-outline {
        max-width: 800px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
      }
      
      .course-outline-title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 30px;
      }
      
      .course-outline-section {
        margin-bottom: 30px;
      }
      
      .course-outline-section input[type="text"] {
        width: 100%;
        padding: 10px;
        font-size: 18px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      .course-outline-section-content {
        margin-left: 20px;
      }
      
      .course-outline-section-content ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .course-outline-section-content li input[type="text"] {
        width: calc(100% - 20px);
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      button {
        padding: 10px 20px;
        background-color: #ddd;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 10px;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      
      .titleInputs{
        list-style: none;
        padding: 0;
        margin: 0;
        
        
      }
      .desc {
        height: 100px;
        width: 500px;
        word-wrap: break-word;
      }
      .shortText{
        height: 10px;
        width: 40px;
      }
      table {
        border: 1px solid black;
        border-collapse: collapse;
        width: 100%;
      }
      td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
      }
      
      th, td {
       
        padding: 8px;
        text-align: left;
      }
      
      th {
        background-color: #dddddd;
      }
      .attributes{
        
        padding: 8px;
        text-align: left;
      }
      .desc2{
        
        word-wrap: break-word;
        
      }
     </style>
   </head>
   
   <div className="App">
         
   <div class="container">
  <div class="header">
    <h1>Western University</h1>
    <h2>Faculty of Engineering</h2>
    <h3>Department of Electrical and Computer Engineering</h3>
    
    <h1>ECE ${code}${course} </h1>
    <h2>Course Outline ${year} </h2>
  
   
  
  </div>
  <div className = "textArea">
  <h4>Description: </h4>
  
  ${desc}
  
    <h4>Instructor: </h4>
   
    ${instructor}
    
    <h4>Academic Calendar Copy: </h4>
    
    ${calendar}
    
    <h4>Contact Hours:
     ${contact} lecture hours, ${hours} laboratory hours, ${labhours} tutorial hours, 0.5 course 
</h4>
<h4>
Antirequisites: ${anti}
</h4>
<h4>
Prerequisites: ${pre}


</h4>
<h4>
Co-erequisites: ${co}
 
</h4>
<h5>  Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</h5>
<h4>CEAB Academic Units: Engineering Science ${CEAB} Engineering Design ${nameDes}
      </h4>
      
      <h4>Required Textbooks:  </h4>
  <p>
  ${reqText}
     </p>
     <h4>Other Required References:  </h4>
  <p>
  ${reqRef}
     </p>
     <h4>Reccomended References:  </h4>
  <p>
  ${recRef}
     </p>
     <h4>General Learning Objectives (CEAB Graduate Attributes):  </h4>
     <table>
<tr>
<td>Knowledge Base</td>
<td>${knowledge}</td>
<td>Use of Engineering Tools</td>
<td>${engTools}</td>
<td>Impact on Society and the Environment</td>
<td>${impact}</td>
</tr>
<tr>
<td>Problem Analysis</td>
<td>${probAnaly}</td>
<td>Individual and Team Work</td>
<td>${teamWork}</td>
<td>Ethics and Equity</td>
<td>${ethics}</td>
</tr>
<tr>
<td>Investigation</td>
<td>${investigation}</td>
<td>Communication Skills</td>
<td>${comSkills}</td>
<td>Economics and Project Management</td>
<td>${economics}</td>
</tr>
<tr>
<td>Design</td>
<td>${design}</td>
<td>Professionalism</td>
<td>${professional}</td>
<td>Life-Long Learning</td>
<td>${learning}</td>
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
<td className = "attributes" >${topic1}  </td>
</tr>
<tr>
<td>At the end of this section, students will be able to:</td>


</tr>
<tr>
<td>a. ${a}</td>

</tr>
<tr>
<td>b.${b}</td>

</tr>
<tr>
<td>Topic 2</td>
<td className = "attributes">${topic2 }</td>
</tr>
<tr>
<td>At the end of this section, students will be able to:</td>

</tr>
<tr>
<td>a. ${a2}</td>

</tr>
<tr>
<td>b. ${b2}</td>

</tr>
<tr>
<td>Topic 3</td>
<td className = "attributes">${topic3 } </td>
</tr>
<tr>
<td>At the end of this section, students will be able to:</td>

</tr>
<tr>
<td>a. ${a3 }</td>

</tr>
<tr>
<td>b. ${b3 }</td>

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
<td >${hwAssign }%</td>
</tr>
<tr>
<td>Quizzes</td>
<td >${quizzes }%</td>
</tr>
<tr>
<td >Laboratory</td>
<td >${lab }%</td>
</tr>
<tr>
<td >Midterm Test</td>
<td >${midterm }%</td>
</tr>
<tr>
<td >Final Examination</td>
<td >50%</td>
</tr>
</table>
<h5> To obtain a passing grade in the course, a mark of 50% or more must be achieved on the final examination as well as on the laboratory. A final examination or laboratory mark less than 50% will result in a final course grade of 48% or less.</h5>
  <h4>Homework Assignments: </h4>
  
  ${hwAssign2 }

  
  <h4>Quizzes: </h4>
  ${quizzes2 }
 
  <h4>Laboratory: </h4>
  ${labora2 }
  <h4>Midterm Test: </h4>
  ${midterm2}
  <h4>Final Examination:  </h4>
  <h5>The final examination will be take place during the regular examination period. </h5>
  <h4>Late Submission Policy: </h4>
  ${submission }
  <h4>Assignment Submission Locker:  </h4>
  <h5> Locker ${locker } located on the second floor of TEB</h5>
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

<h4>Use of Electronic Devices: </h4><h5> ${devices }  </h5>
     <h4>Use of Personal Response Devices (“Clickers”):  </h4><h5> ${clickers }  </h5>


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

</div>

 </div>
   
   </html>
   `;
};