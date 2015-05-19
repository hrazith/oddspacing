
var PageName = 'Export (NoviceMode)';
var PageId = 'f5bd55f9457d4693af132877a06a7041'
var PageUrl = 'Export__NoviceMode_.html'
document.title = 'Export (NoviceMode)';
var PageNotes = 
{
"pageName":"Export (NoviceMode)",
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

var u70 = document.getElementById('u70');
gv_vAlignTable['u70'] = 'top';
var u71 = document.getElementById('u71');

var u100 = document.getElementById('u100');
gv_vAlignTable['u100'] = 'top';
var u101 = document.getElementById('u101');

u101.style.cursor = 'pointer';
if (bIE) u101.attachEvent("onclick", Clicku101);
else u101.addEventListener("click", Clicku101, true);
function Clicku101(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u250 = document.getElementById('u250');
gv_vAlignTable['u250'] = 'top';
var u251 = document.getElementById('u251');

var u252 = document.getElementById('u252');
gv_vAlignTable['u252'] = 'top';
var u253 = document.getElementById('u253');

var u254 = document.getElementById('u254');
gv_vAlignTable['u254'] = 'top';
var u255 = document.getElementById('u255');

var u256 = document.getElementById('u256');
gv_vAlignTable['u256'] = 'top';
var u257 = document.getElementById('u257');

var u258 = document.getElementById('u258');
gv_vAlignTable['u258'] = 'top';
var u259 = document.getElementById('u259');

u259.style.cursor = 'pointer';
if (bIE) u259.attachEvent("onclick", Clicku259);
else u259.addEventListener("click", Clicku259, true);
function Clicku259(e)
{
windowEvent = e;


if (true) {

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u80 = document.getElementById('u80');

var u81 = document.getElementById('u81');
gv_vAlignTable['u81'] = 'center';
var u110 = document.getElementById('u110');
gv_vAlignTable['u110'] = 'center';
var u111 = document.getElementById('u111');

var u260 = document.getElementById('u260');
gv_vAlignTable['u260'] = 'center';
var u261 = document.getElementById('u261');

u261.style.cursor = 'pointer';
if (bIE) u261.attachEvent("onclick", Clicku261);
else u261.addEventListener("click", Clicku261, true);
function Clicku261(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u262 = document.getElementById('u262');
gv_vAlignTable['u262'] = 'center';
var u115 = document.getElementById('u115');
gv_vAlignTable['u115'] = 'top';
var u116 = document.getElementById('u116');

var u117 = document.getElementById('u117');
gv_vAlignTable['u117'] = 'top';
var u118 = document.getElementById('u118');

var u119 = document.getElementById('u119');
gv_vAlignTable['u119'] = 'top';
var u268 = document.getElementById('u268');

var u269 = document.getElementById('u269');
gv_vAlignTable['u269'] = 'top';
var u183 = document.getElementById('u183');

var u90 = document.getElementById('u90');
gv_vAlignTable['u90'] = 'top';
var u91 = document.getElementById('u91');

var u120 = document.getElementById('u120');

var u121 = document.getElementById('u121');
gv_vAlignTable['u121'] = 'top';
var u270 = document.getElementById('u270');

var u271 = document.getElementById('u271');
gv_vAlignTable['u271'] = 'top';
var u272 = document.getElementById('u272');
gv_vAlignTable['u272'] = 'top';
var u273 = document.getElementById('u273');

u273.style.cursor = 'pointer';
if (bIE) u273.attachEvent("onclick", Clicku273);
else u273.addEventListener("click", Clicku273, true);
function Clicku273(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u302','','none',500);

}

}

var u274 = document.getElementById('u274');

u274.style.cursor = 'pointer';
if (bIE) u274.attachEvent("onclick", Clicku274);
else u274.addEventListener("click", Clicku274, true);
function Clicku274(e)
{
windowEvent = e;


if (true) {

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u275 = document.getElementById('u275');
gv_vAlignTable['u275'] = 'center';
var u276 = document.getElementById('u276');

u276.style.cursor = 'pointer';
if (bIE) u276.attachEvent("onclick", Clicku276);
else u276.addEventListener("click", Clicku276, true);
function Clicku276(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u277 = document.getElementById('u277');
gv_vAlignTable['u277'] = 'center';
var u278 = document.getElementById('u278');

u278.style.cursor = 'pointer';
if (bIE) u278.attachEvent("onclick", Clicku278);
else u278.addEventListener("click", Clicku278, true);
function Clicku278(e)
{
windowEvent = e;


if ((GetCheckState('u280')) == (true)) {

	SetPanelState('u10', 'pd2u10','none','',500,'none','',500);

}
else
if ((GetCheckState('u280')) == (false)) {

	SetPanelState('u10', 'pd3u10','none','',500,'none','',500);

}

}

var u279 = document.getElementById('u279');
gv_vAlignTable['u279'] = 'center';
var u24 = document.getElementById('u24');
gv_vAlignTable['u24'] = 'top';
var u25 = document.getElementById('u25');

var u26 = document.getElementById('u26');
gv_vAlignTable['u26'] = 'top';
var u27 = document.getElementById('u27');

var u28 = document.getElementById('u28');
gv_vAlignTable['u28'] = 'top';
var u29 = document.getElementById('u29');

var u130 = document.getElementById('u130');
gv_vAlignTable['u130'] = 'center';
var u131 = document.getElementById('u131');

var u280 = document.getElementById('u280');

var u281 = document.getElementById('u281');
gv_vAlignTable['u281'] = 'top';
var u282 = document.getElementById('u282');
gv_vAlignTable['u282'] = 'top';
var u283 = document.getElementById('u283');

var u284 = document.getElementById('u284');
gv_vAlignTable['u284'] = 'top';
var u285 = document.getElementById('u285');
gv_vAlignTable['u285'] = 'top';
var u286 = document.getElementById('u286');
gv_vAlignTable['u286'] = 'top';
var u287 = document.getElementById('u287');

var u288 = document.getElementById('u288');
gv_vAlignTable['u288'] = 'top';
var u289 = document.getElementById('u289');

var u31 = document.getElementById('u31');

var u34 = document.getElementById('u34');
gv_vAlignTable['u34'] = 'top';
var u35 = document.getElementById('u35');

var u36 = document.getElementById('u36');
gv_vAlignTable['u36'] = 'top';
var u37 = document.getElementById('u37');

var u38 = document.getElementById('u38');
gv_vAlignTable['u38'] = 'center';
var u39 = document.getElementById('u39');

u39.style.cursor = 'pointer';
if (bIE) u39.attachEvent("onclick", Clicku39);
else u39.addEventListener("click", Clicku39, true);
function Clicku39(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u303 = document.getElementById('u303');

u303.style.cursor = 'pointer';
if (bIE) u303.attachEvent("onclick", Clicku303);
else u303.addEventListener("click", Clicku303, true);
function Clicku303(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u302','hidden','none',500);

	SetPanelState('u270', 'pd1u270','none','',500,'none','',500);

                                EnableImageWidget('u278');
}

}

var u304 = document.getElementById('u304');
gv_vAlignTable['u304'] = 'top';
var u305 = document.getElementById('u305');
gv_vAlignTable['u305'] = 'top';
var u306 = document.getElementById('u306');
gv_vAlignTable['u306'] = 'top';
var u140 = document.getElementById('u140');

var u141 = document.getElementById('u141');
gv_vAlignTable['u141'] = 'top';
var u290 = document.getElementById('u290');
gv_vAlignTable['u290'] = 'top';
var u291 = document.getElementById('u291');

var u292 = document.getElementById('u292');
gv_vAlignTable['u292'] = 'top';
var u293 = document.getElementById('u293');

var u294 = document.getElementById('u294');
gv_vAlignTable['u294'] = 'top';
var u295 = document.getElementById('u295');

var u296 = document.getElementById('u296');
gv_vAlignTable['u296'] = 'top';
var u297 = document.getElementById('u297');

u297.style.cursor = 'pointer';
if (bIE) u297.attachEvent("onclick", Clicku297);
else u297.addEventListener("click", Clicku297, true);
function Clicku297(e)
{
windowEvent = e;


if (true) {

	SetPanelState('u10', 'pd1u10','none','',500,'none','',500);

                                DisableImageWidget('u278');
}

}

var u298 = document.getElementById('u298');
gv_vAlignTable['u298'] = 'center';
var u299 = document.getElementById('u299');

u299.style.cursor = 'pointer';
if (bIE) u299.attachEvent("onclick", Clicku299);
else u299.addEventListener("click", Clicku299, true);
function Clicku299(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u40 = document.getElementById('u40');
gv_vAlignTable['u40'] = 'center';
var u30 = document.getElementById('u30');
gv_vAlignTable['u30'] = 'top';
var u45 = document.getElementById('u45');
gv_vAlignTable['u45'] = 'top';
var u46 = document.getElementById('u46');

var u47 = document.getElementById('u47');
gv_vAlignTable['u47'] = 'top';
var u48 = document.getElementById('u48');

var u49 = document.getElementById('u49');
gv_vAlignTable['u49'] = 'top';
var u313 = document.getElementById('u313');

var u314 = document.getElementById('u314');
gv_vAlignTable['u314'] = 'top';
var u315 = document.getElementById('u315');

u315.style.cursor = 'pointer';
if (bIE) u315.attachEvent("onclick", Clicku315);
else u315.addEventListener("click", Clicku315, true);
function Clicku315(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u307','hidden','none',500);

	SetPanelState('u10', 'pd4u10','none','',500,'none','',500);
function waitu6c7ea453df324e91ab7e2d92aaeec47c1() {

	SetPanelState('u10', 'pd6u10','none','',500,'none','',500);
function waitu8a2801734dce4a0991f9c61e35021c101() {

	SetPanelState('u10', 'pd7u10','none','',500,'none','',500);
function waitu76be5d24e685480496efeab292107aa61() {

	SetPanelState('u10', 'pd9u10','none','',500,'none','',500);
function waitud14413cf759e4ab5b4783c53beb203de1() {

	SetPanelState('u10', 'pd11u10','none','',500,'none','',500);
function waitue2daee47e68b43919022efb39ee96cda1() {

	SetPanelState('u10', 'pd12u10','none','',500,'none','',500);
}
setTimeout(waitue2daee47e68b43919022efb39ee96cda1, 500);
}
setTimeout(waitud14413cf759e4ab5b4783c53beb203de1, 1000);
}
setTimeout(waitu76be5d24e685480496efeab292107aa61, 1000);
}
setTimeout(waitu8a2801734dce4a0991f9c61e35021c101, 1000);
}
setTimeout(waitu6c7ea453df324e91ab7e2d92aaeec47c1, 1000);

}

}

var u316 = document.getElementById('u316');
gv_vAlignTable['u316'] = 'bottom';
var u150 = document.getElementById('u150');

var u151 = document.getElementById('u151');
gv_vAlignTable['u151'] = 'center';
var u152 = document.getElementById('u152');

var u153 = document.getElementById('u153');
gv_vAlignTable['u153'] = 'center';
var u154 = document.getElementById('u154');

var u155 = document.getElementById('u155');
gv_vAlignTable['u155'] = 'center';
var u156 = document.getElementById('u156');

var u157 = document.getElementById('u157');
gv_vAlignTable['u157'] = 'top';
var u158 = document.getElementById('u158');

var u159 = document.getElementById('u159');
gv_vAlignTable['u159'] = 'center';
var u50 = document.getElementById('u50');

var u51 = document.getElementById('u51');
gv_vAlignTable['u51'] = 'top';
var u54 = document.getElementById('u54');

var u55 = document.getElementById('u55');
gv_vAlignTable['u55'] = 'top';
var u56 = document.getElementById('u56');

u56.style.cursor = 'pointer';
if (bIE) u56.attachEvent("onclick", Clicku56);
else u56.addEventListener("click", Clicku56, true);
function Clicku56(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u57 = document.getElementById('u57');
gv_vAlignTable['u57'] = 'center';
var u58 = document.getElementById('u58');

var u59 = document.getElementById('u59');
gv_vAlignTable['u59'] = 'center';
var u160 = document.getElementById('u160');

var u161 = document.getElementById('u161');
gv_vAlignTable['u161'] = 'top';
var u162 = document.getElementById('u162');
gv_vAlignTable['u162'] = 'top';
var u163 = document.getElementById('u163');

var u164 = document.getElementById('u164');
gv_vAlignTable['u164'] = 'top';
var u165 = document.getElementById('u165');

var u166 = document.getElementById('u166');
gv_vAlignTable['u166'] = 'top';
var u167 = document.getElementById('u167');

var u168 = document.getElementById('u168');
gv_vAlignTable['u168'] = 'top';
var u169 = document.getElementById('u169');

var u64 = document.getElementById('u64');

var u65 = document.getElementById('u65');
gv_vAlignTable['u65'] = 'center';
var u66 = document.getElementById('u66');

var u67 = document.getElementById('u67');
gv_vAlignTable['u67'] = 'center';
var u68 = document.getElementById('u68');
gv_vAlignTable['u68'] = 'top';
var u69 = document.getElementById('u69');

var u170 = document.getElementById('u170');
gv_vAlignTable['u170'] = 'top';
var u171 = document.getElementById('u171');

u171.style.cursor = 'pointer';
if (bIE) u171.attachEvent("onclick", Clicku171);
else u171.addEventListener("click", Clicku171, true);
function Clicku171(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u172 = document.getElementById('u172');
gv_vAlignTable['u172'] = 'center';
var u173 = document.getElementById('u173');

var u174 = document.getElementById('u174');
gv_vAlignTable['u174'] = 'center';
var u175 = document.getElementById('u175');

var u176 = document.getElementById('u176');
gv_vAlignTable['u176'] = 'center';
var u177 = document.getElementById('u177');

var u178 = document.getElementById('u178');
gv_vAlignTable['u178'] = 'top';
var u179 = document.getElementById('u179');

var u127 = document.getElementById('u127');

var u128 = document.getElementById('u128');
gv_vAlignTable['u128'] = 'center';
var u129 = document.getElementById('u129');

var u72 = document.getElementById('u72');
gv_vAlignTable['u72'] = 'top';
var u73 = document.getElementById('u73');

var u74 = document.getElementById('u74');
gv_vAlignTable['u74'] = 'top';
var u75 = document.getElementById('u75');

u75.style.cursor = 'pointer';
if (bIE) u75.attachEvent("onclick", Clicku75);
else u75.addEventListener("click", Clicku75, true);
function Clicku75(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u76 = document.getElementById('u76');
gv_vAlignTable['u76'] = 'center';
var u77 = document.getElementById('u77');

var u78 = document.getElementById('u78');
gv_vAlignTable['u78'] = 'center';
var u79 = document.getElementById('u79');
gv_vAlignTable['u79'] = 'top';
var u180 = document.getElementById('u180');
gv_vAlignTable['u180'] = 'center';
var u181 = document.getElementById('u181');

var u182 = document.getElementById('u182');
gv_vAlignTable['u182'] = 'center';
var u300 = document.getElementById('u300');
gv_vAlignTable['u300'] = 'center';
var u184 = document.getElementById('u184');
gv_vAlignTable['u184'] = 'center';
var u185 = document.getElementById('u185');
gv_vAlignTable['u185'] = 'top';
var u186 = document.getElementById('u186');

var u187 = document.getElementById('u187');
gv_vAlignTable['u187'] = 'top';
var u188 = document.getElementById('u188');

var u189 = document.getElementById('u189');
gv_vAlignTable['u189'] = 'top';
var u307 = document.getElementById('u307');

var u308 = document.getElementById('u308');

var u309 = document.getElementById('u309');
gv_vAlignTable['u309'] = 'top';
var u82 = document.getElementById('u82');

var u83 = document.getElementById('u83');
gv_vAlignTable['u83'] = 'center';
var u84 = document.getElementById('u84');

var u85 = document.getElementById('u85');
gv_vAlignTable['u85'] = 'center';
var u86 = document.getElementById('u86');

var u87 = document.getElementById('u87');
gv_vAlignTable['u87'] = 'top';
var u88 = document.getElementById('u88');

var u89 = document.getElementById('u89');
gv_vAlignTable['u89'] = 'center';
var u190 = document.getElementById('u190');

var u191 = document.getElementById('u191');
gv_vAlignTable['u191'] = 'top';
var u192 = document.getElementById('u192');

u192.style.cursor = 'pointer';
if (bIE) u192.attachEvent("onclick", Clicku192);
else u192.addEventListener("click", Clicku192, true);
function Clicku192(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u193 = document.getElementById('u193');
gv_vAlignTable['u193'] = 'center';
var u194 = document.getElementById('u194');

var u195 = document.getElementById('u195');
gv_vAlignTable['u195'] = 'center';
var u196 = document.getElementById('u196');
gv_vAlignTable['u196'] = 'top';
var u197 = document.getElementById('u197');

var u198 = document.getElementById('u198');
gv_vAlignTable['u198'] = 'center';
var u199 = document.getElementById('u199');

var u317 = document.getElementById('u317');

var u318 = document.getElementById('u318');

var u319 = document.getElementById('u319');
gv_vAlignTable['u319'] = 'top';
var u92 = document.getElementById('u92');
gv_vAlignTable['u92'] = 'top';
var u93 = document.getElementById('u93');

var u94 = document.getElementById('u94');
gv_vAlignTable['u94'] = 'top';
var u95 = document.getElementById('u95');

var u96 = document.getElementById('u96');
gv_vAlignTable['u96'] = 'top';
var u97 = document.getElementById('u97');

var u98 = document.getElementById('u98');
gv_vAlignTable['u98'] = 'top';
var u99 = document.getElementById('u99');

var u320 = document.getElementById('u320');
gv_vAlignTable['u320'] = 'top';
var u321 = document.getElementById('u321');
gv_vAlignTable['u321'] = 'top';
var u322 = document.getElementById('u322');

var u323 = document.getElementById('u323');

var u324 = document.getElementById('u324');
gv_vAlignTable['u324'] = 'top';
var u325 = document.getElementById('u325');

u325.style.cursor = 'pointer';
if (bIE) u325.attachEvent("onclick", Clicku325);
else u325.addEventListener("click", Clicku325, true);
function Clicku325(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u317','hidden','none',500);

	SetPanelState('u10', 'pd5u10','none','',500,'none','',500);
function waitu4fecec0545ce45bd94a35dc2593564af1() {

	SetPanelState('u10', 'pd10u10','none','',500,'none','',500);
function waituce096f10c8a448b48baba5ea875edd8a1() {

	SetPanelState('u10', 'pd8u10','none','',500,'none','',500);
function waitu32d68fdaa1d94998b2454a3543f82ffb1() {

	SetPanelState('u10', 'pd13u10','none','',500,'none','',500);
}
setTimeout(waitu32d68fdaa1d94998b2454a3543f82ffb1, 1000);
}
setTimeout(waituce096f10c8a448b48baba5ea875edd8a1, 1000);
}
setTimeout(waitu4fecec0545ce45bd94a35dc2593564af1, 1000);

}

}

var u326 = document.getElementById('u326');
gv_vAlignTable['u326'] = 'bottom';
var u0 = document.getElementById('u0');

var u1 = document.getElementById('u1');
gv_vAlignTable['u1'] = 'top';
var u2 = document.getElementById('u2');

u2.style.cursor = 'pointer';
if (bIE) u2.attachEvent("onclick", Clicku2);
else u2.addEventListener("click", Clicku2, true);
function Clicku2(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','','none',500);

}

}

var u3 = document.getElementById('u3');
gv_vAlignTable['u3'] = 'center';
var u4 = document.getElementById('u4');

var u5 = document.getElementById('u5');

var u6 = document.getElementById('u6');
gv_vAlignTable['u6'] = 'top';
var u7 = document.getElementById('u7');

var u8 = document.getElementById('u8');
gv_vAlignTable['u8'] = 'top';
var u9 = document.getElementById('u9');

var u102 = document.getElementById('u102');
gv_vAlignTable['u102'] = 'center';
var u103 = document.getElementById('u103');

var u104 = document.getElementById('u104');
gv_vAlignTable['u104'] = 'center';
var u105 = document.getElementById('u105');

var u106 = document.getElementById('u106');
gv_vAlignTable['u106'] = 'center';
var u107 = document.getElementById('u107');

var u108 = document.getElementById('u108');
gv_vAlignTable['u108'] = 'top';
var u109 = document.getElementById('u109');

var u10 = document.getElementById('u10');

var u11 = document.getElementById('u11');
gv_vAlignTable['u11'] = 'top';
var u44 = document.getElementById('u44');

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
gv_vAlignTable['u19'] = 'center';
var u301 = document.getElementById('u301');

var u302 = document.getElementById('u302');

var u112 = document.getElementById('u112');
gv_vAlignTable['u112'] = 'center';
var u113 = document.getElementById('u113');

var u114 = document.getElementById('u114');
gv_vAlignTable['u114'] = 'center';
var u12 = document.getElementById('u12');

var u20 = document.getElementById('u20');

u20.style.cursor = 'pointer';
if (bIE) u20.attachEvent("onclick", Clicku20);
else u20.addEventListener("click", Clicku20, true);
function Clicku20(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u21 = document.getElementById('u21');
gv_vAlignTable['u21'] = 'center';
var u22 = document.getElementById('u22');

var u23 = document.getElementById('u23');
gv_vAlignTable['u23'] = 'top';
var u200 = document.getElementById('u200');
gv_vAlignTable['u200'] = 'center';
var u201 = document.getElementById('u201');

var u202 = document.getElementById('u202');
gv_vAlignTable['u202'] = 'center';
var u203 = document.getElementById('u203');

var u204 = document.getElementById('u204');
gv_vAlignTable['u204'] = 'top';
var u205 = document.getElementById('u205');

var u206 = document.getElementById('u206');
gv_vAlignTable['u206'] = 'center';
var u207 = document.getElementById('u207');
gv_vAlignTable['u207'] = 'top';
var u208 = document.getElementById('u208');

var u209 = document.getElementById('u209');
gv_vAlignTable['u209'] = 'top';
var u310 = document.getElementById('u310');
gv_vAlignTable['u310'] = 'top';
var u311 = document.getElementById('u311');
gv_vAlignTable['u311'] = 'top';
var u312 = document.getElementById('u312');

var u122 = document.getElementById('u122');

u122.style.cursor = 'pointer';
if (bIE) u122.attachEvent("onclick", Clicku122);
else u122.addEventListener("click", Clicku122, true);
function Clicku122(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u123 = document.getElementById('u123');
gv_vAlignTable['u123'] = 'center';
var u124 = document.getElementById('u124');

var u125 = document.getElementById('u125');
gv_vAlignTable['u125'] = 'center';
var u126 = document.getElementById('u126');
gv_vAlignTable['u126'] = 'top';
var u263 = document.getElementById('u263');

u263.style.cursor = 'pointer';
if (bIE) u263.attachEvent("onclick", Clicku263);
else u263.addEventListener("click", Clicku263, true);
function Clicku263(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u307','','none',500);

}

}

var u264 = document.getElementById('u264');
gv_vAlignTable['u264'] = 'center';
var u265 = document.getElementById('u265');

var u266 = document.getElementById('u266');
gv_vAlignTable['u266'] = 'center';
var u267 = document.getElementById('u267');
gv_vAlignTable['u267'] = 'top';
var u32 = document.getElementById('u32');
gv_vAlignTable['u32'] = 'top';
var u33 = document.getElementById('u33');

var u210 = document.getElementById('u210');

var u211 = document.getElementById('u211');
gv_vAlignTable['u211'] = 'top';
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

u218.style.cursor = 'pointer';
if (bIE) u218.attachEvent("onclick", Clicku218);
else u218.addEventListener("click", Clicku218, true);
function Clicku218(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u219 = document.getElementById('u219');
gv_vAlignTable['u219'] = 'center';
var u132 = document.getElementById('u132');
gv_vAlignTable['u132'] = 'center';
var u133 = document.getElementById('u133');

var u134 = document.getElementById('u134');
gv_vAlignTable['u134'] = 'top';
var u135 = document.getElementById('u135');
gv_vAlignTable['u135'] = 'top';
var u136 = document.getElementById('u136');

var u137 = document.getElementById('u137');
gv_vAlignTable['u137'] = 'top';
var u138 = document.getElementById('u138');

var u139 = document.getElementById('u139');
gv_vAlignTable['u139'] = 'top';
var u41 = document.getElementById('u41');

var u42 = document.getElementById('u42');
gv_vAlignTable['u42'] = 'top';
var u43 = document.getElementById('u43');
gv_vAlignTable['u43'] = 'top';
var u220 = document.getElementById('u220');

var u221 = document.getElementById('u221');
gv_vAlignTable['u221'] = 'center';
var u222 = document.getElementById('u222');

var u223 = document.getElementById('u223');
gv_vAlignTable['u223'] = 'center';
var u224 = document.getElementById('u224');

var u225 = document.getElementById('u225');
gv_vAlignTable['u225'] = 'top';
var u226 = document.getElementById('u226');

var u227 = document.getElementById('u227');
gv_vAlignTable['u227'] = 'center';
var u228 = document.getElementById('u228');

var u229 = document.getElementById('u229');
gv_vAlignTable['u229'] = 'center';
var u142 = document.getElementById('u142');

var u143 = document.getElementById('u143');
gv_vAlignTable['u143'] = 'top';
var u144 = document.getElementById('u144');

var u145 = document.getElementById('u145');
gv_vAlignTable['u145'] = 'top';
var u146 = document.getElementById('u146');

u146.style.cursor = 'pointer';
if (bIE) u146.attachEvent("onclick", Clicku146);
else u146.addEventListener("click", Clicku146, true);
function Clicku146(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u147 = document.getElementById('u147');
gv_vAlignTable['u147'] = 'center';
var u148 = document.getElementById('u148');

var u149 = document.getElementById('u149');
gv_vAlignTable['u149'] = 'center';
var u52 = document.getElementById('u52');

var u53 = document.getElementById('u53');
gv_vAlignTable['u53'] = 'top';
var u230 = document.getElementById('u230');

var u231 = document.getElementById('u231');
gv_vAlignTable['u231'] = 'center';
var u232 = document.getElementById('u232');
gv_vAlignTable['u232'] = 'top';
var u233 = document.getElementById('u233');

var u234 = document.getElementById('u234');
gv_vAlignTable['u234'] = 'top';
var u235 = document.getElementById('u235');

var u236 = document.getElementById('u236');
gv_vAlignTable['u236'] = 'top';
var u237 = document.getElementById('u237');

var u238 = document.getElementById('u238');
gv_vAlignTable['u238'] = 'top';
var u239 = document.getElementById('u239');

u239.style.cursor = 'pointer';
if (bIE) u239.attachEvent("onclick", Clicku239);
else u239.addEventListener("click", Clicku239, true);
function Clicku239(e)
{
windowEvent = e;


if (true) {

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u60 = document.getElementById('u60');

var u61 = document.getElementById('u61');
gv_vAlignTable['u61'] = 'center';
var u62 = document.getElementById('u62');

var u63 = document.getElementById('u63');
gv_vAlignTable['u63'] = 'top';
var u240 = document.getElementById('u240');
gv_vAlignTable['u240'] = 'center';
var u241 = document.getElementById('u241');

u241.style.cursor = 'pointer';
if (bIE) u241.attachEvent("onclick", Clicku241);
else u241.addEventListener("click", Clicku241, true);
function Clicku241(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u4','hidden','none',500);

	SetPanelState('u270', 'pd0u270','none','',500,'none','',500);

	SetPanelState('u10', 'pd0u10','none','',500,'none','',500);

}

}

var u242 = document.getElementById('u242');
gv_vAlignTable['u242'] = 'center';
var u243 = document.getElementById('u243');

u243.style.cursor = 'pointer';
if (bIE) u243.attachEvent("onclick", Clicku243);
else u243.addEventListener("click", Clicku243, true);
function Clicku243(e)
{
windowEvent = e;


if (true) {

	SetPanelVisibility('u317','','none',500);

}

}

var u244 = document.getElementById('u244');
gv_vAlignTable['u244'] = 'center';
var u245 = document.getElementById('u245');
gv_vAlignTable['u245'] = 'top';
var u246 = document.getElementById('u246');

var u247 = document.getElementById('u247');
gv_vAlignTable['u247'] = 'center';
var u248 = document.getElementById('u248');
gv_vAlignTable['u248'] = 'top';
var u249 = document.getElementById('u249');

if (window.OnLoad) OnLoad();
