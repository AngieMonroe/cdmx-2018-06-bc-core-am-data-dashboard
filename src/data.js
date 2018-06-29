//Una vez que elige la sede y la generación se carga la información de acuerdo a estos parametros
//Necesito identificar el elemento para poder extraer la información con este primer parametro
//Necesito identificar la generacion para extraer la información con el segundo parametro
const link = "https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json"
let campus = document.getElementById("campus");
let generation = document.getElementById("generation");
let average = document.getElementById("average");
let count = document.getElementById("acount");
let students = document.getElementById("students");


//disparar la función computeGenerationStats
//traer los valores de campus y generation
//Debo entrar al objeto, sede, generacion, estudiantes
//estudiantes es un array de objetos debo entrar a la propiedad
//progreso agarro su valor y lo sumo el de todas las estudiantes
// con esta suma saco el promedio que será la propiedad (average) del nuevo objeto.



//////////////////////////////////////////// Función computeGenerationStats(laboratoria)
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
  campus = sede.value;
  console.log (campus);
  generation = generacion.value;
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
    console.log(computeGeneration.generation);
};
