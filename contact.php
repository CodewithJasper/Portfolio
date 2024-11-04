<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'portfolio_db';

$conn = new mysqli($host, $user, $pass, $db);

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($conn->ping()) {
    echo "Database connection is active.<br>";
} else {
    die("Database connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($first_name) || empty($last_name) || empty($email) || empty($message)) {
        die("All required fields must be filled.");
    }

    $stmt = $conn->prepare('INSERT INTO contact (first_name, last_name, email, subject, message) VALUES (?, ?, ?, ?, ?)');
    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param('sssss', $first_name, $last_name, $email, $subject, $message);

    if ($stmt->execute()) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}

?>