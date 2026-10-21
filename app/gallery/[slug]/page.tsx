import Home from '../../home-content';
import {ImageDetail,imageDetails} from '../../detail-content';
import {notFound} from 'next/navigation';
export const dynamicParams=false;
export function generateStaticParams(){return imageDetails.map(i=>({slug:i.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${imageDetails.find(i=>i.slug===slug)?.title||'Gallery'} | Venu Arcade`}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!imageDetails.some(i=>i.slug===slug))notFound();return <Home key={slug} section="detail"><ImageDetail slug={slug}/></Home>}
