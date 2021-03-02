let carrito = {}
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarEnCarrito()
    }
})

const fetchData = async () => {
    try {
        const res = await fetch('JS/api.json');
        const data = await res.json()
        mostrarConsolas(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}

const contenedorConsolas = document.querySelector('#contenedor-consolas')
let mostrarConsolas = (data) => {
    const template = document.querySelector('#template-consolas').content
    const fragment = document.createDocumentFragment()
    data.forEach(consolas => {
        template.querySelector('img').setAttribute('src', consolas.imagen)
        template.querySelector('h3').textContent = consolas.nombre
        template.querySelector('h5').textContent = "US$ " + consolas.precio
        template.querySelector('small').textContent = consolas.anio
        template.querySelector('button').dataset.id = consolas.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorConsolas.appendChild(fragment)
}

let detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const consolas = data.find(item => item.id === parseInt(btn.dataset.id))
            consolas.cantidad = 1
            if(carrito.hasOwnProperty(consolas.id)) {
                consolas.cantidad = carrito[consolas.id].cantidad + 1
            }
            carrito[consolas.id] = {...consolas}
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consola Agregada al Carrito',
                showConfirmButton: false,
                timer: 1000
              })
            mostrarEnCarrito()
        })
    })
}

const items = document.querySelector('#items')
let mostrarEnCarrito = () => {
    items.innerHTML = ''
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    Object.values(carrito).forEach(consolas => {
        template.querySelector('th').textContent = consolas.id
        template.querySelectorAll('td')[0].textContent = consolas.nombre
        template.querySelectorAll('td')[1].textContent = consolas.cantidad
        template.querySelectorAll('td')[3].textContent = "US$ " + consolas.precio * consolas.cantidad
        template.querySelector('.btn-success').dataset.id = consolas.id
        template.querySelector('.btn-danger').dataset.id = consolas.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    }) 
    items.appendChild(fragment)

    mostrarTotalCarrito()
    accionBotones()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const footer = document.querySelector('#footer-carrito')
let mostrarTotalCarrito = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    } 
    const template = document.querySelector('#template-carrito-total').content
    const fragment = document.createDocumentFragment()
    let nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    let nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio , 0)
    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El Carrito fue Vaciado',
            showConfirmButton: false,
            timer: 1000
          })
        mostrarEnCarrito()
    })
}

let accionBotones = () => {
    const botonSumar = document.querySelectorAll('#items .btn-success')
    const botonRestar = document.querySelectorAll('#items .btn-danger')
    botonSumar.forEach(btn => {
        btn.addEventListener('click', () => {
            let consolas = carrito[btn.dataset.id]
            consolas.cantidad ++
            carrito[btn.dataset.id] = {...consolas}
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consola Agregada al Carrito',
                showConfirmButton: false,
                timer: 1000
              })
            mostrarEnCarrito()
        })
    })
    botonRestar.forEach(btn => {
        btn.addEventListener('click', () => {
        let consolas = carrito[btn.dataset.id]
        consolas.cantidad --
        if (consolas.cantidad === 0) {
            delete carrito[btn.dataset.id]
        } else {
            carrito[btn.dataset.id] = {...consolas}
        }
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Consola Eliminada del Carrito',
            showConfirmButton: false,
            timer: 1000
          })
        mostrarEnCarrito()
        })
    })
}

// SCROLLEAR ARRIBA
$('a').click( function() {
    $('html, body').animate({
        scrollTop: $("#top").offset().top  
    }, 2000);
} );