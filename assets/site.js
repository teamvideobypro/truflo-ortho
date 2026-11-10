(function(){
document.documentElement.classList.add('js');

/* mobile menu */
var b=document.querySelector('.burger'),m=document.querySelector('.mnav');
if(b&&m){
  b.addEventListener('click',function(){
    m.classList.toggle('open');
    b.setAttribute('aria-expanded',m.classList.contains('open'));
  });
}

/* reveal on scroll */
var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.08});
  els.forEach(function(el){io.observe(el)});
} else {
  els.forEach(function(el){el.classList.add('in')});
}

/* accordion */
[].forEach.call(document.querySelectorAll('.acc button'),function(btn){
  btn.addEventListener('click',function(){
    var d=btn.parentNode,o=d.classList.contains('open');
    [].forEach.call(d.parentNode.children,function(x){
      x.classList.remove('open');
      var em=x.querySelector('em');
      if(em)em.textContent='\u2212';
    });
    if(!o){
      d.classList.add('open');
      var em=btn.querySelector('em');
      if(em)em.textContent='\u2212';
    }
  });
});

/* interactive wcard benefit cards on economics page (tap to toggle on mobile/touch) */
[].forEach.call(document.querySelectorAll('.wcard'),function(card){
  card.addEventListener('click',function(){
    var wasActive=card.classList.contains('is-active');
    [].forEach.call(document.querySelectorAll('.wcard'),function(c){c.classList.remove('is-active')});
    if(!wasActive)card.classList.add('is-active');
  });
});

/* demo form */
var f=document.getElementById('sample-form');
if(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    f.style.display='none';
    var sent=document.getElementById('sent');
    if(sent)sent.classList.add('on');
  });
  var rst=document.getElementById('reset-demo');
  if(rst){
    rst.addEventListener('click',function(){
      f.reset();
      f.style.display='';
      var sent=document.getElementById('sent');
      if(sent)sent.classList.remove('on');
    });
  }
}

/* ===== ANIMATED SVG DIAGRAMS ===== */
var NAV='#184D6B',BORE='#E6F2F7',RED='#E5422C',DARK_RED='#B5462E',TUBE='#B9B2DA',TUBEIN='#EEEBFA',HPW='#FFFFFF',HPS='#C9CED3';

function st(c,w,x){
  return 'fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" '+(x||'');
}
function tube(d,o,i,oc,ic){
  return '<path d="'+d+'" '+st(oc,o)+'/><path d="'+d+'" '+st(ic,i)+'/>';
}
function dots(p,n,dur,r,f,op){
  var s='';
  for(var i=0;i<n;i++){
    s+='<circle r="'+r+'" fill="'+f+'" opacity="'+(op||1)+'">'+
       '<animateMotion dur="'+dur+'s" begin="-'+(dur/n*i).toFixed(2)+'s" repeatCount="indefinite" path="'+p+'"/>'+
       '</circle>';
  }
  return s;
}

/* Integrated Callout Item: Badge + Title + Sub-descriptions with dedicated spacing */
function calloutBadge(num, bx, by){
  return '<g class="mk">'+
         '<circle cx="'+bx+'" cy="'+by+'" r="14" fill="'+RED+'" stroke="#ffffff" stroke-width="2.5"/>'+
         '<text x="'+bx+'" y="'+(by+4.5)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff" font-family="Montserrat,sans-serif">'+num+'</text>'+
         '</g>';
}

function callout(num, bx, by, tx, ty, title, subs, titleColor){
  var s='<g class="lbl">';
  s+=calloutBadge(num, bx, by);
  // High contrast title with solid weight
  s+='<text x="'+tx+'" y="'+ty+'" font-size="15" font-weight="700" fill="'+(titleColor||NAV)+'" font-family="Montserrat,sans-serif">'+title+'</text>';
  // Distinct vertical spacing for captions with dark high-contrast slate text
  subs.forEach(function(u, i){
    s+='<text x="'+tx+'" y="'+(ty + 20 + (18 * i))+'" font-size="12.5" font-weight="600" fill="#1E293B" font-family="Montserrat,sans-serif">'+u+'</text>';
  });
  s+='</g>';
  return s;
}

function ring(x,y,d){
  return '<circle cx="'+x+'" cy="'+y+'" r="14" fill="none" stroke="'+RED+'" stroke-width="3.5">'+
         '<animate attributeName="r" values="10;36" dur="1.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/>'+
         '<animate attributeName="opacity" values="1;0" dur="1.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/>'+
         '</circle>';
}

