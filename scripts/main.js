const calculateAverage = grades => {
   let total = 0;
   grades.forEach(grade => {
      total += parseInt(grade);
   });
   return `${total/grades.length}`;
}

const buildGrades = grades => {
   let ul = document.createElement('ul');
   grades.forEach((grade, i) => {
      let li = document.createElement('li');
      li.textContent = `Test ${++i}: ${grade}`;
      ul.append(li);
   });
   return ul;
}

const buildStudentProfile = student => {
   let infoDiv = document.createElement('div');
   infoDiv.className = 'info';
   infoDiv.innerHTML = `
      <h1>${student.firstName} ${student.lastName}</h1>
      <p>Email: ${student.email}</p>
      <p>Company: ${student.company}</p>
      <p>Skill: ${student.skill}</p>
      <p>Average: ${calculateAverage(student.grades)}</p>
   `;

   let button = document.createElement('button');
   button.textContent = '+';
   button.onclick = () => {
      if(button.textContent === '+') {
         infoDiv.append(buildGrades(student.grades));
         button.textContent = '-';
      }
      else {
         infoDiv.removeChild(infoDiv.lastChild);
         button.textContent = '+';
      }
   }

   let profileDiv = document.createElement('div');
   profileDiv.className = 'profile';
   profileDiv.innerHTML = `
      <img src='${student.pic}' alt='${student.firstName} ${student.lastName}'>
   `;
   profileDiv.append(infoDiv);
   profileDiv.append(button);

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
}
window.onload = main;
