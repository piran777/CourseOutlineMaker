import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminReview.css';

export default function Index() {
    const [outlineData, setOutlineData] = useState([]);
    const [pdfName, setPdfName] = useState('');
    const [outlineNames, setOutlineNames] = useState([]);
    const [comment, setComment] = useState('');
    let id = '';

    const handleChange = event => {
        event.preventDefault();
        setPdfName(event.target.value);
    }

    const getComment = event => {
        event.preventDefault();
        setComment(event.target.value);
    }
    
    const handleSubmit = event => {
    event.preventDefault();
    fetch(`/getNonApprovedOutline/${pdfName}`)
        .then(response => response.json())
        .then(data => setOutlineData(data));
        event.target.reset();
    };

    useEffect(() => {
    axios.get('/getNonApprovedPdfNames')
        .then(res => setOutlineNames(res.data))
        .catch(error => console.error(error));
    }, []);

    const rejectPDF = () => {
        outlineData.map(data => (
            id = data._id
        ))

        axios.post('/outline/disapprove', {
            _id: id,
            comment: comment
        })
        .then(function (response) {
            window.location.reload(false);
        }) 
    }

    const acceptPDF = () => {
        outlineData.map(data => (
            id = data._id
        ))
        axios.post('/outline/approve', {
            _id: id
        })
        .then(function (response) {
            window.location.reload(false);
        })
    }



    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input list="pdfNames" type="text" onChange={handleChange} />
                <datalist id="pdfNames">
                {outlineNames.map(outlineName => (
                    <option key={outlineName} value={outlineName}>
                    {outlineName}
                    </option>
                ))}
                </datalist>
                <button type="submit">Submit</button>
            </form>

        {outlineData.map(data => (
            <div key={data.value}>
            <div class="header">
                <h1>Western University</h1>
                <h2>Faculty of Engineering</h2>
                <h3>Department of Electrical and Computer Engineering</h3>
                <form className="titleInputs">
                <h1>ECE {data.code}:{data.course}</h1>
                <h2>Course Outline {data.year} </h2>
                </form>

            </div>
            <h4>Description: </h4>
            <p>
                {data.desc}
            </p>
            <h4>Instructor: </h4>
            <p>
                {data.instructor}
            </p>
            <h4>Academic Calendar Copy: </h4>
            <p>
                {data.calendar}
            </p>

            <h4>Contact Hours: {data.contact} lecture hours, {data.hours} laboratory hours, {data.labhours} tutorial hours, 0.5 course
            </h4>

            <h4>
                Antirequisites: {data.anti}
            </h4>

            <h4>
                Prerequisites: {data.pre}
            </h4>
            <h4>
                Co-erequisites: {data.co}
            </h4>

            <h5>  Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</h5>
            <h4>CEAB Academic Units: Engineering Science {data.CEAB} Engineering Design {data.nameDes}
            </h4>
            <h4>Required Textbooks:  </h4>
            <p>
                {data.reqText}
            </p>
            <h4>Other Required References:  </h4>
            <p>
                {data.reqRef}
            </p>
            <h4>Reccomended References:  </h4>
            <p>
                {data.recRef}
            </p>

            <h4>General Learning Objectives (CEAB Graduate Attributes):  </h4>
            <table>
                <tr>
                <td>Knowledge Base</td>
                <td>{data.knowledge}</td>
                <td>Use of Engineering Tools</td>
                <td>{data.engTools}</td>
                <td>Impact on Society and the Environment</td>
                <td>{data.impact}</td>
                </tr>
                <tr>
                <td>Problem Analysis</td>
                <td>{data.probAnaly}</td>
                <td>Individual and Team Work</td>
                <td>{data.teamWork}</td>
                <td>Ethics and Equity</td>
                <td>{data.ethics}</td>
                </tr>
                <tr>
                <td>Investigation</td>
                <td>{data.investigation}</td>
                <td>Communication Skills</td>
                <td>{data.comSkills}</td>
                <td>Economics and Project Management</td>
                <td>{data.economics}</td>
                </tr>
                <tr>
                <td>Design</td>
                <td>{data.design}</td>
                <td>Professionalism</td>
                <td>{data.professional}</td>
                <td>Life-Long Learning</td>
                <td>{data.learning}</td>
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
                <td className="attributes" >{data.topic1}  </td>
                </tr>
                <tr>
                <td>At the end of this section, students will be able to:</td>


                </tr>
                <tr>
                <td>a. {data.a}</td>

                </tr>
                <tr>
                <td>b.{data.b}</td>

                </tr>
                <tr>
                <td>Topic 2</td>
                <td className="attributes">{data.topic2} </td>
                </tr>
                <tr>
                <td>At the end of this section, students will be able to:</td>

                </tr>
                <tr>
                <td>a. {data.a2}</td>

                </tr>
                <tr>
                <td>b. {data.b2}</td>

                </tr>
                <tr>
                <td>Topic 3</td>
                <td className="attributes">{data.topic3} </td>
                </tr>
                <tr>
                <td>At the end of this section, students will be able to:</td>

                </tr>
                <tr>
                <td>a. {data.a3}</td>

                </tr>
                <tr>
                <td>b. {data.b3}</td>

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
                <td >{data.hwAssign}%</td>
                </tr>
                <tr>
                <td>Quizzes</td>
                <td >{data.quizzes}%</td>
                </tr>
                <tr>
                <td >Laboratory</td>
                <td >{data.lab}%</td>
                </tr>
                <tr>
                <td >Midterm Test</td>
                <td >{data.midterm}%</td>
                </tr>
                <tr>
                <td >Final Examination</td>
                <td >50%</td>
                </tr>
            </table>

            <h5> To obtain a passing grade in the course, a mark of 50% or more must be achieved on the final examination as well as on the laboratory. A final examination or laboratory mark less than 50% will result in a final course grade of 48% or less.</h5>
            <h4>Homework Assignments: </h4>
            <p>
                {data.hwAssign2}

            </p>

            <h4>Quizzes: </h4>
            <p>
                {data.quizzes2}

            </p>

            <h4>Laboratory: </h4>
            <p>
                {data.labora2}

            </p>

            <h4>Midterm Test: </h4>
            <p>
                {data.midterm2}

            </p>

            <h4>Final Examination:  </h4>
            <h5>The final examination will be take place during the regular examination period. </h5>
            <h4>Late Submission Policy: </h4>
            <p>
                {data.submission}

            </p>


            <h4>Assignment Submission Locker:  </h4>
            <h5> Locker {data.locker} located on the second floor of TEB</h5>
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

            <h4>Use of Electronic Devices: </h4><h5> {data.devices}  </h5>
            <h4>Use of Personal Response Devices (“Clickers”):  </h4><h5> {data.clickers}  </h5>

            <h4>Policy on Repeating All Components of a Course: </h4><h5> Students who are required to repeat an Engineering course must repeat all components of the course. No special permissions will be granted enabling a student to retain laboratory, assignment, or test marks from previous years. Previously completed assignments and laboratories cannot be resubmitted by the student for grading in subsequent years. </h5>

            <h4>Internet and Electronic Mail: </h4><h5> Students are responsible for regularly checking their Western e mail and the course web site (<a href=" https://owl.uwo.ca/portal/"> https://owl.uwo.ca/portal/</a>) and making themselves aware of any information that is posted about the course. </h5>
            <h4>Accessibility: </h4><h5> : Please contact the course instructor if you require material in an alternate format or if any other arrangements can make this course more accessible to you. You may also wish to contact Services for Students with Disabilities (SSD) at 519-661-2111 ext. 82147 for any specific question regarding an accommodation. </h5>

            <h4>Support Services: </h4><h5> Office of the Registrar, <a href=" http://www.registrar.uwo.ca/"> http://www.registrar.uwo.ca/</a>
                Student Development Centre, <a href="http://www.sdc.uwo.ca/">http://www.sdc.uwo.ca/</a>
                Engineering Undergraduate Services, <a href=" http://www.eng.uwo.ca/undergraduate/"> http://www.eng.uwo.ca/undergraduate/</a>
                USC Student Support Services, <a href=" http://westernusc.ca/services/"> http://westernusc.ca/services/</a>

                Students who are in emotional/mental distress should refer to Mental Health @ Western, <a href=" http://www.health.uwo.ca/mental_health/"> http://www.health.uwo.ca/mental_health/</a>, for a complete list of options about how to obtain help
            </h5>

            <h4>Justification for Changes: </h4><h5>{data.justifyChange}</h5>
            <h4>Comments to Instructor:</h4>
            <input
                type="text"
                style = {{width: "500px", height: "100px", textAlignVertical: 'top'}}
                onChange={getComment}
            />
            <br></br>
            <button onClick={rejectPDF}>Reject Course Outline</button>
            <button onClick={acceptPDF}>Accept Course Outline</button>
            </div>
        ))}
        </div>
    )
}