$(document).ready(() => {

//carregando conteudo em uma pagina estatica com os 3 modos (.load() .get() e .post())
	$('#documentacao').on('click', () => {
		//$('#pagina').load('documentacao.html')

		/*
		$.get('documentacao.html', data => { 
			$('#pagina').html(data)
		})
		*/
		$.post('documentacao.html', data => { 
			$('#pagina').html(data)
		})
	})

	$('#suporte').on('click', () => {
		//$('#pagina').load('suporte.html')

		/*
		$.get('suporte.html', data => { 
			$('#pagina').html(data)
		})
		*/
		$.post('suporte.html', data => { 
			$('#pagina').html(data)
		})
	})


//disparando consulta HTTP com ajax
	$('#competencia').on('change', e => {

		let competencia = $(e.target).val()
		
		//requisição ajax: (método, url, dados, sucesso, erro)
		$.ajax({
			type: 'GET',
			url: 'app.php',
			data: `competencia=${competencia}`, //x-www-form-urlencoded
			dataType: 'json',
			success: dados => { 
			//IMPRIMIR DADOS NO DASHBOARD AQUI!!!
				$('#numeroVendas').html(dados.numeroVendas)
				$('#totalVendas').html(dados.totalVendas)
				$('#clientesAtivos').html(dados.clientesAtivos)
				$('#clientesInativos').html(dados.clientesInativos)
				$('#totalReclamacoes').html(dados.totalReclamacoes)
				$('#totalElogios').html(dados.totalElogios)
				$('#totalSugestoes').html(dados.totalSugestoes)
				$('#totalDespesas').html(dados.totalDespesas)

			//_________________________________________
			},
			error: erro => { console.log(erro) }
		})
	})

})