//La organización de código en archivos que dividan las responsabilidades sigue en proceso, es necesario realizar 
 
generationBox.addEventListener('change', generationPrint);

studentsButton.addEventListener('click', studentsListPrint);

//searchBox.addEventListener('keyUp', filterStudents);


// Función datos primer pantalla
/*
Para mostrar información en pantalla se realizaron funciones con la información necesaria de acuerdo a los criterios
seleccionados por las usuarias. Se itera con los criterios seleccionados la data original de archivo json.
Esta función traerá información general de la generación seleccionada.
*/

function generationPrint() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      firstInfo(laboratoria);
    });
};

window.firstInfo = (laboratoria) => {
  let campusDom = document.getElementById('campusPrint');
  let generationDom = document.getElementById('generationPrint');
  let studentsActDom = document.getElementById('e-active');
  let statusDom = document.getElementById("status")
  let theme1Dom = document.getElementById("theme1")
  let theme2Dom = document.getElementById("theme2")
  let theme3Dom = document.getElementById("theme3")

  const info = [];
  campusSearch = campusBox.value.toLowerCase();
  generationSearch = generationBox.value.toLowerCase();
  count = laboratoria[campusSearch].generacion[generationSearch].estudiantes.length;
  average = 0;
  statusLow = 0;
  statusMedium = 0;
  statusHigh = 0;
  theme1 = 0;
  theme2 = 0;
  theme3 = 0;
  for (let valor in laboratoria[campusSearch].generacion[generationSearch].estudiantes) {
    average += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.porcentajeCompletado);
    status = average;
    // Revisar esta parte para que sume 1 de acuerdo a la condicion
    if (average <= 60) {
      statusLow++;
    } else if (average >= 90) {
      statusHigh++;
    } else if (average >= 61 || average <= 89) {
      statusMedium++;
    }

    theme1 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['01-Introduccion-a-programacion'].porcentajeCompletado);
    theme2 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['02-Variables-y-tipo-de-datos'].porcentajeCompletado);
    theme3 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['03-UX'].porcentajeCompletado);
  }
  average = Math.round((average / count));
  // console.log (average)
  theme1 = Math.round((theme1 / count));
  // console.log(theme1);
  theme2 = Math.round((theme2 / count));
  // console.log(theme2);
  theme3 = Math.round((theme3 / count));
  // console.log(theme3);
  info.push({
    'campus': campusSearch.toUpperCase(),
    'generation': generationSearch.toUpperCase(),
    'average': average,
    'count': count,
    'statusLow': statusLow,
    'statusMedium': statusMedium,
    'statusHigh': statusHigh,
    'theme1': theme1,
    'theme2': theme2,
    'theme3': theme3
  });

  campusDom.innerHTML = `<h4>${info[0].campus}</h4>`
  generationDom.innerHTML = `<h4>${info[0].generation} GENERACIÓN </h4>`
  studentsActDom.innerHTML = `
  <h5 class="center-align agrandar-fuente">${info[0].count}</h5>
  <h5 class="center-align font-rem">Estudiantes activas</h5>
  <br>
  <div class="progress">
    <div class="determinate" style="width: ${info[0].average}${'%'}" id="progreso"></div>
  </div>
  <h5 class="center-align font-rem">Avance general: ${info[0].average}${'%'}</h5>
  `
  statusDom.innerHTML = ` <p class="parrafos center-align back-yellow">Alumnas que han alcanzado:
  <br>
  <br> Más del 90%: ${info[0].statusLow}
  <br> Entre 60% y 90%: ${info[0].statusMedium}
  <br> Menos del 60%: ${info[0].statusHigh}</p>
  `
  theme1Dom.innerHTML = `<p class="parrafos center-align back-yellow">Introducción
  <br> a programación: ${info[0].theme1}% 
  <div class="progress">
  <div class="determinate" style="width: ${info[0].theme1}${'%'}" id="progreso"></div>
  </div></p>`
  theme2Dom.innerHTML = `<p class="parrafos center-align back-yellow">Variables
  <br> y tipos de datos: ${info[0].theme2}%
  <div class="progress">
  <div class="determinate" style="width: ${info[0].theme2}${'%'}" id="progreso"></div>
  </div></p>`
  theme3Dom.innerHTML = `<p class="parrafos center-align back-yellow" style="margin-top: 2.44em;">UX: ${info[0].theme3}%
  <div class="progress ">
  <div class="determinate" style="width: ${info[0].theme3}${'%'}" id="progreso"></div>
  </div></p>`


};

