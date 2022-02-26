//VARIÁVEIS GLOBAIS
var jog,dirxJ,diryJ,velJ,pjx,pjy;
var velT;
var tamanhoTelaW,tamanhoTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba;
var bombasTotal;
var vidaPlaneta,barraPlaneta;
var indiceExplosao,indiceSom;
var telaMsg;

//LOOP PRINCIPAL DO GAME
function gameLoop(){

    if(jogo){
        //FUNÇÕES DE CONTROLE
        controlaJogador();
		controleTiros();
		controlaBomba();
    }
	gerenciaGame();

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
	velJ=velT=5;
	jog=document.getElementById("naveJog");
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";

	//CONTROLES DAS BOMBAS
	clearInterval(tmpCriaBomba);
	contBombas=150;
	velB=3;
	tmpCriaBomba=setInterval(criaBomba,1700);

	//CONTROLES DO PLANETA
	vidaPlaneta=300;
	barraPlaneta=document.getElementById("barraPlaneta");
	barraPlaneta.style.width=vidaPlaneta+"px";

	//CONTROLES DE EXPLOSÃO
	indiceExplosao=indiceSom=0;

	//CONTROLE DAS TELAS
	telaMsg=document.getElementById("telaMsg");

    gameLoop();
}

//EVENTOS
window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);

//FUNÇÃO DE GERENCIAMENTO DO GAME
function gerenciaGame(){
	barraPlaneta.style.width=vidaPlaneta+"px";
	if(contBombas<=0){
		jogo=false;
		clearInterval(tmpCriaBomba);
		telaMsg.style.backgroundImage="url('./assets/css/media/vitoria.jpg')";
		telaMsg.style.display="block";
	}

	if(vidaPlaneta<=0){
		jogo=false;
		clearInterval(tmpCriaBomba);
		telaMsg.style.backgroundImage="url('./assets/css/media/derrota.jpg')";
		telaMsg.style.display="block";
	}
}

//FUNÇÃO DE CONTROLE DO JOGADOR
function controlaJogador(){
    pjy+=diryJ*velJ;
	pjx+=dirxJ*velJ;
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";
}

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
		atira(pjx+27,pjy);
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

//FUNÇÃO PARA CRIAR BOMBA
function criaBomba(){
	if(jogo){
		var y=0;
		var x=Math.random()*tamanhoTelaW;
		var bomba=document.createElement("div");
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		att1.value="bomba";
		att2.value="top:"+y+"px;left:"+x+"px;";
		bomba.setAttributeNode(att1);
		bomba.setAttributeNode(att2);
		document.body.appendChild(bomba);
		contBombas--;
	}
}

//FUNÇÃO PARA CONTROLAR AS BOMBAS
function controlaBomba(){
	bombasTotal=document.getElementsByClassName("bomba");
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			var pi=bombasTotal[i].offsetTop;
			pi+=velB;
			bombasTotal[i].style.top=pi+"px";
			if(pi>tamanhoTelaH){
				vidaPlaneta-=10;
				//CHAMA FUNÇÃO CRIA EXPLOSÃO DO TIPO 2=TERRA
				criaExplosao(2,bombasTotal[i].offsetLeft,null);
				bombasTotal[i].remove();
			}
		}
	}
}

//FUNÇÃO DE CONTROLE DE COLISÃO DAS BOMBAS
function colisaoTiroBomba(tiro){
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			if(
				(
					//PARTE DE CIMA DO TIRO COM A PARTE DE BAIXO DA BOMBA
					(tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&&
					//PARTE DE BAIXO DO TIRO COM A BOMBA
					((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))
				)
				&&
				(
					//PARTE ESQUERDA DO TIRO COM A PARTE DIREITA DA BOMBA
					(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&&
					//PARTE DIREITA DO TIRO COM A PARTE ESQUERDA DA BOMBA
					((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft))
				)
			){
				//CHAMA FUNÇÃO CRIA EXPLOSÃO DO TIPO 1=AR
				criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop);
				bombasTotal[i].remove();
				tiro.remove();
			}
		}
	}
}

//FUNÇÃO PARA CRIAR EXPLOSÃO DAS BOMBAS
function criaExplosao(tipo,x,y){

	//ROTINA DE CONTROLE PARA REMOVER EXPLOSÃO
	if(document.getElementById("explosao"+(indiceExplosao-4))){
		document.getElementById("explosao"+(indiceExplosao-4)).remove();
	}

	var explosao=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");

	//ATRIBUTOS PARA DIV
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");

	//ATRIBUTOS PARA IMAGEM
	var att4=document.createAttribute("src");

	//ATRIBUTOS PARA ÁUDIO
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+indiceExplosao;
	//VERIFICA O TIPO DA EXPLOSÃO
	//SE O TIPO DE EXPLOSAO FOR 1=AR, 2=TERRA
	if(tipo==1){
		att1.value="explosaoAr";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="./assets/css/media/explosao-ar.gif?"+new Date();
	}else{
		att1.value="explosaoTerra";
		att2.value="top:"+(tamanhoTelaH-57)+"px;left:"+(x-17)+"px;";
		att4.value="./assets/css/media/explosao-terra.gif?"+new Date();
	}
	att5.value="./assets/css/media/explosao-audio.mp3?"+new Date();
	att6.value="som"+indiceSom;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img);
	explosao.appendChild(som);
	document.body.appendChild(explosao);
	document.getElementById("som"+indiceSom).play();
	indiceExplosao++;
	indiceSom++;
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

//FUNÇÃO PARA CONTROLAR OS TIROS
function controleTiros(){
	var tiros=document.getElementsByClassName("tiroJog");
	var tam=tiros.length;
	for(var i=0;i<tam;i++){
		if(tiros[i]){
			var pt=tiros[i].offsetTop;
			pt-=velT;
			tiros[i].style.top=pt+"px";
			colisaoTiroBomba(tiros[i]);
			if(pt<0){
				tiros[i].remove();
			}
		}
	}
	
}