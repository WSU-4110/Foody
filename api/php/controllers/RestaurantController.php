<?php

include "php/services/RestaurantService.php";

class RestaurantController {
    private $restaurantService;

    public function __construct() {
        $this->restaurantService = new RestaurantService();

    }

    // public function getRestaurantId ()
    // {
    // }

    public function saveReview ($data) {
        $restaurantName = (string)$data->restaurantName;
        $restaurantPhone = (string)$data->restaurantPhone;
        $restaurantAddress = (string)$data->restaurantAddress;
        $restaurantWebsite = (string)$data->restaurantWebsite;
        $review = (string)$data->review;
        $deliciousnessScore = (int)$data->deliciousnessScore;
        $serviceScore = (int)$data->serviceScore;
        $experienceScore = (int)$data->experienceScore;
        $pricingScore = (int)$data->pricingScore;
        $pricingValue = (float)$data->pricingValue;
        $images = (array)$data->images;

        $response['response'] = $this->restaurantService->processReview($restaurantName, $restaurantAddress, $restaurantPhone,
        $restaurantWebsite, $review, $deliciousnessScore, $serviceScore, $experienceScore, $pricingScore, $pricingValue, $images);

        return json_encode($response);
    }
}