<?php
session_start();
if (!empty($_POST['sign_name'])) {
	include_once("dbconnect.php");
  $uname = strip_tags($_POST['sign_name']);
	$password = strip_tags($_POST['sign_pass']);
	$uname = mysqli_real_escape_string($dbcon, $uname);
	$password = mysqli_real_escape_string($dbcon, $password);
	$sql = "SELECT id,username,password FROM users WHERE username = '$uname' ";
	$query = mysqli_query($dbcon, $sql);
	$row = mysqli_fetch_row($query);
	$per_id=$row[0];
	$per_name=$row[1];
	$per_pass=$row[2];
	if (md5(md5($password)) == $per_pass) {
		$_SESSION['id'] = $per_id;
		$_SESSION['pass']=$per_pass;
		$query ="update users set status=1 where id =$per_id";
		$result = mysqli_query($dbcon, $query);
		header("Location: ../home.html");
	}
	else
	header("Location: ../index.html");
}

?>
