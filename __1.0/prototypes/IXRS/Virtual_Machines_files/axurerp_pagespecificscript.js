
var PageName = 'Virtual Machines';
var PageId = '2511a53fced2431a81f35fe339c8585c'
var PageUrl = 'Virtual_Machines.html'
document.title = 'Virtual Machines';
var PageNotes = 
{
"pageName":"Virtual Machines",
"showNotesNames":"False"}
var $OnLoadVariable = '';

var $CSUM;

var hasQuery = false;
var query = window.location.hash.substring(1);
if (query.length > 0) hasQuery = true;
var vars = query.split("&");
for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0].length > 0) eval("$" + pair[0] + " = decodeURIComponent(pair[1]);");
} 

if (hasQuery && $CSUM != 1) {
alert('Prototype Warning: The variable values were too long to pass to this page.\nIf you are using IE, using Firefox will support more data.');
}

function GetQuerystring() {
    return '#OnLoadVariable=' + encodeURIComponent($OnLoadVariable) + '&CSUM=1';
}

function PopulateVariables(value) {
    var d = new Date();
  value = value.replace(/\[\[OnLoadVariable\]\]/g, $OnLoadVariable);
  value = value.replace(/\[\[PageName\]\]/g, PageName);
  value = value.replace(/\[\[GenDay\]\]/g, '23');
  value = value.replace(/\[\[GenMonth\]\]/g, '12');
  value = value.replace(/\[\[GenMonthName\]\]/g, 'December');
  value = value.replace(/\[\[GenDayOfWeek\]\]/g, 'Friday');
  value = value.replace(/\[\[GenYear\]\]/g, '2011');
  value = value.replace(/\[\[Day\]\]/g, d.getDate());
  value = value.replace(/\[\[Month\]\]/g, d.getMonth() + 1);
  value = value.replace(/\[\[MonthName\]\]/g, GetMonthString(d.getMonth()));
  value = value.replace(/\[\[DayOfWeek\]\]/g, GetDayString(d.getDay()));
  value = value.replace(/\[\[Year\]\]/g, d.getFullYear());
  return value;
}

function OnLoad(e) {

}

var u270 = document.getElementById('u270');
gv_vAlignTable['u270'] = 'top';
var u271 = document.getElementById('u271');

var u272 = document.getElementById('u272');
gv_vAlignTable['u272'] = 'center';
var u273 = document.getElementById('u273');

var u274 = document.getElementById('u274');
gv_vAlignTable['u274'] = 'center';
var u275 = document.getElementById('u275');

var u276 = document.getElementById('u276');

var u277 = document.getElementById('u277');
gv_vAlignTable['u277'] = 'top';
var u278 = document.getElementById('u278');

var u279 = document.getElementById('u279');
gv_vAlignTable['u279'] = 'top';
var u631 = document.getElementById('u631');

var u632 = document.getElementById('u632');

var u633 = document.getElementById('u633');
gv_vAlignTable['u633'] = 'top';
var u634 = document.getElementById('u634');

var u635 = document.getElementById('u635');

var u800 = document.getElementById('u800');
gv_vAlignTable['u800'] = 'top';
var u637 = document.getElementById('u637');
gv_vAlignTable['u637'] = 'top';
var u638 = document.getElementById('u638');

var u639 = document.getElementById('u639');
gv_vAlignTable['u639'] = 'top';
var u650 = document.getElementById('u650');
gv_vAlignTable['u650'] = 'center';
var u280 = document.getElementById('u280');

var u281 = document.getElementById('u281');
gv_vAlignTable['u281'] = 'top';
var u282 = document.getElementById('u282');
gv_vAlignTable['u282'] = 'top';
var u283 = document.getElementById('u283');

var u284 = document.getElementById('u284');
gv_vAlignTable['u284'] = 'top';
var u285 = document.getElementById('u285');

u285.style.cursor = 'pointer';
if (bIE) u285.attachEvent("onclick", Clicku285);
else u285.addEventListener("click", Clicku285, true);
function Clicku285(e)
{
windowEvent = e;


if (true) {

	SetPanelState('u174', 'pd2u174','none','',500,'none','',500);

}

}

var u286 = document.getElementById('u286');
gv_vAlignTable['u286'] = 'center';
var u287 = document.getElementById('u287');

var u288 = document.getElementById('u288');
gv_vAlignTable['u288'] = 'center';
var u289 = document.getElementById('u289');

var u641 = document.getElementById('u641');
gv_vAlignTable['u641'] = 'top';
var u642 = document.getElementById('u642');

var u643 = document.getElementById('u643');
gv_vAlignTable['u643'] = 'top';
var u644 = document.getElementById('u644');

var u645 = document.getElementById('u645');
gv_vAlignTable['u645'] = 'top';
var u646 = document.getElementById('u646');
gv_vAlignTable['u646'] = 'top';
var u810 = document.getElementById('u810');
gv_vAlignTable['u810'] = 'top';
var u648 = document.getElementById('u648');
gv_vAlignTable['u648'] = 'center';
var u490 = document.getElementById('u490');

var u491 = document.getElementById('u491');
gv_vAlignTable['u491'] = 'top';
var u492 = document.getElementById('u492');

var u493 = document.getElementById('u493');
gv_vAlignTable['u493'] = 'top';
var u494 = document.getElementById('u494');

var u495 = document.getElementById('u495');
gv_vAlignTable['u495'] = 'top';
var u496 = document.getElementById('u496');

var u100 = document.getElementById('u100');

var u101 = document.getElementById('u101');
gv_vAlignTable['u101'] = 'top';
var u102 = document.getElementById('u102');

var u103 = document.getElementById('u103');
gv_vAlignTable['u103'] = 'top';
var u104 = document.getElementById('u104');

var u105 = document.getElementById('u105');
gv_vAlignTable['u105'] = 'top';
var u106 = document.getElementById('u106');

var u107 = document.getElementById('u107');

var u108 = document.getElementById('u108');
gv_vAlignTable['u108'] = 'top';
var u109 = document.getElementById('u109');

var u297 = document.getElementById('u297');
gv_vAlignTable['u297'] = 'top';
var u298 = document.getElementById('u298');

var u299 = document.getElementById('u299');
gv_vAlignTable['u299'] = 'center';
var u651 = document.getElementById('u651');

var u652 = document.getElementById('u652');

var u653 = document.getElementById('u653');

var u654 = document.getElementById('u654');
gv_vAlignTable['u654'] = 'top';
var u655 = document.getElementById('u655');

var u500 = document.getElementById('u500');

var u657 = document.getElementById('u657');

var u820 = document.getElementById('u820');
gv_vAlignTable['u820'] = 'top';
var u659 = document.getElementById('u659');

var u110 = document.getElementById('u110');
gv_vAlignTable['u110'] = 'top';
var u111 = document.getElementById('u111');

var u112 = document.getElementById('u112');
gv_vAlignTable['u112'] = 'top';
var u113 = document.getElementById('u113');

var u114 = document.getElementById('u114');
gv_vAlignTable['u114'] = 'top';
var u115 = document.getElementById('u115');

var u116 = document.getElementById('u116');
gv_vAlignTable['u116'] = 'top';
var u117 = document.getElementById('u117');

var u118 = document.getElementById('u118');
gv_vAlignTable['u118'] = 'top';
var u119 = document.getElementById('u119');

var u660 = document.getElementById('u660');
gv_vAlignTable['u660'] = 'top';
var u661 = document.getElementById('u661');

var u662 = document.getElementById('u662');
gv_vAlignTable['u662'] = 'top';
var u663 = document.getElementById('u663');

var u664 = document.getElementById('u664');
gv_vAlignTable['u664'] = 'top';
var u665 = document.getElementById('u665');

var u510 = document.getElementById('u510');
gv_vAlignTable['u510'] = 'top';
var u667 = document.getElementById('u667');

var u668 = document.getElementById('u668');
gv_vAlignTable['u668'] = 'top';
var u830 = document.getElementById('u830');
gv_vAlignTable['u830'] = 'top';
var u690 = document.getElementById('u690');

var u691 = document.getElementById('u691');

var u34 = document.getElementById('u34');

var u120 = document.getElementById('u120');
gv_vAlignTable['u120'] = 'top';
var u121 = document.getElementById('u121');

var u122 = document.getElementById('u122');
gv_vAlignTable['u122'] = 'top';
var u123 = document.getElementById('u123');

var u124 = document.getElementById('u124');
gv_vAlignTable['u124'] = 'top';
var u125 = document.getElementById('u125');

var u126 = document.getElementById('u126');
gv_vAlignTable['u126'] = 'top';
var u127 = document.getElementById('u127');

var u128 = document.getElementById('u128');
gv_vAlignTable['u128'] = 'top';
var u129 = document.getElementById('u129');

