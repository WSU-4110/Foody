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

        $sql = sprintf("INSERT INTO foody.restaurants (restaurantName, restaurantAddress, restaurantPhone, restaurantWebsite)
            SELECT restaurantName, restaurantAddress, restaurantPhone, restaurantWebsite
            FROM (SELECT '%s' AS restaurantName, '%s' AS restaurantAddress, '%s' AS restaurantPhone, '%s' AS restaurantWebsite) AS tmp
            WHERE NOT EXISTS (SELECT 1 FROM foody.restaurants WHERE restaurantName = '%s' AND
            restaurantAddress = '%s');",

            $restaurantName,
            $restaurantAddress,
            $restaurantPhone,
            $restaurantWebsite,
            $restaurantName,
            $restaurantAddress
        );
        $this->dbConnection->returnQuery($sql);

        $sql = sprintf("SELECT restaurantId from foody.restaurants WHERE restaurantName = '%s' AND restaurantAddress = '%s';",

        $restaurantName,
        $restaurantAddress
        );
        $result = $this->dbConnection->returnQuery($sql);

        $output = (int)mysqli_fetch_assoc($result)["restaurantId"];

        return $output;
    }

    public function saveRestaurantReview (int $restaurantId, int $userId, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        $review = $this->dbConnection->cleanInput($review);

        $sql = sprintf("IF EXISTS (SELECT 1 FROM foody.restaurantReviews WHERE restaurantId = '%d' AND userId = '%d')
            THEN
                BEGIN
                    UPDATE foody.restaurantReviews SET
                    review = '%s',
                    deliciousnessScore = '%d',
                    serviceScore = '%d',
                    experienceScore = '%d',
                    pricingScore = '%d',
                    pricingValue = '%f',
                    updateDate = CURRENT_TIMESTAMP()
                    WHERE restaurantId = '%d' AND userId = '%d';

                    SELECT 'Review updated' AS result;
                END;
            ELSE
                BEGIN
                    INSERT INTO foody.restaurantReviews (
                        restaurantId,
                        userId,
                        review,
                        deliciousnessScore,
                        serviceScore,
                        experienceScore,
                        pricingScore,
                        pricingValue
                    )
                    VALUES (
                        '%d',
                        '%d',
                        '%s',
                        '%d',
                        '%d',
                        '%d',
                        '%d',
                        '%f'
                    );

                    SELECT 'Review saved' AS result;
                END;
            END IF;",
            $restaurantId,
            $userId,
            $review,
            $deliciousnessScore,
            $serviceScore,
            $experienceScore,
            $pricingScore,
            $pricingValue,
            $restaurantId,
            $userId,
            $restaurantId,
            $userId,
            $review,
            $deliciousnessScore,
            $serviceScore,
            $experienceScore,
            $pricingScore,
            $pricingValue
        );

        $result = $this->dbConnection->returnQuery($sql);
        $output = (int)mysqli_fetch_assoc($result)["result"];


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
