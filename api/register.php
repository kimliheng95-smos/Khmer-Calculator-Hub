<?php
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(["success" => false, "error" => "Method not allowed"], 405);
}

$data = get_json_body();
$name = trim($data["name"] ?? "");
$email = strtolower(trim($data["email"] ?? ""));
$password = $data["password"] ?? "";

if (strlen($name) < 2) {
  json_response(["success" => false, "error" => "name_short"], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(["success" => false, "error" => "invalid_email"], 400);
}
if (strlen($password) < 6) {
  json_response(["success" => false, "error" => "password_short"], 400);
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
  json_response(["success" => false, "error" => "email_exists"], 400);
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->execute([$name, $email, $hash]);
$id = (int) $pdo->lastInsertId();

$_SESSION["user_id"] = $id;
$_SESSION["user_name"] = $name;
$_SESSION["user_email"] = $email;

json_response([
  "success" => true,
  "user" => ["id" => $id, "name" => $name, "email" => $email]
]);
