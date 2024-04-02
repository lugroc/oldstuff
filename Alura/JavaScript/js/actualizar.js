var botonBuscar = document.querySelector("#buscar-paciente");

botonBuscar.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","https://alura-es-cursos.github.io/api-pacientes/pacientes.json");
    xhr.addEventListener("load", function(){
        var err = document.querySelector("#error-ajax");
        if(xhr.status=200){
            err.classList.add("invisible");
            var respuesta = xhr.responseText;
            var pacientes = JSON.parse(respuesta);
            pacientes.forEach(paciente => {
                insertarPaciente(paciente);
            });
        }else{
            err.classList.remove("invisible");
        }
    });
    xhr.send();
});
