<?php

include_once "php/config.php";

class RestaurantDbGateway {

    // private $servername = "localhost";
    // private $username = "root";
    // private $password = "foody";
    // private $db = "foody";


    private $dbConnection = null;

    public function __construct() {
        $this->dbConnection = new DbConnecter();
    }

    // public function getRestaurants () {

    // }

    public function validateRestaurant (string $restaurantName, string $restaurantAddress, string $restaurantPhone, string $restaurantWebsite) {
        $sql = "CALL foody.sp_validateRestaurant ('$restaurantName', '$restaurantAddress', '$restaurantPhone', '$restaurantWebsite');";

        $result = $this->dbConnection->returnQuery($sql);

        if (mysqli_num_rows($result) > 0) {
            $output = (int)mysqli_fetch_assoc($result)["restaurantId"];
        }
        // $this->dbConnection->next_result();

        return $output;
    }
    // TODO: figure out why false returned instead of actual result!!!!!!!!!!!!!!!!!!!!
    public function saveRestaurantReview (int $restaurantId, int $userId, string $review, int $deliciousness, int $service, int $experience, int $pricing) {
        $sql = "CALL foody.sp_saveReview ($restaurantId, $userId, '$review', $deliciousness, $service, $experience, $pricing);";

        $result = $this->dbConnection->returnQuery($sql);
        $output = $result;
        // $this->dbConnection->next_result();

        // return $result;
    }

    // public function getRestaurantReviews () {

    // }

    // public function deleteRestaurantReview () {

    // }
}
