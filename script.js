// Simple interactions: open/close modals, simulate impact numbers and form handling
document.addEventListener("DOMContentLoaded", function () {
  // elements
  const openDonate = document.getElementById("openDonate");
  const openDonate2 = document.getElementById("openDonate2");
  const donateTopBtn = document.getElementById("donateTopBtn");
  const modalDonate = document.getElementById("modalDonate");
  const closeDonate = document.getElementById("closeDonate");
  const cancelDonate = document.getElementById("cancelDonate");
  const donateForm = document.getElementById("donateForm");

  const openVolunteer = document.getElementById("openVolunteer");
  const modalVol = document.getElementById("modalVol");
  const closeVol = document.getElementById("closeVol");
  const cancelVol = document.getElementById("cancelVol");
  const volForm = document.getElementById("volForm");

  // open/close helpers
  function showModal(mod) { mod.classList.remove("hidden"); mod.setAttribute("aria-hidden","false"); }
  function hideModal(mod) { mod.classList.add("hidden"); mod.setAttribute("aria-hidden","true"); }

  openDonate?.addEventListener("click", ()=> showModal(modalDonate));
  openDonate2?.addEventListener("click", ()=> showModal(modalDonate));
  donateTopBtn?.addEventListener("click", ()=> showModal(modalDonate));

  closeDonate?.addEventListener("click", ()=> hideModal(modalDonate));
  cancelDonate?.addEventListener("click", ()=> hideModal(modalDonate));

  openVolunteer?.addEventListener("click", ()=> showModal(modalVol));
  closeVol?.addEventListener("click", ()=> hideModal(modalVol));
  cancelVol?.addEventListener("click", ()=> hideModal(modalVol));

  // Donate form submit (simulate scheduling)
  donateForm?.addEventListener("submit", function(e){
    e.preventDefault();
    const data = new FormData(donateForm);
    const name = data.get("name");
    hideModal(modalDonate);
    alert(`Thanks ${name}! Pickup scheduled. We will contact you soon.`);
    // you can send this data to your backend via fetch() later
    // update impact (simulate)
    incrementImpact('mealsCount', 3);
  });

  // Volunteer form submit
  volForm?.addEventListener("submit", function(e){
    e.preventDefault();
    const data = new FormData(volForm);
    const name = data.get("vname");
    hideModal(modalVol);
    alert(`Thank you ${name}! We will reach out for the orientation.`);
    incrementImpact('volunteersCount', 1);
  });

  // Simple impact counters animation
  animateImpact();

  function animateImpact(){
    // starting values - in real app fetch from API
    animateTo('mealsCount', 1240, 1200);
    animateTo('volunteersCount', 72, 60);
    animateTo('areasCount', 8, 7);
  }

  function animateTo(id, target, start=0){
    const el = document.getElementById(id);
    let value = start;
    const step = Math.max(1, Math.round((target-start)/60));
    const iv = setInterval(()=>{
      value += step;
      if(value >= target){ value = target; clearInterval(iv); }
      el.textContent = value;
    }, 20);
  }

  // small helper to increment counters on donate/volunteer
  function incrementImpact(id, add){
    const el = document.getElementById(id);
    const current = Number(el.textContent) || 0;
    el.textContent = current + add;
  }

  // close modal on ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      hideModal(modalDonate);
      hideModal(modalVol);
    }
  });
});
