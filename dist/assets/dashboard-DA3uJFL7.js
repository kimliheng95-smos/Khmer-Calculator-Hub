import{t as e}from"./language-BCbXHEiN.js";import{a as t,n,r,s as i,t as a}from"./auth-CTlX_AaI.js";import{i as o,r as s}from"./history-CNzE-q1v.js";function c(){return e()===`kh`}function l(e,t){return c()?t:e}document.addEventListener(`DOMContentLoaded`,async function(){let c=await t();if(!c){window.location.href=`login.html`;return}document.querySelectorAll(`[data-auth-name]`).forEach(function(e){e.textContent=c.name||`User`}),document.getElementById(`userEmail`).textContent=c.email||``,document.getElementById(`logoutBtn`).addEventListener(`click`,async function(){(await i()).success?window.location.href=`login.html`:alert(l(`Logout failed.`,`ចាកចេញមិនបានទេ។`))});async function u(){let t=document.getElementById(`dashboardHistory`);t.innerHTML=`

              <p class="text-secondary text-center py-4 mb-0">

                ${l(`Loading...`,`កំពុងផ្ទុក...`)}

              </p>

            `;try{let i=await r();if(document.getElementById(`statCount`).textContent=i.length,!i||i.length===0){t.innerHTML=`

                  <p class="text-secondary text-center py-4 mb-0">

                    ${l(`No calculation history yet.`,`មិនទាន់មានប្រវត្តិការគណនាទេ។`)}

                  </p>

                `;return}let a=e();t.innerHTML=i.map(function(e){let t=o(e,a),n=s(e),r=``;return e.createdAt&&typeof e.createdAt.toDate==`function`?r=e.createdAt.toDate().toLocaleString(a===`kh`?`km-KH`:`en-US`):e.date?r=e.date:e.created_at&&(r=e.created_at),`

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
                            title="${l(`Delete`,`លុប`)}"
                          >

                            <i class="bi bi-trash"></i>

                          </button>

                        </div>

                      </div>

                    `}).join(``),t.querySelectorAll(`button[data-id]`).forEach(function(e){e.addEventListener(`click`,async function(){let t=e.getAttribute(`data-id`),r=await n(t);r&&r.success?await u():alert(l(`Cannot delete history.`,`មិនអាចលុបប្រវត្តិបានទេ។`))})})}catch(e){console.error(`Dashboard history error:`,e),t.innerHTML=`

                <p class="text-danger text-center py-4 mb-0">

                  ${l(`Cannot load history.`,`មិនអាចទាញយកប្រវត្តិបានទេ។`)}

                </p>

              `}}document.getElementById(`clearAllBtn`).addEventListener(`click`,async function(){if(!confirm(l(`Clear all history?`,`តើអ្នកចង់លុបប្រវត្តិទាំងអស់មែនទេ?`)))return;let e=await a();e&&e.success?await u():alert(l(`Cannot clear history.`,`មិនអាចលុបប្រវត្តិទាំងអស់បានទេ។`))}),await u()});