var xmlhttp,url,parameters;
xmlhttp=GetXmlHttpObject();
function GetXmlHttpObject()
{
    if (window.XMLHttpRequest)
       return new XMLHttpRequest();
    if (window.ActiveXObject)
       return new ActiveXObject("Microsoft.XMLHTTP");
    return null;
}
function loadin()
{
  if (xmlhttp==null)
      return;
  url="php/status.php";
  url=url+"?status=1";
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}

function userlist(id) {
  if (xmlhttp==null)
    return;
  localStorage.setItem("id",id);
  url="php/userlist.php";
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
  xmlhttp.send(null);
  document.getElementById("but_part").style.display="none";
  localStorage.setItem("status",1);
}
function disp(x) {
  var tot=0;
  for(var i=0;i<x.length;i=i+4){
    var bg="#E94646";
    if(x[i+2]=="1"){
      bg="#46E987";
    }
    tot++;
    var userid="user".concat(x[i+3]);
    var typeid="type".concat(x[i+3]);
    var con=document.createElement("div");
    con.setAttribute("class","row");
    con.setAttribute("id","cont");
    con.setAttribute("onclick","choose("+x[i+3]+");");
    var e=document.createElement("div");
    e.setAttribute("id","profile");
    e.setAttribute("class","col-lg-12");
    var e1=document.createElement("div");
    e1.setAttribute("id","cont");
    e1.setAttribute("class","row");
    var e2=document.createElement("div");
    e2.setAttribute("id","profileimg");
    e2.setAttribute("class","col-lg-3");
    e2.setAttribute("style","background-image:url(./php/uploads/"+x[i+1]+");");
    var e3=document.createElement("div");
    e3.setAttribute("class","col-lg-9");
    var e4=document.createElement("div");
    e4.setAttribute("class","row");
    var e5=document.createElement("div");
    e5.setAttribute("class","col-lg-6");
    e5.innerHTML="<center><h4>"+x[i]+"</h4></center>";
    var e6=document.createElement("div");
    e6.setAttribute("class","col-lg-6");
    e6.innerHTML='<h5><i id="'+typeid+'"></i></h5>';
    var e7=document.createElement("div");
    e7.setAttribute("class","row");
    var e8=document.createElement("div");
    e8.setAttribute("class","col-lg-12 status");
    e8.setAttribute("id",userid);
    e8.setAttribute("style",'background-color:'+bg+';');
    e4.appendChild(e5);
    e4.appendChild(e6);
    e7.appendChild(e8);
    e3.appendChild(e4);
    e3.appendChild(e7);
    e1.appendChild(e2);
    e1.appendChild(e3);
    e.appendChild(e1);
    con.appendChild(e);
    document.getElementById("users").appendChild(con);
  }
  localStorage.setItem("total",tot);
}


function choose(n) {
  var mes=document.getElementById("mes_ul");
  mes.innerHTML="";
  document.getElementById("but_part").style.display="inline";
  localStorage.setItem("to_id",n);
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
  if (xmlhttp==null)
      return;
  url="php/messagelist.php";
  parameters="to="+n;
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
          if (xmlhttp==null)
              return;
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
          var objDiv = document.getElementById("message_div");
          objDiv.scrollTop = objDiv.scrollHeight;
}


setInterval(function() {
  if (xmlhttp==null)
        return;
  var url="php/statuscheck.php";
  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status == 200)
    {
      var r = JSON.parse(xmlhttp.responseText);
      status(r);
    }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(null);
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
  if (xmlhttp==null)
    return;
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
        if (xmlhttp==null)
            return;
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


/*setInterval(function () {
  if (xmlhttp==null)
    return;
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
*/
