var producto = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";
    // i = 1 para no repetir la img de portada
    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // getJSONData para mostrar info del producto
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            let prodName = document.getElementById("prodName");
            let frontImg = document.getElementById("frontImg"); // img de portada
            let prodTitle = document.getElementById("prodTitle");
            let venididos = document.getElementById("venididos");
            let prodDescr = document.getElementById("prodDescr");

            prodName.innerHTML = producto.name;
            frontImg.src = producto.images[0];
            prodTitle.innerHTML = producto.name + ' - ' + producto.currency + producto.cost;
            venididos.innerHTML = producto.soldCount + ' unidades vendidas';
            prodDescr.innerHTML = ` <br> ` + producto.description;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto.images);
        }
        // getJSONData para mostrar productos relacionados
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                var productos = resultObj.data;
                var productosRel = producto.relatedProducts;
                let prodRelAppend = "";
                let prodRel = document.getElementById("prodRel"); // Contenedor del html a agregar (prodRelAppend)

                // forEach method, por cada elemento del array productosRel ejecuta la funcion
                productosRel.forEach(function (e) {
                    let pRelacionado = productos[e];

                    //formato adaptado de cover.html
                    prodRelAppend += `
                   <div class="col-md-4">
                   <!--style min-height: 100% para que tengan tamaño uniforme y no en funcion de cantidad de texto -->
                        <a href="products.html" class="card mb-4 shadow-sm custom-card" style="min-height: 100%">
                            <img class="bd-placeholder-img card-img-top" src= "` + pRelacionado.imgSrc + `"  alt="Producto relacionado"> 
                            <h3 class="m-3">` + pRelacionado.name + `</h3>
                            <hr>
                            <div class="card-body" >
                                 <p class="card-text" style="width:100%;">` + pRelacionado.description + ` </p>
                                 <small class="text-muted"> ` + pRelacionado.soldCount + ` unidades vendidas </small>
                            </div>
                        </a>
                   </div>
                   `
                });
                //Agrego el html a el contenedor div
                prodRel.innerHTML += prodRelAppend;

            }
            // getJSONData para mostrar comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    const comentarios = resultObj.data;
                    let commentToAppend = " ";
                    let comments = document.getElementById("comments");

                    for (comentario of comentarios) {
                        commentToAppend += `
                        
                    <div class="list-group-item-action w-75 m-auto">
                    </br>
                    <div class="card p-3">
                        <div class="d-flex justify-content-between align-items-center">
                        <h5 class=font-weight-bold text-primary mb-1"> ` + comentario.user + ` : </h5>
                            <medium>` + showRating(comentario.score) + `</medium>
                       </div>
                       <p> ` + comentario.description + `</p>
                       <small class="text-muted mb-0"> ` + comentario.dateTime + `</small>
                    </div>
                    </div>`

                        // Funcion para mostrar estrellas
                        function showRating() {
                            starsRating = " ";
                                                                                  
                            for (y = 0; y < comentario.score; y++) {
                                starsRating += `<i class="fa fa-star" style="color: yellow;"></i>`
                            }
                            for (x = 0; x < (5 - comentario.score); x++) {
                                starsRating += `<i class="fa fa-star"></i>`
                            }
                            
                            return starsRating;
                        }
                    }
                    comments.innerHTML += commentToAppend;



                    // Toma el usuario ingresado y lo muestra en la barra nav
                    var usuario = localStorage.getItem("user");
                    document.getElementById("ingreso").innerHTML = usuario + ' <i class= "fa fa-caret-down"></i> ';
                };
            });
        });
    });
});