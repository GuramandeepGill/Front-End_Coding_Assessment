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
   let ul = document.createElement('ul');
   ul.className = 'tags';

   let input = document.createElement('input');
   input.className = 'tag-input';
   input.type = 'text';
   input.placeholder = 'Add a tag';
   input.onkeyup = function(event) {
      if(event.key === 'Enter') {
         let li = document.createElement('li');
         li.textContent = this.value;
         ul.append(li);
         this.value = '';
      }
   }

   let infoDiv = document.createElement('div');
   infoDiv.className = 'info';
   infoDiv.innerHTML = `
      <h1>${student.firstName} ${student.lastName}</h1>
      <p>Email: ${student.email}</p>
      <p>Company: ${student.company}</p>
      <p>Skill: ${student.skill}</p>
      <p>Average: ${calculateAverage(student.grades)}</p>
   `;
   infoDiv.append(ul);
   infoDiv.append(input);

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

const displayStudents = students => {
   let contentDiv = document.getElementById('content');
   let studentProfilesDiv = document.createElement('div');
   studentProfilesDiv.id = 'student-profiles';
   students.forEach(student => {
      // contentDiv.append(buildStudentProfile(student));
      studentProfilesDiv.append(buildStudentProfile(student));
   });
   contentDiv.append(studentProfilesDiv);
}

const main = () => {
   let url = 'https://api.hatchways.io/assessment/students';
   const students = [];

   fetch(url)
      .then(response => response.json())
      .then(data => {
         (data.students).forEach(student => {
            students.push(student);
            displayStudent(student);
         });
      });

   let searchDiv = document.createElement('div');
   searchDiv.innerHTML = `
      <input type="text" class="search-input" placeholder='Search by name'>
      <input type="text" class="search-input" placeholder='Search by tag'>
   `;

   let contentDiv = document.getElementById('content');
   contentDiv.prepend(searchDiv);
}
window.onload = main;
