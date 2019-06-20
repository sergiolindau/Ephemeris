/***********************************************************************
 Planetarium
 
 Copyright (c) 2018 Sergio Lindau

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
/***********************************************************************/





function toggle(idx){

var target = document.getElementById(idx); 
 	if (target) with (target.style)
 	{ 
		if (display!= "none")
		 display = "none";
		 else display = "" 
	}

	   var divs = document.getElementsByTagName('DIV');
	   for(var x = 0; x<divs.length;x++){
	   
	   	if (divs[x].id !=idx)
	   	if (divs[x].style.display !="none") // Impede que as DIVs escondidas sejam religadas
	   	{
	   	{
        	  document.getElementById(divs[x].id).style.display="none";      //apaga
                  document.getElementById(divs[x].id).style.display="";          //acende
	        }                   
	        }
           }
}



function muda_hora (sinal){    
    
  if (sinal=="agora"){
     str_hora_seletor="20";  
     plota_objetos(str_hora_seletor);
     num_hora_seletor=parseFloat(str_hora_seletor);
  }

  if (sinal=="+"){                                
     num_hora_seletor=num_hora_seletor+1;
     if (num_hora_seletor > 23){ num_hora_seletor=23; }
     str_hora_seletor=num_hora_seletor.toString();
     plota_objetos(str_hora_seletor);
  }

  if (sinal=="-"){
     num_hora_seletor=num_hora_seletor-1;
     if (num_hora_seletor <0 ){ num_hora_seletor=0; }
     str_hora_seletor=num_hora_seletor.toString();     
     plota_objetos(str_hora_seletor);
  }

}


    
function quadrante(cardeal){
   var carta = document.getElementById("carta"); 
   var quadrante=250;

if (cardeal!="z"){  
   document.getElementById('carta_zenite').style.display="none";                                     // Desliga a carta zenite   
   if (cardeal=="n"){  
   quadrante = 275;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_6.jpg'>";   
   }else if (cardeal=="e"){  
   quadrante = -275;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_4.jpg'>";   
   }else if (cardeal=="s"){  
   quadrante = -825;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_5.jpg'>";   
   }else if (cardeal=="w"){  
   quadrante= -1375;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_3.jpg'>";   
   }
   carta.style.left = quadrante;                                                                     // Muda o quadrante
   
   }else{
   
   document.getElementById('carta_zenite').style.display="";                                         // liga a carta zenite
}
  
}

var quando="hoje";
var str_hora_seletor="";
var num_hora_seletor=0;
var efem_split = new Array();                   // Contem as efemérides horárias splitadas
var tot_planetas=13;   // Quantidade de objetos
var tot_linhas_efem=tot_planetas*24;            // Quantidade de linhas nas efemerides
var pix_grau_h=2200/360;                        // Dimensão H do Visor/largura em graus
var pix_grau_v=320/60;                          // Dimensão V do Visor/altura em graus
var modo = "agora";
var count_refresh=0;                            // Contador de refresh


function plota_zenite ($az,$el,$div_id){

// Conversão Polar retangular           

	// Descomente para plotar tudo no centro
	// $az=0;
	// $el=90;
	$pi=3.14159265358979;
	var $degrad=$pi/180;
	var $correcao_posicao_x=-10;
	var $correcao_posicao_y=-10;
	var $altu_carta = 355;
	var $larg_carta = 355;
	var $range=100;                    		// Range do zênite até o solo em graus. Números maiores que 90 plotam abaixo do horizonte	
	$div_id="z_"+$div_id;


	$plot_grau_ver=$altu_carta/200;        		// Relação de pixel por graus: Altura da carta: 110px    range: -100 graus  0  +100 graus  (200 graus)
	$plot_grau_hor=$larg_carta/200;    		// Relação de pixel por graus: Largura da carta: 110px    range: -100 graus  0  +100 graus  (200 graus)
       
        $az_girado=90-$az;
        $el_girado=90-$el;
	$az_rad=$az_girado*$degrad;             	// Transforma o azimute em radiano
	$polar_x = $el_girado*Math.cos($az_rad);
	$polar_y = $el_girado*Math.sin($az_rad);  
	
        $dot_x=($range+$polar_x)*$plot_grau_hor+$correcao_posicao_x;
        $dot_y=($range-$polar_y)*$plot_grau_ver+$correcao_posicao_y;

        var div_planeta = document.getElementById($div_id);
        div_planeta.style.left = $dot_x;
        div_planeta.style.top = $dot_y;
        


return;
}  


