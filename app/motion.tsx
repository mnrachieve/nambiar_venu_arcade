'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowUpRight,ArrowDown,ArrowLeft,ArrowRight,Pause,Play,Plus} from 'lucide-react';
import {imageRoute} from './routes';
import {gallery} from './project-data';

const scenes=[
  {src:'/assets/exterior-day.jpg',label:'The arrival'},
  {src:'/assets/exterior-evening.jpg',label:'After the sun goes down'},
  {src:'/assets/terrace.jpg',label:'A fresh perspective'},
];

export function CinematicHero(){
  const[scene,setScene]=useState(0),[previous,setPrevious]=useState<number|null>(null),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true),[inView,setInView]=useState(true),[tabVisible,setTabVisible]=useState(true);
  const hero=useRef<HTMLElement>(null),elapsed=useRef(0);
  useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(q.matches);update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.05});if(hero.current)observer.observe(hero.current);const visibility=()=>setTabVisible(!document.hidden);visibility();document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}},[]);
  useEffect(()=>{if(paused||reduced||!inView||!tabVisible)return;let frame=0,last=performance.now();const tick=(now:number)=>{elapsed.current+=Math.min(now-last,100);last=now;hero.current?.style.setProperty('--scene-progress',String(Math.min(1,elapsed.current/7500)));if(elapsed.current>=7500){elapsed.current=0;setPrevious(scene);setScene((scene+1)%scenes.length);return}frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[scene,paused,reduced,inView,tabVisible]);
  const choose=(index:number)=>{if(index===scene)return;elapsed.current=0;hero.current?.style.setProperty('--scene-progress','0');setPrevious(scene);setScene(index)};
  return <section ref={hero} className={`cinematic-hero ${paused||reduced||!inView||!tabVisible?'is-paused':''}`} aria-label="Venu Arcade project introduction">
    <div className="cinematic-scenes">{scenes.map((item,i)=><div key={item.src} className={`cinematic-scene ${i===scene?'is-active':i===previous?'is-previous':''}`} aria-hidden={i!==scene}><a className="image-page-link" href={imageRoute(item.src)} tabIndex={i===scene?0:-1}><img src={item.src} alt={i===scene?`Venu Arcade brochure rendering: ${item.label}`:''} fetchPriority={i===0?'high':'auto'}/></a></div>)}</div>
    <div className="cinematic-shade"/>
    <div className="cinematic-title"><p className="eyebrow">NAMBIAR VENU ARCADE · BOBBILI</p><h1><span><i>Life, beautifully</i></span><span><i><em>composed.</em></i></span></h1><a className="hero-discover" href="/about/">DISCOVER A NEW WAY TO LIVE <ArrowUpRight size={20}/></a></div>
    <div className="cinematic-bottom"><a className="hero-scroll" href="/about/"><span><ArrowDown size={18}/></span>EXPLORE THE PROJECT</a><span className="cinematic-disclaimer">ORIGINAL PROJECT RENDERINGS</span><div className="scene-controls"><span className="scene-label" key={scene}>{scenes[scene].label}</span>{scenes.map((item,i)=><button key={item.src} className={i===scene?'active':''} onClick={()=>choose(i)} aria-label={`Show ${item.label}`} aria-pressed={i===scene}><span>0{i+1}</span><i/></button>)}<button className="scene-pause" onClick={()=>setPaused(!paused)} disabled={reduced} aria-label={paused?'Resume slideshow':'Pause slideshow'}>{paused||reduced?<Play size={15}/>:<Pause size={15}/>}</button></div></div>
  </section>
}

export function SplitTitle({first,second}:{first:string;second:string}){
  let index=0;
  return <h2 className="split-title reveal" aria-label={`${first} ${second}`}>{[first,second].map((line,j)=><span className={`split-line line-${j}`} aria-hidden="true" key={line}>{line.split(' ').map((word,i)=><span className="word-mask" key={i}><span className="word-inner" style={{'--word-index':index++} as CSSProperties}>{word}</span>{' '}</span>)}</span>)}</h2>
}

export function ScrollMotion(){
  const progress=useRef<HTMLDivElement>(null),cursor=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
    const hero=document.querySelector<HTMLElement>('.cinematic-scenes'),heroText=document.querySelector<HTMLElement>('.cinematic-title');
    const parallax=Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const statement=document.querySelector<HTMLElement>('.reading-statement');
    const words=Array.from(document.querySelectorAll<HTMLElement>('.reading-word'));
    const aperture=document.querySelector<HTMLElement>('.feature-image');
    const items=Array.from(document.querySelectorAll<HTMLElement>('.brochure-spec-item,.amenity-list li'));
    let frame=0,pointerFrame=0,magnetic:HTMLElement|null=null,tilt:HTMLElement|null=null,magnetBox:DOMRect|null=null;
    let targetX=0,targetY=0,currentX=0,currentY=0,mouseX=0,mouseY=0,cursorX=0,cursorY=0,cursorVisible=false;
    const clamp=(n:number,a=0,b=1)=>Math.min(b,Math.max(a,n));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-visible');observer.unobserve(entry.target)}}),{threshold:.18});
    items.forEach((item,index)=>{item.classList.add('motion-item');item.style.setProperty('--item-delay',`${index%4*55}ms`);observer.observe(item)});
    const update=()=>{
      frame=0;
      const total=document.documentElement.scrollHeight-innerHeight;
      progress.current?.style.setProperty('--page-progress',String(total>0?clamp(scrollY/total):0));
      if(reduced.matches)return;
      if(hero&&scrollY<innerHeight*1.5)hero.style.transform=`translate3d(0,${Math.min(scrollY*.22,230)}px,0)`;
      if(heroText&&scrollY<innerHeight*1.2){heroText.style.setProperty('--hero-text-y',`${scrollY*.09}px`);heroText.style.setProperty('--hero-text-opacity',String(clamp(1-scrollY/(innerHeight*.65))))}
      parallax.forEach(el=>{const parent=el.parentElement;const r=(parent?.classList.contains("image-page-link")?parent.parentElement:parent)?.getBoundingClientRect();if(r&&r.bottom>0&&r.top<innerHeight){const shift=clamp((innerHeight*.5-r.top-r.height*.5)*.085,-48,48);el.style.transform=`translate3d(0,${shift}px,0) scale(1.13)`}});
      if(statement){const r=statement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const read=clamp((innerHeight*.85-r.top)/(innerHeight*.6));words.forEach((word,i)=>word.style.setProperty('--word-opacity',String(.3+.7*clamp((read-i/words.length)*8))))}}
      if(aperture){const r=aperture.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const reveal=clamp((innerHeight-r.top)/(innerHeight*.8));aperture.style.setProperty('--aperture-inset',`${(1-reveal)*9}%`);aperture.style.setProperty('--aperture-radius',`${220-reveal*125}px`)}}
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update)};
    const spring=()=>{
      pointerFrame=0;currentX+=(targetX-currentX)*.18;currentY+=(targetY-currentY)*.18;
      magnetic?.style.setProperty('--magnet-x',`${currentX.toFixed(2)}px`);magnetic?.style.setProperty('--magnet-y',`${currentY.toFixed(2)}px`);
      cursorX+=(mouseX-cursorX)*.22;cursorY+=(mouseY-cursorY)*.22;
      if(cursorVisible&&cursor.current)cursor.current.style.transform=`translate3d(${cursorX.toFixed(2)}px,${cursorY.toFixed(2)}px,0)`;
      if(Math.abs(currentX-targetX)>.05||Math.abs(currentY-targetY)>.05||(cursorVisible&&(Math.abs(cursorX-mouseX)>.2||Math.abs(cursorY-mouseY)>.2)))pointerFrame=requestAnimationFrame(spring);
    };
    const pointer=(e:PointerEvent)=>{
      if(reduced.matches||!fine.matches||e.pointerType!=='mouse')return;
      const target=e.target instanceof Element?e.target:null;
      const next=target?.closest<HTMLElement>('.outline-link,.hero-discover,.submit,.carousel-footer button,.scene-pause,.menu-button,.spec-download-bar a')||null;
      if(next!==magnetic){if(magnetic){magnetic.style.setProperty('--magnet-x','0px');magnetic.style.setProperty('--magnet-y','0px')}magnetic=next;magnetBox=next?.getBoundingClientRect()||null;currentX=currentY=0}
      targetX=magnetBox?clamp((e.clientX-magnetBox.left-magnetBox.width/2)*.18,-9,9):0;targetY=magnetBox?clamp((e.clientY-magnetBox.top-magnetBox.height/2)*.18,-7,7):0;
      const frameTarget=target?.closest<HTMLElement>('.carousel-main>div')||null;
      if(tilt!==frameTarget){tilt?.style.setProperty('--tilt-x','0deg');tilt?.style.setProperty('--tilt-y','0deg');tilt=frameTarget}
      if(tilt){const r=tilt.getBoundingClientRect();tilt.classList.add('motion-depth');tilt.style.setProperty('--tilt-x',`${clamp((.5-(e.clientY-r.top)/r.height)*5,-2.5,2.5)}deg`);tilt.style.setProperty('--tilt-y',`${clamp(((e.clientX-r.left)/r.width-.5)*5,-2.5,2.5)}deg`)}
      const nextVisible=!!target?.closest('.carousel-main,.spec-photo,.floor-plan,.location-map');
      if(nextVisible&&!cursorVisible){cursorX=e.clientX;cursorY=e.clientY}
      cursorVisible=nextVisible;mouseX=e.clientX;mouseY=e.clientY;cursor.current?.classList.toggle('is-visible',cursorVisible);
      if(!pointerFrame)pointerFrame=requestAnimationFrame(spring);
    };
    const clearPointer=()=>{targetX=targetY=0;cursorVisible=false;cursor.current?.classList.remove('is-visible');tilt?.style.setProperty('--tilt-x','0deg');tilt?.style.setProperty('--tilt-y','0deg');if(!pointerFrame)pointerFrame=requestAnimationFrame(spring)};
    const reset=()=>{if(reduced.matches){[hero,...parallax].forEach(el=>el?.style.removeProperty('transform'));heroText?.style.removeProperty('--hero-text-y');heroText?.style.removeProperty('--hero-text-opacity');words.forEach(word=>word.style.setProperty('--word-opacity','1'));aperture?.style.removeProperty('--aperture-inset');aperture?.style.removeProperty('--aperture-radius');clearPointer()}request()};
    addEventListener('scroll',request,{passive:true});addEventListener('resize',request);document.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerleave',clearPointer);document.addEventListener('pointerdown',clearPointer,{passive:true});reduced.addEventListener('change',reset);fine.addEventListener('change',clearPointer);request();
    return()=>{removeEventListener('scroll',request);removeEventListener('resize',request);document.removeEventListener('pointermove',pointer);document.removeEventListener('pointerleave',clearPointer);document.removeEventListener('pointerdown',clearPointer);reduced.removeEventListener('change',reset);fine.removeEventListener('change',clearPointer);observer.disconnect();cancelAnimationFrame(frame);cancelAnimationFrame(pointerFrame);items.forEach(item=>item.classList.remove('motion-item'))};
  },[]);
  return <><div className="page-progress" ref={progress} aria-hidden="true"/><div className="motion-cursor" ref={cursor} aria-hidden="true"><span>VIEW<Plus size={14}/></span></div></>;
}