var u670 = document.getElementById('u670');
gv_vAlignTable['u670'] = 'top';
var u671 = document.getElementById('u671');

var u672 = document.getElementById('u672');
gv_vAlignTable['u672'] = 'top';
var u673 = document.getElementById('u673');

var u674 = document.getElementById('u674');
gv_vAlignTable['u674'] = 'top';
var u675 = document.getElementById('u675');

var u676 = document.getElementById('u676');
gv_vAlignTable['u676'] = 'top';
var u677 = document.getElementById('u677');

var u678 = document.getElementById('u678');
gv_vAlignTable['u678'] = 'top';
var u840 = document.getElementById('u840');
gv_vAlignTable['u840'] = 'top';
var u558 = document.getElementById('u558');

var u844 = document.getElementById('u844');

var u845 = document.getElementById('u845');
gv_vAlignTable['u845'] = 'center';
var u846 = document.getElementById('u846');

var u130 = document.getElementById('u130');
gv_vAlignTable['u130'] = 'top';
var u131 = document.getElementById('u131');

var u132 = document.getElementById('u132');
gv_vAlignTable['u132'] = 'top';
var u133 = document.getElementById('u133');

var u134 = document.getElementById('u134');
gv_vAlignTable['u134'] = 'top';
var u135 = document.getElementById('u135');

var u136 = document.getElementById('u136');
gv_vAlignTable['u136'] = 'top';
var u137 = document.getElementById('u137');

var u138 = document.getElementById('u138');
gv_vAlignTable['u138'] = 'top';
var u139 = document.getElementById('u139');

var u680 = document.getElementById('u680');
gv_vAlignTable['u680'] = 'top';
var u681 = document.getElementById('u681');

var u682 = document.getElementById('u682');
gv_vAlignTable['u682'] = 'top';
var u683 = document.getElementById('u683');

var u684 = document.getElementById('u684');
gv_vAlignTable['u684'] = 'top';
var u685 = document.getElementById('u685');

var u686 = document.getElementById('u686');
gv_vAlignTable['u686'] = 'top';
var u687 = document.getElementById('u687');

var u564 = document.getElementById('u564');
gv_vAlignTable['u564'] = 'top';
var u689 = document.getElementById('u689');

var u850 = document.getElementById('u850');

u850.style.cursor = 'pointer';
if (bIE) u850.attachEvent("onclick", Clicku850);
else u850.addEventListener("click", Clicku850, true);
function Clicku850(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','hidden','none',500);

                                EnableImageWidget('u891');
	SetPanelVisibility('u534','','none',500);

	SetPanelState('u539', 'pd2u539','none','',500,'none','',500);

	SetPanelState('u6', 'pd4u6','none','',500,'none','',500);
function waituf260100161c040aaa995d5c8b27dcd901() {

	SetPanelVisibility('u534','hidden','none',500);

	SetPanelState('u6', 'pd0u6','none','',500,'none','',500);
}
setTimeout(waituf260100161c040aaa995d5c8b27dcd901, 2000);

}

}

var u851 = document.getElementById('u851');
gv_vAlignTable['u851'] = 'center';
var u852 = document.getElementById('u852');

var u853 = document.getElementById('u853');
gv_vAlignTable['u853'] = 'top';
var u854 = document.getElementById('u854');

var u855 = document.getElementById('u855');
gv_vAlignTable['u855'] = 'top';
var u856 = document.getElementById('u856');

var u140 = document.getElementById('u140');

var u141 = document.getElementById('u141');
gv_vAlignTable['u141'] = 'top';
var u142 = document.getElementById('u142');

var u143 = document.getElementById('u143');
gv_vAlignTable['u143'] = 'top';
var u144 = document.getElementById('u144');

var u145 = document.getElementById('u145');
gv_vAlignTable['u145'] = 'top';
var u146 = document.getElementById('u146');

var u147 = document.getElementById('u147');
gv_vAlignTable['u147'] = 'top';
var u148 = document.getElementById('u148');

var u149 = document.getElementById('u149');
gv_vAlignTable['u149'] = 'top';
var u501 = document.getElementById('u501');
gv_vAlignTable['u501'] = 'top';
var u502 = document.getElementById('u502');

var u503 = document.getElementById('u503');
gv_vAlignTable['u503'] = 'center';
var u10 = document.getElementById('u10');

var u11 = document.getElementById('u11');
gv_vAlignTable['u11'] = 'top';
var u12 = document.getElementById('u12');

var u13 = document.getElementById('u13');
gv_vAlignTable['u13'] = 'top';
var u14 = document.getElementById('u14');

var u15 = document.getElementById('u15');
gv_vAlignTable['u15'] = 'top';
var u16 = document.getElementById('u16');

var u17 = document.getElementById('u17');
gv_vAlignTable['u17'] = 'top';
var u18 = document.getElementById('u18');

var u19 = document.getElementById('u19');
gv_vAlignTable['u19'] = 'top';
var u862 = document.getElementById('u862');

var u863 = document.getElementById('u863');
gv_vAlignTable['u863'] = 'top';
var u864 = document.getElementById('u864');
gv_vAlignTable['u864'] = 'top';
var u865 = document.getElementById('u865');

u865.style.cursor = 'pointer';
if (bIE) u865.attachEvent("onclick", Clicku865);
else u865.addEventListener("click", Clicku865, true);
function Clicku865(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','hidden','none',500);

                                EnableImageWidget('u891');
}

}

var u866 = document.getElementById('u866');
gv_vAlignTable['u866'] = 'top';
var u150 = document.getElementById('u150');

var u151 = document.getElementById('u151');
gv_vAlignTable['u151'] = 'top';
var u152 = document.getElementById('u152');

var u153 = document.getElementById('u153');
gv_vAlignTable['u153'] = 'top';
var u154 = document.getElementById('u154');

var u155 = document.getElementById('u155');
gv_vAlignTable['u155'] = 'top';
var u156 = document.getElementById('u156');

var u157 = document.getElementById('u157');
gv_vAlignTable['u157'] = 'top';
var u158 = document.getElementById('u158');

var u159 = document.getElementById('u159');
gv_vAlignTable['u159'] = 'top';
var u511 = document.getElementById('u511');
gv_vAlignTable['u511'] = 'top';
var u512 = document.getElementById('u512');

u512.style.cursor = 'pointer';
if (bIE) u512.attachEvent("onclick", Clicku512);
else u512.addEventListener("click", Clicku512, true);
function Clicku512(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','','none',500);

	SetPanelState('u878', 'pd0u878','none','',500,'none','',500);

}

}

var u513 = document.getElementById('u513');

u513.style.cursor = 'pointer';
if (bIE) u513.attachEvent("onclick", Clicku513);
else u513.addEventListener("click", Clicku513, true);
function Clicku513(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u519','','none',500);

	SetPanelState('u527', 'pd1u527','none','',500,'none','',500);

	SetPanelVisibility('u384','hidden','none',500);

}

}

var u20 = document.getElementById('u20');

var u21 = document.getElementById('u21');
gv_vAlignTable['u21'] = 'top';
var u22 = document.getElementById('u22');

var u23 = document.getElementById('u23');
gv_vAlignTable['u23'] = 'top';
var u24 = document.getElementById('u24');

var u25 = document.getElementById('u25');
gv_vAlignTable['u25'] = 'top';
var u26 = document.getElementById('u26');

var u27 = document.getElementById('u27');
gv_vAlignTable['u27'] = 'top';
var u28 = document.getElementById('u28');

var u29 = document.getElementById('u29');
gv_vAlignTable['u29'] = 'top';
var u872 = document.getElementById('u872');
gv_vAlignTable['u872'] = 'top';
var u873 = document.getElementById('u873');

u873.style.cursor = 'pointer';
if (bIE) u873.attachEvent("onclick", Clicku873);
else u873.addEventListener("click", Clicku873, true);
function Clicku873(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','','none',500);

	SetPanelState('u878', 'pd1u878','none','',500,'none','',500);

}

}

var u874 = document.getElementById('u874');
gv_vAlignTable['u874'] = 'top';
var u875 = document.getElementById('u875');

var u160 = document.getElementById('u160');

var u161 = document.getElementById('u161');
gv_vAlignTable['u161'] = 'top';
var u162 = document.getElementById('u162');

var u163 = document.getElementById('u163');
gv_vAlignTable['u163'] = 'top';
var u164 = document.getElementById('u164');

var u165 = document.getElementById('u165');
gv_vAlignTable['u165'] = 'top';
var u166 = document.getElementById('u166');

var u167 = document.getElementById('u167');
gv_vAlignTable['u167'] = 'top';
var u168 = document.getElementById('u168');

var u169 = document.getElementById('u169');
gv_vAlignTable['u169'] = 'top';
var u521 = document.getElementById('u521');
gv_vAlignTable['u521'] = 'center';
var u522 = document.getElementById('u522');