function machine(x,y,ok){
  var s='<g transform="translate('+x+','+y+')">';
  s+='<rect x="0" y="0" width="150" height="250" rx="16" fill="#F3F6F8" stroke="'+NAV+'" stroke-width="4"/>';
  s+='<rect x="14" y="14" width="122" height="44" rx="8" fill="'+NAV+'"/>';
  s+='<circle cx="40" cy="36" r="13" fill="#fff"/><line x1="40" y1="36" x2="'+(ok?49:31)+'" y2="'+(ok?27:44)+'" stroke="'+(ok?'#076A91':RED)+'" stroke-width="3" stroke-linecap="round"/>';
  s+='<rect x="64" y="26" width="58" height="9" rx="4" fill="'+(ok?'#7FD0EE':RED)+'"'+(ok?'':' opacity=".9"')+'>'+(ok?'':'<animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite"/>')+'</rect><rect x="64" y="41" width="40" height="6" rx="3" fill="#5E8AA3"/>';
  [22,82].forEach(function(cx){
    s+='<rect x="'+cx+'" y="76" width="46" height="120" rx="10" fill="#fff" stroke="#9FB2BE" stroke-width="3"/>'+
       '<rect x="'+(cx+4)+'" y="150" width="38" height="42" rx="6" fill="'+(ok?'#CFE7F1':'#E9C9C0')+'"/>'+
       '<rect x="'+(cx+8)+'" y="68" width="30" height="12" rx="4" fill="#9FB2BE"/>';
  });
  s+='<rect x="10" y="206" width="130" height="10" rx="5" fill="#C9D3D9"/>';
  s+='<rect x="18" y="250" width="114" height="16" rx="6" fill="'+NAV+'"/><circle cx="34" cy="276" r="10" fill="#3a4a55"/><circle cx="116" cy="276" r="10" fill="#3a4a55"/>';
  return s+'</g>';
}

function grid(){
  return '<defs>'+
         '<pattern id="tfgrid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#D3DEE4"/></pattern>'+
         '<pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 4h8M4 0v8" stroke="#8E84C4" stroke-width="1" opacity=".55"/></pattern>'+
         '<linearGradient id="cone" x1="0" x2="1"><stop offset="0" stop-color="#E9E6F7"/><stop offset=".5" stop-color="#FBFAFF"/><stop offset="1" stop-color="#DCD7F0"/></linearGradient>'+
         '<linearGradient id="coneH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCD7F0"/><stop offset=".35" stop-color="#FBFAFF"/><stop offset=".75" stop-color="#ECE9F8"/><stop offset="1" stop-color="#D4CEEB"/></linearGradient>'+
         '<linearGradient id="hpw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".65" stop-color="#F6F8FA"/><stop offset="1" stop-color="#DDE4E9"/></linearGradient>'+
         '<filter id="hpShadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#184D6B" flood-opacity="0.14"/></filter>'+
         '<linearGradient id="hpBore" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D7EBF3"/><stop offset=".5" stop-color="#F0F8FB"/><stop offset="1" stop-color="#C5DFEA"/></linearGradient>'+
         '</defs><rect width="1000" height="440" rx="14" fill="url(#tfgrid)"/>';
}

/* =========================================================================
   1. THE PROBLEM ANIMATION (#diag-problem > svg)
   Traditional Yankauer handpiece with narrow lumen channel.
   Zero escaping red debris dots.
   Line clog strictly contained inside tubing.
   Callout badges 01 and 02 ONLY with clean layout & generous spacing.
   ========================================================================= */
