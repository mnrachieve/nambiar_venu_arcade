import Home from '../../home-content';
import {completedProjects} from '../../completed-data';
import {CompletedDetail} from '../../detail-content';
import {ongoingProjects,OngoingDetail} from '../../ongoing-projects';
import {notFound} from 'next/navigation';
export const dynamicParams=false;
export function generateStaticParams(){return [...ongoingProjects,...completedProjects].map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${slug==='venu-arcade'?'Venu Arcade — Latest Project':[...ongoingProjects,...completedProjects].find(p=>p.slug===slug)?.name||'Project'} | MNR Achieve`}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug==='venu-arcade')return <Home section="venu-arcade"/>;if(ongoingProjects.some(p=>p.slug===slug))return <Home key={slug} section="detail"><OngoingDetail slug={slug}/></Home>;if(!completedProjects.some(p=>p.slug===slug))notFound();return <Home key={slug} section="detail"><CompletedDetail slug={slug}/></Home>}
