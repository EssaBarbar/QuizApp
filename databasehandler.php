<?php 

function getScore() {
    include_once('./database.php');
    $database = new Database();

    $query = $database->connection->prepare('SELECT * FROM user ORDER BY score DESC LIMIT 10');
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        throw new exception('No category found', 404);
        exit;
    }
    return $result; 
}

function postScore($user, $score){
    
    include_once('./../Class/database.php');
    $database = new Database();
    
    

    try {

        $database->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $qry = $database->connection->prepare('INSERT INTO user (name, score)
         VALUES (:name, :score);');

        $qry->execute(array(':name' => $user, 
                            ':score' => $score));

                            
        
                           $result = $query->fetch(PDO::FETCH_ASSOC); 
        
    } catch(PDOException $e) {
        error_log($e->getMessage());
        throw $e;
    }
}

?>