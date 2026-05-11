import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');
:root{--head:'Syne',sans-serif;--mono:'Space Mono',monospace;--body:'Outfit',sans-serif;}
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:3px;background:rgba(0,212,255,0.04);}
::-webkit-scrollbar-thumb{background:rgba(0,212,255,0.28);border-radius:2px;}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(70px,-50px) scale(1.1);}66%{transform:translate(-40px,60px) scale(0.93);}}
@keyframes orb2{0%,100%{transform:translate(0,0);}40%{transform:translate(-90px,40px) scale(1.08);}80%{transform:translate(60px,-70px) scale(0.9);}}
@keyframes orb3{0%,100%{transform:translate(0,0);}50%{transform:translate(50px,50px) scale(1.05);}}
@keyframes ecgDraw{0%{stroke-dashoffset:1400;}100%{stroke-dashoffset:0;}}
@keyframes ecgLoop{0%{stroke-dashoffset:700;}100%{stroke-dashoffset:0;}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.15;}}
@keyframes pulseRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.7;}100%{transform:translate(-50%,-50%) scale(3);opacity:0;}}
@keyframes pulseRing2{0%{transform:translate(-50%,-50%) scale(1);opacity:0.4;}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0;}}
@keyframes nodeBreath{0%,100%{filter:brightness(1);}50%{filter:brightness(1.6);}}
@keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes slideR{from{opacity:0;transform:translateX(-36px);}to{opacity:1;transform:translateX(0);}}
@keyframes slideL{from{opacity:0;transform:translateX(36px);}to{opacity:1;transform:translateX(0);}}
@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-11px);}}
@keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
@keyframes gradShift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
@keyframes scanLine{0%{top:-2px;}100%{top:calc(100% + 2px);}}

