export default class Session { };

Session.getUsuario = getUsuario;
Session.setUsuario = setUsuario;
Session.SignOff = SignOff;

function setUsuario (usuario) {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
}

function getUsuario(){
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    return user;
}

function SignOff() {
    sessionStorage.removeItem("usuario");
}