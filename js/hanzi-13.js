function create_node(type,parent)
{var new_node=document.createElement(type);parent.appendChild(new_node);return new_node;}
function create_text_node(type,parent,text)
{var new_node=create_node(type,parent);var text_node=document.createTextNode(text);new_node.appendChild(text_node);return new_node;}
function delete_cookie(name){document.cookie=name+'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';}
function get_cookie(cookie_string)
{if(!document.cookie)
return;var c_start=document.cookie.indexOf(cookie_string);if(c_start==-1)
return;c_start+=cookie_string.length;var c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)
c_end=document.cookie.length;var cookie=document.cookie.substring(c_start,c_end);if(cookie.charAt(0)=="="){cookie=cookie.substring(1)}
return cookie;}
function getbyid(id)
{var element=document.getElementById(id);return element;}
function set_cookie(value)
{var date_now=new Date();var one_year_later=new Date(date_now.getTime()+31536000000);var expiry_date=one_year_later.toGMTString();document.cookie=value+';expires='+expiry_date+';';}
var cgiscript='/goqhanzi/';var debug=false;var iframe=false;function hanzi_onload()
{drawkanji_onload();drawkanji.save_my_input=true;drawkanji.show_numbers="never";input_box_onload();}
var window_cookie_string="newwindow=";function get_window_preference()
{var nwindow=get_cookie(window_cookie_string);return nwindow;}
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
var show_numbers_cookie="draw_show-numbers"
function set_show_numbers_always()
{set_cookie(show_numbers_cookie+"=always")
return false}
function set_show_numbers_never()
{set_cookie(show_numbers_cookie+"=never")
return false}
function set_show_numbers_default()
{delete_cookie(show_numbers_cookie)
return false}
function get_show_numbers()
{var show_numbers=get_cookie(show_numbers_cookie)
if(typeof(show_numbers)=="undefined"){show_numbers="default"}
else if(show_numbers=="0"){show_numbers="never"}
else if(show_numbers=="1"){show_numbers="always"}
return show_numbers}
function set_multicoloured()
{element=getbyid('multicolour')
if(element.checked){set_cookie("multicoloured=1")}
else{set_cookie("multicoloured=0")}
return false}
function get_multicoloured()
{multicoloured=get_cookie("multicoloured")
if(typeof(multicoloured)=="undefined"){return true}else{if(multicoloured=="0"){return false}else{return true}}}
function set_numbers_checked()
{var numbers=get_show_numbers()
if(numbers!="default"){var numbers_default=document.getElementById("numbers-default")
numbers_default.checked=false
var chosen=document.getElementById("numbers-"+numbers)
chosen.checked=true}}
function set_multicolour_checked()
{var multicoloured=get_multicoloured()
if(!multicoloured){var element=document.getElementById("multicolour")
element.checked=false}}
function get_save_my_input()
{var save_my_input=get_cookie("save-my-input")
if(typeof(save_my_input)=="undefined"){return true}
else{if(save_my_input=="0"){return false}
else{return true}}}
function set_save_my_input()
{save_my_input=get_cookie("draw_save-my-input")
if(typeof(save_my_input)=="undefined"){return true}else{if(save_my_input=="0"){return false}else{return true}}}
function set_save_my_input_checked()
{var save_my_input=get_save_my_input()
if(!save_my_input){var element=getbyid("save-my-input")
element.checked=false}}
function set_save_my_input()
{element=getbyid('save-my-input')
if(element.checked){set_cookie("draw_save-my-input=1")}
else{set_cookie("draw_save-my-input=0")}
return false}
