<?php
session_start();

	include_once("dbconnect.php");
	if (!empty($_POST['name']) && !empty($_POST['pass']))
	{
		$name=$_POST['name'];
		$pass=md5(md5($_POST['pass']));
		$cpass=md5(md5($_POST['conf']));
		$usname=$_POST['usname'];
	    	$email=$_POST['email'];
		$phone=$_POST['phone'];

		if($pass==$cpass){
			$query = "INSERT INTO users"."(id,name,username,password,email,phone,profilepic)"."VALUES (NULL,'$name','$usname','$pass','$email','$phone',NULL)";
				$result = mysqli_query($dbcon, $query)
				or die('Error querying database.');
				$sql = "SELECT id FROM users WHERE username = '$usname' ";
				$query = mysqli_query($dbcon, $sql);
				$row = mysqli_fetch_row($query);
				$_SESSION['id']=$row[0];
				$query = "insert into features(from_id,to_id) select c.id, b.id from users c  join users b on b.id=$row[0] or c.id=$row[0] ";
					$result = mysqli_query($dbcon, $query)
					or die('Error querying database.');
					$query = "delete from features where from_id=to_id";
						$result = mysqli_query($dbcon, $query)
						or die('Error querying database.');

				mysqli_close($dbcon);
					 header("Location:../upload.html");
				 }
			 }


 ?>
