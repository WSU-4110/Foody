<?php

include "php/Dbgateways/RestaurantDbGateway.php";

class RestaurantService {
    private $restaurantdbGateway;

    public function __construct() {
        $this->restaurantDbGateway = new RestaurantDbGateway();
    }

    public function processReview (string $restaurantName, string $restaurantAddress, string $restaurantPhone,
        string $restaurantWebsite, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue,
        array $images) {
        if (strlen($review) == 0) {
            return "Review cannot be blank";
        } else {
            $restaurantId = $this->restaurantDbGateway->validateRestaurant($restaurantName, $restaurantAddress, $restaurantPhone, $restaurantWebsite);

            $userId = 0;

            // TODO: add code to retrieve user id, probably in UserController

            $reviewId = $this->restaurantDbGateway->saveRestaurantReview($restaurantId, $userId, $review, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);

            if (count($images) > 0) {
                foreach ($images as $image) {
                    $this->restaurantDbGateway->addRestaurantImage($restaurantId, $reviewId, $image->name, $image->type, $image->size, $image->base64);
                }
            }

            return $reviewId;
        }
    }
}



