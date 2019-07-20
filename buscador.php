<?php

$nameFile = "data-1.json";
  $file = fopen($nameFile, "r");
  $data = fread($file, filesize($nameFile));
  $dataArray = json_decode($data);
  $newData = array();

  if(isset($_POST["ciudad"]) && isset($_POST["tipo"]) && isset($_POST["from"]) && isset($_POST["to"])){
    $ciudad = $_POST["ciudad"];
    $tipo = $_POST["tipo"];
    $from = $_POST["from"];
    $to = $_POST["to"];

    for($i=0; $i < count($dataArray); $i++){
      $newPrecio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $dataArray[$i]->Precio)));
      if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Ciudad == $ciudad && $dataArray[$i]->Tipo == $tipo){
        array_push($newData, $dataArray[$i]);
      }else if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Ciudad == $ciudad && $tipo == ""){
        array_push($newData, $dataArray[$i]);
      }else if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Tipo == $tipo && $ciudad == ""){
        array_push($newData, $dataArray[$i]);
      }else if($newPrecio >= $from && $newPrecio <= $to && $ciudad == "" && $tipo == ""){
        array_push($newData, $dataArray[$i]);
      }
    }
    echo json_encode($newData);
  }else if(isset($_POST["todos"])){
    echo $data;
  }

fclose($file);

?>