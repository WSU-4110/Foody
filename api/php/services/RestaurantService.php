<?php

include "php/Dbgateways/RestaurantDbGateway.php";

class RestaurantService {
    private $restaurantdbGateway;

    public function __construct() {
        $this->restaurantDbGateway = new RestaurantDbGateway();
    }

    public function processReview (string $restaurantName, string $restaurantAddress, string $restaurantPhone,
        string $restaurantWebsite, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        if (strlen($review) == 0) {
            return "Review cannot be blank";
        } else {
            $restaurantId = $this->restaurantDbGateway->validateRestaurant($restaurantName, $restaurantAddress, $restaurantPhone, $restaurantWebsite);

            $userId = 0;

            // TODO: add code to retrieve user id, probably in UserController

            $response = $this->restaurantDbGateway->saveRestaurantReview($restaurantId, $userId, $review, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);

            return $response;
        }
    }
}



