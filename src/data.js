/*
Se declaran variables globales que se utilizan para iterar la data.
*/
const url = 'https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json';
let campusSearch = document.getElementById('campusBox');
let generationSearch = document.getElementById('generationBox');
let orderStudents = [];
let orderBy = 'Nombre';
let orderDirection = 'Ascendente';
let search = document.getElementById('searchBox');

/*
Se realiza una función para cargar la información al momento de entrar a la página.
*/
// Función cargar data  OK

window.onload = () => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      getData();
      getData1();
    })
    .catch(error => {
      console.log('Esta fallando el internet');
    });
};

/*
Primer función, primero es necesario convertir la data para poderla trabajar en JavaScript, se enlaza a la siguiente función.
*/

// Función computeStudentsStats(laboratoria)  OK

function getData() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      computeStudentsStats(laboratoria);
    });
}

/*
Con esta función es necesario iterar en la data para poder recolectar los valores solicitados. Es importante identificar en que momento
es una propiedad y en que otro puede ser esta un valor de acuerdo a la posición  o momento en el que se esta iterando.
Se utiliza el forEach para iterar la información con funciones anónimas. Al momento de iterar en los temas y subtemas se elige llevar
el objeto como esta en el archivo json ya que varia de la información es igual a la solicitada una vez que se crea el nuevo arreglo de objetos,
se modifican las propiedades ya sea por alguna operación matemática, cambio de nombre o eliminación en caso de no ser necesaria.
*/

window.computeStudentsStats = (laboratoria) => {
  const students = [];
  i = 0;
  campus = Object.getOwnPropertyNames(laboratoria);
  // console.log(campus)
  generations = Object.values(laboratoria);
  // console.log(generation)
  generations.forEach(function(element) {
    j = 0;
    studentsData = Object.values(element.generacion);
    // console.log(students)
    generations = Object.getOwnPropertyNames(element.generacion);
    // console.log(generation)
    studentsData.forEach(function(element) {
      studentsArray = element;
      // console.log(studentsArray)
      studentsArray.estudiantes.forEach(function(student) {
        studentsArray0 = student;
        name = studentsArray0.nombre;
        // console.log(name)
        email = studentsArray0.correo;
        // console.log(email)
        completedPercentage = parseInt(studentsArray0.progreso.porcentajeCompletado);
        // console.log(completedPercentage)
        if (completedPercentage <= 60) {
          status = 'Deficiente';
        } else if (completedPercentage >= 61 || completedPercentage <= 89) {
          status = 'Promedio';
        } else if (completedPercentage >= 90) {
          status = 'Sobresaliente';
        }
        // console.log(status)
        topics = studentsArray0.progreso.temas;
        // console.log(topics)

        students.push({
          'name': name,
          'email': email,
          'campus': campus[i],
          'generation': generations[j],
          'stats': {
            'status': status,
            'completedPercentage': completedPercentage,
            'topics': topics
          }
        });
      });
      j++;
    });
    i++;
  });
  students.forEach(function(element) {
    for (var variable in element.topics) {
      element.stats.topics[variable].completedPercentage = element.stats.topics[variable].porcentajeCompletado;
      delete element.stats.topics[variable].porcentajeCompletado;
      percentageDuration = parseInt(element.stats.topics[variable].duracionTemaCompletado);
      percentageDurationTema = parseInt(element.stats.topics[variable].duracionTema);
      percentageDuration = Math.round((percentageDuration * 100) / percentageDurationTema);
      element.stats.topics[variable]['percentageDuration'] = percentageDuration;
      delete element.stats.topics[variable].duracionTema;
      delete element.stats.topics[variable].duracionTemaCompletado;

      for (var variable2 in element.stats.topics[variable].subtemas) {
        completedPercentage = parseInt(element.stats.topics[variable].subtemas[variable2].completado);
        element.stats.topics[variable].subtemas[variable2].duration = element.stats.topics[variable].subtemas[variable2].duracionSubtema;
        duration = element.stats.topics[variable].subtemas[variable2].duracionSubtema;
        if (completedPercentage === 1) {
          duration = 0;
        } else {
          duration = duration;
        }

        if (completedPercentage === 1) {
          completedPercentage = 100;
        } else {
          completedPercentage = 0;
        }
        element.stats.topics[variable].subtemas[variable2].completedPercentage = completedPercentage;
        element.stats.topics[variable].subtemas[variable2].type = element.stats.topics[variable].subtemas[variable2].tipo;
        delete element.stats.topics[variable].subtemas[variable2].tipo;
        delete element.stats.topics[variable].subtemas[variable2].duracionSubtema;
        delete element.stats.topics[variable].subtemas[variable2].completado;
      }
    }
  });
  console.log(students);
  filterStudents(students, search);
  sortStudents(students, orderBy, orderDirection);

  return students;
};

