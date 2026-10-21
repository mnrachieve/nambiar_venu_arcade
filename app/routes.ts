export const pageRoutes:Record<string,string>={home:'/',about:'/about/',project:'/projects/', 'completed-projects':'/projects/',gallery:'/gallery/',amenities:'/amenities/',plans:'/floor-plans/',specifications:'/specifications/',location:'/location/',enquire:'/contact/',architecture:'/projects/venu-arcade/'};
export function imageRoute(src:string){
 if(src.includes('/completed/'))return `/projects/${src.split('/').pop()!.split('.')[0]}/`;
 if(src.includes('mnr-logo'))return '/';
 return `/gallery/${src.split('/').pop()!.split('.')[0]}/`;
}
