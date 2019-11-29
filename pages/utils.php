<?php 
class Utils 
{
	function errorMsg($text) {
		return json_encode(array('closeClass' => 'icon-remove',
					  			 'closeText' => '!',
					  			 'fadeDuration' => 100, 
					  			 'text' => $text));
	}
}
?>