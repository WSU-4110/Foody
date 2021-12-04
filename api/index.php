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
include "php/controllers/RestaurantController.php";
include "php/controllers/ReviewController.php";

$requestBodyJson = file_get_contents('php://input');
$data = json_decode($requestBodyJson);
// echo $data->username;
// echo $data->url;

// print_r($_GET);



if($_SERVER["REQUEST_METHOD"] == "GET") {
	if($_GET['action'] == 'logout') {
		session_start();
		session_unset();
		session_destroy();
	} else if ($_GET['action'] == "reviews") {
		// $restaurantName = $_GET['restaurantName'];
		// $restaurantAddress = $_GET['restaurantAddress'];
		$reviewController = new ReviewController();
		echo $reviewController->getRestaurantReviews();
	}
}




if($_SERVER["REQUEST_METHOD"] == "POST") {
	if($data->url == "/user/register") {
		$userController = new UsersController();
		echo $userController->createNewUser($data);
	} else if($data->url == "/user/login") {
		$userController = new UsersController();
		echo $userController->userLoginRequest($data);
	} else if ($data->url == "/restaurant/process") {
		$restaurantController = new RestaurantController();
		echo $restaurantController->saveRestaurant($data);
	} else if ($data->url =="/restaurant/id") {
		$restaurantController = new RestaurantController();
		echo $restaurantController->getRestaurantId($data);
	} else if ($data->url == "/review/save") {
		$reviewController = new ReviewController();
		echo $reviewController->saveUserReview($data);
	}
}

