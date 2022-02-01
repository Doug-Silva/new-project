//VARIÁVEIS GLOBAIS
var jog,dirxJ,diryJ,velJ,pjx,pjy;
var tamanhoTelaW,tamanhoTelaH;
var jogo;
var frames;

//FUNÇÃO QUANDO A TECLA ESTÁ PRESSIONADA 
function teclaDw(){

	var tecla=event.keyCode;
    
    //TECLA PARA CIMA
	if(tecla==38){
		diryJ=-1;

    //TECLA PARA BAIXO
	}else if(tecla==40){
		diryJ=1;
	}

    //TECLA PARA DIREITA
	if(tecla==39){
		dirxJ=1;

    //TECLA PARA ESQUERDA
	}else if(tecla==37){
		dirxJ=-1;
	}

    //TECLA ESPAÇO - PARA ATIRAR
	if(tecla==32){

		//ATIRAR
		atira(pjx+17,pjy);
	}
}

//FUNÇÃO QUANDO A TECLA NÃO ESTÁ PRESSIONADA
function teclaUp(){

	var tecla=event.keyCode;

    //TECLA CIMA, BAIXO
	if((tecla==38)||(tecla==40)){
		diryJ=0;
	}

    //TECLA DIREITA, ESQUERDA
	if((tecla==39)||(tecla==37)){
		dirxJ=0;
	}
}

//FUNÇÃO PARA ATIRAR
function atira(x,y){
	var t=document.createElement("div");
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="tiroJog";
	att2.value="top:"+y+"px;left:"+x+"px";
	t.setAttributeNode(att1);
	t.setAttributeNode(att2);
	document.body.appendChild(t);
}

//FUNÇÃO DE CONTROLE DO JOGADOR
function controlaJogador(){
    pjy+=diryJ*velJ;
	pjx+=dirxJ*velJ;
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";
}

//LOOP PRINCIPAL DO GAME
function gameLoop(){

    if(jogo){
        //FUNÇÕES DE CONTROLE
        controlaJogador();
    }

    //CONTROLE DE FRAMES DO GAME
    frames=requestAnimationFrame(gameLoop);

}

//INICIO DE TODOS OS COMPONENTES DO GAME
function inicia(){

    //INICIO DO GAME
    jogo=true;

    //INICIAR TELA DE JOGO
    tamanhoTelaW=window.innerWidth;
	tamanhoTelaH=window.innerHeight;

    //INICIAR JOGADOR
    dirxJ=diryJ=0;
	pjx=tamanhoTelaW/2;
	pjy=tamanhoTelaH/2;
	velJ=5;
	jog=document.getElementById("naveJog");
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";

    gameLoop();
}

//EVENTOS
window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);