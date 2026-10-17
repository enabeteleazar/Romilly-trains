import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronRight, Film, Mail, MapPin, Menu, Phone, Play, TrainFront, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { articles, club, events, videos } from './content';

const queryClient = new QueryClient();
const navItems = [
  { label:'Le réseau', href:'/reseau' },
  { label:'Actualités', href:'/actualites' },
  { label:'Événements', href:'/evenements' },
  { label:'Vidéos', href:'/videos' },
  { label:'Contact', href:'/contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  return <>
    <div className="topline hidden sm:flex justify-between px-6 py-2.5 md:px-12">
      <span>AMFR · ROMILLY-SUR-SEINE</span><span>PASSIONNÉS DE TRAIN MINIATURE HO</span>
    </div>
    <header className="relative z-30 bg-[#f3f0e8]">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 md:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil AMFR Romilly-Trains">
          <span className="flex h-11 w-11 items-center justify-center bg-[#cc5838] text-[#fff8e9]"><TrainFront size={22} strokeWidth={1.6}/></span>
          <span className="leading-tight"><span className="block font-display text-[22px] font-semibold tracking-[-.04em]">Romilly<span className="text-[#cc5838]">-Trains</span></span><span className="font-mono text-[9px] uppercase tracking-[.17em] text-[#66716c]">Association modéliste ferroviaire</span></span>
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {navItems.map(item=><Link key={item.href} href={item.href} className={`nav-link ${path===item.href?'active':''}`}>{item.label}</Link>)}
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 bg-[#232c39] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#f3f0e8] transition-colors hover:bg-[#cc5838] lg:flex">Nous écrire <ArrowUpRight size={14}/></Link>
        <button type="button" aria-label={open?'Fermer le menu':'Ouvrir le menu'} aria-expanded={open} onClick={()=>setOpen(!open)} className="flex h-11 w-11 items-center justify-center border border-[#d5d0c4] lg:hidden">{open?<X size={20}/>:<Menu size={20}/>}</button>
      </div>
      {open&&<nav aria-label="Navigation mobile" className="absolute left-0 right-0 top-full border-t border-[#d5d0c4] bg-[#f3f0e8] px-6 py-4 shadow-lg lg:hidden">
        {navItems.map((item,i)=><Link onClick={()=>setOpen(false)} key={item.href} href={item.href} className={`flex items-center justify-between border-b border-[#ded9cd] py-4 text-sm font-bold ${path===item.href?'text-[#cc5838]':''}`}><span><span className="mr-4 font-mono text-[10px] text-[#a59d8e]">0{i+1}</span>{item.label}</span><ChevronRight size={16}/></Link>)}
      </nav>}
    </header>
  </>;
}

function Footer() {
  return <footer className="bg-[#232c39] text-[#f3f0e8]">
    <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-14 md:grid-cols-[1.2fr_.8fr_1fr] md:px-12 md:py-20">
      <div><div className="mb-5 flex items-center gap-3"><TrainFront className="text-[#d8b554]" size={25}/><span className="font-display text-2xl">Romilly-Trains</span></div><p className="max-w-sm text-sm leading-7 text-[#c4c5bf]">{club.description}</p><a href={club.source} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#d8b554] hover:text-white">Le blog d’origine <ArrowUpRight size={13}/></a></div>
      <div><p className="section-kicker mb-5 !text-[#d8b554]">Explorer</p><div className="grid gap-3 text-sm text-[#d1d1ca]">{navItems.map(n=><Link key={n.href} href={n.href} className="w-fit hover:text-white">{n.label}</Link>)}</div></div>
      <div><p className="section-kicker mb-5 !text-[#d8b554]">Prendre contact</p><a className="mb-3 flex items-center gap-3 text-sm hover:text-[#d8b554]" href={`mailto:${club.email}`}><Mail size={15}/>{club.email}</a><a className="flex items-center gap-3 text-sm hover:text-[#d8b554]" href={`tel:${club.phone.replaceAll(' ','')}`}><Phone size={15}/>{club.phone}</a><p className="mt-6 max-w-xs text-xs leading-5 text-[#aeb2b1]"><MapPin className="mr-2 inline" size={13}/>{club.address}<br/>Adresse reprise de l’ancien site, à confirmer avant déplacement.</p></div>
    </div>
    <div className="track-rule opacity-40"></div>
    <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-5 font-mono text-[9px] uppercase tracking-wider text-[#b7b8b3] sm:flex-row sm:justify-between md:px-12"><span>AMFR · Romilly-sur-Seine</span><span>Le rail en miniature, avec le goût du détail.</span></div>
  </footer>;
}

function Layout({children}:{children:ReactNode}) {
  return <div className="site-shell"><Header/><main>{children}</main><Footer/></div>;
}

function Home() {
  return <Layout>
    <section className="hero-grid mx-auto max-w-[1440px]">
      <div className="hero-copy">
        <p className="eyebrow reveal">Association modéliste ferroviaire · Aube</p>
        <h1 className="display-title mt-6 max-w-[620px] reveal-delay">Un monde entier<br/>à l’échelle <i className="font-normal text-[#cc5838]">HO.</i></h1>
        <p className="mt-7 max-w-[450px] text-[15px] leading-7 text-[#5b6268]">À Romilly-sur-Seine, l’AMFR fait vivre la passion du train miniature : un réseau, des images, des rencontres et le plaisir du détail ferroviaire.</p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link href="/reseau" className="inline-flex items-center gap-3 bg-[#cc5838] px-6 py-4 text-[10px] font-bold uppercase tracking-[.13em] text-white transition-colors hover:bg-[#a94029]">Découvrir le réseau <ArrowRight size={15}/></Link>
          <Link href="/contact" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] hover:text-[#cc5838]">Faire connaissance <ArrowUpRight size={14}/></Link>
        </div>
        <div className="mt-14 flex items-center gap-4"><div className="h-px w-12 bg-[#cc5838]"/><span className="font-mono text-[9px] uppercase tracking-[.15em] text-[#81847e]">Romilly-sur-Seine · France</span></div>
      </div>
      <div className="hero-image"><img src={club.banner} alt="Vue panoramique du réseau miniature de l’AMFR Romilly-Trains" fetchPriority="high"/><div className="absolute bottom-5 left-5 z-10 bg-[#232c39]/90 px-4 py-3 font-mono text-[9px] uppercase tracking-[.14em] text-white">Le réseau AMFR · échelle HO</div></div>
    </section>
    <div className="track-rule mx-auto max-w-[1440px]"></div>

    <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-20 md:grid-cols-[.72fr_1.28fr] md:items-end md:px-12 md:py-28">
      <div><p className="section-kicker">Le club, en quelques mots</p><h2 className="font-display mt-5 text-4xl leading-tight tracking-tight md:text-5xl">La passion du rail,<br/><span className="text-[#3e695a]">à portée de regard.</span></h2></div>
      <div className="md:pl-16"><p className="max-w-2xl text-[15px] leading-8 text-[#59616a]">{club.description}</p><Link href="/reseau" className="mt-6 inline-flex items-center gap-3 border-b border-[#cc5838] pb-2 text-xs font-bold uppercase tracking-[.1em] text-[#cc5838]">Entrer dans l’univers du club <ArrowRight size={15}/></Link></div>
    </section>

    <section className="bg-[#e8e4da]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">Carnet de lignes</p><h2 className="font-display mt-3 text-4xl tracking-tight">Images & actualités</h2></div><Link href="/actualites" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#cc5838]">Toutes les publications <ArrowRight size={15}/></Link></div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{articles.slice(0,3).map((a,i)=><ArticleCard key={a.url} article={a} index={i}/>)}</div>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:items-center md:px-12 md:py-28">
      <div className="relative max-w-[470px]"><div className="absolute -left-4 -top-4 h-20 w-20 border-l border-t border-[#cc5838]"></div><img className="relative w-full shadow-[14px_14px_0_#e3ded2]" src={events[2].image} alt={events[2].alt} loading="lazy"/><p className="mt-5 font-mono text-[9px] uppercase tracking-[.15em] text-[#828177]">Prochain rendez-vous · {events[2].date}</p></div>
      <div><p className="section-kicker">Rendez-vous ferroviaires</p><h2 className="font-display mt-4 text-4xl leading-tight md:text-5xl">Les rencontres<br/>se préparent ici.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#62676b]">Retrouvez les affiches et les informations partagées par le club. Les documents des éditions passées restent consultables en archive.</p><Link href="/evenements" className="mt-8 inline-flex items-center gap-3 bg-[#3e695a] px-6 py-4 text-[10px] font-bold uppercase tracking-[.13em] text-white hover:bg-[#315346]">Voir les affiches <CalendarDays size={15}/></Link></div>
    </section>

    <section className="route-pattern bg-[#232c39] text-[#f3f0e8]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-20">
        <div><p className="section-kicker !text-[#d8b554]">Sur les rails, en mouvement</p><h2 className="font-display mt-3 text-3xl md:text-4xl">Le réseau prend vie en vidéo.</h2></div>
        <Link href="/videos" className="inline-flex w-fit items-center gap-3 border border-[#687078] px-5 py-4 text-[10px] font-bold uppercase tracking-widest hover:border-[#d8b554] hover:text-[#d8b554]">Voir les films <Film size={15}/></Link>
      </div>
    </section>
  </Layout>;
}

type Article = typeof articles[number];
function ArticleCard({article,index=0}:{article:Article;index?:number}) {
  return <article className="news-card" data-testid={`card-article-${index}`}>
    <a href={article.url} target="_blank" rel="noreferrer" className="group block">
      <div className="overflow-hidden"><img src={article.image} alt={`${article.title} — ${article.text}`} loading="lazy" className="transition-transform duration-700 group-hover:scale-[1.035]"/></div>
      <div className="flex items-center justify-between py-4"><span className="section-kicker !text-[#3e695a]">{article.title}</span><time className="font-mono text-[9px] tracking-wider text-[#828177]">{article.date}</time></div>
      <p className="max-w-md text-[13px] leading-6 text-[#555d64]">{article.text}</p>
      <span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#cc5838]">Lire sur le blog <ArrowUpRight size={12}/></span>
    </a>
  </article>;
}

function PageIntro({kicker,title,copy}:{kicker:string;title:string;copy:string}) {
  return <section className="bg-[#232c39] text-[#f3f0e8]"><div className="route-pattern mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24"><p className="section-kicker !text-[#d8b554]">{kicker}</p><h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.04] tracking-tight md:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm leading-7 text-[#c1c4c0]">{copy}</p></div></section>;
}

function NetworkPage() {
  return <Layout><PageIntro kicker="L’échelle HO · 1:87" title="Un réseau, mille détails." copy="L’univers miniature de l’AMFR Romilly-Trains se découvre dans les paysages, les circulations et les scènes ferroviaires que le club partage."/>
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1.15fr_.85fr]">
        <div className="relative"><img className="w-full" src={club.banner} alt="Panorama du réseau de trains miniatures HO de l’AMFR" loading="lazy"/><span className="absolute bottom-4 left-4 bg-[#232c39]/90 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-white">Romilly-Trains · HO</span></div>
        <div className="flex flex-col justify-center md:pl-5"><p className="section-kicker">Voir autrement</p><h2 className="font-display mt-4 text-4xl leading-tight">Le chemin de fer<br/>en miniature.</h2><p className="mt-5 text-sm leading-7 text-[#62676b]">Chaque regard révèle un nouveau détail. Le club partage les photos, vidéos, astuces et activités autour de son réseau à l’échelle HO.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/actualites" className="inline-flex items-center gap-2 bg-[#cc5838] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white">Parcourir les images <ArrowRight size={14}/></Link><Link href="/videos" className="inline-flex items-center gap-2 border border-[#c8c2b5] px-5 py-3 text-[10px] font-bold uppercase tracking-widest">Voir en mouvement <Film size={14}/></Link></div></div>
      </div>
      <div className="mt-20 grid gap-10 border-t border-[#cbc5b9] pt-8 md:grid-cols-3">
        {[{n:'01',t:'Photos',d:'Des scènes et des ambiances ferroviaires à découvrir au fil des publications.'},{n:'02',t:'Vidéo',d:'Les circulations du réseau prennent vie dans les films partagés par le club.'},{n:'03',t:'Savoir-faire',d:'Astuces, décors et détails : la passion du modélisme se partage.'}].map(x=><div key={x.n}><span className="font-mono text-[10px] text-[#cc5838]">{x.n} /</span><h3 className="font-display mt-3 text-2xl">{x.t}</h3><p className="mt-3 text-sm leading-6 text-[#62676b]">{x.d}</p></div>)}
      </div>
    </div>
  </Layout>;
}

function NewsPage() {
  return <Layout><PageIntro kicker="Le journal du club" title="Des histoires de rail." copy="Archives, autorails, vapeur et détails de réseau : retrouvez les dernières publications du blog original."/>
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20"><div className="mb-8 flex items-center justify-between border-b border-[#c9c3b7] pb-5"><p className="section-kicker">Publications récentes</p><a className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#cc5838]" href={club.source} target="_blank" rel="noreferrer">Ouvrir le blog <ArrowUpRight size={12}/></a></div><div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{articles.map((a,i)=><ArticleCard key={a.url} article={a} index={i}/>)}</div></div>
  </Layout>;
}

function EventsPage() {
  return <Layout><PageIntro kicker="Rencontres & expositions" title="Le train miniature se partage." copy="Affiches publiées par l’AMFR. Les éditions passées sont conservées en archive ; pour toute information complète, consultez la page source du club."/>
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20"><div className="mb-9 flex items-center gap-3 border-b border-[#c9c3b7] pb-5"><CalendarDays size={17} className="text-[#cc5838]"/><p className="section-kicker">Affiches du club</p></div><div className="grid gap-8 md:grid-cols-3">{events.map(event=><article className="poster-card group" key={event.title}><a href={event.url} target="_blank" rel="noreferrer" className="block"><div className="aspect-[.76] overflow-hidden bg-[#e5e0d4]"><img src={event.image} alt={event.alt} loading="lazy"/></div><div className="flex items-start justify-between gap-3 border-b border-[#c9c3b7] py-4"><div><p className="font-mono text-[9px] uppercase tracking-widest text-[#cc5838]">{event.status}</p><h2 className="font-display mt-2 text-2xl">{event.title}</h2></div><ArrowUpRight size={16} className="mt-1 shrink-0 text-[#cc5838]"/></div><p className="mt-3 text-xs font-semibold text-[#3e695a]">{event.date}</p><p className="mt-2 text-sm leading-6 text-[#697078]">{event.details}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#3e695a]">Consulter la page source <ArrowRight className="ml-1 inline" size={13}/></p></a></article>)}</div><p className="mt-10 max-w-2xl border-l-2 border-[#d8b554] pl-4 text-xs leading-6 text-[#697078]">Dates, lieux et tarifs repris des affiches publiées par le club. Consultez la page source de l’AMFR pour toute mise à jour avant de vous déplacer.</p></div>
  </Layout>;
}

function VideosPage() {
  return <Layout><PageIntro kicker="Dans les coulisses du réseau" title="Le rail en mouvement." copy="Quelques films publiés autour du réseau et des rendez-vous de Romilly-Trains. Lancez la lecture ou ouvrez la vidéo sur YouTube."/>
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20"><div className="grid gap-x-7 gap-y-12 md:grid-cols-2">{videos.map((video,i)=><article key={video.id}><a className="video-thumb group" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" aria-label={`Regarder ${video.title} sur YouTube`}><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={`Vignette vidéo : ${video.title}`} loading="lazy"/><span className="video-play"><Play size={22} fill="currentColor"/></span></a><div className="flex items-center justify-between gap-3 border-b border-[#c9c3b7] py-4"><div><p className="font-mono text-[9px] uppercase tracking-widest text-[#cc5838]">Film · {String(i+1).padStart(2,'0')}</p><h2 className="font-display mt-1 text-xl">{video.title}</h2></div><a aria-label={`Ouvrir ${video.title} sur YouTube`} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9c3b7] text-[#cc5838] hover:bg-[#cc5838] hover:text-white"><ArrowUpRight size={16}/></a></div></article>)}</div></div>
  </Layout>;
}

function ContactPage() {
  return <Layout><PageIntro kicker="Entrer en contact" title="Parlons chemin de fer." copy="Une question sur le club, son réseau ou ses publications ? Écrivez-nous ou appelez-nous directement."/>
    <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:px-12 md:py-24">
      <section><p className="section-kicker">Nous joindre</p><h2 className="font-display mt-4 text-4xl">Les coordonnées du club.</h2><div className="mt-9 divide-y divide-[#d5d0c4] border-y border-[#d5d0c4]">
        <a href={`mailto:${club.email}`} className="group flex items-center justify-between gap-5 py-6"><span><span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#81847e]"><Mail size={13}/> Courriel</span><span className="text-base font-semibold group-hover:text-[#cc5838]">{club.email}</span></span><ArrowUpRight size={17} className="text-[#cc5838]"/></a>
        <a href={`tel:${club.phone.replaceAll(' ','')}`} className="group flex items-center justify-between gap-5 py-6"><span><span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#81847e]"><Phone size={13}/> Téléphone</span><span className="text-base font-semibold group-hover:text-[#cc5838]">{club.phone}</span></span><ArrowUpRight size={17} className="text-[#cc5838]"/></a>
        <div className="py-6"><span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#81847e]"><MapPin size={13}/> Adresse publiée</span><p className="text-base font-semibold">{club.address}</p><p className="mt-2 text-xs leading-5 text-[#777b7a]">Adresse reprise de l’ancien site ; son exactitude n’est pas confirmée. Merci de vérifier auprès du club avant tout déplacement.</p></div>
      </div><a href={club.source + '/nous-contacter'} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cc5838]">Consulter la page de contact d’origine <ArrowUpRight size={14}/></a></section>
      <aside className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-[#3e695a] p-8 text-[#f3f0e8] md:p-10"><div className="absolute -right-8 -top-12 opacity-[.08]"><TrainFront size={240} strokeWidth={.7}/></div><div className="relative"><p className="font-mono text-[9px] uppercase tracking-[.17em] text-[#e2ca78]">AMFR · Romilly-Trains</p><h3 className="font-display mt-6 text-4xl leading-tight">Une passion<br/>qui se partage.</h3><p className="mt-4 max-w-sm text-sm leading-7 text-[#e1e7dd]">Le club présente son réseau HO, ses photos, vidéos, astuces et activités.</p></div><div className="relative mt-10 flex items-center justify-between border-t border-white/20 pt-5"><span className="font-mono text-[9px] uppercase tracking-widest text-[#dbe3d9]">Romilly-sur-Seine</span><MapPin size={17} className="text-[#e2ca78]"/></div></aside>
    </div>
  </Layout>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home}/>
    <Route path="/reseau" component={NetworkPage}/>
    <Route path="/actualites" component={NewsPage}/>
    <Route path="/evenements" component={EventsPage}/>
    <Route path="/videos" component={VideosPage}/>
    <Route path="/contact" component={ContactPage}/>
    <Route component={NotFound}/>
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({children}:{children:ReactNode}) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;
}

export default App;
