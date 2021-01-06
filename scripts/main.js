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
         student.tags.push(this.value);
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
         student.revealGrades = true;
      }
      else {
         infoDiv.removeChild(infoDiv.lastChild);
         button.textContent = '+';
         student.revealGrades = false;
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
      studentProfilesDiv.append(buildStudentProfile(student));
   });
   contentDiv.append(studentProfilesDiv);
}

const handleSearch = (elements, list) => {
   let name = (elements[0].value).toLowerCase();
   let tag = (elements[1].value).toLowerCase();

   let filteredStudents = list.filter(student => {
      let studentName = (`${student.firstName} ${student.lastName}`).toLowerCase();
      let flagOne = (studentName.indexOf(name) !== -1);
      let flagTwo = (tag === '') ? true : false;
      let {tags} = student;
      for(let i=0; i<tags.length; i++) {
         let ithTag = tags[i].toLowerCase();
         if(ithTag.indexOf(tag) !== -1) {
            flagTwo = true;
            break;
         }
      }
      return (flagOne && flagTwo);
   });
   return filteredStudents;
}

const main = () => {
   let url = 'https://api.hatchways.io/assessment/students';
   const students = [];

   fetch(url)
      .then(response => response.json())
      .then(data => {
         (data.students).forEach(student => {
            student.tags = [];
            student.revealGrades = false;
            students.push(student);
         });
         displayStudents(students);
      });

   let searchDiv = document.createElement('div');
   searchDiv.innerHTML = `
      <input type="text" class="search-input" placeholder='Search by name'>
      <input type="text" class="search-input" placeholder='Search by tag'>
   `;

   let contentDiv = document.getElementById('content');
   contentDiv.prepend(searchDiv);

   searchDiv.onkeyup = () => {
      let elements = document.getElementsByClassName('search-input');
      document.getElementById('student-profiles').remove();
      displayStudents(handleSearch(elements, students));
   }
}
window.onload = main;
