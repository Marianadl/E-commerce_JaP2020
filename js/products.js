// Formato de const, var y functions tomado de categories.js y adaptado para los productos.
const ORDER_ASC_BY_PROD_COST = "Precio Asc";
const ORDER_DESC_BY_PROD_COST = "Precio Desc";
const ORDER_DESC_BY_SOLD_COUNT = "Vendidos";

var productsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var buscados = undefined; // Va a contener los prod de la busqueda.

function sortProducts(criteria, array){ 
    let result = [];
    if (criteria === ORDER_DESC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            console.log("Ordenando por precio descendentemente");
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PROD_COST){ // Basado en ORDER_BY_PROD_COUNT de categories.js
        result = array.sort(function(a, b) {    // en categories.js ordena de mayor a menor cantidad de articulos
            let aCost = parseInt(a.cost);       // adaptada para que ordene de menor a mayor costo del producto
            let bCost = parseInt(b.cost);
            console.log("Ordenando por precio ascendentemente");
            if ( aCost > bCost ){ return 1; } // en categories.js es -1
            if ( aCost < bCost ){ return -1; } // en categories.js es 1
            return 0;
        });
        }else if (criteria === ORDER_DESC_BY_SOLD_COUNT){
            result = array.sort(function(a, b) {
                console.log("Ordenando por cantidad de articulos vendidos");
                if ( a.soldCount > b.soldCount ){ return -1; }
                if ( a.soldCount < b.soldCount ){ return 1; }
                return 0;
            });
        }
    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        //Condicional para filtro de busqueda segun nombre y/o descripción
        if (((buscados == undefined) || (product.name.toUpperCase().indexOf(buscados) !== -1) || (product.description.toUpperCase().indexOf(buscados) !== -1)) //Se agrega condición para buscador
        &&((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        htmlContentToAppend +=
            `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +` - `+ product.currency +` `+ product.cost + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                            <p class="mb-1"> <br> ` + product.description + ` </p>
                    </div>
                </div>
            </a>
            `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    
        }
    }

        function sortAndShowProducts(sortCriteria, newProductsArray){
            currentSortCriteria = sortCriteria;
        
            if(newProductsArray != undefined){
                productsArray = newProductsArray;
            }
        
            productsArray = sortProducts(currentSortCriteria, productsArray);
        
            //Muestro las categorías ordenadas
            showProductsList();
        }


        function buscar() { //Función buscar para keyup en input type search, muestra lista de productos que coincidan con la busqueda
            buscados = document.getElementById("buscador").value.toUpperCase();
            showProductsList();
        }
    
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_DESC_BY_PROD_COST, resultObj.data);
        }
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_COST);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PROD_COST);
    });
    
    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
    });

    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });   
    
    // Toma el usuario ingresado y lo muestra en la barra nav
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML =  usuario;
});
