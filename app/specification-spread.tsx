'use client';
import {ArrowUpRight,Plus} from 'lucide-react';
import {specifications} from './project-data';

function Specification({item,index}:{item:string[];index:number}){
  return <article className={`brochure-spec-item ${index%2?'spec-highlight':''}`}>
    <h3>{item[0]==='Doors'?'Main Door':item[0]}</h3>
    {item[0]==='Doors'?<><p>Designed teak door with teakwood frame.</p><p className="internal-door-label">Internal Doors</p><p>Well-seasoned wooden frames with waterproof flush doors.</p></>:<p>{item[1]}</p>}
  </article>
}

export default function SpecificationSpread({onView}:{onView:(item:{src:string;title:string})=>void}){
  return <section className="specification-section" id="specifications" aria-labelledby="specifications-heading">
    <div className="specification-spread">
      <div className="spec-collage reveal">
        <button className="spec-photo" onClick={()=>onView({src:'/assets/landscape.jpg',title:'Venu Arcade — landscaped frontage'})} aria-label="Enlarge landscaped frontage"><img src="/assets/landscape.jpg" alt="Original brochure rendering of the landscaped apartment frontage, pergolas and play area" loading="lazy"/><span><Plus size={20}/></span></button>
        <div className="spec-collage-band"><a className="image-page-link" href="/gallery/spec-project-name/"><img className="spec-project-name" src="/assets/spec-project-name.jpg" width={594} height={304} alt="Nambiar Venu Arcade" loading="lazy"/></a><a className="image-page-link" href="/gallery/spec-buddha/"><img className="spec-buddha" src="/assets/spec-buddha.jpg" width={434} height={304} alt="Golden Buddha artwork from the brochure" loading="lazy"/></a><div aria-hidden="true"/></div>
        <button className="spec-photo" onClick={()=>onView({src:'/assets/entrance.jpg',title:'Venu Arcade — entrance'})} aria-label="Enlarge the project entrance"><img src="/assets/entrance.jpg" alt="Original brochure rendering of the Venu Arcade entrance and landscaping" loading="lazy"/><span><Plus size={20}/></span></button>
      </div>
      <div className="spec-content">
        <div className="spec-columns">
          <div className="spec-left-column reveal">{specifications.slice(0,8).map((item,i)=><Specification key={item[0]} item={item} index={i}/>)}</div>
          <div className="spec-right-column reveal"><div className="spec-title-block"><a className="image-page-link" href="/gallery/spec-brand-panel/"><img src="/assets/spec-brand-panel.jpg" width={416} height={330} alt="Nambiar Venu Arcade" loading="lazy"/></a><h2 id="specifications-heading">SPECIFICATIONS</h2></div><div className="spec-right-items">{specifications.slice(8).map((item,i)=><Specification key={item[0]} item={item} index={i+1}/>)}</div><a className="image-page-link" href="/gallery/spec-family/"><img className="spec-family" src="/assets/spec-family.jpg" width={552} height={276} alt="Family pictured in the Venu Arcade brochure" loading="lazy"/></a></div>
        </div>
        <div className="spec-brochure-notes"><span>NOTES:</span><ol><li>Car parking, electricity, GST, stamps, registration department fees and government taxes/fees will be extra.</li><li>This brochure is a conceptual presentation, not a legal offering. Promoters reserve the right to alter elevations and plans as deemed fit.</li></ol></div>
      </div>
    </div>
    <div className="spec-download-bar"><span>CONSTRUCTION · FINISHES · EVERYDAY COMFORT</span><a href="/gallery/specifications/">VIEW ORIGINAL PAGE <ArrowUpRight size={16}/></a><a href="/assets/venu-arcade-brochure.pdf" download>DOWNLOAD BROCHURE <ArrowUpRight size={16}/></a></div>
  </section>
}
