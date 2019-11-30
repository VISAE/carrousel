var idCarousel = Math.floor(Math.random()*10000+1);
var counter = 0;

$(document).ready(function() {

	$('#add').click(function() {
		addImage();		
	});

	$('#update').click(function() {	
		if($("#accordion .panel-collapse").length > 0) {	
			showToolTips();
			$("#ex1").empty().append("<p>De click en el código para seleccionar y copiar automáticamente</p>"+
							 		 "<p><textarea id='html' onclick='selectText(\"html\")'></textarea></p>").modal({
	  			fadeDuration: 100
			});
			$('#html').val(addCode());			
		} else {
			$("#ex1").empty().append("<h2 style='color:red;'>¡No se han agregado imágenes!</h2>").modal({
	  			fadeDuration: 100
			});
		}
	});
	
	showToolTips();
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
						"<input type='text' id='imagen"+counter+"' name='imagen"+counter+"' class='imagen'>"+
					"</div>"+
					"<div>"+
						"<label for='texto"+counter+"'>Texto:</label>"+
						"<input type='text' id='texto"+counter+"' name='texto"+counter+"' class='texto'>"+
					"</div>"+
					"<div>"+
						"<label for='url"+counter+"'>URL:</label>"+
						"<input type='text' id='url"+counter+"' name='url"+counter+"' class='url'>"+
					"</div>"+
				"</div>"+
			"</div>"+
        "</div>"+
      "</div>"+
    "</div>"
    );
}

function addCode() {
	var header = '<div id="Carrusel'+idCarousel+'" class="carousel slide" data-ride="carousel" style="width: 800px; margin: 0 auto;">\
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
			<a href=\"'+(url!==''?url:'#')+'\" target="_blank"><img src=\"'+image+'\" alt=\"'+(text!=''?text:'#')+'\" style="width: 100%;" /></a>\
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


function selectText(element) {
	$('#'+element).focus().select();
	document.execCommand('copy');
}

function saveData(code=null, name=null) {
	var totalImages = $('#accordion .panel-collapse').length;
	if(totalImages > 0) {
            if(name && name != $('#name').val())
                $('#name').val(name);
		var strData = $('#imageData').serialize();
		strData += '&total='+totalImages+'&confirm='+(code?1:0);
		$.ajax({
			type: 'POST',
			data: strData,
			url: 'pages/savedata.php',
			success: function(data) {
				data = JSON.parse(data);
				$("#ex1").empty().append(data.text).modal(data);
			}
		});
	} else {
		$("#ex1").empty().append("<h2 style='color:red;'>¡No se han agregado imágenes!</h2>").modal({
	  			fadeDuration: 100
			});
	}
	return false;
}

function loadData(code) {
    $('#accordion').empty();
    if(code !== 'undefined') {
        $('#code').val(code);
	$.ajax({
		type: 'POST',
		data: {code:code},
		url: 'pages/loaddata.php',
		success: function(data) {
			data = JSON.parse(data);                        
			if(!data.hasOwnProperty('text')) {
				data.forEach(row => {
					addImage();                                        
					let fields = row.carr_img_data.split(",");
					$('#imagen'+counter).val(fields[0]);
					$('#texto'+counter).val(fields[1]);
					$('#url'+counter).val(fields[2]);
                                        $('#name').val(row.name);
				});
			} else {
				$("#ex1").empty().append(data.text).modal(data);
			}
		}
	});
    }
    return false;
}

function showToolTips() {
	$('.panel').each(function() {
		var imagen = $(this).find(".panel-collapse .panel-body .contenedor .bloque div .imagen");
    	imagen.val(googleLinks(imagen.val()));		
		$(this).qtip({
	        content: "<img src='"+imagen.val()+"' width='150' />",
	        position: {
	            target: 'mouse', // Track the mouse as the positioning target
	            adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
	        }
    	});
	});
}

function googleLinks(link) {
	let str = link;
	link = link.match(/https:\/\/drive.google.com\/file\/d\/(.*?)\/view\?usp=sharing/g);
	if(link) {
		link = link.map(function(val){
   					var s = val.replace(/https:\/\/drive.google.com\/file\/d\//g,'');
					str = "http://drive.google.com/uc?export=view&id=" + s.replace(/\/view\?usp=sharing/g, '');
					});	
	}
	return str;
}

function openData() {
    $.ajax({
        type: 'POST',
	url: 'pages/opendata.php',
	success: function(data) {
            data = JSON.parse(data);            
            if(!data.hasOwnProperty('text')) {
                $("#ex1").empty().append(data.html).modal(data);
            } else {
		$("#ex1").empty().append(data.text).modal(data);
            }
	}
    });
}