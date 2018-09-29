<?php 
session_start();
$str = '';
foreach ($_POST as $key => $value) {
	$str .= "$key => $value ";
}
echo $str;
 ?>