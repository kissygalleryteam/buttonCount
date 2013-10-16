<?php

	header('Content-type:application/x-javascript;charset=GBK');  
	$callback = $_GET['callback'];
	$s ='{"message":"本订单已经发送了5次短信了，不可以再发了哦。","status":true,"login": true}';
	if($callback)
		echo $callback."(".$s.")";
	else
		echo $s;
?>