var u203 = document.getElementById('u203');
gv_vAlignTable['u203'] = 'top';
var u30 = document.getElementById('u30');

var u31 = document.getElementById('u31');
gv_vAlignTable['u31'] = 'top';
var u32 = document.getElementById('u32');

var u33 = document.getElementById('u33');
gv_vAlignTable['u33'] = 'top';
var u208 = document.getElementById('u208');
gv_vAlignTable['u208'] = 'center';
var u35 = document.getElementById('u35');
gv_vAlignTable['u35'] = 'top';
var u36 = document.getElementById('u36');

var u37 = document.getElementById('u37');
gv_vAlignTable['u37'] = 'top';
var u38 = document.getElementById('u38');

var u39 = document.getElementById('u39');
gv_vAlignTable['u39'] = 'top';
var u703 = document.getElementById('u703');
gv_vAlignTable['u703'] = 'top';
var u709 = document.getElementById('u709');
gv_vAlignTable['u709'] = 'top';
var u705 = document.getElementById('u705');
gv_vAlignTable['u705'] = 'center';
var u708 = document.getElementById('u708');

var u170 = document.getElementById('u170');

var u171 = document.getElementById('u171');
gv_vAlignTable['u171'] = 'top';
var u172 = document.getElementById('u172');

u172.style.cursor = 'pointer';
if (bIE) u172.attachEvent("onclick", Clicku172);
else u172.addEventListener("click", Clicku172, true);
function Clicku172(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u174','','none',500);

}

}

var u173 = document.getElementById('u173');
gv_vAlignTable['u173'] = 'bottom';
var u174 = document.getElementById('u174');

var u175 = document.getElementById('u175');

var u176 = document.getElementById('u176');
gv_vAlignTable['u176'] = 'center';
var u177 = document.getElementById('u177');

var u178 = document.getElementById('u178');
gv_vAlignTable['u178'] = 'top';
var u179 = document.getElementById('u179');

var u531 = document.getElementById('u531');
gv_vAlignTable['u531'] = 'bottom';
var u532 = document.getElementById('u532');

var u533 = document.getElementById('u533');
gv_vAlignTable['u533'] = 'top';
var u40 = document.getElementById('u40');

var u41 = document.getElementById('u41');

var u42 = document.getElementById('u42');
gv_vAlignTable['u42'] = 'top';
var u43 = document.getElementById('u43');

var u44 = document.getElementById('u44');
gv_vAlignTable['u44'] = 'top';
var u45 = document.getElementById('u45');

var u46 = document.getElementById('u46');
gv_vAlignTable['u46'] = 'top';
var u47 = document.getElementById('u47');

var u48 = document.getElementById('u48');
gv_vAlignTable['u48'] = 'top';
var u49 = document.getElementById('u49');

var u394 = document.getElementById('u394');

var u717 = document.getElementById('u717');

var u396 = document.getElementById('u396');

var u890 = document.getElementById('u890');
gv_vAlignTable['u890'] = 'center';
var u713 = document.getElementById('u713');
gv_vAlignTable['u713'] = 'top';
var u714 = document.getElementById('u714');
gv_vAlignTable['u714'] = 'top';
var u180 = document.getElementById('u180');
gv_vAlignTable['u180'] = 'top';
var u181 = document.getElementById('u181');

var u182 = document.getElementById('u182');
gv_vAlignTable['u182'] = 'top';
var u183 = document.getElementById('u183');
gv_vAlignTable['u183'] = 'top';
var u184 = document.getElementById('u184');

var u185 = document.getElementById('u185');
gv_vAlignTable['u185'] = 'top';
var u186 = document.getElementById('u186');
gv_vAlignTable['u186'] = 'top';
var u187 = document.getElementById('u187');

var u188 = document.getElementById('u188');

var u189 = document.getElementById('u189');

var u541 = document.getElementById('u541');
gv_vAlignTable['u541'] = 'top';
var u542 = document.getElementById('u542');

var u543 = document.getElementById('u543');
gv_vAlignTable['u543'] = 'top';
var u50 = document.getElementById('u50');
gv_vAlignTable['u50'] = 'top';
var u51 = document.getElementById('u51');

var u52 = document.getElementById('u52');
gv_vAlignTable['u52'] = 'top';
var u53 = document.getElementById('u53');

var u54 = document.getElementById('u54');
gv_vAlignTable['u54'] = 'top';
var u55 = document.getElementById('u55');

var u56 = document.getElementById('u56');
gv_vAlignTable['u56'] = 'top';
var u57 = document.getElementById('u57');

var u58 = document.getElementById('u58');
gv_vAlignTable['u58'] = 'top';
var u59 = document.getElementById('u59');

var u720 = document.getElementById('u720');
gv_vAlignTable['u720'] = 'center';
var u190 = document.getElementById('u190');
gv_vAlignTable['u190'] = 'top';
var u191 = document.getElementById('u191');

var u192 = document.getElementById('u192');
gv_vAlignTable['u192'] = 'top';
var u193 = document.getElementById('u193');
gv_vAlignTable['u193'] = 'top';
var u194 = document.getElementById('u194');

u194.style.cursor = 'pointer';
if (bIE) u194.attachEvent("onclick", Clicku194);
else u194.addEventListener("click", Clicku194, true);
function Clicku194(e)
{
windowEvent = e;


if (true) {

	self.location.href="Snapshot.html" + GetQuerystring();

}

}

var u195 = document.getElementById('u195');
gv_vAlignTable['u195'] = 'center';
var u196 = document.getElementById('u196');

var u197 = document.getElementById('u197');
gv_vAlignTable['u197'] = 'center';
var u198 = document.getElementById('u198');

var u199 = document.getElementById('u199');
gv_vAlignTable['u199'] = 'top';
var u551 = document.getElementById('u551');
gv_vAlignTable['u551'] = 'top';
var u552 = document.getElementById('u552');

var u553 = document.getElementById('u553');
gv_vAlignTable['u553'] = 'top';
var u60 = document.getElementById('u60');
gv_vAlignTable['u60'] = 'top';
var u61 = document.getElementById('u61');

var u62 = document.getElementById('u62');
gv_vAlignTable['u62'] = 'top';
var u63 = document.getElementById('u63');

var u64 = document.getElementById('u64');
gv_vAlignTable['u64'] = 'top';
var u65 = document.getElementById('u65');

var u66 = document.getElementById('u66');
gv_vAlignTable['u66'] = 'top';
var u67 = document.getElementById('u67');

var u68 = document.getElementById('u68');
gv_vAlignTable['u68'] = 'top';
var u69 = document.getElementById('u69');

var u889 = document.getElementById('u889');

u889.style.cursor = 'pointer';
if (bIE) u889.attachEvent("onclick", Clicku889);
else u889.addEventListener("click", Clicku889, true);
function Clicku889(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','hidden','none',500);

	SetPanelState('u509', 'pd1u509','none','',500,'none','',500);

}

}

var u730 = document.getElementById('u730');

u730.style.cursor = 'pointer';
if (bIE) u730.attachEvent("onclick", Clicku730);
else u730.addEventListener("click", Clicku730, true);
function Clicku730(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u723','hidden','none',500);

	SetPanelVisibility('u555','hidden','none',500);

	SetPanelState('u6', 'pd1u6','none','',500,'none','',500);

	SetPanelVisibility('u534','','none',500);

	SetPanelState('u539', 'pd0u539','none','',500,'none','',500);

	SetPanelState('u6', 'pd2u6','none','',500,'none','',500);
function waitub30f968f3df54876b0ec9181ab153acb1() {

	SetPanelVisibility('u534','hidden','none',500);

	SetPanelState('u6', 'pd0u6','none','',500,'none','',500);

                                EnableImageWidget('u891');}
setTimeout(waitub30f968f3df54876b0ec9181ab153acb1, 2000);

}

}

var u590 = document.getElementById('u590');

var u591 = document.getElementById('u591');
gv_vAlignTable['u591'] = 'top';
var u595 = document.getElementById('u595');
gv_vAlignTable['u595'] = 'top';
var u560 = document.getElementById('u560');

u560.style.cursor = 'pointer';
if (bIE) u560.attachEvent("onclick", Clicku560);
else u560.addEventListener("click", Clicku560, true);
function Clicku560(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','hidden','none',500);

                                EnableImageWidget('u891');
}

}

var u561 = document.getElementById('u561');
gv_vAlignTable['u561'] = 'top';
var u562 = document.getElementById('u562');
gv_vAlignTable['u562'] = 'top';
var u563 = document.getElementById('u563');

var u70 = document.getElementById('u70');
gv_vAlignTable['u70'] = 'top';
var u71 = document.getElementById('u71');

