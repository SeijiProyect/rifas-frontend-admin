<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ini_set('memory_limit', '1024M');

// file_put_contents('log_'.date("j.n.Y").'.log', 'test', FILE_APPEND);
// die();

$geopay_result = json_encode($_POST);

if (count($_POST) == 0) {
    header('HTTP/1.0 403 Forbidden');
    die();
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://apirifas.detoqueytoque.com/geopay/process-geopay-result');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);                
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, "json=".$geopay_result);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded'
));

$result = curl_exec($ch);

curl_close($ch);

$response = json_decode($result);
$data = $response->message;

date_default_timezone_set( 'America/Argentina/Buenos_Aires' );

$log  = "GeopayResult: ".$geopay_result.PHP_EOL.
        "Date: ".date("F j, Y, g:i a").PHP_EOL.
        "ProcessResult: ".$result.PHP_EOL.
        "-------------------------".PHP_EOL;

// Save LOG
file_put_contents('log_'.date("j.n.Y").'.log', $log, FILE_APPEND);

if ( $data == '00 - Correcto' ){
    header('Location: https://rifas.detoqueytoque.com/success');
    exit();
} elseif ( $data == '05' ) {
	header('Location: https://rifas.detoqueytoque.com/error#?type=5');	
	exit();
}

header('Location: https://rifas.detoqueytoque.com/error#?type=1');
exit();

?>