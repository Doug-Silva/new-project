var diryJ,dirxJ;

function teclaDw(){
    var tecla = event.keyCode;

    //TECLA PARA CIMA
    if(tecla==38){
        diryJ=-1;

    //TECLA PARA BAIXO    
    }else if(tecla==40){
        diryJ=1;
    }

    //TECLA PARA ESQUERDA
    if(tecla==37){
        dirxJ=-1;

    //TECLA PARA DIREITA    
    }else if(tecla==39){
        dirxJ=1;
    }

    //TECLA DE ESPAÇO - TIRO
    if(tecla==32){

    }
}

function teclaUp(){
    var tecla = event.keyCode;

    if((tecla==38)||(tecla==40)){
        diryJ=0;

    }

    if((tecla==37)||(tecla==39)){
        dirxJ=0;

    }
}