<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
$app = new \Slim\App;

// GET Todos los students
$app->get('/api/student', function(Request $request, Response $response){
  $sql = "SELECT * FROM student";
  try{
    $db = new db();
    $db = $db->conectDB();
    $resultado = $db->query($sql);
    if ($resultado->rowCount() > 0){
      $clientes = $resultado->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($clientes);
    }else {
      echo json_encode("No existen estudiantes en la BBDD.");
    }
    $resultado = null;
    $db = null;
  }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
}); 

// GET Recuperar estudiante por ID 
$app->get('/api/student/{id}', function(Request $request, Response $response){
  $id_est = $request->getAttribute('id');
  $sql = "SELECT * FROM student WHERE id = $id_est";
  try{
    $db = new db();
    $db = $db->conectDB();
    $resultado = $db->query($sql);
    if ($resultado->rowCount() > 0){
      $cliente = $resultado->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($cliente);
    }else {
      echo json_encode("No existen estudiantes en la BBDD con este ID.");
    }
    $resultado = null;
    $db = null;
  }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
}); 

// POST Crear nuevo estudiante
$app->post('/api/student', function(Request $request, Response $response){
   $nombre = $request->getParam('firstname');
   $apellido = $request->getParam('lastname');
   $email = $request->getParam('email');
   $dir = $request->getParam('address');
  
  $sql = "INSERT INTO student (firstname, lastname, email, address) VALUES 
          (:nombre, :apellido, :email, :dir)";
  try{
    $db = new db();
    $db = $db->conectDB();
    $resultado = $db->prepare($sql);
    $resultado->bindParam(':nombre', $nombre);
    $resultado->bindParam(':apellido', $apellido);
    $resultado->bindParam(':email', $email);
    $resultado->bindParam(':dir', $dir);
    $resultado->execute();
    echo json_encode("Nuevo estudiante guardado.");  
    $resultado = null;
    $db = null;
  }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
}); 

// PUT Modificar estudiante
$app->put('/api/student/{id}', function(Request $request, Response $response){
   $id_est = $request->getAttribute('id');
   $nombre = $request->getParam('firstname');
   $apellido = $request->getParam('lastname');
   $email = $request->getParam('email');
   $dir = $request->getParam('address');
  
  $sql = "UPDATE student SET
          firstname = :nombre,
          lastname = :apellido,
          email = :email,
          address = :dir

        WHERE id = $id_est";
     
  try{
    $db = new db();
    $db = $db->conectDB();
    $resultado = $db->prepare($sql);
    $resultado->bindParam(':nombre', $nombre);
    $resultado->bindParam(':apellido', $apellido);
    $resultado->bindParam(':email', $email);
    $resultado->bindParam(':dir', $dir);
    $resultado->execute();
    echo json_encode("Estudiante modificado.");  
    $resultado = null;
    $db = null;
  }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
}); 

// DELETE borar estudiante
$app->delete('/api/student/{id}', function(Request $request, Response $response){
   $id_est = $request->getAttribute('id');
   $sql = "DELETE FROM student WHERE id = $id_est";
     
  try{
    $db = new db();
    $db = $db->conectDB();
    $resultado = $db->prepare($sql);
     $resultado->execute();
    if ($resultado->rowCount() > 0) {
      echo json_encode("Estudiante eliminado.");  
    }else {
      echo json_encode("No existe ese estudiante.");
    }
    $resultado = null;
    $db = null;
  }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
}); 