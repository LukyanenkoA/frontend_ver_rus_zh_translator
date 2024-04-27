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
function gup(name)
{name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS,"g");var values=new Array();while(1){var results=regex.exec(window.location.href);if(results==null){if(values.length==0){return"";}else if(values.length==1){return values[0];}else{return values;}}else{var value=decodeURIComponent(results[1]);values.push(value);}}}
function parse_json(json)
{var result;try{result=eval('('+json+')');}
catch(err){throw("JSON parse");}
return result;}
function sendget(sendmessage,callback,cgi_override)
{var cgi;if(cgi_override){cgi=cgi_override;}else{cgi=cgiscript;}
if(!this.xmlhttp){this.xmlhttp=new XMLHttpRequest();}
if(this.xmlhttp.readyState==1||this.xmlhttp.readyState==2||this.xmlhttp.readyState==3){this.xmlhttp.abort();}
this.xmlhttp.open("GET",cgi+"?"+sendmessage,true);var self=this;this.xmlhttp.onreadystatechange=function(){if(self.xmlhttp.readyState==4){if(self.xmlhttp.status==200){callback(self.xmlhttp.responseText);}}}
this.xmlhttp.send();}
function set_cookie(value)
{var date_now=new Date();var one_year_later=new Date(date_now.getTime()+31536000000);var expiry_date=one_year_later.toGMTString();document.cookie=value+';expires='+expiry_date+';';}
var cgiscript="/goqhanzi/";var use_input_box_cookie="uib=";function show_input_box()
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
function KanjiResults(kanji,n_kanji)
{this.found_kanji=getbyid("found_kanji");this.down_button=getbyid("down_button");this.up_button=getbyid("up_button");this.kanji=kanji.match(/\d+|./g);this.n_kanji=n_kanji;var self=this;this.down_button.onclick=function(){self.go_down();}
this.up_button.onclick=function(){self.go_up();}
if(typeof(results_table_columns)=="undefined"){this.columns=10;}
else{this.columns=results_table_columns;}
if(typeof(max_kanji)=="undefined"){this.max_cells=100;}
else{this.max_cells=max_kanji;}
this.silly_amount=20;this.offset=0;this.scroll=0;this.scrolled_numbers=0;this.numbers=new Array();var max_numbers=Math.floor(n_kanji/this.max_cells);for(var j=0;j<=max_numbers;j++){this.numbers[j]=0;}
for(var i=0;i<n_kanji;i++){var j=Math.floor(i/this.max_cells);if(this.kanji[i].match(/^\d+$/)){this.numbers[j]++;}}}
KanjiResults.prototype.adjust_scroll=function(chng)
{if(this.scroll+chng<0){return;}
this.scroll+=chng;this.offset=this.offset+chng*this.max_cells;this.scrolled_numbers=0;for(var i=0;i<this.scroll;i++){this.scrolled_numbers+=this.numbers[i];}}
KanjiResults.prototype.go_down=function()
{this.adjust_scroll(+1);this.show();}
KanjiResults.prototype.go_up=function()
{this.adjust_scroll(-1);this.show();}
KanjiResults.prototype.clear_found_kanji=function()
{clear(this.found_kanji);}
KanjiResults.prototype.clear_down_button=function()
{clear(this.down_button);}
KanjiResults.prototype.clear_up_button=function()
{clear(this.up_button);}
KanjiResults.prototype.clear=function()
{this.clear_found_kanji();this.clear_down_button();this.clear_up_button();}
KanjiResults.prototype.overflow_button=function()
{var remaining=this.n_kanji-this.max_cells-this.offset;if(this.offset==0&&remaining<=0){return;}
this.clear_down_button();var above=this.offset-this.scrolled_numbers;if(!this.silly_remaining&&remaining>0){var below=this.n_kanji-(above+this.max_cells-this.numbers[this.scroll]);var downbutton=create_text_node("a",this.down_button,"▼"+below+" more");}
this.clear_up_button();if(this.offset!=0){var upbutton=create_text_node("a",this.up_button,"▲"+above+" more");}
else{if(!this.silly_remaining&&remaining>0){upbutton=create_text_node("a",this.up_button,"▲ 0 more");upbutton.className="deadupbutton";}}}
KanjiResults.prototype.show=function()
{this.clear();var max=this.kanji.length;var remaining=0;this.silly_remaining=false;if(this.offset+this.max_cells<max){max=this.offset+this.max_cells;remaining=this.kanji.length-max;if(remaining<this.silly_amount){max=this.kanji.length;this.silly_remaining=true;}}
var displayed_kanji=0;var table=create_node("table",this.found_kanji);var tbody=create_node("tbody",table);var tr;var link_preference=get_link_preference();var window_preference=get_window_preference();for(var k=this.offset;k<max;k++){if((k-this.offset)%this.columns==0)
tr=create_node("tr",tbody);var td=create_node("td",tr);if(this.kanji[k].match(/^\d+$/)){append_text(td,this.kanji[k]);td.className="number";}else{create_link(td,this.kanji[k],window_preference);displayed_kanji++;}}
if(k>=this.max_cells+this.offset||this.offset>0){this.overflow_button(this.silly_remaining);}}
FourCorner.prototype.addResult=function(fc_result_json)
{var fc_result=parse_json(fc_result_json);var buttons=fc_result.buttons;var button_states=buttons.split("");for(var cn=0;cn<5;cn++){for(var bn=0;bn<10;bn++){var state;var i=cn*10+bn;if(button_states[i]=="I"){state="invalid";}
else if(button_states[i]=="P"){state="choice";}
else if(button_states[i]=="C"){state="chosen";}
var button=this.states[cn][bn].button;this.states[cn][bn].state=state;button.className=state;}}
this.kanji_results=new KanjiResults(fc_result.results,fc_result.n_results);this.kanji_results.show();}
FourCorner.prototype.reset=function()
{for(var cn=0;cn<5;cn++){this.clicked[cn]=-1;for(var bn=0;bn<10;bn++){var state;var button=this.states[cn][bn].button;this.states[cn][bn].state="choice";button.className="choice";}}
this.selected=0;if(this.kanji_results){this.kanji_results.clear();}}
FourCorner.prototype.send=function()
{var r="4=";for(x in this.clicked){if(this.clicked[x]>=0){r+=x+" "+this.clicked[x]+"  ";}}
var self=this;r+="&o=j";sendget(r,function(reply){self.addResult(reply);});}
FourCorner.prototype.singleSelect=function(cn,bn)
{for(var b=0;b<10;b++){var state="invalid";if(b==bn){state="chosen";}
var button=this.states[cn][b].button;this.states[cn][b].state=state;button.className=state;}}
FourCorner.prototype.singleUnselect=function(cn,bn)
{for(var c=0;c<5;c++){if(this.clicked[c]>=0){continue;}
for(var b=0;b<10;b++){var state="choice";var button=this.states[c][b].button;this.states[c][b].state=state;button.className=state;}}
this.kanji_results.clear();}
FourCorner.prototype.choose=function(cn,bn)
{var button=this.states[cn][bn].button;var clicked=this.clicked[cn];var unclicked=false
if(clicked>=0){if(clicked==bn){this.clicked[cn]=-1;this.selected--;unclicked=true
if(this.selected==1){this.singleUnselect(cn,bn);}}
else{return;}}
else{var state=this.states[cn][bn].state;if(state=="invalid"){return;}
else{this.clicked[cn]=bn;this.selected++;}}
if(this.selected>1){this.send();}
else if(this.selected==1){if(!unclicked){this.singleSelect(cn,bn);}}
else{this.reset();}}
function FourCorner()
{this.selected=0;this.states=new Array();this.clicked=new Array();var self=this;for(var cn=0;cn<5;cn++){this.states[cn]=new Array();this.clicked[cn]=-1;for(var bn=0;bn<10;bn++){var id="fc"+cn+"v"+bn;var button=getbyid(id);this.states[cn][bn]={"button":button,"state":"choice"};(function(c,b){button.onclick=function(){self.choose(c,b)};}(cn,bn));}}
var reset_button=getbyid("reset-button");reset_button.onclick=function(){self.reset();}
var initial=gup("i");if(initial){var buttons=initial.split("");var cn;for(var i=0;i<6;i++){if(i==4){continue;}
else if(i==5){cn=4;bn=buttons[5];}
else{cn=i;bn=buttons[i];}
this.clicked[cn]=bn;this.selected++;}
this.send();}}
function fc_start_buttons()
{var fc=new FourCorner();input_box_onload();}
