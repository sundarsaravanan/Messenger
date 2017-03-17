<?php 
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $t=time();
	$msg=$_POST['msg'];
  $to_id=$_POST['to'];
  $id=$_SESSION['id'];


		$query = "INSERT INTO message VALUES ($id,$to_id,'$msg',$t)";
    echo $query;
			$result = mysqli_query($dbcon, $query)
			or die('Error querying database.');
			mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
