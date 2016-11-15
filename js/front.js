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






/*function fname() {
  if (xmlhttp==null)
  {
        alert ("Your browser does not support AJAX!");
        return;
  }
var url="ex.php";
var parameters="id=2&name=sundar";
xmlhttp.onreadystatechange=xmlhttp.onreadystatechange=function(){
if (xmlhttp.readyState==4 && xmlhttp.status == 200)
  {
        document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
  }
}
xmlhttp.open("POST",url,true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.setRequestHeader("Content-length", parameters .length);
xmlhttp.setRequestHeader("Connection", "close");
xmlhttp.send(parameters);
}*/
