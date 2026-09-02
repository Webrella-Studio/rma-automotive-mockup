const diagnosticData={
  engine:{title:'Engine & Diagnostics',copy:'Warning lights, rough running, starting issues, electrical faults and other symptoms can be checked through RMA BP diagnostic service.',option:'Diagnostics & Electrical'},
  brakes:{title:'Brake Service',copy:'Squeaking, vibration, soft pedal feel or longer stopping distance are good reasons to have the braking system inspected.',option:'Brakes & Rotors'},
  tires:{title:'Tire Service',copy:'Uneven wear, low pressure, vibration or aging tires can affect ride quality, handling and safety.',option:'Tires'},
  battery:{title:'Battery & Electrical',copy:'Slow starts, dim lights or intermittent electrical issues may point to the battery, charging system or related components.',option:'Diagnostics & Electrical'},
  cooling:{title:'Cooling & A/C',copy:'Temperature issues, weak A/C or coolant concerns can be checked before they turn into a larger repair.',option:'Cooling & Air Conditioning'}
};

const hotspots=[...document.querySelectorAll('.hotspot')];
const diagnosticTitle=document.querySelector('#diagnostic-title');
const diagnosticCopy=document.querySelector('#diagnostic-copy');
const diagnosticAction=document.querySelector('#diagnostic-action');
const serviceSelect=document.querySelector('#booking-form select[name="service"]');

function setDiagnostic(key){
  const item=diagnosticData[key];
  if(!item) return;
  hotspots.forEach(btn=>btn.classList.toggle('active',btn.dataset.service===key));
  if(diagnosticTitle) diagnosticTitle.textContent=item.title;
  if(diagnosticCopy) diagnosticCopy.textContent=item.copy;
  if(diagnosticAction) diagnosticAction.dataset.option=item.option;
}

hotspots.forEach(btn=>btn.addEventListener('click',()=>setDiagnostic(btn.dataset.service)));
setDiagnostic('engine');

diagnosticAction?.addEventListener('click',e=>{
  e.preventDefault();
  const option=diagnosticAction.dataset.option;
  if(serviceSelect && option){
    const found=[...serviceSelect.options].find(item=>item.textContent.trim()===option);
    if(found) serviceSelect.value=found.value || found.textContent;
  }
  document.querySelector('#book')?.scrollIntoView({behavior:'smooth',block:'start'});
});
