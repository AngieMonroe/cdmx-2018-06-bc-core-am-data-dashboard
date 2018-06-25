const link = "https://angiemonroe.github.io/cdmx-2018-06-bc-core-am-data-dashboard/data/laboratoria.json"
function getData() {
  fetch(link)
    .then(response => response.json())
    .then(laboratoria => {
      console.log(laboratoria);
})
}

//comentario
