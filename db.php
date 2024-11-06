<?php
$host = 'localhost'; // or your server address
$dbname = 'admiralis_freelancers'; // your database name
$user = 'root'; // your database username
$pass = ''; // your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
