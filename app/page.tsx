import Link from "next/link";
import { Leaf, Zap, Target } from "lucide-react";
import { VARIETIES, MIXES, PLANS } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { PlanCard } from "@/components/products/PlanCard";
import HeroScene from "@/components/three/HeroScene";

export default function HomePage() {
  return (
    <>
      <HeroScene />

      {/* WHY */}
      <section className="py-24 px-4 sm:px-8 lg:px-16" style={{background:"#0d1a08"}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-sans font-bold uppercase tracking-widest" style={{fontSize:11,color:"#7AAB3A"}}>Why Us</span>
            <h2 className="font-serif text-white mt-3" style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>Nutrition meets luxury</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {icon:<Leaf className="h-5 w-5"/>,title:"Hand-Harvested",desc:"Every tray cut at peak freshness, dispatched the same day."},
              {icon:<Zap className="h-5 w-5"/>,title:"Performance-First",desc:"Each variety targets specific goals — fat loss, recovery, endurance."},
              {icon:<Target className="h-5 w-5"/>,title:"Goal-Oriented",desc:"Curated plans from beginner gym member to elite athlete."},
            ].map(item=>(
              <div key={item.title} className="rounded-2xl p-8 flex flex-col items-start gap-4 border" style={{background:"rgba(255,255,255,0.03)",borderColor:"rgba(255,255,255,0.07)"}}>
                <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{background:"rgba(122,171,58,0.15)",color:"#7AAB3A"}}>{item.icon}</div>
                <h3 className="font-serif text-white" style={{fontSize:"1.2rem"}}>{item.title}</h3>
                <p className="font-sans leading-relaxed" style={{fontSize:14,color:"rgba(255,255,255,0.5)"}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VARIETIES */}
      <section id="varieties" className="py-24 px-4 sm:px-8 lg:px-16 scroll-mt-16" style={{background:"#F5F2E8"}}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-sans font-bold uppercase tracking-widest" style={{fontSize:11,color:"#7AAB3A"}}>Individual Varieties</span>
            <h2 className="font-serif text-forest mt-2 mb-3" style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>Pure, targeted superfoods</h2>
            <p className="font-sans max-w-xl" style={{fontSize:15,color:"#888",lineHeight:1.7}}>Each crafted to fuel a specific performance need — from recovery to endurance to hormone balance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {VARIETIES.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      </section>

      {/* MIXES */}
      <section id="mixes" className="py-24 px-4 sm:px-8 lg:px-16 scroll-mt-16" style={{background:"#EDE8D5"}}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-sans font-bold uppercase tracking-widest" style={{fontSize:11,color:"#7AAB3A"}}>Performance Mixes</span>
            <h2 className="font-serif text-forest mt-2 mb-3" style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>Combined superfood blends</h2>
            <p className="font-sans max-w-xl" style={{fontSize:15,color:"#888",lineHeight:1.7}}>Natural supplement-strength blends. Delivering powerful results in strength, stamina, recovery, and metabolic health.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MIXES.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-24 px-4 sm:px-8 lg:px-16 scroll-mt-16" style={{background:"#F5F2E8"}}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-sans font-bold uppercase tracking-widest" style={{fontSize:11,color:"#7AAB3A"}}>Monthly Plans</span>
            <h2 className="font-serif text-forest mt-2 mb-3" style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>Chart a course. Stick to it.</h2>
            <p className="font-sans max-w-xl" style={{fontSize:15,color:"#888",lineHeight:1.7}}>Ideal nutrition for your body — whether you're a beginner, starting your transformation, or seeking peak performance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map(plan=><PlanCard key={plan.id} plan={plan}/>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-8 text-center relative overflow-hidden" style={{background:"#2D5016"}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at center,rgba(122,171,58,0.15)0%,transparent70%)"}}/>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="font-sans font-bold uppercase tracking-widest mb-4" style={{fontSize:11,color:"#b8d96b"}}>Ready to elevate?</p>
          <h2 className="font-serif text-white mb-6" style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>
            Elevate your plate.{" "}<em className="not-italic" style={{color:"#b8d96b"}}>Embrace the forest.</em>
          </h2>
          <p className="font-sans mb-10" style={{fontSize:15,color:"rgba(255,255,255,0.55)"}}>Questions? Chat with us directly on WhatsApp.</p>
          <a href="https://wa.me/918113998511" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white rounded-full font-bold transition-opacity hover:opacity-90"
            style={{background:"#25D366",padding:"14px 36px",fontSize:14}}>
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.007 22l4.932-1.409C8.341 21.476 10.13 22 11.999 22 17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18c-1.71 0-3.305-.48-4.663-1.31l-.334-.198-3.464.99.944-3.558-.217-.347A8 8 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-8 text-center" style={{background:"#0d1a08"}}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="h-4 w-4" style={{color:"#7AAB3A"}}/>
          <span className="font-serif text-white" style={{fontSize:"1.05rem"}}>fern forest</span>
          <span style={{color:"rgba(255,255,255,0.2)"}}>·</span>
          <span className="font-sans" style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>Fresh Microgreens</span>
        </div>
        <p className="font-sans" style={{fontSize:11,color:"rgba(255,255,255,0.2)"}}>
          © {new Date().getFullYear()} Fern Forest. All rights reserved. · Bengaluru, India
        </p>
      </footer>
    </>
  );
}
