(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  var d=new Date();
  document.getElementById('today').textContent=d.toLocaleDateString('bn-BD',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  var DATA=[];
  fetch('data/amol.json').then(function(r){return r.json()}).then(function(j){
    DATA=j;var i=Math.floor(Date.now()/864e5)%j.length,a=j[i],box=document.getElementById('amol');
    var it=document.createElement('div');it.className='item';
    if(a.ar){var p=document.createElement('p');p.className='ar';p.textContent=a.ar;it.appendChild(p)}
    var t=document.createElement('p');t.textContent=a.bn;it.appendChild(t);box.appendChild(it);
  }).catch(function(){});
  var f=document.getElementById('searchForm'),q=document.getElementById('q'),R=document.getElementById('results');
  f.addEventListener('submit',function(e){
    e.preventDefault();var s=q.value.trim();R.textContent='';
    if(!s){R.hidden=true;return}
    var tiles=[].slice.call(document.querySelectorAll('.tile')).filter(function(t){return t.textContent.indexOf(s)>-1});
    var am=DATA.filter(function(x){return (x.bn+(x.ar||'')).indexOf(s)>-1});
    tiles.forEach(function(t){var a=document.createElement('a');a.href=t.getAttribute('href');a.textContent='বিভাগ: '+t.querySelector('b').textContent;R.appendChild(a)});
    am.forEach(function(x){var a=document.createElement('a');a.href='#amolH';a.textContent=x.bn;R.appendChild(a)});
    if(!R.children.length){var p=document.createElement('p');p.textContent='কিছু পাওয়া যায়নি। কনটেন্ট যোগ হলে এখানে সার্চ আরও কাজ করবে।';R.appendChild(p)}
    R.hidden=false;
  });
})();
