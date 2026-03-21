"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Upload,
  Loader2,
  X,
} from "lucide-react";
import Image from "next/image";
import { allDays, type ScheduleEntry } from "@/lib/scheduleUtils";
import { useToast } from "@/hooks/use-toast";

type Event = {
  id: string;
  date: string;
  title: string;
  type: string;
  location: string;
  spots: number;
  description: string;
  image?: string | null;
  time?: string | null;
  duration?: string | null;
  month: string;
};

type Registration = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  createdAt: string;
};

type EmailEntry = {
  id: string;
  email: string;
  name?: string | null;
  source: "lead_magnet" | "booking" | "registration";
  status?: string | null;
  eventTitle?: string | null;
  phone?: string | null;
  message?: string | null;
  createdAt: string;
};

type EditableScheduleEntry = Omit<ScheduleEntry, "id"> & { id?: string };

type ScheduleSignup = {
  id: string;
  scheduleEntryId: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  weekStart: string;
  createdAt: string;
};

const emptyEvent: Omit<Event, "id"> = {
  date: "",
  title: "",
  type: "",
  location: "Кайлас база",
  spots: 16,
  description: "",
  image: null,
  time: "",
  duration: "",
  month: "mar",
};

const emptyScheduleEntry: EditableScheduleEntry = {
  day: "Понеделник",
  startTime: "",
  endTime: "",
  title: "",
  description: "",
};

const monthOptions = [
  { key: "mar", label: "Март" },
  { key: "apr", label: "Април" },
  { key: "may", label: "Май" },
  { key: "jun", label: "Юни" },
  { key: "jul", label: "Юли" },
  { key: "aug", label: "Август" },
  { key: "sep", label: "Септември" },
  { key: "oct", label: "Октомври" },
  { key: "nov", label: "Ноември" },
  { key: "dec", label: "Декември" },
];

const getMonthLabel = (monthKey: string): string => {
  const month = monthOptions.find((m) => m.key === monthKey);
  return month ? month.label : "";
};

const sourceLabels: Record<EmailEntry["source"], string> = {
  lead_magnet: "Ръководство",
  booking: "Резервация",
  registration: "Събитие",
};

