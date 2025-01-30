// Inicialização das variáveis do jogo
let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados e evitar repetição
let numeroLimite = 50; // Limite superior para o número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto aleatório no início do jogo
let tentativas = 1; // Contador de tentativas do jogador

// Função para exibir texto em elementos HTML específicos
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pela tag
    campo.innerHTML = texto; // Define o texto dentro do elemento
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Utiliza a API de voz para falar o texto
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50'); // Exibe a instrução para o jogador
}

// Chamando a função para exibir a mensagem inicial no carregamento da página
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor inserido no campo de input
    
    // Verifica se o chute é igual ao número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe a mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a palavra 'tentativa' no singular ou plural
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Cria a mensagem com o número de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem com o número de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else { // Se o chute não for igual ao número secreto
        if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto
            exibirTextoNaTela('p', 'O número secreto é menor'); // Exibe a mensagem que o número secreto é menor
        } else { // Se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior'); // Exibe a mensagem que o número secreto é maior
        }
        tentativas++; // Incrementa o contador de tentativas
        limparCampo(); // Limpa o campo de input
    }
}

// Função para gerar um número aleatório para o jogo
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e o limite
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de números já sorteados
    
    // Verifica se a lista de números sorteados está cheia
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; // Reinicia a lista se estiver cheia
    }
    // Verifica se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Chama a função novamente se o número já foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados
        console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console (para debug)
        return numeroEscolhido; // Retorna o número sorteado
    }
}

// Função para limpar o campo de input
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o campo de input
    chute.value = ''; // Define o valor do campo como vazio
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de input
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial do jogo
    document.getElementById('reiniciar').setAttribute('disabled', true) // Desabilita o botão de reiniciar
}