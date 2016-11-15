<?php

  $mysql_server = "localhost";
  $mysql_user = "root";
  $mysql_password = "realmadrid";
  $mysql_db = "minichat";
  $dbcon = new mysqli($mysql_server, $mysql_user, $mysql_password, $mysql_db);
  if ($dbcon->connect_errno) {
  	printf("Connection failed: %s \n", $dbcon->connect_error);
  	exit();
  }
  $dbcon->set_charset("utf8");
?>