// Función datos segunda pantalla
/*
  En esta función se itera para obtener información de las alumnas y crear un listado de acuerdo a los criterios de sede y
  generación seleccionados. Se itera la data original del archivo json.
  */
function studentsListPrint() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      secondInfo(laboratoria);
    });
}
window.secondInfo = (laboratoria) => {
  campusSearch = campusBox.value.toLowerCase();
  generationSearch = generationBox.value.toLowerCase();
  //Búsqueda individual de alumnas, iteración en proceso. let searchDom = document.getElementById('search');
  let alumnastablaDom = document.getElementById('alumnas-tabla');
  //Select de alumnas en proceso. let selectAlumnasDom = document.getElementById('alumnas-select');
  const info2 = [];
  for (let valor in laboratoria[campusSearch].generacion[generationSearch].estudiantes) {
    name = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].nombre;
    email = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].correo;
    completedPercentage = parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.porcentajeCompletado);

    info2.push({
      'name': name,
      'email': email,
      'campus': campusSearch,
      'generation': generationSearch,
      'completedPercentage': completedPercentage
    });
  }
  console.log(info2)

  alumnastablaDom.innerHTML = `<thead class="center-align subtitulos">
  <tr>
    <th class="center">Nombre
    </th>
    <th class="center">E-mail</th>
    <th class="center">Campus</th>
    <th class="center">Generación</th>
    <th class="center">Porcentaje de avance
    </th>
  </tr>
  </thead>`
  for (let i = 0; i < info2.length; i++) {
    console.log(i)
    alumnastablaDom.innerHTML += `
    <tbody class="parrafos">
  <tr>
    <td class="center">${info2[i].name}</td>
    <td class="center">${info2[i].email}</td>
    <td class="center">${info2[i].campus}</td>
    <td class="center">${info2[i].generation}</td>
    <td class="center">${info2[i].completedPercentage}</td>
  </tr>`

  }

  /* Iteración en proceso, para buscar a las alumnas de manera individual
  for (let x = 0; x < info2.length; x++) {
   selectObject.options = new Option(info2[x].name)
   }*/

  return info2;
};


// Función datos tercer pantalla

/*
  La función trae información especifica de cada alumna para ser mostrada en pantalla. Se itera la data original del json.
  */

function studentsPrint() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      thirdInfo(laboratoria);
    });
}
window.thirdInfo = (laboratoria) => {
  const info3 = [];
  campusSearch = campusBox.value.toLowerCase();
  console.log(campusSearch);
  generationSearch = generationBox.value.toLowerCase();
  console.log(generationSearch);
  theme1 = 0;
  theme2 = 0;
  theme3 = 0;

  for (let valor in laboratoria[campusSearch].generacion[generationSearch].estudiantes) {
    name = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].nombre;
    email = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].correo;
    topics = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas;
    theme1 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['01-Introduccion-a-programacion'].porcentajeCompletado);
    theme2 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['02-Variables-y-tipo-de-datos'].porcentajeCompletado);
    theme3 += parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.temas['03-UX'].porcentajeCompletado);

    info3.push({
      'name': name,
      'email': email,
      'campus': campusSearch,
      'generation': generationSearch,
      'javascript': theme1,
      'variables': theme2,
      'ux': theme3,
      'topics': topics
    });
  }
  console.log(info3);
};