function problemSvg(){
  var s='<svg viewBox="0 0 1000 440" width="100%" role="img" aria-label="Conventional suction: debris clogs the narrow Yankauer handpiece and suction line before reaching the evacuation unit" style="display:block;overflow:visible" font-family="Montserrat,sans-serif">'+grid();

  /* Surgical site tissue bed */
  s+='<ellipse cx="80" cy="335" rx="66" ry="42" fill="#F6E1DB"/>';
  [[52,335],[74,352],[98,328],[62,318],[92,356]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="'+DARK_RED+'" opacity=".55"/>';
  });

  /* Suction tubing from handpiece to evacuation unit */
  var LINE='M420,290 C510,290 530,150 630,150 L818,150';
  s+=tube(LINE,22,12,'#B9C3C9','#EEF1F3');

  /* Suction evacuation unit (failing/alert state) */
  s+=machine(818,52,false);

  /* Traditional Yankauer Handpiece */
  var YANK='M80,335 C115,335 145,290 185,290 L420,290';

  /* Slender angled shaft: outer stainless steel */
  s+='<path d="'+YANK+'" stroke="#475569" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<path d="'+YANK+'" stroke="#CBD5E1" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';

  /* Noticeably NARROW inner lumen channel (bottleneck) */
  s+='<path d="'+YANK+'" stroke="#F1F5F9" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';

  /* Traditional Yankauer bulbous crown tip */
  s+='<ellipse cx="80" cy="335" rx="7.5" ry="9" fill="#CBD5E1" stroke="#475569" stroke-width="1.8"/>';
  s+='<circle cx="76" cy="335" r="2" fill="#1E293B"/><circle cx="81" cy="331" r="1.4" fill="#475569"/><circle cx="81" cy="339" r="1.4" fill="#475569"/>';

  /* Ribbed handle grip on Yankauer */
  s+='<rect x="240" y="277" width="130" height="26" rx="7" fill="#334155" stroke="#1E293B" stroke-width="1.8"/>';
  for(var rx=254;rx<=356;rx+=11){
    s+='<line x1="'+rx+'" y1="280" x2="'+rx+'" y2="300" stroke="#64748B" stroke-width="2.2" stroke-linecap="round"/>';
  }
  s+='<line x1="240" y1="290" x2="370" y2="290" stroke="#F1F5F9" stroke-width="4.5"/>';

  /* Tapered connector barb connecting Yankauer into suction tubing */
  s+='<path d="M370,284 L420,286 L420,294 L370,296 Z" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>';

  /* Handpiece clog (01): Visible debris dots jammed inside narrow channel */
  [[154,299],[160,296],[165,293],[170,291],[175,290],[158,298],[164,294],[169,292],[174,290]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.8" fill="'+RED+'"/>';
  });
  s+=ring(165,294,0);

  /* Line clog (02): Strictly inside inner walls of the suction tube */
  [[672,149],[676,151],[680,148],[683,152],[686,149],[690,151],[674,151],[678,149],[682,150],[688,150]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.7" fill="'+RED+'"/>';
  });
  s+=ring(680,150,0.5);

  /* Animated debris particles (Zero escaping dots) */
  var P_IN='M60,335 C85,335 120,320 160,295';
  s+=dots(P_IN,4,1.8,2.2,RED);

  var P_LINE='M176,290 L420,290 C510,290 530,150 630,150 L672,150';
  s+=dots(P_LINE,3,3.4,2.5,RED,.85);

  var P_DOWN='M692,150 L818,150';
  s+=dots(P_DOWN,2,4.0,2,RED,.4);

  /* Callout 01: Clean layout with zero overlaps */
  s+='<path class="lbl" d="M160,288 L76,195 L70,164" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('01', 70, 150, 94, 154, 'Handpiece clogs mid-case', ['Suction drops at the surgical site', 'The team stops to clear or swap it'], '#C7341F');

  s+='<text class="lbl" x="305" y="260" text-anchor="middle" font-size="13.5" font-weight="600" fill="#475569">Narrow-bore Yankauer handpiece</text>';

  /* Callout 02: Clean layout with zero overlaps */
  s+='<path class="lbl" d="M675,158 L520,210 L515,236" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('02', 515, 250, 539, 254, 'Clogs build in the suction line', ['Debris lodges in the tubing', 'Flow to the unit drops'], '#C7341F');

  s+='<text class="lbl" x="893" y="372" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Suction evacuation unit</text>';

  return s+'</svg>';
}

/* =========================================================================
   2. HOW IT WORKS / THE SOLUTION ANIMATION (#diag-flow > svg)
   Redrawn handpiece matching the real sleek tapered white handpiece:
   - Gentle 25-30 deg curve (~28 deg) at the open distal tip
   - Smooth tapered wide-bore body with large internal channel
   - Rotation point (swivel joint) strictly at the back end tubing joint
   Horizontal Cyclone Filter:
   - Tubing from handpiece enters the LARGER-diameter inlet end (left)
   - Tubing to suction evacuation unit exits from the SMALLER-diameter end (right)
   - Solid debris (black dots) trapped inside horizontal mesh basket
   - Liquid/blood (red dots) flows unimpeded out the smaller end
   Zero text/line overlaps across all callout labels.
   ========================================================================= */
