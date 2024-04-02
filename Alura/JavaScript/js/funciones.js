var botonAgregar = document.querySelector("#adicionar-paciente");

botonAgregar.addEventListener("click",function(event){
    event.preventDefault();

    var form = document.querySelector("#form-agregar");

    var paciente = crearPaciente(form);

    var tabla = document.querySelector("#tabla-pacientes");

    var pacienteTr = crearTr(paciente);
    tabla.appendChild(pacienteTr);
    form.reset();
})

crearTr = (paciente) =>{

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(crearTd(paciente.nombre, "info-nombre"));
    pacienteTr.appendChild(crearTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(crearTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(crearTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(crearTd(paciente.imc, "info-imc"));

    redIMC(pacienteTr,paciente.imc);

    return pacienteTr;
}

crearTd = (dato, clase) =>{
    var td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = dato;
    return td;
}
