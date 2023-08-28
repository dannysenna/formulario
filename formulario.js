function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();

    const nomeErroSpan = document.getElementById('nomeErro');
    const emailErroSpan = document.getElementById('emailErro');
    const telefoneErroSpan = document.getElementById('telefoneErro');
    const cepErroSpan = document.getElementById('cepErro');

    nomeErroSpan.textContent = '';
    emailErroSpan.textContent = '';
    telefoneErroSpan.textContent = '';
    cepErroSpan.textContent = '';


    function formatarCEP() {
        const cepInput = document.getElementById("cep");
        cepInput.value = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        const cepInvalido = document.getElementById("cepInvalido");
        cepInvalido.style.display = "none";
        buscarEndereco();
    }

    async function buscarEndereco() {
        const cep = document.getElementById("cep").value;
        const cepInvalido = document.getElementById("cepInvalido");

        if (cep.length === 0 || cep.length === 8) {
            try {
                cepInvalido.style.display = "none";

                if (cep.length === 8) {
                    const url = `https://viacep.com.br/ws/${cep}/json/`;
                    const response = await fetch(url);

                    if (response.ok) {
                        const data = await response.json();
                        preencherCampos(data);
                    } else {
                        cepInvalido.style.display = "inline";
                    }
                }
            } catch (error) {
                console.error("Erro:", error);
                cepInvalido.style.display = "inline";
            }
        } else {
            cepInvalido.style.display = "inline";
        }
    }

    function preencherCampos(data) {
        const cepInvalido = document.getElementById("cepInvalido");
        cepInvalido.style.display = "none";

        document.getElementById("rua").value = data.rua || '';
        document.getElementById("bairro").value = data.bairro || '';
        document.getElementById("cidade").value = data.cidade || '';
        document.getElementById("estado").value = data.uf || '';
    }


    if (nome.length < 5) {
        alert('O nome deve conter pelo menos 5 caracteres.');
        nomeErroSpan.style.display = 'block';
        return false;
    } else {
        nomeErroSpan.style.display = 'none';
    }
    
    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailValido.test(email)) {
        emailErroSpan.style.display='block';
        alert('O e-mail deve ser válido.');
        return false;
    }
    
    const telValido = /^\d{2}-\d{5}-\d{4}$/;
    if (!telValido.test(telefone)) {
        telefoneErroSpan.style.display = 'block';
        alert('O telefone deve estar no formato (xx)xxxxx-xxxx.');
        return false;
    }
    
    const cepValido = /^\d{5}-\d{3}$/;
    if (!cepValido.test(cep)) {
        cepErroSpan.style.display = 'block';
        alert('O CEP deve estar no formato xxxxx-xxx.');
        return false;
    }
    
    if (rua.length === 0) {
        alert('Digite o nome da rua onde mora.');
        return false;
    }
    
    if (numero.length === 0) {
        alert('Digite o número da casa onde você mora.');
        return false;
    }
    
    if (complemento.length === 0) {
        alert('Digite o complemento, por exemplo: apartamento, bloco, ou ponto de referência.');
        return false;
    }
    
    if (bairro.length === 0) {
        alert('Digite o bairro onde você mora.');
        return false;
    }
    
    if (cidade.length === 0) {
        alert('Digite a cidade onde você mora.');
        return false;
    }
    
    if (estado.length === 0) {
        alert('Digite o estado onde você mora.');
        return false;
    }
    
    if (!confirmarCheckbox.checked) {
        alert('Você precisa concordar com os termos de uso e condições de privacidade.');
        return false;
    }
    
    const userData = {nome,email,telefone,cep,rua,numero,complemento,bairro,cidade,estado};
    
    localStorage.setItem('userData', JSON.stringify(userData));
        alert('Cadastro realizado com sucesso!');
        return true;
}

function habilitarCadastro() {
    const confirmarCheckbox = document.getElementById('confirmar');
    const cadastrarButton = document.getElementById('cadastrar');
    cadastrarButton.disabled = !confirmarCheckbox.checked;
}

document.getElementById('myFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validarFormulario()) {
        habilitarCadastro();
    }
});

document.getElementById('confirmar').addEventListener('change', habilitarCadastro);

document.getElementById('limpar').addEventListener('click', function () {
    document.getElementById('myFormulario').reset();
    habilitarCadastro();
});
    
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("myFormulario");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Aqui você pode adicionar lógica para validar e processar o formulário
        
        // Simulando o sucesso do cadastro
        const cadastradoComSucesso = true;
        
        if (cadastradoComSucesso) {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                timer: 3000, // Tempo em milissegundos para o alerta fechar
                showConfirmButton: false
            }).then(() => {
                // Redirecionar para o formulário em branco
                form.reset();
            });
        }
    });
});

        

        

