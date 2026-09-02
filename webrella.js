const finderData={
  engine:{title:'Engine & Diagnostics',kicker:'ENGINE / ELECTRICAL',code:'DIAG',copy:'Check-engine lights, rough running, starting trouble or electrical symptoms are a good reason to begin with a diagnostic inspection.',option:'Diagnostics & Electrical',tags:['Warning lights','Starting issues','Electrical faults']},
  brakes:{title:'Brake Service',kicker:'BRAKING / SAFETY',code:'BRK',copy:'Squeaking, vibration, a soft pedal or longer stopping distance can point to worn brake components that should be inspected.',option:'Brakes & Rotors',tags:['Squeaking','Vibration','Stopping distance']},
  tires:{title:'Tire Service',kicker:'TIRES / ROAD CONTACT',code:'TIRE',copy:'Low pressure, uneven wear, vibration or an aging tire can affect handling, ride quality and road safety.',option:'Tires',tags:['Low pressure','Uneven wear','Vibration']},
  cooling:{title:'Cooling & A/C',kicker:'CLIMATE / TEMPERATURE',code:'HVAC',copy:'Weak air conditioning, coolant concerns or a rising temperature gauge can be checked before the problem becomes a larger repair.',option:'Cooling & Air Conditioning',tags:['Weak A/C','Overheating','Coolant concerns']},
  maintenance:{title:'Routine Maintenance',kicker:'PREVENTIVE / CARE',code:'MAINT',copy:'Oil changes and scheduled maintenance help keep everyday wear from turning into more expensive repairs later on.',option:'Oil Change & Maintenance',tags:['Oil change','Scheduled care','Road-ready check']}
};

const finderSection=document.querySelector('#vehicle-check');
if(finderSection){
  finderSection.innerHTML=`
    <div class="service-finder">
      <div class="finder-copy">
        <p class="eyebrow">Quick service finder</p>
        <h2>What brings<br><em>you in?</em></h2>
        <p class="finder-lead">Choose the closest match. We will point you toward the service that makes the most sense as a first step.</p>
        <div class="finder-options" role="list" aria-label="Common vehicle concerns">
          <button class="finder-option active" type="button" data-service="engine"><span class="finder-option-copy"><strong>Warning light / engine issue</strong><small>Check-engine light, rough idle, trouble starting</small></span><span class="finder-arrow">↗</span></button>
          <button class="finder-option" type="button" data-service="brakes"><span class="finder-option-copy"><strong>Brakes feel or sound off</strong><small>Squeaking, vibration, soft pedal, longer stops</small></span><span class="finder-arrow">↗</span></button>
          <button class="finder-option" type="button" data-service="tires"><span class="finder-option-copy"><strong>Tire or ride problem</strong><small>Pressure, wear, vibration, road feel</small></span><span class="finder-arrow">↗</span></button>
          <button class="finder-option" type="button" data-service="cooling"><span class="finder-option-copy"><strong>A/C or temperature issue</strong><small>Weak A/C, overheating, coolant concerns</small></span><span class="finder-arrow">↗</span></button>
          <button class="finder-option" type="button" data-service="maintenance"><span class="finder-option-copy"><strong>Routine maintenance</strong><small>Oil change, scheduled care, general upkeep</small></span><span class="finder-arrow">↗</span></button>
        </div>
      </div>
      <aside class="finder-result" aria-live="polite">
        <div class="finder-result-top"><span>Recommended next step</span></div>
        <div class="finder-code-wrap"><span id="finder-code">DIAG</span><i></i></div>
        <p class="finder-kicker" id="finder-kicker">ENGINE / ELECTRICAL</p>
        <h3 id="diagnostic-title">Engine &amp; Diagnostics</h3>
        <p class="finder-result-copy" id="diagnostic-copy">Check-engine lights, rough running, starting trouble or electrical symptoms are a good reason to begin with a diagnostic inspection.</p>
        <div class="finder-tags" id="finder-tags"><span>Warning lights</span><span>Starting issues</span><span>Electrical faults</span></div>
        <a class="button button-red diagnostic-cta" id="diagnostic-action" href="#book">Request this service <span>›</span></a>
        <div class="finder-note"><span></span> Not sure what the issue is? Call <a href="tel:3018818646">(301) 881-8646</a>.</div>
      </aside>
    </div>`;
}