.cwrap:hover .cinner{
  border-color:var(--ec,rgba(79,195,247,0.55)) !important;
  box-shadow:0 0 50px var(--eg,rgba(79,195,247,0.15)),0 12px 50px rgba(0,0,0,0.55) !important;
  transform:translateY(-4px) scale(1.005) !important;
}
.cwrap:hover .yr{transform:scale(1.07) !important;}
.tc{transition:all 0.22s ease;}
.tc:hover{transform:scale(1.07);filter:brightness(1.2);}
`;

const ERAS = {
  rule:  {label:"Rule-Based Systems",    years:"2000–2004",c:"#4FC3F7",g:"rgba(79,195,247,0.14)",b:"rgba(79,195,247,0.42)",icon:"⚙️"},
  ml:    {label:"Machine Learning",       years:"2005–2011",c:"#CE93D8",g:"rgba(206,147,216,0.14)",b:"rgba(206,147,216,0.42)",icon:"📊"},
  dl:    {label:"Deep Learning",          years:"2012–2016",c:"#4DB6AC",g:"rgba(77,182,172,0.14)",b:"rgba(77,182,172,0.42)",icon:"🧠"},
  clinic:{label:"AI Goes Clinical",       years:"2017–2020",c:"#FF8A65",g:"rgba(255,138,101,0.14)",b:"rgba(255,138,101,0.42)",icon:"🏥"},
  found: {label:"Foundation Models",      years:"2021–2022",c:"#FFD54F",g:"rgba(255,213,79,0.14)",b:"rgba(255,213,79,0.42)",icon:"🔬"},
  llm:   {label:"LLM Era",               years:"2023–2024",c:"#80CBC4",g:"rgba(128,203,196,0.14)",b:"rgba(128,203,196,0.42)",icon:"💬"},
  agent: {label:"Agentic Intelligence",   years:"2025–2026",c:"#B39DDB",g:"rgba(179,157,219,0.14)",b:"rgba(179,157,219,0.42)",icon:"🤖"},
};

const ITEMS = [
  {year:2000,era:"rule",lm:true,
   title:"Clinical Decision Support Goes Digital",
   sub:"Expert Systems Enter Hospital EHRs",
   body:"Rule-based CDSS systems encode decades of physician guidelines into logic trees embedded in EHR platforms. Real-time alerts fire for drug interactions, contraindications, and dosing errors — replacing paper protocols with instant bedside intelligence.",
   impact:"Reduced ICU medication errors by up to 55% in pilot programmes",
   loc:"Brigham & Women's Hospital · Boston, Massachusetts, USA 🇺🇸",
   tags:["CDSS","Expert Systems","EHR","Patient Safety"]},

  {year:2001,era:"rule",lm:false,
   title:"First FDA-Cleared CAD for Mammography",
   sub:"AI Officially Becomes a Clinical Second Reader",
   body:"R2 Technology receives FDA clearance for ImageChecker — the first commercial Computer-Aided Detection system for breast cancer screening. Radiologists use AI to flag suspicious microcalcifications, marking AI's first certified clinical deployment in diagnostic imaging.",
   impact:"5–15% increase in early-stage breast cancer detection",
   loc:"R2 Technology · Sunnyvale, CA 🇺🇸 → FDA · Washington D.C. 🇺🇸",
   tags:["CAD","Mammography","FDA Clearance","Radiology","First"]},

  {year:2003,era:"rule",lm:true,
   title:"Human Genome Project Completed",
   sub:"3.2 Billion Base Pairs — Bioinformatics Is Born",
   body:"The HGP delivers 3.2 billion base pairs of human DNA, igniting computational biology. Sequence alignment tools, gene expression databases, and phylogenetic algorithms emerge — forming the genomic data infrastructure that AI will exploit for the next two decades.",
   impact:"Foundation for precision medicine, pharmacogenomics, and CRISPR gene therapy",
   loc:"NIH Human Genome Research Institute · Bethesda, Maryland, USA 🇺🇸",
   tags:["Genomics","Bioinformatics","Precision Medicine","HGP","NIH"]},

  {year:2006,era:"ml",lm:false,
   title:"ML Targets Drug Discovery",
   sub:"SVMs & Random Forests Predict Molecular Bioactivity",
   body:"Pharma giants adopt Support Vector Machines and Random Forests to predict molecular binding, toxicity, and ADMET properties. QSAR models trained on chemical databases cut early-stage drug failures and surface promising compounds 10× faster than wet-lab screening.",
   impact:"Drug target identification cycles shortened 30–40%",
   loc:"Pfizer R&D · Groton, CT 🇺🇸 + GlaxoSmithKline · Stevenage, UK 🇬🇧",
   tags:["QSAR","SVM","Random Forest","Drug Discovery","Cheminformatics"]},

  {year:2009,era:"ml",lm:false,
   title:"FDA Issues First AI/ML Medical Device Guidance",
   sub:"Software as a Medical Device Framework Established",
   body:"The FDA publishes landmark guidance distinguishing Software as a Medical Device (SaMD), creating regulatory architecture for AI-powered diagnostics. This signals that ML outputs can carry clinical-grade trust and unlocks a decade of MedTech AI investment.",
   impact:"Enabled $1B+ MedTech AI investment within 3 years",
   loc:"FDA Center for Devices · Silver Spring, Maryland, USA 🇺🇸",
   tags:["FDA","SaMD","Regulation","Policy","MedTech"]},

  {year:2011,era:"ml",lm:true,
   title:"IBM Watson Defeats Jeopardy Champions",
   sub:"NLP & Knowledge Retrieval Pivot to Oncology at Scale",
   body:"Watson's victory proves machines can parse ambiguous natural language and retrieve knowledge from millions of documents at superhuman speed. IBM partners with Memorial Sloan Kettering to train Watson on 600,000 medical evidence reports and 1.5M patient records for oncology decision support.",
   impact:"Sparked $4B+ in global healthcare AI investment within 24 months",
   loc:"IBM Research · Armonk, NY 🇺🇸 + Memorial Sloan Kettering · New York City 🇺🇸",
   tags:["IBM Watson","NLP","Oncology","Knowledge Graph","New York"]},

  {year:2012,era:"dl",lm:true,
   title:"AlexNet Ignites Deep Learning",
   sub:"CNNs Shatter Medical Imaging Benchmarks Overnight",
   body:"AlexNet wins ImageNet by 11 percentage points — proving CNNs learn hierarchical visual features without hand-crafted rules. Within months, researchers adapt the architecture to chest X-rays, histology slides, fundus photos, and dermatoscopy images, obliterating traditional CAD performance across every modality.",
   impact:"Triggered a decade of deep learning breakthroughs across all imaging modalities",
   loc:"University of Toronto · Toronto, Canada 🇨🇦 → Global Medical AI Research",
   tags:["CNN","AlexNet","Transfer Learning","Medical Imaging","Toronto"]},

  {year:2014,era:"dl",lm:false,
   title:"DeepMind Partners with NHS",
   sub:"1.6 Million Patient Records · London's Eye Hospitals",
   body:"Google DeepMind signs landmark agreements with Moorfields Eye Hospital and the Royal Free NHS Trust, gaining access to 1.6M anonymised patient records. The team builds architectures detecting 50+ sight-threatening conditions from OCT retinal scans — later matching 8 of 12 expert ophthalmologists.",
   impact:"94.5% AUC on retinal disease detection, exceeding average specialist",
   loc:"DeepMind HQ + Moorfields Eye Hospital · King's Cross, London, UK 🇬🇧",
   tags:["DeepMind","NHS","OCT","Retinal AI","London","UK"]},

  {year:2016,era:"dl",lm:true,
   title:"AI Surpasses Dermatologists in Skin Cancer Detection",
   sub:"Stanford + Nature — The Benchmark Heard Around the World",
   body:"Stanford trains a CNN on 129,450 clinical images across 2,032 skin disease categories. In a blinded head-to-head against 21 board-certified dermatologists, the AI matches or outperforms specialists on keratinocyte carcinomas and melanomas — proving AI can reach specialist-level clinical accuracy from pixels alone.",
   impact:"Enabled smartphone-based screening apps now reaching 500M+ users globally",
   loc:"Stanford University HAI Lab · Stanford, California, USA 🇺🇸",
   tags:["Dermatology","CNN","Nature","Stanford","Benchmark","Landmark"]},

  {year:2017,era:"clinic",lm:false,
   title:"Google AI Detects Diabetic Retinopathy",
   sub:"Validated Across Two Continents · JAMA Publication",
   body:"Google Health publishes a landmark JAMA study: their deep learning algorithm detects diabetic retinopathy with 90%+ sensitivity and specificity from a single fundus photograph — matching retinal specialists. The model is validated on datasets from India and the US, proving cross-population generalizability.",
   impact:"Scalable to 400M+ diabetic patients worldwide who lack specialist access",
   loc:"Google Brain · Mountain View, CA 🇺🇸 + Aravind Eye Hospital · Madurai, India 🇮🇳",
   tags:["Diabetic Retinopathy","Google Health","JAMA","India","Global Health"]},

  {year:2018,era:"clinic",lm:true,
   title:"IDx-DR: First Autonomous AI Diagnostic",
   sub:"FDA De Novo — No Physician Required for the Decision",
   body:"IDx-DR receives FDA De Novo authorization as history's first AI system empowered to make a clinical decision autonomously — without physician review at point of use. A single retinal photograph determines whether a patient needs referral for diabetic eye disease. The AI doesn't assist a doctor; it decides.",
   impact:"Transformed autonomous AI from research concept to FDA-regulated clinical tool",
   loc:"IDx Technologies · Iowa City, Iowa, USA 🇺🇸",
   tags:["FDA De Novo","Autonomous AI","IDx-DR","Regulatory First","Iowa"]},

  {year:2019,era:"clinic",lm:false,
   title:"AI Outperforms Radiologists in Breast Cancer",
   sub:"28,000 Women · Nature Medicine · UK NHS Validation",
   body:"A Google Health & DeepMind study of 28,000+ women published in Nature Medicine shows the AI reduces false positives by 5.7% and false negatives by 9.4% versus the average radiologist. As an independent second reader, it would eliminate 88% of the UK NHS screening backlog.",
   impact:"Could offset the 30% global radiologist shortage projected by 2030",
   loc:"Google Health + Royal Free NHS Hospital · London, UK 🇬🇧",
   tags:["Breast Cancer","Radiology","Nature Medicine","NHS","Screening","UK"]},

  {year:2020,era:"clinic",lm:true,
   title:"COVID-19: AI Accelerates the Pandemic Response",
   sub:"Drug Repurposing · CT Staging · mRNA Vaccine Design",
   body:"AI plays simultaneous roles during the pandemic: CT scan analysis for severity staging, drug repurposing models identifying remdesivir and baricitinib, protein structure prediction for the spike protein, and genomic surveillance for variant tracking. Moderna's mRNA vaccine sequence is AI-optimized in 48 hours.",
   impact:"AI-assisted vaccine design cut candidate development from years to 48 hours",
   loc:"NIH · Bethesda 🇺🇸 · BioNTech · Frankfurt 🇩🇪 · Moderna · Cambridge, MA 🇺🇸 · WHO · Geneva 🇨🇭",
   tags:["COVID-19","Drug Repurposing","CT Scan","mRNA Vaccines","Global"]},

  {year:2021,era:"found",lm:true,
   title:"AlphaFold2 Solves Protein Folding",
   sub:"50-Year Grand Challenge Conquered · 200M Structures Released",
   body:"DeepMind's AlphaFold2 predicts 3D protein structure from amino acid sequences with near-experimental accuracy. The Protein Data Bank previously held ~180,000 structures built over 50 years; AlphaFold releases 200 million in one year — free, open access. Drug discovery, enzyme engineering, and rare disease research are transformed.",
   impact:"200M+ structures released. 2024 Nobel Prize in Chemistry awarded to Jumper & Hassabis.",
   loc:"DeepMind HQ · King's Cross, London, UK 🇬🇧",
   tags:["AlphaFold2","Protein Folding","Drug Discovery","Nobel Prize","DeepMind","Open Science"]},

  {year:2022,era:"found",lm:false,
   title:"ChatGPT Launches — NLP Enters the Clinic",
   sub:"LLMs Target the 35% of Physician Time Lost to Documentation",
   body:"OpenAI's ChatGPT demonstrates that large language models can draft SOAP notes, summarize discharge summaries, answer patient questions, and generate differential diagnoses in natural clinical language. Hospitals begin piloting GPT-4 for ambient documentation — the scribe-free, hands-free consultation.",
   impact:"Clinical documentation burden (35% of physician time) targeted for full automation",
   loc:"OpenAI · Mission District, San Francisco, California, USA 🇺🇸",
   tags:["ChatGPT","LLM","Clinical NLP","Ambient AI","Documentation"]},

  {year:2023,era:"llm",lm:true,
   title:"Med-PaLM 2 Achieves Expert-Level Medical QA",
   sub:"Google's Medical LLM Passes USMLE at Expert-Physician Level",
   body:"Google's Med-PaLM 2 scores 85%+ on USMLE Step exams — crossing the 'expert' threshold and matching physician-level performance. The model demonstrates chain-of-thought medical reasoning, accurate clinical summarization, and radiology report generation. Physicians rated its blind responses as safe and helpful at peer-equivalent rates.",
   impact:"First AI designated 'expert' on medical licensing benchmarks internationally",
   loc:"Google Research · Mountain View, California, USA 🇺🇸",
   tags:["Med-PaLM 2","USMLE","Medical LLM","Chain-of-Thought","Benchmark"]},

  {year:2023,era:"llm",lm:false,
   title:"FDA Authorizes 521 AI/ML Medical Devices",
   sub:"From 6 Approvals in 2015 to 521 — Commercial Scale Has Arrived",
   body:"The FDA's AI/ML SaMD Action Plan results in 521 authorized AI devices on market. Radiology leads at 75%, followed by cardiology (12%) and pathology. The FDA also proposes Predetermined Change Control Plans — allowing continuously-learning AI systems to update post-deployment without full re-authorization.",
   impact:"AI medical devices now a $45B+ global annual market segment",
   loc:"FDA Center for Devices & Radiological Health · Silver Spring, Maryland, USA 🇺🇸",
   tags:["FDA","521 Devices","SaMD","Market Scale","Regulation","Policy"]},

  {year:2024,era:"llm",lm:false,
   title:"AI Agents Automate Clinical Workflows",
   sub:"From Passive Prediction to Active Autonomous Clinical Action",
   body:"Healthcare AI evolves from answering queries to taking actions: systems autonomously order labs, draft referrals, flag deteriorating patients from live EHR streams, and coordinate care team messaging — driven by multi-step reasoning chains without physician initiation at every step.",
   impact:"Pilot hospitals report 40% reduction in per-physician administrative burden",
   loc:"Epic Systems · Verona, WI 🇺🇸 + Mayo Clinic · Rochester, MN 🇺🇸 + UCSF · San Francisco 🇺🇸",
   tags:["AI Agents","Workflow Automation","EHR","Autonomous AI","Epic","Mayo Clinic"]},

  {year:2025,era:"agent",lm:true,
   title:"Multimodal AI Fuses Genomics, Imaging & EHR",
   sub:"Whole-Patient Foundation Models for True Precision Medicine",
   body:"Foundation models trained jointly on genomic sequences, medical images, clinical notes, wearable sensor streams, and lab values create holistic patient representations. These multimodal systems predict treatment response, disease progression, and adverse events — enabling personalised care decisions generated in under 90 seconds.",
   impact:"3× better adverse event prediction; personalised plans in <90 seconds",
   loc:"MIT CSAIL + Broad Institute · Cambridge, MA 🇺🇸 + Stanford Medicine · Palo Alto, CA 🇺🇸",
   tags:["Multimodal AI","Genomics","Wearables","Precision Medicine","MIT","Stanford"]},

  {year:2026,era:"agent",lm:true,
   title:"Agentic Intelligence: AI as a Care Team Member",
   sub:"Multi-Agent Systems Manage Full End-to-End Patient Pathways",
   body:"Agentic AI architectures manage complete care pathways — from symptom triage and imaging analysis, to treatment planning, pharmacy coordination, insurance pre-authorization, and follow-up scheduling. Specialized sub-agents (diagnostician, pharmacist, care coordinator) collaborate under physician oversight across 40+ nations.",
   impact:"WHO projects agentic AI could deliver specialist-level care to 2 billion underserved patients",
   loc:"Global Deployment · WHO · Geneva 🇨🇭 + 40+ partnered health systems worldwide 🌍",
   tags:["Agentic AI","Multi-Agent","Care Coordination","WHO","2B Patients","Global Health"]},
];

/* ── CANVAS PARTICLES ─────────────────────────────────── */
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    let W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    const pts = Array.from({length:100},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      r:Math.random()*1.5+.4,
      a:Math.random()*.3+.07,
      h:Math.random()>.55?198:Math.random()>.5?270:160,
    }));
    let raf;
    function tick(){
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        p.x=(p.x+p.vx+W)%W; p.y=(p.y+p.vy+H)%H;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.h},90%,70%,${p.a})`; ctx.fill();
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<85){ctx.beginPath();ctx.strokeStyle=`rgba(79,195,247,${.07*(1-d/85)})`;
            ctx.lineWidth=.5;ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        }
      }
      raf=requestAnimationFrame(tick);
    }
    tick();
    const resize=()=>{W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}/>;
}

