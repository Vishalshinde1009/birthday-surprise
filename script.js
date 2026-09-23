const photos = ['assets/teacher1.jpg','assets/teacher2.jpg','assets/teacher3.jpg'];
const audio = document.getElementById('birthdayMusic');
const musicButton = document.getElementById('musicButton');
const toast = document.getElementById('toast');
let photoIndex = 0, shieldClicks = 0;

document.querySelectorAll('[data-photo]').forEach(img => {
  img.addEventListener('load', () => { img.dataset.loaded = 'true'; const fallback = img.nextElementSibling; if (fallback?.classList.contains('media-fallback')) fallback.hidden = true; });
  img.addEventListener('error', () => img.remove());
});
function showToast(message){ toast.textContent = message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 3500); }
function setMusicLabel(playing){ musicButton.classList.toggle('playing', playing); musicButton.setAttribute('aria-pressed', playing); musicButton.querySelector('span:last-child').textContent = playing ? 'Ⅱ Pause Music' : '♪ Play Birthday Song'; }
musicButton.addEventListener('click', async () => { if(audio.paused){ try { await audio.play(); setMusicLabel(true); } catch { showToast('Add your birthday-song.mp3 to the assets folder to play it.'); } } else { audio.pause(); setMusicLabel(false); }});
audio.addEventListener('ended',()=>setMusicLabel(false));

const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){e.target.classList.add('visible'); if(e.target.querySelector('#letterText')) document.getElementById('letterText').classList.add('active');}}),{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.getElementById('lightbox'), lightboxImage=document.getElementById('lightboxImage');
function openPhoto(index){ photoIndex=index; lightboxImage.src=photos[photoIndex]; lightboxImage.alt=`Teacher memory ${photoIndex+1}`; lightbox.showModal(); }
document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>openPhoto(Number(card.dataset.index))));
document.querySelector('.close-lightbox').addEventListener('click',()=>lightbox.close());
document.querySelector('.previous').addEventListener('click',()=>openPhoto((photoIndex+photos.length-1)%photos.length));
document.querySelector('.next').addEventListener('click',()=>openPhoto((photoIndex+1)%photos.length));
lightbox.addEventListener('click',e=>{if(e.target===lightbox) lightbox.close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lightbox.close(); if(lightbox.open&&e.key==='ArrowLeft')openPhoto((photoIndex+2)%3); if(lightbox.open&&e.key==='ArrowRight')openPhoto((photoIndex+1)%3); if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='s'){e.preventDefault();showToast('Security Level: MAXIMUM 🔐');}});

function confetti(){for(let i=0;i<110;i++){let el=document.createElement('i');el.className='confetti';el.style.left=Math.random()*100+'vw';el.style.background=['#75d8ff','#a38bff','#e9c471','#ff91c7'][i%4];el.style.setProperty('--x',`${(Math.random()-.5)*260}px`);el.style.animationDelay=Math.random()*.55+'s';document.body.append(el);setTimeout(()=>el.remove(),3400)}}
document.getElementById('surpriseButton').addEventListener('click',async()=>{document.getElementById('surpriseMessage').hidden=false; confetti(); document.getElementById('surpriseMessage').scrollIntoView({behavior:'smooth',block:'center'}); if(audio.paused){try{await audio.play();setMusicLabel(true)}catch{showToast('Your surprise is ready. Add birthday-song.mp3 to enable music.')}}});
document.getElementById('shield').addEventListener('click',()=>{shieldClicks++; if(shieldClicks===5){showToast("ACCESS GRANTED — Teacher's Birthday Protocol Activated 🎂");confetti();shieldClicks=0;}});

const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');let dots=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight;dots=Array.from({length:Math.min(70,Math.floor(innerWidth/18))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.4+.2,v:Math.random()*.22+.05}))}function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#91dfff';dots.forEach(d=>{ctx.globalAlpha=.3;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,7);ctx.fill();d.y-=d.v;if(d.y<0)d.y=canvas.height});requestAnimationFrame(draw)}resize();draw();addEventListener('resize',resize);
