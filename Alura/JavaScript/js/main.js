var pacientes = document.querySelectorAll(".paciente");



calcularIMC = (peso, altura) =>{
    if(peso>0 && peso<699){
       if(altura>0 && altura<3){
            return (peso / (altura * altura)).toFixed(2);
       }else return "Altura incorrecta";
    }else return "Peso incorrecto";
}

validarIMC = (paciente, imc) =>{
    if(isNaN(imc)){
        paciente.style.backgroundColor = "orange";
        return paciente;
    }
}

for (paciente of pacientes){

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdIMC = paciente.querySelector(".info-imc");

    var imc = calcularIMC(peso,altura);

    validarIMC(paciente, imc);

    tdIMC.textContent = imc;
}

