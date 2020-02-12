//inicio parte do personagem______________________________________________________

//1° - Ajustando o tamanho da tela com função larguraAlturaTela
	var largura = 0 //1ª - variavel global largura recebe 0
	var altura = 0 //1º - variavel global altura recebe 0
	var vidas = 1 //8° - variavel global vidas recebe 1
	var tempo = 10 //9° - variavel global tempo recebe valor de 10
	var nivel = window.location.search //10ª - variavel global nivel recebe parametro do endereço encaminhado na selecao da pagina inicial pela funcao 10ª 
	nivel = nivel.replace('?', '')//exclui o caracter '?' da requisicao encaminhara pela pagina inicial

	var configVelJogo = 1500 

		if(nivel === 'Normal'){//11ª - se nivel for normal
			configVelJogo =2000 // velocidade sera de 2seg 
		} else if (nivel === 'Dificil'){ // se nivel for dificil
			configVelJogo =1000 // velocidade sera de 1 seg
		} else if (nivel === 'Chuck_Norris'){ //se nivel for chuck_norris
			configVelJogo === 750 // velocidade sera de 0.75 seg
		}


	function larguraAlturaTela(){ //declarando funcao larguraAlturaTela	
		largura = window.innerWidth	//largura recebe largura interior da tela
		altura = window.innerHeight	//altura recebe altura interior da tela
		console.log('larguraAlturaTela '+largura, altura)//mostra no console valores largura e altura (opcional)
	}
	larguraAlturaTela() //invocacao de funcao larguraAlturaTela disponivel 
						
						var cronometro = setInterval(function(){//9° variavel cronometro recebe configuração de intervalo como funcao
							tempo -= 1//decrementa em 1 cada passagem
							if(tempo < 0){//se o tempo chegar a zero
								clearInterval(cronometro) //limpe o cronometro
								clearInterval(criaElemento) //limpe os elementos da tela
								window.location.href = 'vitoria.html' //declare a vitoria
							} else {//senao
							document.getElementById('cronometro').innerHTML = tempo //pegue elemento por id e complete a variavel tempo
							}
						}, 1000)//por milissegundos

//1° - Fim de Ajustando o tamanho da tela com função larguraAlturaTela


//2° - criando personagem e movimento na tela
	function posicaoAleatoria(){ //Declarando funcao posicaoAleatoria

				//5º - se houver o elemento na tela, remova-o
				if(document.getElementById('elemento')){
					document.getElementById('elemento').remove()

						console.log('elemento selecionado foi v' + vidas)//8° - mostra encremento de vidas no console
						if(vidas > 3){ //se vidas for maior que 3
							window.location.href = 'fimDeJogo.html' //game over
						}else{ //se não
						document.getElementById('v' + vidas).src='imagens/coracao_vazio.png' //pega elemento por id e troca por imagem informada 
						vidas++	//encrementa contagem de vidas	
						}
				}		

	//criando movimento
	var posicaox = Math.floor(Math.random() * largura) - 90 //variavel posicaox recebe arredondamento pra menor de numero aleatorio vezes largura -90
	var posicaoy = Math.floor(Math.random() * altura) - 90 //variavel posicaoy recebe arredondamento pra menor de numero aleatorio vezes altura -90
	//controlando posicoes negativas aleatorias
	posicaox = posicaox < 0 ? 0 : posicaox //se posicao for menor que 0 ? entao posicao receberá 0
	posicaoy = posicaoy < 0 ? 0 : posicaoy //se posicao for menor que 0 ? entao posicao receberá 0
	console.log('posicaoAleatoria '+posicaox, posicaoy) //mostra no console valores posicaox e posicaoy (opcional)
	//criando o elemento html que terá o movimento
	var elemento = document.createElement('img') //variavel elemento recebe a criação de elemento ("img")
	elemento.src = 'imagens/mosca.png' //elemento recebe imagem na URL indicada
	elemento.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //atribuindo classe ao elemento que recebe tamanho aleatorio

	//associando o movimento ao elemento
	elemento.style.left = posicaox + 'px' //elemento estilo a esqueda recebe o valor da posicaox em pixels
	elemento.style.top = posicaoy + 'px' //elemento estilo ao topo recebe o valor da posicaoy em pixels
	elemento.style.position = 'absolute' //elemento estilo de posicao recebe o valor absoluto
	
				elemento.id = 'elemento' //5º - elemento recebe Id para funcao de remocão
				
					elemento.onclick = function(){ //7º - no click elemento executa funcao removendo-se
						this.remove()
					}

	document.body.appendChild(elemento)	//acrescente o elemento elemento no corpo da app
	}

//2° - Fim de criando personagem e movimento na tela


//3° - criando variação de tamanho
	function tamanhoAleatorio(){ //declaro funcao tamanhoAleatorio		
	var tamanho = Math.floor(Math.random() * 3) //variavel classe recebe numero aleatorio vezes 3
	console.log('tamanhoAleatorio '+tamanho) //mostra no console valor de tamanho (opcional)
	
	switch(tamanho) { //chave tamanho
		case 0: //caso 0 retorna elemento0 (classe que está em estilo.css)
			return 'elemento0'
		case 1: //caso 1 retorna elemento1 (classe que está em estilo.css)
			return 'elemento1'
		case 2: //caso 2 retorna elemento2 (classe que está em estilo.css)
			return 'elemento2'		
		}
	}	

//3° - Fim de criando variação de tamanho


//4º - criando movimento de lado
	function ladoAleatorio(){ //declaro funcao ladoAleatorio
	var lado = Math.floor(Math.random() * 2) //variavel classe recebe numero aleatorio vezes 2
	console.log('ladoAleatorio '+lado) //mostra no console valor de lado (opcional)
	//chave lado
	switch(lado) { //chave lado
		case 0: //caso 0 retorna ladoA (classe que está em estilo.css)
			return 'ladoA'
		case 1: //caso 1 retorna ladoB (classe que está em estilo.css)
			return 'ladoB'
		}
	}
	
//4º - Fim de criando movimento de lado

//fim da parte do personagem_______________________________________________________