//1 vincular script e testar com: alert('ok')

//3 criar classe despesa
class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

//6 Validando objeto despesa
	validarDados() {
		for(let i in this) {//6PERCORRER idices dos atributos	console.log(i, this[i])//6MOSTRAR atributos e seus valores por indice
			if(this[i] == undefined || this[i] == '' || this[i] == null) {//6SE o valor for undefined/vazio/null retorne falso
				return false
			}
		}
		return true
	}
}

//----------------------------------------------------------------------------------------------------------
//5 criando classe Banco de dados 
class Bd {


//5e gerando  indice dinamico
	constructor() {//5constructor gera o primeiro id zero
		let id = localStorage.getItem('id')
		if(id === null) {//5se não tiver id
			localStorage.setItem('id', 0)//5id será zero
		}
	}
	getProximoId() {//5getproximoId soma mais 1 ao id existente 
		let proximoId = localStorage.getItem('id')//5PEGUE id de localStorage
		return parseInt(proximoId) + 1
	}


//4 gravando objeto em localStorage
	gravar(d) {
		let id = this.getProximoId()//5PEGUE valor de getProximoId
		localStorage.setItem(id, JSON.stringify(d))//4INSERIR em localstorage convertendo objeto para JSON
		localStorage.setItem('id', id)//5ALTERE id	
	}

	recuperarTodosRegistros() {//8recupera registros com logica abaixo
		let despesas = Array()//8CRIA despesa em Array
		let id = localStorage.getItem('id')//8RECEBE id de localStorage
		for(let i = 1; i <= id; i++) {//8percorre todos os indices 
			let despesa = JSON.parse(localStorage.getItem(i))//8recupera os registros pelos indices convertendo JSON para objeto 
			if(despesa === null) {continue}//8SE algum registro for null, pule-o e continue ate o fim excluindo-o da despesa
			
			despesa.id = i//14id recuperado para funcao excluir 
			
			despesas.push(despesa)//8INSERE registro na despesa  
		}
		return despesas//8retorno relacao por indice como valor para despesa
	}

	pesquisar(despesa){//11cria metodo pesquisar
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()

//12aplicando filtro
		console.log(despesasFiltradas);
		console.log(despesa)
		if(despesa.ano != ''){//12SE não for vazio filtre
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}
		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}
		return despesasFiltradas//12retorna o valor da pesquisa para a funcao 
	}

	remover(id){//14metodo que remove item da lista
		localStorage.removeItem(id)
	}
}

let bd = new Bd()//4gravando em local storage

//------------------------------------------------------------------------------------------------

//2 captura de dados com funcao
function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)

	if(despesa.validarDados()) {//6SE despesa tiver dados validos
		bd.gravar(despesa)//4gravando em local storage, 5 com indice dinamico

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido pequeno gafanhoto!!!'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Sucesso!!!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
		$('#modalRegistraDespesa').modal('show')//7MOSTRA alerta de sucesso

		//10 limpar formulario apos gravacao em localStorage
		ano.value = '' 
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''		
		
	} else {//6SENAO		
		document.getElementById('modal_titulo').innerHTML = 'Tente denovo jovem Padauã!!!'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Preencha todos os campos'
		document.getElementById('modal_btn').innerHTML = 'Corrigindo'
		document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalRegistraDespesa').modal('show')//7MOSTRA alerta de erro
	}
}

//----------------------------------------------------------------------------------------------

//8 recuperando registros do localStorage
function carregaListaDespesas(despesas = Array(), filtro = false) {//8linkado com pagina consulta acionada ao carregar a pagina
    if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros()//8 Array despesa receberá valor de funcao da classe bd que recuperRegistros para carregamento
	}
	/*<tr>
		<td>15/03/2018</td>
		<td>Alimentação</td>
		<td>Compras do mês</td>
		<td>444.75</td>
	</tr>*/
	
//9 linkando a tabela de consulta com a despesa de registros
	let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
	despesas.forEach(function(d){//9percorrer array despesando objetos 
		var linha = listaDespesas.insertRow();//9linha recebe = Cria linhas no Tbody da pagina consulta
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
		switch(d.tipo){//9Trantando o campo reg.tipo 
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

//14Criar o botão de exclusão na tabela de consulta
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'//14cor
		btn.innerHTML = '<i class="fa fa-times"  ></i>'//14tipo de botao
		btn.id = `id_despesa_${d.id}`//14  id associado do objeto despesa 
		btn.onclick = function(){//14funcao que remove despesa
			let id = this.id.replace('id_despesa_','')//14 substitui id por vazio
			//alert(id)
			bd.remover(id)//14chama metodo 
			window.location.reload()//14atualizar pagina
		}
		linha.insertCell(4).append(btn)
		console.log(d)
	})

 }

 //11Pesquisas
 function pesquisarDespesa(){//11Funcção vinculada a pagina	 
	let ano  = document.getElementById("ano").value//11pega valores de objeto despesa
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)//11declara objeto despesa

	let despesas = bd.pesquisar(despesa)//11chama metodo pesquisar em localStorage 
	 
	this.carregaListaDespesas(despesas, true)//13 este carregarlistaDespesas exibirá despesas

 }
