<?php
// backend/config/db.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$host = 'localhost';
$db_name = 'smart_student_helpdesk';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;port=3306;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    try {
        $conn = new PDO("mysql:host=$host;port=3307;dbname=$db_name", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e2) {
        echo json_encode(["status" => "error", "message" => "Connection Error: " . $e->getMessage()]);
        exit();
    }
}
?>
