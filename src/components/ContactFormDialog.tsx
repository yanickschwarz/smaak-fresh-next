"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactFormDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const requireToken = Boolean(TURNSTILE_SITE_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Bitte fülle alle Pflichtfelder aus.");
      return;
    }
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("smaak-send-email", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          turnstileToken: token,
        },
      });

      if (error) throw error;

      toast.success("Nachricht erfolgreich gesendet! Du erhältst eine Bestätigung per E-Mail.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setToken(null);
      setOpen(false);
    } catch {
      toast.error("Fehler beim Senden. Bitte versuche es erneut.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader className="text-center items-center">
          <Image src="/images/logo.png" alt="smaak! fresh" width={120} height={48} className="h-12 w-auto mb-2" />
          <DialogTitle className="font-display text-2xl text-foreground">Kontakt ufneh</DialogTitle>
          <DialogDescription className="font-body text-foreground/60">
            Mir fröied eus uf dini Nachricht!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label htmlFor="contact-name" className="font-body text-sm text-foreground/70 mb-1 block">
              Name *
            </label>
            <Input
              id="contact-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Din Name"
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="font-body text-sm text-foreground/70 mb-1 block">
              E-Mail *
            </label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="dini@email.ch"
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="font-body text-sm text-foreground/70 mb-1 block">
              Telefon
            </label>
            <Input
              id="contact-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="079 123 45 67"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="font-body text-sm text-foreground/70 mb-1 block">
              Nachricht *
            </label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Wie chönd mir dir häufe?"
              className="form-input min-h-[120px] resize-none"
              required
            />
          </div>

          {/* Turnstile renders only if a site key is configured */}
          {TURNSTILE_SITE_KEY && (
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setToken}
              onError={() => setToken(null)}
              onExpire={() => setToken(null)}
              options={{ theme: "light" }}
            />
          )}

          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-terracotta text-white font-body font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            {sending ? "Wird gesendet..." : "Nachricht sende"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
