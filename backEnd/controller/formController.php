<?php

// Include the configuration file
require_once '../config/config.php';

class FormController {
    private $db;

    function __construct() {
        // Connect to the database
        global $configuration;
        $dbConfig = $configuration['database'];
        $dsn = "mysql:host={$dbConfig['hostname']};port={$dbConfig['port']};dbname={$dbConfig['name']}";
        $this->db = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
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
        $stmt = $this->db->prepare('INSERT INTO avis (email, pseudo, note, commentaire, photo) VALUES (:email, :pseudo, :note, :commentaire, :photo)');
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':pseudo', $data['pseudo']);
        $stmt->bindParam(':note', $data['note']);
        $stmt->bindParam(':commentaire', $data['commentaire']);
        $stmt->bindParam(':photo', $data['photo']);
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

// Instantiate the controller and submit the review
$controller = new FormController();
try {
    $controller->submitReview();
} catch (Exception $e) {
    // Send an HTTP 500 response with the error message
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}