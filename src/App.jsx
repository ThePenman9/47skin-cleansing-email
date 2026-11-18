import React, { useEffect, useMemo, useState } from 'react';

const PRODUCT_URL = 'https://47skin.com/products/anti-blemish-scar-repair-serum';
const SUBJECT = 'What comes after cleansing? Your serum.';
const PREHEADER = 'When to apply it, how to use it and what to know before getting started.';
const otherMessages = [
  { id:'p1', sender:'Sunday Studio', subject:'A note from the creative desk', preview:'A few things we bookmarked for this week.', time:'10:42', read:false },
  { id:'p2', sender:'The Reading Room', subject:'Your weekly reading list', preview:'Three essays, a little inspiration and a quiet moment.', time:'09:18', read:true },
  { id:'p3', sender:'Morrow Journal', subject:'November, in photographs', preview:'A small collection of interesting things to look at.', time:'Yesterday', read:true },
  { id:'p4', sender:'Workspace Updates', subject:'Your weekly workspace digest', preview:'A summary of changes in your demo workspace.', time:'Tue', read:true },
  { id:'p5', sender:'Field Notes', subject:'Issue 08 — small rituals', preview:'Good habits and thoughtful daily routines.', time:'Mon', read:true },
  { id:'p6', sender:'Cedar Books', subject:'New arrivals for your shelf', preview:'Fresh releases and a few old favourites.', time:'Mon', read:true },
];
function Icon({ name, size=20, filled=false }) {
  const base={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
  const paths={
    menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    inbox:<><path d="M4 4h16l2 9v7H2v-7l2-9Z"/><path d="M2 13h6l2 3h4l2-3h6"/></>,
    star:<path d="m12 2.7 3 6.1 6.7 1-4.9 4.7 1.2 6.8-6-3.2-6 3.2 1.2-6.8-4.9-4.7 6.7-1 3-6.1Z"/>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    sent:<><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></>,
    draft:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    arrow:<><path d="M19 12H5M12 19l-7-7 7-7"/></>,
    chevron:<path d="m9 18 6-6-6-6"/>,
    check:<path d="m5 12 4 4L19 6"/>,
    info:<><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></>,
    close:<path d="M18 6 6 18M6 6l12 12"/>,
    refresh:<><path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 4v7h-7"/></>,
    external:<><path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>
  };
  return <svg {...base} fill={filled ? 'currentColor' : 'none'}>{paths[name]}</svg>;
}
const folders=[['Inbox','inbox'],['Starred','star'],['Snoozed','clock'],['Sent','sent'],['Drafts','draft']];

function GmailBrand(){return <div className="gmail-brand" aria-label="Mail demo"><span className="gmail-m" aria-hidden="true"><i/><i/><i/><i/></span><span>Gmail</span></div>}
function CampaignEmail(){
 return <article className="campaign-email" aria-label="47 Skin email content">
  <div className="email-topline"><span>47 <span className="thin">SKIN</span></span><span>PORTFOLIO EMAIL CONCEPT</span></div>
  <section className="email-hero">
   <div className="hero-copy"><div className="hero-eyebrow">47 SKIN <span className="eyebrow-line"/></div><h2>Anti-Blemish <br/><em>&amp; Scar Repair</em><br/>Serum</h2><div className="hero-rule"/></div>
   <div className="hero-product"><img src="/assets/authentic-47-skin-serum.jpg" alt="Authentic 47 Skin Anti-Blemish & Scar Repair Serum amber pump bottles photographed on metallic rocks"/></div>
  </section>
  <div className="email-content">
   <p>Hello,</p>
   <p>If you're considering adding our Anti-Blemish &amp; Scar Repair Serum to your routine, you might be wondering where it fits in and how to get started.</p>
   <p>The good news is that it comes right after cleansing. Apply 1–2 pumps to your face and neck, morning and evening, gently smoothing it over your skin while taking care to avoid the eye area.</p>
   <div className="routine-card" aria-label="Application reminder"><div className="routine-number">1–2</div><div className="routine-card-copy"><div>pumps, morning and evening, after cleansing.</div></div><div className="routine-line"/></div>
   <p>A few details are worth checking before you begin. Take a look at the full ingredient list and usage instructions so you know exactly what's in the serum, how to apply it and whether it's suitable for your skincare needs.</p>
   <p>We've put all the product details and directions together on the product page, so you can take your time, look through everything and decide if it's right for your routine.</p>
   <div className="cta-wrap"><a className="email-cta" href={PRODUCT_URL} target="_blank" rel="noopener noreferrer">VIEW THE FULL DIRECTIONS <span aria-hidden="true">→</span></a></div>
   <p className="signoff">Warmly,<br/>The 47 Skin team</p>
  </div>
  <footer className="email-foot"><span>47 SKIN</span></footer>
 </article>
}
export default function App(){
 const [view,setView]=useState('inbox');
 const [folder,setFolder]=useState('Inbox');
 const [query,setQuery]=useState('');
 const [isRead,setIsRead]=useState(false);
 const [starred,setStarred]=useState(false);
 const [sidebarOpen,setSidebarOpen]=useState(false);
 const [refreshCount,setRefreshCount]=useState(0);
 const messages=useMemo(()=>[
  {id:'campaign',sender:'The 47 Skin team',subject:SUBJECT,preview:PREHEADER,time:'Demo',read:isRead,starred},
  ...otherMessages
 ],[isRead,starred]);
 const filtered=useMemo(()=>messages.filter(m=>(folder==='Inbox'||(folder==='Starred'&&m.starred)) && `${m.sender} ${m.subject} ${m.preview}`.toLowerCase().includes(query.toLowerCase().trim())),[folder,messages,query,refreshCount]);
 const openMail=()=>{setIsRead(true);setView('message');window.scrollTo({top:0,behavior:'smooth'});};
 const back=()=>{setView('inbox');window.scrollTo({top:0,behavior:'smooth'});};
 useEffect(()=>{const fn=e=>{if(e.key==='Escape'&&view==='message')back()};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[view]);
 useEffect(()=>{document.title=`${view==='message'?SUBJECT:'Inbox'} — 47 Skin Email Portfolio`;},[view]);
 function selectFolder(f){setFolder(f);setSidebarOpen(false);setView('inbox')}
 return <div className="app-shell">
  <header className="topbar">
   <button className="icon-btn menu-btn" aria-label="Toggle navigation" aria-expanded={sidebarOpen} onClick={()=>setSidebarOpen(v=>!v)}><Icon name="menu"/></button>
   <GmailBrand/>
   <label className="searchbar"><Icon name="search"/><input value={query} onChange={e=>{setQuery(e.target.value);if(view==='message')setView('inbox')}} type="search" aria-label="Search demo inbox" placeholder="Search mail"/>{query&&<button className="clear-search" aria-label="Clear search" onClick={()=>setQuery('')}><Icon name="close" size={17}/></button>}</label>
   <div className="topbar-right"><span className="demo-indicator">Portfolio preview</span><span className="account-dot" title="Demo account">P</span></div>
  </header>
  <div className="main-layout">
   {sidebarOpen&&<button className="sidebar-scrim" aria-label="Close navigation" onClick={()=>setSidebarOpen(false)}/>}
   <aside className={'sidebar '+(sidebarOpen?'sidebar-open':'')} aria-label="Mail folders">
    <div className="sidebar-intro">MAILBOX <span>DEMO</span></div>
    <nav>{folders.map(([title,icon])=><button key={title} className={'folder-btn '+(folder===title?'selected':'')} onClick={()=>selectFolder(title)} aria-current={folder===title?'page':undefined}><Icon name={icon} filled={title==='Starred'&&folder===title}/><span>{title}</span>{title==='Inbox'&&!isRead&&<b className="unread-count">2</b>}</button>)}</nav>
    <div className="sidebar-footer"><Icon name="info" size={16}/><p>Fictional inbox for a speculative 47 Skin portfolio campaign. No messages were sent.</p></div>
   </aside>
   <main className="mail-panel">
    {view==='inbox'?<>
     <div className="toolbar"><div className="toolbar-left"><input className="bulk-check" type="checkbox" disabled title="Selection unavailable in this demo" aria-label="Demo selection unavailable"/><button className="icon-btn" title="Refresh inbox" aria-label="Refresh inbox" onClick={()=>setRefreshCount(v=>v+1)}><Icon name="refresh" size={17}/></button></div><span className="message-range">{filtered.length ? `1–${filtered.length} of ${filtered.length}`:'0 messages'}</span></div>
     <div className="tabbar"><span className="active-tab"><Icon name="inbox" size={18}/> Primary</span></div>
     <div className="message-list" aria-label="Inbox messages">{filtered.length?filtered.map(m=>m.id==='campaign'?<div className={'mail-row campaign-row '+(m.read?'read':'unread')} key={m.id}>
      <button className="row-star" aria-label={starred?'Unstar campaign email':'Star campaign email'} aria-pressed={starred} onClick={()=>setStarred(v=>!v)}><Icon name="star" size={19} filled={starred}/></button>
      <button className="row-open" onClick={openMail} aria-label={`Open email from The 47 Skin team: ${SUBJECT}`}><span className="row-sender">{m.sender}</span><span className="row-summary"><strong>{m.subject}</strong><span className="summary-divider"> — </span><span className="row-preview">{m.preview}</span></span><span className="row-time">{m.time}</span></button>
     </div>:<div className={'mail-row nonopen '+(m.read?'read':'unread')} key={m.id} aria-label={`Placeholder message from ${m.sender}; not openable`}><span className="static-star" aria-hidden="true"><Icon name="star" size={18}/></span><div className="static-message"><span className="row-sender">{m.sender}</span><span className="row-summary"><strong>{m.subject}</strong><span className="summary-divider"> — </span><span className="row-preview">{m.preview}</span></span><span className="row-time">{m.time}</span></div></div>):<div className="empty-state">No messages in {folder.toLowerCase()}{query?' matching your search':''}.</div>}</div>
     <div className="list-disclosure">DEMO ENVIRONMENT · Only the 47 Skin email opens · All other messages are fictional placeholders</div>
    </>:<>
     <div className="reading-toolbar"><button className="icon-btn back-icon" aria-label="Back to inbox" onClick={back}><Icon name="arrow"/></button><span className="reading-toolbar-text">Back to inbox</span><span className="reading-toolbar-spacer"/><button className={'icon-btn reading-star '+(starred?'on':'')} aria-label={starred?'Unstar email':'Star email'} aria-pressed={starred} onClick={()=>setStarred(v=>!v)}><Icon name="star" filled={starred}/></button></div>
     <div className="reading-scroll"><div className="reading-subject"><h1>{SUBJECT}</h1><span className="inbox-chip">Inbox</span></div>
     <div className="sender-card"><div className="sender-avatar">47</div><div className="sender-details"><strong>The 47 Skin team</strong><div>to: portfolio viewer <span className="meta-dot">·</span> Speculative preview</div></div><span className="sent-meta">Demo message · No send date</span></div>
     <div className="email-container"><CampaignEmail/></div><div className="reading-disclaimer">Speculative email concept for a portfolio. Not sent, commissioned, or approved by 47 Skin. The product photo was supplied as a reference; the UI is fictional.</div>
     </div>
    </>}
   </main>
  </div>
 </div>
}
