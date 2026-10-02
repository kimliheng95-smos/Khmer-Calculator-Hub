import"./language-BCbXHEiN.js";function e(e,t){return typeof translations<`u`&&typeof currentLanguage<`u`&&translations[currentLanguage]&&translations[currentLanguage][e]?translations[currentLanguage][e]:t}function t(){let t=document.getElementById(`numberInputs`),r=document.createElement(`div`);r.className=`number-row`,r.innerHTML=`
    <input
      type="number"
      class="form-control number-input"
      placeholder="${e(`exampleNumber`,`Example: 100`)}"
      step="any"
    >

    <button
      type="button"
      class="btn btn-outline-danger remove-number"
    >
      <i class="bi bi-trash"></i>
    </button>
  `,t.appendChild(r),n()}function n(){let e=document.querySelectorAll(`.number-row`),t=document.querySelectorAll(`.remove-number`);e.length===1?t[0].disabled=!0:t.forEach(function(e){e.disabled=!1})}function r(e){let t=e.closest(`.number-row`);t&&(document.querySelectorAll(`.number-row`).length<=1||(t.remove(),n()))}function i(){let t=document.querySelectorAll(`.number-input`),n=[];if(t.forEach(function(e){let t=e.value.trim();t!==``&&n.push(Number(t))}),n.length===0){alert(e(`enterAtLeastOneNumber`,`Please enter at least one number.`));return}if(n.some(function(e){return isNaN(e)})){alert(e(`validNumbers`,`Please enter valid numbers.`));return}let r=n.reduce(function(e,t){return e+t},0),i=r/n.length,a=Math.min(...n),o=Math.max(...n);document.getElementById(`averageResult`).classList.remove(`d-none`),document.getElementById(`sumValue`).textContent=r.toFixed(2),document.getElementById(`averageValue`).textContent=i.toFixed(2),document.getElementById(`minimumValue`).textContent=a.toFixed(2),document.getElementById(`maximumValue`).textContent=o.toFixed(2),document.getElementById(`resultText`).textContent=e(`averageOfNumbers`,`Average of`)+` `+n.length+` `+e(`numbers`,`numbers`)+` = `+i.toFixed(2);let s=getHistory(),c={id:Date.now(),calculator:`Average Calculator`,calculatorType:`average`,data:{numbers:n,sum:r,average:i,minimum:a,maximum:o},date:new Date().toLocaleString()};s.unshift(c),s.length>20&&s.pop(),localStorage.setItem(HISTORY_KEY,JSON.stringify(s)),displayHistory(`historyContainer`)}function a(){confirm(e(`confirmClearHistory`,`Are you sure you want to clear all calculation history?`))&&(clearHistory(),displayHistory(`historyContainer`))}document.addEventListener(`DOMContentLoaded`,function(){let e=document.getElementById(`addNumberButton`);e&&e.addEventListener(`click`,t);let o=document.getElementById(`calculateAverageButton`);o&&o.addEventListener(`click`,i);let s=document.getElementById(`clearAverageHistoryButton`);s&&s.addEventListener(`click`,a),document.addEventListener(`click`,function(e){let t=e.target.closest(`.remove-number`);t&&r(t)}),n(),displayHistory(`historyContainer`)});