var idCarousel = Math.floor(Math.random()*10000+1);

function addImage() {
	var contenedor = document.getElementsByClassName("contenedor")[0];
	var bloque = document.getElementById("bloque0");
	var value = parseInt(bloque.getAttribute('value')) + 1;
	bloque.setAttribute('value', value);
	contenedor.insertAdjacentHTML('beforeend','<div id="bloque'+ value +'"><hr>\
							<label for="imagen'+ value +'">Imagen:</label>\
							<input type="text" id="imagen'+value+'">\
							<p>\
							<label for="texto'+value+'">Texto:</label>\
							<input type="text" id="texto'+value+'">\
							</p>\
							<p>\
							<label for="url'+value+'">URL:</label>\
							<input type="text" id="url'+value+'">\
							</p>\
							<p>\
							<button id="quitar" onclick="removeImage(this.getAttribute(\'value\'))" value="'+value+'">-</button>\
							</p>\
							</div>');
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
	var html = document.getElementById("html");
	var contenedor = document.getElementsByClassName("contenedor")[0];
	var sequence = '';
	var images = '';
	var active = ' active';
	var i = 0;
	do {
		var image = contenedor.children[i].children[2].value;
		var text = contenedor.children[i].children[3].children[1].value;
		var url = contenedor.children[i].children[4].children[1].value;
		console.log(text);
		sequence += '<li data-target="#Carrusel'+idCarousel+'" data-slide-to='+i+' class='+active+'></li>';
		images += '<div class="item'+active+'"> <!-- Inicio Imagen -->\
			<a href=\"'+(url!==''?url:'#')+'\"><img src=\"'+image+'\" alt=\"'+(text!=''?text:'#')+'\" style="width: 100%;" /></a>\
			<div style="color:white; text-shadow: 2px 2px #000000; font-weight: bold; position: absolute; bottom: 8px; left: 16px;">'+text+'</div>\
			</div> <!-- Fin imagen -->';
		active = '';
		i++;
	} while(i < contenedor.childElementCount);
	html.innerHTML = header + sequence + middle + images + footer;
}

function removeImage(value) {
	var image = document.getElementById("bloque"+value).remove();
}