var cuerpoweb = document.body; 
var modocolor = localStorage.getItem("modo"); 
function cargarModo() {    
 
    if (modocolor === "claro") {
        cuerpoweb.classList.add("claro");
    } else {
        cuerpoweb.classList.add("oscuro");
    }
 
}
var btnpresionado = false; 
function cambiarModo() {
 
    if (btnpresionado) {
        cuerpoweb.classList.remove("claro");
        localStorage.setItem("modo", "oscuro");
        cuerpoweb.classList.add("oscuro");
        btnpresionado = false;
    } else { 
 
        if (modocolor === "claro") {
            resetear(); 
            btnpresionado = true;           
        } else {
 
            cuerpoweb.classList.remove("oscuro");
            localStorage.setItem("modo", "claro");
            cuerpoweb.classList.add("claro");        
            btnpresionado = true;
 
        }        
    }
}
function resetear() {
 
    localStorage.removeItem('modo');
    location.reload();
 
}
