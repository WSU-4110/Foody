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

        $this->dbConnection->cleanSPResults();

        return $output;
    }

    public function saveRestaurantReview (int $restaurantId, int $userId, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        $sql = "CALL foody.sp_saveReview ($restaurantId, $userId, '$review', $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);";

        $result = $this->dbConnection->returnQuery($sql);
        $output = mysqli_fetch_assoc($result)["result"];

        $this->dbConnection->cleanSPResults();

        return $output;
    }

    // public function getRestaurantReviews () {

    // }

    // public function deleteRestaurantReview () {

    // }
}
