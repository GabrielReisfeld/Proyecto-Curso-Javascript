let carrito = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    document.getElementById("contador").innerHTML = carrito.length;
}

function Carrito (){
    this.agregarAlCarrito = function (auto){
    carrito.push(auto);
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let totalPrecio = 0;
    for (let i = 0; i < carrito.length; i++) {
        totalPrecio += carrito[i].precio;
    }
    document.getElementById("precioTotal").innerHTML = "$" + totalPrecio;
    document.getElementById("contador").innerHTML = carrito.length;
    }
    return this.agregarAlCarrito;
}



function Auto (marcaAuto, precioAuto, cantidadAuto, imagenAuto) {
    this.marca = marcaAuto;
    this.precio = precioAuto;
    this.cantidad = cantidadAuto;
    this.imagen = imagenAuto;
    }


let baseDeDatos = [];

let autoUno = new Auto ("Volkswagen", 200000, 10, "https://acs2.blob.core.windows.net/imgcatalogo/xl/VA_649edb2ba92f46c198283922d928ac0d.jpg");
let autoDos = new Auto ("Peugeot", 220000, 15, "https://www.autobild.es/sites/autobild.es/public/dc/fotos/Peugeot-RCZR_2014_C01_0.jpg");
let autoTres = new Auto ("Ford", 250000, 8, "https://www.megautos.com/wp-content/uploads/2017/11/Ford-Fiesta-2018-Brasil-dinamica.jpg");
let autoCuatro = new Auto ("Fiat", 120000, 20, "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/m/RT_V_c43e6bc0fe8048b092fad3412a5764f0.jpg");
let autoCinco = new Auto ("Audi", 500000, 4, "https://images.clarin.com/2017/07/20/BJ_t9I0S-_1256x620.jpg");
let autoSeis = new Auto ("Hyundai", 350000, 6, "https://i.blogs.es/7fc3ee/hyundai-i10-2016-110/1366_2000.jpg");
    
baseDeDatos.push(autoUno);
baseDeDatos.push(autoDos);
baseDeDatos.push(autoTres);
baseDeDatos.push(autoCuatro);
baseDeDatos.push(autoCinco);
baseDeDatos.push(autoSeis);

let mostrarAuto = ``;
for (let i = 0; i < baseDeDatos.length; i++){
    if (baseDeDatos[i].cantidad > 0) {
        mostrarAuto += `
        <div class="card">
				<img src="${baseDeDatos[i].imagen}" alt="">
                <div class="botones">
                    <h3>${baseDeDatos[i].marca}</h3>
                    <h3>$${baseDeDatos[i].precio}</h3>
                    <button onclick='Carrito.agregarAlCarrito(${JSON.stringify(baseDeDatos[i])})'>Comprar Auto</button>
				</div>
		</div>
        `
    } else {
        mostrarAuto += `
        <h3>No hay stock</h3>
        `
    }
}

//document.getElementById("autos").innerHTML = mostrarAuto;
$("#autos").html(mostrarAuto);

/*function agregarAlCarrito (auto) {
    carrito.push(auto);
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let totalPrecio = 0;
    for (let i = 0; i < carrito.length; i++) {
        totalPrecio += carrito[i].precio;
    }
    document.getElementById("precioTotal").innerHTML = "$" + totalPrecio;
    document.getElementById("contador").innerHTML = carrito.length;
}*/

