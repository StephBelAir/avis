<?php

// Include the configuration file
require_once '../config/config.php';

/**
 * This class handles the form submission
 */
class FormController {
    private $db;

    function __construct() {
        // Connect to the database
        global $configuration;
        $dbConfig = $configuration['database'];
        $dsn = "mysql:host={$dbConfig['hostname']};port={$dbConfig['port']};dbname={$dbConfig['name']}";
        $this->db = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
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
        // Retrieve all reviews from the database
        /**
         * TODO : refactor this code to use the model
         */
        $stmt = $this->db->prepare('SELECT * FROM avis');
        $stmt->execute();
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

        /**
         * TODO : refactor this code to use the model
         */
        // Save the review in the database
        $stmt = $this->db->prepare('INSERT INTO avis (email, pseudo, note, commentaire, photo, timestamp) VALUES (:email, :pseudo, :note, :commentaire, :photo, :timestamp)');
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':pseudo', $data['pseudo']);
        $stmt->bindParam(':note', $data['note']);
        $stmt->bindParam(':commentaire', $data['commentaire']);
        $stmt->bindParam(':photo', $data['photo']);
        $stmt->bindParam(':timestamp', $data['timestamp']);
        $result = $stmt->execute();
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