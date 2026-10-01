<?php
require_once "config.php";

$user_id = require_login();

json_response([
  "success" => true,
  "user" => [
    "id" => $user_id,
    "name" => $_SESSION["user_name"] ?? "",
    "email" => $_SESSION["user_email"] ?? ""
  ]
]);
