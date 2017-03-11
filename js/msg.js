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

function new_message() {
  var msg=document.getElementById("message").value;
  if(msg==''){
    return false;
  }
  var to_id=localStorage.getItem("to_id");
  var e=document.createElement("li");
  e.innerHTML="<span class='right'>"+msg+"</span>\
  <div class='clear'></div>";
  document.getElementById("mes_ul").appendChild(e);

  if (xmlhttp==null)
  {
        alert ("Your browser does not support AJAX!");
        return;
  }
  var url="php/message.php";
  var parameters="msg="+msg+"&to="+to_id;
  xmlhttp.onreadystatechange =function(){
  if (xmlhttp.readyState==4 && xmlhttp.status == 200)
  {

  }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);

  var objDiv = document.getElementById("message_div");
objDiv.scrollTop = objDiv.scrollHeight;

}
