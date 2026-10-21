import Home from '../home-content';
import {notFound} from 'next/navigation';
const sections=['about','projects','gallery','amenities','floor-plans','specifications','location','contact'];
export const dynamicParams=false;
export function generateStaticParams(){return sections.map(section=>({section}))}
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const {section}=await params;return {title:`${section.replaceAll('-',' ')} | MNR Achieve`}}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!sections.includes(section))notFound();return <Home key={section} section={section}/>}
