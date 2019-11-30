<?php 
require_once 'pdo.php';
require_once 'utils.php';
session_start();

$db = new Database();
$utils = new Utils();

if (isset($_POST['code'])) {	
	$code = $_POST['code'];

	$getRow = $db->getRow("SELECT `carr_code`, carr_saved_name FROM `carrousel` WHERE `carr_code` = ?", [$code]);
	if ($getRow) {
            $name = $getRow['carr_saved_name'];
		$getRows = $db->getRows("SELECT `carr_img_carr_code`, `carr_img_data`, '".$name."' AS name FROM `carrousel_images` WHERE `carr_img_carr_code` = ?", [$code]);
		if($getRows) {
			$data = array();
			foreach ($getRows as $row) 
				array_push($data, $row);
			echo json_encode($data);
		} else
		echo $utils->errorMsg("Ha ocurrido un error cargando los elementos");
	} else {
		echo $utils->errorMsg("Ese carrusel no existe!");
	}
} else
	echo $utils->errorMsg("Enlace incorrecto!");

$db->Disconnect();
?>