<?php
session_start();
if(isset($_SESSION["id"])){
$pro=$_SESSION['profile'];
$id=$_SESSION['id'];
}
else{
header("Location: index.html");
}
?>
<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Chat</title>
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="https://bootswatch.com/sandstone/bootstrap.min.css"/>

    <link rel="icon" href="images/say.png" type="image/png" >
    <script type="text/javascript" src="js/users.js" ></script>
    <script type="text/javascript" src="js/msg.js" ></script>
    <script type="text/javascript" src="js/others.js" ></script>

</head>
<body onload="userlist(<?php echo $id;?>);" onbeforeunload="loadoff()" style="background-color:#71716F">
  <div class="navbar navbar-default ">
      <div class="container">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">Messenger</a>
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

        <div class="navbar-collapse collapse" id="navbar-main">
          <ul class="nav navbar-nav navbar-right">
            <li onclick="statToggle();"><a id="log">Go Offline</a></li>
            <li onclick="window.location='upload.html'"><a>Settings</a></li>
            <li onclick="logoff();"><a>Logout</a></li>
            <li>
                <div id="profileimg" class="col-lg-3" style="margin-left:20px;background-image:url(./php/uploads/<?php echo $pro;?>);"></div>
          </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container-fluid" >
      <div class="row">
        <div class="col-lg-3 col-lg-offset-1" id="user_slot">
          <div id="users"></div>
        </div>
        <div class="col-lg-6 col-lg-offset-1" id="msg_slot">
              <div class="row" id="msg_box">
                  <div id="message_div" class="col-lg-12 main_area">
                      <ul id="mes_ul">
                        <center><span id="sendicon" class="glyphicon glyphicon-user" aria-hidden="true"style="font-size:100px;margin-top:220px"></span>
                        <h3>Choose User</h3></center>
                    </ul>
                  </div>
              </div>
              <div class="row" id="but_part">
                  <input type="text" id="message" class="col-lg-11" placeholder="New Message..." >
                  <button type="submit" id="msg_sub" onclick="new_message();">
                  <span id="sendicon" class="glyphicon glyphicon-send" aria-hidden="true" style="font-size:30px;"></span>
                  </button>
              </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="js/others.js" ></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>
