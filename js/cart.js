//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // Toma el usuario ingresado y lo muestra en la barra nav
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML = usuario;
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("ingreso").innerHTML += ` <img src=" ` + localStorage.getItem("avatar") + ` " width="15" class="rounded-circle m-2">`;
    } else {
        document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> ';
    };

    // fetch para obtener info del JSON
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArticulos = resultObj.data;
            articulos = cartArticulos.articles;

            //Guardarlo en localStorage
            localStorage.setItem('articulos', JSON.stringify(articulos));

            //Funcion para mostrarlo
            mostrarArticulos(articulos);
        }
    });
});

const MONEDA = "USD";
const COTIZACION_MND = 40;
var articulos = [];

//funcion para mostrar los articulos en el carrito y la tabla de totales y envío.
function mostrarArticulos(articulos) {
    let toBuyAppend = "";
    cartList = document.getElementById('cart-info-container');
    let finalCostData = "";
    finalCost = document.getElementById('final-cost-info');




    for (let i = 0; i < articulos.length; i++) {
        let art = articulos[i];

        if (i === 0) {
            toBuyAppend += `
             <!-- Encabezado de la tabla-->
                    <thead class="thead-light" style="text-align: center;">
                        <tr>
                             <th scope="col"></th>
                            <th scope="col" class="font-weight-bold">
                                <strong> Artículo </strong>
                            </th>
                            <th scope="col" class="font-weight-bold">
                                <strong>Precio</strong>
                            </th>
                            <th scope="col" class="font-weight-bold">
                                <strong>Cantidad</strong>
                            </th>
                            <th scope="col" class="font-weight-bold">
                                <strong>Subtotal</strong>
                            </th>
                            <th style="width:5%";></th>
                        </tr>
                    </thead>
                <!--Termina encabezado de la tabla-->`
        }

        toBuyAppend += `
            <tbody style="text-align: center";>
                
            <!-- Contenido de la tabla de artículos-->
                <tr>
            
            <!-- Imágen del artículo -->
                    <td>
                        <img src = " ${art.src}" alt="Imagen del articulo" class="img-thumbnail">
                    </td>
            
            <!-- Nombre del artículo -->
                    <td style=  "vertical-align: middle";>
                        <h5 ><strong> ${art.name} </strong></h5>
                    </td>

            <!-- Precio del artículo -->
                    <td style = "vertical-align: middle";>
                        <h5>${art.currency}</h5><h4><strong>  ${art.unitCost} </strong></h4>
                    </td>
            
            <!--Cantidad -->
                    <td style = "vertical-align: middle";>
                        <input id="qty${i}" onchange="qtyChange(${i})"type="number" min="1" value="${art.count}" aria-label="Cantidad de articulos" class="form-control" style="width: 40%; margin:auto; text-align: center;">  
                    </td>

            <!-- Subtotal -->
                <td style="vertical-align: middle">
                    <h4>${MONEDA}</h4><h4 id="subtotalArticulo${i}"><strong>${subtotalArt(i)}</strong></h4>
                </td>

            <!-- Sacar del carrito -->
                    <td style="vertical-align: middle;">
                    <button onclick="${limpiarCarrito(i)}" type="button" class="btn btn-primary float-right" data-toggle="tooltip" title="Eliminar artículo" style="background-color: #d33a57; border-color: #ec9ca7;"><i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    </td>
            
            </tr>

</div>
            
            </tbody>
            
            

        `


        finalCostData = `
        
        <br>   
        <tbody>
            
            
            <!-- Subtotales -->
            <tr>
                <td style="vertical-align: middle";>
                <h5 style="text-align: center">Subtotal</h5>
                </td>
                <td class="text-right">
                <h5 style="text-align: center">${MONEDA}</h5><h4 style="text-align: center" id="subtotalFinal"><strong>${subtotal(i)}</strong> </h4>
               </td>
            </tr>

            <!-- Metodo de envío -->
            <tr id="shipping">
            </tr>
            <tr>
                <td colspan="2" style="vetical-align: middle";>
                
                <form  class="was-validated">
                        <select id="optionSelected" class="custom-select" required>
                            <option value="" >Seleccione tipo de envío</option>
                            <option value="Premium">Premium (2-5 días) - Costo del 15% sobre el subtotal</option>
                            <option value="Express">Express (5-8 días) - Costo del 7% sobre el subtotal</option>
                            <option value="Standard">Standard (12 a 15 días) - Costo del 5% sobre el subtotal</option>
                        </select>
                        <div class="invalid-feedback">Debe seleccionar un método de envío para finalizar la compra</div>
                    </form>
                </td>
            
            </tr>
           
            <!-- Total -->
            <tr id="total" class="table-success">
                   
            </tr>
            <!-- Finalizar compra -->
            <tr>
            <td colspan="2" style="vertical-align:middle; text-align:center;">
            <button type="button" id="finalizarBtn" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" style="width: 80%; background-color: #d33a57; border-color: #ec9ca7;"  disabled> 
  Finalizar compra</button>
  <div id="finalModal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="Mensaje: Muchas gracias por su compra" aria-hidden="true" >
  <div class="modal-dialog modal-sm modal-dialog-centered" >
    <div class="modal-content" >
    <div class="modal-header" >
    <h5 class="modal-title" >Checkout finalizado</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  ¡Gracias por su compra!
  </div>
    </div>
  </div>
</div>
  </td>
            </tr>
            </tbody>
            `

    }
    cartList.innerHTML += toBuyAppend;
    finalCost.innerHTML += finalCostData;
    shipSelect(); // Ejecuto funcion que toma valor del tipo de envío seleccionado. Tengo que ejecutarla despues de que ya está finalCostData en finalCost para que tome el id del select.
    newBadge();


}

