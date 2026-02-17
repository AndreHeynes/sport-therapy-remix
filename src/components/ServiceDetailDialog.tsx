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
  postop: {
    en: (
      <div className="space-y-8 text-brand-charcoal">
        <p className="text-lg leading-relaxed text-muted-foreground">
          The surgery was the first step—now the real work begins. Whether you've just had a joint replacement, an ACL reconstruction, or spinal surgery, the "success" of your procedure isn't just determined by the surgeon's hands, but by how you move in the weeks and months that follow.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          As specialists in post-operative musculoskeletal physiotherapy, we bridge the gap between the operating theater and your return to daily life, sport, or work. Here is how we help you navigate the road to recovery.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Why Specialized Post-Op Care Matters</h3>
          <p className="text-muted-foreground mb-3">
            Surgery creates a controlled trauma to the body. While the "fix" is in place, your muscles are often inhibited, your joints are stiff, and your brain's connection to those movement patterns is temporarily disrupted.
          </p>
          <p className="text-muted-foreground">
            Generic exercises aren't enough. You need a phased approach that respects biological healing timelines while pushing for optimal function.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Our Three-Phase Approach to Your Recovery</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Phase</th>
                  <th className="border border-border p-3 text-left font-heading">Goal</th>
                  <th className="border border-border p-3 text-left font-heading">What We Do</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">1. Protection &amp; Mobility</td><td className="border border-border p-3">Reduce swelling and regain basic range of motion.</td><td className="border border-border p-3">Gentle manual therapy, swelling management, and "activation" exercises to wake up dormant muscles.</td></tr>
                <tr><td className="border border-border p-3 font-medium">2. Strength &amp; Loading</td><td className="border border-border p-3">Rebuild the muscle tissue lost during the injury and surgery.</td><td className="border border-border p-3">Progressive resistance training tailored to your specific surgical precautions.</td></tr>
                <tr><td className="border border-border p-3 font-medium">3. Functional Return</td><td className="border border-border p-3">Get you back to your specific "gold standard" of movement.</td><td className="border border-border p-3">Sport-specific drills, balance work, and high-level conditioning to ensure long-term success.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">What We Can Offer You</h3>
          <p className="text-muted-foreground mb-3">We don't just give you a photocopied sheet of exercises. Our care is defined by:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Expert Protocol Management:</strong> We speak the language of surgeons. We follow (and adapt) specific surgical protocols to ensure we never overstress a healing graft or implant.</li>
            <li><strong>Pain Management Techniques:</strong> Using a mix of manual therapy and movement, we help you transition off post-op medications faster.</li>
            <li><strong>Biomechanical Analysis:</strong> We look at the whole person. If you had knee surgery, we're looking at your hip and ankle to make sure they aren't "cheating" and causing future issues.</li>
            <li><strong>Confidence Building:</strong> The "fear of re-injury" is a major hurdle. We provide a safe environment to test your limits so you can trust your body again.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Getting You Back to "Your Normal"</h3>
          <p className="text-muted-foreground mb-4">
            "Success" looks different for everyone. For some, it's walking the dog without a limp; for others, it's returning to competitive rugby or a heavy lifting program. Our job is to understand your specific "why" and build the roadmap to get you there.
          </p>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg">
            <strong>Important Note:</strong> Early intervention is key. Even if you are still in a brace or on crutches, starting the right kind of movement early can significantly shorten your total recovery time.
          </p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Are you ready to start your recovery journey on the right foot?</h3>
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
          Operácia bola prvým krokom — teraz začína skutočná práca. Či už ste práve absolvovali výmenu kĺbu, rekonštrukciu ACL alebo operáciu chrbtice, „úspech" vášho zákroku nie je určený len rukami chirurga, ale tým, ako sa hýbete v týždňoch a mesiacoch, ktoré nasledujú.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Ako špecialisti na pooperačnú muskuloskeletálnu fyzioterapiu premosťujeme priepasť medzi operačnou sálou a vaším návratom do bežného života, športu alebo práce. Tu je návod, ako vám pomôžeme zvládnuť cestu k zotaveniu.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Prečo záleží na špecializovanej pooperačnej starostlivosti</h3>
          <p className="text-muted-foreground mb-3">
            Operácia vytvára kontrolovanú traumu tela. Zatiaľ čo „oprava" je na mieste, vaše svaly sú často inhibované, kĺby stuhnuté a spojenie vášho mozgu s týmito pohybovými vzorcami je dočasne narušené.
          </p>
          <p className="text-muted-foreground">
            Všeobecné cvičenia nestačia. Potrebujete fázový prístup, ktorý rešpektuje biologické časové rámce hojenia a zároveň tlačí na optimálnu funkciu.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Náš trojfázový prístup k vášmu zotaveniu</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Fáza</th>
                  <th className="border border-border p-3 text-left font-heading">Cieľ</th>
                  <th className="border border-border p-3 text-left font-heading">Čo robíme</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">1. Ochrana a mobilita</td><td className="border border-border p-3">Zníženie opuchu a obnovenie základného rozsahu pohybu.</td><td className="border border-border p-3">Jemná manuálna terapia, manažment opuchu a „aktivačné" cvičenia na prebudenie spiaceho svalstva.</td></tr>
                <tr><td className="border border-border p-3 font-medium">2. Sila a zaťažovanie</td><td className="border border-border p-3">Obnovenie svalového tkaniva strateného počas zranenia a operácie.</td><td className="border border-border p-3">Progresívny odporový tréning prispôsobený vašim špecifickým chirurgickým opatreniam.</td></tr>
                <tr><td className="border border-border p-3 font-medium">3. Funkčný návrat</td><td className="border border-border p-3">Vrátiť vás k vášmu špecifickému „zlatému štandardu" pohybu.</td><td className="border border-border p-3">Športovo špecifické cvičenia, práca s rovnováhou a kondičný tréning na vysokej úrovni.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Čo vám môžeme ponúknuť</h3>
          <p className="text-muted-foreground mb-3">Nedávame vám len ofotený hárok cvičení. Naša starostlivosť je definovaná:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Expertný manažment protokolov:</strong> Hovoríme jazykom chirurgov. Dodržiavame (a prispôsobujeme) špecifické chirurgické protokoly, aby sme nikdy nepreťažili hojaci sa štep alebo implantát.</li>
            <li><strong>Techniky manažmentu bolesti:</strong> Kombináciou manuálnej terapie a pohybu vám pomáhame rýchlejšie prejsť z pooperačných liekov.</li>
            <li><strong>Biomechanická analýza:</strong> Pozeráme sa na celého človeka. Ak ste mali operáciu kolena, pozeráme sa na váš bedrový kĺb a členok, aby sme sa uistili, že „nepodvádzajú" a nespôsobujú budúce problémy.</li>
            <li><strong>Budovanie sebadôvery:</strong> „Strach z opätovného zranenia" je veľká prekážka. Poskytujeme bezpečné prostredie na testovanie vašich limitov, aby ste mohli opäť dôverovať svojmu telu.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Vrátime vás k „vášmu normálu"</h3>
          <p className="text-muted-foreground mb-4">
            „Úspech" vyzerá pre každého inak. Pre niektorých je to prechádzka so psom bez krívania; pre iných je to návrat ku kompetitívnemu rugby alebo programu ťažkého zdvíhania. Našou úlohou je pochopiť vaše konkrétne „prečo" a vybudovať cestovnú mapu, ako sa tam dostať.
          </p>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg">
            <strong>Dôležitá poznámka:</strong> Včasná intervencia je kľúčová. Aj keď ste stále v ortéze alebo na barlách, začatie správneho druhu pohybu včas môže výrazne skrátiť celkový čas zotavenia.
          </p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Ste pripravení začať cestu k zotaveniu správnou nohou?</h3>
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
  sports: {
    en: (
      <div className="space-y-8 text-brand-charcoal">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Whether you're a professional athlete chasing a personal best or a "weekend warrior" just trying to stay active, nothing hits quite as hard as an injury. One day you're in the flow; the next, you're on the sidelines, wondering if your knee will ever feel the same.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          At our clinic, we don't just "fix" injuries—we rebuild athletes. As specialist sports physiotherapists, we understand that your goals aren't just about walking without pain; they're about returning to the pitch, the track, or the gym stronger than you were before.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Beyond the Ice Pack: Modern Treatment in 2026</h3>
          <p className="text-muted-foreground mb-4">
            The old advice of "just rest and ice it" is, frankly, outdated. While rest has its place, modern sports science has shifted toward <strong>Active Recovery</strong>. We follow the PEACE & LOVE protocol, moving away from total immobilization toward guided, pain-free movement that keeps your tissues resilient.
          </p>
          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">How We Approach Your Recovery:</h4>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Precision Diagnosis:</strong> We use biomechanical screening and movement analysis to find the <em>why</em> behind the <em>what</em>.</li>
            <li><strong>Manual Therapy:</strong> Hands-on techniques to reduce neuromuscular inhibition and manage pain early on.</li>
            <li><strong>Graduated Loading:</strong> We don't just wait for it to stop hurting. We find the "sweet spot" of stress that helps your tendons and muscles adapt and heal faster.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Prevention: The "Prehab" Revolution</h3>
          <p className="text-muted-foreground mb-4">
            The best injury is the one that never happens. In 2026, we focus heavily on <strong>Prehabilitation</strong>. If you only see a physio when you're broken, you're missing out on half the value we provide.
          </p>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg mb-6">
            <strong>Expert Tip:</strong> Research shows that sport-specific neuromuscular training can reduce the risk of non-contact ACL injuries by up to 50%.
          </p>
          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Our Prevention Toolkit</h4>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Feature</th>
                  <th className="border border-border p-3 text-left font-heading">Benefit to You</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">Gait & Video Analysis</td><td className="border border-border p-3">Identifies "leakage" in your running form that leads to overuse injuries.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Strength & Conditioning</td><td className="border border-border p-3">Targets your "weak links" (like glute medius or core stability) before they fail.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Load Management</td><td className="border border-border p-3">We help you navigate the 10% rule, ensuring your training volume doesn't outpace your recovery.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">What Sets a Specialist Apart?</h3>
          <p className="text-muted-foreground mb-3">
            You might wonder: "Can't I just see a general physio?" While generalists are great for everyday aches, a <strong>Specialist Sports Physiotherapist</strong> understands the unique demands of your specific sport.
          </p>
          <p className="text-muted-foreground">
            We know the difference between the explosive power needed for a 100m sprint and the endurance required for an Ironman. We don't just get you "better"; we get you <strong>game-ready</strong>. We analyze your technique—your swing, your stride, your lift—to ensure that when you return, you aren't just repeating the same patterns that led to the injury in the first place.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">The Path Back to Peak Performance</h3>
          <p className="text-muted-foreground">
            Recovery isn't a straight line, but it should be a planned one. Our return-to-play protocols are data-driven. We use objective metrics—strength ratios, hop tests, and even wearable data—to ensure you're truly ready to go full-tilt.
          </p>
          <p className="text-muted-foreground mt-3 font-semibold">We don't just clear you to play; we prepare you to win.</p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Ready to get back in the game?</h3>
          <p className="text-muted-foreground mb-4">
            If you're currently nursing an injury or want to ensure your body is ready for your next big challenge, let's talk. We're here to help you move better, perform higher, and stay on the field.
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
          Či už ste profesionálny športovec, ktorý sa snaží o osobný rekord, alebo „víkendový bojovník", ktorý sa len snaží zostať aktívny, nič nezasiahne tak tvrdo ako zranenie. Jeden deň ste v rytme; ďalší deň sedíte na lavičke a premýšľate, či sa vaše koleno bude niekedy cítiť rovnako.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          V našej klinike len „neopravujeme" zranenia — obnovujeme športovcov. Ako špecialisti na športovú fyzioterapiu chápeme, že vaše ciele nie sú len o chôdzi bez bolesti; sú o návrate na ihrisko, na dráhu alebo do posilňovne silnejší, než ste boli predtým.
        </p>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Za ľadovým obkladom: Moderná liečba v roku 2026</h3>
          <p className="text-muted-foreground mb-4">
            Stará rada „len si odpočiňte a priložte ľad" je úprimne povedané zastaraná. Hoci odpočinok má svoje miesto, moderná športová veda sa posunula smerom k <strong>aktívnemu zotaveniu</strong>. Dodržiavame protokol PEACE & LOVE, pričom sa vzďaľujeme od úplnej imobilizácie smerom k riadenému, bezbolestnému pohybu, ktorý udržuje vaše tkanivá odolné.
          </p>
          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Ako pristupujeme k vášmu zotaveniu:</h4>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Presná diagnostika:</strong> Používame biomechanický screening a analýzu pohybu na nájdenie <em>prečo</em> za <em>čo</em>.</li>
            <li><strong>Manuálna terapia:</strong> Manuálne techniky na zníženie neuromuskulárnej inhibície a včasné zvládanie bolesti.</li>
            <li><strong>Postupné zaťažovanie:</strong> Nečakáme len, kým to prestane bolieť. Nájdeme „sladký bod" záťaže, ktorý pomáha vašim šľachám a svalom prispôsobiť sa a hojiť sa rýchlejšie.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Prevencia: Revolúcia „Prehabilitácie"</h3>
          <p className="text-muted-foreground mb-4">
            Najlepšie zranenie je to, ktoré sa nikdy nestane. V roku 2026 sa intenzívne zameriavame na <strong>prehabilitáciu</strong>. Ak navštevujete fyzioterapeuta len keď ste „rozbití", prichádzate o polovicu hodnoty, ktorú poskytujeme.
          </p>
          <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-lg mb-6">
            <strong>Tip odborníka:</strong> Výskum ukazuje, že športovo špecifický neuromuskulárny tréning môže znížiť riziko bezkontaktných zranení ACL až o 50%.
          </p>
          <h4 className="text-xl font-heading font-semibold mb-3 text-brand-teal">Naša sada preventívnych nástrojov</h4>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-teal/10">
                  <th className="border border-border p-3 text-left font-heading">Funkcia</th>
                  <th className="border border-border p-3 text-left font-heading">Prínos pre vás</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border border-border p-3 font-medium">Analýza chôdze a videa</td><td className="border border-border p-3">Identifikuje „úniky" vo vašej bežeckej forme, ktoré vedú k zraneniam z preťaženia.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Silový a kondičný tréning</td><td className="border border-border p-3">Zameriava sa na vaše „slabé články" (ako gluteus medius alebo stabilitu jadra) skôr, než zlyhajú.</td></tr>
                <tr><td className="border border-border p-3 font-medium">Manažment záťaže</td><td className="border border-border p-3">Pomôžeme vám navigovať pravidlo 10%, aby váš tréningový objem nepredbiehal vaše zotavenie.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Čo odlišuje špecialistu?</h3>
          <p className="text-muted-foreground mb-3">
            Možno sa pýtate: „Nemôžem jednoducho ísť k všeobecnému fyzioterapeutovi?" Hoci všeobecní odborníci sú skvelí pre každodenné bolesti, <strong>špecialista na športovú fyzioterapiu</strong> rozumie jedinečným požiadavkám vášho konkrétneho športu.
          </p>
          <p className="text-muted-foreground">
            Poznáme rozdiel medzi výbušnou silou potrebnou na 100m šprint a vytrvalosťou potrebnou na Ironman. Nedostaneme vás len do „lepšieho" stavu; dostaneme vás do stavu <strong>pripraveného na zápas</strong>. Analyzujeme vašu techniku — váš švih, váš krok, váš zdvih — aby sme zabezpečili, že keď sa vrátite, nebudete len opakovať rovnaké vzorce, ktoré viedli k zraneniu.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold mb-4">Cesta späť k vrcholovému výkonu</h3>
          <p className="text-muted-foreground">
            Zotavenie nie je priamka, ale malo by byť naplánované. Naše protokoly návratu do hry sú založené na dátach. Používame objektívne metriky — pomery sily, testy skokov a dokonca dáta z nositeľných zariadení — aby sme zabezpečili, že ste naozaj pripravení ísť naplno.
          </p>
          <p className="text-muted-foreground mt-3 font-semibold">Nedávame vám len povolenie hrať; pripravíme vás na víťazstvo.</p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-heading font-bold mb-3">Ste pripravení vrátiť sa do hry?</h3>
          <p className="text-muted-foreground mb-4">
            Ak momentálne liečite zranenie alebo chcete zabezpečiť, že vaše telo je pripravené na vašu ďalšiu veľkú výzvu, porozprávajme sa. Sme tu, aby sme vám pomohli hýbať sa lepšie, podávať vyšší výkon a zostať na ihrisku.
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
    postop: t('services.postop'),
    sports: t('services.sports'),
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
