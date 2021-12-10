<?php

include "php/services/ReviewService.php";

class ReviewController {
    private $reviewService;

    public function __construct() {
        $this->reviewService = new ReviewService();

    }

    public function saveUserReview ($data) {
        $restaurantId = (int)$data->restaurantId;
        $textReview = (string)$data->textReview;
        $deliciousnessScore = (int)$data->deliciousnessScore;
        $serviceScore = (int)$data->serviceScore;
        $experienceScore = (int)$data->experienceScore;
        $pricingScore = (int)$data->pricingScore;
        $pricingValue = (float)$data->pricingValue;
        $images = (array)$data->images;

        $response['response'] = $this->reviewService->processReview($restaurantId, $textReview, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue, $images);

        return json_encode($response);
    }

    public function userReviewPull($data) {
		$restaurantId = (int)$data->restaurantId;
        $userId = (int)$data->userId;
        $textReview = (string)$data->textReview;
        $deliciousnessScore = (int)$data->deliciousnessScore;
        $serviceScore = (int)$data->serviceScore;
        $experienceScore = (int)$data->experienceScore;
        $pricingScore = (int)$data->pricingScore;

		$response['response'] = $this->usersService->validateUserLoginRequest($restaurantId, $userId, $textReview, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore);
		
        return json_encode($response);
	}
}