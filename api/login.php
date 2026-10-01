<?php
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(["success" => false, "error" => "Method not allowed"], 405);
}

$data = get_json_body();
$email = strtolower(trim($data["email"] ?? ""));
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {
  json_response(["success" => false, "error" => "empty"], 400);
}

$stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user["password"])) {
  json_response(["success" => false, "error" => "login_failed"], 401);
}

$_SESSION["user_id"] = (int) $user["id"];
$_SESSION["user_name"] = $user["name"];
$_SESSION["user_email"] = $user["email"];

json_response([
  "success" => true,
  "user" => [
    "id" => (int) $user["id"],
    "name" => $user["name"],
    "email" => $user["email"]
  ]
]);
