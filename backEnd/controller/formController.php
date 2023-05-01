<?php

// Include the configuration file
require_once '../config/config.php';
require_once '../model/FormModel.php';

/**
 * This class handles the form submission
 */
class FormController {
    private $model;

    function __construct() {
        // Instantiate the model
        $this->model = new FormModel();
    }

    /**
     * Retrieve all reviews from the database and return them as a JSON response.
     *
     * @return string JSON-encoded reviews data
     *
     * @route /api/reviews
     * @method GET
     */

    function getAllReviews() {
        // Retrieve all reviews from the database using the model
        $reviews = $this->model->getAllReviews();

        // Send an HTTP 200 response with the reviews
        http_response_code(200);
        echo json_encode($reviews);
    }

    function submitReview() {
        // Retrieve the JSON sent by JavaScript
        $data = json_decode(file_get_contents("php://input"), true);

        // Check if the fields are filled
        if (empty($data['email']) || empty($data['pseudo']) || empty($data['note']) || empty($data['commentaire'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Tous les champs sont obligatoires.']);
            return;
        }

        // Save the review in the database using the model
        $result = $this->model->saveReview($data);
        if (!$result) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de l\'enregistrement de l\'avis.']);
            return;
        }

        // Send an HTTP 200 response with a success message
        http_response_code(200);
        echo json_encode(['success' => 'Votre avis a été publié avec succès !']);
    }
}

// Instantiate the controller
// Check if the HTTP method is GET or POST and call the appropriate method
// Instantiate the controller and handle the request
$controller = new FormController();

// Handle GET requests to retrieve all reviews
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->getAllReviews();
}

// Handle POST requests to submit a review
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $controller->submitReview();
    } catch (Exception $e) {
        // Send an HTTP 500 response with the error message
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
