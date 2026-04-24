# Insert two draft articles

Two `INSERT` statements into the `articles` table. Both `published = false`, same hero image, same series label preserved at the top of `content_sk` / `content_en`. Original article (`preco-boli-pochopenie-bolesti`) is **not** touched.

HTML uses only tags already used by the original (`p, h2, h3, blockquote, ul, li, strong, em`) so existing `Article.tsx` rendering, TOC generation and styling work unchanged.

---

## Row 1 — Condensed digest

```sql
INSERT INTO articles (
  slug, title_sk, title_en,
  excerpt_sk, excerpt_en,
  category_sk, category_en,
  read_time_sk, read_time_en,
  image, published,
  content_sk, content_en
) VALUES (
  'preco-boli-pochopenie-bolesti-strucne',
  'Prečo bolí? Stručná verzia',
  'Why Does It Hurt? The Short Version',
  'Stručný sprievodca tým, čo veda hovorí o bolesti — a prečo to mení spôsob, akým ju liečime.',
  'A short guide to what science says about pain — and why it changes the way we treat it.',
  'Vzdelávanie o bolesti',
  'Pain Education',
  '6 min čítania',
  '6 min read',
  '/og-preco-boli.png',
  false,
  -- content_sk:
  $$<p><em>Séria: Pochopenie bolesti | Blog 1 z 5</em></p>

<h2>Bolesť nie je taká jednoduchá, ako sa zdá</h2>
<p>Ak vám už niekto povedal, že „štrukturálne nie je nič v neporiadku" — a napriek tomu trpíte — nie ste sami a nepredstavujete si to. Bolesť je oveľa komplikovanejšia, než nás učili. Pochopiť ako naozaj funguje môže zmeniť to, ako sa cítite a ako dobre vám funguje liečba.</p>

<h2>Nová definícia bolesti</h2>
<p>V roku 2020 Medzinárodná asociácia pre štúdium bolesti aktualizovala svoju definíciu prvýkrát za 40 rokov:</p>
<blockquote>„Nepríjemný zmyslový a emocionálny zážitok spojený so skutočným alebo potenciálnym poškodením tkaniva, alebo sa mu podobá."</blockquote>
<p>Dve slová stoja za pozornosť: <strong>emocionálny</strong> a <strong>potenciálny</strong>. Bolesť nie je čisto fyzická a nevyžaduje skutočné poškodenie. To znamená, že vaša bolesť je vždy skutočná a vždy platná — bez ohľadu na to, čo ukazuje sken.</p>

<h2>Bolesť je poplašný systém, nie merač poškodenia</h2>
<p>Predstavte si bolesť ako detektor dymu vo vašom dome. Detektor nemeria, koľko je ohňa — meria vnímanú hrozbu. Spustí sa pri skutočnom požiari aj pri pripálenej hrianke. Niekedy aj pri prachu alebo slabej batérii.</p>
<p>Váš nervový systém funguje rovnako. Bolesť je spôsob, akým mozog hovorí: „Myslím, že si v nebezpečenstve — venuj pozornosť." Je to ochranná reakcia, nie odraz veľkosti poškodenia. Preto môžu dvaja ľudia s rovnakým zranením cítiť úplne odlišnú bolesť.</p>

<h2>Tri typy bolesti</h2>
<h3>1. Nociceptívna</h3>
<p>Klasická bolesť z poškodeného tkaniva — podvrtnutý členok, pooperačná rana, zápal kĺbu. Signál je primeraný a zvyčajne ustúpi pri hojení.</p>
<h3>2. Neuropatická</h3>
<p>Vzniká pri poškodení samotných nervov — ischias, diabetická bolesť nervov, bolesť po pásovom opare. Často pália, vystreľuje alebo pripomína elektrický šok.</p>
<h3>3. Nociplastická</h3>
<p>Najnovšia a pre chronickú bolesť najdôležitejšia kategória. Nevzniká z jasného poškodenia, ale zo zmien v spôsobe, akým nervový systém spracováva signály. Alarm sa stal precitliveným — spúšťa sa príliš ľahko a často, aj keď pôvodná príčina dávno zmizla. Patrí sem fibromyalgia a mnohé formy chronickej bolesti chrbta. Neznamená to, že bolesť je vymyslená — znamená to, že nervový systém sa naučil signály bolesti zosilňovať.</p>

<h2>Telo aj myseľ — vždy súčasne</h2>
<p>Bolesť nie je len problém tela ani len problém mysle. Je to oboje, vždy. Tento <strong>biopsychosociálny model</strong> hovorí, že na bolesť vplývajú:</p>
<ul>
<li><strong>Biologické faktory</strong> — stav tkanív, nervov, citlivosť nervového systému.</li>
<li><strong>Psychologické faktory</strong> — úzkosť, strach z pohybu, katastrofizácia, pocit kontroly.</li>
<li><strong>Sociálne faktory</strong> — podpora okolia, dôvera v to, že vám veria, finančný a pracovný stres, izolácia.</li>
</ul>
<p>Nie je to zdvorilý spôsob, ako povedať „je to vo vašej hlave". Je to uznanie, že bolesť prežíva celý človek.</p>

<h2>Keď sa bolesť stane chronickou</h2>
<p>Akútna bolesť ustúpi pri hojení — väčšina bolestí takto funguje. U jedného z piatich ľudí však bolesť pretrváva dlhšie ako tri mesiace a stáva sa chronickou. Nervový systém sa môže <strong>senzibilizovať</strong>: ako keby ste zoslávali hlasitosť na rádiu a nechali ju tam. Veci, ktoré by nemali bolieť, začnú bolieť. Tento proces — <strong>centrálna senzibilizácia</strong> — nie je znak slabosti. Je to fyziologická zmena, ktorú možno správnym prístupom odnaučiť.</p>

<h2>Pochopenie je liek</h2>
<p>Štúdie ukazujú, že vzdelávanie o neurovede bolesti zvyšuje prah bolesti, znižuje strach z pohybu a zlepšuje funkčnosť. Nie preto, že vzdelanie magicky lieči tkanivo, ale preto, že strach a nepochopenie sú samé osebe významnými hnacími silami bolesti.</p>

<h2>Čo si zapamätať</h2>
<ul>
<li><strong>Vaša bolesť je skutočná.</strong> Vždy. Nemusí sa prejaviť na skene, aby bola platná.</li>
<li><strong>Bolesť nie je vždy znakom poškodenia.</strong> Pri chronickej bolesti je problémom často nervový systém.</li>
<li><strong>Nie ste zlomení.</strong> Senzibilizovaný nervový systém je zmenený, nie zničený. Zmena je možná.</li>
<li><strong>Záleží na celom človeku.</strong> História, emócie, stres a podpora sú súčasťou vašej bolesti — a súčasťou zlepšovania.</li>
<li><strong>Pochopenie je liek.</strong> Čím jasnejšie rozumiete, tým väčší vplyv máte na svoje zotavenie.</li>
</ul>

<h2>Nasleduje</h2>
<p>V ďalšom blogu série sa pozrieme na otázku „Potrebujem sken?" — čo nám zobrazovacie vyšetrenia môžu a nemôžu povedať o bolesti.</p>

<p><em>Tento blog je súčasťou päťdielnej vzdelávacej série o bolesti. Slúži na informačné účely a nenahrádza personalizované lekárske ani fyzioterapeutické poradenstvo.</em></p>$$,
  -- content_en:
  $$<p><em>Series: Making Sense of Pain | Blog 1 of 5</em></p>

<h2>Pain Is Not as Simple as It Seems</h2>
<p>If you've ever been told "there's nothing structurally wrong" — and you're still hurting — you are not alone, and you are not imagining it. Pain is more complicated than we were taught. Understanding how it really works can change how you feel and how well treatment works for you.</p>

<h2>A New Definition of Pain</h2>
<p>In 2020, the International Association for the Study of Pain updated its definition for the first time in over 40 years:</p>
<blockquote>"An unpleasant sensory and emotional experience associated with, or resembling that associated with, actual or potential tissue damage."</blockquote>
<p>Two words are worth pausing on: <strong>emotional</strong> and <strong>potential</strong>. Pain is not purely physical, and it doesn't even require actual damage. That means your pain is always real and always valid — regardless of what a scan shows.</p>

<h2>Pain Is an Alarm System, Not a Damage Meter</h2>
<p>Think of pain like a smoke alarm. A smoke alarm doesn't measure how much fire there is — it measures perceived threat. It goes off in a real fire, when you burn toast, and sometimes from dust or a low battery.</p>
<p>Your nervous system works the same way. Pain is your brain's way of saying "I think you're in danger — pay attention." It is a protection response, not a measure of damage. That's why two people with the same injury can feel completely different levels of pain.</p>

<h2>The Three Types of Pain</h2>
<h3>1. Nociceptive</h3>
<p>Classic pain from damaged tissue — a sprained ankle, a surgical wound, an arthritic flare-up. The signal is appropriate and usually settles as healing occurs.</p>
<h3>2. Neuropathic</h3>
<p>Arises when the nerves themselves are injured — sciatica, diabetic nerve pain, post-shingles pain. It often feels burning, shooting or electric.</p>
<h3>3. Nociplastic</h3>
<p>The newest and most important category for chronic pain. It comes not from clear damage, but from changes in how the nervous system processes signals. The alarm has become oversensitive — firing too easily and too often, even when the original cause is long gone. This includes fibromyalgia and many forms of chronic back pain. It does not mean the pain is made up — it means the nervous system has learned to amplify pain signals.</p>

<h2>Body and Mind — Always at Once</h2>
<p>Pain is not just a body problem or just a mind problem. It is both, always. The <strong>biopsychosocial model</strong> recognises that pain is influenced by:</p>
<ul>
<li><strong>Biological factors</strong> — the state of your tissues, nerves and nervous system sensitivity.</li>
<li><strong>Psychological factors</strong> — anxiety, fear of movement, catastrophising, sense of control.</li>
<li><strong>Social factors</strong> — support, being believed, financial and work pressures, isolation.</li>
</ul>
<p>This is not a polite way of saying "it's all in your head." It is an honest recognition that pain is experienced by the whole person.</p>

<h2>When Pain Becomes Chronic</h2>
<p>Acute pain fades as you heal — most pain works this way. But for roughly one in five people, pain outlasts normal healing and becomes chronic, lasting more than three months. The nervous system can become <strong>sensitised</strong>: like turning the volume up on a stereo and leaving it there. Things that shouldn't hurt begin to hurt. This process — <strong>central sensitisation</strong> — is not a sign of weakness. It is a physiological change, and because it is learned, it can be unlearned with the right approach.</p>

<h2>Understanding Is Medicine</h2>
<p>Research shows that pain neuroscience education raises pain thresholds, reduces fear of movement and improves function. Not because education magically heals tissue, but because fear and misunderstanding are themselves powerful drivers of pain.</p>

<h2>What to Remember</h2>
<ul>
<li><strong>Your pain is real.</strong> Always. It doesn't need to show up on a scan to be valid.</li>
<li><strong>Pain is not always a sign of damage.</strong> In chronic pain, the nervous system is often the issue.</li>
<li><strong>You are not broken.</strong> A sensitised nervous system is changed, not destroyed. Change is possible.</li>
<li><strong>The whole person matters.</strong> History, emotions, stress and support are part of your pain — and part of getting better.</li>
<li><strong>Understanding is medicine.</strong> The clearer your understanding, the more agency you have in recovery.</li>
</ul>

<h2>Coming Up Next</h2>
<p>In the next blog we explore "Do I need a scan?" — what imaging can and cannot tell us about pain.</p>

<p><em>This blog is part of a five-part educational series on pain. It is for informational purposes and is not a substitute for personalised medical or physiotherapy advice.</em></p>$$
);
```

