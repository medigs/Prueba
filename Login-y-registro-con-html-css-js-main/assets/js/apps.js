
 URL='https://candidates-exam.herokuapp.com/api/v1/';
 const url = 'https://candidates-exam.herokuapp.com/api/v1/usuarios';
 const url1 = 'https://candidates-exam.herokuapp.com/api/v1/auth/login';
 const url3 = 'https://candidates-exam.herokuapp.com/api/v1/usuarios/';

const bRegistro=document.getElementById('botonR');
const bLogin=document.getElementById('loginb');


bRegistro.addEventListener('click',function(){
    validarcampos()
    send_data();
});

bLogin.addEventListener('click',function(){
    login();
 });

function  send_data(){
     input1 = document.getElementById('r1');
     valuer1 = input1.value;
        input2 = document.getElementById('r2');
        valuer2 = input2.value;
        input3 = document.getElementById('r3');
        valuer3 = input3.value;
        input4 = document.getElementById('r4');
        valuer4 = input4.value;
const data = {
    nombre: valuer1,
    email: valuer2,
    password: valuer3,
    password_confirmation: valuer4,
};

const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function login(){
    input1 = document.getElementById('lg1');
    valuer1 = input1.value;
    input2 = document.getElementById('lg2');
    valuer2 = input2.value;
const data = {
    email: valuer1,
    password: valuer2,
};

const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(url1, options)
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        sessionStorage.setItem('token', data.token);
        token=sessionStorage.getItem('token');
        sessionStorage.setItem('urluser', data.url);
        urluser=sessionStorage.getItem('urluser');
        console.log(sessionStorage.getItem('token'));
        window.location.href = "archivos.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });
 }

//validar que los datos como nombre, email, password y password_confirmation no esten vacios
function validarcampos(){
    input1 = document.getElementById('r1');
     valuer1 = input1.value;
        input2 = document.getElementById('r2');
        valuer2 = input2.value;
        input3 = document.getElementById('r3');
        valuer3 = input3.value;
        input4 = document.getElementById('r4');
        valuer4 = input4.value;
    if (valuer1 == "" || valuer2 == "" || valuer3 == "" || valuer4 == ""){
        alert("Todos los campos son obligatorios");
        return false;
    }
    else if (valuer3.length < 6){
        alert("La contraseña debe tener al menos 6 caracteres");
        return false;
    }
    else if (valuer3 != valuer4){
        alert("Las contraseñas no coinciden");
        return false;
    }
    else if (valuer2.indexOf("@") == -1){
        alert("El correo no es válido");
        return false;
    }
    else if (valuer2.indexOf(".") == -1){
        alert("El correo no es válido");
        return false;
    }
    else
        return true; 
}











































    





