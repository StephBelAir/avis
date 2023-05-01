<?php


require_once '../config/config.php';

/**
 * This class handles database interactions for the form.
 */
class FormModel
{
    private $db;

    function __construct()
    {
        global $configuration;
        $dbConfig = $configuration['database'];
        $dsn = "mysql:host={$dbConfig['hostname']};port={$dbConfig['port']};dbname={$dbConfig['name']}";
        $this->db = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
    }

    /**
     * Retrieve all reviews from the database.
     *
     * @return array Array of reviews
     */
    function getAllReviews()
    {
        $stmt = $this->db->prepare('SELECT * FROM avis');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Save a new review in the database.
     *
     * @param array $data Array containing review data
     * @return bool Whether the save was successful
     */
    function saveReview($data)
    {
        $stmt = $this->db->prepare('INSERT INTO avis (email, pseudo, note, commentaire, photo, timestamp) VALUES (:email, :pseudo, :note, :commentaire, :photo, :timestamp)');
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':pseudo', $data['pseudo']);
        $stmt->bindParam(':note', $data['note']);
        $stmt->bindParam(':commentaire', $data['commentaire']);
        $stmt->bindParam(':photo', $data['photo']);
        $stmt->bindParam(':timestamp', $data['timestamp']);
        return $stmt->execute();
    }
}