const finderLayoutFix=document.createElement('style');
finderLayoutFix.textContent=`.finder-option{grid-template-columns:1fr 28px!important}.finder-result-top{justify-content:flex-start!important}`;
document.head.appendChild(finderLayoutFix);

const finderOptions=[...document.querySelectorAll('.finder-option')];
const diagnosticTitle=document.querySelector('#diagnostic-title');
const diagnosticCopy=document.querySelector('#diagnostic-copy');
const diagnosticAction=document.querySelector('#diagnostic-action');
const finderKicker=document.querySelector('#finder-kicker');
const finderCode=document.querySelector('#finder-code');
const finderTags=document.querySelector('#finder-tags');
const bookingForm=document.querySelector('#booking-form');
const serviceSelect=bookingForm?.querySelector('select[name="service"]');

function setFinder(key){
  const item=finderData[key];
  if(!item) return;
  finderOptions.forEach(btn=>btn.classList.toggle('active',btn.dataset.service===key));
  if(diagnosticTitle) diagnosticTitle.textContent=item.title;
  if(diagnosticCopy) diagnosticCopy.textContent=item.copy;
  if(finderKicker) finderKicker.textContent=item.kicker;
  if(finderCode) finderCode.textContent=item.code;
  if(finderTags) finderTags.innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join('');
  if(diagnosticAction) diagnosticAction.dataset.option=item.option;
}

finderOptions.forEach(btn=>btn.addEventListener('click',()=>setFinder(btn.dataset.service)));
setFinder('engine');
diagnosticAction?.addEventListener('click',e=>{
  e.preventDefault();
  const option=diagnosticAction.dataset.option;
  if(serviceSelect&&option){
    const found=[...serviceSelect.options].find(item=>item.textContent.trim()===option);
    if(found) serviceSelect.value=found.value||found.textContent;
  }
  document.querySelector('#book')?.scrollIntoView({behavior:'smooth',block:'start'});
});

