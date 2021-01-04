const main = () => {
   let url = 'https://api.hatchways.io/assessment/students';

   fetch(url)
      .then(response => response.json())
      .then(data => {
         let {students} = data;
         console.log(students);
      });
   // console.log('hi');
}
window.onload = main;
