<?php

require_once 'pdo.php';
require_once 'utils.php';
session_start();
// define('HOST', 'http://localhost/add_image/index.php');			// uncomment for localhost
define('HOST', 'http://192.168.4.25/carrousel/index.php');  // uncomment for 000webhost

$db = new Database();
$utils = new Utils();

$getRows = $db->getRows("SELECT `carr_code`, `carr_saved_name`, `carr_date` FROM `carrousel` ORDER BY `carr_saved_name` ASC ");
if ($getRows) {
    $html = "<div align='center'>"
        . "<div class='boxshadow'>"
        . "<h3>Seleccione el carrusel</h3>"
        . "<select id='carr_saved' name='carr_saved' class='custom-select lista' size='10'>";
    foreach ($getRows as $row) {
        $html .= "<option value='".$row['carr_code']."' title='".$row['carr_date']."'>".$row['carr_saved_name']."</option>";
    }
    $html .= "</select></div><br>"
        . "<a id='open_carr' class='btn btn-primary' role='button' aria-pressed='true' onclick='loadData($(\"#carr_saved\").val());' rel='modal:close'>Abrir Carrusel</a>"
        . "<a id='cancel' class='btn btn-primary' role='button' aria-pressed='true' rel='modal:close' data-dismiss='modal'>Cancelar</a></div>";
    echo json_encode(array('closeClass' => 'icon-remove',
                            'closeText' => '!',
                            'fadeDuration' => 100, 
                            'html' => $html));
} else
    echo $utils->errorMsg("Ha ocurrido un error cargando el conjunto de im&aacute;genes");

$db->Disconnect();
