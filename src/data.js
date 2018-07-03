//Una vez que elige la sede y la generación se carga la información de acuerdo a estos parametros
//Necesito identificar el elemento para poder extraer la información con este primer parametro
//Necesito identificar la generacion para extraer la información con el segundo parametro
const link = "https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json"
let campus = document.getElementById("campusBox");
let generation = document.getElementById("generationBox");
let average = 0;
let count = 0;
let name = "";
let email = "";
let completedPercentage = 0;
let status = 0;
let topics = "";
let subtopics = "";
let completedPercentageTema = 0;
let percentageDuration = 0;
let percentageDurationTema = 0;
let type = 0;
let duration = 0;
let completedPercentageGeneral = 0;
const stats = {
    "students" : []
 }
const computeGeneration = {
    "generation" : []
}
let orderBy = "Nombre";
let orderDirection = "Ascendente";
const orderStats = {
    "students" : []
 }
let search = "Bernarda Natasha";

////////////////////////////////////////////////////////////////////////////// Función computeStudentsStats(laboratoria)
function getData() {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      computeStudentsStats(laboratoria);
})
}
window.computeStudentsStats= (laboratoria) => {
  campus = campusBox.value.toLowerCase();
  console.log (campus);
  generation = generationBox.value.toLowerCase();
  console.log (generation);
  for (let valor in laboratoria[campus].generacion[generation].estudiantes){
    console.log(valor);
    name = laboratoria[campus].generacion[generation].estudiantes[valor].nombre;
    console.log(name)
    email = laboratoria[campus].generacion[generation].estudiantes[valor].correo;
    console.log(email)
    completedPercentage = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.porcentajeCompletado);
    console.log(completedPercentage)
    if(completedPercentage <= 60){
      status = "< 60";
    } else if (completedPercentage >= 61 || completedPercetage <= 89){
      status = "media";
    } else if (completedPercentage >= 90){
      status = "> 90";
    }
    console.log (status)

    for (let tema in laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas) {
      topics = tema;
      console.log (topics)
      completedPercentageTema = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].porcentajeCompletado);
      console.log (completedPercentageTema)
      percentageDuration = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].duracionTemaCompletado);
      console.log (percentageDuration)
      percentageDurationTema = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].duracionTema);
      console.log (percentageDurationTema)
      percentageDuration = Math.round((percentageDuration * 100) / percentageDurationTema);
      console.log (percentageDuration)

      for (let subtema in laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].subtemas) {
        subtopics = subtema;
        console.log (subtopics)
        type = laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].subtemas[subtema].tipo;
        console.log(type)
        // solicitan un dato que es el porcentaje de completitud, pero solo viene si se completo o no es decir que apareceria 100% o 0%?
        let complete =  parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].subtemas[subtema].completado);
        duration = laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].subtemas[subtema].duracionSubtema;
          if (complete === 1) {
            duration = 0;
          } else {
            duration = duration;
          }
          console.log (duration)
        }
      }
      stats.students.push({
        "name" : name,
        "email" : email,
        "campus" : campus,
        "generation" : generation,
        "stats" : {
          "status" : status,
          "completedPercentage" : completedPercentage,
          "topics": {
            "temas":{
              "01-Introduccion-a-programacion": {
                "completedPercentageTema" : completedPercentageTema,
                "percentageDurationTema" : percentageDurationTema,
                "subtopics" : {
                  "00-bienvenida-orientacion" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "01-desarrollo-profesional" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "02-por-que-aprender-a-programar" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "03-tu-primer-sitio" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "04-quiz" : {
                    "type" : type,
                    "duration" : duration
                  }
                }
              },

              "02-Variables-y-tipo-de-datos": {
                "completedPercentageTema" : completedPercentageTema,
                "percentageDurationTema" : percentageDurationTema,
                "subtopics": {
                  "00-bienvenida-orientacion" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "01-desarrollo-profesional" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "02-por-que-aprender-a-programar" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "03-tu-primer-sitio" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "04-quiz" : {
                    "type" : type,
                    "duration" : duration
                  }
              }
            },
              "03-UX":{
                "completedPercentageTema" : completedPercentageTema,
                "percentageDurationTema" : percentageDurationTema,
                "subtemas":{
                  "00-bienvenida-orientacion" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "01-desarrollo-profesional" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "02-por-que-aprender-a-programar" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "03-tu-primer-sitio" : {
                    "type" : type,
                    "duration" : duration
                  },
                  "04-quiz" : {
                    "type" : type,
                    "duration" : duration
                  }
              }
            }
        }
    }
    }
  });
}
    console.log (stats.students)

}



///////////////////////////////////////////////////////////////////////// Función computeGenerationStats(laboratoria)
function getData1() {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      computeGenerationsStats(laboratoria);

})
};

window.computeGenerationsStats = (laboratoria) => {
  let campusDom = document.getElementById("campusPrint")
  let generationDom = document.getElementById("generationPrint")
  let studentsActDom = document.getElementById("e-active")
  let studentsDom = document.getElementById("studentsList")

    campus = campusBox.value.toLowerCase();
    //console.log (campus);
    generation = generationBox.value.toLowerCase();
    //console.log (generation)
    count = laboratoria[campus].generacion[generation].estudiantes.length;
    //console.log(count);
    for (let valor in laboratoria[campus].generacion[generation].estudiantes){
      average += parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.porcentajeCompletado);
      }
  average = Math.round((average / count));
  //console.log(average)
  computeGeneration.generation.push({"campus" : campus.toUpperCase(), "generation" : generation.toUpperCase(), "average" : average, "count" : count});
  //console.log(computeGeneration.generation[0].campus)

  campusDom.innerHTML = `<h4>${computeGeneration.generation[0].campus}</h4>`
  generationDom.innerHTML = `<h4>${computeGeneration.generation[0].generation} GENERACIÓN </h4>`
  studentsActDom.innerHTML = `
  <h5 class="center-align agrandar-fuente">${computeGeneration.generation[0].count}</h5>
  <h5 class="center-align">Estudiantes activas</h5>
  <br>
  <div class="progress">
    <div class="determinate" style="width: 75%" id="progreso"></div>
  </div>
  <h5 class="center-align">Avance general: ${computeGeneration.generation[0].average}%</h5>
  `


  return computeGeneration.generation;
};

//////////////////////////////////////////////////////////////////////////////// Función sortStudents

window.sortStudents = (students, orderBy, orderDirection) => {
  if (orderBy === "Nombre" && orderDirection === "Ascendente"){
    orderStats = stats.students.name.sort();
    console.log (orderStats)
  } else if (orderBy === "Nombre" && orderDirection === "Descendente"){
    stats.students.name.sort();
    orderStats = stats.students.name.reverse();
  } else if (orderBy === "Porcentaje" && orderDirection === "Ascendente") {
    function orderAsc(a,b){
    return a-b;
    }
      //Checar la ruta de acuerdo al objeto creado en la función 1
    orderStats = stats.students.completedPercetage.sort(orderAsc);
  } else if (orderBy === "Porcentaje" && orderDirection === "Descendente") {
    function orderAsc(a,b){
    return a-b;
  }
      //Checar la ruta de acuerdo al objeto creado en la función 1
      stats.students.completedPercetage.sort(orderAsc);
      Orderstats = stats.students.completedPercetage.reverse();
}
}

//////////////////////////////////////////////////////////////////////////////// Función filterStudents

window.filterStudents = (students, search) => {
  let searchStudents = stats.students.filter(function (el) {
    return (el.name == "Bernarda Natasha")
  });
console.log (searchStudents)
}