// funcion para calcular el subtotal del articulo. 
function subtotalArt(i) {

    convPrecio(i); //para que haga conversion de moneda
    subtotaldeArt = parseInt(articulos[i].count) * parseInt(nvoPrecio); //cantidad del articulo * el precio en dolares
    console.log("Nro articulos:", articulos[i].count);
    console.log("Precio unitario:", nvoPrecio);
    console.log("Subtotal de producto:", subtotaldeArt)
    return subtotaldeArt;
}

//funcion para convercion de moneda dolares y //calculo de subtotal de cada articulo(es anterior a la funcion subtotalArt)
function convPrecio(i) {
    let art = articulos[i]

    //nvoPrecio es el subtotal de cada producto (Cantidad * precio unitario)
    if (art.currency !== MONEDA) {
        nvoPrecio = (art.unitCost / COTIZACION_MND); // * art.count;
    } else {
        nvoPrecio = art.unitCost; // * art.count;
    }
    return nvoPrecio;
}

//funcion para calcular la suma de los subtotales de cada articulo
function subtotal(i) {
    var subTotal = 0;
    for (j = 0; j < articulos.length; j++) {
        subtotalArt(j); //invoco subtotalArt para que recorra el loop y por cada articulo haga conversion de moneda con convPrecio() y calcule subtotal de producto
        console.log("Subtotal de articulo en subtotal(i):", subtotaldeArt)
        subTotal += subtotaldeArt;
    }
    return subTotal;
}

//funcion para onchange del input de cantidad
function qtyChange(i) {
    let art = articulos[i]
    let qty = document.getElementById("qty" + i).value;
    art.count = parseInt(qty);
    console.log(qty);
    subtotalArt(i) //llamo funcion para calcular el subtotal del art
    document.getElementById("subtotalArticulo" + i).innerHTML = ` <strong>${subtotalArt(i)}</strong>  `
    subtotal(i);
    document.getElementById("subtotalFinal").innerHTML = ` <strong>${subtotal(i)}</strong> `
    localStorage.setItem('articulos', JSON.stringify(articulos));
    return qty;
}



//shipSelect() se ejecuta despues de cargadas las tablas para poder obtener el valor del select 
function shipSelect() {
    valorSeleccionado = '';
    valorEnvio = 0;
    envioAppend = "";
    optionSelected = document.getElementById("optionSelected"); //Obtengo el select con su id.
    optionSelected.onchange = function () {
        tipoSeleccionado()
    }; //Cuando selecciono un tipo de envío se ejecuta la funcion tipoSeleccionado()


    // calcula el valor de envio (% del subtotal * subtotal) segun el radio button seleccionado
    function tipoSeleccionado(i) {
        console.log("Tipo de envío seleccionado:", optionSelected.value)
        valorSeleccionado = optionSelected.value
        switch (valorSeleccionado) {
            case "Premium":
                valorEnvio = 0.15 * subtotal(i)
                break;
            case "Express":
                valorEnvio = 0.07 * subtotal(i)
                break;
            case "Standard":
                valorEnvio = 0.05 * subtotal(i)
                break;
        }
        console.log(valorEnvio.toFixed(2))
        console.log(subtotal(i))

        //envioAppend dentro de tipoSeleccionado() para que modifique la tabla solo cuando ya seleccioné el envio
        envioAppend = `
        <tr id="shipping">
        <td style="vertical-align: middle";>
        <h6 style="text-align: center">Costo de envio</h6>
        </td>
        <td class="text-right">
        <h5 style="text-align: center">${MONEDA}</h5> <h5 style="text-align: center"><strong>${valorEnvio.toFixed(0)}</strong></h5>
       </td> 
            </tr>
               `

        document.getElementById("shipping").innerHTML = envioAppend;
        total(); //ejecuto funcion total() para que muestre el monto de subtotal + envio cuando se seleccione el tipo de envio
        document.getElementById("finalizarBtn").disabled = false;
        $('#finalModal').modal ({
            
        })
        return valorEnvio;
    }

}

//funcion para calcular el monto final (subtotal final + valor de envio). Se ejecuta una vez seleccionado el tipo de envio
function total(i) {
    displayTotal = "";
    montoTotal = 0;
    montoTotal = (subtotal(i) + parseInt(valorEnvio));

    displayTotal = `
        <td style="vertical-align: middle";>
                    <h5 style="text-align: center"><strong>Total</strong></h5>
                </td>
                <td style="text-align: center">
                    <h5>${MONEDA}</h5><h4 style="text-align: center"><strong>${montoTotal}</strong></h4>
        </td> 
    `
    document.getElementById("total").innerHTML = displayTotal;
    return montoTotal;
}

function newBadge() {
    listaProd = localStorage.getItem('articulos');
    listaProd = JSON.parse('articulos');

    let prodEnBadge = 0;
    for (i = 0; i < listaProd.length; i++) {
        let art = listaProd[i];
        prodEnBadge += art.count;
    }
    console.log("Cantidad prod para badge:", prodEnBadge)
    document.getElementById("prodBadge").innerHTML = prodEnBadge;
}

function limpiarCarrito(i) {
    //Usar splice.
}