<!DOCTYPE html>
<html>
<head>
	<title>Crear Carrusel de Imágenes</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="Agrega_Imagen.css">
	<script src="jquery.min.js"></script>
	<script src="bootstrap.min.js"></script>
	<script src="jquery.modal.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script type="text/javascript" src="Agrega_Imagen.js"></script>
</head>
<body>
	<div class="main">
		<div class="btn-group" role="group">
			<a id="add" href="#" class="btn btn-primary" role="button" aria-pressed="true">Agregar Imagen</a>
			<a id="update" class="btn btn-primary" role="button" aria-pressed="true">Generar código</a>
			<a id="save" class="btn btn-primary" role="button" aria-pressed="true"><i class="fa fa-floppy-o" style="font-size:18px" onclick="save()"></i></a>
		</div>
		<form id="imageData" name='imageData'>
			<div class="panel-group" id="accordion">
	  		</div>
  		</form> 
	</div>
	<div id="ex1" class="modal">
		  		
	</div>
</body>
</html>