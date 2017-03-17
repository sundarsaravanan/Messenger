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
      localStorage.clear();
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
window.location="index.html";
}

function loadoff()
{
  if (xmlhttp==null)
  {
        alert ("Your browser does not support AJAX!");
        return;
  }

var url="php/logoutstat.php";
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status == 200)
      {

      }
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}

function statToggle() {
  if (xmlhttp==null)
  {
        alert ("Your browser does not support AJAX!");
        return;
  }
  var st=document.getElementById("log");
  if(st.innerHTML=="Go Offline"){
    var url="php/logoutstat.php";
    st.innerHTML="Go Online";
  }
  else{
    var url="php/loginstat.php";
    st.innerHTML="Go Offline";
  }
xmlhttp.onreadystatechange=function(){
if (xmlhttp.readyState==4 && xmlhttp.status == 200)
  {

  }
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}
