var pacientes = document.querySelectorAll(".paciente");

var tabla = document.querySelector("#tabla-pacientes");

tabla.addEventListener("dblclick", event => {
    event.target.parentNode.classList.add("fadeOut");
    setTimeout(function(){
        event.target.parentNode.remove();
    }, 400);
});
