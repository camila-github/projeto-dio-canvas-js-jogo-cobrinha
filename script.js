//Declaração das variaveis
var cobraDirecaoX = cobraDirecaoY = 10;
var comidaDirecaoX = comidaDirecaoY = 15;
var telaDirecaoX = telaDirecaoY = 0;
var grid = 20;
var tamanhoCauda = [];
var tamanhoPadraoCauda = 2;
var pontuacao = 0;

var tempo_segundos = new Number();
var tempo_segundos = 1;
var zerarTempo = 0;

window.onload = function() {
    var quadroCanvas = document.getElementById("quadroCanvas");
    ctx = quadroCanvas.getContext("2d");
    document.addEventListener("keydown", teclaPressionada);
    setInterval(renderizaJogo, 100);
    setInterval(contadorTempo, 1000);
}

// telaDirecaoX e telaDirecaoY aplica a direção que a cobra irá percorrer
function teclaPressionada(event) {
    console.log(event.keyCode);

    switch (event.keyCode) { //verifica qual a tecla foi pressionada
        case 37: // O 37 é referente a tecla seta para esquerda (Left)
            telaDirecaoX = -1;
            telaDirecaoY = 0;
            break;
        case 38: // O 38 é referente a tecla seta para cima (Up)
            telaDirecaoY = -1;
            telaDirecaoX = 0;
            break;
        case 39: // O 39 é referente a tecla seta para direta (Right)
            telaDirecaoX = 1;
            telaDirecaoY = 0;
            break;
        case 40: // O 40 é referente a tecla seta para baixo (Down)
            telaDirecaoY = 1;
            telaDirecaoX = 0;
            break;
    }
}


function corFundoTelaQuadroCanvas() {
 //aplica cor em gradient no fundo da tela do quadroCanvas
 var corQuadroCanvas = ctx.createLinearGradient(0, 100, 700, 200);
 corQuadroCanvas.addColorStop(0, "#21610B");
 corQuadroCanvas.addColorStop(1, "white");
 ctx.fillStyle = corQuadroCanvas;
 ctx.fillRect(0, 0, quadroCanvas.width, quadroCanvas.height);

}

function aumentaTamanhoCauda() {
      //Se a cobra comer, aumenta o tamanho da cauda.
      ctx.fillStyle = "#0B1907";
      for (let i = 0; i < tamanhoCauda.length; i++) {
          ctx.fillRect(tamanhoCauda[i].x * grid, tamanhoCauda[i].y * grid, grid - 1, grid - 1);
          if (tamanhoCauda[i].x == cobraDirecaoX && tamanhoCauda[i].y == cobraDirecaoY) {
              tamanhoPadraoCauda = 2; // a cobra voltará para o seu tamanho incial, caso a cobra bata nela mesma.
              tempo_segundos = 0;
          }  
      }
      tamanhoCauda.push({ x: cobraDirecaoX, y: cobraDirecaoY });
      pontuacao = tamanhoCauda.length;
      while (tamanhoCauda.length > tamanhoPadraoCauda) tamanhoCauda.shift();
}

function reposicionaComidaNaTela() {
    //Se a cobra comer, reposiciona a comida na tela
    ctx.fillStyle = "red";
    ctx.fillRect(comidaDirecaoX * grid, comidaDirecaoY * grid, grid - 1, grid - 1);
    if (cobraDirecaoX == comidaDirecaoX && cobraDirecaoY == comidaDirecaoY) {
        tamanhoPadraoCauda++;
        comidaDirecaoX = Math.floor(Math.random() * grid);
        comidaDirecaoY = Math.floor(Math.random() * grid);
    }
}

function mostraPontuacao() {
    //Mostra a pontuação
    pontuacao = pontuacao - 3;
    document.getElementById("pontuacao").innerHTML = pontuacao;
}

//Renderiza a posição da cobra na tela
function renderizaJogo() {
    cobraDirecaoX += telaDirecaoX; // A posicao da cobra (cobraDirecaoX), recebe a posição da tela onde a cobra esta (telaDirecaoX), isso tambem somando com ela mesma (cobraDirecaoX = cobraDirecaoX + telaDirecaoX)
    cobraDirecaoY += telaDirecaoY;

    console.log(cobraDirecaoX);
    if (cobraDirecaoX < 0) cobraDirecaoX = grid - 1;

    if (cobraDirecaoX > grid - 1) cobraDirecaoX = 0;
    
    if (cobraDirecaoY < 0) cobraDirecaoY = grid - 1;
    
    if (cobraDirecaoY > grid - 1) cobraDirecaoY = 0;    
    
    corFundoTelaQuadroCanvas(); //aplica cor em gradient no fundo da tela do quadroCanvas
    
    aumentaTamanhoCauda();  //Se a cobra comer, aumenta o tamanho da cauda     
   
    reposicionaComidaNaTela(); //Se a cobra comer, reposiciona a comida na tela    
    
    mostraPontuacao(); //Mostra a pontuação
}


//Mostra o tempo do jogo com duas casas decimais (hora, minuto,segundo)
function contadorTempo() {
    if (tempo_segundos++ > zerarTempo) {
        formatacaoTempo(tempo_segundos);
    } else {
        document.getElementById("time").innerHTML = "00:00:00";
        tempo_segundos++;
    }
}

function formatacaoTempo(s) {
    function duas_casas(numero) {
       if (numero <= 9) numero = "0" + numero;
       return numero;
    }
    let hora = duas_casas(Math.trunc(s / 3600));
    let minuto = duas_casas(Math.trunc((s % 3600) / 60));
    let segundo = duas_casas((s % 3600) % 60);
    let formatado = hora + ":" + minuto + ":" + segundo;
    return document.getElementById("time").innerHTML = formatado;   
}