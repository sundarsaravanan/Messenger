var xmlhttp,url,parameters,to_id;
xmlhttp=GetXmlHttpObject();
function GetXmlHttpObject()
{
    if (window.XMLHttpRequest)
       return new XMLHttpRequest();
    if (window.ActiveXObject)
       return new ActiveXObject("Microsoft.XMLHTTP");
    return null;
}
function new_message() {
  var msg=document.getElementById("message").value;
  to_id=localStorage.getItem("to_id");
  if(msg==''){
    return false;
  }
  var e=document.createElement("li");
  var e1=document.createElement("span");
  e1.setAttribute("class","right");
  e1.innerHTML=msg;
  var e2=document.createElement("div");
  e2.setAttribute("class","clear");
  e.appendChild(e1);
  e.appendChild(e2);
  document.getElementById("mes_ul").appendChild(e);
  if (xmlhttp==null)
        return;
  url="php/message.php";
  parameters="msg="+msg+"&to="+to_id;
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);
  var objDiv = document.getElementById("message_div");
  objDiv.scrollTop = objDiv.scrollHeight;
}

/*function typing(){
  set();
  setTimeout(function () {
  deset();
}, 5000);
}*/
function set() {
  if (xmlhttp==null)
        return;
  to_id=localStorage.getItem("to_id");
  url="php/typing.php";
  url=url+"?to="+to_id+"&status=1";
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}

function deset() {
  if (xmlhttp==null)
        return;
  to_id=localStorage.getItem("to_id");
  url="php/typing.php";
  url=url+"?to="+to_id+"&status=0";
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}