/* RMA Service Assistant */
const rmaChatStyles=document.createElement('style');
rmaChatStyles.textContent=`
.rma-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;height:56px;padding:0 18px 0 14px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:#e11d2e;color:#fff;display:flex;align-items:center;gap:10px;box-shadow:0 18px 45px rgba(0,0,0,.42),0 0 0 1px rgba(225,29,46,.18);font-family:"Oswald",sans-serif;font-size:13px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:.2s}
.rma-chat-launcher:hover{transform:translateY(-2px);background:#f02538;box-shadow:0 22px 52px rgba(0,0,0,.48),0 0 26px rgba(225,29,46,.18)}.rma-chat-launcher svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.rma-chat-panel{position:fixed;right:22px;bottom:90px;z-index:9999;width:min(400px,calc(100vw - 32px));height:min(640px,calc(100vh - 120px));display:flex;flex-direction:column;background:#0e0e12;border:1px solid #303038;box-shadow:0 30px 80px rgba(0,0,0,.58);opacity:0;visibility:hidden;transform:translateY(14px) scale(.985);transform-origin:bottom right;transition:.2s;overflow:hidden}.rma-chat-panel.open{opacity:1;visibility:visible;transform:none}
.rma-chat-head{min-height:74px;padding:16px 16px 15px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #292930;background:linear-gradient(135deg,#17171c,#101014)}.rma-chat-mark{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(225,29,46,.12);border:1px solid rgba(225,29,46,.45);color:#ff3447;font-family:"Oswald",sans-serif;font-weight:700;font-size:15px}.rma-chat-head-copy{min-width:0;flex:1}.rma-chat-head-copy strong{display:block;color:#fff;font-family:"Oswald",sans-serif;font-size:16px;text-transform:uppercase}.rma-chat-head-copy span{display:flex;align-items:center;gap:7px;margin-top:3px;color:#85858e;font-size:10px;text-transform:uppercase}.rma-chat-head-copy span:before{content:"";width:6px;height:6px;border-radius:50%;background:#e11d2e;box-shadow:0 0 0 4px rgba(225,29,46,.08)}.rma-chat-close{width:34px;height:34px;border:0;background:transparent;color:#8c8c95;font-size:24px;cursor:pointer}.rma-chat-close:hover{color:#fff}
.rma-chat-messages{flex:1;overflow-y:auto;padding:18px 16px 12px;scroll-behavior:smooth}.rma-chat-messages::-webkit-scrollbar{width:6px}.rma-chat-messages::-webkit-scrollbar-thumb{background:#303038;border-radius:999px}.rma-chat-row{display:flex;margin:0 0 12px}.rma-chat-row.user{justify-content:flex-end}.rma-chat-bubble{max-width:86%;padding:11px 13px;border-radius:3px;background:#18181d;border:1px solid #292930;color:#d6d6dc;font-size:12px;line-height:1.55}.rma-chat-row.user .rma-chat-bubble{background:#e11d2e;border-color:#e11d2e;color:#fff}
.rma-chat-actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 2px}.rma-chat-action{appearance:none;border:1px solid #34343c;background:#131318;color:#d2d2d8;padding:8px 10px;font-size:10px;letter-spacing:.03em;text-transform:uppercase;cursor:pointer;transition:.2s;text-decoration:none}.rma-chat-action:hover{border-color:#e11d2e;color:#fff;background:rgba(225,29,46,.08)}.rma-chat-action.primary{background:#e11d2e;border-color:#e11d2e;color:#fff}.rma-chat-action.primary:hover{background:#f02538}
.rma-chat-quick{padding:0 16px 12px;display:flex;gap:7px;overflow-x:auto;scrollbar-width:none}.rma-chat-quick::-webkit-scrollbar{display:none}.rma-chat-chip{flex:0 0 auto;border:1px solid #303038;background:#121217;color:#aaaab3;padding:8px 10px;font-size:10px;white-space:nowrap;cursor:pointer;transition:.2s}.rma-chat-chip:hover{border-color:#e11d2e;color:#fff}.rma-chat-form{padding:12px;border-top:1px solid #292930;background:#0b0b0e;display:flex;gap:8px}.rma-chat-input{min-width:0;flex:1;height:42px;border:1px solid #303038;background:#141419;color:#fff;padding:0 12px;font:12px "Instrument Sans",sans-serif;outline:none}.rma-chat-input:focus{border-color:rgba(225,29,46,.7);box-shadow:0 0 0 2px rgba(225,29,46,.08)}.rma-chat-send{width:44px;height:42px;border:0;background:#e11d2e;color:#fff;display:grid;place-items:center;cursor:pointer}.rma-chat-send svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9}.rma-chat-foot{padding:0 12px 10px;background:#0b0b0e;color:#595962;font-size:8px;letter-spacing:.08em;text-align:center;text-transform:uppercase}
.rma-request-label{display:block;margin-bottom:7px;color:#7f7f88;font-size:9px;letter-spacing:.1em;text-transform:uppercase}.rma-request-choices{display:grid;gap:6px;margin-top:9px}.rma-request-choice{width:100%;border:1px solid #34343c;background:#121217;color:#d7d7dc;padding:10px 11px;text-align:left;font:11px "Instrument Sans",sans-serif;cursor:pointer;transition:.2s}.rma-request-choice:hover{border-color:#e11d2e;background:rgba(225,29,46,.08);color:#fff}.rma-request-summary{margin-top:9px;padding:10px;border:1px solid #303038;background:#111116}.rma-request-summary div{display:grid;grid-template-columns:82px 1fr;gap:8px;padding:4px 0;color:#a5a5ad;font-size:10px}.rma-request-summary strong{color:#fff;font-weight:500}.rma-request-progress{margin-bottom:8px;color:#e11d2e;font-family:"Oswald",sans-serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase}
@media(max-width:620px){.rma-chat-launcher{right:14px;bottom:14px;height:52px}.rma-chat-panel{right:8px;bottom:76px;width:calc(100vw - 16px);height:min(670px,calc(100vh - 92px))}}
@media(prefers-reduced-motion:reduce){.rma-chat-launcher,.rma-chat-panel{transition:none}}
`;
document.head.appendChild(rmaChatStyles);

