let clientes = [];
let idClienteAtual = 0;

function validarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;


    //Verificar se algum campo está vazio.
    if (!nome || !email || !telefone || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return false; //Impede o envio do formulário
    }

    //Se todos os campos estão preenchidos, chama a função para salvar o cliente.
    if (idClienteAtual == 0) {
        salvarCliente(nome, email, telefone, cpf);
    }
    else {
        editarCliente(nome, email, telefone, cpf);
    }

    //Permite o envio do formulário
    return true;
}

function salvarCliente(nome, email, telefone, cpf) {
    console.log('Função salvarCliente foi chamada.');

    listarClientes();

    let tamanho = clientes.length;
    let id = 0;

    let maior = 0;

    if (tamanho == 0) {
        id = 1;
    } else {
        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes [i];

            if (clientes.id > maior) {
                maior = cliente.id;
            }
        }
    }


  const cliente = {id: (maior + 1), nome, email, telefone, cpf};
  clientes.push(cliente);
  
  console.log('cliente salvo: cliente');

  //Limpar os campos após salvar
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('cpf').value = '';

  //Salvar os clientes no localStorange
  localStorage.setItem('clientes', JSON.stringify(clientes));

  alert('Cliente salvo com sucesso!');
  listarClientes();
}

function listarClientes() {
    console.log('Função listarClientes foi chamada');

    const listarClientes = document.getElementById('listarClientes');
    listarClientes.innerHTML = '';

    console.log('Clientes:', clientes);

    //Carregar os clientes do localStorage
    const storedClientes = localStorage.getItem('clientes');

    if (storedClientes) {
        clientes = JSON.parse(storedClientes);
    }

    if (clientes.length === 0) {
        console.log('Nenhum cliente cadastrado.')
        listarClientes.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
        return;
    }

    clientes.forEach((cliente, index) => {
        const listaItem = document.createElement('tr');
        listaItem.innerHTML =  `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.cpf}</td>;
        <td>
           <button onclick="detalheCliente(${index})" class="btn btn-outline-primary">Editar</button>
           <button onclick="excluirCliente(${index})" class="btn btn-outline-danger">Excluir</button>
        </td>`;
       
        //Adiciona a linha à lista de clientes
        listarClientes.appendChild(listaItem);
    });
}

function toUpperCaseInputs() {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');

    nomeInput.addEventListener('input', () => {
        nomeInput.value = nomeInput.value.toUpperCase();
    });

    emailInput.addEventListener('input', () => {
        emailInput.value = emailInput.value.toUpperCase();
    });

    telefoneInput.addEventListener('input', () => {
        telefoneInput.value = telefoneInput.value.toUpperCase();
    });

    cpfInput.addEventListener('input', () => {
        cpfInput.value = cpfInput.value.toUpperCase();
    });

}

//Chame a função para aplicar o evento de transformar em miúsculo nos inputs
toUpperCaseInputs();
function detalheCliente(index) {
    const cliente = clientes[index];
    //Preencha os campos do formulário com os dados do cliente selecionado para editação.
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('cpf').value = cliente.cpf;
    
    idClienteAtual = cliente.id;

    console.log("ID: ", idClienteAtual)

}

function editarCliente(nome, email, telefone, cpf) {
    console.log('Função editarCliiente foi chamada.');

    const cliente = { id: idClienteAtual, nome, email, telefone, cpf};

    var clienteEncontradoIndex = clientes.findIndex ((cli) => cli.id == idClienteAtual);

    if (clienteEncontradoIndex == -1) {
        alert("Cliente não encontrado!");
        return;
    }

    clientes[clienteEncontradoIndex] = cliente;

    atualizarBancoDeDados('clientes');
    listarClientes();
    limparTudo();

}

function excluirCliente(index) {
    //Remova o cliente da lista.
    clientes.splice(index, 1);

    localStorage.setItem('clientes', JSON.stringify(clientes));

    //Atualize a exibição da lista.
    listarClientes();
}

function atualizarBancoDeDados(tabela) {
    localStorage.setItem(tabela, JSON.stringify(clientes));
}

function limparTudo() {
    //Limpar os campos após salvar
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cpf').value = '';

    idClienteAtual = 0;
}