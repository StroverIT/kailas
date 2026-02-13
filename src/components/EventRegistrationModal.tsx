"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import type { Event } from "./EventsSection";

interface EventRegistrationModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventRegistrationModal = ({
  event,
  open,
  onOpenChange,
}: EventRegistrationModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          note: form.note || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Неуспешно записване");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неуспешно записване");
    }
    setLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", note: "" });
      setError("");
    }, 300);
  };

  const spotsColor =
    event.spots <= 12
      ? "text-destructive"
      : event.spots <= 16
        ? "text-yellow-600"
        : "text-green-600";

  const time = event.time ?? undefined;
  const location = event.location ?? "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {event.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Форма за записване за {event.title}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground font-body border-b border-border pb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-secondary" />
            {location}
          </span>
          {time && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary" />
              {time}
            </span>
          )}
          <span className={`flex items-center gap-1.5 font-semibold ${spotsColor}`}>
            <Users className="w-4 h-4" />
            {event.spots} свободни места
          </span>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center gap-3">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Записването е успешно!
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              Ще се свържем с теб на <strong>{form.email}</strong> с допълнителна информация.
            </p>
            <Button onClick={handleClose} className="mt-2">
              Затвори
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="reg-name">Име *</Label>
              <Input
                id="reg-name"
                required
                placeholder="Вашето име"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Имейл *</Label>
              <Input
                id="reg-email"
                type="email"
                required
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-phone">Телефон</Label>
              <Input
                id="reg-phone"
                type="tel"
                placeholder="+359 ..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-note">Бележка</Label>
              <Textarea
                id="reg-note"
                placeholder="Имате ли въпроси или специални изисквания?"
                rows={2}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Изпращане..." : "Запиши се"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
