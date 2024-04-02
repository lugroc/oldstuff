var botonAgregar = document.querySelector("#adicionar-paciente");

crearPaciente = (form) => {
    var paciente = {
        nombre: form.nombre.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularIMC(form.peso.value, form.altura.value)
    }

    return paciente;
}

crearTd = (dato, clase) =>{
    var td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = dato;
    return td;
}

crearTr = (paciente) =>{

    var mensajeError = document.querySelector("#mensaje-error");
    var pacienteTr = document.createElement("tr");

    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(crearTd(paciente.nombre, "info-nombre"));
    pacienteTr.appendChild(crearTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(crearTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(crearTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(crearTd(paciente.imc, "info-imc"));

    validarIMC(pacienteTr,paciente.imc);

    if(paciente.nombre != "" && paciente.nombre.includes(" ")==false){
        if(pacienteTr.style.backgroundColor != "orange"){
            if(paciente.gordura > 0 && paciente.gordura < 100){

                mensajeError.textContent = "";
                return pacienteTr;

            }else mensajeError.textContent = "Ingrese un porcentaje.";

        }else mensajeError.textContent = paciente.imc;

    }else mensajeError.textContent = "Ingrese un nombre valido.";

    return "";
}

insertarPaciente = (paciente) => {
    var pacienteTr = crearTr(paciente);

    var tabla = document.querySelector("#tabla-pacientes");

    if(pacienteTr!=""){
        tabla.appendChild(pacienteTr);
    }
}

botonAgregar.addEventListener("click",function(event){
    event.preventDefault();

    var form = document.querySelector("#form-agregar");

    var paciente = crearPaciente(form);

    insertarPaciente(paciente);

    form.reset();
})

