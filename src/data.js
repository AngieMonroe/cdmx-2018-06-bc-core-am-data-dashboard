//Una vez que elige la sede y la generación se carga la información de acuerdo a estos parametros
//Necesito identificar el elemento para poder extraer la información con este primer parametro
//Necesito identificar la generacion para extraer la información con el segundo parametro
const link = "https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json"
let campus = document.getElementById("campusBox");
let generation = document.getElementById("generationBox");
let average = document.getElementById("average");
let count = document.getElementById("acount");
let name = "";
let email = "";
let completedPercentage = 0;
let completedPercentageTema = 0;
let percentageDuration = 0;
let percentageDurationTema = 0;
let type = 0;
let duration = 0;
let completedPercentageGeneral = 0;

////////////////////////////////////////////////////////////////////////////// Función computeStudentsStats(laboratoria)
function getData() {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      computeStudentsStats(laboratoria);
})
}
window.computeStudentsStats= (laboratoria) => {
  campus = campusBox.value;
  console.log (campus);
  generation = generationBox.value;
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
      //preguntarle a alguien que pedo
      console.log (tema)
      completedPercentageTema = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].porcentajeCompletado);
      console.log (completedPercentageTema)
      percentageDuration = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].duracionTemaCompletado);
      console.log (percentageDuration)
      percentageDurationTema = parseInt(laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].duracionTema);
      console.log (percentageDurationTema)
      percentageDuration = Math.round((percentageDuration * 100) / percentageDurationTema);
      console.log (percentageDuration)



      for (var subtema in laboratoria[campus].generacion[generation].estudiantes[valor].progreso.temas[tema].subtemas) {
        console.log (subtema)
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
      stats.students.push({"name" : name, "email" : email, "campus" : campus, "generation" : generation});
    }
    //stats.topics.push({"status" : status, "completedPercentage" : completedPercentage});
    //stats.subtopics.push({"type" : type, "duration" : duration });
    console.log (stats.students)
  };




///////////////////////////////////////////////////////////////////////// Función computeGenerationStats(laboratoria)
function getData1() {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      computeGenerationsStats(laboratoria);
})
}

window.computeGenerationsStats = (laboratoria) => {
  const computeGeneration = {
     "generation" : []
  }
    campus = campusBox.value;
    console.log (campus);
    generation = generationBox.value;
    console.log (generation);
    students = laboratoria[campus].generacion[generation];
    count = students.estudiantes.length;
    console.log(count);
    for (let valor in laboratoria[campus].generacion[generation].estudiantes){
      average += parseInt(students.estudiantes[valor].progreso.porcentajeCompletado);
      }
  average = Math.round((average / count));
  console.log(average)
  computeGeneration.generation.push({"campus" : campus, "generation" : generation, "average" : average, "count" : count});
  console.log(computeGeneration.generation)
};
