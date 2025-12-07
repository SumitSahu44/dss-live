<?php
// send-mail.php

// CORS Headers (Localhost testing ke liye zaruri hai)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// React se JSON data receive karna
$data = json_decode(file_get_contents("php://input"), true);

// Data Validation
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Variables setup
$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$service = htmlspecialchars($data['service']);
$message = htmlspecialchars($data['message']);

// Admin Email Address (Yahan apna email daalein)
$to = "admin@yourwebsite.com"; 
$subject = "New Inquiry from: $name";

// Email Body Styling
$body = "
<html>
<head>
<title>New Website Inquiry</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Service Interest:</strong> $service</p>
    <p><strong>Message:</strong><br>$message</p>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: <noreply@yourwebsite.com>" . "\r\n"; // Domain email hona chahiye

// Send Email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
}
?>