(function(){

  var button = document.createElement('button');
  button.val = 'x'
  button.style.cssText = "position:fixed;z-index:100; bottom:0; right:0; width:20px; height:20px; background:red; opacity: 0.5; border:none; outline:none;";
  button.onclick = function(){
    logbar.innerHTML = '';
  }

  var logbar = document.createElement('div');
  logbar.style.cssText = "display: block; position:fixed;  z-index:10; font-size:12px; bottom:0; left:0; width: 100%; background: rgba(255, 255, 0, 0.8); z-index: 99; padding:10px; pointer-events: none; opacity: 0.7; padding-bottom:20px";
  logbar.innerHTML = '';
  document.getElementsByTagName('body')[0].appendChild(logbar);
  document.getElementsByTagName('body')[0].appendChild(button);

  function logSection(...args){
    args.forEach(e=>{
      logbar.innerHTML += `${ typeof e == 'object' ?  JSON.stringify(e, null, '\t') : e} <hr/>`
    })
  }
  
  const LOG = window.console.log
  window.console.log = function (...args){ 
    logSection(...args);
    LOG(...args);
    // console.dclog(...args);
  }
})()