import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as h,i as u}from"./assets/vendor-651d7991.js";const t={input:document.querySelector("#datetime-picker"),button:document.querySelector("[data-start]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};t.button.disabled=!0;const c={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(e[0]<=c.defaultDate)return u.error({title:"Hey",message:"Please choose a date in the future",position:"topRight"});u.success({title:"Hey",message:"Click on the Start button",position:"topRight"}),t.button.disabled=!1}};h(t.input,c);t.button.addEventListener("click",y);function y(e){const r=setInterval(()=>{const a=new Date,s=new Date(t.input.value)-a;if(s>0){t.button.disabled=!0,t.input.disabled=!0;const o=f(s);t.days.textContent=n(o.days),t.hours.textContent=n(o.hours),t.minutes.textContent=n(o.minutes),t.seconds.textContent=n(o.seconds)}else clearInterval(r)},1e3)}const n=e=>e.toString().padStart(2,"0");function f(e){const o=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:o,hours:d,minutes:l,seconds:m}}
//# sourceMappingURL=commonHelpers2.js.map