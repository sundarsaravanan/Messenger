<?php
  if(isset($_FILES['file'])){
    $file=$_FILES['file'];
    $file_name=$file['name'];
    $file_tmp=$file['tmp_name'];
    $file_size=$file['size'];
    $file_error=$file['error'];


    $file_ext=explode(".",$file_name);
    $file_ext=strtolower(end($file_ext));
    $allowed=array('jpeg','jpg','png');
    if(in_array($file_ext,$allowed)){
      if($file_error===0){
        if($file_size<=2097152){
$file_new_name=uniqid('',true).'.'.$file_ext;
echo $file_destination=$_SERVER['DOCUMENT_ROOT'] .'/uploads/'.$file_new_name;

if(move_uploaded_file($file_tmp,$file_destination)){
  echo $file_destination;
}
        }
      }
    }
  }
?>
<html>
   <body>

      <form action = "" method = "POST" enctype = "multipart/form-data">
         <input type = "file" name = "file" />
         <input type = "submit" value="upload"/>



      </form>

   </body>
</html>
