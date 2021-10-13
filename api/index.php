<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

include "php/controllers/UsersController.php";

$requestBodyJson = file_get_contents('php://input');
$data = json_decode($requestBodyJson);
// echo $data->username;
// echo $data->url;



if($_SERVER["REQUEST_METHOD"] == "GET") {
	if($_GET['action'] == 'logout') {
		session_start();
		session_unset();
		session_destroy();
	}
	// } else if($_GET['action'] == 'yelpApiRequest') {
	// 	$result = file_get_contents('https://api.yelp.com/v3/businesses/search?location=detroit')

   	// 	 return $result;
	// }
}




if($_SERVER["REQUEST_METHOD"] == "POST") {
	if($data->url == "/user/register") {
		$userController = new UsersController();
		echo $userController->createNewUser($data);
	} else if($data->url == "/user/login") {
		$userController = new UsersController();
		echo $userController->userLoginRequest($data);
	}


}