const rmaChatRoot=document.createElement('div');
rmaChatRoot.innerHTML=`
<button class="rma-chat-launcher" type="button" aria-label="Open RMA Service Assistant" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M5 6.5h14v9H9l-4 3v-12Z"/><path d="M9 10h6M9 13h4"/></svg><span>Ask RMA</span></button>
<section class="rma-chat-panel" role="dialog" aria-label="RMA Service Assistant" aria-hidden="true">
<header class="rma-chat-head"><div class="rma-chat-mark">RMA</div><div class="rma-chat-head-copy"><strong>Service Assistant</strong><span>Ready to help</span></div><button class="rma-chat-close" type="button" aria-label="Close chat">×</button></header>
<div class="rma-chat-messages" aria-live="polite"></div>
<div class="rma-chat-quick" aria-label="Quick questions"><button class="rma-chat-chip rma-request-chip" type="button">Request service</button><button class="rma-chat-chip" type="button" data-prompt="My check engine light is on">Check engine light</button><button class="rma-chat-chip" type="button" data-prompt="I have a brake issue">Brake issue</button><button class="rma-chat-chip" type="button" data-prompt="What are your hours and location?">Hours & location</button></div>
<form class="rma-chat-form"><input class="rma-chat-input" type="text" maxlength="220" autocomplete="off" placeholder="Ask about service, hours, location..." aria-label="Message RMA Service Assistant"><button class="rma-chat-send" type="submit" aria-label="Send message"><svg viewBox="0 0 24 24"><path d="m4 4 16 8-16 8 3-8-3-8Z"/><path d="M7 12h13"/></svg></button></form>
<div class="rma-chat-foot">RMA BP Automotive · Rockville, Maryland</div>
</section>`;
document.body.appendChild(rmaChatRoot);

const chatLauncher=rmaChatRoot.querySelector('.rma-chat-launcher');
const chatPanel=rmaChatRoot.querySelector('.rma-chat-panel');
const chatClose=rmaChatRoot.querySelector('.rma-chat-close');
const chatMessages=rmaChatRoot.querySelector('.rma-chat-messages');
const chatForm=rmaChatRoot.querySelector('.rma-chat-form');
const chatInput=rmaChatRoot.querySelector('.rma-chat-input');
const chatChips=[...rmaChatRoot.querySelectorAll('.rma-chat-chip[data-prompt]')];
const requestChip=rmaChatRoot.querySelector('.rma-request-chip');
let chatStarted=false;
let requestState=null;

function openRmaChat(){chatPanel.classList.add('open');chatPanel.setAttribute('aria-hidden','false');chatLauncher.setAttribute('aria-expanded','true');if(!chatStarted){chatStarted=true;addRmaBotMessage('Hi — I’m the RMA Service Assistant. I can answer common questions and you can request an automotive service directly here in the chat.',[{label:'Request service',type:'book',primary:true},{label:'Call the shop',type:'call'}]);}setTimeout(()=>chatInput.focus(),120)}
function closeRmaChat(){chatPanel.classList.remove('open');chatPanel.setAttribute('aria-hidden','true');chatLauncher.setAttribute('aria-expanded','false')}
chatLauncher.addEventListener('click',()=>chatPanel.classList.contains('open')?closeRmaChat():openRmaChat());chatClose.addEventListener('click',closeRmaChat);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&chatPanel.classList.contains('open'))closeRmaChat()});

