# Startnummern- und Bahnvergabe: Interner Swim & Run

## Veranstaltungsformat

| Wettbewerb | Distanz | Contest-ID |
|------------|---------|------------|
| Swim & Run Lang | 1,0 km Swim / 8,4 km Run | 1 |
| Swim & Run Kurz | 0,5 km Swim / 4,2 km Run | 2 |

## Grundprinzip: Verfolgungsrennen (Pursuit Start)

Die Startnummern bestimmen die **Startwelle**. Langsamere Athleten starten zuerst,
schnellere später – Ziel ist ein gemeinsames Zieleinlaufen.

Die Einteilung basiert auf der **Bestzeit 1000 m Schwimmen** als primärem Kriterium.

---

## Contest 1: Swim & Run Lang

Drei Wellen, je ~30 Minuten Abstand:

| Welle | Bibs | Startzeit | Schwimm-Bestzeiten |
|-------|------|-----------|-------------------|
| 1 | 1 – 10 | 10:50 Uhr | > 17 min (langsamste) |
| 2 | 11 – 20 | 11:20 Uhr | 14 – 17 min |
| 3 | 21 – 26 | 12:00 Uhr | < 14 min (schnellste) |

**Vergabe-Logik innerhalb einer Welle:** Sortierung nach Schwimmzeit **absteigend**
(langsamster bekommt niedrigste Startnummer in der Welle).

Teilnehmer ohne Bestzeiteintrag werden manuell in eine passende Welle eingeordnet
(in der Vergangenheit: Wave 1 als Standardzuweisung).

---

## Contest 2: Swim & Run Kurz

Zwei Wellen:

| Welle | Bibs | Startzeit |
|-------|------|-----------|
| 1 | 27 – 30 | 12:00 Uhr |
| 2 | 31 – 40 | 12:30 Uhr |

Die Sortierung in Contest 2 folgt keiner so strengen Logik wie bei Contest 1
(weniger Teilnehmer, gemischte Leistungsklassen).

---

## Ablauf der Startnummernvergabe

1. **Startnummernbereiche** (Bibranges) in RaceResult anlegen mit zugehöriger Startzeit als Zeitdifferenz
2. **Teilnehmer nach Welle sortieren**: Contest 1 → Schwimmzeit absteigend, Wave-Grenzen manuell festlegen
3. **Startnummern neu vergeben** über RaceResult-Funktion ("Startnummern neu vergeben" mit Sortierung)
4. **Manuelle Nachkorrekturen** bei Teilnehmern ohne Bestzeiten oder Sonderregelungen

### Erfahrungswerte 2025 (Event 324638)

Die Vergabe erfolgte **zweistufig**:
- 24.03.2025, 18:45 Uhr: Massenneuvergabe über RRWS (76 Änderungen in ~1 Sekunde)
  → erzeugte Zwischennummern 101–138
- 28.03.2025, 21:42–21:53 Uhr: Manuelle Einzelkorrekturen auf finale Nummern 1–40
  (ca. 38 Änderungen in 11 Minuten per Hand)

**Empfehlung:** Die zweistufige manuelle Korrektur deutet darauf hin, dass die
automatische Neuvergabe nicht direkt die gewünschten Endzahlen erzeugte.
Beim nächsten Mal direkt mit den richtigen Bibrange-Grenzen und Sortierkriterien arbeiten.

---

## Felder in RaceResult

| Feld | Beschreibung |
|------|--------------|
| `Bestzeit 1000 m Schwimmen` | Schwimmbestzeit im Format `MM:SS` |
| `Bestzeit 10 km Laufen` | Laufbestzeit im Format `MM:SS` |
| `Bib` | Startnummer (bestimmt Welle) |
| `Contest` | Wettbewerb (1 = Lang, 2 = Kurz) |
