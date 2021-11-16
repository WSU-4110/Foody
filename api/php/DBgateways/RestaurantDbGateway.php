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
        $restaurantName = $this->dbConnection->cleanInput($restaurantName);
        $restaurantAddress = $this->dbConnection->cleanInput($restaurantAddress);
        $restaurantPhone = $this->dbConnection->cleanInput($restaurantPhone);
        $restaurantWebsite = $this->dbConnection->cleanInput($restaurantWebsite);
        $restaurantName = $this->dbConnection->cleanInput($restaurantName);
        $restaurantAddress = $this->dbConnection->cleanInput($restaurantAddress);

        $sql = "CALL foody.sp_validateRestaurant ('$restaurantName', '$restaurantAddress', '$restaurantPhone', '$restaurantWebsite');";

        $result = $this->dbConnection->returnQuery($sql);

        $output = (int)mysqli_fetch_assoc($result)["restaurantId"];


        $this->dbConnection->cleanSPResults();

        return $output;
    }

    public function saveRestaurantReview (int $restaurantId, int $userId, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        $review = $this->dbConnection->cleanInput($review);

        $sql = "CALL foody.sp_saveReview ($restaurantId, $userId, '$review', $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);";

        $result = $this->dbConnection->returnQuery($sql);
        $output = mysqli_fetch_assoc($result)["result"];

        $this->dbConnection->cleanSPResults();

        return $output;
    }

    public function addRestaurantImage (int $restaurantId, int $reviewId, string $imageName, string $imageSize, string $imageType, string $image) {
        $sql = "INSERT INTO foody.restaurantImages (restaurantId, reviewId, imageName, imageSize, imageType, imageEncoded)
            VALUES ('$restaurantId', '$reviewId', '$imageName', '$imageSize', '$imageType', '$image')";

        // $this->dbConnection->returnQuery($sql);
    }

    // public function getReviewId ($restaurantId, $userId) {
    // }

    // public function getRestaurantReviews () {

    // }

    // public function deleteRestaurantReview () {

    // }
}