var u72 = document.getElementById('u72');
gv_vAlignTable['u72'] = 'top';
var u73 = document.getElementById('u73');

var u74 = document.getElementById('u74');

var u75 = document.getElementById('u75');
gv_vAlignTable['u75'] = 'top';
var u76 = document.getElementById('u76');

var u77 = document.getElementById('u77');
gv_vAlignTable['u77'] = 'top';
var u78 = document.getElementById('u78');

var u79 = document.getElementById('u79');
gv_vAlignTable['u79'] = 'top';
var u600 = document.getElementById('u600');

var u876 = document.getElementById('u876');

var u878 = document.getElementById('u878');

var u570 = document.getElementById('u570');
gv_vAlignTable['u570'] = 'top';
var u571 = document.getElementById('u571');

var u572 = document.getElementById('u572');
gv_vAlignTable['u572'] = 'top';
var u573 = document.getElementById('u573');
gv_vAlignTable['u573'] = 'top';
var u80 = document.getElementById('u80');

var u81 = document.getElementById('u81');
gv_vAlignTable['u81'] = 'top';
var u82 = document.getElementById('u82');

var u83 = document.getElementById('u83');
gv_vAlignTable['u83'] = 'top';
var u84 = document.getElementById('u84');

var u85 = document.getElementById('u85');
gv_vAlignTable['u85'] = 'top';
var u86 = document.getElementById('u86');

var u87 = document.getElementById('u87');
gv_vAlignTable['u87'] = 'top';
var u88 = document.getElementById('u88');

var u89 = document.getElementById('u89');
gv_vAlignTable['u89'] = 'top';
var u886 = document.getElementById('u886');
gv_vAlignTable['u886'] = 'center';
var u580 = document.getElementById('u580');

var u581 = document.getElementById('u581');

var u582 = document.getElementById('u582');

var u583 = document.getElementById('u583');
gv_vAlignTable['u583'] = 'top';
var u90 = document.getElementById('u90');

var u91 = document.getElementById('u91');
gv_vAlignTable['u91'] = 'top';
var u92 = document.getElementById('u92');

var u93 = document.getElementById('u93');
gv_vAlignTable['u93'] = 'top';
var u94 = document.getElementById('u94');

var u95 = document.getElementById('u95');
gv_vAlignTable['u95'] = 'top';
var u96 = document.getElementById('u96');

var u97 = document.getElementById('u97');
gv_vAlignTable['u97'] = 'top';
var u98 = document.getElementById('u98');

var u99 = document.getElementById('u99');
gv_vAlignTable['u99'] = 'top';
var u891 = document.getElementById('u891');

u891.style.cursor = 'pointer';
if (bIE) u891.attachEvent("onclick", Clicku891);
else u891.addEventListener("click", Clicku891, true);
function Clicku891(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','','none',500);

SetWidgetSelected('u891');
	SetPanelState('u555', 'pd0u555','none','',500,'none','',500);

}

}

var u892 = document.getElementById('u892');
gv_vAlignTable['u892'] = 'center';
var u400 = document.getElementById('u400');

var u401 = document.getElementById('u401');

var u402 = document.getElementById('u402');
gv_vAlignTable['u402'] = 'top';
var u403 = document.getElementById('u403');

var u404 = document.getElementById('u404');
gv_vAlignTable['u404'] = 'top';
var u405 = document.getElementById('u405');

var u406 = document.getElementById('u406');
gv_vAlignTable['u406'] = 'top';
var u407 = document.getElementById('u407');

var u408 = document.getElementById('u408');
gv_vAlignTable['u408'] = 'top';
var u409 = document.getElementById('u409');

var u597 = document.getElementById('u597');
gv_vAlignTable['u597'] = 'top';
var u598 = document.getElementById('u598');

var u599 = document.getElementById('u599');
gv_vAlignTable['u599'] = 'top';
var u610 = document.getElementById('u610');

var u410 = document.getElementById('u410');
gv_vAlignTable['u410'] = 'top';
var u411 = document.getElementById('u411');

var u412 = document.getElementById('u412');
gv_vAlignTable['u412'] = 'top';
var u413 = document.getElementById('u413');

var u414 = document.getElementById('u414');
gv_vAlignTable['u414'] = 'top';
var u415 = document.getElementById('u415');

var u416 = document.getElementById('u416');
gv_vAlignTable['u416'] = 'top';
var u417 = document.getElementById('u417');

var u418 = document.getElementById('u418');
gv_vAlignTable['u418'] = 'top';
var u419 = document.getElementById('u419');

var u603 = document.getElementById('u603');
gv_vAlignTable['u603'] = 'top';
var u604 = document.getElementById('u604');

var u605 = document.getElementById('u605');
gv_vAlignTable['u605'] = 'top';
var u606 = document.getElementById('u606');

var u607 = document.getElementById('u607');
gv_vAlignTable['u607'] = 'top';
var u608 = document.getElementById('u608');

var u609 = document.getElementById('u609');
gv_vAlignTable['u609'] = 'top';
var u620 = document.getElementById('u620');

var u887 = document.getElementById('u887');
gv_vAlignTable['u887'] = 'top';
var u420 = document.getElementById('u420');
gv_vAlignTable['u420'] = 'top';
var u421 = document.getElementById('u421');

var u422 = document.getElementById('u422');
gv_vAlignTable['u422'] = 'top';
var u423 = document.getElementById('u423');

var u424 = document.getElementById('u424');
gv_vAlignTable['u424'] = 'top';
var u425 = document.getElementById('u425');

var u426 = document.getElementById('u426');
gv_vAlignTable['u426'] = 'top';
var u427 = document.getElementById('u427');

var u428 = document.getElementById('u428');
gv_vAlignTable['u428'] = 'top';
var u429 = document.getElementById('u429');

var u290 = document.getElementById('u290');
gv_vAlignTable['u290'] = 'top';
var u291 = document.getElementById('u291');

var u292 = document.getElementById('u292');
gv_vAlignTable['u292'] = 'top';
var u293 = document.getElementById('u293');

var u294 = document.getElementById('u294');
gv_vAlignTable['u294'] = 'top';
var u295 = document.getElementById('u295');
gv_vAlignTable['u295'] = 'top';
var u296 = document.getElementById('u296');

var u636 = document.getElementById('u636');

var u430 = document.getElementById('u430');
gv_vAlignTable['u430'] = 'top';
var u431 = document.getElementById('u431');

var u432 = document.getElementById('u432');
gv_vAlignTable['u432'] = 'top';
var u433 = document.getElementById('u433');

var u434 = document.getElementById('u434');
gv_vAlignTable['u434'] = 'top';
var u435 = document.getElementById('u435');

var u436 = document.getElementById('u436');
gv_vAlignTable['u436'] = 'top';
var u437 = document.getElementById('u437');

var u438 = document.getElementById('u438');
gv_vAlignTable['u438'] = 'top';
var u439 = document.getElementById('u439');

var u440 = document.getElementById('u440');
gv_vAlignTable['u440'] = 'top';
var u441 = document.getElementById('u441');

var u442 = document.getElementById('u442');
gv_vAlignTable['u442'] = 'top';
var u443 = document.getElementById('u443');

var u444 = document.getElementById('u444');
gv_vAlignTable['u444'] = 'top';
var u445 = document.getElementById('u445');

var u446 = document.getElementById('u446');
gv_vAlignTable['u446'] = 'top';
var u447 = document.getElementById('u447');

var u448 = document.getElementById('u448');
gv_vAlignTable['u448'] = 'top';
var u449 = document.getElementById('u449');

var u801 = document.getElementById('u801');

var u802 = document.getElementById('u802');
gv_vAlignTable['u802'] = 'center';
var u803 = document.getElementById('u803');

var u804 = document.getElementById('u804');

var u805 = document.getElementById('u805');

var u806 = document.getElementById('u806');
gv_vAlignTable['u806'] = 'top';
var u807 = document.getElementById('u807');

var u808 = document.getElementById('u808');
gv_vAlignTable['u808'] = 'top';
var u809 = document.getElementById('u809');

var u450 = document.getElementById('u450');
gv_vAlignTable['u450'] = 'top';
var u451 = document.getElementById('u451');

var u452 = document.getElementById('u452');

var u453 = document.getElementById('u453');
gv_vAlignTable['u453'] = 'top';
var u454 = document.getElementById('u454');

var u455 = document.getElementById('u455');
gv_vAlignTable['u455'] = 'top';
var u456 = document.getElementById('u456');

var u457 = document.getElementById('u457');
gv_vAlignTable['u457'] = 'top';
var u458 = document.getElementById('u458');

var u459 = document.getElementById('u459');
gv_vAlignTable['u459'] = 'top';
var u811 = document.getElementById('u811');

