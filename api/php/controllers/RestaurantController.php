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
        $deliciousness = (int)$data->deliciousness;
        $service = (int)$data->service;
        $experience = (int)$data->experience;
        $pricing = (int)$data->pricing;

        $response['response'] = $this->restaurantService->processReview($restaurantName, $restaurantAddress, $restaurantPhone,
        $restaurantWebsite, $review, $deliciousness, $service, $experience, $pricing);

        return json_encode($response);
    }
}