module.exports = ({ name, cTitle, year, desc}) => {
   const today = new Date();
return `
   <!doctype html>
   <html>
   <head>
     <title>ECE ${name}: Course Title</title>
     <style>
       /* Add your CSS styles here */
       h1, h2, h3 {
         font-family: Arial, sans-serif;
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
       .header h1 {
         font-size: 36px;
         margin-bottom: 10px;
       }
       .header h2 {
         font-size: 24px;
         margin-bottom: 10px;
       }
       .header h3 {
         font-size: 18px;
         margin-bottom: 10px;
       }
       .instructor {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .instructor h2 {
         margin-bottom: 10px;
       }
       .instructor a {
         color: #333;
         text-decoration: none;
       }
       .description {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .calendar {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .reqs {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .learning-objectives {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .topics {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .evaluation {
         font-size: 18px;
         margin-bottom: 20px;
       }
       .policies {
         font-size: 18px;
         margin-bottom: 20px;
       }
       {
         textarea{
            height: 100px;
            width: 500px;
            word-wrap: break-word;
         }

       }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">
         <h1>Western University</h1>
         <h2>Faculty of Engineering</h2>
         <h3>Department of Electrical and Computer Engineering</h3>
         <h1>ECE ${name}: </h1>
         <h1>${cTitle}</h1>
         <h2>Course Outline ${year}</h2>
       </div>
       <div class="description">
         <h2>Description:</h2>
         <p>${desc} </p>
       </div>
       <div class="instructor">
         <h2>Instructor:</h2>
         Dr. Name, P.Eng.<br>
         <a href="mailto:UWO e-mail address">TEB XXX, 519-661-2111 ext. XXXXX</a><br>
         Consultation hours:
       </div>
       <div class="calendar">
         <h2>Academic Calendar Copy:</h2>
         Contact Hours: X lecture hours, Y laboratory hours, Z tutorial hours, 0.5 course.
       </div>
       <div class="reqs">
         <h2>Prerequisites:</h2>
         ECE XXXX, or equivalent
       </div>
       <div class="learning-objectives">
         <h2>Learning Objectives:</h2>
         Upon successful completion of this course, students will be able to:
         <ul>
           <li>Objective 1</li>
           <li>Objective 2</li>
           <li>Objective 3</li>
         </ul>
       </div>
       <div class="topics">
         <h2>Topics:</h2>
         <ul>
           <li>Topic 1</li>
           <li>Topic 2</li>
           <li>Topic 3</li>
         </ul>
       </div>
       <div class="evaluation">
         <h2>Evaluation:</h2>
         <ul>
           <li>Component 1: Weight X%</li>
           <li>Component 2: Weight Y%</li>
           <li>Component 3: Weight Z%</li>
         </ul>
       </div>
       <div class="policies">
         <h2>Policies:</h2>
         <ul>
           <li>Attendance Policy</li>
           <li>Late Work Policy</li>
           <li>Academic Integrity Policy</li>
         </ul>
       </div>
     </div>
   </body>
   </html>
   `;
};