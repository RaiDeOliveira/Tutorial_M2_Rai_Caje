//Ativa a função "receberMensagem" ao detectar o envio da nota através do formulário
$('.form').submit(function(event){
    event.preventDefault();
    receberMensagem();
});


function receberMensagem(){
    //Cria requisição assíncrona AJAX para receber a mensagem do arquivo "mensagem.txt"
    const requisicao = new XMLHttpRequest();

    //Ativa a requisição e envia-a
    requisicao.open('GET', '/mensagem', true);
    requisicao.send();
    
    //Ativa a função "escreverMensagem" quando o estado da requisição for igual a 4 (pronto)
    requisicao.onreadystatechange = function(){
        if(requisicao.readyState === 4 && requisicao.status === 200){
            const texto = requisicao.responseText; //Guarda resposta da requisição na variável "texto"
            escreverMensagem(texto);
        };
    };
};

function escreverMensagem(texto){
    const nota = $('#nota').val(); //Guarda, dentro da variável "nota", o valor da nota inserido no input 
    const todasAsMensagens = texto.split('\n'); //Guarda e separa, dentro de uma array, todas as mensagens de "mensagem.txt"
    alert(todasAsMensagens[nota-1]); //Exibe, num alerta, a mensagem correspondente à nota

    const label = $('#mensagem'); //Atrela a label com id "mensagem" à variável "label"
    label.text(todasAsMensagens[nota-1]); //Exibe, numa label, a mensagem correspondente à nota
};
