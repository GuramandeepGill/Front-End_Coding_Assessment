const calculateAverage = grades => {
   let total = 0;
   grades.forEach(grade => {
      total += parseInt(grade);
   });
   return `${total/grades.length}`;
}

const buildStudentProfile = student => {
   let profileDiv = document.createElement('div');
   profileDiv.innerHTML = `
      <img src='${student.pic}' alt='${student.firstName} ${student.lastName}'>
      <h1>${student.firstName} ${student.lastName}</h1>
      <p>Email: ${student.email}</p>
      <p>Company: ${student.company}</p>
      <p>Skill: ${student.skill}</p>
      <p>Average: ${calculateAverage(student.grades)}</p>
   `;
   return profileDiv;
}

const displaystudents = students => {
   let contentDiv = document.getElementById('content');
   students.forEach(student => {
      contentDiv.append(buildStudentProfile(student));
   });
}

const main = () => {
   let url = 'https://api.hatchways.io/assessment/students';

   fetch(url)
      .then(response => response.json())
      .then(data => {
         let {students} = data;
         displaystudents(students);
         console.log(students);
      });
   // console.log('hi');
}
window.onload = main;
