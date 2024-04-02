var campoFiltro = document.querySelector("#filtrar-tabla");

campoFiltro.addEventListener("input", function(){
    var pacientes = document.querySelectorAll(".paciente");
    for (var paciente of pacientes) {
        var nombre = paciente.querySelector(".info-nombre").textContent;

        nombre = nombre.toLowerCase();
        this.value = this.value.toLowerCase();

        if(nombre.includes(this.value) || this.value==""){
            paciente.classList.remove("invisible");
        }else{
            paciente.classList.add("invisible");
        }
    }
});
