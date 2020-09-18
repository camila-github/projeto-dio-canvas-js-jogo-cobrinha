window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    setInterval(renderizaJogo, 100);

}

//Declaração das variaveis
let cobraDirecaoX = cobraDirecaoY = 10;
let comidaDirecaoX = comidaDirecaoY = 15;
let telaDirecaoX = telaDirecaoY = 0;
grid = 20;
tamanhoCauda = [];
tamanhoPadraoCauda = 5;
pontuacao = 0;

// telaDirecaoX e telaDirecaoY aplica a direção que a cobra irá percorrer
function keyDownEvent(event) {
    console.log(event.keyCode);

    switch (event.keyCode) {
        case 37:
            telaDirecaoX = -1;
            telaDirecaoY = 0;
            break;
        case 38:
            telaDirecaoY = -1;
            telaDirecaoX = 0;
            break;
        case 39:
            telaDirecaoX = 1;
            telaDirecaoY = 0;
            break;
        case 40:
            telaDirecaoY = 1;
            telaDirecaoX = 0;
            break;
    }
}

//Renderiza a posição da cobra na tela
function renderizaJogo() {
    cobraDirecaoX += telaDirecaoX;
    cobraDirecaoY += telaDirecaoY;

    console.log(cobraDirecaoX);
    if (cobraDirecaoX < 0) {
        cobraDirecaoX = grid;
    }
    if (cobraDirecaoX > grid) {
        cobraDirecaoX = 0;
    }
    if (cobraDirecaoY < 0) {
        cobraDirecaoY = grid;
    }
    if (cobraDirecaoY > grid) {
        cobraDirecaoY = 0;
    }

    //aplica cor em gradient no fundo da tela do canvas
    var grd = ctx.createLinearGradient(0, 100, 700, 200);
    grd.addColorStop(0, "#21610B");
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Se a cobra comer, aumento o tamanho da cauda
    ctx.fillStyle = "#0B1907";
    for (var i = 0; i < tamanhoCauda.length; i++) {
        ctx.fillRect(tamanhoCauda[i].x * grid, tamanhoCauda[i].y * grid, grid - 1, grid - 1);
        if (tamanhoCauda[i].x == cobraDirecaoX && tamanhoCauda[i].y == cobraDirecaoY) {
            tamanhoPadraoCauda = 5;
        }
    }


    tamanhoCauda.push({ x: cobraDirecaoX, y: cobraDirecaoY });
    pontucao = tamanhoCauda.length;
    while (tamanhoCauda.length > tamanhoPadraoCauda) {
        tamanhoCauda.shift();

    }



    //Se a cobra comer, reposiciona a comida na tela
    ctx.fillStyle = "red";
    ctx.fillRect(comidaDirecaoX * grid, comidaDirecaoY * grid, grid - 1, grid - 1);
    if (cobraDirecaoX == comidaDirecaoX && cobraDirecaoY == comidaDirecaoY) {
        tamanhoPadraoCauda++;
        comidaDirecaoX = Math.floor(Math.random() * grid);
        comidaDirecaoY = Math.floor(Math.random() * grid);


    }
    //Será mostrado a pontuação
    pontuacao = pontucao - 6;
    document.getElementById("pontuacao").innerHTML = pontuacao;



}