<?php 
session_start();
?>

<head>
	<title>Crear Carrusel de Imágenes</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.qtip.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.modal.min.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<link rel="stylesheet" href="css/jquery.modal.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script type="text/javascript" src="js/script.js"></script>
</head>
<body>
	<div class="main">
		<div class="btn-group" role="group">
			<a id="add" href="#" class="btn btn-primary" role="button" aria-pressed="true">Agregar Imagen</a>
			<a id="update" class="btn btn-primary" role="button" aria-pressed="true">Generar código</a>
                        <a id="save" href="#" class="btn btn-primary" role="button" aria-pressed="true" onclick="saveData()"><i class="fa fa-floppy-o" style="font-size:19px"></i></a>
			<a id="open" href="#" class="btn btn-primary" role="button" aria-pressed="true" onclick="openData()"><i class="fa fa-folder-open-o" style="font-size:19px"></i></a>
		</div>
		<form id="imageData" name='imageData'>
                    <input id="code" name="code" type="hidden">
                    <input id="name" name="name" type="hidden">
			<div class="panel-group" id="accordion">
	  		</div>
  		</form> 
	</div>
	<div id="ex1" class="modal">
		  		
	</div>
</body>
<?php
if(isset($_GET['code']))
	echo "<script type='text/javascript'>loadData('$_GET[code]');</script>";
?>