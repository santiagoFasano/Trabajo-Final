var urlApi = 'https://api.yumserver.com/16988/products';

function MostarMotos(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].titulo)
        html += `
        <tr>
            <td><b>${data[i].idcod}</b></td> 
            <td><b>${data[i].titulo}</b></td>   
            <td>${data[i].precioPeso}</td>
            <td>${data[i].precioDolar}</td>
            <td>${data[i].fecha}</td>
            <td><button class='btnborrar' data-id='${data[i].idcod}' type='button'>Borrar</button></td>
            <td><button class='btnmodificar' data-id='${data[i].idcod}' type='button' onclick='MostrarFormularioModificacion(${JSON.stringify(data[i])})'>Modificar</button></td>
        </tr>
        `;
    }
    document.getElementById('Resultados').innerHTML = html;
    let btneliminar = document.querySelectorAll('.btnborrar')
    btneliminar.forEach(element => {
        element.addEventListener('click', function() {
            let idCodd = this.getAttribute('data-id');
            BorrarProducto(idCodd);
        })
    });
}

function MostarMoto() {      
    fetch(urlApi)
    .then(response => response.json())
    .then(MostarMotos)
    .catch(error => console.error('Error:'))
}

function BorrarProducto(idcodigo) {
    if(confirm('¿¿¿Necesitas borrar la moto???')) {
        fetch(urlApi, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idcod: idcodigo,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('no se le respondio ok');
            }
            alert('!!!Moto Borrada!!!')
            MostarMoto();
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.log('!!!Cancelado el borrado!!!');
        alert('!!!Cancelado el borrado!!!')
    }
}

function CargarMoto() {
    const confirmacion = confirm('¿¿¿Confirmar si desea cargar la moto???');
    if(confirmacion) {
        const titulo = document.getElementById('Moto').value;
        const precioPeso = document.getElementById('Precioenpesos').value;
        const precioDolar = document.getElementById('Precioenusd').value;
        const fecha = document.getElementById('Fecha').value;

        fetch(urlApi, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                titulo: titulo,
                precioPeso: precioPeso,
                precioDolar: precioDolar,
                fecha: fecha,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('no se le respondio ok');
            }
            alert('!!!Moto guardada!!!')
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.log('!!!Cancelada la carga!!!'); 
        alert('!!!Cancelada la carga!!!')
    }        
}
function MostrarFormularioModificacion(moto) {
    document.getElementById('formularioModificacion').style.display = 'block';
    document.getElementById('formIdCod').value = moto.idcod;
    document.getElementById('formMoto').value = moto.titulo;
    document.getElementById('formPrecioPeso').value = moto.precioPeso;
    document.getElementById('formPrecioDolar').value = moto.precioDolar;
    document.getElementById('formFecha').value = moto.fecha;
}

function CerrarFormulario() {
    document.getElementById('formularioModificacion').style.display = 'none';
}

function ModificarMoto() {
    const idcod = document.getElementById('formIdCod').value;
    const titulo = document.getElementById('formMoto').value;
    const precioPeso = document.getElementById('formPrecioPeso').value;
    const precioDolar = document.getElementById('formPrecioDolar').value;
    const fecha = document.getElementById('formFecha').value;

        fetch(urlApi, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idcod: idcod,
                titulo: titulo,
                precioPeso: precioPeso,
                precioDolar: precioDolar,
                fecha: fecha,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('no se le respondio ok');
            }
            return response.text(); 
        })
        .then(data => {
            try {
                const jsonData = JSON.parse(data);
                alert('Moto Modificada!!');
                CerrarFormulario();
                MostarMoto();
            } catch (e) {
                alert('Moto Modificada!!');
                CerrarFormulario();
                MostarMoto();
            }
        })
        .catch(error => console.error('Error:', error));
}
function buscarMoto() {
    const input = document.getElementById('buscadordemoto').value.toLowerCase();
    const table = document.querySelector('table');
    const tr = table.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[1]; 
        if (td) {
            const texto = td.textContent || td.innerText;
            if (texto.toLowerCase().indexOf(input) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}


