var xmlhttp;
var objDiv = document.getElementById("message_div");

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


function userlist() {

  if (xmlhttp==null)
  {
        alert ("Your browser does not support AJAX!");
        return;
  }
var url="php/userlist.php";
var parameters="";
xmlhttp.onreadystatechange=function(){
if (xmlhttp.readyState==4 && xmlhttp.status == 200)
  {
    var retrieved = JSON.parse(xmlhttp.responseText);
    disp(retrieved);
  }
}
xmlhttp.open("POST",url,true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(parameters);

document.getElementById("but_part").style.display="none";
}


function disp(x) {
var tot=0;
  for(var i=0;i<x.length;i=i+4){
    var bg="red";
if(x[i+2]=="1"){
  bg="green";
}
tot++;
  var e=document.createElement("div");
  e.setAttribute("class","row");
  e.setAttribute("onclick","choose("+x[i+3]+");");
  var userid="user".concat(x[i+3]);
  e.innerHTML='<div id="profile"class="col-lg-12">\
    <div class="row" id="cont">\
    <div id="profileimg" class="col-lg-3" style="background-image:url(./php/uploads/'+x[i+1]+');" ></div>\
      <div class="col-lg-9">\
        <div class="row">\
          <h4>'+x[i]+'</h4>\
        </div>\
        <div class="row">\
          <div class="col-lg-12 status" id="'+userid+'" style="background-color:'+bg+';"></div>\
        </div>\
      </div>\
    </div>\
  </div>';

  document.getElementById("users").appendChild(e);
  }
  localStorage.setItem("total",tot);
}

/*function disp(x) {
var tot=0;
  for(var i=0;i<x.length;i=i+4){
    var bg="red";
if(x[i+2]=="1"){
  bg="green";
}
tot++;
  var e=document.createElement("div");
  e.setAttribute("class","row");
  e.setAttribute("onclick","choose("+x[i+3]+");");
  var userid="user".concat(x[i+3]);
  e.innerHTML='<div id="profile" class="col-lg-12">\
                <div class="row" id="">\
                  <div id="profileimg" class="col-lg-3" style="background-image:url(images/'+x[i+1]+');" ></div>\
                  <div class="col-lg-4 "  ><h4>'+x[i]+'</h4></div>\
                  <div class="col-lg-1 status" id="'+userid+'" style="background-color:'+bg+';"></div>\
                  <div class="col-lg-1" id="count">0</div>\
                  <div class="col-lg-2 " id="typing"><i>typing...</i></div>\
                  <div class="col-lg-1 block"><button onclick="block('+x[i+3]+');">b</button></div>\
                </div>\
              </div>';
  document.getElementById("users").appendChild(e);
  }
  localStorage.setItem("total",tot);
}
*/

function choose(n) {

  document.getElementById("mes_ul").innerHTML="";
  document.getElementById("but_part").style.display="inline";

  localStorage.setItem("to_id",n);

  var url="php/messagelist.php";
  var parameters="to="+n;
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status == 200)
    {
      var retrieved = JSON.parse(xmlhttp.responseText);
      msgdisp(retrieved);
    }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);
}


function msgdisp(z) {
          var to_id=localStorage.getItem("to_id");
          for(var i=0;i<z.length;i=i+3){
            var side="right";
            if(z[i]==to_id){
              side="left";
            }


          var e=document.createElement("li");
          e.innerHTML="<span class='"+side+"'>"+z[i+2]+"</span><div class='clear'></div>";
          document.getElementById("mes_ul").appendChild(e);
          }

        var url="php/timecheck.php";
        url=url+"?to="+to_id;
        xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status == 200)
          {
        var t=xmlhttp.responseText;
        localStorage.setItem("last",t);
          }
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.send(null);
        objDiv.scrollTop = objDiv.scrollHeight;
}




setInterval(function() {
  var n=localStorage.getItem("to_id");
  var last=localStorage.getItem("last");
  var url="php/msgcheck.php";
  var parameters="to="+n+"&last="+last;
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      var r = JSON.parse(xmlhttp.responseText);
      if(r==0){
      }
      else{
              msgupdate(r);
      }
        }
        }
  xmlhttp.open("POST",url,false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);

},1000);

function msgupdate(z) {
         for(var i=0;i<z.length;i++){
          var e=document.createElement("li");
          e.innerHTML="<span class='left'>"+z[i]+"</span><div class='clear'></div>";
          document.getElementById("mes_ul").appendChild(e);
        }
        objDiv.scrollTop = objDiv.scrollHeight;
        var to_id=localStorage.getItem("to_id");
        var url="php/timecheck.php";
        url=url+"?to="+to_id;
        xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status == 200)
          {
        var t=xmlhttp.responseText;
        //alert(t);
        localStorage.setItem("last",t);
          }
        }
        xmlhttp.open("GET",url,false);
        xmlhttp.send(null);



}



setInterval(function() {
  var url="php/statuscheck.php";
  var parameters="";
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status == 200)
    {
      var r = JSON.parse(xmlhttp.responseText);
status(r);

  }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);

},1000);


function status(v) {
  for(var i=0;i<v.length;i=i+2){
  var userid="user".concat(v[i]);
  var e=document.getElementById(userid);
  var bg="green";
  if(v[i+1]==0){
     bg="red";
  }
  e.style.backgroundColor=bg;
}
}
