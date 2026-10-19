import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import everyday from "@/assets/eyewear-everyday.jpg";
import sunshine from "@/assets/eyewear-sun.jpg";
import frames from "@/assets/frames.jpg";

const campaigns = [
  { image: everyday, alt: "Two people wearing green and silver optical frames", eyebrow: "EVERYDAY FRAMES. EXTRAORDINARY YOU.", title: "Eyemela", line: "A fresh frame of mind.", description: "Find your next favourite pair. Try it on at our store.", theme: "everyday" },
  { image: sunshine, alt: "Two people wearing cat-eye and aviator sunglasses", eyebrow: "A LITTLE SUN. A LOT OF STYLE.", title: "Eyemela", line: "Hello, sunshine.", description: "Bold shapes. Effortless style. Find your fit in store.", theme: "sunshine" },
];
const styles = [
  { name: "Classic Round", position: "0% 0%" },
  { name: "Gold Aviator", position: "100% 0%" },
  { name: "Cat-Eye", position: "0% 100%" },
  { name: "Clear Square", position: "100% 100%" },
];

export function EyewearHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % campaigns.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);
  const move = (direction: number) => setActive((value) => (value + direction + campaigns.length) % campaigns.length);

  return (
    <section className="eyewear-opening" aria-label="Eyemela eyewear collections">
      <div className="eyewear-campaign" aria-roledescription="carousel">
        {campaigns.map((campaign, index) => (
          <div key={campaign.theme} className={`eyewear-slide eyewear-slide--${campaign.theme} ${active === index ? "is-active" : ""}`} aria-hidden={active !== index} inert={active !== index}>
            <img src={campaign.image} alt={campaign.alt} width={1920} height={1024} loading={index === 0 ? "eager" : "lazy"} className="eyewear-campaign-photo" />
            <div className="eyewear-copy mx-auto max-w-6xl px-5 md:px-8">
              <p className="text-xs font-bold">{campaign.eyebrow}</p>
              {index === 0 ? <h1 className="eyewear-brand mt-3 font-body font-bold">{campaign.title}</h1> : <h2 className="eyewear-brand mt-3 font-body font-bold">{campaign.title}</h2>}
              <p className="eyewear-headline mt-1 font-body font-semibold">{campaign.line}</p>
              <p className="eyewear-description mt-3 text-sm md:text-base">{campaign.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="lg" className="h-11 px-5"><a href="#store"><MapPin />Visit Our Store</a></Button>
                <Button asChild variant="outline" size="lg" className="h-11 border-foreground/20 bg-transparent px-5"><a href="#eye-test">Free Eye Test<ArrowRight /></a></Button>
              </div>
            </div>
          </div>
        ))}
        <div className="eyewear-carousel-controls">
          <Button variant="ghost" size="icon" onClick={() => move(-1)} aria-label="Previous collection" title="Previous collection"><ArrowLeft /></Button>
          <div className="flex gap-1" aria-label="Choose collection">
            {campaigns.map((campaign, index) => <Button key={campaign.theme} variant="ghost" size="icon" className="h-8 w-7" onClick={() => setActive(index)} aria-label={`Show ${index === 0 ? "everyday frames" : "sunglasses"}`} aria-pressed={active === index}><span className={`eyewear-dot ${active === index ? "is-active" : ""}`} /></Button>)}
          </div>
          <Button variant="ghost" size="icon" onClick={() => move(1)} aria-label="Next collection" title="Next collection"><ArrowRight /></Button>
          <Button variant="ghost" size="icon" onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} title={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <Play /> : <Pause />}</Button>
        </div>
      </div>
      <div className="eyewear-style-strip bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pb-3 pt-5">
          <h2 className="font-body text-lg font-bold">Find your frame</h2>
          <a href="#products" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">All frames<ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className={`eyewear-marquee ${paused || reducedMotion ? "is-paused" : ""}`}>
          <div className="eyewear-style-track">
            {[0, 1, 2].map((repeat) => <div className="eyewear-style-group" key={repeat} aria-hidden={repeat !== 0} inert={repeat !== 0}>
              {styles.map((style) => <a href="#products" key={style.name} className="eyewear-style-item group">
                <div className="eyewear-frame-image" style={{ backgroundImage: `url(${frames})`, backgroundPosition: style.position }} />
                <span className="flex items-center justify-between gap-3 text-sm font-semibold">{style.name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </a>)}
            </div>)}
          </div>
        </div>
        <p className="flex items-center justify-center gap-2 border-t border-border px-5 py-3 text-center text-xs font-semibold text-primary"><MapPin className="h-4 w-4 shrink-0" />Visit our store to get clear picture.</p>
      </div>
    </section>
  );
}