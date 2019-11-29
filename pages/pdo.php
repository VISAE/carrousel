<?php 
class Database {
	public $isConn;
	protected $db;

	// se conecta a la bd
	// public function __construct($username = 'admin', $password = '', $host = 'localhost', $dbname = 'test') {  								// uncomment for localhost
	public function __construct($username = 'root', $password = 'V1s43_S3rv!d0r_Thr33', $host = '192.168.4.25', $dbname = 'moodle') {  	// uncomment for 000webhost
		$this->isConn = TRUE;
		try {
			$this->db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			throw new Exception($e->getMessage());			
		}
	}

	// se desconecta de la bd
	public function Disconnect() {
		$this->db = NULL;
		$this->isConn = FALSE;
	}

	//obtener fila
	public function getRow($query, $params = array()) {
		try {
			$stmt = $this->db->prepare($query);
			$stmt->execute($params);
			return $stmt->fetch();
		} catch (PDOException $e) {
			throw new Exception($e->getMessage());
		}
	}

	// obtener todas la filas
	public function getRows($query, $params = array()) {
		try {
			$stmt = $this->db->prepare($query);
			$stmt->execute($params);
			return $stmt->fetchAll();
		} catch (PDOException $e) {
			throw new Exception($e->getMessage());
		}
	}

	// insertar una fila
	public function insertRow($query, $params) {
		try {
			$stmt = $this->db->prepare($query);
			$stmt->execute($params);
		} catch (PDOException $e) {
			throw new Exception($e->getMessage());
		}
	}


	// actualizar filas
	public function updateRow($query, $params) {
		return $this->insertRow($query, $params);
	}


	// eliminar filas
	public function deleteRow($query, $params) {
		return $this->insertRow($query, $params);
	}
}
 ?>