var u812 = document.getElementById('u812');
gv_vAlignTable['u812'] = 'top';
var u813 = document.getElementById('u813');

var u814 = document.getElementById('u814');
gv_vAlignTable['u814'] = 'top';
var u815 = document.getElementById('u815');

var u816 = document.getElementById('u816');
gv_vAlignTable['u816'] = 'top';
var u817 = document.getElementById('u817');

var u818 = document.getElementById('u818');
gv_vAlignTable['u818'] = 'top';
var u819 = document.getElementById('u819');

var u647 = document.getElementById('u647');

var u649 = document.getElementById('u649');

var u460 = document.getElementById('u460');

var u461 = document.getElementById('u461');
gv_vAlignTable['u461'] = 'top';
var u462 = document.getElementById('u462');

var u463 = document.getElementById('u463');
gv_vAlignTable['u463'] = 'top';
var u464 = document.getElementById('u464');

var u465 = document.getElementById('u465');
gv_vAlignTable['u465'] = 'top';
var u466 = document.getElementById('u466');

var u467 = document.getElementById('u467');
gv_vAlignTable['u467'] = 'top';
var u468 = document.getElementById('u468');

var u469 = document.getElementById('u469');
gv_vAlignTable['u469'] = 'top';
var u821 = document.getElementById('u821');

var u822 = document.getElementById('u822');
gv_vAlignTable['u822'] = 'top';
var u823 = document.getElementById('u823');

var u824 = document.getElementById('u824');
gv_vAlignTable['u824'] = 'top';
var u825 = document.getElementById('u825');

var u826 = document.getElementById('u826');
gv_vAlignTable['u826'] = 'top';
var u827 = document.getElementById('u827');

var u828 = document.getElementById('u828');
gv_vAlignTable['u828'] = 'top';
var u829 = document.getElementById('u829');

var u656 = document.getElementById('u656');
gv_vAlignTable['u656'] = 'center';
var u658 = document.getElementById('u658');

var u692 = document.getElementById('u692');

var u470 = document.getElementById('u470');

var u471 = document.getElementById('u471');
gv_vAlignTable['u471'] = 'top';
var u472 = document.getElementById('u472');

var u473 = document.getElementById('u473');
gv_vAlignTable['u473'] = 'top';
var u474 = document.getElementById('u474');

var u475 = document.getElementById('u475');
gv_vAlignTable['u475'] = 'top';
var u476 = document.getElementById('u476');

var u477 = document.getElementById('u477');
gv_vAlignTable['u477'] = 'top';
var u478 = document.getElementById('u478');

var u479 = document.getElementById('u479');
gv_vAlignTable['u479'] = 'top';
var u831 = document.getElementById('u831');

var u832 = document.getElementById('u832');
gv_vAlignTable['u832'] = 'top';
var u833 = document.getElementById('u833');

var u834 = document.getElementById('u834');
gv_vAlignTable['u834'] = 'top';
var u835 = document.getElementById('u835');

var u836 = document.getElementById('u836');

var u837 = document.getElementById('u837');

var u838 = document.getElementById('u838');

var u839 = document.getElementById('u839');

var u666 = document.getElementById('u666');
gv_vAlignTable['u666'] = 'top';
var u669 = document.getElementById('u669');

var u480 = document.getElementById('u480');

var u481 = document.getElementById('u481');
gv_vAlignTable['u481'] = 'top';
var u482 = document.getElementById('u482');

var u483 = document.getElementById('u483');
gv_vAlignTable['u483'] = 'top';
var u484 = document.getElementById('u484');

var u485 = document.getElementById('u485');
gv_vAlignTable['u485'] = 'top';
var u486 = document.getElementById('u486');

var u487 = document.getElementById('u487');
gv_vAlignTable['u487'] = 'top';
var u488 = document.getElementById('u488');

var u489 = document.getElementById('u489');
gv_vAlignTable['u489'] = 'top';
var u841 = document.getElementById('u841');
gv_vAlignTable['u841'] = 'top';
var u842 = document.getElementById('u842');

var u843 = document.getElementById('u843');
gv_vAlignTable['u843'] = 'center';
var u204 = document.getElementById('u204');
gv_vAlignTable['u204'] = 'top';
var u205 = document.getElementById('u205');

var u206 = document.getElementById('u206');
gv_vAlignTable['u206'] = 'top';
var u847 = document.getElementById('u847');
gv_vAlignTable['u847'] = 'top';
var u848 = document.getElementById('u848');
gv_vAlignTable['u848'] = 'top';
var u849 = document.getElementById('u849');
gv_vAlignTable['u849'] = 'top';
var u679 = document.getElementById('u679');

var u300 = document.getElementById('u300');
gv_vAlignTable['u300'] = 'top';
var u301 = document.getElementById('u301');

var u302 = document.getElementById('u302');

var u303 = document.getElementById('u303');

var u304 = document.getElementById('u304');
gv_vAlignTable['u304'] = 'top';
var u305 = document.getElementById('u305');

var u306 = document.getElementById('u306');
gv_vAlignTable['u306'] = 'top';
var u307 = document.getElementById('u307');

var u308 = document.getElementById('u308');
gv_vAlignTable['u308'] = 'top';
var u309 = document.getElementById('u309');

var u497 = document.getElementById('u497');
gv_vAlignTable['u497'] = 'top';
var u498 = document.getElementById('u498');

var u499 = document.getElementById('u499');
gv_vAlignTable['u499'] = 'top';
var u504 = document.getElementById('u504');

var u505 = document.getElementById('u505');

var u506 = document.getElementById('u506');
gv_vAlignTable['u506'] = 'top';
var u507 = document.getElementById('u507');

var u508 = document.getElementById('u508');
gv_vAlignTable['u508'] = 'top';
var u509 = document.getElementById('u509');

var u857 = document.getElementById('u857');
gv_vAlignTable['u857'] = 'top';
var u858 = document.getElementById('u858');

var u859 = document.getElementById('u859');
gv_vAlignTable['u859'] = 'center';
var u688 = document.getElementById('u688');
gv_vAlignTable['u688'] = 'top';
var u310 = document.getElementById('u310');
gv_vAlignTable['u310'] = 'top';
var u311 = document.getElementById('u311');

var u312 = document.getElementById('u312');
gv_vAlignTable['u312'] = 'top';
var u313 = document.getElementById('u313');

var u314 = document.getElementById('u314');
gv_vAlignTable['u314'] = 'top';
var u315 = document.getElementById('u315');

var u316 = document.getElementById('u316');
gv_vAlignTable['u316'] = 'top';
var u317 = document.getElementById('u317');

var u318 = document.getElementById('u318');
gv_vAlignTable['u318'] = 'top';
var u319 = document.getElementById('u319');

var u860 = document.getElementById('u860');

var u861 = document.getElementById('u861');
gv_vAlignTable['u861'] = 'top';
var u514 = document.getElementById('u514');
gv_vAlignTable['u514'] = 'center';
var u515 = document.getElementById('u515');

u515.style.cursor = 'pointer';
if (bIE) u515.attachEvent("onclick", Clicku515);
else u515.addEventListener("click", Clicku515, true);
function Clicku515(e)
{
windowEvent = e;


if ((GetCheckState('u515')) == (true)) {

	SetPanelState('u399', 'pd1u399','none','',500,'none','',500);

}
else
if ((GetCheckState('u515')) == (false)) {

	SetPanelState('u399', 'pd0u399','none','',500,'none','',500);

}

}

var u516 = document.getElementById('u516');
gv_vAlignTable['u516'] = 'top';
var u517 = document.getElementById('u517');

var u518 = document.getElementById('u518');
gv_vAlignTable['u518'] = 'top';
var u519 = document.getElementById('u519');

var u868 = document.getElementById('u868');
gv_vAlignTable['u868'] = 'top';
var u869 = document.getElementById('u869');
gv_vAlignTable['u869'] = 'top';
var u693 = document.getElementById('u693');

var u694 = document.getElementById('u694');
gv_vAlignTable['u694'] = 'top';
var u695 = document.getElementById('u695');
gv_vAlignTable['u695'] = 'top';
var u696 = document.getElementById('u696');

var u697 = document.getElementById('u697');
gv_vAlignTable['u697'] = 'center';
var u698 = document.getElementById('u698');

var u699 = document.getElementById('u699');
gv_vAlignTable['u699'] = 'center';
var u320 = document.getElementById('u320');
gv_vAlignTable['u320'] = 'top';
var u321 = document.getElementById('u321');

var u322 = document.getElementById('u322');
gv_vAlignTable['u322'] = 'top';
var u323 = document.getElementById('u323');

var u324 = document.getElementById('u324');
gv_vAlignTable['u324'] = 'top';
var u325 = document.getElementById('u325');

var u326 = document.getElementById('u326');
gv_vAlignTable['u326'] = 'top';
var u327 = document.getElementById('u327');