/* ── ECG LINE ─────────────────────────────────────────── */
function Ecg(){
  return(
    <svg width="100%" height="64" viewBox="0 0 900 64" preserveAspectRatio="none" style={{display:"block",opacity:.75}}>
      <defs>
        <linearGradient id="eg" x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(79,195,247,0)"/>
          <stop offset="15%" stopColor="rgba(79,195,247,.85)"/>
          <stop offset="50%" stopColor="rgba(129,201,149,.85)"/>
          <stop offset="85%" stopColor="rgba(179,157,219,.85)"/>
          <stop offset="100%" stopColor="rgba(179,157,219,0)"/>
        </linearGradient>
      </defs>
      <path
        d="M0,32 L50,32 L65,32 L72,20 L80,55 L88,32 L105,32
           L120,32 L127,20 L135,55 L143,32 L160,32 L170,5 L178,60 L186,32 L210,32
           L240,32 L247,20 L255,55 L263,32 L280,32
           L320,32 L335,32 L342,20 L350,55 L358,32 L375,32 L385,5 L393,60 L401,32 L425,32
           L460,32 L467,20 L475,55 L483,32 L500,32
           L540,32 L555,32 L562,20 L570,55 L578,32 L595,32 L605,5 L613,60 L621,32 L645,32
           L680,32 L687,20 L695,55 L703,32 L720,32
           L760,32 L775,32 L782,20 L790,55 L798,32 L815,32 L825,5 L833,60 L841,32 L865,32
           L900,32"
        fill="none" stroke="url(#eg)" strokeWidth="1.8" strokeLinecap="round"
        style={{strokeDasharray:1600,strokeDashoffset:1600,
          animation:"ecgDraw 2.8s ease forwards, ecgLoop 4.5s linear 2.8s infinite"}}
      />
    </svg>
  );
}