---

## Row 2 — Patient empowerment reframe

```sql
INSERT INTO articles (
  slug, title_sk, title_en,
  excerpt_sk, excerpt_en,
  category_sk, category_en,
  read_time_sk, read_time_en,
  image, published,
  content_sk, content_en
) VALUES (
  'preco-boli-co-to-znamena-pre-vas',
  'Prečo bolesť pretrváva — čo to znamená pre vás',
  'Why Pain Persists — What It Means For You',
  'Vaša bolesť je skutočná. Tu je, prečo pretrváva — a čo s tým môžete urobiť.',
  'Your pain is real. Here is why it persists — and what you can do about it.',
  'Vzdelávanie o bolesti',
  'Pain Education',
  '6 min čítania',
  '6 min read',
  '/og-preco-boli.png',
  false,
  -- content_sk:
  $$<p><em>Séria: Pochopenie bolesti | Blog 1 z 5</em></p>

<h2>Najprv to najdôležitejšie: vaša bolesť je skutočná</h2>
<p>Ak vám niekto povedal, že „sken je v poriadku" alebo „nič tam nenachádzame", a vy stále trpíte — nie ste sami a nevymýšľate si. Bolesť, ktorú cítite, je skutočná a platná, aj keď ju zobrazovacie vyšetrenia nevedia vysvetliť.</p>
<blockquote>Medzinárodná asociácia pre štúdium bolesti v roku 2020 uznala, že bolesť môže existovať aj bez viditeľného poškodenia tkaniva — a stále je úplne skutočná.</blockquote>

<h2>Prečo „normálny" sken nezmierňuje bolesť</h2>
<p>Bolesť nie je merač poškodenia. Je to <strong>poplašný systém</strong>. Ako detektor dymu, ktorý sa môže spustiť pri skutočnom požiari aj pri prachu, váš nervový systém spúšťa bolesť na základe vnímanej hrozby — nie na základe toho, koľko je v skutočnosti poškodenia.</p>
<p>Preto môžu dvaja ľudia s rovnakým nálezom na skene cítiť úplne odlišnú bolesť. A preto vaša skúsenosť — to, čo cítite — je dôležitejšia ako akýkoľvek obrázok.</p>

<h2>Čo sa deje, keď bolesť pretrváva</h2>
<p>Akútna bolesť sa väčšinou upokojí počas niekoľkých týždňov. Ale približne u jedného z piatich ľudí bolesť pretrváva viac ako tri mesiace a stáva sa <strong>chronickou</strong>. Keď sa to stane, niečo dôležité sa zmenilo — a nie je to vaša chyba.</p>
<p>Nervový systém, ktorý je opakovane vystavený signálom bolesti, sa môže <strong>senzibilizovať</strong>. Ako keby niekto zoslával hlasitosť na rádiu a nechal ju tam. Menšie podnety začnú vyvolávať väčšiu bolesť. Veci, ktoré by nemali bolieť, začnú bolieť.</p>
<p>Tento proces — <strong>centrálna senzibilizácia</strong> — nie je znak slabosti, vymýšľania ani zlyhania. Je to fyziologická zmena, ktorá sa môže stať komukoľvek po dlhotrvajúcej bolesti, strese, zranení alebo chorobe.</p>

<h2>Tri otázky, ktoré pomáhajú pochopiť vašu bolesť</h2>
<h3>Pochádza zo súčasného poškodenia tkaniva?</h3>
<p>Toto je <strong>nociceptívna</strong> bolesť — z podvrtnutí, zápalov, pooperačných rán. Signál je primeraný a väčšinou ustúpi pri hojení.</p>
<h3>Pochádza z poškodených nervov?</h3>
<p>Toto je <strong>neuropatická</strong> bolesť — pri ischiase, diabetickom poškodení nervov alebo po pásovom opare. Často pália alebo vystreľuje.</p>
<h3>Alebo je váš alarmový systém precitlivený?</h3>
<p>Toto je <strong>nociplastická</strong> bolesť — pri fibromyalgii a mnohých formách chronickej bolesti chrbta. Tkanivo sa zahojilo, ale alarm sa naučil zostať zapnutý. Toto je často chýbajúci kúsok skladačky pre ľudí, ktorým bolo povedané, že „im nič nie je".</p>

<h2>Prečo sú emócie a stres súčasťou príbehu — bez viny</h2>
<p>Bolesť nie je len telesná. Vaše myšlienky, spánok, stres, vzťahy a životná história ovplyvňujú, koľko bolesti cítite. Nazýva sa to <strong>biopsychosociálny model</strong> a <em>nie</em> je to spôsob, ako povedať „je to vo vašej hlave". Je to uznanie, že bolesť prežíva celý človek.</p>
<p>Dobré správy: ak na bolesť vplýva veľa vecí, znamená to, že je veľa pák, za ktoré môžete potiahnuť.</p>

<h2>Čo môžete začať robiť ešte dnes</h2>
<ul>
<li><strong>Verte si.</strong> Vaša bolesť je skutočná, aj keď ju nikto nedokáže vysvetliť obrázkom.</li>
<li><strong>Hýbte sa s istotou.</strong> Pohyb, postupný a primeraný vašej úrovni, je jedným z najsilnejších „liekov" pre senzibilizovaný nervový systém. Bolesť pri pohybe nemusí znamenať poškodenie.</li>
<li><strong>Spite, koľko sa dá.</strong> Spánok je obdobie, kedy nervový systém znižuje hlasitosť. Slabý spánok bolesť zhoršuje.</li>
<li><strong>Adresujte stres.</strong> Stres je palivo pre alarmový systém. Dýchanie, prechádzky, terapia, koníčky — čokoľvek znižuje stres, znižuje aj bolesť.</li>
<li><strong>Hľadajte podporu.</strong> Byť vypočutý a uverený nie je luxus. Je to súčasť liečby.</li>
</ul>

<h2>Posolstvo, na ktoré sa oplatí pamätať</h2>
<p>Nie ste zlomení. Senzibilizovaný nervový systém je zmenený nervový systém, nie zničený. Pretože je to naučený vzorec, je to vzorec, ktorý sa dá odnaučiť. Pochopenie toho, čo sa deje, je prvý krok — a sám osebe znižuje bolesť.</p>

<h2>Nasleduje</h2>
<p>V ďalšom blogu sa pozrieme na otázku, ktorú dostávame najčastejšie: „Potrebujem sken?" — a prečo vás odpoveď možno prekvapí.</p>

<p><em>Tento blog je súčasťou päťdielnej vzdelávacej série o bolesti. Slúži na informačné účely a nenahrádza personalizované lekárske ani fyzioterapeutické poradenstvo.</em></p>$$,
  -- content_en:
  $$<p><em>Series: Making Sense of Pain | Blog 1 of 5</em></p>

<h2>First, the Most Important Thing: Your Pain Is Real</h2>
<p>If you've been told "the scan is fine" or "we can't find anything", and you're still hurting — you are not alone and you are not making it up. The pain you feel is real and valid, even when imaging cannot explain it.</p>
<blockquote>In 2020, the International Association for the Study of Pain officially recognised that pain can exist without visible tissue damage — and still be entirely real.</blockquote>

<h2>Why a "Normal" Scan Doesn't Make Pain Go Away</h2>
<p>Pain is not a damage meter. It is an <strong>alarm system</strong>. Like a smoke alarm that can go off at a real fire or at burnt toast, your nervous system triggers pain based on perceived threat — not on how much damage is actually there.</p>
<p>That's why two people with identical scan findings can feel completely different levels of pain. And why your experience — what you feel — matters more than any image.</p>

<h2>What Happens When Pain Persists</h2>
<p>Acute pain usually settles within weeks. But for roughly one in five people, pain outlasts the normal healing process and becomes <strong>chronic</strong>, lasting more than three months. When this happens, something important has shifted — and it is not your fault.</p>
<p>A nervous system repeatedly exposed to pain signals can become <strong>sensitised</strong>. As if someone turned up the volume on a stereo and left it there. Smaller inputs start to produce bigger pain. Things that shouldn't hurt begin to hurt.</p>
<p>This process — <strong>central sensitisation</strong> — is not a sign of weakness, exaggeration, or failure. It is a physiological change that can happen to anyone after prolonged pain, stress, injury or illness.</p>

<h2>Three Questions That Help Make Sense of Your Pain</h2>
<h3>Is it coming from current tissue damage?</h3>
<p>This is <strong>nociceptive</strong> pain — sprains, inflammation, post-surgical wounds. The signal is appropriate and usually settles as you heal.</p>
<h3>Is it coming from injured nerves?</h3>
<p>This is <strong>neuropathic</strong> pain — sciatica, diabetic nerve damage, post-shingles pain. It often burns or shoots.</p>
<h3>Or is your alarm system oversensitive?</h3>
<p>This is <strong>nociplastic</strong> pain — fibromyalgia and many forms of chronic back pain. The tissue has healed, but the alarm has learned to stay on. This is often the missing piece for people who have been told "there's nothing wrong."</p>

<h2>Why Emotions and Stress Are Part of the Story — Without Blame</h2>
<p>Pain is never just physical. Your thoughts, sleep, stress, relationships and life history all influence how much pain you feel. This is the <strong>biopsychosocial model</strong>, and it is <em>not</em> a way of saying "it's all in your head." It's a recognition that pain is experienced by the whole person.</p>
<p>The good news: if many things influence pain, there are many levers you can pull.</p>

<h2>What You Can Start Doing Today</h2>
<ul>
<li><strong>Believe yourself.</strong> Your pain is real, even when no one can explain it with an image.</li>
<li><strong>Move with confidence.</strong> Movement, graded and appropriate to your level, is one of the most powerful "medicines" for a sensitised nervous system. Hurt does not always mean harm.</li>
<li><strong>Sleep as much as you can.</strong> Sleep is when the nervous system turns down the volume. Poor sleep makes pain worse.</li>
<li><strong>Address stress.</strong> Stress is fuel for the alarm system. Breathing, walks, therapy, hobbies — anything that lowers stress lowers pain.</li>
<li><strong>Seek support.</strong> Being heard and believed is not a luxury. It's part of treatment.</li>
</ul>

<h2>The Message Worth Holding On To</h2>
<p>You are not broken. A sensitised nervous system is a changed nervous system, not a destroyed one. Because it is a learned pattern, it is a pattern that can be unlearned. Understanding what is happening is the first step — and on its own, it reduces pain.</p>

<h2>Coming Up Next</h2>
<p>In the next blog we tackle the question we hear most often: "Do I need a scan?" — and why the answer might surprise you.</p>

<p><em>This blog is part of a five-part educational series on pain. It is for informational purposes and is not a substitute for personalised medical or physiotherapy advice.</em></p>$$
);
```

---

## After approval

1. Both rows appear in `/admin` as drafts
2. Preview each, edit anything you want
3. Toggle `published: true` to publish

Original article is **not** modified.