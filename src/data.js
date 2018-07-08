//Una vez que elige la sede y la generación se carga la información de acuerdo a estos parametros
//Necesito identificar el elemento para poder extraer la información con este primer parametro
//Necesito identificar la generacion para extraer la información con el segundo parametro
console.log("Esto jala")
const link = "https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json"
let campus = document.getElementById("campusBox");
let generation = document.getElementById("generationBox");
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
function getData1 () {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      computeStudentsStats(laboratoria);
})
}
window.computeStudentsStats= (laboratoria) => {
  campus = campusBox.value.toLowerCase();
  generation = generationBox.value.toLowerCase();
  for (let valor in laboratoria[campus].generacion[generation].estudiantes){
    name = laboratoria[campus].generacion[generation].estudiantes[valor].nombre;
    email = laboratoria[campus].generacion[generation].estudiantes[valor].correo;
    completedPercentage = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.porcentajeCompletado);
    if(completedPercentage <= 60){
      status = "Deficiente";
    } else if (completedPercentage >= 61 || completedPercetage <= 89){
      status = "Promedio";
    } else if (completedPercentage >= 90){
      status = "Sobresaliente";
    }
    topics = laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas;

    stats.students.push({
      "name" : name,
      "email" : email,
      "campus" : campus,
      "generation" : generation,
      "stats" : {
        "status" : status,
        "completedPercentage" : completedPercentage,
        "topics": { topics
      }
    }
   });
  }
  stats.students.forEach(function(element){
    for (var variable in element.stats.topics.topics) {
      element.stats.topics.topics[variable].completedPercetageTema = element.stats.topics.topics[variable].porcentajeCompletado
      delete element.stats.topics.topics[variable].porcentajeCompletado
      percentageDuration = parseInt(element.stats.topics.topics[variable].duracionTemaCompletado);
      percentageDurationTema = parseInt(element.stats.topics.topics[variable].duracionTema);
      percentageDuration = Math.round((percentageDuration * 100) / percentageDurationTema);
      element.stats.topics.topics[variable]["percentageDurationTema"] = percentageDuration
      delete element.stats.topics.topics[variable].duracionTema
      delete element.stats.topics.topics[variable].duracionTemaCompletado

      for (var variable2 in element.stats.topics.topics[variable].subtemas) {
        completedPercentage =  parseInt(element.stats.topics.topics[variable].subtemas[variable2].completado);
        element.stats.topics.topics[variable].subtemas[variable2].duration = element.stats.topics.topics[variable].subtemas[variable2].duracionSubtema
        duration = element.stats.topics.topics[variable].subtemas[variable2].duracionSubtema;
          if (complete === 1) {
            duration = 0;
          } else {
            duration = duration;
          }

          if(completedPercentage === 1){
            completedPercentage = 100;
          } else {
            completedPercentage = 0;
          }

      element.stats.topics.topics[variable].subtemas[variable2].type = element.stats.topics.topics[variable].subtemas[variable2].tipo
      delete element.stats.topics.topics[variable].subtemas[variable2].tipo
      delete element.stats.topics.topics[variable].subtemas[variable2].duracionSubtema
    }
    }
  })
  console.log (stats.students);

return stats.students;
};


///////////////////////////////////////////////////////////////////////// Función computeGenerationStats(laboratoria)
function getData() {
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
    generation = generationBox.value.toLowerCase();
    count = laboratoria[campus].generacion[generation].estudiantes.length;
    average = 0;
    for (let valor in laboratoria[campus].generacion[generation].estudiantes){
      average += parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.porcentajeCompletado);
      }
  average = Math.round((average / count));
  computeGeneration.generation.push({"campus" : campus.toUpperCase(), "generation" : generation.toUpperCase(), "average" : average, "count" : count});



  campusDom.innerHTML = `<h4>${computeGeneration.generation[0].campus}</h4>`
  generationDom.innerHTML = `<h4>${computeGeneration.generation[0].generation} GENERACIÓN </h4>`
  studentsActDom.innerHTML = `
  <h5 class="parrafos center-align agrandar-fuente">${computeGeneration.generation[0].count}</h5>
  <p class=" font-rem2 parrafos center-align">Estudiantes activas</p>
  <div class="progress">
    <div class="determinate" style="width: 75%" id="progreso"></div>
  </div>
  <p class="font-rem2 parrafos center-align">Avance general: ${computeGeneration.generation[0].average}%</p>
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
