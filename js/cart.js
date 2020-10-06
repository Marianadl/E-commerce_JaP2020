var articulo = [];

function mostrarArticulos(articulo) {
    let toBuy = document.getElementById("table-body");
    let toBuyAppend = "";

    //Aca poner un loop para agregar row de artículo
    for (art of articulo) {
        toBuyAppend += ` 
        <!-- Contenido de la tabla de artículos-->
        <tr>
        
        <!-- Imágen del artículo -->
        
        <td>
        <img src=" ${art.src}" alt="Imagen del artículo" class="img-thumbnail">
        </td>
        
        <!-- Nombre del artículo -->
        <td  style="vertical-align: middle;">
        <h5>
         <strong> ${art.name}</strong>
        </h5>
        </td>
        
        <!-- Precio del artículo -->
        <td  style="vertical-align: middle;"><h5>${art.currency}  ${art.unitCost}</h5></td>
        <!--Cantidad -->
        <td  style="vertical-align: middle;">
         <input type="number" value="${art.count}"aria-lable="Search" class="form-control" style="width: 100px; margin:auto; text-align:center;">
         </td>
        <!-- Subtotal -->
        <td class="font-weight-bold"  style="vertical-align: middle;">
        <h5><strong>${art.currency} ${art.count * art.unitCost}</strong> 
        <!-- Sacar del carrito --> 
        <button type="button" class="btn btn-primary float-right" data-toggle="tooltip" title="Eliminar artículo" style="background-color: #d33a57; border-color: #ec9ca7;">x
        </button></h5>
        </td>
        
        
        `
    }
    toBuy.innerHTML = toBuyAppend;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //fetch para mostrar info carrito
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var articulo = resultObj.data;
            mostrarArticulos(articulo.articles);
        }
    })
    // Toma el usuario ingresado y lo muestra en la barra nav
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML = usuario;
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("ingreso").innerHTML += ` <img src=" ` + localStorage.getItem("avatar") + ` " width="15" class="rounded-circle m-2">`;
    } else {
        document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> ';
    };
});