export function AdminPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [scheduleSignups, setScheduleSignups] = useState<ScheduleSignup[]>([]);
  const [editingEvent, setEditingEvent] = useState<
    (Omit<Event, "id"> & { id?: string }) | null
  >(null);
  const [editingSchedule, setEditingSchedule] =
    useState<EditableScheduleEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [expandedScheduleEntryId, setExpandedScheduleEntryId] = useState<
    string | null
  >(null);
  const [showAllBookingInquiries, setShowAllBookingInquiries] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "schedule">("events");
  const [loading, setLoading] = useState(true);
  const [eventImageUploading, setEventImageUploading] = useState(false);
  const [eventImageError, setEventImageError] = useState<string | null>(null);
  const eventImageInputRef = useRef<HTMLInputElement>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const { toast } = useToast();

  const fetchEvents = useCallback(async () => {
    const res = await fetch("/api/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    const res = await fetch("/api/registrations");
    if (res.ok) {
      const data = await res.json();
      setRegistrations(data);
    }
  }, []);

  const fetchEmails = useCallback(async () => {
    const res = await fetch("/api/emails");
    if (res.ok) {
      const data = await res.json();
      setEmails(data);
    }
  }, []);

  const fetchSchedule = useCallback(async () => {
    const res = await fetch("/api/schedule");
    if (res.ok) {
      const data = await res.json();
      setSchedule(Array.isArray(data) ? data : []);
    }
  }, []);

  const fetchScheduleSignups = useCallback(async () => {
    const res = await fetch("/api/schedule-signups");
    if (res.ok) {
      const data = await res.json();
      setScheduleSignups(Array.isArray(data) ? data : []);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchEvents(),
      fetchRegistrations(),
      fetchEmails(),
      fetchSchedule(),
      fetchScheduleSignups(),
    ]);
  }, [
    fetchEvents,
    fetchRegistrations,
    fetchEmails,
    fetchSchedule,
    fetchScheduleSignups,
  ]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshData();
      setLoading(false);
    })();
  }, [refreshData]);

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      if (editingEvent.id) {
        const res = await fetch(`/api/events/${editingEvent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingEvent),
        });
        if (!res.ok) throw new Error("Update failed");
        toast({ title: "Събитието е обновено" });
      } else {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingEvent),
        });
        if (!res.ok) throw new Error("Create failed");
        toast({ title: "Събитието е добавено" });
      }
      setDialogOpen(false);
      setEditingEvent(null);
      await refreshData();
    } catch {
      toast({ title: "Грешка", variant: "destructive" });
    }
  };

  const handleEventImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setEventImageError("Изберете изображение (JPG, PNG, WebP и др.)");
      return;
    }

    setEventImageError(null);
    setEventImageUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload/events", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Качването не успя");
      }
      const data = await res.json();
      if (data.url && editingEvent) {
        setEditingEvent({ ...editingEvent, image: data.url });
      }
    } catch (error) {
      setEventImageError(
        error instanceof Error ? error.message : "Качването не успя",
      );
    } finally {
      setEventImageUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Потвърдете изтриването",
      message:
        "Сигурни ли сте, че искате да изтриете това събитие? Това действие не може да бъде отменено.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Delete failed");
          toast({ title: "Събитието е изтрито" });
          await refreshData();
        } catch {
          toast({ title: "Грешка", variant: "destructive" });
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDeleteRegistration = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Потвърдете изтриването",
      message:
        "Сигурни ли сте, че искате да изтриете това записване? Това действие не може да бъде отменено.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/registrations/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Delete failed");
          toast({ title: "Записването е изтрито" });
          await refreshData();
        } catch {
          toast({ title: "Грешка", variant: "destructive" });
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const getEventRegistrations = (eventId: string) =>
    registrations.filter((r) => r.eventId === eventId);

  const getCurrentWeekStart = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = (day + 6) % 7;
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - diff);
    return d.toISOString();
  };

  const currentWeekStartIso = getCurrentWeekStart();

  const getCurrentWeekSignupsForEntry = (entryId: string) =>
    scheduleSignups.filter(
      (s) =>
        s.scheduleEntryId === entryId &&
        s.weekStart.slice(0, 10) === currentWeekStartIso.slice(0, 10),
    );

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule) return;

    try {
      if (editingSchedule.id) {
        const res = await fetch(`/api/schedule/${editingSchedule.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingSchedule),
        });
        if (!res.ok) throw new Error("Update failed");
        toast({ title: "Записът е обновен" });
      } else {
        const { id, ...payload } = editingSchedule;
        const res = await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        toast({ title: "Записът е добавен" });
      }

      setScheduleDialogOpen(false);
      setEditingSchedule(null);
      await fetchSchedule();
    } catch {
      toast({ title: "Грешка", variant: "destructive" });
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Потвърдете изтриването",
      message:
        "Сигурни ли сте, че искате да изтриете този клас? Това действие не може да бъде отменено.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/schedule/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Delete failed");
          toast({ title: "Записът е изтрит" });
          await fetchSchedule();
        } catch {
          toast({ title: "Грешка", variant: "destructive" });
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-4 max-w-5xl flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground">
          Админ панел
        </h1>
        <Button
          onClick={() => {
            if (activeTab === "events") {
              setEditingEvent({ ...emptyEvent });
              setEventImageError(null);
              setDialogOpen(true);
            } else {
              setEditingSchedule({ ...emptyScheduleEntry });
              setScheduleDialogOpen(true);
            }
          }}
        >
          <Plus className="w-4 h-4 mr-1" />
          {activeTab === "events" ? "Ново събитие" : "Нов запис"}
        </Button>
      </div>

      <div className="container mx-auto px-4 max-w-5xl flex gap-1">
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "events"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-1.5" />
          Събития и имейли
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "schedule"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4 inline mr-1.5" />
          Седмичен график
        </button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {activeTab === "events" ? (
          <div className="space-y-8">
            {/* Booking Inquiries Section */}
            <section className="bg-background rounded-lg border-2 border-secondary overflow-hidden shadow-md">
              <h2 className="font-heading font-semibold text-foreground px-4 py-3 border-b-2 border-secondary bg-secondary/10 flex items-center justify-between">
                <span>🔔 Новите запитвания за резервация</span>
                {emails.filter((e) => e.source === "booking").length > 1 && (
                  <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full font-bold">
                    {emails.filter((e) => e.source === "booking").length}
                  </span>
                )}
              </h2>
              {emails.filter((e) => e.source === "booking").length === 0 ? (
                <p className="text-sm text-muted-foreground px-4 py-6">
                  Няма нови запитвания за резервация.
                </p>
              ) : (
                <div className="space-y-4 p-4">
                  {emails
                    .filter((entry) => entry.source === "booking")
                    .slice(0, showAllBookingInquiries ? undefined : 1)
                    .map((entry) => (
                      <div
                        key={`${entry.source}-${entry.id}`}
                        className="bg-muted/30 rounded-lg p-4 border-l-4 border-secondary hover:bg-muted/50 transition-colors"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              Име
                            </p>
                            <p className="font-semibold text-foreground">
                              {entry.name ?? "–"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              Имейл
                            </p>
                            <a
                              href={`mailto:${entry.email}`}
                              className="text-secondary hover:underline font-medium"
                            >
                              {entry.email}
                            </a>
                          </div>
                        </div>
                        {entry.phone && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase">
                                Телефон
                              </p>
                              <p className="text-foreground">{entry.phone}</p>
                            </div>
                          </div>
                        )}
                        {entry.message && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                              Съобщение
                            </p>
                            <p className="text-sm text-foreground bg-background rounded p-2 whitespace-pre-wrap break-words">
                              {entry.message}
                            </p>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground pt-2 border-t border-muted">
                          {new Date(entry.createdAt).toLocaleDateString(
                            "bg-BG",
                          )}{" "}
                          {new Date(entry.createdAt).toLocaleTimeString(
                            "bg-BG",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                      </div>
                    ))}
                  {emails.filter((e) => e.source === "booking").length > 1 && (
                    <button
                      onClick={() =>
                        setShowAllBookingInquiries(!showAllBookingInquiries)
                      }
                      className="w-full mt-4 px-4 py-2 text-sm font-medium text-secondary hover:text-secondary/80 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors border border-secondary/30 hover:border-secondary/50"
                    >
                      {showAllBookingInquiries
                        ? "🔼 Покажи само последната"
                        : `🔽 Покажи всички ${emails.filter((e) => e.source === "booking").length} запитвания`}
                    </button>
                  )}
                </div>
              )}
            </section>

            <section className="bg-background rounded-lg border border-border overflow-hidden">
              <h2 className="font-heading font-semibold text-foreground px-4 py-3 border-b border-border">
                Всички имейли
              </h2>
              {emails.length === 0 ? (
                <p className="text-sm text-muted-foreground px-4 py-6">
                  Няма събрани имейли.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имейл</TableHead>
                        <TableHead>Име</TableHead>
                        <TableHead>Източник</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emails.map((entry) => (
                        <TableRow key={`${entry.source}-${entry.id}`}>
                          <TableCell className="font-medium">
                            {entry.email}
                          </TableCell>
                          <TableCell>{entry.name ?? "–"}</TableCell>
                          <TableCell>{sourceLabels[entry.source]}</TableCell>
                          <TableCell>
                            {entry.source === "lead_magnet" &&
                            entry.status === "waiting_for_pdf"
                              ? "Чака PDF"
                              : entry.source === "lead_magnet" && entry.status
                                ? entry.status
                                : "–"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleDateString(
                              "bg-BG",
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </section>

            <div className="space-y-3">
              {events.map((event) => {
                const regs = getEventRegistrations(event.id);
                const isExpanded = expandedEventId === event.id;
                return (
                  <div
                    key={event.id}
                    className="bg-background rounded-lg border border-border overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-secondary">
                            {event.date} {getMonthLabel(event.month)}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground truncate">
                          {event.title}
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                          setExpandedEventId(isExpanded ? null : event.id)
                        }
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        <span>{regs.length}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          let duration = event.duration?.match(
                            /\s*(минути|часа|дни|ден)$/,
                          )
                            ? event.duration
                            : event.duration?.match(/^\d+$/)
                              ? `${event.duration} минути`
                              : (event.duration ?? "");
                          if (duration?.match(/^1\s+дни$/)) duration = "1 ден";
                          setEditingEvent({ ...event, duration });
                          setEventImageError(null);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {isExpanded && (
                      <div className="border-t border-border bg-muted/20 px-4 py-3">
                        {regs.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-2">
                            Няма записвания за това събитие.
                          </p>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Име</TableHead>
                                  <TableHead>Имейл</TableHead>
                                  <TableHead>Телефон</TableHead>
                                  <TableHead>Бележка</TableHead>
                                  <TableHead className="w-10" />
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {regs.map((reg) => (
                                  <TableRow key={reg.id}>
                                    <TableCell className="font-medium">
                                      {reg.name}
                                    </TableCell>
                                    <TableCell>{reg.email}</TableCell>
                                    <TableCell>{reg.phone || "–"}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                      {reg.note || "–"}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive h-8 w-8"
                                        onClick={() =>
                                          handleDeleteRegistration(reg.id)
                                        }
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {events.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  Няма добавени събития.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {allDays.map((day) => {
                const dayEntries = schedule
                  .filter((s) => s.day === day)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime));

                if (dayEntries.length === 0) {
                  return (
                    <div
                      key={day}
                      className="bg-background rounded-lg border border-border p-4 opacity-60"
                    >
                      <span className="font-heading font-semibold text-muted-foreground">
                        {day}
                      </span>
                      <span className="text-sm text-muted-foreground ml-3 italic">
                        Няма практики
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={day}
                    className="bg-background rounded-lg border border-border overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                      <span className="font-heading font-semibold text-primary">
                        {day}
                      </span>
                    </div>
                    {dayEntries.map((entry) => {
                      const currentWeekSignups = getCurrentWeekSignupsForEntry(
                        entry.id,
                      );
                      const currentCount = currentWeekSignups.length;
                      const isExpanded = expandedScheduleEntryId === entry.id;
                      return (
                        <div key={entry.id}>
                          <div className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-b-0">
                            <div className="flex items-center gap-1.5 text-secondary shrink-0">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-sm font-medium">
                                {entry.startTime} – {entry.endTime}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground">
                                {entry.title}
                              </span>
                              {entry.description && (
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({entry.description})
                                </span>
                              )}
                              <div className="mt-1 text-xs text-muted-foreground">
                                Тази седмица записани:{" "}
                                <span className="font-semibold text-foreground">
                                  {currentCount}
                                </span>
                              </div>
                            </div>
                            {currentCount > 0 && (
                              <button
                                onClick={() =>
                                  setExpandedScheduleEntryId(
                                    isExpanded ? null : entry.id,
                                  )
                                }
                                className="p-1 hover:bg-muted rounded transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingSchedule({
                                  ...entry,
                                });
                                setScheduleDialogOpen(true);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteSchedule(entry.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {isExpanded && currentCount > 0 && (
                            <div className="border-t border-border bg-muted/20 px-4 py-3">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Име</TableHead>
                                      <TableHead>Имейл</TableHead>
                                      <TableHead>Телефон</TableHead>
                                      <TableHead>Бележка</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {currentWeekSignups.map((signup) => (
                                      <TableRow key={signup.id}>
                                        <TableCell className="text-sm font-medium">
                                          {signup.name}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                          {signup.email}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                          {signup.phone || "–"}
                                        </TableCell>
                                        <TableCell className="text-sm max-w-[200px] truncate">
                                          {signup.note || "–"}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* History: past weeks signups (grouped by weekStart) */}
            {scheduleSignups.length > 0 && (
              <section className="bg-background rounded-lg border border-border overflow-hidden">
                <h3 className="font-heading font-semibold text-foreground px-4 py-3 border-b border-border">
                  История на записванията (седмичен график)
                </h3>
                <div className="max-h-80 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Седмица от</TableHead>
                        <TableHead>Практика</TableHead>
                        <TableHead>Име</TableHead>
                        <TableHead>Имейл</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Бележка</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduleSignups.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(s.weekStart).toLocaleDateString("bg-BG")}
                          </TableCell>
                          <TableCell className="text-sm">
                            {schedule.find((e) => e.id === s.scheduleEntryId)
                              ?.title ?? "–"}
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            {s.name}
                          </TableCell>
                          <TableCell className="text-sm">{s.email}</TableCell>
                          <TableCell className="text-sm">
                            {s.phone || "–"}
                          </TableCell>
                          <TableCell className="text-sm max-w-[200px] truncate">
                            {s.note || "–"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(false);
            setEditingEvent(null);
            setEventImageError(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingEvent?.id ? "Редактирай събитие" : "Ново събитие"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Форма за {editingEvent?.id ? "редактиране" : "създаване"} на
              събитие
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-2">
                <Label>Заглавие *</Label>
                <Input
                  required
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Дата *</Label>
                  <Input
                    required
                    placeholder="напр. 14–16"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Месец</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={editingEvent.month}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        month: e.target.value,
                      })
                    }
                  >
                    {monthOptions.map((m) => (
                      <option key={m.key} value={m.key}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Тип *</Label>
                  <Input
                    required
                    placeholder="напр. Уикенд ретрийт"
                    value={editingEvent.type}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, type: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Места</Label>
                  <Input
                    type="number"
                    min={1}
                    value={editingEvent.spots}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        spots: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Начало</Label>
                  <Input
                    placeholder="напр. 10:00"
                    value={editingEvent.time || ""}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, time: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Продължителност</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={1}
                      placeholder="бр."
                      value={editingEvent.duration?.match(/\d+/)?.[0] ?? ""}
                      onChange={(e) => {
                        const num = e.target.value;
                        const rawUnit =
                          editingEvent.duration?.match(
                            /\s*(минути|часа|дни|ден)$/,
                          )?.[1] ?? "минути";
                        const unit = rawUnit === "ден" ? "дни" : rawUnit;
                        const suffix =
                          unit === "дни" && num === "1" ? "ден" : unit;
                        setEditingEvent({
                          ...editingEvent,
                          duration: num ? `${num} ${suffix}` : "",
                        });
                      }}
                      className="w-20"
                    />
                    <select
                      className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={(
                        editingEvent.duration?.match(
                          /\s*(минути|часа|дни|ден)$/,
                        )?.[1] ?? "минути"
                      ).replace("ден", "дни")}
                      onChange={(e) => {
                        const unit = e.target.value;
                        const num =
                          editingEvent.duration?.match(/^\d+/)?.[0] ?? "";
                        const suffix =
                          unit === "дни" && num === "1" ? "ден" : unit;
                        setEditingEvent({
                          ...editingEvent,
                          duration: num ? `${num} ${suffix}` : "",
                        });
                      }}
                    >
                      <option value="минути">минути</option>
                      <option value="часа">часа</option>
                      <option value="дни">дни</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Локация</Label>
                <Input
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex flex-col gap-3">
                  {editingEvent.image && (
                    <div className="relative inline-flex max-w-xs">
                      <div className="relative w-full aspect-video rounded-md border border-border overflow-hidden bg-muted">
                        {editingEvent.image.startsWith("http") ? (
                          <Image
                            src={editingEvent.image}
                            alt="Event image preview"
                            fill
                            className="object-cover"
                            sizes="320px"
                            unoptimized={
                              editingEvent.image.includes("supabase") ||
                              editingEvent.image.includes("127.0.0.1")
                            }
                          />
                        ) : (
                          <span className="text-muted-foreground text-sm p-2 break-all">
                            {editingEvent.image}
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                        onClick={() =>
                          setEditingEvent({ ...editingEvent, image: null })
                        }
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                  <input
                    ref={eventImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEventImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={eventImageUploading}
                    onClick={() => eventImageInputRef.current?.click()}
                  >
                    {eventImageUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Качване...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        {editingEvent.image
                          ? "Смени изображение"
                          : "Качи изображение"}
                      </>
                    )}
                  </Button>
                </div>
                {eventImageError && (
                  <p className="text-sm text-destructive">{eventImageError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingEvent.id ? "Запази промените" : "Добави събитие"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={scheduleDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setScheduleDialogOpen(false);
            setEditingSchedule(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingSchedule?.id ? "Редактирай запис" : "Нов запис в графика"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Форма за {editingSchedule?.id ? "редактиране" : "създаване"} на
              запис в графика
            </DialogDescription>
          </DialogHeader>
          {editingSchedule && (
            <form onSubmit={handleSaveSchedule} className="space-y-4">
              <div className="space-y-2">
                <Label>Ден *</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editingSchedule.day}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      day: e.target.value,
                    })
                  }
                >
                  {allDays.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Начало *</Label>
                  <Input
                    required
                    placeholder="19:00"
                    value={editingSchedule.startTime}
                    onChange={(e) =>
                      setEditingSchedule({
                        ...editingSchedule,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Край *</Label>
                  <Input
                    required
                    placeholder="20:45"
                    value={editingSchedule.endTime}
                    onChange={(e) =>
                      setEditingSchedule({
                        ...editingSchedule,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Заглавие *</Label>
                <Input
                  required
                  value={editingSchedule.title}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Input
                  value={editingSchedule.description ?? ""}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingSchedule.id ? "Запази промените" : "Добави запис"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.message}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
              }
            >
              Отмени
            </Button>
            <Button variant="destructive" onClick={confirmDialog.onConfirm}>
              Изтрий
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
