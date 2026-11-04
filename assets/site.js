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
         '<linearGradient id="hpw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E3E7EA"/></linearGradient>'+
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
   Faithful TruFlo wide-bore handpiece with gentle 25-30 deg tip curve.
   Repositioned higher in the illustration.
   Cyclone Filter oriented so flow ENTERS large end and EXITS small end.
   Inlet tube connects to large end, outlet tube exits from small end.
   Red dots (fluid) unimpeded; Black dots (bone fragments) trapped in basket.
   ZERO blue dots.
   Badges sequential 1, 2, 3 from left to right.
   Precision positioning: zero text line intersections, clean leader lines.
   ========================================================================= */
function flowSvg(){
  var s='<svg viewBox="0 0 1000 440" width="100%" role="img" aria-label="TruFlo Ortho: debris passes through the large-bore handpiece and is trapped in the Cyclone Filter while continuous suction keeps flowing" style="display:block;overflow:visible" font-family="Montserrat,sans-serif">'+grid();

  /* Surgical site tissue bed */
  s+='<ellipse cx="75" cy="235" rx="66" ry="40" fill="#F6E1DB"/>';
  [[48,235],[68,248],[92,230],[56,222],[86,252]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="'+DARK_RED+'" opacity=".55"/>';
  });

  /* Handpiece centerline: gentle 25-30 degree curvature at tip, running higher at y=140 */
  var HP_FLOW='M75,235 C110,216 135,140 170,140 L380,140';

  /* Inlet tubing T1 from handpiece to large end (top) of Cyclone Filter */
  var T1='M380,140 C460,140 560,95 660,95';

  /* Outlet tubing T2 from small end (bottom) of Cyclone Filter to suction evacuation unit */
  var T2='M660,330 C660,370 730,160 818,160';

  /* Draw clear suction tubing */
  s+=tube(T1,24,14,TUBE,TUBEIN);
  s+=tube(T2,22,12,TUBE,TUBEIN);

  /* Cyclone Filter: Flow enters LARGE end at top, exits SMALL end at bottom */
  /* Top manifold cap & inlet port (Large diameter end) */
  s+='<rect x="590" y="80" width="140" height="24" rx="8" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2.5"/>';
  s+='<rect x="646" y="65" width="28" height="20" rx="5" fill="#D9D4F0" stroke="#8E84C4" stroke-width="2.5"/>';

  /* Translucent cone chamber: wide at top (y=104, width 120), narrow at bottom (y=300, width 40) */
  s+='<path d="M600,104 L720,104 L680,300 L640,300 Z" fill="url(#cone)" stroke="#8E84C4" stroke-width="2.5" stroke-linejoin="round"/>';

  /* Inner mesh filter basket inside the cone */
  s+='<path d="M615,116 L705,116 L674,285 L646,285 Z" fill="url(#mesh)" stroke="#A79FD2" stroke-width="1.8"/>';

  /* Bottom exit nozzle (Small diameter end) connecting to T2 */
  s+='<rect x="648" y="300" width="24" height="30" rx="4" fill="#E4E0F5" stroke="#8E84C4" stroke-width="2.5"/>';

  /* Cyclonic vortex swirling flow indicator inside filter (Red fluid flow) */
  s+='<path d="M660,110 C700,130 705,160 670,175 C635,190 635,220 665,235 C695,250 690,270 660,285" fill="none" stroke="'+RED+'" stroke-width="2.5" stroke-dasharray="6 8" opacity="0.65">'+
     '<animate attributeName="stroke-dashoffset" from="0" to="-28" dur="0.9s" repeatCount="indefinite"/>'+
     '</path>';

  /* Visibly TRAPPED solid bone fragments resting in cyclone filter mesh basket (Black dots only) */
  [[652,274],[660,280],[668,276],[655,266],[665,268],[658,258],[667,260],[662,284]].forEach(function(p){
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.2" fill="#1A1A1A"/>';
  });

  /* Suction evacuation unit (operating normally/continuous flow) */
  s+=machine(818,52,true);

  /* TruFlo Ortho Handpiece: wide-bore ergonomic body and ribbed rotational collar */
  s+='<path d="'+HP_FLOW+'" stroke="#CBD5E1" stroke-width="34" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<path d="'+HP_FLOW+'" stroke="url(#hpw)" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<path d="'+HP_FLOW+'" stroke="'+BORE+'" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>';

  /* Ergonomic ribbed rotational collar */
  s+='<rect x="225" y="120" width="30" height="40" rx="6" fill="#076A91" stroke="#184D6B" stroke-width="2"/>';
  s+='<line x1="233" y1="123" x2="233" y2="157" stroke="#7FD0EE" stroke-width="2"/>';
  s+='<line x1="240" y1="123" x2="240" y2="157" stroke="#7FD0EE" stroke-width="2"/>';
  s+='<line x1="247" y1="123" x2="247" y2="157" stroke="#7FD0EE" stroke-width="2"/>';
  /* 360 rotation indicator arc */
  s+='<path d="M228,110 A20,10 0 0 1 252,110" fill="none" stroke="#076A91" stroke-width="2.2"/><polygon points="251,105 258,111 250,114" fill="#076A91"/>';

  /* Fluid & Debris Particles (Red and Black ONLY - ZERO Blue dots) */
  /* RED DOTS (#E5422C): Blood & liquid flowing unimpeded through entire system to evacuation unit */
  var RED_FLOW='M65,235 C100,216 135,140 170,140 L380,140 C460,140 560,95 660,95 L660,110 C690,130 695,160 665,175 C635,190 635,220 665,235 C685,250 680,270 660,290 L660,330 C660,370 730,160 818,160';
  s+=dots(RED_FLOW,10,4.2,3.6,RED,0.85);

  /* BLACK DOTS (#1A1A1A): Solid bone fragments entering handpiece and visibly trapped in filter basket */
  var BLACK_DEBRIS='M65,235 C100,216 135,140 170,140 L380,140 C460,140 560,95 660,95 L660,115 C685,135 690,165 665,185 C640,200 645,230 660,255 L660,275';
  s+=dots(BLACK_DEBRIS,4,3.8,4.6,'#1A1A1A',0.95);

  /* =======================================================================
     CALLOUTS (Sequential 1, 2, 3 Left-to-Right with ZERO collisions)
     ======================================================================= */
  
  /* 1: Gently curved tip (left, positioned below the tip with clean clearance) */
  s+='<line class="lbl" x1="42" y1="298" x2="68" y2="246" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('1', 40, 312, 64, 316, 'Gently curved tip', ['25\u201330\u00B0 curve enables access', 'to the femoral canal']);

  /* 2: Large-bore rotating handpiece (middle)
     Shifted further upward and to the left.
     Leader line connects from collar to the bottom-left of the text box (to badge) with zero text intersection. */
  s+='<path class="lbl" d="M235,118 L126,76 L120,44" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('2', 120, 30, 144, 34, 'Large-bore rotating handpiece', ['Passes debris without clogging', '360\u00B0 ergonomic rotation']);

  /* 3: Patented Cyclone Filter (right)
     Shifted higher up and to the right.
     Leader line originates neatly from top of filter cap and points cleanly to the badge. */
  s+='<path class="lbl" d="M640,78 L536,66 L530,40" fill="none" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="4 4"/>';
  s+=callout('3', 530, 26, 554, 30, 'Patented Cyclone Filter', ['Traps debris \u2022 Keeps full suction pressure']);

  /* Continuous suction flow label (centered directly over the evacuation unit, no overlap with Callout 3) */
  s+='<text class="lbl" x="893" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="#076A91" font-family="Montserrat,sans-serif">Continuous suction flow &rarr;</text>';

  /* Suction evacuation unit label (centered at bottom) */
  s+='<text class="lbl" x="893" y="372" text-anchor="middle" font-size="14" font-weight="700" fill="#475569" font-family="Montserrat,sans-serif">Suction evacuation unit</text>';

  return s+'</svg>';
}

var p=document.getElementById('diag-problem');if(p)p.innerHTML=problemSvg();
var t=document.getElementById('diag-flow');if(t)t.innerHTML=flowSvg();
})();
