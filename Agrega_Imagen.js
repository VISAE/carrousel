var idCarousel = Math.floor(Math.random()*10000+1);
var counter = 0;

$(document).ready(function() {

	$('#add').click(function() {
		addImage();		
	});

	$('#update').click(function() {	
		if($("#accordion .panel-collapse").length > 0) {	
			$("#ex1").empty().append("<p>De click en el código para seleccionar y copiar automáticamente</p>"+
							 		 "<p><textarea id='html' onclick='selectText()'></textarea></p>").modal({
	  			fadeDuration: 100
			});
			$('#html').val(addCode());
		} else {
			$("#ex1").empty().append("<h2 style='color:red;'>¡No se han agregado imágenes!</h2>").modal({
	  			fadeDuration: 100
			});
		}
	});
});

function addImage() {
	counter++;	
	$('#accordion').append(		
	"<div id='panel"+counter+"' class='panel panel-default'>"+
      "<div class='panel-heading'>"+
        "<h4 class='panel-title'>"+	
          "<a data-toggle='collapse' data-parent='#accordion' href='#collapse"+counter+"'>Imagen #"+($("#accordion").children().length+1)+"</a>"+
          "<span class='deleteAccordion' onclick='deleteAccordion("+counter+")'>X</span>"+
        "</h4>"+
      "</div>"+
      "<div id='collapse"+counter+"' class='panel-collapse collapse'>"+
        "<div class='panel-body'>"+
        	"<div class='contenedor'>"+
				"<div class='bloque' id='bloque"+counter+"' value='"+counter+"'>"+
					"<div>"+
						"<label for='imagen"+counter+"'>Imagen:</label>"+
						"<input type='text' id='imagen"+counter+"' name='imagen"+counter+"'>"+
					"</div>"+
					"<div>"+
						"<label for='texto"+counter+"'>Texto:</label>"+
						"<input type='text' id='texto"+counter+"' name='texto"+counter+"'>"+
					"</div>"+
					"<div>"+
						"<label for='url"+counter+"'>URL:</label>"+
						"<input type='text' id='url"+counter+"' name='url"+counter+"'>"+
					"</div>"+
				"</div>"+
			"</div>"+
        "</div>"+
      "</div>"+
    "</div>"
    );
}

function addCode() {
	var header = '<div id="Carrusel'+idCarousel+'" class="carousel slide" data-ride="carousel" style="width: 600px; margin: 0 auto;">\
		<ol class="carousel-indicators">';
	var middle = '</ol>\
		<div class="carousel-inner"> <!-- Inicio Contenedor de las imagenes -->';
	var footer = '</div> <!-- Fin Contenedor de las imagenes -->\
		<a class="left carousel-control" href="#Carrusel'+idCarousel+'" role="button" data-slide="prev">\
		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
		<span class="sr-only">Anterior</span>\
		</a>\
		<a class="right carousel-control" href="#Carrusel'+idCarousel+'" role="button" data-slide="next">\
		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
		<span class="sr-only">Next</span>\
		</a>\
		</div>';
	var sequence = '';
	var images = '';
	var active = ' active';
	var i = 0, inc = 0;	
	var inputs = $("#accordion .panel-collapse .panel-body .contenedor .bloque div input");
	do {
		var image = inputs[i++].value;
		var text = inputs[i++].value;
		var url = inputs[i++].value;
		sequence += '<li data-target="#Carrusel'+idCarousel+'" data-slide-to='+(inc++)+' class='+active+'></li>';
		images += '<div class="item'+active+'"> <!-- Inicio Imagen -->\
			<a href=\"'+(url!==''?url:'#')+'\"><img src=\"'+image+'\" alt=\"'+(text!=''?text:'#')+'\" style="width: 100%;" /></a>\
			<div style="color:white; text-shadow: 2px 2px #000000; font-weight: bold; position: absolute; bottom: 8px; left: 16px;">'+text+'</div>\
			</div> <!-- Fin imagen -->';
		active = '';
	} while(i < inputs.length);
	return header + sequence + middle + images + footer;
}

function deleteAccordion(id) {
	$('#panel'+id).remove();	
	for (var i = 0; i < $("#accordion").children().length; i++)
		$("#accordion .panel .panel-heading .panel-title a")[i].text = 'Imagen #'+(i+1);
}


function selectText() {
	$('#html').focus().select();
	document.execCommand('copy');
}

function save() {		
	$.ajax({
		type: 'POST',
		data: $('#imageData').serialize(),
		url: 'savedata.php',
		success: function(data) {
			console.log(data);
		}
	});
}