function flowSvg(){
  var s='<svg viewBox="0 0 1000 440" width="100%" role="img" aria-label="TruFlo Ortho: debris passes through the large-bore handpiece and is trapped in the horizontal Cyclone Filter while continuous suction keeps flowing" style="display:block;overflow:visible" font-family="Montserrat,sans-serif">'+grid();

  /* Surgical site tissue bed */
  s+='<ellipse cx="78" cy="218" rx="62" ry="34" fill="#F6E1DB"/>';
  [[48,220],[66,233],[94,218],[56,204],[88,236]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.2" fill="'+DARK_RED+'" opacity=".55"/>';
  });

  /* Inlet tubing T1: attaches strictly to back-end swivel joint (398,172) -> larger-diameter end of Cyclone Filter (492,198) */
  var T1='M398,172 C438,172 454,198 492,198';

  /* Outlet tubing T2: exits smaller-diameter end of Cyclone Filter (738,198) -> Suction evacuation unit (818,160) */
  var T2='M738,198 C774,198 782,160 818,160';

  /* Clear suction tubing */
  s+=tube(T1,24,14,TUBE,TUBEIN);
  s+=tube(T2,20,11,TUBE,TUBEIN);

  /* HORIZONTAL CYCLONE FILTER (Flow enters LARGE end at left, exits SMALL end at right) */
  /* Larger-diameter inlet collar & purple manifold cap (left side, x=490..540) */
  s+='<path d="M490,186 L518,181 L518,215 L490,210 Z" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2.2" stroke-linejoin="round"/>';
  s+='<rect x="518" y="134" width="22" height="128" rx="7" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2.5"/>';
  /* Molded locking lugs on large cap */
  s+='<rect x="524" y="128" width="10" height="8" rx="3" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2"/>';
  s+='<rect x="524" y="260" width="10" height="8" rx="3" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2"/>';

  /* Horizontal translucent cone chamber (wide at left x=540 -> conical taper to small end at right x=712) */
  s+='<path d="M540,140 L654,148 L712,183 L712,213 L654,248 L540,256 Z" fill="url(#coneH)" stroke="#8E84C4" stroke-width="2.5" stroke-linejoin="round"/>';

  /* Inner perforated filter mesh basket inside horizontal housing */
  s+='<path d="M550,152 L652,158 L684,174 L684,222 L652,238 L550,244 Z" fill="url(#mesh)" stroke="#A79FD2" stroke-width="1.8" stroke-linejoin="round"/>';

  /* Smaller-diameter barbed exit nozzle (right side, x=712..740) connecting cleanly to outlet tubing T2 */
  s+='<path d="M712,187 L740,190 L740,206 L712,209 Z" fill="#E4E0F5" stroke="#8E84C4" stroke-width="2.2" stroke-linejoin="round"/>';
  s+='<line x1="724" y1="188" x2="724" y2="208" stroke="#8E84C4" stroke-width="1.8"/>';
  s+='<line x1="733" y1="189" x2="733" y2="207" stroke="#8E84C4" stroke-width="1.8"/>';

  /* Cyclonic swirling fluid flow indicator inside horizontal cone (Red dashed vortex, left-to-right) */
  s+='<path d="M542,198 C565,160 595,160 610,198 C625,236 650,234 666,198 C680,170 695,178 710,198" fill="none" stroke="'+RED+'" stroke-width="2.4" stroke-dasharray="6 8" opacity="0.65">'+
     '<animate attributeName="stroke-dashoffset" from="0" to="-28" dur="0.9s" repeatCount="indefinite"/>'+
     '</path>';

  /* Visibly TRAPPED solid bone fragments resting inside horizontal mesh basket (Black dots only) */
  [[606,232],[618,235],[630,233],[642,231],[652,226],[662,218],[672,212],[658,210],[646,219],[634,224],[668,202]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.1" fill="#1A1A1A"/>';
  });

  /* Suction evacuation unit (operating normally/continuous flow) */
  s+=machine(818,52,true);

  /* TRUFLO ORTHO WHITE HANDPIECE (Sleek tapered white body with gentle 25-30 deg tip curve) */
  s+='<g filter="url(#hpShadow)">';
  /* Outer tapered white shell: slimmer at curved open tip (22px), flaring gently toward back hub (31px) */
  s+='<path d="M77,196 C113,176 158,159 205,159 L364,156.5 L364,187.5 L205,185 C165,185 127,196 87,216 Z" fill="url(#hpw)" stroke="#9FB2BE" stroke-width="2" stroke-linejoin="round"/>';
  /* Wide internal large-bore channel */
  s+='<path d="M79,200 C116,181 160,163.5 205,163.5 L364,162.5 L364,181.5 L205,180.5 C163,180.5 123,192 85,212 Z" fill="url(#hpBore)" stroke="#B2D3E1" stroke-width="1"/>';
  /* Distal open beveled suction tip rim */
  s+='<g transform="translate(82,206) rotate(-28)">'+
     '<ellipse cx="0" cy="0" rx="5" ry="10.8" fill="#FFFFFF" stroke="#9FB2BE" stroke-width="2"/>'+
     '<ellipse cx="0" cy="0" rx="3.1" ry="6.8" fill="#B8DCEB" stroke="#7FA8BA" stroke-width="1"/>'+
     '</g>';
  s+='</g>';

  /* BACK-END SWIVEL JOINT (Positioned strictly at the back end where handpiece attaches to tubing) */
  s+='<rect x="358" y="155" width="8" height="34" rx="2" fill="#EEF3F6" stroke="#9FB2BE" stroke-width="1.8"/>';
  s+='<rect x="366" y="157" width="26" height="30" rx="5" fill="#076A91" stroke="#184D6B" stroke-width="2"/>';
  s+='<line x1="373" y1="160" x2="373" y2="184" stroke="#7FD0EE" stroke-width="1.8"/>';
  s+='<line x1="379" y1="160" x2="379" y2="184" stroke="#7FD0EE" stroke-width="1.8"/>';
  s+='<line x1="385" y1="160" x2="385" y2="184" stroke="#7FD0EE" stroke-width="1.8"/>';
  s+='<path d="M392,161 L400,163 L400,181 L392,183 Z" fill="#D8E3EC" stroke="#8E9FAD" stroke-width="1.6" stroke-linejoin="round"/>';

  /* 360 degree rotation arrows strictly around the back-end swivel joint */
  s+='<path d="M366,149 A18,10 0 0 1 391,149" fill="none" stroke="#076A91" stroke-width="2.2"/><polygon points="390,144 397,150 389,153" fill="#076A91"/>';
  s+='<path d="M392,195 A18,10 0 0 1 367,195" fill="none" stroke="#076A91" stroke-width="2.2"/><polygon points="368,200 361,194 369,191" fill="#076A91"/>';

  /* Fluid & Debris Particles (Red liquid + Black solid debris ONLY) */
  /* RED DOTS (#E5422C): Liquid/blood flowing unimpeded through handpiece, horizontal filter (large -> small end), and out to evacuation unit */
  var RED_FLOW='M76,209 L82,206 C120,186 162,172 205,172 L398,172 C438,172 454,198 492,198 L542,198 C565,160 595,160 610,198 C625,236 650,234 666,198 C680,170 695,178 710,198 L738,198 C774,198 782,160 818,160';
  s+=dots(RED_FLOW,10,4.4,3.6,RED,0.88);

  /* BLACK DOTS (#1A1A1A): Solid bone fragments passing through large-bore handpiece & swivel, entering large filter end, and trapping inside basket */
  var BLACK_DEBRIS='M76,209 L82,206 C120,186 162,172 205,172 L398,172 C438,172 454,198 492,198 L542,198 C575,198 605,222 658,220';
  s+=dots(BLACK_DEBRIS,4,3.9,4.5,'#1A1A1A',0.95);

  /* =======================================================================
     CALLOUTS (Sequential 1, 2, 3 Left-to-Right with ZERO collisions)
     ======================================================================= */

  /* 1: Gently curved tip (points directly to the gentle 25-30 deg curved tip) */
  s+='<line class="lbl" x1="44" y1="308" x2="78" y2="215" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('1', 44, 322, 68, 326, 'Gently curved tip', ['25\u201330\u00B0 curve enables access', 'to the femoral canal']);

  /* 2: Large-bore rotating handpiece (leader routes cleanly to the back-end swivel joint with zero text crossing) */
  s+='<path class="lbl" d="M379,134 L366,112 L96,112 L96,58" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('2', 96, 44, 120, 48, 'Large-bore rotating handpiece', ['Passes debris without clogging', '360\u00B0 ergonomic rotation']);

  /* 3: Patented Cyclone Filter (leader routes cleanly from horizontal filter body with zero overlap) */
  s+='<path class="lbl" d="M615,138 L595,100 L448,100 L448,58" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('3', 448, 44, 472, 48, 'Patented Cyclone Filter', ['Traps debris \u2022 Keeps full suction pressure']);

  /* Continuous suction flow label (centered above evacuation unit) */
  s+='<text class="lbl" x="893" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="#076A91" font-family="Montserrat,sans-serif">Continuous suction flow &rarr;</text>';

  /* Suction evacuation unit label (centered at bottom) */
  s+='<text class="lbl" x="893" y="372" text-anchor="middle" font-size="14" font-weight="700" fill="#475569" font-family="Montserrat,sans-serif">Suction evacuation unit</text>';

  return s+'</svg>';
}

var p=document.getElementById('diag-problem');if(p)p.innerHTML=problemSvg();
var t=document.getElementById('diag-flow');if(t)t.innerHTML=flowSvg();
})();