function addRmaUserMessage(text){const row=document.createElement('div');row.className='rma-chat-row user';const bubble=document.createElement('div');bubble.className='rma-chat-bubble';bubble.textContent=text;row.appendChild(bubble);chatMessages.appendChild(row);chatMessages.scrollTop=chatMessages.scrollHeight}
function addRmaBotMessage(text,actions=[]){const row=document.createElement('div');row.className='rma-chat-row bot';const bubble=document.createElement('div');bubble.className='rma-chat-bubble';bubble.textContent=text;if(actions.length){const wrap=document.createElement('div');wrap.className='rma-chat-actions';actions.forEach(action=>{if(action.type==='call'||action.type==='maps'){const a=document.createElement('a');a.className='rma-chat-action';a.href=action.type==='call'?'tel:3018818646':'https://maps.google.com/?q=1910+Rockville+Pike+Rockville+MD+20852';if(action.type==='maps'){a.target='_blank';a.rel='noopener'}a.textContent=action.label;wrap.appendChild(a);return}const b=document.createElement('button');b.type='button';b.className='rma-chat-action'+(action.primary?' primary':'');b.textContent=action.label;b.addEventListener('click',()=>{if(action.type==='book')startServiceRequest(action.option||'');if(action.type==='page-book')goToPageBooking();if(action.type==='prompt')handleRmaChat(action.prompt||action.label);if(action.type==='confirm-request')submitServiceRequest();if(action.type==='restart-request')startServiceRequest();if(action.type==='cancel-request')cancelServiceRequest()});wrap.appendChild(b)});bubble.appendChild(wrap)}row.appendChild(bubble);chatMessages.appendChild(row);chatMessages.scrollTop=chatMessages.scrollHeight}
function addCustomBotBubble(builder){const row=document.createElement('div');row.className='rma-chat-row bot';const bubble=document.createElement('div');bubble.className='rma-chat-bubble';builder(bubble);row.appendChild(bubble);chatMessages.appendChild(row);chatMessages.scrollTop=chatMessages.scrollHeight}

function goToPageBooking(){closeRmaChat();document.querySelector('#book')?.scrollIntoView({behavior:'smooth',block:'start'})}

const requestServices=['Oil Change & Maintenance','Diagnostics & Electrical','Brakes & Rotors','Cooling & Air Conditioning','Tires','Steering & Suspension'];
const requestFields=['year','make','model','date','name','phone'];
const requestPrompts={year:'What year is the vehicle?',make:'What make is it? (For example: Honda, Toyota, Ford)',model:'What model is it?',date:'What date would you prefer? You can type something like 2026-09-10 or September 10.',name:'What name should we put on the request?',phone:'What phone number should the shop use to reach you?'};

