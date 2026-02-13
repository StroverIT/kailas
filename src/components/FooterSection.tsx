import { Mail, Phone, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-primary-foreground section-padding pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Kailas <span className="text-secondary">Yogalife</span>
            </h3>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-6">
              „Да предоставим пространство, в което да преоткрием богатството на йога –
              за по-добър, по-щастлив и осъзнат живот."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Навигация</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Начало", href: "/#hero" },
                { label: "За нас", href: "/#concept" },
                { label: "Услуги", href: "/#yoga-system" },
                { label: "Ретрийт база", href: "/#space" },
                { label: "Събития", href: "/#events" },
                { label: "Запази място", href: "/#booking" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Контакти</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@prakriti-yoga.eu"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
              >
                <Mail className="w-4 h-4 shrink-0" />
                info@prakriti-yoga.eu
              </a>
              <a
                href="tel:+359877844235"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +359 877 844 235
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60 font-body">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Природен парк „Врачански Балкан", 2 км от пещера Леденика, България</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} Кайлас Йогалайф & Пракрити Йога. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
