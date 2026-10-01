<?php
require_once "config.php";
$user_id = require_login();
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
  $stmt = $pdo->prepare(
    "SELECT id, calculator_type, calculator_name, data, result_text, created_at
     FROM calculation_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50"
  );
  $stmt->execute([$user_id]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($rows as &$r) {
    $r["data"] = json_decode($r["data"], true);
    $r["date"] = $r["created_at"];
    $r["calculator"] = $r["calculator_name"];
    $r["calculatorType"] = $r["calculator_type"];
  }
  json_response(["success" => true, "history" => $rows]);
}

if ($method === "POST") {
  $data = get_json_body();
  $type = $data["calculator_type"] ?? $data["calculatorType"] ?? "";
  $name = $data["calculator_name"] ?? $data["calculator"] ?? $type;
  $payload = $data["data"] ?? [];
  $result_text = $data["result_text"] ?? $data["result"] ?? "";

  if ($type === "") {
    json_response(["success" => false, "error" => "missing calculator_type"], 400);
  }

  $stmt = $pdo->prepare(
    "INSERT INTO calculation_history (user_id, calculator_type, calculator_name, data, result_text)
     VALUES (?, ?, ?, ?, ?)"
  );
  $stmt->execute([
    $user_id,
    $type,
    $name,
    json_encode($payload, JSON_UNESCAPED_UNICODE),
    $result_text
  ]);
  json_response(["success" => true, "id" => (int) $pdo->lastInsertId()]);
}

if ($method === "DELETE") {
  $id = isset($_GET["id"]) ? (int) $_GET["id"] : 0;
  if ($id > 0) {
    $stmt = $pdo->prepare("DELETE FROM calculation_history WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user_id]);
  } else {
    $stmt = $pdo->prepare("DELETE FROM calculation_history WHERE user_id = ?");
    $stmt->execute([$user_id]);
  }
  json_response(["success" => true]);
}

json_response(["success" => false, "error" => "Method not allowed"], 405);
