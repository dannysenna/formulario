
const formulario = document.getElementById('myFormulario');
const nameInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const numeroInput = document.getElementById('numero');
const complementoInput = document.getElementById('complemento');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const cadastrar = document.getElementById('cadastrar');

function validateAndUpdate(inputElement, isValid) {
    inputElement.classList.toggle('error', !isValid);
    inputElement.classList.toggle('success', isValid);

    const inputs = [nameInput, emailInput, telefoneInput, cepInput,ruaInput,numeroInput,complementoInput,cidadeInput,ufInput];
    const allInputsValid = inputs.every(input => 
        input.value.trim() !== '' && !input.classList.contains('error'));
        cadastrar.disabled = !allInputsValid;
}

nameInput.addEventListener('input', () => {
    validateAndUpdate(nameInput, nameInput.value.trim() !== '');
});


emailInput.addEventListener('input', () => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value);
    validateAndUpdate(emailInput, isEmailValid);
});

telefoneInput.addEventListener('input', () => {
    const value = telefoneInput.value.replace(/\D/g, '');
    telefoneInput.value = value;
    const isTelValid = /^\d{10,11}$/.test(value);

    if (isTelValid) {
        const formattedValue = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
        telefoneInput.value = formattedValue;
    }
    validateAndUpdate(telefoneInput, isTelValid);
});

cepInput.addEventListener('input', () => {
    const value = cepInput.value.replace(/\D/g, '');
    cepInput.value = value;
    const isCepValid = /^\d{8}$/.test(value);

    if (isCepValid) {
        const formattedValue = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
        cepInput.value = formattedValue;
    }
    validateAndUpdate(cepInput, isCepValid);
});

