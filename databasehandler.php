<?php 

function getScore() {
    include_once('./database.php');
    $database = new Database();

    $query = $database->connection->prepare('SELECT * FROM user ORDER BY cast(score as unsigned) DESC LIMIT 10');
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        throw new exception('No category found', 404);
        exit;
    }
    return $result; 
}

function postScore($user, $score){
    
    include_once('./database.php');
    $database = new Database();
    $testing = $score;
    $unamn = $user;
    
    

    try {

        $database->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $qry = $database->connection->prepare('INSERT INTO user (name, score)
         VALUES (:namn, :score)');

            $qry->execute(array(':namn' => $unamn,
                                ':score' => $testing));
        

                            
        
                           $result = $query->fetch(PDO::FETCH_ASSOC); 
        
    } catch(PDOException $e) {
        error_log($e->getMessage());
        throw $e;
    }
}

?>