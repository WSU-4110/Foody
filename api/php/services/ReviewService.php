<?php

include "php/Dbgateways/ReviewDbGateway.php";
include "php/services/RestaurantService.php";

class ReviewService {
    private $reviewDbGateway;
    private $restaurantService;

    public function __construct() {
        $this->reviewDbGateway = new ReviewDbGateway();
        $this->restaurantService = new RestaurantService();
    }

    public function validateReview(int $userId, int $restaurantId) {
        $reviewId = null;

        $reviewId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);
        if (!isset($reviewId)) {
            return "Review not found";
        }
        else {
            return "Review found";
        }
    }

    public function processReview (int $restaurantId, string $textReview, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue, array $images) {
        $userId = 0;

        $checkReview = $this->validateReview($userId, $restaurantId);
        // TODO: add code to retrieve user id

        if ($checkReview == "Review not found") {
            $this->reviewDbGateway->saveReview($userId, $restaurantId, $textReview, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);
            return "Review saved";
        }
        else {
            $this->reviewDbGateway->updateReview($userId, $restaurantId, $textReview, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue);
            return "Review updated";
        }

        // TODO: retrieve review id, save images (sprint 3)
    }

    public function getReviewId(int $userid, int $restaurantId) {
        $restaurantId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);
    }

    public function saveReviewImages (int $reviewId, array $images) {
        if (count($images) > 0) {
            foreach ($images as $image) {
                $this->reviewDbGateway->saveReviewImage($reviewId, $image->name, $image->type, $image->size, $image->base64);
            }
        }
    }

    public function getRestaurantReviews($restaurantName, $restaurantAddress) {
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantName, $restaurantAddress);

        // this should really check if restaurant is null or not
        #TODO: refactoring getRestaurantId method in restaurantService 
        if($restaurantId == 0) {
            return "No Reviews For This Restaurant!";
        } 

        $reviews = $this->reviewDbGateway->getRestaurantReviews($restaurantId);
        return $reviews;
    }
}