import{a as e,n as t,r as n,s as r,t as i}from"./auth-BFR1T5uo.js";/* empty css              */import{n as a,t as o}from"./history-KNf5dX_c.js";document.addEventListener(`DOMContentLoaded`,async function(){let s=await e();if(!s){window.location.href=`login.html`;return}document.querySelectorAll(`[data-auth-name]`).forEach(function(e){e.textContent=s.name||`User`}),document.getElementById(`userEmail`).textContent=s.email||``,document.getElementById(`logoutBtn`).addEventListener(`click`,async function(){(await r()).success?window.location.href=`login.html`:alert(`Logout failed / ចាកចេញមិនបានទេ`)});async function c(){let e=document.getElementById(`dashboardHistory`);e.innerHTML=`
              <p class="text-secondary text-center py-4 mb-0">
                Loading...
              </p>
            `;try{let r=await n();if(document.getElementById(`statCount`).textContent=r.length,!r||r.length===0){e.innerHTML=`
                  <p class="text-secondary text-center py-4 mb-0">
                    No calculation history yet. /
                    មិនទាន់មានប្រវត្តិទេ
                  </p>
                `;return}let i=localStorage.getItem(`language`)||`en`;e.innerHTML=r.map(function(e){let t=a(e,i),n=o(e),r=``;return e.createdAt&&typeof e.createdAt.toDate==`function`?r=e.createdAt.toDate().toLocaleString():e.date?r=e.date:e.created_at&&(r=e.created_at),`

                    <div
                      class="history-item border rounded p-3 mb-2"
                    >

                      <div
                        class="d-flex justify-content-between align-items-start gap-3"
                      >

                        <div>

                          <div
                            class="history-calculator fw-semibold"
                          >
                            ${t}
                          </div>


                          <div
                            class="history-result mt-1 small"
                          >
                            ${n}
                          </div>


                          <small
                            class="text-secondary"
                          >
                            ${r}
                          </small>

                        </div>


                        <button
                          type="button"
                          class="btn btn-sm btn-outline-danger"
                          data-id="${String(e.id)}"
                        >

                          <i class="bi bi-trash"></i>

                        </button>

                      </div>

                    </div>

                  `}).join(``),e.querySelectorAll(`button[data-id]`).forEach(function(e){e.addEventListener(`click`,async function(){let n=e.getAttribute(`data-id`),r=await t(n);r&&r.success?await c():alert(`Cannot delete history / មិនអាចលុបប្រវត្តិបានទេ`)})})}catch(t){console.error(`Dashboard history error:`,t),e.innerHTML=`
                <p class="text-danger text-center py-4 mb-0">
                  Cannot load history /
                  មិនអាចទាញយកប្រវត្តិបានទេ
                </p>
              `}}document.getElementById(`clearAllBtn`).addEventListener(`click`,async function(){if(!confirm(`Clear all history? / លុបប្រវត្តិទាំងអស់?`))return;let e=await i();e&&e.success?await c():alert(`Cannot clear history / មិនអាចលុបប្រវត្តិបានទេ`)}),await c()});