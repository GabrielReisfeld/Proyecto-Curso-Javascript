function Auto (marcaAuto, precioAuto, cantidadAuto) {
    this.marca = marcaAuto;
    this.precio = precioAuto;
    this.cantidad = cantidadAuto;
}


let baseDeDatos = []

let autoUno = new Auto ("Volkswagen", 200000, 10);
let autoDos = new Auto ("Peugeot", 220000, 15);
let autoTres = new Auto ("Ford", 250000, 8);
let autoCuatro = new Auto ("Fiat", 120000, 20);
let autoCinco = new Auto ("Audi", 500000, 4);
let autoSeis = new Auto ("Hyundai", 3500000, 6);

baseDeDatos.push(autoUno);
baseDeDatos.push(autoDos);
baseDeDatos.push(autoTres);
baseDeDatos.push(autoCuatro);
baseDeDatos.push(autoCinco);
baseDeDatos.push(autoSeis);

console.log(baseDeDatos);


