function startServiceRequest(preset=''){
  openRmaChat();
  requestState={step:preset?'year':'service',data:{service:preset,year:'',make:'',model:'',date:'',name:'',phone:''}};
  addRmaBotMessage(preset?`Great — I’ll start a ${preset} request here in the chat.`:'Absolutely. You can complete the service request right here. I’ll ask for the same basic details as the website form.');
  preset?askRequestField('year'):showServiceChoices();
}
function showServiceChoices(){requestState.step='service';addCustomBotBubble(bubble=>{const label=document.createElement('span');label.className='rma-request-label';label.textContent='Choose a service';bubble.appendChild(label);const list=document.createElement('div');list.className='rma-request-choices';requestServices.forEach(service=>{const b=document.createElement('button');b.type='button';b.className='rma-request-choice';b.textContent=service;b.addEventListener('click',()=>{if(!requestState)return;requestState.data.service=service;addRmaUserMessage(service);askRequestField('year')});list.appendChild(b)});bubble.appendChild(list)})}
function askRequestField(field){if(!requestState)return;requestState.step=field;const index=requestFields.indexOf(field);addRmaBotMessage(`${requestPrompts[field]}`);chatInput.placeholder=`Service request · ${index+1} of ${requestFields.length}`;setTimeout(()=>chatInput.focus(),80)}
function normalizeDate(value){const clean=value.trim();if(/^\d{4}-\d{2}-\d{2}$/.test(clean)){const d=new Date(clean+'T12:00:00');if(!Number.isNaN(d.getTime()))return clean}const parsed=new Date(clean);if(Number.isNaN(parsed.getTime()))return'';const y=parsed.getFullYear();const m=String(parsed.getMonth()+1).padStart(2,'0');const d=String(parsed.getDate()).padStart(2,'0');return`${y}-${m}-${d}`}
function processRequestInput(value){if(!requestState)return;const field=requestState.step;const clean=value.trim();if(clean.toLowerCase()==='cancel'){cancelServiceRequest();return}if(field==='year'){const y=Number(clean);const max=new Date().getFullYear()+1;if(!/^\d{4}$/.test(clean)||y<1900||y>max){addRmaBotMessage(`Please enter a four-digit vehicle year between 1900 and ${max}.`);return}requestState.data.year=clean}else if(field==='date'){const date=normalizeDate(clean);if(!date){addRmaBotMessage('I could not read that date. Try YYYY-MM-DD, for example 2026-09-10.');return}requestState.data.date=date}else if(field==='phone'){const digits=clean.replace(/\D/g,'');if(digits.length<10){addRmaBotMessage('Please enter a phone number with at least 10 digits.');return}requestState.data.phone=clean}else{if(clean.length<2){addRmaBotMessage('Please enter a little more information so I can add it to the request.');return}requestState.data[field]=clean}const index=requestFields.indexOf(field);if(index<requestFields.length-1)askRequestField(requestFields[index+1]);else showRequestSummary()}
function showRequestSummary(){if(!requestState)return;requestState.step='confirm';chatInput.placeholder='Ask another question...';const d=requestState.data;addCustomBotBubble(bubble=>{const p=document.createElement('div');p.className='rma-request-progress';p.textContent='Review service request';bubble.appendChild(p);const intro=document.createElement('div');intro.textContent='Here’s what I have. If everything looks right, submit the request.';bubble.appendChild(intro);const summary=document.createElement('div');summary.className='rma-request-summary';[['Service',d.service],['Vehicle',`${d.year} ${d.make} ${d.model}`],['Preferred date',d.date],['Name',d.name],['Phone',d.phone]].forEach(([label,value])=>{const line=document.createElement('div');const a=document.createElement('span');a.textContent=label;const b=document.createElement('strong');b.textContent=value;line.append(a,b);summary.appendChild(line)});bubble.appendChild(summary);const actions=document.createElement('div');actions.className='rma-chat-actions';const submit=document.createElement('button');submit.type='button';submit.className='rma-chat-action primary';submit.textContent='Submit request';submit.addEventListener('click',submitServiceRequest);const restart=document.createElement('button');restart.type='button';restart.className='rma-chat-action';restart.textContent='Start over';restart.addEventListener('click',()=>startServiceRequest());actions.append(submit,restart);bubble.appendChild(actions)})}
function submitServiceRequest(){if(!requestState)return;const d=requestState.data;if(bookingForm){const set=(name,value)=>{const el=bookingForm.querySelector(`[name="${name}"]`);if(el)el.value=value};set('service',d.service);set('year',d.year);set('make',d.make);set('model',d.model);set('date',d.date);set('name',d.name);set('phone',d.phone);bookingForm.requestSubmit?.()}requestState=null;chatInput.placeholder='Ask about service, hours, location...';addRmaBotMessage('Request received in this website demo. I added all of your details to the RMA service request flow. On a live version, this same step can send the request directly to the shop’s booking system.',[{label:'View request form',type:'page-book'},{label:'Call RMA BP',type:'call'}])}
function cancelServiceRequest(){requestState=null;chatInput.placeholder='Ask about service, hours, location...';addRmaBotMessage('No problem — I canceled that service request. You can start a new one anytime.',[{label:'Start new request',type:'book'}])}

