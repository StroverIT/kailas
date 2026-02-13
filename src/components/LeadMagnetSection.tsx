"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle } from "lucide-react";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Неуспешно. Опитайте отново.");
    }
    setLoading(false);
  };

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
          <Download className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
          Безплатно ръководство: „Йога при стрес"
        </h2>
        <p className="text-primary-foreground/75 font-body text-lg mb-8 max-w-xl mx-auto">
          Получи нашето безплатно PDF ръководство с 5 дихателни техники и 10-минутна
          Йога Нидра практика за ежедневно спокойствие.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            {error && <p className="text-sm text-destructive w-full">{error}</p>}
            <Input
              type="email"
              placeholder="Твоят имейл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary"
            />
            <Button variant="hero" type="submit" className="shrink-0" disabled={loading}>
              {loading ? "Изпращане..." : "Изтегли безплатно"}
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 text-secondary">
            <CheckCircle className="w-6 h-6" />
            <span className="font-body text-lg">Благодарим! Провери имейла си.</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadMagnetSection;
