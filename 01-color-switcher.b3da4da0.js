const t=document.body,e=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");let d=null;function o(){t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}a.disabled=!0,t.addEventListener("click",(function(t){t.target===e?(d=setInterval(o,1e3),e.disabled=!0,a.disabled=!1):t.target===a&&(clearInterval(d),e.disabled=!1,a.disabled=!0)}));
//# sourceMappingURL=01-color-switcher.b3da4da0.js.map