/* ── COUNTER ─────────────────────────────────────────── */
function Counter({to,suffix=""}){
  const [v,setV]=useState(0), ref=useRef(null);
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return;
      const t0=Date.now(),dur=1800;
      const tick=()=>{
        const p=Math.min(1,(Date.now()-t0)/dur), ease=1-Math.pow(1-p,3);
        setV(Math.round(ease*to)); if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); ob.disconnect();
    },{threshold:.5});
    if(ref.current)ob.observe(ref.current);
    return()=>ob.disconnect();
  },[to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ── NODE ────────────────────────────────────────────── */
function Node({c,g,lm,vis}){
  const sz=lm?19:13;
  return(
    <div style={{position:"relative",width:24,height:24,flexShrink:0}}>
      {vis&&lm&&<>
        <div style={{position:"absolute",left:"50%",top:"50%",width:sz,height:sz,borderRadius:"50%",
          border:`1.5px solid ${c}`,animation:"pulseRing 2.2s ease-out infinite"}}/>
        <div style={{position:"absolute",left:"50%",top:"50%",width:sz,height:sz,borderRadius:"50%",
          border:`1px solid ${c}`,animation:"pulseRing2 2.2s ease-out .6s infinite"}}/>
      </>}
      <div style={{
        position:"absolute",left:"50%",top:"50%",
        transform:"translate(-50%,-50%)",
        width:sz,height:sz,borderRadius:"50%",
        background:vis?c:"rgba(100,120,160,0.3)",
        border:`3px solid #060C1A`,
        boxShadow:vis?`0 0 0 3px ${g},0 0 20px ${c}99`:"none",
        transition:"all .5s ease",
        animation:vis?"nodeBreath 3s ease-in-out infinite":"none",
      }}/>
    </div>
  );
}

/* ── CARD ────────────────────────────────────────────── */
function Card({m,side,vis,open,onToggle}){
  const e=ERAS[m.era];
  return(
    <div className="cwrap" onClick={onToggle} style={{
      width:"calc(50% - 50px)",
      marginLeft:side==="right"?"calc(50% + 50px)":0,
      opacity:vis?1:0,
      animation:vis?(side==="left"?"slideR .55s ease forwards":"slideL .55s ease forwards"):"none",
      cursor:"pointer",position:"relative",zIndex:2,
      "--ec":e.b,"--eg":e.g,
    }}>
      <div className="cinner" style={{
        background:open
          ?`linear-gradient(145deg,${e.g} 0%,rgba(6,12,26,.97) 100%)`
          :"rgba(8,14,30,.88)",
        border:`1px solid ${open?e.b:"rgba(255,255,255,0.06)"}`,
        borderRadius:18,padding:"20px 22px",backdropFilter:"blur(18px)",
        transition:"all .32s ease",position:"relative",overflow:"hidden",
        boxShadow:open?`0 0 55px ${e.g},0 14px 55px rgba(0,0,0,.55)`:"0 4px 24px rgba(0,0,0,.35)",
      }}>
        {/* top glow bar */}
        <div style={{position:"absolute",top:0,left:18,right:18,height:2,borderRadius:1,
          background:`linear-gradient(90deg,transparent,${e.c},transparent)`,
          opacity:open?1:.25,transition:"opacity .3s"}}/>

        {/* shimmer */}
        <div style={{position:"absolute",inset:0,borderRadius:18,pointerEvents:"none",
          background:`linear-gradient(110deg,transparent 38%,${e.c}14 50%,transparent 62%)`,
          backgroundSize:"220% 100%",
          animation:open?"shimmer 3s linear infinite":"none"}}/>

        {/* scan line */}
        {open&&<div style={{position:"absolute",left:0,right:0,height:2,
          background:`linear-gradient(90deg,transparent,${e.c}44,transparent)`,
          animation:"scanLine 3s linear infinite",pointerEvents:"none"}}/>}

        {/* landmark badge */}
        {m.lm&&<div style={{position:"absolute",top:13,right:13,
          background:e.g,border:`1px solid ${e.b}`,color:e.c,
          fontSize:9,fontFamily:"var(--mono)",fontWeight:700,
          padding:"3px 9px",borderRadius:20,letterSpacing:".1em",textTransform:"uppercase",
        }}>⭐ Landmark</div>}

        {/* year chip */}
        <div className="yr" style={{
          display:"inline-block",fontFamily:"var(--mono)",fontSize:11,fontWeight:700,
          color:e.c,background:e.g,border:`1px solid ${e.b}`,
          padding:"3px 11px",borderRadius:20,marginBottom:9,letterSpacing:".08em",
          transition:"transform .25s",
        }}>{m.year}</div>

        {/* location */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:11,
          background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:20,padding:"5px 12px",width:"fit-content",maxWidth:"100%",
        }}>
          <span style={{fontSize:13,flexShrink:0}}>📍</span>
          <span style={{fontFamily:"var(--body)",fontSize:11,
            color:"rgba(200,220,255,0.6)",lineHeight:1.3,
          }}>{m.loc}</span>
        </div>

        {/* title */}
        <div style={{fontFamily:"var(--head)",fontSize:15,fontWeight:700,
          color:"#EEF2FF",lineHeight:1.28,marginBottom:4}}>{m.title}</div>
        <div style={{fontFamily:"var(--body)",fontSize:12,
          color:"rgba(170,195,240,0.45)",marginBottom:open?14:0,lineHeight:1.4}}>{m.sub}</div>

        {/* expanded */}
        {open&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"var(--body)",fontSize:13.5,
              color:"rgba(200,220,255,0.83)",lineHeight:1.82,marginBottom:14}}>{m.body}</div>

            <div style={{
              background:`linear-gradient(135deg,rgba(0,0,0,0.45),${e.g})`,
              border:`1px solid ${e.b}`,borderRadius:10,padding:"10px 14px",marginBottom:14,
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,
                background:`linear-gradient(90deg,transparent,${e.c}55,transparent)`}}/>
              <div style={{fontSize:9,color:e.c,fontFamily:"var(--mono)",fontWeight:700,
                letterSpacing:".12em",marginBottom:5}}>⚡ CLINICAL IMPACT</div>
              <div style={{fontFamily:"var(--body)",fontSize:13,
                color:"rgba(220,238,255,.92)",lineHeight:1.55}}>{m.impact}</div>
            </div>

            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {m.tags.map(t=>(
                <span key={t} className="tc" style={{
                  background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${e.b}`,color:e.c,
                  fontSize:10,fontFamily:"var(--mono)",padding:"3px 10px",borderRadius:20,
                }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{position:"absolute",bottom:9,right:13,fontSize:10,fontFamily:"var(--mono)",
          color:"rgba(160,185,230,0.25)"}}>{open?"▲ collapse":"▼ expand"}</div>
      </div>

      {/* connector */}
      <div style={{position:"absolute",top:"50%",
        [side==="left"?"right":"left"]:-48,
        width:42,height:1,
        background:`linear-gradient(${side==="left"?"to left":"to right"},transparent,${e.c}70)`,
      }}/>
    </div>
  );
}

/* ── ERA DIVIDER ─────────────────────────────────────── */
function EraDiv({era}){
  const e=ERAS[era];
  return(
    <div style={{position:"relative",display:"flex",alignItems:"center",
      justifyContent:"center",margin:"52px 0 28px"}}>
      <div style={{position:"absolute",left:0,right:0,height:1,
        background:`linear-gradient(90deg,transparent,${e.c}2a,transparent)`}}/>
      <div style={{
        display:"inline-flex",alignItems:"center",gap:10,
        padding:"9px 22px",borderRadius:40,
        background:e.g,border:`1.5px solid ${e.b}`,
        fontFamily:"var(--mono)",fontSize:10,fontWeight:700,
        color:e.c,letterSpacing:".12em",textTransform:"uppercase",
        position:"relative",zIndex:2,
        boxShadow:`0 0 20px ${e.g}`,
      }}>
        <span style={{fontSize:15}}>{e.icon}</span>
        <span>{e.label}</span>
        <span style={{opacity:.5}}>·</span>
        <span>{e.years}</span>
      </div>
    </div>
  );
}

/* ── TICKER ──────────────────────────────────────────── */
function Ticker(){
  const txt=[
    "CLINICAL DECISION SUPPORT · BOSTON 2000",
    "FIRST CAD MAMMOGRAPHY · FDA 2001",
    "HUMAN GENOME PROJECT · NIH 2003",
    "IBM WATSON · NEW YORK 2011",
    "ALEXNET · TORONTO 2012",
    "DEEPMIND NHS PARTNERSHIP · LONDON 2014",
    "STANFORD DERMATOLOGY · CALIFORNIA 2016",
    "GOOGLE RETINOPATHY · INDIA 2017",
    "IDX-DR AUTONOMOUS AI · IOWA 2018",
    "ALPHAFOLD2 · LONDON 2021",
    "MED-PALM 2 · MOUNTAIN VIEW 2023",
    "AGENTIC AI · GLOBAL 2026",
  ].join("  ●  ");
  return(
    <div style={{overflow:"hidden",whiteSpace:"nowrap",
      borderTop:"1px solid rgba(79,195,247,0.1)",
      borderBottom:"1px solid rgba(79,195,247,0.1)",
      padding:"8px 0",background:"rgba(79,195,247,0.03)",marginBottom:52}}>
      <div style={{display:"inline-block",animation:"ticker 35s linear infinite",
        fontFamily:"var(--mono)",fontSize:9.5,
        color:"rgba(79,195,247,0.55)",letterSpacing:".12em",fontWeight:700}}>
        {txt}{"  ●  "}{txt}
      </div>
    </div>
  );
}

/* ── APP ─────────────────────────────────────────────── */
export default function App(){
  const [open,setOpen]=useState(null);
  const [vis,setVis]=useState({});
  const [scrollPct,setScrollPct]=useState(0);
  const [fillH,setFillH]=useState(0);
  const refs=useRef({});
  const lineRef=useRef(null);
  const wrapRef=useRef(null);

  useEffect(()=>{
    const el=document.createElement("style");
    el.innerHTML=CSS; document.head.appendChild(el);
    return()=>document.head.removeChild(el);
  },[]);

  useEffect(()=>{
    const ob=new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting) setVis(v=>({...v,[e.target.dataset.k]:true}));});
    },{threshold:.12});
    Object.values(refs.current).forEach(el=>el&&ob.observe(el));
    return()=>ob.disconnect();
  },[]);

  useEffect(()=>{
    const el=wrapRef.current;
    const onScroll=()=>{
      const pct=el.scrollTop/(el.scrollHeight-el.clientHeight);
      setScrollPct(pct);
      if(lineRef.current) setFillH(pct*lineRef.current.getBoundingClientRect().height);
    };
    el?.addEventListener("scroll",onScroll);
    return()=>el?.removeEventListener("scroll",onScroll);
  },[]);

  const toggle=k=>setOpen(o=>o===k?null:k);

  // build render list with era dividers
  const groups=[]; let lastEra=null;
  ITEMS.forEach((m,i)=>{
    if(m.era!==lastEra){groups.push({type:"era",era:m.era});lastEra=m.era;}
    groups.push({type:"m",m,idx:i});
  });

  const STATS=[
    {label:"AI Milestones",to:20,suffix:"+"},
    {label:"Years Covered",to:26},
    {label:"Clinical Eras",to:7},
    {label:"Patients Reached",to:2,suffix:"B+"},
  ];

  return(
    <div ref={wrapRef} style={{
      background:"#060C1A",minHeight:"100vh",
      overflowY:"auto",overflowX:"hidden",
      position:"relative",color:"#EEF2FF",fontFamily:"var(--body)",
    }}>
      <ParticleField/>

      {/* orbs */}
      {[{c:"rgba(79,195,247,0.07)",s:550,style:{left:"-8%",top:"3%"},a:"orb1 20s ease-in-out infinite"},
        {c:"rgba(179,157,219,0.07)",s:420,style:{right:"-7%",bottom:"8%"},a:"orb2 25s ease-in-out infinite 4s"},
        {c:"rgba(77,182,172,0.05)", s:320,style:{left:"42%",top:"45%"},a:"orb3 16s ease-in-out infinite 8s"},
      ].map((o,i)=>(
        <div key={i} style={{position:"fixed",borderRadius:"50%",
          width:o.s,height:o.s,pointerEvents:"none",zIndex:0,
          background:`radial-gradient(circle,${o.c},transparent 70%)`,
          animation:o.a,...o.style}}/>
      ))}

      {/* scroll bar */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:100,
        background:"rgba(255,255,255,0.04)"}}>
        <div style={{height:"100%",width:`${scrollPct*100}%`,
          background:"linear-gradient(90deg,#4FC3F7,#80CBC4,#B39DDB)",
          transition:"width .1s linear"}}/>
      </div>

      {/* live badge */}
      <div style={{position:"fixed",top:14,right:18,zIndex:100,
        display:"flex",alignItems:"center",gap:7,
        background:"rgba(6,12,26,.88)",backdropFilter:"blur(10px)",
        border:"1px solid rgba(79,195,247,0.18)",borderRadius:20,
        padding:"5px 14px 5px 10px",fontSize:10,fontFamily:"var(--mono)",
        color:"rgba(79,195,247,.88)",letterSpacing:".1em"}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:"#4FC3F7",
          animation:"blink 1.3s ease-in-out infinite",boxShadow:"0 0 7px #4FC3F7"}}/>
        LIVE TIMELINE
      </div>

      <div style={{maxWidth:1080,margin:"0 auto",padding:"0 20px",position:"relative",zIndex:1}}>

        {/* ── HERO ── */}
        <div style={{textAlign:"center",padding:"82px 0 0"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(79,195,247,0.07)",border:"1px solid rgba(79,195,247,0.22)",
            borderRadius:30,padding:"6px 20px",marginBottom:28,
            fontSize:10,fontFamily:"var(--mono)",color:"#4FC3F7",
            letterSpacing:".15em",fontWeight:700}}>
            <span style={{animation:"blink 1.6s infinite"}}>●</span>
            MIT SCHOOL OF COMPUTING · AI FOR HEALTHCARE · BATCH 2026
          </div>

          <h1 style={{
            fontFamily:"var(--head)",fontSize:"clamp(26px,5.5vw,58px)",
            fontWeight:800,lineHeight:1.08,marginBottom:10,
            background:"linear-gradient(130deg,#E8F4FF 15%,#4FC3F7 45%,#80CBC4 65%,#B39DDB 88%)",
            backgroundSize:"200% 200%",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            animation:"gradShift 6s ease infinite",
          }}>Evolution of AI in Healthcare</h1>

          <div style={{fontFamily:"var(--mono)",fontSize:13,
            color:"rgba(79,195,247,0.65)",letterSpacing:".12em",marginBottom:12}}>
            2000 — 2026
          </div>

          <p style={{fontFamily:"var(--body)",fontSize:14.5,
            color:"rgba(180,205,255,0.48)",maxWidth:540,
            margin:"0 auto 38px",lineHeight:1.8}}>
            From deterministic expert systems to autonomous agentic intelligence —
            a quarter-century of breakthroughs that transformed how humanity diagnoses, treats, and heals.
          </p>

          {/* ECG */}
          <div style={{margin:"0 auto 38px",maxWidth:740}}><Ecg/></div>

          {/* Stats */}
          <div style={{display:"flex",justifyContent:"center",gap:12,
            flexWrap:"wrap",marginBottom:52}}>
            {STATS.map(s=>(
              <div key={s.label} style={{background:"rgba(255,255,255,0.025)",
                border:"1px solid rgba(79,195,247,0.1)",
                borderRadius:14,padding:"17px 26px",textAlign:"center",
                minWidth:112,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,
                  background:"linear-gradient(90deg,transparent,rgba(79,195,247,0.35),transparent)"}}/>
                <div style={{fontFamily:"var(--head)",fontSize:30,fontWeight:800,
                  color:"#4FC3F7",lineHeight:1}}>
                  <Counter to={s.to} suffix={s.suffix}/>
                </div>
                <div style={{fontFamily:"var(--body)",fontSize:11,
                  color:"rgba(160,190,240,0.38)",marginTop:5,letterSpacing:".04em"}}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Ticker/>

        {/* ── TIMELINE ── */}
        <div style={{position:"relative",paddingBottom:80}}>

          {/* center line */}
          <div ref={lineRef} style={{position:"absolute",left:"50%",top:0,bottom:0,
            width:2,transform:"translateX(-50%)",zIndex:1}}>
            <div style={{position:"absolute",inset:0,
              background:"linear-gradient(to bottom,transparent,rgba(79,195,247,0.1) 8%,rgba(179,157,219,0.1) 92%,transparent)"}}/>
            <div style={{position:"absolute",top:0,left:0,right:0,height:fillH,
              background:"linear-gradient(to bottom,#4FC3F7,#80CBC4,#B39DDB)",
              boxShadow:"0 0 12px rgba(79,195,247,0.5)",transition:"height .2s ease"}}/>
          </div>

          {groups.map((g,gi)=>{
            if(g.type==="era") return <EraDiv key={gi} era={g.era}/>;
            const {m,idx}=g;
            const k=`${m.year}-${idx}`;
            const side=idx%2===0?"left":"right";
            const e=ERAS[m.era];
            return(
              <div key={k} data-k={k} ref={el=>refs.current[k]=el}
                style={{position:"relative",display:"flex",
                  alignItems:"center",marginBottom:30,minHeight:82}}>
                {/* node */}
                <div style={{position:"absolute",left:"50%",
                  transform:"translateX(-50%)",zIndex:10}}>
                  <Node c={e.c} g={e.g} lm={m.lm} vis={!!vis[k]}/>
                </div>
                {/* year label other side */}
                <div style={{position:"absolute",
                  [side==="left"?"left":"right"]:"calc(50% + 30px)",
                  fontFamily:"var(--mono)",fontSize:10,fontWeight:700,
                  color:`${e.c}77`,letterSpacing:".1em",
                  opacity:vis[k]?1:0,transition:"opacity .5s ease .4s",whiteSpace:"nowrap",
                }}>{m.year}</div>
                <Card m={m} side={side} vis={!!vis[k]}
                  open={open===k} onToggle={()=>toggle(k)}/>
              </div>
            );
          })}

          {/* end marker */}
          <div style={{display:"flex",flexDirection:"column",
            alignItems:"center",gap:14,paddingTop:28}}>
            <div style={{width:58,height:58,borderRadius:"50%",
              background:"linear-gradient(135deg,#4FC3F7,#80CBC4,#B39DDB)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:27,animation:"floatY 3s ease-in-out infinite",
              boxShadow:"0 0 50px rgba(79,195,247,0.4),0 0 100px rgba(179,157,219,0.2)"}}>🚀</div>
            <div style={{fontFamily:"var(--head)",fontSize:19,fontWeight:700,
              color:"rgba(190,215,255,0.5)"}}>The journey continues…</div>
            <div style={{fontFamily:"var(--mono)",fontSize:10.5,
              color:"rgba(160,190,240,0.23)",textAlign:"center",lineHeight:1.8,letterSpacing:".04em"}}>
              From IF–THEN rules to agentic reasoning pipelines spanning the globe.<br/>
              AI is becoming medicine's most transformative partner in history.
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.045)",
          padding:"18px 0 42px",display:"flex",justifyContent:"space-between",
          alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{fontFamily:"var(--mono)",fontSize:10,
            color:"rgba(160,190,240,0.22)",letterSpacing:".07em"}}>
            MIT School of Computing · AI for Healthcare · Batch 2026
          </div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,
            color:"rgba(160,190,240,0.22)",letterSpacing:".07em"}}>
            Click cards to expand · ⭐ = Landmark event · Scroll to reveal
          </div>
        </div>
      </div>
    </div>
  );
}