// Función computeGenerationStats(laboratoria)
/*
Se comienza a trabajar en la segunda función con base en la primera.
*/

function getData1() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      computeGenerationsStats(laboratoria);
    });
}

window.computeGenerationsStats = (laboratoria) => {
  const generation = [];
  let count = 0;
  let average = 0;
  for (variable in laboratoria) {
    campus = variable;
    average = 0;
    const generations = Object.keys(laboratoria[campus].generacion);
    generations.forEach((generation) => {
      generation = generation;
      studentsArray = laboratoria[campus].generacion[generation].estudiantes;
      count = studentsArray.length;
      for (variable2 in studentsArray) {
        average += parseInt(studentsArray[variable2].progreso.porcentajeCompletado);
        average = Math.round(average / count);
      }
    });
    generation.push({
      'campus': campus,
      'generation': generation,
      'average': average,
      'count': count
    });
  }
  console.log(generation);
  return generation;
};


// Función sortStudents
/*
Se comienza a trabajar en la tercer función solicitada, de acuerdo a la solicitud se utiliza el método sort y reverse.
En cuanto a los numeros se debe tener un tratamiento especial.
*/

window.sortStudents = (students, orderBy, orderDirection) => {
  if (orderBy === 'Nombre' && orderDirection === 'Ascendente') {
    orderStudents = students.name.sort();
  } else if (orderBy === 'Nombre' && orderDirection === 'Descendente') {
    orderStudents = students.name.sort().reverse();
  } else if (orderBy === 'Porcentaje' && orderDirection === 'Ascendente') {
    orderStudents = students.completedPercentage.sort((a, b) => a - b);
  } else if (orderBy === 'Porcentaje' && orderDirection === 'Descendente') {
    orderStudents = students.completedPercentage.sort((a, b) => a - b).reverse();
  }


  console.log(orderStudents);
};

// Función filterStudents  OK

/*
Se crea función para filtrar a los estudiantes de acuerdo al valor retornado de la función 1 se compara el valor
de la propiedad name con el valor que se busca.
*/

window.filterStudents = (students, search) => {
  const searchStudents = students.filter(function(el) {
    return (el.name === search);
  });
  console.log(searchStudents);
  return searchStudents;
};


// Función datos primer pantalla
/*
Para mostrar información en pantalla se realizaron funciones con la información necesaria de acuerdo a los criterios
seleccionados por las usuarias. Se itera con los criterios seleccionados la data original de archivo json.
Esta función traerá información general de la generación seleccionada.
*/

function firstPrint() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      firstInfo(laboratoria);
    });
};

window.firstInfo = (laboratoria) => {
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
      statusLow += 1;
    } else if (average >= 61 || average <= 89) {
      statusMedium += 1;
    } else if (average >= 90) {
      statusHigh += 1;
    }

    statusLow = Math.round((statusLow / count));
    statusLow = Math.round((statusLow / count));
    statusLow = Math.round((statusLow / count));

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
  info.push({'campus': campusSearch.toUpperCase(),
'generation': generationSearch.toUpperCase(),
'average': average,
'count': count,
    'statusLow': statusLow,
'statusMedium': statusMedium,
'statusHigh': statusHigh,
'theme1': theme1,
'theme2': theme2,
'theme3': theme3});

  secondPrint();
  return info;
};

// Función datos segunda pantalla
/*
En esta función se itera para obtener información de las alumnas y crear un listado de acuerdo a los criterios de sede y
generación seleccionados. Se itera la data original del archivo json.
*/
function secondPrint() {
  fetch(url)
    .then(response => response.json())
    .then(laboratoria => {
      secondInfo(laboratoria);
    });
}
window.secondInfo = (laboratoria) => {
  const info2 = [];
  for (let valor in laboratoria[campusSearch].generacion[generationSearch].estudiantes) {
    name = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].nombre;
    email = laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].correo;
    completedPercentage = parseInt(laboratoria[campusSearch].generacion[generationSearch].estudiantes[valor].progreso.porcentajeCompletado);

    info2.push({
      'name': name,
      'email': email,
      'campus': campus,
      'generation': generation
    });
  }

  return info2;
};


// Función datos tercer pantalla

/*
La función trae información especifica de cada alumna para ser mostrada en pantalla. Se itera la data original del json.
*/

function thirdPrint() {
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
