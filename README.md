# MNR Achieve — Venu Arcade

Next.js marketing website with responsive navigation, scroll reveals, reduced-motion support, image lightbox, floor plan, amenities, construction specifications and enquiry email drafts.

Run `npm run dev`. Production: `npm run build` exports to `out/`.

Next.js uses `.next-cache/` for generated files because the old `.next/trace` is inaccessible on this Windows workspace. Stop an existing development server with Ctrl+C before starting another. If you need to clear the cache, stop Next.js first and remove only `.next-cache/` from the project directory.

## Content and assets
The seven-page `Brochure (1).pdf` provided by the user is available at `public/assets/venu-arcade-brochure.pdf`. Architecture, landscaping, entrance, terrace, floor plan and location-map assets are extracted directly from it. These are conceptual project renderings, not completed-property photographs. The header and footer use the original supplied MNR Achieve logo.

- Page 1: project name, Bobbili, affordable-luxury message, RERA P02100452525.
- Page 2: project introduction and daytime elevation.
- Page 3: typical floor plan (labeled areas 1,050–1,480 sq ft).
- Page 4: materials, construction, finishes, services and brochure qualifications.
- Page 5: ten amenities and evening elevation.
- Page 6: aerial and corner elevations.
- Page 7: location map, builder office, email and phone.

Structured amenities and specifications: `app/project-data.ts`.

Contact: +91 94922 26444; MNRACHIEVE@GMAIL.COM. Builder's office: D.No. 10-97, Opp. Grama Sachivalayam, Visalakshinagar, Visakhapatnam, Andhra Pradesh 530043. This is the office, not the Bobbili project address.

The enquiry form opens the visitor's email application with a draft. It does not automatically send or store leads. Call and email links work without the form.

Brochure qualifications about extra charges and conceptual renderings are retained in the footer. Current prices and availability should be confirmed directly. Fonts load from Google Fonts with local fallbacks.

## Reference-inspired layout and motion
The page follows Myscape's full-screen architectural opening, overlay navigation, editorial introduction, split philosophy panel, arched project feature and large project carousel. All branding, images, project facts and contacts belong to MNR Achieve / Venu Arcade.

`app/motion.tsx` provides a pausable three-image hero, scroll parallax, masked heading reveals and a filterable/swipeable project carousel. Animations use CSS and requestAnimationFrame; reduced-motion disables autoplay and movement. The brochure palette remains sand #D7C9A6, gold #C39B28, red #A5382B and charcoal #292721.
## Specifications spread
`app/specification-spread.tsx` recreates the brochure specification page with original landscape and entrance renderings, Buddha artwork, project-name panels and family photograph. The specification text stays selectable and reflows to one column on small phones. The desktop uses the brochure's paired columns and alternating cream panels. `scripts/export-specification-art.py` extracts its exact artwork regions from the supplied PDF.
## Advanced motion
The hero uses a shared animation clock for image zoom and slide progress, with pause/resume and automatic suspension outside the viewport or in hidden tabs. Layered image wipes, scroll-linked typography and image masks, a reading progress indicator, per-item specification reveals, pointer-responsive buttons, a subtle gallery tilt and contextual image cursor enhance the existing design. Touch devices retain swipe/navigation controls without pointer effects. System reduced-motion disables decorative movement and autoplay. No animation library was added.

## Opus Acres inspired redesign
The current design uses a black editorial canvas, oversized centered hero typography, alternating framed image sections, animated line art, and scroll-triggered project figures. Original Venu Arcade brochure images, specifications and contacts are retained. Figures describe brochure floor-plan areas and amenities, not company sales claims. Desktop links and a mobile menu navigate the sections; reduced-motion settings disable decorative movement. Development uses `.next-cache/`; production retains the standard static `out/` export.

## Completed projects
The owner requested VIP Towers, Fortune Heights, VIP Centre, Garden Villas and Palace Heights as completed projects, with Venu Arcade in Bobbili marked as the latest project. Names, completion years, locations, built-up areas and configurations come from https://opusacres.com/projects/. The five original project images are stored in `public/assets/completed/`; portfolio data and image-viewer controls are in `app/completed-projects.tsx`.

## Multipage navigation
Navigation now opens dedicated `/about/`, `/projects/`, `/gallery/`, `/amenities/`, `/floor-plans/`, `/specifications/`, `/location/` and `/contact/` pages. All six projects have `/projects/[slug]/` detail pages; brochure images have `/gallery/[slug]/` pages with context and related links. Clicking a project or gallery image opens its detail route instead of a modal. Shared content lives in `app/home-content.tsx`; all routes are statically exported with trailing slashes so direct links work on static hosting.

## Company legacy and ongoing projects
Company copy supplied by the owner introduces founder Mr. MAN Raju, the guidance and support of Mr. GS Raju garu, company achievements, vision, and 30 years of experience. Completed projects are now text-only on both the list and detail pages. Ongoing projects include Venu Arcade (Bobbili), Highway Commercial, Kohinoor Hills and Denkada; no unprovided specifications are inferred for the new projects. The supplied October 12 logo is displayed from `public/assets/mnr-logo-new.jpg`, with its surrounding whitespace framed in CSS.

## Restored project photography
The five original Opus Acres project images are restored on the completed-project portfolio and each completed-project detail page at the owner's request. Images continue to link to their dedicated project pages.
