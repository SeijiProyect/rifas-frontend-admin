<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ini_set('memory_limit', '1024M');

$echoToken = json_encode( array('token' => 'diandfvluNCnbawehfb2348dSANndb') );

// if (count($_POST) == 0) {
//     header('HTTP/1.0 403 Forbidden');
//     die();
// }

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://apirifas.detoqueytoque.com/geopay/echo-test');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, "json=".$echoToken);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded'
));

$result = curl_exec($ch);

curl_close($ch);

$response = json_decode($result);
$data = $response->data;

date_default_timezone_set( 'America/Argentina/Buenos_Aires' );

$log  = "echoTestResult: ".$result.PHP_EOL.
        "Date: ".date("F j, Y, g:i a").PHP_EOL.
        "-------------------------".PHP_EOL;

// Save LOG
file_put_contents('logs/echoTest_'.date("j.n.Y").'.log', $log, FILE_APPEND);

// if ( $data == '00 - Correcto'){
//     header('Location: https://rifas.detoqueytoque.com/success');
//     exit();
// }

// header('Location: https://rifas.detoqueytoque.com/error');
// exit();

?>