<?php
session_start();
 
try {
     if($_SERVER['REQUEST_METHOD'] == 'POST') {

        if($_POST['endpoint'] == 'postScore') {

            include('./databasehandler.php');
            $user = unserialize($_SESSION['Name']);
            $score = unserialize($_SESSION['Score']);
            $result = postScore($user, $score);
            echo json_encode($result);  

        } else {
            throw new Exception('Not a valid endpoint', 501);
        }


    } else if($_SERVER['REQUEST_METHOD'] == 'GET') {

        if($_GET['endpoint'] == 'getScore') {
            
            include('./databasehandler.php');
            $result = getScore();
            echo json_encode($result);  
 
        }else {
            throw new Exception('Not a valid endpoint', 501);
        }
 
    } else {
        throw new Exception('Not a valid request method', 405);
    }
 
} catch(Exception $e) {
    echo json_encode(array('Message' => $e->getMessage(), 'status' => $e->getCode()));
}
 
?>