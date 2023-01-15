

 //const url = 'https://candidates-exam.herokuapp.com/api/v1/usuarios';
 const url1 = 'https://candidates-exam.herokuapp.com/api/v1/auth/login';
 const url3 = 'https://candidates-exam.herokuapp.com/api/v1/usuarios/';
 const urlarchivos = 'https://candidates-exam.herokuapp.com/api/v1/usuarios/';

const dtuser=document.getElementById('datauser');
const subir=document.getElementById('bsu');
const descargarcv=document.getElementById('bdescargararchivo');

ObtenerData();



function ObtenerData(data){
    
    token=obtenerToken();
    urluser=obtenerUrl();
    const options = {
        method: 'GET',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
        }
    };
        fetch(url3, options)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('datauser').textContent=data.nombre;
            document.getElementById('urluser').textContent=data.url;
            console.log(data.nombre);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function obtenerToken(){
    
    const token = sessionStorage.getItem('token');
    
    return token;
}

function obtenerUrl(){
    const url = sessionStorage.getItem('urluser');
    return url;
}

//obtener URL   
function obtenerUrlcv(){
    const urlcv = sessionStorage.getItem('urlcv');
    return urlcv;
}


subir.addEventListener('click',function(){
    validarArchivo();
}
);

function subirArchivo(){
    token=obtenerToken();
    urluser=obtenerUrl();
    const data = new FormData();
    data.append('curriculum',document.getElementById('subirdoc').files[0]);
    const options = {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    fetch((urlarchivos+urluser+'/cargar_cv'), options)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log('archivo subido correctamente');
            sessionStorage.setItem('urlcv', data.url_cv);
            urlcv=sessionStorage.getItem('urlcv');
            console.log(urlcv);
        }
        )
        .catch(error => {
            console.error('Error:', error);
        }
        );
}


//validar propiedades de un archivo
function validarArchivo(){
    var archivoInput = document.getElementById('subirdoc');
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.pdf)$/i;
    if(!extPermitidas.exec(archivoRuta)){
        alert('Asegurese de haber seleccionado un archivo PDF y que sea menor a 5MB');
        archivoInput.value = '';
        return false;
    }else{
        subirArchivo()
    }
}

descargarcv.addEventListener('click',function(){
    descargarArchivo();
}

);



//funcion para descargar archivo con fetch
function descargarArchivo(){
    token=obtenerToken();
    urlcv=obtenerUrlcv();
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    fetch((urlcv), options)
        .then(response => response.blob())
        .then(data => {
                    
            
            var url = window.URL.createObjectURL(data);
            var a = document.createElement('a');
            a

.href = url;
            a.download = 'curriculum.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
        )
        .catch(error => {
            console.error('Error:', error);
        }
        );
}




































