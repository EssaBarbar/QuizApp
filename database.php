<?php
class Database {
    public $connection;
    
    function __construct() {
                $dsn = 'mysql:host=localhost;dbname=quizapp';
                $user = 'root';
                $password = 'root';
       

        try {
            $this->connection = new PDO($dsn, $user, $password);
            $this->connection->exec('set names utf8');
            error_log("created DB");
        } catch(PDOException $e) {
            error_log($e->getMessage());
            throw $e;

        }
    }
}


?>