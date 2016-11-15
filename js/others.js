var xmlhttp;
xmlhttp=GetXmlHttpObject();
function GetXmlHttpObject()
{
    if (window.XMLHttpRequest)
    {
       return new XMLHttpRequest();
    }
    if (window.ActiveXObject)
    {
       return new ActiveXObject("Microsoft.XMLHTTP");
    }
    return null;
}

function logoff()
{
      if (xmlhttp==null)
      {
            alert ("Your browser does not support AJAX!");
            return;
      }
var url="php/logout.php";
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status == 200)
      {

      }
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}
/*
function offline()
{
      if (xmlhttp==null)
      {
            alert ("Your browser does not support AJAX!");
            return;
      }
var url="php/line.php";
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status == 200)
      {

      }
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}
*/

var objDiv = document.getElementById("message_div");

objDiv.scrollTop = objDiv.scrollHeight;

document.getElementById("message")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("msg_sub").click();
        document.getElementById("message").value="";

    }
});