export function ScrollStatement({text}:{text:string}){return <p className="reading-statement">{text.split(' ').map((word,index)=><span className="reading-word" key={index}>{word}{' '}</span>)}</p>}

export function ProjectCarousel({onView}:{onView:(item:{src:string;title:string})=>void}){
  const[filter,setFilter]=useState('All'),[index,setIndex]=useState(0),[outgoing,setOutgoing]=useState<{src:string;title:string}|null>(null),[direction,setDirection]=useState(1);const start=useRef<number|null>(null);
  const items=gallery.filter((_,i)=>filter==='All'||(filter==='Architecture'?[0,1,2,5].includes(i):[3,4].includes(i)));
  const item=items[index]||items[0],next=items[(index+1)%items.length];
  const select=(next:number)=>{setOutgoing(item);setDirection(next>=index?1:-1);setIndex((next+items.length)%items.length)};
  return <section className="reference-gallery section" id="gallery"><div className="reference-gallery-heading"><SplitTitle first="Explore" second="Venu Arcade."/><div className="gallery-filters" role="group" aria-label="Filter project images">{['All','Architecture','Outdoor spaces'].map(f=><button key={f} aria-pressed={f===filter} onClick={()=>{setOutgoing(null);setFilter(f);setIndex(0)}}>{f}</button>)}</div></div>
    <div className="carousel-stage reveal" style={{'--slide-direction':direction} as CSSProperties} onTouchStart={e=>start.current=e.touches[0].clientX} onTouchEnd={e=>{if(start.current!==null){const delta=e.changedTouches[0].clientX-start.current;if(Math.abs(delta)>50)select(index+(delta<0?1:-1));start.current=null}}}>
      <button className="gallery-tile carousel-main" key={item.src} onClick={()=>onView(item)} aria-label={`Enlarge ${item.description}`}><div>{outgoing&&<img className="carousel-outgoing" src={outgoing.src} alt="" aria-hidden="true"/>}<img className="carousel-current" src={item.src} alt={item.description+' of Venu Arcade'}/><span><Plus size={25}/></span><b>{item.description}</b></div><h3>{item.title}</h3></button>
      <button className="carousel-peek" onClick={()=>onView(next)} aria-label={`View details: ${next.description}`}><img src={next.src} alt=""/><span>NEXT VIEW <ArrowRight size={25}/></span></button>
    </div><div className="carousel-footer"><p aria-live="polite"><span>{String(index+1).padStart(2,'0')}</span> / {String(items.length).padStart(2,'0')} <small>ORIGINAL BROCHURE RENDERINGS</small></p><div><button aria-label="Previous project image" onClick={()=>select(index-1)}><ArrowLeft/></button><button aria-label="Next project image" onClick={()=>select(index+1)}><ArrowRight/></button></div></div>
  </section>
}
