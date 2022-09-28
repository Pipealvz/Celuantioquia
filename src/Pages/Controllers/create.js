
const create = () => {

    const isEmpty = () => {
        Swal.fire({
            title: "Error",
            text: "No deje espacios en blanco",
            icon: "warning",
            confirmButtonText: "Aceptar",
        });
    }

    function createUser(){
        const user = {
            nombre: document.getElementById("nombres").value,
            correo: document.getElementById("correo").value.toLowerCase(),
            contraseña: document.getElementById("clave").value,
          };
          if (user.nombre == 0 && user.correo == 0 && user.contraseña == 0) {
            
            return isEmpty();
          }
      
    }
}

export default create;