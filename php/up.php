<?php
session_start();
if(isset($_FILES['file'])){
	$file=$_FILES['file'];
	$file_name=$file['name'];
	$file_tmp=$file['tmp_name'];
	$file_size=$file['size'];
	$file_error=$file['error'];


	$file_ext=explode(".",$file_name);
	$file_ext=strtolower(end($file_ext));
	$allowed=array('jpeg','jpg','png');
	if($_FILES['file']['error'] == 2) {
		 echo "You've exceeded the maximum file upload size of 512kb.";
		 return false;
	 }
	if(in_array($file_ext,$allowed)){
		if($file_error===0){
			if($file_size<=2097152){
				$file_new_name=uniqid('',true).'.'.$file_ext;
				$file_destination='uploads/'.$file_new_name;

				if(move_uploaded_file($file_tmp,$file_destination)){
					$id=$_SESSION['id'];
						include_once("dbconnect.php");
							$query ="update users set profilepic='$file_new_name' where id =$id";
								$result = mysqli_query($dbcon, $query)
								or die('Error querying database.');
								mysqli_close($dbcon);
							header("Location:../home.html");}
else {
echo "failed";
}
			}
		}
	}
}
else{
	echo "failed out";
}





?>