var u328 = document.getElementById('u328');
gv_vAlignTable['u328'] = 'top';
var u329 = document.getElementById('u329');

var u520 = document.getElementById('u520');

var u870 = document.getElementById('u870');
gv_vAlignTable['u870'] = 'top';
var u871 = document.getElementById('u871');

u871.style.cursor = 'pointer';
if (bIE) u871.attachEvent("onclick", Clicku871);
else u871.addEventListener("click", Clicku871, true);
function Clicku871(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','','none',500);

	SetPanelState('u878', 'pd2u878','none','',500,'none','',500);

}

}

var u523 = document.getElementById('u523');
gv_vAlignTable['u523'] = 'top';
var u524 = document.getElementById('u524');
gv_vAlignTable['u524'] = 'top';
var u525 = document.getElementById('u525');
gv_vAlignTable['u525'] = 'top';
var u526 = document.getElementById('u526');

var u527 = document.getElementById('u527');

var u528 = document.getElementById('u528');

u528.style.cursor = 'pointer';
if (bIE) u528.attachEvent("onclick", Clicku528);
else u528.addEventListener("click", Clicku528, true);
function Clicku528(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u519','hidden','none',500);

	SetPanelState('u6', 'pd1u6','none','',500,'none','',500);

	SetPanelVisibility('u534','','none',500);

	SetPanelState('u539', 'pd1u539','none','',500,'none','',500);

	SetPanelState('u6', 'pd3u6','none','',500,'none','',500);
function waitu166af100ab77403ea1ef88ea2d5f22d91() {

	SetPanelVisibility('u534','hidden','none',500);

	SetPanelState('u6', 'pd0u6','none','',500,'none','',500);
}
setTimeout(waitu166af100ab77403ea1ef88ea2d5f22d91, 2000);

}

}

var u529 = document.getElementById('u529');
gv_vAlignTable['u529'] = 'bottom';
var u879 = document.getElementById('u879');
gv_vAlignTable['u879'] = 'top';
var u330 = document.getElementById('u330');
gv_vAlignTable['u330'] = 'top';
var u331 = document.getElementById('u331');

var u332 = document.getElementById('u332');
gv_vAlignTable['u332'] = 'top';
var u333 = document.getElementById('u333');

var u334 = document.getElementById('u334');
gv_vAlignTable['u334'] = 'top';
var u335 = document.getElementById('u335');

var u336 = document.getElementById('u336');
gv_vAlignTable['u336'] = 'top';
var u337 = document.getElementById('u337');

var u338 = document.getElementById('u338');
gv_vAlignTable['u338'] = 'top';
var u339 = document.getElementById('u339');

var u530 = document.getElementById('u530');

u530.style.cursor = 'pointer';
if (bIE) u530.attachEvent("onclick", Clicku530);
else u530.addEventListener("click", Clicku530, true);
function Clicku530(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u519','hidden','none',500);

	SetPanelState('u371', 'pd1u371','none','',500,'none','',500);
function waitu08a68cf65e8f42978c7ccab1d6c4091a1() {

	SetPanelState('u6', 'pd1u6','none','',500,'none','',500);

	SetPanelState('u371', 'pd2u371','none','',500,'none','',500);
function waitu66d80b15d5314957a911c9341394787b1() {

	SetPanelState('u174', 'pd2u174','none','',500,'none','',500);
function waitu5436ba76583741bd9c0b5467f03d8bbe1() {

	SetPanelState('u6', 'pd0u6','none','',500,'none','',500);

	self.location.href="Snapshot.html" + GetQuerystring();
}
setTimeout(waitu5436ba76583741bd9c0b5467f03d8bbe1, 1000);
}
setTimeout(waitu66d80b15d5314957a911c9341394787b1, 2000);
}
setTimeout(waitu08a68cf65e8f42978c7ccab1d6c4091a1, 2000);

}

}

var u880 = document.getElementById('u880');
gv_vAlignTable['u880'] = 'top';
var u881 = document.getElementById('u881');

u881.style.cursor = 'pointer';
if (bIE) u881.attachEvent("onclick", Clicku881);
else u881.addEventListener("click", Clicku881, true);
function Clicku881(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','hidden','none',500);

	SetPanelState('u555', 'pd2u555','none','',500,'none','',500);

}

}

var u882 = document.getElementById('u882');
gv_vAlignTable['u882'] = 'center';
var u883 = document.getElementById('u883');
gv_vAlignTable['u883'] = 'top';
var u534 = document.getElementById('u534');

var u535 = document.getElementById('u535');

var u536 = document.getElementById('u536');
gv_vAlignTable['u536'] = 'top';
var u537 = document.getElementById('u537');

var u538 = document.getElementById('u538');
gv_vAlignTable['u538'] = 'top';
var u539 = document.getElementById('u539');

var u340 = document.getElementById('u340');
gv_vAlignTable['u340'] = 'top';
var u341 = document.getElementById('u341');

var u342 = document.getElementById('u342');
gv_vAlignTable['u342'] = 'top';
var u343 = document.getElementById('u343');

var u344 = document.getElementById('u344');
gv_vAlignTable['u344'] = 'top';
var u345 = document.getElementById('u345');

var u346 = document.getElementById('u346');
gv_vAlignTable['u346'] = 'top';
var u347 = document.getElementById('u347');

var u348 = document.getElementById('u348');

var u349 = document.getElementById('u349');
gv_vAlignTable['u349'] = 'top';
var u701 = document.getElementById('u701');
gv_vAlignTable['u701'] = 'top';
var u702 = document.getElementById('u702');
gv_vAlignTable['u702'] = 'top';
var u540 = document.getElementById('u540');
gv_vAlignTable['u540'] = 'top';
var u704 = document.getElementById('u704');

u704.style.cursor = 'pointer';
if (bIE) u704.attachEvent("onclick", Clicku704);
else u704.addEventListener("click", Clicku704, true);
function Clicku704(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u723','','none',500);

}

}

var u700 = document.getElementById('u700');

var u706 = document.getElementById('u706');

var u707 = document.getElementById('u707');
gv_vAlignTable['u707'] = 'top';
var u544 = document.getElementById('u544');
gv_vAlignTable['u544'] = 'top';
var u545 = document.getElementById('u545');
gv_vAlignTable['u545'] = 'top';
var u546 = document.getElementById('u546');
gv_vAlignTable['u546'] = 'top';
var u547 = document.getElementById('u547');

var u548 = document.getElementById('u548');
gv_vAlignTable['u548'] = 'top';
var u549 = document.getElementById('u549');
gv_vAlignTable['u549'] = 'top';
var u350 = document.getElementById('u350');

var u351 = document.getElementById('u351');
gv_vAlignTable['u351'] = 'top';
var u352 = document.getElementById('u352');

var u353 = document.getElementById('u353');

var u354 = document.getElementById('u354');
gv_vAlignTable['u354'] = 'top';
var u355 = document.getElementById('u355');

u355.style.cursor = 'pointer';
if (bIE) u355.attachEvent("onclick", Clicku355);
else u355.addEventListener("click", Clicku355, true);
function Clicku355(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u358','','none',500);

}

}

var u356 = document.getElementById('u356');

var u357 = document.getElementById('u357');

var u358 = document.getElementById('u358');

var u359 = document.getElementById('u359');
gv_vAlignTable['u359'] = 'top';
var u711 = document.getElementById('u711');
gv_vAlignTable['u711'] = 'top';
var u712 = document.getElementById('u712');

var u584 = document.getElementById('u584');

var u550 = document.getElementById('u550');
gv_vAlignTable['u550'] = 'top';
var u715 = document.getElementById('u715');

var u716 = document.getElementById('u716');
gv_vAlignTable['u716'] = 'top';
var u710 = document.getElementById('u710');

var u554 = document.getElementById('u554');
gv_vAlignTable['u554'] = 'top';
var u719 = document.getElementById('u719');

var u555 = document.getElementById('u555');

var u556 = document.getElementById('u556');

var u557 = document.getElementById('u557');
gv_vAlignTable['u557'] = 'top';
var u260 = document.getElementById('u260');
gv_vAlignTable['u260'] = 'top';
var u559 = document.getElementById('u559');
gv_vAlignTable['u559'] = 'top';
var u718 = document.getElementById('u718');
gv_vAlignTable['u718'] = 'center';
var u360 = document.getElementById('u360');

var u361 = document.getElementById('u361');
gv_vAlignTable['u361'] = 'top';
var u362 = document.getElementById('u362');

var u363 = document.getElementById('u363');
gv_vAlignTable['u363'] = 'center';
var u364 = document.getElementById('u364');

var u365 = document.getElementById('u365');
gv_vAlignTable['u365'] = 'center';
var u366 = document.getElementById('u366');

