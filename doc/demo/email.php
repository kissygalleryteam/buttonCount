<?php

	header('Content-type:application/x-javascript;charset=GBK');  
	$callback = $_GET['callback'];
	$s ='{"message":"�������Ѿ�������5�ζ����ˣ��������ٷ���Ŷ��","status":true,"login": true}';
	if($callback)
		echo $callback."(".$s.")";
	else
		echo $s;
?>
