'use client';
import {ArrowUpRight,Plus} from 'lucide-react';
import {SplitTitle} from './motion';

// Project facts and original images: https://opusacres.com/projects/
// Completed status and inclusion in this portfolio requested by the site owner.
import {completedProjects as projects} from './completed-data';


export default function CompletedProjects({onView}:{onView:(image:{src:string;title:string})=>void}){
 return <section className="completed-projects section" id="completed-projects" aria-labelledby="completed-heading"><div className="completed-heading reveal"><div><p className="eyebrow">OUR COMPLETED PROJECTS</p><div id="completed-heading"><SplitTitle first="Places that stand" second="the test of time."/></div></div><a className="text-link" href="/projects/venu-arcade/">OUR LATEST PROJECT <ArrowUpRight size={17}/></a></div><div className="completed-list">{projects.map((p,i)=><article key={p.slug} className="completed-project reveal"><a className="completed-image" href={`/projects/${p.slug}/`} aria-label={`View ${p.name} details`}><img src={`/assets/completed/${p.slug}.png`} alt={`${p.name}, ${p.location}`} loading="lazy"/><span className="completed-badge">COMPLETED &middot; {p.year}</span><span className="completed-zoom"><Plus size={22}/></span></a><div className="completed-copy"><p className="eyebrow"><span>0{i+1}</span> {p.type}</p><h3><a href={`/projects/${p.slug}/`}>{p.name}</a></h3><p className="completed-location">{p.location}</p><p className="completed-description">{p.description}</p><dl><div><dt>Built-up area</dt><dd>{p.area} <small>sq ft</small></dd></div><div><dt>Configuration</dt><dd>{p.units}</dd></div><div><dt>Completed</dt><dd>{p.year}</dd></div></dl><button className="text-link" onClick={()=>onView({src:`/assets/completed/${p.slug}.png`,title:`${p.name} — completed ${p.year}`})}>VIEW PROJECT DETAILS <ArrowUpRight size={17}/></button></div></article>)}</div><div className="completed-next reveal"><p>Discover our latest chapter in Bobbili.</p><a className="outline-link" href="/projects/venu-arcade/">EXPLORE VENU ARCADE <ArrowUpRight size={18}/></a></div></section>
}
