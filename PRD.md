**Product Requirements Document (PRD)**

---

## Product Name: Velto

**Tagline:** Verzoek. Betaal. Klaar.

**Doel:**
Een luchtige, gebruiksvriendelijke mobile-first app waarmee gebruikers professioneel ogende betaalverzoeken ("flitsfacturen") kunnen aanmaken en delen met hun eigen branding. Betalingen worden afgehandeld via externe links (zoals Tikkie, PayPal, Mollie). Geen geldbeheer binnen de app zelf.

---

## 1. Doelgroep

- Jongvolwassenen en studenten
- Freelancers zonder KvK (oppassers, bijlesgevers, klusjesdiensten)
- Mensen die regelmatig kosten voorschieten voor anderen (boodschappen, uitgaan)

---

## 2. Designrichtlijnen (voor UI design AI)

### 🎨 Visuele stijl

- **Stijl:** Casual maar professioneel, luchtig en vertrouwd
- **Primaire kleur:** #43D478 (mintgroen)
- **Modi:** Zowel licht als donker thema voorzien in design
- **Branding:** Velto branding minimaal aanwezig, gebruikersbranding juist **prominent op hun eigen betaalpagina** (profielfoto/logo, naam)

### 📱 Navigatie

- **Mobile-first** ontwerp
- **Navigatiebalk onderaan** met 4 tab-iconen:
  1. Home
  2. Nieuw verzoek
  3. Verzoeken (dashboard)
  4. Profiel

### 🧾 Mini-factuurstijl (betaalpagina)

- Ziet eruit als een **digitale bon of factuurtje**:
  - Naam verzender + logo of profielfoto
  - Titel + omschrijving
  - Bedrag (groot getoond)
  - Meerdere knoppen voor betaalmethodes (Tikkie, PayPal, Mollie, etc.)
  - QR-code onderaan voor snel scannen

### 🇳🇱 Taal

- Alle teksten in het Nederlands (voor nu alleen NL release)

### 🧠 AI integratie (voor latere versie)

- Voorzie ruimte in het UI design bij "omschrijving" invoervelden voor een knop of prompt zoals: "Suggestie van AI"
- Houd formules en componenten schaalbaar/modulair voor latere AI-introductie

### 🧭 Gebruikersflow (mobile-first UI design plan)

#### 1. Startscherm

```
[Logo Velto klein bovenin]
"Verzoek. Betaal. Klaar."
[ Inloggen ] [ Start gratis ]
```

#### 2. Dashboard (Verzoeken)

```
[ + Nieuw verzoek ]

[Recente verzoeken lijst met status badges]
- Oppassen op 27 juli   €22,50   Betaald
- Muur schilderen       €150,00  Verstuurd
```

#### 3. Nieuw verzoek aanmaken

```
Stap 1: Bedrag invoeren (€)
Stap 2: Omschrijving (bijv. "Oppassen op 27 juli")
Stap 3: Voeg betaalmethode(s) toe (dropdown/multiselect)
Stap 4: [ Maak verzoek ] knop
```

#### 4. Voorbeeld betaalpagina

```
[Profielfoto gebruiker] Lisa de Jong
[Omschrijving] Oppassen – 27 juli – 3 uur
[Bedrag groot weergegeven] €22,50
[Knoppen: Betaal met Tikkie / PayPal / Mollie]
[QR-code met kopieerbare link]
```

#### 5. Verzoek detailpagina

```
[Lisa de Jong]
[Verzoek: Oppassen op 27 juli – Verstuurd]
[Knoppen: Stuur herinnering / Markeer als betaald]
```

#### 6. Profielpagina

```
[Naam gebruiker + foto/logo]
[Standaard betaallink instellen]
[Thema wisselen: licht/donker]
[Accountinstellingen / Uitloggen]
```

---

## 3. MVP Functionaliteit (samengevat)

- Inloggen en account aanmaken
- Betaalverzoek aanmaken met meerdere betaallinks
- Deelbare betaalpagina genereren (met mini-factuur look)
- QR-code genereren
- Dashboard met verzoekstatussen
- Herinnering versturen (via WhatsApp/SMS/kopieerbare tekst)

---

## 4. MVP Timeline

**Week 1–2:** UX + vormgeving + request builder
**Week 3–4:** Betaalpagina + QR code + Dashboard
**Week 5–6:** Auth + flow reminders + thema support
**Week 7–8:** NL vertaling + bugfixes + beta launch

---
