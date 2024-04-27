function create_node(type,parent)
{var new_node=document.createElement(type);parent.appendChild(new_node);return new_node;}
function append_text(parent,text)
{var text_node=document.createTextNode(text);parent.appendChild(text_node);}
function clear(o)
{while(o.firstChild)
o.removeChild(o.firstChild);}
function create_text_node(type,parent,text)
{var new_node=create_node(type,parent);var text_node=document.createTextNode(text);new_node.appendChild(text_node);return new_node;}
function get_cookie(cookie_string)
{if(!document.cookie)
return;var c_start=document.cookie.indexOf(cookie_string);if(c_start==-1)
return;c_start+=cookie_string.length;var c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)
c_end=document.cookie.length;var cookie=document.cookie.substring(c_start,c_end);if(cookie.charAt(0)=="="){cookie=cookie.substring(1)}
return cookie;}
function getbyid(id)
{var element=document.getElementById(id);return element;}
function sendget(sendmessage,callback,cgi_override)
{var cgi;if(cgi_override){cgi=cgi_override;}else{cgi=cgiscript;}
if(!this.xmlhttp){this.xmlhttp=new XMLHttpRequest();}
if(this.xmlhttp.readyState==1||this.xmlhttp.readyState==2||this.xmlhttp.readyState==3){this.xmlhttp.abort();}
this.xmlhttp.open("GET",cgi+"?"+sendmessage,true);var self=this;this.xmlhttp.onreadystatechange=function(){if(self.xmlhttp.readyState==4){if(self.xmlhttp.status==200){callback(self.xmlhttp.responseText);}}}
this.xmlhttp.send();}
function set_cookie(value)
{var date_now=new Date();var one_year_later=new Date(date_now.getTime()+31536000000);var expiry_date=one_year_later.toGMTString();document.cookie=value+';expires='+expiry_date+';';}
var cgiscript='/qhanzimr/';var debug=false;message_handler=alert
var nclicked=0;var nButtons=256;var clickable=new Array(nButtons);var clicked=new Array(nButtons);function mr_init()
{for(i=0;i<nButtons;i++){clickable[i]=true;clicked[i]=false;}
nclicked=0;input_box_onload();}
var use_input_box_cookie="uib=";function show_input_box()
{var wbd=document.getElementById("input_box_div");if(wbd!==null){wbd.style.display="block";}}
function hide_input_box()
{var wbd=document.getElementById("input_box_div");if(wbd!==null){wbd.style.display="none";}}
function clear_input_box()
{var el=document.getElementById("input-box-input");if(el!==null){el.value="";el.focus();}
if(typeof(Storage)!=="undefined"){localStorage.removeItem("input-box");}}
function set_input_box_preference(e)
{var inbox_el=getbyid("inbox");var preference=0;if(inbox_el.checked){preference=1;show_input_box();}
else{clear_input_box();hide_input_box();}
set_cookie(use_input_box_cookie+preference);}
function get_input_box_preference()
{var preference=get_cookie(use_input_box_cookie)
if(preference==1){return true;}
if(typeof(preference)==="undefined"){return true;}
return false;}
var link_cookie_string="link=";function set_link_preference(link)
{set_cookie(link_cookie_string+link);}
function get_link_preference()
{return get_cookie(link_cookie_string);}
var window_cookie_string="newwindow=";function set_window_preference()
{var newwindow=getbyid("nwc");var value;if(newwindow.checked){value=1;}else{value=0;}
set_cookie(window_cookie_string+value);}
function get_window_preference()
{var nwindow=get_cookie(window_cookie_string);if(typeof(nwindow)==="undefined"){return 1;}
return nwindow;}
function search_input_box()
{var el=getbyid("input-box-input");var search_string=el.value;if(search_string.length==0){alert(ml.empty_search);return;}
var href='http://www.google.com/search?q='+encodeURI(search_string);var window_preference=get_window_preference();if(window_preference==1){window.open(href);}
else{location.href=href;}}
function write_kanji(kanji)
{input_box_el=getbyid("input-box-input");if(input_box_el.selectionStart!=undefined){if(input_box_el.selectionStart==input_box_el.value.length){input_box_el.value+=kanji;}
else{var value=input_box_el.value;var s=input_box_el.selectionStart;var e=input_box_el.selectionEnd;var v_start=value.substring(0,input_box_el.selectionStart);var v_end=value.substring(input_box_el.selectionEnd,value.length);value=v_start+kanji+v_end;input_box_el.value=value;input_box_el.selectionStart=s+kanji.length;input_box_el.selectionEnd=input_box_el.selectionStart;}}
else{input_box_el.value+=kanji;}
input_box_el.focus();input_box_oninput(input_box_el.value);}
function zdic_link(kanji)
{return"https://zdic.net/hans/"+encodeURIComponent(kanji);}
function wikt_link(kanji)
{return"https://"+ml.lang+".wiktionary.org/wiki/"+encodeURIComponent(kanji);}
function single_link(kanji)
{var pref=get_link_preference()
switch(pref){case'wikt':return wikt_link(kanji);case'zdic':default:return zdic_link(kanji);}}
function create_link(parent,kanji,window_preference)
{var pref=get_input_box_preference();if(pref){var write_kanji_el=create_text_node("span",parent,kanji);write_kanji_el.className="write_kanji";write_kanji_el.onclick=function(){write_kanji(kanji);}}
else{var a=create_text_node('a',parent,kanji);a.className="write_kanji";a.href=single_link(kanji)
var newwin=get_window_preference();if(newwin==1){a.target='_blank';}}
return;}
function input_box_oninput(input)
{if(typeof(Storage)!=="undefined"){localStorage.setItem("input-box",input);}}
function input_box_onload()
{pref=get_input_box_preference()
if(pref){show_input_box();}
else{hide_input_box();}
if(typeof(Storage)=="undefined"){return;}
input=localStorage.getItem("input-box");if(input==null||input.length==0){return;}
var element=getbyid("input-box-input");element.value=input}
var mr_results;var reset=getbyid('reset');function MRResults(j)
{this.found_kanji=getbyid("found_kanji");var window_preference=get_window_preference();for(var i=0;i<j.Hanzi.length;i++){create_link(this.found_kanji,j.Hanzi[i],window_preference);}
if(j.Truncated){append_text(this.found_kanji,"...");}}
MRResults.prototype.clear=function()
{clear(this.found_kanji);}
MRResults.prototype.show=function()
{}
function response(data)
{clearresults();j=JSON.parse(data)
mr_results=new MRResults(j)
mr_results.show();for(i=0;i<nButtons;i++){var elname="mr-"+i;var el=getbyid(elname);if(j.Valid[i]){el.classList.remove("invalid");clickable[i]=true;if(clicked[i]){el.classList.add("clicked");}
else{el.classList.remove("clicked");}}
else{clickable[i]=false;el.classList.add("invalid");}}}
function clearresults()
{if(typeof(mr_results)!="undefined"){mr_results.clear();}}
function clearall()
{for(i=0;i<nButtons;i++){var elname="mr-"+i;var el=getbyid(elname);el.classList.remove("invalid");el.classList.remove("clicked");}
reset.classList.add("invalid");clearresults();mr_init();}
function clix(button)
{if(!clickable[button]){return;}
var id="mr-"+button;var el=getbyid(id);if(clicked[button]){nclicked--;if(nclicked==0){clearall();return;}
clicked[button]=false;el.classList.remove("clicked");}
else{reset.classList.remove("invalid");clicked[button]=true;nclicked++;el.classList.add("clicked");}
var sendclick='';for(i=0;i<nButtons;i++){if(clicked[i]){if(sendclick.length>0){sendclick+=":";}
sendclick+=i;}}
sendmr(sendclick);}
function sendmr(sendclick)
{sendget("buttons="+sendclick,response);}
