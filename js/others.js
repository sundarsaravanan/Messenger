var xmlhttp,url;
xmlhttp=GetXmlHttpObject();
function GetXmlHttpObject()
{
    if (window.XMLHttpRequest)
       return new XMLHttpRequest();
    if (window.ActiveXObject)
       return new ActiveXObject("Microsoft.XMLHTTP");
    return null;
}
function logoff()
{
    localStorage.clear();
    if (xmlhttp==null)
          return;
    url="php/logout.php";
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
    window.location="index.html";
}

function loadoff()
{
  if (xmlhttp==null)
        return;
  url="php/logoutstat.php";
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}

function statToggle() {
  if (xmlhttp==null)
        return;
  var st=document.getElementById("log");
  var status=localStorage.getItem("status");
  if(status==1){
    st.innerHTML="Go Online";
    localStorage.setItem("status",0);
  }
  else{
    st.innerHTML="Go Offline";
    localStorage.setItem("status",1);
  }
  url="php/status.php";
  status=localStorage.getItem("status");
  url=url+"?status="+status;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}
