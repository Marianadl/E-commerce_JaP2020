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

    getJSONData(COUNTRIES).then(function (resultObj) {
        if (resultObj.status === "ok") {
            countriesList = resultObj.data
            var opcionPais = ``;
            for (pais of countriesList) {
                opcionPais += ` <option>${pais.name}</option>
            `}
            document.getElementById("selectCountry").innerHTML += opcionPais;
        }
    });
});

const MONEDA = "USD";
const COTIZACION_MND = 40;
var articulos = [];

//funcion para mostrar los articulos en el carrito y la tabla de totales y envío.
function mostrarArticulos() {
    localStorage.getItem("articulos");
    let toBuyAppend = `
    <!-- Encabezado de la tabla-->
    <thead style="text-align: center; background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(211,58,87,0.9500175070028011) 100%)">
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
    <!--Termina encabezado de la tabla--> `;

    cartList = document.getElementById('cart-info-container');
    let finalCostData = "";
    finalCost = document.getElementById('final-cost-info');

    for (let i = 0; i < articulos.length; i++) {
        let art = articulos[i];
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
                    <button type="button" onclick="limpiarCarrito(articulos, ${i});" class="btn btn-primary float-right" data-toggle="tooltip" title="Eliminar artículo" style="background: linear-gradient(to right, #ec9ca7, #d33a57); border-color: #d33a57"><i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    </td>
            
            </tr>

</div>
            
            </tbody>
            
            

        `

        finalCostData = `
           
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
                <br>
                       <div class="form-group">
                        <select id="optionSelected" class="custom-select" required>
                            <option disabled selected value="" >Seleccione tipo de envío</option>
                            <option value="Premium">Premium (2-5 días) - Costo del 15% sobre el subtotal</option>
                            <option value="Express">Express (5-8 días) - Costo del 7% sobre el subtotal</option>
                            <option value="Standard">Standard (12 a 15 días) - Costo del 5% sobre el subtotal</option>
                        </select>
                        <div class="invalid-feedback">Debe seleccionar un método de envío para finalizar la compra</div>
                        </div>
      
                        
                        <div class="form-row">
                            
                         <div class="form-group col-5" style="margin: auto;">
                            
                                <select id="selectCountry" class="custom-select" required>
                                <option value="">Seleccione país</option>
                                </select>
                         </div>

                        <div class="form-group col-5" style="margin: auto;">
                            <input type="text" class="form-control" id="localidad" placeholder="Localidad" aria-describedby="Localidad" required>
                            </div>
                            </div>
</br>
                           <div class="form-row">
                            
                        
                            <div class="form-group col-5" style="margin: auto;">
                            <input type="text" class="form-control" id="calle" placeholder="Calle" aria-describedby="Calle" required>
                            </div>

                            <div class="form-group col-5" style="margin: auto;">
                            <input type="number" class="form-control" id="numero" placeholder="Número" aria-describedby="Número" required>
                            </div>
                            </div>


                        </form>
                </td>
            
            </tr>
            
           
            <!-- Total -->
            <tr id="total" style="background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);">
                   
            </tr>
            <!-- Metodo de pago -->
            <tr id="pago">

            </tr>

            
            </tbody>
            `



    }
    cartList.innerHTML = toBuyAppend;
    finalCost.innerHTML = finalCostData;
    shipSelect(); // Ejecuto funcion que toma valor del tipo de envío seleccionado. Tengo que ejecutarla despues de que ya está finalCostData en finalCost para que tome el id del select.
    newBadge();
}

// funcion para calcular el subtotal del articulo. 
function subtotalArt(i) {

    convPrecio(i); //para que haga conversion de moneda
    subtotaldeArt = parseInt(articulos[i].count) * parseFloat(nvoPrecio); //cantidad del articulo * el precio en dolares
    console.log("Nro articulos:", articulos[i].count);
    console.log("Precio unitario:", nvoPrecio);
    console.log("Subtotal de producto:", subtotaldeArt)
    return subtotaldeArt;
}

//funcion para convercion de moneda dolares
function convPrecio(i) {
    let art = articulos[i]

    //nvoPrecio es el precio del art en dolares
    if (art.currency !== MONEDA) {
        nvoPrecio = (art.unitCost / COTIZACION_MND);
    } else {
        nvoPrecio = art.unitCost;
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
    subtotal(i); //invoco funcion para calcular la suma de los subtotales de art
    document.getElementById("subtotalFinal").innerHTML = ` <strong>${subtotal(i)}</strong> `
    localStorage.setItem('articulos', JSON.stringify(articulos));
    newBadge();
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
}

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

    //envioAppend dentro de tipoSeleccionado() para que modifique la tabla con los montos solo cuando ya seleccioné el envio
    envioAppend = `
        <tr id="shipping">
        <td style="vertical-align: middle";>
        <h6 style="text-align: center">Costo de envio</h6>
        </td>
        <td class="text-right">
        <h5 style="text-align: center">${MONEDA}</h5> <h5 style="text-align: center"><strong>${valorEnvio.toFixed(1)}</strong></h5>
       </td> 
            </tr>
               `

    document.getElementById("shipping").innerHTML = envioAppend;
    total(); //ejecuto funcion total() para que muestre el monto de subtotal + envio cuando se seleccione el tipo de envio


    return valorEnvio;
}

//funcion para calcular el monto final (subtotal final + valor de envio). Se ejecuta una vez seleccionado el tipo de envio
function total(i) {
    displayTotal = "";
    metodoPago = "";
    metodo = '';
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
    metodoPago = ` 
        <td colspan="2" style="vertical-align: middle; text-align: center;">
        <button disabled type="button" id="selectMetodoPagoBtn" data-target="#paymentModal" data-toggle="modal" class="btn btn-primary" style="width: 80%; background: linear-gradient(to right, #ec9ca7, #d33a57); border-color: #d33a57; text-align: center; vertical-align: middle;">
            <h5>Seleccione método de pago</h5>
        </button>

        <div class="modal fade bd-example-modal-lg" id="paymentModal" data-backdrop="static" data-keyboard="false" aria-labelledby="Ventana seleccion método de pago" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" ><strong>Seleccione método de pago</strong></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="paymentBody">
                        <form class="was-validated">
                            <div class="form-group">
                                <select class="form-control" id="pagoSeleccionado" required>
                                    <option value="" >Seleccione método de pago</option>
                                    <option value="crédito">Tarjeta de crédito</option>
                                    <option value="transferencia">Transferencia bancaria</option>
                                 </select>
                             <div class="invalid-feedback">Debe seleccionar un método de pago</div>
                            </div>
                        </form>  
                    </div>

                    <div class="modal-footer" id="footer" style="margin: auto;">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Volver al <i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>

        </td>
        `

    document.getElementById("total").innerHTML = displayTotal;
    document.getElementById("pago").innerHTML = metodoPago;
    document.getElementById("pagoSeleccionado").onchange = function () {
        pagoSeleccionado();
    } //Ejecuto funcion que muestra campos a completar segun el metodo de pago seleccionado

    return montoTotal;

}

//funcion para habilitar botón de método de pago cuando los campos están completos
window.onkeydown= function() {
    let selectCountry = document.getElementById("selectCountry"),
    localidad = document.getElementById("localidad"),
    calle = document.getElementById("calle"),
    numero = document.getElementById("numero");
    if (selectCountry.value != "" && localidad.value != "" && calle.value != "" && numero.value != "") {
        document.getElementById("selectMetodoPagoBtn").disabled = false
    } else { 
        document.getElementById("selectMetodoPagoBtn").disabled = true;
         }
}

//funcion para que cambie el contenido de la modal de metodo de pago según el metodo seleccionado
function pagoSeleccionado() {
    metodo = document.getElementById("pagoSeleccionado").value;
    if (metodo === "crédito") {
        document.getElementById("paymentBody").innerHTML = `
        <div>

        <form class="was-validated">
            <div class="form-group" >
                <select class="form-control" id="pagoSeleccionado" required>
                    <option value="" >Seleccione método de pago</option>
                    <option value="crédito" selected>Tarjeta de crédito</option>
                    <option value="transferencia">Transferencia bancaria</option>
                </select>
                <div class="invalid-feedback">Debe seleccionar un método de pago</div>
            </div>
        </form>

            <form class="was-validated" style="width: 80%; margin: auto;">
                <div class="form-row">
                    <div class="form-group col-6"  style="margin: auto;">
                        <label for="numTarjeta">Número de tarjeta</label>
                        <input type="number" class="form-control" id="numTarjeta" min="0" required>
                        <div class="invalid-feedback">Debe completar el campo</div>
                    </div>
                    <div class="form-group col-4"  >
                    <label for="cvv">CVV/CVC</label>
                    <input type="number" class="form-control" id="cvv" min="0" required>
                    <div class="invalid-feedback">Código requerido</div>
                </div>
                </div>
                </br>
                <div class="form-row">
                    <div class="form-group col-6" style="margin:auto;">
                        <label for="vence">Valido hasta:</label>
                        <input type="month" class="form-control" id="vence" min="2020-10" required>
                        </input>
                        <div class="invalid-feedback">Seleccione vencimiento</div>

                    </div>
                </div>
                </br>
                <button type="submit" id="finalizarBtn" onclick="swalAlert()" class="btn btn-primary" style="width: 80%; background: linear-gradient(to right, #ec9ca7, #d33a57); border-color: #d33a57 " > 
                    Finalizar compra
                </button>
            </form>
        </div>

        `
    } else if (metodo === "transferencia") {
        document.getElementById("paymentBody").innerHTML = `
        <div>

        <form class="was-validated">
            <div class="form-group" >
                <select class="form-control" id="pagoSeleccionado" required>
                    <option value="" >Seleccione método de pago</option>
                    <option value="crédito">Tarjeta de crédito</option>
                    <option value="transferencia" selected>Transferencia bancaria</option>
                </select>
                <div class="invalid-feedback">Debe seleccionar un método de pago</div>
            </div>
        </form>

            <form onsubmit="return false" class="was-validated" style="width: 80%; margin: auto;">
                <div class="form-row">
                    <div class="form-group col-9"  style="margin: auto;">
                        <label for="numCuenta">Número de cuenta</label>
                        <input type="number" class="form-control" id="numCuenta" min="0" required>
                        <div class="invalid-feedback">Debe completar el campo</div>
                    </div>
                </div>
                </br>
                <button type="submit" id="finalizarBtn" onclick="swalAlert()" class="btn btn-primary" style="width: 80%; background: linear-gradient(to right, #ec9ca7, #d33a57); border-color: #d33a57 "> 
                    Finalizar compra
                </button>

            </form>
        </div>

        `
    } else {
        document.getElementById("paymentBody").innerHTML = `
        
        <form class="was-validated">
                        <div class="form-group">
                            <select class="form-control" id="pagoSeleccionado" required>
                                <option value="" >Seleccione método de pago</option>
                                <option value="crédito">Tarjeta de crédito</option>
                                <option value="transferencia">Transferencia bancaria</option>
                             </select>
                         <div class="invalid-feedback">Debe seleccionar un método de pago</div>
                        </div>
                    </form>
    `

    }
    document.getElementById("pagoSeleccionado").onchange = function () {
        pagoSeleccionado();
    } //Para que se ejecute aún cuando cambio seleccion de metodo de pago luego de ya seleccionado otro anteriormente
}

//funcion sweet alert y redireccion cuando clickea finalizar compra y los campos de pago están completos
function swalAlert() {
    let numTarjeta = document.getElementById("numTarjeta"),
    cvv =  document.getElementById("cvv"),
    vence = document.getElementById("vence"),
    numCuenta = document.getElementById("numCuenta"); 
    if (numTarjeta != null && numTarjeta.value != "" && cvv != null && cvv.value != "" && vence != null && vence.value != "" ){
    Swal.fire({
        title: "Compra realizada con éxito",
        text: "Gracias por elegirnos",
        icon: "success",
      }).then(() => {
        location.href ="cover.html";
      })
    } else if (numCuenta != null && numCuenta.value != "") {
        Swal.fire({
            title: "Compra realizada con éxito",
            text: "Gracias por elegirnos",
            icon: "success",
          }).then(() => {
            location.href ="cover.html";
          })
     }
}

function newBadge() {
    localStorage.getItem('articulos');
    let prodEnBadge = 0;
    for (i = 0; i < articulos.length; i++) {
        let art = articulos[i];
        prodEnBadge += art.count;
    }
    console.log("Cantidad prod para badge:", prodEnBadge)
    document.getElementById("prodBadge").innerHTML = prodEnBadge;
}


function limpiarCarrito(articulos, posicion) {
    localStorage.getItem("articulos");
    articulos.splice(posicion, 1);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    mostrarArticulos(articulos);
    newBadge();
}