function getRmaReply(raw){const message=raw.toLowerCase();const has=(...terms)=>terms.some(term=>message.includes(term));if(has('fire','smoke','burning','brake failure','no brakes','car is on fire'))return{text:'If the vehicle feels unsafe to drive, stop driving it. For smoke, fire, or immediate danger, move to a safe place away from the vehicle and contact emergency services. For repair guidance after that, call RMA BP at (301) 881-8646.',actions:[{label:'Call RMA BP',type:'call'}]};if(has('hour','open','close','saturday','sunday','time'))return{text:'The website lists RMA BP as open Monday through Saturday from 7:00 AM to 7:00 PM. For holiday or Sunday availability, call the shop to confirm.',actions:[{label:'Call (301) 881-8646',type:'call'}]};if(has('where','address','location','directions','rockville pike','map'))return{text:'RMA BP Automotive Service Center is at 1910 Rockville Pike, Rockville, MD 20852.',actions:[{label:'Open in Maps',type:'maps'},{label:'Call shop',type:'call'}]};if(has('phone','number','call','contact'))return{text:'The automotive shop number is (301) 881-8646.',actions:[{label:'Call now',type:'call'}]};if(has('price','cost','quote','estimate','how much'))return{text:'Repair pricing depends on the vehicle and what the inspection finds. The shop can give you the most accurate information after hearing the symptoms or seeing the car.',actions:[{label:'Call for pricing',type:'call'},{label:'Request service',type:'book',primary:true}]};if(has('check engine','engine light','warning light','diagnostic','rough idle','won\'t start','wont start','starting'))return{text:'That sounds like a good fit for Engine & Diagnostics. RMA BP can check warning lights, starting issues, engine controls, battery/charging concerns, and related electrical symptoms.',actions:[{label:'Request diagnostics',type:'book',option:'Diagnostics & Electrical',primary:true},{label:'Call shop',type:'call'}]};if(has('brake','squeak','squeal','soft pedal','stopping','rotor'))return{text:'RMA BP offers brake service for concerns like squeaking, vibration, worn pads or rotors, and changes in stopping feel.',actions:[{label:'Request brake service',type:'book',option:'Brakes & Rotors',primary:true}]};if(has('oil','maintenance','tune','scheduled service','routine'))return{text:'For routine care, choose Oil Change & Maintenance. That is the best starting point for oil service and general scheduled upkeep.',actions:[{label:'Request maintenance',type:'book',option:'Oil Change & Maintenance',primary:true}]};if(has('tire','flat','pressure','tread','wheel','vibration'))return{text:'RMA BP offers tire service and can help with tire wear, pressure concerns, vibration, and other road-contact issues.',actions:[{label:'Request tire service',type:'book',option:'Tires',primary:true}]};if(has('a/c','ac ','air conditioning','coolant','overheat','overheating','temperature','radiator','heat not'))return{text:'That fits Cooling & Air Conditioning service. Weak A/C, coolant concerns, overheating, and cooling-system issues are good reasons to have the car checked.',actions:[{label:'Request cooling / A/C',type:'book',option:'Cooling & Air Conditioning',primary:true}]};if(has('suspension','steering','shock','strut','pulling','ride','bumpy'))return{text:'RMA BP lists steering and suspension service for ride, handling, shock, strut, and related concerns.',actions:[{label:'Request suspension service',type:'book',option:'Steering & Suspension',primary:true}]};if(has('book','appointment','schedule','request service','make an appointment'))return{text:'Yes — you can complete the service request directly here in the chatbot.',actions:[{label:'Start service request',type:'book',primary:true}]};if(has('service','what do you do','what can you fix','repair'))return{text:'RMA BP covers diagnostics and electrical work, brakes, oil and maintenance, tires, cooling and A/C, and steering and suspension. Tell me what your car is doing and I’ll point you to the best starting service.',actions:[{label:'Request service',type:'book',primary:true},{label:'Check engine',type:'prompt',prompt:'My check engine light is on'}]};if(has('hello','hi','hey'))return{text:'Hi! Tell me what is going on with your car, or ask me about RMA BP services, hours, location, or booking.',actions:[{label:'Request service',type:'book',primary:true},{label:'Hours & location',type:'prompt',prompt:'What are your hours and location?'}]};return{text:'I can help with common RMA BP questions about diagnostics, brakes, oil changes, tires, A/C, suspension, hours, location, and service requests.',actions:[{label:'Request service',type:'book',primary:true},{label:'Call the shop',type:'call'}]}}
function handleRmaChat(text){const clean=text.trim();if(!clean)return;addRmaUserMessage(clean);chatInput.value='';setTimeout(()=>{const reply=getRmaReply(clean);addRmaBotMessage(reply.text,reply.actions||[])},220)}

chatForm.addEventListener('submit',e=>{e.preventDefault();const value=chatInput.value.trim();if(!value)return;addRmaUserMessage(value);chatInput.value='';if(requestState&&requestState.step!=='service'&&requestState.step!=='confirm'){processRequestInput(value);return}if(requestState&&requestState.step==='confirm'){addRmaBotMessage('Use “Submit request” above to send these details, or type “cancel” to stop.');if(value.toLowerCase()==='cancel')cancelServiceRequest();return}setTimeout(()=>{const reply=getRmaReply(value);addRmaBotMessage(reply.text,reply.actions||[])},220)});
chatChips.forEach(chip=>chip.addEventListener('click',()=>{openRmaChat();handleRmaChat(chip.dataset.prompt||chip.textContent)}));
requestChip.addEventListener('click',()=>startServiceRequest());
