<?php

require_once 'pdo.php';
require_once 'utils.php';
session_start();
// define('HOST', 'http://localhost/add_image/index.php');			// uncomment for localhost
define('HOST', 'http://192.168.4.25/carrousel/index.php');  // uncomment for 000webhost

$db = new Database();
$utils = new Utils();

$name = isset($_POST['name']) && $_POST['name'] != ''?$_POST['name']:"Sin Nombre";

if (isset($_POST['code']) && $_POST['code'] != '' ) {
    $code = $_POST['code'];
    $getRow = $db->getRow("SELECT `carr_saved_name` FROM `carrousel` WHERE `carr_code` = ?", [$code]);
    if ($getRow) {
        if ($getRow['carr_saved_name'] != $name)
            $code = generateCode();
    } else {
        echo $utils->errorMsg("<p>Error: Ese carrusel no existe.</p>");
    }
} else {
    $code = generateCode();
}

if (isset($_POST['total']) && $_POST['total'] > 0) {
    if (isset($_POST['confirm']) && $_POST['confirm'] > 0) {
        $imgData = array();
        $counter = 0;
        $stored = 0;

        $db->insertRow("INSERT INTO `carrousel` (`carr_code`, `carr_date`, carr_saved_name) VALUE (?, ?, ?) "
            . " ON DUPLICATE KEY UPDATE "
            . " carr_date = ? ", [$code, date('Y-m-d H:i:s'), $name, date('Y-m-d H:i:s')]);
        $deleteRow = $db->deleteRow("DELETE FROM carrousel_images WHERE `carr_img_carr_code` = ?", [$code]);
        foreach ($_POST as $key => $value) {
            if(in_array($key,['code','name']))
                continue;
            array_push($imgData, $value);
            if (++$counter % 3 == 0) {
                $imgData = array_map('trim', $imgData);
                if (!empty(implode('', $imgData))) {                    
                    $insertRow = $db->insertRow("INSERT INTO `carrousel_images` (`carr_img_carr_code`, `carr_img_data`) VALUES (?, ?)", [$code, implode(',', $imgData)]);
                    $stored++;
                }
                $imgData = array();
            }
        }

        if ($stored > 0)
            echo $utils->errorMsg("<p>Se han almacenado <strong>$stored</strong> imágenes<br><br>
                            Su enlace para acceder: <br><input type='text' id='link' value='" . HOST . "?code=$code' onclick='selectText(\"link\")'><script>$('#code').val('".$code."');</script>");
        else {
            echo $utils->errorMsg("<p>No se ha almacenado ningúna imágen.</p>");
            $deleteRow = $db->deleteRow("DELETE FROM carrousel WHERE `carr_code` = ?", [$code]);
        }
    } else {
        $html = "<div align='center'>"
            . "<h3>Desea guardar el carrusel?</h3>"
            . "<label for='carr_name'>Nombre del carrusel:</label>"
            . "<input id='carr_name' class='form-control' type='text' value='".$name."' autofocus='autofocus' onfocus='this.select()'><br><br>"
            . "<a id='save_carr' class='btn btn-primary' role='button' aria-pressed='true' onclick='saveData(\"" . $code . "\", $(\"#carr_name\").val());' rel='modal:close'>Guardar</a>"
            . "<a id='cancel' class='btn btn-primary' role='button' aria-pressed='true' rel='modal:close' data-dismiss='modal'>Cancelar</a></div>";
        echo $utils->errorMsg($html);
    }
} else {
    echo $utils->errorMsg("ha ocurrido un error");
}

function generateCode() {
    global $db;
    $code = substr(str_shuffle(str_repeat('abcdefghijklmnopqrstuvwxyz0123456789', 10)), 0, 10);
    $getRow = $db->getRow("SELECT `carr_code` FROM `carrousel` WHERE `carr_code` = ?", [$code]);
    if ($getRow) {
        generateCode();
    }
    return $code;
}

$db->Disconnect();
?>
