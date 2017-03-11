<?php
session_start();
if (!empty($_POST['sign_name'])) {
	include_once("dbconnect.php");
  $uname = strip_tags($_POST['sign_name']);
	$password = strip_tags($_POST['sign_pass']);
	$uname = mysqli_real_escape_string($dbcon, $uname);
	$password = mysqli_real_escape_string($dbcon, $password);
	$sql = "SELECT * FROM users WHERE username = '$uname' ";
	$query = mysqli_query($dbcon, $sql);
	$row = mysqli_fetch_row($query);
	$per_id=$row[0];
	$per_name=$row[1];
	$per_username=$row[2];
	$per_pass=$row[3];
	$per_email=$row[4];
	$per_phone=$row[5];
	$per_profile=$row[6];

	if (md5(md5($password)) == $per_pass) {
		$_SESSION['id'] = $per_id;
		$_SESSION['name']=$per_name;
		$_SESSION['username']=$per_username;
		$_SESSION['email']=$per_email;
		$_SESSION['phone']=$per_phone;
		$_SESSION['profile']=$per_profile;

		$query ="update users set status=1 where id =$per_id";
		$result = mysqli_query($dbcon, $query);
		header("Location: ../home.php");
	}
	else
	header("Location: ../index.html");
}

?>
