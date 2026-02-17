import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
}

const serviceContent: Record<string, { en: React.ReactNode; sk: React.ReactNode }> = {
  musculoskeletal: {
    en: (
      <div className="space-y-8 text-brand-charcoal">
        <p className="text-lg leading-relaxed text-muted-foreground">
          If you have ever felt a sharp twinge in your back after lifting a box, a persistent ache in your knee when climbing stairs, or a stiff neck after a long day at your desk, you have experienced a musculoskeletal (MSK) issue. These conditions are the leading cause of disability worldwide, affecting the very structures that allow us to move, work, and enjoy life.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          As a specialist physiotherapist, my goal isn't just to "fix" a body part. It is to understand the complex interplay between your biology, your lifestyle, and your movement patterns to help you reclaim your function. This guide explains how we approach MSK health through expert Assessment and Management.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">1. The Assessment: Mapping the Root Cause</h3>
          <p className="text-muted-foreground mb-4">A successful recovery starts with a deep dive. We don't just look at where it hurts; we look at <strong>why</strong> it hurts. Our assessment is divided into two vital phases:</p>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Phase A: The Subjective Consultation (Your Story)</h4>
          <p className="text-muted-foreground mb-3">We begin by listening. Understanding the "behavior" of your symptoms is often more diagnostic than an MRI.</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li><strong>The History:</strong> When did it start? Was it a sudden trauma or a gradual "creep" of pain?</li>
            <li><strong>Red Flag Screening:</strong> We are trained to rule out serious underlying pathologies (like fractures or systemic illnesses) to ensure physiotherapy is the safest path for you.</li>
            <li><strong>Lifestyle & Goals:</strong> Do you need to get back to elite-level sports, or simply be able to play with your grandchildren without pain? Your goals dictate our plan.</li>
          </ul>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Phase B: The Objective Examination (The Science)</h4>
          <p className="text-muted-foreground mb-3">Once we have the context, we move to physical testing.</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Range of Motion (ROM):</strong> Using tools like goniometers to measure exactly how much your joints can move.</li>
            <li><strong>Strength Testing:</strong> Assessing muscle power, often using the Medical Research Council (MRC) scale (0–5), to find imbalances.</li>
            <li><strong>Palpation & Special Tests:</strong> Using hands-on techniques to feel for swelling or tension, and performing specific orthopedic tests to isolate ligaments, tendons, or nerves.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">2. The Management: A Multi-Pillar Approach</h3>
          <p className="text-muted-foreground mb-4">Once we have a diagnosis, we move into evidence-based management. Modern physiotherapy has shifted from "passive" treatments (things done to you) to "active" strategies (things you do for yourself).</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Treatment Type</th>
                  <th className="border border-border p-3 text-left font-heading">What it involves</th>
                  <th className="border border-border p-3 text-left font-heading">The Goal</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">Education</td><td className="border border-border p-3">Explaining pain science and "why" things hurt.</td><td className="border border-border p-3">Reducing fear and empowering self-care.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Exercise Therapy</td><td className="border border-border p-3">Progressive loading, stretching, and stability work.</td><td className="border border-border p-3">Building tissue resilience and strength.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Manual Therapy</td><td className="border border-border p-3">Joint mobilizations, massage, and manipulation.</td><td className="border border-border p-3">Short-term pain relief and restoring joint glide.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Lifestyle Advice</td><td className="border border-border p-3">Ergonomics, sleep hygiene, and activity pacing.</td><td className="border border-border p-3">Addressing the "hidden" triggers of MSK pain.</td></tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">The "Gold Standard" of Management: Progressive Loading</h4>
          <p className="text-muted-foreground">
            The most common mistake in managing MSK disorders is avoiding movement entirely. While rest is sometimes necessary in the acute phase, <strong>movement is medicine</strong>. We use the principle of Progressive Loading: gradually increasing the stress on your muscles and joints so they adapt and become stronger than they were before the injury.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">3. Why Specialist Physiotherapy Matters</h3>
          <p className="text-muted-foreground mb-3">MSK health is not a "one-size-fits-all" field. A specialist approach ensures that:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Treatment is Patient-Centered:</strong> We treat the person, not just the X-ray.</li>
            <li><strong>We Minimize Over-Medicalization:</strong> Often, MSK issues can be resolved without surgery or long-term medication through the right mechanical load and education.</li>
            <li><strong>Prevention is Priority:</strong> We don't just get you back to baseline; we "pre-hab" you to ensure the injury doesn't return.</li>
          </ul>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg">
            <strong>Note:</strong> Modern MSK care in 2026 often incorporates digital tracking. We may use apps to monitor your exercise compliance and pain levels in real-time, allowing us to adjust your program between clinic visits.
          </p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Ready to take the first step?</h3>
          <p className="text-muted-foreground mb-4">
            Whether you are dealing with a fresh injury or a chronic ache that has bothered you for years, understanding the mechanics of your body is the first step toward relief.
          </p>
          <Button
            className="btn-shine text-white font-medium px-8 py-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Consultation
          </Button>
        </div>
      </div>
    ),
    sk: (
      <div className="space-y-8 text-brand-charcoal">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Ak ste niekedy pocítili ostré bodnutie v chrbte po zdvihnutí krabice, pretrvávajúcu bolesť kolena pri chôdzi po schodoch alebo stuhnutý krk po dlhom dni za stolom, zažili ste muskuloskeletálny (MSK) problém. Tieto stavy sú hlavnou príčinou invalidity na celom svete a postihujú samotné štruktúry, ktoré nám umožňujú sa hýbať, pracovať a užívať si život.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Ako špecializovaný fyzioterapeut nie je mojím cieľom len „opraviť" časť tela. Mojím cieľom je pochopiť komplexnú súhru medzi vašou biológiou, životným štýlom a pohybovými vzorcami, aby som vám pomohol znovu získať funkčnosť. Tento sprievodca vysvetľuje, ako pristupujeme k MSK zdraviu prostredníctvom odborného hodnotenia a manažmentu.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">1. Hodnotenie: Mapovanie základnej príčiny</h3>
          <p className="text-muted-foreground mb-4">Úspešné zotavenie začína hĺbkovou analýzou. Nepozeráme sa len na to, kde to bolí; pozeráme sa na to, <strong>prečo</strong> to bolí. Naše hodnotenie je rozdelené do dvoch dôležitých fáz:</p>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Fáza A: Subjektívna konzultácia (Váš príbeh)</h4>
          <p className="text-muted-foreground mb-3">Začíname počúvaním. Pochopenie „správania" vašich symptómov je často diagnostickejšie ako MRI.</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li><strong>Anamnéza:</strong> Kedy to začalo? Bolo to náhle trauma alebo postupné „plazenie sa" bolesti?</li>
            <li><strong>Screening červených vlajok:</strong> Sme vyškolení na vylúčenie závažných základných patológií (ako zlomeniny alebo systémové ochorenia), aby sme zabezpečili, že fyzioterapia je pre vás najbezpečnejšou cestou.</li>
            <li><strong>Životný štýl a ciele:</strong> Potrebujete sa vrátiť k elitným športom, alebo jednoducho chcete mať možnosť hrať sa s vnúčatami bez bolesti? Vaše ciele určujú náš plán.</li>
          </ul>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Fáza B: Objektívne vyšetrenie (Veda)</h4>
          <p className="text-muted-foreground mb-3">Keď máme kontext, prejdeme k fyzickému testovaniu.</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Rozsah pohybu (ROM):</strong> Používanie nástrojov ako goniometre na presné meranie rozsahu pohybu vašich kĺbov.</li>
            <li><strong>Testovanie sily:</strong> Hodnotenie svalovej sily, často pomocou škály Medical Research Council (MRC) (0–5), na nájdenie nerovnováh.</li>
            <li><strong>Palpácia a špeciálne testy:</strong> Používanie manuálnych techník na cítenie opuchu alebo napätia a vykonávanie špecifických ortopedických testov na izoláciu väzov, šliach alebo nervov.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">2. Manažment: Viacpilierový prístup</h3>
          <p className="text-muted-foreground mb-4">Keď máme diagnózu, prejdeme k manažmentu založenému na dôkazoch. Moderná fyzioterapia sa posunula od „pasívnych" liečob (vecí, ktoré sa robia pre vás) k „aktívnym" stratégiám (veciam, ktoré robíte pre seba).</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Typ liečby</th>
                  <th className="border border-border p-3 text-left font-heading">Čo zahŕňa</th>
                  <th className="border border-border p-3 text-left font-heading">Cieľ</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">Edukácia</td><td className="border border-border p-3">Vysvetlenie vedy o bolesti a „prečo" veci bolia.</td><td className="border border-border p-3">Zníženie strachu a posilnenie sebastarostlivosti.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Cvičebná terapia</td><td className="border border-border p-3">Progresívne zaťažovanie, strečing a stabilizačná práca.</td><td className="border border-border p-3">Budovanie odolnosti a sily tkanív.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Manuálna terapia</td><td className="border border-border p-3">Mobilizácie kĺbov, masáž a manipulácia.</td><td className="border border-border p-3">Krátkodobá úľava od bolesti a obnovenie kĺbového kĺzania.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Poradenstvo o životnom štýle</td><td className="border border-border p-3">Ergonómia, hygiena spánku a rozloženie aktivít.</td><td className="border border-border p-3">Riešenie „skrytých" spúšťačov MSK bolesti.</td></tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">„Zlatý štandard" manažmentu: Progresívne zaťažovanie</h4>
          <p className="text-muted-foreground">
            Najčastejšou chybou pri manažmente MSK porúch je úplné vyhýbanie sa pohybu. Hoci odpočinok je niekedy potrebný v akútnej fáze, <strong>pohyb je liek</strong>. Používame princíp progresívneho zaťažovania: postupné zvyšovanie záťaže na vaše svaly a kĺby, aby sa prispôsobili a stali sa silnejšími, než boli pred zranením.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">3. Prečo záleží na špecializovanej fyzioterapii</h3>
          <p className="text-muted-foreground mb-3">MSK zdravie nie je oblasť „jeden rozmer pre všetkých". Špecializovaný prístup zabezpečuje, že:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Liečba je zameraná na pacienta:</strong> Liečime osobu, nie len röntgen.</li>
            <li><strong>Minimalizujeme nadmernú medikalizáciu:</strong> MSK problémy sa často dajú vyriešiť bez operácie alebo dlhodobých liekov prostredníctvom správneho mechanického zaťaženia a edukácie.</li>
            <li><strong>Prevencia je prioritou:</strong> Nevraciame vás len na východiskový bod; „pre-habilitujeme" vás, aby sa zranenie nevrátilo.</li>
          </ul>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg">
            <strong>Poznámka:</strong> Moderná MSK starostlivosť v roku 2026 často zahŕňa digitálne sledovanie. Môžeme používať aplikácie na monitorovanie vášho dodržiavania cvičení a úrovní bolesti v reálnom čase, čo nám umožňuje prispôsobiť váš program medzi návštevami kliniky.
          </p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Ste pripravení urobiť prvý krok?</h3>
          <p className="text-muted-foreground mb-4">
            Či už sa zaoberáte čerstvým zranením alebo chronickou bolesťou, ktorá vás trápi roky, pochopenie mechaniky vášho tela je prvým krokom k úľave.
          </p>
          <Button
            className="btn-shine text-white font-medium px-8 py-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Objednajte sa na konzultáciu
          </Button>
        </div>
      </div>
    ),
  },
};

const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({ open, onOpenChange, serviceId }) => {
  const { language, t } = useLanguage();

  const content = serviceContent[serviceId];
  if (!content) return null;

  const titles: Record<string, string> = {
    musculoskeletal: t('services.musculoskeletal'),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-heading font-bold text-brand-charcoal">
            {titles[serviceId] || serviceId}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] px-6 pb-6">
          {language === 'sk' ? content.sk : content.en}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;