function plota_objetos(str_hora_seletor){
   
   var obj_number=0;                                 // Quando entrar no loop, incrementa 1 para cada objeto lido
   var div_status;                                   // Nome da div que será preenchida com as efemérides: efem_1,efem_2, etc
   var cor_status="FFDD00";

   num_hora_seletor=parseFloat(str_hora_seletor);

   for (loop=1; loop<=tot_linhas_efem; loop++){  
   
        efem_split=$linha_efem[loop].split(";");

        if (quando=="hoje"){
        document.getElementById("status_bar").innerHTML = "Hoje 30-05-2019 - "  + str_hora_seletor + " horas";     
        }else{
        document.getElementById("status_bar").innerHTML = "Data selecionada: 30-05-2019 - "  + str_hora_seletor + " horas";             
        }
       
        if (efem_split[0]==str_hora_seletor){        // Separa os do horário escolhido
        
           obj_number++;                // número do objeto
           div_status="efem_" + obj_number.toString();
           
           var ob=efem_split[1];        // Objeto      
           var az=efem_split[2];        // Azimute      
           var el=efem_split[3];        // Elevação
           var st=efem_split[4];        // Status                 
           var mag=efem_split[5];       // Magnitude
           var ap=efem_split[6];        // Apice
           var div_id=efem_split[7];    // div_id

           plota_zenite(az,el,div_id);

           
	   //az=45;   // Simulação
	   //el=30;   // Simulação           
          
	   if (az >315){  
	     az=az-360;                                            // plota az>315 no lado norte ao invés do oeste (O visor mostra de -45(315) até 315)
	   }
	   
	   if (efem_split[4] =="Visível"){
	    cor_status="28C903";
	    efem_split[4]="Acima";	    
	     }else{ 
	    cor_status="FFDD00";
	    efem_split[4]="Abaixo";	    	    
	   }
           
	    
           var posic_h=az*pix_grau_h;
           var posic_v=el*pix_grau_v-10;                          // Insere correção na vertical     

           var div_planeta = document.getElementById(div_id);     // Localiza a DIV correspondente e...
           div_planeta.style.left = posic_h;                      // Plota h
           div_planeta.style.bottom = posic_v;                    // Plota v

           if (div_id != "plutao"){
           document.getElementById(div_status).innerHTML = "<table cellpadding=0 cellspacing=0 id=tab_efem  ><td width=25%>"+efem_split[1]+"</td><td width=13%>"+efem_split[2]+"</td><td width=13%>"+efem_split[3]+"</td><td width=21%><font color="+cor_status+">"+efem_split[4]+"</font></td><td width=15%>"+efem_split[5]+"</td><td width=13%>"+efem_split[6]+"</td></table>";              
           }
        
	}   
   }                                       
}   



function plota_agora(){

   var div_status;                                   // Nome da div que será preenchida com as efemérides: efem_1,efem_2, etc
   var tot_planetas="13";
   
   num_hora_seletor=parseFloat("20");

   for (loop=1; loop<=tot_planetas; loop++){  
   
     div_status="efem_" + loop.toString();   
     
     now_split=$linha_now[loop].split(";");

           var ob=now_split[1];        // Objeto      
           var az=now_split[2];        // Azimute      
           var el=now_split[3];        // Elevação
           var st=now_split[4];        // Status                 
           var mag=now_split[5];       // Magnitude
           var ap=now_split[6];        // Apice
           var div_id=now_split[7];    // div_id
           
           plota_zenite(az,el,div_id);
           
	   //az=45;   // Simulação
	   //el=30;   // Simulação           
          
	   if (az >315){  
	     az=az-360;                 // plota az>315 no lado norte ao invés do oeste (O visor mostra de -45(315) até 315)
	   }

	   if (now_split[4] =="Visível"){
	    cor_status="28C903";
	    now_split[4]="Acima";
	     }else{ 
	    cor_status="FFDD00";
	    now_split[4]="Abaixo";	    
	   }

           var posic_h=az*pix_grau_h;
           var posic_v=el*pix_grau_v-10;      // Insere correção na vertical     
           
           var div_planeta = document.getElementById(div_id);
           div_planeta.style.left = posic_h;
           div_planeta.style.bottom = posic_v;    
           
           
           //==============================================
           // Correção de Magnitude para o Cometa Elenin
           if (div_id == "elenin"){
            now_split[5]= 5 + parseFloat(now_split[5]);
           }
           //==============================================
                      

           if (div_id != "plutao"){
            document.getElementById(div_status).innerHTML = "<table cellpadding=0 cellspacing=0 id=tab_efem  ><td width=25%>"+now_split[1]+"</td><td width=13%>"+now_split[2]+"</td><td width=13%>"+now_split[3]+"</td><td width=21%><font color="+cor_status+">"+now_split[4]+"</font></td><td width=15%>"+now_split[5]+"</td><td width=13%>"+now_split[6]+"</td></table>";                                
           }
           
   }                                       
} 