//Capturando os elementos
const divTarefas = document.querySelector('#div-tarefas');
const inptAdd = document.querySelector('#inpt-add');
const btnAdd = document.querySelector('#btn-add');
const select = document.querySelector('#tipo');

//Criando o array aonde vai ser armazenados os dados 
let arr = [];

/*Função para montar os objetos dentro do array e criar o card
de tarefa e adicionando classe a eles*/
const montaObj = (valorInpt, valorSelect, id)=>{
    /*Usar o for each no meu array para montar a div, 
    pois caso eu remova algum card teria que remover ele
    tbm do array, assim quando eu removo um card ele monta
    novamente sem o card que foi retirado*/

    //Criando a div do card de tarefa
    const div = document.createElement('div');
    div.classList.add('tarefas', 'margin', 'transition');
    div.setAttribute('data-id', id)

    //Criando a div que vai englobar o titulo e o tipo da tarefa
    const cardTarefas = document.createElement('div');
    cardTarefas.classList.add('card-tarefas');
    div.appendChild(cardTarefas);

    //Criando o titulo da tarefa
    const tarefa = document.createElement('h2');
    tarefa.classList.add('titulo-tarefa');
    tarefa.innerText = valorInpt;
    cardTarefas.appendChild(tarefa);

    //Criando o tipo da tarefa
    const desc = document.createElement('p');
    desc.classList.add('desc-tarefa');
    desc.innerText = valorSelect;
    cardTarefas.appendChild(desc);

    //Criando o botao de deletar a tarefa
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('remove-task');
    btnDelete.innerText = 'X';
    div.appendChild(btnDelete);

    //Adicionando a div criada dentro da div que engloba todos os cards
    divTarefas.appendChild(div);

    /*Resetando o valor do input onde o titulo da tarefa e digitado
    e apos clicar no botao de adicionar voltar o foco ao input*/
    inptAdd.value = '';
    inptAdd.focus();
}

function addArray(valorInpt, valorSelect){
    //Adicionando os dados recebidos dos inpts no array dentro de um objeto
    let obj = (
        {   
            id: arr.length,
            tarefa: valorInpt,
            tipo: valorSelect
        }
    );

    arr.push(obj);

    montaObj(valorInpt, valorSelect, obj.id);
}

//Funcao para removar o card do array
const removerCard = (num, div)=>{
    //Encontro o index do objeto a partir do data-set da div e do id do objeto
    let index = arr.findIndex((obj) => obj.id === parseInt(num));

    console.log(index);
    //Faz a remoção do objeto no array se o indice for diferente de -1
    if(index !== -1){
        arr.splice(index, 1);

        div.remove();

        console.log(arr);
    };
};

//Evento de clique no botao de adicionar para criar o card da tarefa
btnAdd.addEventListener('click', ()=>{
    addArray(inptAdd.value, select.value);

    console.log(arr);
});

/*Evento de clique no documento para detectar o clique no botao
de deletar a tarefa*/
document.addEventListener('click', (e)=>{
    //Salvando o alvo do click e a div mais proxima dele em variaveis
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');

    /*Adicionando um condicao para encontrar a div mais proxima do botao de delete
    para deletar a mesma*/
    if(targetEl.classList.contains('remove-task')){
        //Adicionar o metodo para remover o card nao somente no visual mas tbm do array
        removerCard(parentEl.dataset.id, parentEl);
    };
});