const finderData={
  engine:{
    title:'Engine & Diagnostics',
    kicker:'ENGINE / ELECTRICAL',
    code:'DIAG',
    copy:'Check-engine lights, rough running, starting trouble or electrical symptoms are a good reason to begin with a diagnostic inspection.',
    option:'Diagnostics & Electrical',
    tags:['Warning lights','Starting issues','Electrical faults'],
    count:'01 / 05'
  },
  brakes:{
    title:'Brake Service',
    kicker:'BRAKING / SAFETY',
    code:'BRK',
    copy:'Squeaking, vibration, a soft pedal or longer stopping distance can point to worn brake components that should be inspected.',
    option:'Brakes & Rotors',
    tags:['Squeaking','Vibration','Stopping distance'],
    count:'02 / 05'
  },
  tires:{
    title:'Tire Service',
    kicker:'TIRES / ROAD CONTACT',
    code:'TIRE',
    copy:'Low pressure, uneven wear, vibration or an aging tire can affect handling, ride quality and road safety.',
    option:'Tires',
    tags:['Low pressure','Uneven wear','Vibration'],
    count:'03 / 05'
  },
  cooling:{
    title:'Cooling & A/C',
    kicker:'CLIMATE / TEMPERATURE',
    code:'HVAC',
    copy:'Weak air conditioning, coolant concerns or a rising temperature gauge can be checked before the problem becomes a larger repair.',
    option:'Cooling & Air Conditioning',
    tags:['Weak A/C','Overheating','Coolant concerns'],
    count:'04 / 05'
  },
  maintenance:{
    title:'Routine Maintenance',
    kicker:'PREVENTIVE / CARE',
    code:'MAINT',
    copy:'Oil changes and scheduled maintenance help keep everyday wear from turning into more expensive repairs later on.',
    option:'Oil Change & Maintenance',
    tags:['Oil change','Scheduled care','Road-ready check'],
    count:'05 / 05'
  }
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
          <button class="finder-option active" type="button" data-service="engine">
            <span class="finder-number">01</span>
            <span class="finder-option-copy"><strong>Warning light / engine issue</strong><small>Check-engine light, rough idle, trouble starting</small></span>
            <span class="finder-arrow">↗</span>
          </button>
          <button class="finder-option" type="button" data-service="brakes">
            <span class="finder-number">02</span>
            <span class="finder-option-copy"><strong>Brakes feel or sound off</strong><small>Squeaking, vibration, soft pedal, longer stops</small></span>
            <span class="finder-arrow">↗</span>
          </button>
          <button class="finder-option" type="button" data-service="tires">
            <span class="finder-number">03</span>
            <span class="finder-option-copy"><strong>Tire or ride problem</strong><small>Pressure, wear, vibration, road feel</small></span>
            <span class="finder-arrow">↗</span>
          </button>
          <button class="finder-option" type="button" data-service="cooling">
            <span class="finder-number">04</span>
            <span class="finder-option-copy"><strong>A/C or temperature issue</strong><small>Weak A/C, overheating, coolant concerns</small></span>
            <span class="finder-arrow">↗</span>
          </button>
          <button class="finder-option" type="button" data-service="maintenance">
            <span class="finder-number">05</span>
            <span class="finder-option-copy"><strong>Routine maintenance</strong><small>Oil change, scheduled care, general upkeep</small></span>
            <span class="finder-arrow">↗</span>
          </button>
        </div>
      </div>

      <aside class="finder-result" aria-live="polite">
        <div class="finder-result-top"><span>Recommended next step</span><span id="finder-count">01 / 05</span></div>
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

const finderOptions=[...document.querySelectorAll('.finder-option')];
const diagnosticTitle=document.querySelector('#diagnostic-title');
const diagnosticCopy=document.querySelector('#diagnostic-copy');
const diagnosticAction=document.querySelector('#diagnostic-action');
const finderKicker=document.querySelector('#finder-kicker');
const finderCode=document.querySelector('#finder-code');
const finderCount=document.querySelector('#finder-count');
const finderTags=document.querySelector('#finder-tags');
const serviceSelect=document.querySelector('#booking-form select[name="service"]');

function setFinder(key){
  const item=finderData[key];
  if(!item) return;

  finderOptions.forEach(btn=>btn.classList.toggle('active',btn.dataset.service===key));
  if(diagnosticTitle) diagnosticTitle.textContent=item.title;
  if(diagnosticCopy) diagnosticCopy.textContent=item.copy;
  if(finderKicker) finderKicker.textContent=item.kicker;
  if(finderCode) finderCode.textContent=item.code;
  if(finderCount) finderCount.textContent=item.count;
  if(finderTags) finderTags.innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join('');
  if(diagnosticAction) diagnosticAction.dataset.option=item.option;
}

finderOptions.forEach(btn=>btn.addEventListener('click',()=>setFinder(btn.dataset.service)));
setFinder('engine');

diagnosticAction?.addEventListener('click',e=>{
  e.preventDefault();
  const option=diagnosticAction.dataset.option;
  if(serviceSelect && option){
    const found=[...serviceSelect.options].find(item=>item.textContent.trim()===option);
    if(found) serviceSelect.value=found.value || found.textContent;
  }
  document.querySelector('#book')?.scrollIntoView({behavior:'smooth',block:'start'});
});
