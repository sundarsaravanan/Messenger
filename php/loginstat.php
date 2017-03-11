<?php
session_start();
include_once("dbconnect.php");
$id=$_SESSION['id'];
$query ="update users set status=1 where id =$id";
$result = mysqli_query($dbcon, $query);
mysqli_close($dbcon);

  ?>
