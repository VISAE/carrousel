<?php 
require_once 'pdo.php';
require_once 'utils.php';
session_start();
// define('HOST', 'http://localhost/add_image/index.php');			// uncomment for localhost
define('HOST', 'http://192.168.4.25/carrousel/index.php');		// uncomment for 000webhost

$db = new Database();
$utils = new Utils();

if(isset($_POST['total']) && $_POST['total'] > 0) {
	$imgData = array();
	$counter = 0;
	$stored = 0;
	$code = generateCode();
	$db->insertRow("INSERT INTO `carrousel` (`carr_code`, `carr_date`) VALUE (?, ?)",[$code, date('Y-m-d H:i:s')]);
	$carrouselData = array();
	foreach ($_POST as $key => $value) {
		array_push($imgData, $value);
		if(++$counter % 3 == 0) {
			$imgData = array_map('trim', $imgData);
			if (!empty(implode('',$imgData))) {
				$insertRow = $db->insertRow("INSERT INTO `carrousel_images` (`carr_img_carr_code`, `carr_img_data`) VALUES (?, ?)",[$code, implode(',',$imgData)]);
				$stored++;
			}
			$imgData = array();
		}
	}

	if($stored > 0)
		echo $utils->errorMsg("<p>Se han almacenado <strong>$stored</strong> imágenes<br><br>
							   Su enlace para acceder: <br><input type='text' id='link' value='".HOST."?code=$code' onclick='selectText(\"link\")'>");
	else {
		echo $utils->errorMsg("<p>No se ha almacenado ningúna imágen.</p>");
		$deleteRow = $db->deleteRow("DELETE FROM carrousel WHERE `carr_code` = ?", [$code]);
	}
} else {
	echo $utils->errorMsg("ha ocurrido un error");
}


function generateCode() {
	global $db;
	$code = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
	$getRow = $db->getRow("SELECT `carr_code` FROM `carrousel` WHERE `carr_code` = ?", [$code]);
	if ($getRow) {
		generateCode();
	}
	return $code;
}

$db->Disconnect();


 ?>