var u367 = document.getElementById('u367');

var u368 = document.getElementById('u368');
gv_vAlignTable['u368'] = 'top';
var u369 = document.getElementById('u369');

var u721 = document.getElementById('u721');

var u722 = document.getElementById('u722');
gv_vAlignTable['u722'] = 'center';
var u723 = document.getElementById('u723');

var u724 = document.getElementById('u724');

var u725 = document.getElementById('u725');
gv_vAlignTable['u725'] = 'top';
var u726 = document.getElementById('u726');
gv_vAlignTable['u726'] = 'top';
var u727 = document.getElementById('u727');
gv_vAlignTable['u727'] = 'top';
var u728 = document.getElementById('u728');

var u867 = document.getElementById('u867');

var u565 = document.getElementById('u565');

var u566 = document.getElementById('u566');
gv_vAlignTable['u566'] = 'top';
var u567 = document.getElementById('u567');

u567.style.cursor = 'pointer';
if (bIE) u567.attachEvent("onclick", Clicku567);
else u567.addEventListener("click", Clicku567, true);
function Clicku567(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','','none',500);

}

}
gv_vAlignTable['u567'] = 'top';
var u568 = document.getElementById('u568');

u568.style.cursor = 'pointer';
if (bIE) u568.attachEvent("onclick", Clicku568);
else u568.addEventListener("click", Clicku568, true);
function Clicku568(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','hidden','none',500);

	SetPanelVisibility('u534','','none',500);

                                EnableImageWidget('u891');
	SetPanelState('u539', 'pd2u539','none','',500,'none','',500);

	SetPanelState('u6', 'pd4u6','none','',500,'none','',500);
function waitu0592662595894dbd85195446418f06161() {

	SetPanelVisibility('u534','hidden','none',500);

	SetPanelState('u6', 'pd0u6','none','',500,'none','',500);
}
setTimeout(waitu0592662595894dbd85195446418f06161, 2000);

}

}

var u569 = document.getElementById('u569');
gv_vAlignTable['u569'] = 'center';
var u729 = document.getElementById('u729');
gv_vAlignTable['u729'] = 'top';
var u370 = document.getElementById('u370');
gv_vAlignTable['u370'] = 'top';
var u371 = document.getElementById('u371');

var u372 = document.getElementById('u372');
gv_vAlignTable['u372'] = 'top';
var u373 = document.getElementById('u373');

var u374 = document.getElementById('u374');
gv_vAlignTable['u374'] = 'top';
var u375 = document.getElementById('u375');
gv_vAlignTable['u375'] = 'top';
var u376 = document.getElementById('u376');

var u377 = document.getElementById('u377');
gv_vAlignTable['u377'] = 'top';
var u378 = document.getElementById('u378');

u378.style.cursor = 'pointer';
if (bIE) u378.attachEvent("onclick", Clicku378);
else u378.addEventListener("click", Clicku378, true);
function Clicku378(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u519','','none',500);

	SetPanelState('u527', 'pd0u527','none','',500,'none','',500);

}

}

var u379 = document.getElementById('u379');
gv_vAlignTable['u379'] = 'center';
var u731 = document.getElementById('u731');
gv_vAlignTable['u731'] = 'bottom';
var u732 = document.getElementById('u732');

var u733 = document.getElementById('u733');
gv_vAlignTable['u733'] = 'top';
var u734 = document.getElementById('u734');

var u735 = document.getElementById('u735');
gv_vAlignTable['u735'] = 'top';
var u736 = document.getElementById('u736');

u736.style.cursor = 'pointer';
if (bIE) u736.attachEvent("onclick", Clicku736);
else u736.addEventListener("click", Clicku736, true);
function Clicku736(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u555','hidden','none',500);

                                EnableImageWidget('u891');
}

}

var u737 = document.getElementById('u737');
gv_vAlignTable['u737'] = 'top';
var u738 = document.getElementById('u738');

var u739 = document.getElementById('u739');
gv_vAlignTable['u739'] = 'top';
var u574 = document.getElementById('u574');
gv_vAlignTable['u574'] = 'top';
var u575 = document.getElementById('u575');

var u576 = document.getElementById('u576');
gv_vAlignTable['u576'] = 'top';
var u877 = document.getElementById('u877');
gv_vAlignTable['u877'] = 'top';
var u577 = document.getElementById('u577');

var u578 = document.getElementById('u578');

var u579 = document.getElementById('u579');
gv_vAlignTable['u579'] = 'center';
var u380 = document.getElementById('u380');

var u381 = document.getElementById('u381');
gv_vAlignTable['u381'] = 'top';
var u382 = document.getElementById('u382');

u382.style.cursor = 'pointer';
if (bIE) u382.attachEvent("onclick", Clicku382);
else u382.addEventListener("click", Clicku382, true);
function Clicku382(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u384','','none',500);

	SetPanelVisibility('u174','hidden','none',500);

}

}

var u383 = document.getElementById('u383');
gv_vAlignTable['u383'] = 'bottom';
var u384 = document.getElementById('u384');

var u385 = document.getElementById('u385');

var u386 = document.getElementById('u386');
gv_vAlignTable['u386'] = 'center';
var u387 = document.getElementById('u387');

var u388 = document.getElementById('u388');
gv_vAlignTable['u388'] = 'top';
var u389 = document.getElementById('u389');

var u741 = document.getElementById('u741');

var u742 = document.getElementById('u742');
gv_vAlignTable['u742'] = 'top';
var u743 = document.getElementById('u743');

var u744 = document.getElementById('u744');
gv_vAlignTable['u744'] = 'top';
var u745 = document.getElementById('u745');

u745.style.cursor = 'pointer';
if (bIE) u745.attachEvent("onclick", Clicku745);
else u745.addEventListener("click", Clicku745, true);
function Clicku745(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','','none',500);

}

}
gv_vAlignTable['u745'] = 'top';
var u746 = document.getElementById('u746');
gv_vAlignTable['u746'] = 'top';
var u747 = document.getElementById('u747');

var u748 = document.getElementById('u748');
gv_vAlignTable['u748'] = 'top';
var u749 = document.getElementById('u749');
gv_vAlignTable['u749'] = 'top';
var u884 = document.getElementById('u884');
gv_vAlignTable['u884'] = 'top';
var u740 = document.getElementById('u740');
gv_vAlignTable['u740'] = 'top';
var u585 = document.getElementById('u585');
gv_vAlignTable['u585'] = 'top';
var u586 = document.getElementById('u586');

var u587 = document.getElementById('u587');
gv_vAlignTable['u587'] = 'top';
var u885 = document.getElementById('u885');

u885.style.cursor = 'pointer';
if (bIE) u885.attachEvent("onclick", Clicku885);
else u885.addEventListener("click", Clicku885, true);
function Clicku885(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u875','hidden','none',500);

	SetPanelState('u555', 'pd1u555','none','',500,'none','',500);

}

}

var u588 = document.getElementById('u588');

var u589 = document.getElementById('u589');
gv_vAlignTable['u589'] = 'top';
var u888 = document.getElementById('u888');
gv_vAlignTable['u888'] = 'top';
var u200 = document.getElementById('u200');

var u201 = document.getElementById('u201');
gv_vAlignTable['u201'] = 'top';
var u202 = document.getElementById('u202');

var u390 = document.getElementById('u390');
gv_vAlignTable['u390'] = 'top';
var u391 = document.getElementById('u391');

var u392 = document.getElementById('u392');
gv_vAlignTable['u392'] = 'top';
var u393 = document.getElementById('u393');
gv_vAlignTable['u393'] = 'top';
var u207 = document.getElementById('u207');

var u395 = document.getElementById('u395');
gv_vAlignTable['u395'] = 'top';
var u209 = document.getElementById('u209');
gv_vAlignTable['u209'] = 'top';
var u397 = document.getElementById('u397');
gv_vAlignTable['u397'] = 'center';
var u398 = document.getElementById('u398');
gv_vAlignTable['u398'] = 'top';
var u399 = document.getElementById('u399');

var u751 = document.getElementById('u751');

var u752 = document.getElementById('u752');
gv_vAlignTable['u752'] = 'top';
var u753 = document.getElementById('u753');

var u754 = document.getElementById('u754');

var u755 = document.getElementById('u755');
gv_vAlignTable['u755'] = 'center';
var u756 = document.getElementById('u756');

var u757 = document.getElementById('u757');

var u758 = document.getElementById('u758');

var u759 = document.getElementById('u759');
gv_vAlignTable['u759'] = 'top';
var u592 = document.getElementById('u592');

var u593 = document.getElementById('u593');
gv_vAlignTable['u593'] = 'top';
var u594 = document.getElementById('u594');

var u750 = document.getElementById('u750');
gv_vAlignTable['u750'] = 'top';
var u596 = document.getElementById('u596');

