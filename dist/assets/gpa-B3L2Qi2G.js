import"./ui-effects-FUMbQwWB.js";import"./history-Byon_6JU.js";function e(e,t){let n=window.currentLanguage===void 0?`en`:window.currentLanguage,r=window.translations;return r&&r[n]&&r[n][e]?r[n][e]:t}async function t(){let t=document.getElementById(`subjects`),n=document.createElement(`div`);n.className=`subject-row`,n.innerHTML=`
    <div class="row g-3 align-items-center">

      <div class="col-md-5">
        <input
          type="text"
          class="form-control subject-name"
          placeholder="${e(`subjectName`,`Subject name`)}"
        />
      </div>

      <div class="col-md-3">
        <input
          type="number"
          class="form-control subject-credit"
          placeholder="${e(`credit`,`Credit`)}"
          min="1"
          step="1"
        />
      </div>

      <div class="col-md-4">
        <select class="form-select subject-grade">

          <option value="">
            ${e(`selectGrade`,`Select Grade`)}
          </option>

          <option value="4">A</option>
          <option value="3">B</option>
          <option value="2">C</option>
          <option value="1">D</option>
          <option value="0">F</option>

        </select>
      </div>

    </div>
  `,t.appendChild(n)}async function n(){let t=document.querySelectorAll(`.subject-name`),n=document.querySelectorAll(`.subject-credit`),r=document.querySelectorAll(`.subject-grade`),i=0,a=0,o=[];for(let s=0;s<n.length;s++){let c=t[s].value.trim(),l=n[s].value,u=r[s].value;if(c===``&&l===``&&u===``)continue;if(l===``||u===``){alert(e(`completeSubject`,`Please complete subject credit and grade.`));return}let d=Number(l);if(!Number.isFinite(d)||d<=0){alert(e(`validCredit`,`Please enter a valid credit.`));return}let f=Number(u);i+=d,a+=d*f,o.push({name:c,credit:d,grade:f})}if(o.length===0){alert(e(`enterSubject`,`Please enter at least one subject.`));return}if(i===0){alert(e(`validCredit`,`Please enter a valid credit.`));return}let s=a/i,c=s.toFixed(2);document.getElementById(`gpaResult`).style.display=`block`,document.getElementById(`gpaValue`).textContent=c;let l=``;if(l=s>=3.5?e(`excellentResult`,`Excellent Result`):s>=3?e(`veryGoodResult`,`Very Good Result`):s>=2?e(`goodResult`,`Good Result`):e(`keepImproving`,`Keep Improving`),document.getElementById(`gpaMessage`).textContent=l,typeof window.saveHistory==`function`)try{await window.saveHistory({calculatorType:`gpa`,calculatorName:`GPA Calculator`,data:{subjects:o===void 0?[]:o,totalCredits:i===void 0?0:i,totalPoints:a===void 0?0:a,gpa:s,message:l===void 0?``:l},resultText:`GPA: ${s}`})}catch(e){console.error(`GPA Calculator saveHistory error:`,e)}else console.error(`saveHistory is not available on window`);typeof window.displayHistory==`function`&&await window.displayHistory(`historyContainer`)}async function r(){if(!confirm(e(`confirmClearHistory`,`Are you sure you want to clear all calculation history?`)))return;let t=window.HISTORY_KEY||`calculatorHistory`;localStorage.removeItem(t),typeof window.clearHistory==`function`&&window.clearHistory(),typeof window.displayHistory==`function`&&window.displayHistory(`historyContainer`)}window.addSubject=t,window.calculateGPA=n,window.clearGPAHistory=r,document.addEventListener(`DOMContentLoaded`,async function(){typeof window.displayHistory==`function`&&window.displayHistory(`historyContainer`)});