<?php

include "php/Dbgateways/ReviewDbGateway.php";

class ReviewService {
    private $reviewDbGateway;

    public function __construct() {
        $this->reviewDbGateway = new ReviewDbGateway();
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
}