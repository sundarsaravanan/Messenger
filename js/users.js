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

function loadin()
{
      if (xmlhttp==null)
      {
            alert ("Your browser does not support AJAX!");
            return;
      }
var url="php/loginstat.php";
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status == 200)
      {

      }
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}

function userlist(id) {
  localStorage.setItem("id",id);

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
    loadin();
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
    var bg="#E94646";
if(x[i+2]=="1"){
  bg="#46E987";
}
tot++;
  var e=document.createElement("div");
  e.setAttribute("class","row");
  e.setAttribute("onclick","choose("+x[i+3]+");");
  var userid="user".concat(x[i+3]);
  var typeid="type".concat(x[i+3]);
  e.innerHTML='<div id="profile"class="col-lg-12">\
    <div class="row" id="cont">\
    <div id="profileimg" class="col-lg-3" style="background-image:url(./php/uploads/'+x[i+1]+');" ></div>\
      <div class="col-lg-9">\
        <div class="row">\
        <div class="col-lg-6">\
          <center><h4>'+x[i]+'</h4></center>\
        </div>\
        <div class="col-lg-6">\
          <div ><h5><i id="'+typeid+'"></i></h5></div>\
        </div>\
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



function choose(n) {

  var mes=document.getElementById("mes_ul");
  mes.innerHTML="";
  document.getElementById("but_part").style.display="inline";

  localStorage.setItem("to_id",n);

  var url="php/messagelist.php";
  var parameters="to="+n;
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status == 200)
    {
      var retrieved = JSON.parse(xmlhttp.responseText);
      if(retrieved.length == 0){
        mes.innerHTML='<center><span id="sendicon" class="glyphicon glyphicon-thumbs-up" aria-hidden="true"style="font-size:100px;margin-top:220px"></span>\
        <h3>Start Conversation</h3></center>';
      }
      else{
        msgdisp(retrieved);
        setInterval(relo,1000);

      }

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
  var bg="#46E987";
  if(v[i+1]==0){
     bg="#E94646";
  }
  e.style.backgroundColor=bg;
}
}

function relo() {
  var n=localStorage.getItem("to_id");
  var last=localStorage.getItem("last");
  var url="php/msgcheck.php";
  var parameters="to="+n+"&last="+last;
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
console.log("checking message");
      var r = JSON.parse(xmlhttp.responseText);
      if(r==0){
      }
      else{
        msgupdate(r);

      }
        }
        }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);

}

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
        //console.log(t);
        localStorage.setItem("last",t);
          }
        }
        xmlhttp.open("GET",url,false);
        xmlhttp.send(null);
}


setInterval(function () {
  var url="php/typecheck.php";
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {

      var r = JSON.parse(xmlhttp.responseText);
      updateTyping(r);
        }
        }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(null);

},1000);


function updateTyping(r) {
  var total=localStorage.getItem("total");
  var from=localStorage.getItem("id");
  total=Number(total);
  var f=Number(from);
  for(var i=1;i<=total+1;i++){
      if(i!=f){
        if (r.indexOf(String(i)) > -1) {
          var typeid="type".concat(i);
          var e=document.getElementById(typeid);
          e.innerHTML="typing...";
          e.style.visibility="visible";
        }
        else{
          var typeid="type".concat(i);
          var e=document.getElementById(typeid);
          e.style.visibility="hidden";
        }
      }
    }
  }
