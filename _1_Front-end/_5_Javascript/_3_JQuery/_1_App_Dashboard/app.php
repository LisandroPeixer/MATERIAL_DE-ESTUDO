<?php

//classe dashboard (Preenchendo dados no painel)
	class Dashboard {

		public $data_inicio;
		public $data_fim;

	//INDICES NO DASHBOARD AQUI!!!
		public $numeroVendas;
		public $totalVendas;
		public $clientesAtivos;
		public $clientesInativos;
		public $totalReclamacoes;
		public $totalElogios;
		public $totalSugestoes;
		public $totalDespesas;

	//____________________________________	
		public function __get($atributo) {
			return $this->$atributo;
		}

		public function __set($atributo, $valor) {
			$this->$atributo = $valor;
			return $this;
		}
	}

//classe de conexão bd (endereço / nome do database / usuario / senha)
	class Conexao {
		private $host = 'localhost';
		private $dbname = 'dashboard';
		private $user = 'root';
		private $pass = '';

		public function conectar() {
			try {

				$conexao = new PDO(
					"mysql:host=$this->host;dbname=$this->dbname",
					"$this->user",
					"$this->pass"
				);

				//faz conexão trabalhar com UTF8
				$conexao->exec('set charset set utf8');

				return $conexao;

			} catch (PDOException $e) {
				echo '<p>'.$e->getMessege().'</p>';
			}
		}
	}

//classe (model/serviço = faz a requisição conforme o objeto do dashboard via conexão para o banco de dados)
	class Bd {
		private $conexao;
		private $dashboard;

		public function __construct(Conexao $conexao, Dashboard $dashboard) {
			$this->conexao = $conexao->conectar();
			$this->dashboard = $dashboard;
		}

	//REQUISIÇÕES PARA O BANCO DE DADOS AQUI!!!
		public function getNumeroVendas() {
			$query = '
				select 
					count(*) as numero_vendas 
				from 
					tb_vendas 
				where 
					data_venda between :data_inicio and :data_fim';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->numero_vendas;
		}
		public function getTotalVendas() {
			$query = '
				select 
					SUM(total) as total_vendas 
				from 
					tb_vendas 
				where 
					data_venda between :data_inicio and :data_fim';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->total_vendas;
		}
		public function getClientesAtivos() {
			$query = '
				select 
					count(*) as clientes_ativos 
				from 
					tb_clientes 
				where 
					cliente_ativo = 1';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->clientes_ativos;
		}
		public function getClientesInativos() {
			$query = '
				select 
					count(*) as clientes_inativos 
				from 
					tb_clientes 
				where 
					cliente_ativo = 0';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->clientes_inativos;
		}
		public function getTotalReclamacoes() {
			$query = '
				select 
					count(*) as total_reclamacoes 
				from 
					tb_contatos 
				where 
					tipo_contato = 1';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->total_reclamacoes;
		}
		public function getTotalElogios() {
			$query = '
				select 
					count(*) as total_Elogios 
				from 
					tb_contatos 
				where 
					tipo_contato = 2';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->total_Elogios;
		}
		public function getTotalSugestoes() {
			$query = '
				select 
					count(*) as totalSugestoes 
				from 
					tb_contatos 
				where 
					tipo_contato = 3';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->totalSugestoes;
		}
		public function getTotalDespesas() {
			$query = '
				select 
					SUM(total) as totalDespesas 
				from 
					tb_despesas 
				where 
					data_despesa between :data_inicio and :data_fim';

			$stmt = $this->conexao->prepare($query);
			$stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
			$stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_OBJ)->totalDespesas;
		}
	
	//__________________________________________________________		
	}

//criando objetos das classes (lógica do script)
	$dashboard = new Dashboard();
	$conexao = new Conexao();

		//configuração de competencia 
		$competencia = explode('-', $_GET['competencia']);
		$ano = $competencia[0];
		$mes = $competencia[1];
		$dias_do_mes = cal_days_in_month(CAL_GREGORIAN, $mes, $ano);//conta dias do mes
		$dashboard->__set('data_inicio', $ano.'-'.$mes.'-01');
		$dashboard->__set('data_fim', $ano.'-'.$mes.'-'.$dias_do_mes);


	$bd = new Bd($conexao, $dashboard);

	//ALTERA OS VALORES NO DASHBOARDO AQUI!!!
		$dashboard->__set('numeroVendas', $bd->getNumeroVendas());
		$dashboard->__set('totalVendas', $bd->getTotalVendas());
		$dashboard->__set('clientesAtivos', $bd->getClientesAtivos());
		$dashboard->__set('clientesInativos', $bd->getClientesInativos());	
		$dashboard->__set('totalReclamacoes', $bd->getTotalReclamacoes());	
		$dashboard->__set('totalElogios', $bd->getTotalElogios());	
		$dashboard->__set('totalSugestoes', $bd->getTotalSugestoes());	
		$dashboard->__set('totalDespesas', $bd->getTotalDespesas());	

	//________________________________________________________
		echo json_encode($dashboard);//transcreve texto para json



?>