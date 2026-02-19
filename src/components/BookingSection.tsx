"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { revealConfig } from "@/lib/animationConfig";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: revealConfig.y.header },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.header,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: headerRef.current, start: revealConfig.start },
        }
      );
      gsap.fromTo(
        formWrapperRef.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          delay: revealConfig.stagger,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: formWrapperRef.current, start: revealConfig.startContent },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Неуспешно изпращане. Опитайте отново.");
    }
    setLoading(false);
  };

  return (
    <section ref={sectionRef} id="booking" className="section-padding bg-gradient-section">
      <div className="container mx-auto max-w-2xl">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">Следваща стъпка</p>
          <h2 className="section-heading mb-4">Готов ли си да си върнеш енергията?</h2>
          <p className="section-subheading mx-auto">
            Запази място за следващия ретрийт. Попълни формата и ще се свържем с теб в рамките на 24 часа.
          </p>
        </div>

        <div ref={formWrapperRef}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1 block">Име</label>
                <Input
                  placeholder="Твоето име"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1 block">Имейл</label>
                <Input
                  type="email"
                  placeholder="imeil@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body mb-1 block">Телефон (по избор)</label>
              <Input
                placeholder="+359 ..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body mb-1 block">
                Разкажи ни за себе си и какво търсиш
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-body resize-none"
                placeholder="Твоят опит с йога, какво те интересува..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button variant="default" type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Изпращане..." : "Изпрати запитване"}
            </Button>
          </form>
        ) : (
          <div className="glass-card p-12 text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-semibold mb-2 text-foreground">Благодарим ти!</h3>
            <p className="text-muted-foreground font-body">
              Получихме запитването ти. Ще се свържем с теб скоро.
            </p>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