var u210 = document.getElementById('u210');

var u211 = document.getElementById('u211');

var u212 = document.getElementById('u212');

var u213 = document.getElementById('u213');
gv_vAlignTable['u213'] = 'top';
var u214 = document.getElementById('u214');

var u215 = document.getElementById('u215');
gv_vAlignTable['u215'] = 'top';
var u216 = document.getElementById('u216');

var u217 = document.getElementById('u217');
gv_vAlignTable['u217'] = 'top';
var u218 = document.getElementById('u218');

var u219 = document.getElementById('u219');
gv_vAlignTable['u219'] = 'top';
var u760 = document.getElementById('u760');

var u761 = document.getElementById('u761');
gv_vAlignTable['u761'] = 'top';
var u762 = document.getElementById('u762');

var u763 = document.getElementById('u763');
gv_vAlignTable['u763'] = 'top';
var u764 = document.getElementById('u764');

var u765 = document.getElementById('u765');
gv_vAlignTable['u765'] = 'top';
var u766 = document.getElementById('u766');

var u767 = document.getElementById('u767');
gv_vAlignTable['u767'] = 'top';
var u768 = document.getElementById('u768');

var u769 = document.getElementById('u769');
gv_vAlignTable['u769'] = 'top';
var u220 = document.getElementById('u220');

var u221 = document.getElementById('u221');
gv_vAlignTable['u221'] = 'top';
var u222 = document.getElementById('u222');

var u223 = document.getElementById('u223');
gv_vAlignTable['u223'] = 'top';
var u224 = document.getElementById('u224');

var u225 = document.getElementById('u225');
gv_vAlignTable['u225'] = 'top';
var u226 = document.getElementById('u226');

var u227 = document.getElementById('u227');
gv_vAlignTable['u227'] = 'top';
var u228 = document.getElementById('u228');

var u229 = document.getElementById('u229');
gv_vAlignTable['u229'] = 'top';
var u770 = document.getElementById('u770');

var u771 = document.getElementById('u771');
gv_vAlignTable['u771'] = 'top';
var u772 = document.getElementById('u772');

var u773 = document.getElementById('u773');
gv_vAlignTable['u773'] = 'top';
var u774 = document.getElementById('u774');

var u775 = document.getElementById('u775');
gv_vAlignTable['u775'] = 'top';
var u776 = document.getElementById('u776');

var u777 = document.getElementById('u777');
gv_vAlignTable['u777'] = 'top';
var u778 = document.getElementById('u778');

u778.style.cursor = 'pointer';
if (bIE) u778.attachEvent("onclick", Clicku778);
else u778.addEventListener("click", Clicku778, true);
function Clicku778(e)
{
windowEvent = e;


if ((GetCheckState('u778')) == (false)) {

	var obj1 = document.getElementById("u782");
    obj1.disabled = true;

}
else
if ((GetCheckState('u778')) == (true)) {

	var obj1 = document.getElementById("u782");
    obj1.disabled = false;

}

}

var u779 = document.getElementById('u779');
gv_vAlignTable['u779'] = 'top';
var u230 = document.getElementById('u230');

var u231 = document.getElementById('u231');
gv_vAlignTable['u231'] = 'top';
var u232 = document.getElementById('u232');

var u233 = document.getElementById('u233');
gv_vAlignTable['u233'] = 'top';
var u234 = document.getElementById('u234');

var u235 = document.getElementById('u235');
gv_vAlignTable['u235'] = 'top';
var u236 = document.getElementById('u236');

var u237 = document.getElementById('u237');
gv_vAlignTable['u237'] = 'top';
var u238 = document.getElementById('u238');

var u239 = document.getElementById('u239');
gv_vAlignTable['u239'] = 'top';
var u780 = document.getElementById('u780');

var u781 = document.getElementById('u781');
gv_vAlignTable['u781'] = 'top';
var u782 = document.getElementById('u782');

var u783 = document.getElementById('u783');

var u784 = document.getElementById('u784');
gv_vAlignTable['u784'] = 'top';
var u785 = document.getElementById('u785');

var u786 = document.getElementById('u786');
gv_vAlignTable['u786'] = 'top';
var u787 = document.getElementById('u787');

var u788 = document.getElementById('u788');

var u789 = document.getElementById('u789');
gv_vAlignTable['u789'] = 'top';
var u240 = document.getElementById('u240');

var u241 = document.getElementById('u241');
gv_vAlignTable['u241'] = 'top';
var u242 = document.getElementById('u242');

var u243 = document.getElementById('u243');
gv_vAlignTable['u243'] = 'top';
var u244 = document.getElementById('u244');

var u245 = document.getElementById('u245');
gv_vAlignTable['u245'] = 'top';
var u246 = document.getElementById('u246');

var u247 = document.getElementById('u247');
gv_vAlignTable['u247'] = 'top';
var u248 = document.getElementById('u248');

var u249 = document.getElementById('u249');
gv_vAlignTable['u249'] = 'top';
var u601 = document.getElementById('u601');
gv_vAlignTable['u601'] = 'top';
var u602 = document.getElementById('u602');

var u790 = document.getElementById('u790');

var u791 = document.getElementById('u791');

var u792 = document.getElementById('u792');

var u793 = document.getElementById('u793');

var u794 = document.getElementById('u794');
gv_vAlignTable['u794'] = 'center';
var u795 = document.getElementById('u795');

var u796 = document.getElementById('u796');
gv_vAlignTable['u796'] = 'center';
var u797 = document.getElementById('u797');

var u798 = document.getElementById('u798');

var u799 = document.getElementById('u799');

var u250 = document.getElementById('u250');

var u251 = document.getElementById('u251');
gv_vAlignTable['u251'] = 'top';
var u252 = document.getElementById('u252');

var u253 = document.getElementById('u253');
gv_vAlignTable['u253'] = 'top';
var u254 = document.getElementById('u254');

var u255 = document.getElementById('u255');
gv_vAlignTable['u255'] = 'top';
var u256 = document.getElementById('u256');

var u257 = document.getElementById('u257');

var u258 = document.getElementById('u258');
gv_vAlignTable['u258'] = 'top';
var u259 = document.getElementById('u259');

var u611 = document.getElementById('u611');
gv_vAlignTable['u611'] = 'top';
var u612 = document.getElementById('u612');

var u613 = document.getElementById('u613');
gv_vAlignTable['u613'] = 'top';
var u614 = document.getElementById('u614');

var u615 = document.getElementById('u615');
gv_vAlignTable['u615'] = 'top';
var u616 = document.getElementById('u616');

var u617 = document.getElementById('u617');
gv_vAlignTable['u617'] = 'top';
var u618 = document.getElementById('u618');

var u619 = document.getElementById('u619');
gv_vAlignTable['u619'] = 'top';
var u630 = document.getElementById('u630');
gv_vAlignTable['u630'] = 'top';
var u0 = document.getElementById('u0');

var u1 = document.getElementById('u1');
gv_vAlignTable['u1'] = 'top';
var u2 = document.getElementById('u2');
gv_vAlignTable['u2'] = 'top';
var u3 = document.getElementById('u3');

var u4 = document.getElementById('u4');
gv_vAlignTable['u4'] = 'top';
var u5 = document.getElementById('u5');

var u6 = document.getElementById('u6');

var u7 = document.getElementById('u7');

var u8 = document.getElementById('u8');

var u9 = document.getElementById('u9');
gv_vAlignTable['u9'] = 'top';
var u261 = document.getElementById('u261');

var u262 = document.getElementById('u262');

var u263 = document.getElementById('u263');
gv_vAlignTable['u263'] = 'top';
var u264 = document.getElementById('u264');

u264.style.cursor = 'pointer';
if (bIE) u264.attachEvent("onclick", Clicku264);
else u264.addEventListener("click", Clicku264, true);
function Clicku264(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u267','','none',500);

}

}

var u265 = document.getElementById('u265');

var u266 = document.getElementById('u266');

var u267 = document.getElementById('u267');

var u268 = document.getElementById('u268');
gv_vAlignTable['u268'] = 'top';
var u269 = document.getElementById('u269');

var u621 = document.getElementById('u621');
gv_vAlignTable['u621'] = 'top';
var u622 = document.getElementById('u622');

var u623 = document.getElementById('u623');
gv_vAlignTable['u623'] = 'top';
var u624 = document.getElementById('u624');

var u625 = document.getElementById('u625');
gv_vAlignTable['u625'] = 'top';
var u626 = document.getElementById('u626');

var u627 = document.getElementById('u627');

var u628 = document.getElementById('u628');
gv_vAlignTable['u628'] = 'top';
var u629 = document.getElementById('u629');

var u640 = document.getElementById('u640');

if (window.OnLoad) OnLoad();
