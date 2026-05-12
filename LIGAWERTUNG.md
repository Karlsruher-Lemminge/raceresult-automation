# Ligawertung: Dokumentation (Wettbewerb 3 & 4)

Event 377703 – 5. Lemming Swim & Run (2026-04-26)

**Grundlage:** [BWTV Triathlonliga – Ligastatut 2026](https://baden-wuerttembergischer-triathlonverband.de/wp-content/uploads/2026/01/Ligastatut_2026.pdf), insbesondere §9 (Sportlicher Ablauf) und Anlage 2 (Wertungsmodus).

---

## Überblick und Funktionsweise

Die Ligawertung ist ein **Platzpunkte-System** (auch bekannt als "niedrig gewinnt"): Jeder Athlet bekommt eine Platzziffer, und das Team mit der **niedrigsten Summe** der drei besten Platzziffern seiner Mitglieder gewinnt.

### Warum dieses System?

Im Unterschied zu einer einfachen Zeitensummierung berücksichtigt das Platzpunktesystem automatisch die Stärke des gesamten Teilnehmerfeldes. Ein Athlet, der in einem starken Feld auf Platz 5 landet, ist schlechter bewertet als derselbe Athlet mit identischer Zeit in einem schwachen Feld. Das macht die Teamwertung fairer über verschiedene Jahre und Felder hinweg.

### Die drei Stufen der Berechnung

**Stufe 1 – Einzelwertung (Platzziffer):**  
Jeder Athlet erhält eine Platzziffer. Reguläre Finisher bekommen ihren Rang in der Gesamtplatzierung (Männer und Frauen gemeinsam gewertet, kein Geschlechtersplit). Wer nicht regulär finisht, bekommt eine Strafplatzziffer, die immer schlechter ist als der letzte reguläre Finisher. Die Abstufung der Strafe richtet sich nach dem Statuswert: DNF (knapp nach dem letzten Finisher) ist besser als DNS (Fixstrafe nahe am Maximum), ist besser als DSQ (höchste Fixstrafe). Außer-Konkurrenz-Teilnehmer (a.k.) bekommen eine so massive Strafe, dass sie die Teamwertung faktisch nicht belasten.

**Stufe 2 – Teamauswahl (Ranking "ImTeam"):**  
Innerhalb jedes Vereins werden die Athleten pro Wettbewerb sortiert: zuerst nach Prioritätsstatus (DSQPrioStatus), dann nach Zeit. Dieses Ranking bestimmt, welche drei Athleten eines Vereins für die Teamwertung gezählt werden. Die clevere Besonderheit: DSQ-Athleten haben den niedrigsten Prioritätswert (0) und sortieren sich daher immer auf die vordersten Positionen – sie können also nicht durch nicht-gestartete Athleten "verdrängt" werden. Ein Team muss eine DSQ-Strafe immer tragen.

**Stufe 3 – Teamwertung (TS3 / TS4):**  
Die Platzziffern der drei ausgewählten Athleten werden summiert. Das Ergebnis ist die Platzsumme des Teams. Teams mit niedrigerer Platzsumme gewinnen. Bei Gleichstand werden beide Teams auf denselben Rang gesetzt (UseTies=true).

### Zwei unabhängige Liga-Wettbewerbe

Wettbewerb 3 (2. Liga) und Wettbewerb 4 (3. Liga) laufen vollständig unabhängig: separate Startzeiten, separate Platzierungen (RANK101 je Wettbewerb), separate TeamScores (TS3 / TS4) und separate MaximalPunktZahlen (92 für Liga1, 64 für Liga2). Ein Athlet kann nur in einem der beiden Wettbewerbe starten.

### Wichtige Konfigurationswerte

Die festen Konstanten **MaximalPunktZahlLiga1=92** und **MaximalPunktZahlLiga2=64** bestimmen, ab welchem Wert DNS- und DSQ-Athleten ihre Strafe erhalten. Sie müssen jährlich geprüft werden: Ist die tatsächliche Finisherzahl höher als diese Konstante, wird DNS fälschlicherweise besser bewertet als ein DNF-Athlet nahe dem Ende des Feldes.

Laut Ligastatut 2026 Anlage 2 errechnet sich die Maximalpunktzahl aus der **Gesamtzahl der gemeldeten Starter pro Liga** (Teams × 4 Starter). Für 2026: 2. Liga = 16 Teams × 4 = **64**, 3. Liga = 22 Teams × 4 = **88**. Die aktuell gesetzten Werte (92/64) weichen davon ab – siehe Abschnitt [Abgleich mit Ligastatut](#abgleich-mit-ligastatut-2026).

---

## Wettbewerbe

| ID | Name              | Startzeit | Strecke | Laps |
|----|-------------------|-----------|---------|------|
| 3  | 2. Liga           | 12:00 Uhr | 8,5 km  | 5    |
| 4  | 3. Liga           | 13:30 Uhr | 8,5 km  | 5    |

Die Liga-Wettbewerbe haben **keine** FinishTimeLimit und **keine** Sortiervorgabe im Wettbewerb selbst – die Sortierung erfolgt vollständig über Platzierungen und die TeamScore-Konfiguration.

---

## Statuswerte in RaceResult

| STATUS | Bedeutung          |
|--------|--------------------|
| 0      | Regulär gefinisht  |
| 1      | a.k. (außer Konkurrenz) |
| 2      | DSQ (disqualifiziert)   |
| 3      | DNF (did not finish)    |
| 4      | DNS (did not start)     |

---

## Benutzerdefinierte Felder (UserFields)

### RegulaerImZiel

```
[FINISHED] AND [STATUS]=0
```

Liefert `true`, wenn der Teilnehmer eine Zielzeit hat **und** keinen Sonderstatus (kein DSQ, DNF, DNS, a.k.).  
Nur reguläre Finisher bekommen als Platzziffer ihren tatsächlichen Rang.

---

### AnzahlImZielLiga1 / AnzahlImZielLiga2

```
DCount("[FINISHED] AND [CONTEST]=3")   -- Liga1 (Wettbewerb 3)
DCount("[FINISHED] AND [CONTEST]=4")   -- Liga2 (Wettbewerb 4)
```

Datensatz-übergreifende Zählung aller Teilnehmer mit Zielzeit im jeweiligen Liga-Wettbewerb.  
Wird als Basis-Platzziffer für DNF-Teilnehmer verwendet (sie kommen "nach dem letzten Finisher").

---

### MaximalPunktZahlLiga1 / MaximalPunktZahlLiga2

```
92   -- Liga1 (Wettbewerb 3 = 2. Liga)
64   -- Liga2 (Wettbewerb 4 = 3. Liga)
```

Feste Konstante, die **größer als die erwartete Finisherzahl** gesetzt sein muss.  
Wird als Platzziffer-Basiswert für DSQ- und DNS-Athleten verwendet.

**Laut Ligastatut 2026, Anlage 2** errechnet sich der Wert als Gesamtzahl der gemeldeten Starter: `Anzahl Teams × 4 Starter`. Der korrekte Wert wird einmalig **vor dem ersten Wettkampf** der Saison festgelegt und gilt dann für alle Events.

**Wichtig:** Wenn die tatsächliche Finisherzahl diese Werte übersteigt, kehrt sich die Strafe für DNS/DSQ um. Die Werte müssen **jährlich** nach Eingang der Mannschaftsmeldungen angepasst werden – siehe [Abgleich mit Ligastatut](#abgleich-mit-ligastatut-2026).

---

### StatusMalus

```
choose([STATUS]; 1000; 6; 2; 3)
```

*(Hinweis: Im gespeicherten Ausdruck stehen überschüssige `)))` am Ende – vermutlich ein alter Copy-Paste-Rest. RaceResult wertet den Ausdruck trotzdem korrekt aus.)*

Aufschlag je nach Status auf die Platzziffer:

| STATUS | Bedeutung | StatusMalus | Statut-Grundlage (Anlage 2) |
|--------|-----------|-------------|------------------------------|
| 1      | a.k.      | 1000 (faktischer Ausschluss aus Teamwertung) | nicht explizit geregelt |
| 2      | DSQ       | 6           | „Maximalpunktzahl plus 6" ✓ |
| 3      | DNF       | 2           | „letzte Platzziffer plus 2" ✓ |
| 4      | DNS       | 3           | „Maximalpunktzahl plus 3" ✓ |

---

### HelperLiga1 / HelperLiga2

```
-- HelperLiga1 (Wettbewerb 3):
if([STATUS]=2 OR [STATUS]=4; MaximalPunktZahlLiga1; AnzahlImZielLiga1)

-- HelperLiga2 (Wettbewerb 4):
if([STATUS]=2 OR [STATUS]=4; MaximalPunktZahlLiga2; AnzahlImZielLiga2)
```

Liefert den Basisteil der Platzziffer für **nicht-reguläre** Finisher:

- Bei **DSQ oder DNS**: `MaximalPunktZahl` (feste Konstante 92 bzw. 64) → extra hohe Platzziffer
- Bei **DNF oder a.k.**: `AnzahlImZiel` (Anzahl tatsächlicher Finisher) → Platzziffer knapp nach dem letzten Finisher

---

### DSQPrioStatus

```
if([STATUS]=0; 1; choose([STATUS]; 4; 0; 2; 3))
```

Sortierfeld für die Selektion der Teamwertungs-Athleten:

| STATUS | Bedeutung | DSQPrioStatus | Sortierung |
|--------|-----------|---------------|------------|
| 2      | DSQ       | 0             | ERSTE Priorität ← absichtlich |
| 0      | Regulär   | 1             | danach, nach Zeit |
| 3      | DNF       | 2             | danach |
| 4      | DNS       | 3             | danach |
| 1      | a.k.      | 4             | letzte Priorität |

**Warum DSQ zuerst?** DSQ-Athleten können nicht "versteckt" werden: Sie landen immer auf den ersten ImTeam-Positionen und müssen in den Top-3 des Teams mitzählen (falls vorhanden).

---

## Platzziffer (Ergebnis ID 4000)

```
choose([CONTEST]; 0; 0;
  if([RegulaerImZiel]; [RANK101]; [HelperLiga1] + [StatusMalus]);
  if([RegulaerImZiel]; [RANK101]; [HelperLiga2] + [StatusMalus]))
```

| Wettbewerb | Formel |
|------------|--------|
| 1 (Kurzstrecke) | 0 (nicht relevant) |
| 2 (Langstrecke) | 0 (nicht relevant) |
| 3 (2. Liga)     | see below |
| 4 (3. Liga)     | see below |

**Platzziffer-Berechnung Liga (niedrig = besser):**

| Situation | Platzziffer Liga1 (Wb3) | Platzziffer Liga2 (Wb4) |
|-----------|------------------------|------------------------|
| Regulär (STATUS=0, FINISHED) | RANK101 (1, 2, 3, ...) | RANK101 (1, 2, 3, ...) |
| DNF (STATUS=3) | AnzahlImZielLiga1 + 2 | AnzahlImZielLiga2 + 2 |
| DNS (STATUS=4) | 92 + 3 = **95** | 64 + 3 = **67** |
| DSQ (STATUS=2) | 92 + 6 = **98** | 64 + 6 = **70** |
| a.k. (STATUS=1) | AnzahlImZielLiga1 + 1000 | AnzahlImZielLiga2 + 1000 |

---

## Platzierung 101 "Gesamt M UND W" (RANK101)

```json
{
  "ID": 101,
  "Name": "Gesamt M UND W",
  "Group": ["CONTEST"],
  "Sort": ["STATUS", "DECIMALTIME"],
  "Filter": "FINISHED",
  "UseTies": false
}
```

- Gruppierung nur nach Wettbewerb (M und W zusammen, kein Geschlechtersplit)
- Sortierung nach STATUS (0 vor 2 → reguläre Finisher vor DSQ), dann nach Zeit
- Filter `FINISHED`: Nur Teilnehmer mit Zielzeit werden gezählt
- RANK101 = Position innerhalb des Wettbewerbs

Reguläre Finisher bekommen RANK101 = 1, 2, 3, ... und das ist direkt ihre Platzziffer.

---

## Platzierung 7 "ImTeam"

```json
{
  "ID": 7,
  "Name": "ImTeam",
  "Group": ["CONTEST", "CLUB"],
  "Sort": ["DSQPrioStatus", "DECIMALTIME"],
  "Filter": ""
}
```

- Gruppierung nach Wettbewerb + Verein → jeder Athlet hat eine Position **innerhalb seines Teams**
- Kein Filter: **alle** Teilnehmer (auch ohne Zielzeit) werden einbezogen
- Sortierung: DSQPrioStatus zuerst (DSQ kommt vor regulären Finishern!), dann Zeit
- `[ImTeam]` = Position des Athleten innerhalb seines Team-Wettbewerb-Paares

---

## Mannschaftswertung (TeamScore)

### TS3 "2. Liga" (ID=3) – für Wettbewerb 3

```json
{
  "ResultID1": 4000,
  "MinTotal": 3,
  "MaxTotal": 3,
  "MinFemale": 0,
  "MaxFemale": 3,
  "Filter": "[CLUB]<>\"\" AND [CONTEST]=3 AND [ImTeam] >= 1 AND [ImTeam] <= 3",
  "Assigning1": "CONTEST", "Grouping1": "CONTEST",
  "Assigning2": "CLUB",    "Grouping2": "",
  "UseTies": true,
  "SortDesc1": false
}
```

### TS4 "3. Liga" (ID=4) – für Wettbewerb 4

Identische Konfiguration wie TS3, nur mit `[CONTEST]=4` im Filter.

### Erklärung der TS-Konfiguration

| Feld | Wert | Bedeutung |
|------|------|-----------|
| `ResultID1=4000` | Platzziffer | Die Platzziffern der 3 Athleten werden summiert |
| `SortDesc1=false` | aufsteigend | Niedrigste Summe = bestes Team |
| `MinTotal=MaxTotal=3` | genau 3 | Jedes Team muss exakt 3 Athleten haben |
| `MinFemale=0, MaxFemale=3` | 0–3 Frauen | Kein Geschlechterzwang |
| `UseTies=true` | Gleichstand | Teams mit gleicher Summe bekommen gleichen Rang |
| Filter `[ImTeam] <= 3` | Top-3 | Nur die 3 ersten Positionen in Ranking "ImTeam" pro Team |

**`TS3.Time1`** (bzw. `TS4.Time1`) = Platzsumme (Summe der 3 Platzziffern des Teams).  
Diese wird in der Ergebnisliste als "Platzsumme: X" angezeigt.

---

## Welche 3 Athleten werden pro Team ausgewählt?

Der Filter `[ImTeam] >= 1 AND [ImTeam] <= 3` kombiniert mit der Sortierung von Ranking 7 (DSQPrioStatus → Zeit) ergibt folgende Selektionslogik:

**Beispiel 1: Team mit 1 DSQ + 4 regulären Finishern**
- ImTeam=1: DSQ-Athlet (DSQPrioStatus=0, zuerst sortiert)
- ImTeam=2: Schnellster regulärer Finisher
- ImTeam=3: Zweitschnellster regulärer Finisher
- → Team wird mit DSQ-Strafe belastet

**Beispiel 2: Team mit 5 regulären Finishern**
- ImTeam=1: Schnellster Finisher
- ImTeam=2: Zweitschnellster Finisher
- ImTeam=3: Drittschnellster Finisher
- → Summe der 3 besten Platzziffern

**Beispiel 3: Team mit nur 2 Finishern + 1 DNF**
- ImTeam=1: Schnellster Finisher
- ImTeam=2: Zweiter Finisher
- ImTeam=3: DNF-Athlet (AnzahlImZiel + 2)
- → Team wird mit DNF-Strafe belastet

---

## Ergebnisliste Liga (Liste "02-Ergebnislisten|Ergebnisliste Liga")

Zeigt die Einzelergebnisse aller Liga-Teilnehmer:

- Filter: `Contest > 2` (nur Wettbewerbe 3 und 4)
- Sortierung: Contest → Status → ZielzeitVorhanden (desc) → Rank101
- Spalten: Rank101p (Platz), Bib, Name, Verein, AK, AK-Platz, Schwimmen (mit Rank102p), Wechsel (mit Rank103p), Laufen (mit Rank104p), Gesamt

---

## Ergebnisliste Teamwertung (Liga1/Liga2)

Zeigt die Teamwertung geordnet nach Platzsumme:

- Filter: `TS3.Rank > 0 AND Contest = 3` (bzw. TS4 für Liga2)
- Sortierung: TS3.Rank → Team-Kopfzeile → TS3.Position
- Kopfzeile je Team: `"1./// Vereinsname ///  Platzsumme: X"` (TS3.Time1)
- Spalten je Athlet: Platzziffer, Name, Schwimmen, Wechsel, Laufen, Gesamt

---

## Siegerehrungsliste – Hilfsvariablen

Für die Siegerehrung der Top-3-Teams werden diese Hilfsfelder verwendet:

```
Liga1P1: DFirst("[CLUB]";"[TS3.RANK]=1")   -- Vereinsname Platz 1 (2. Liga)
Liga1P2: DFirst("[CLUB]";"[TS3.RANK]=2")   -- Vereinsname Platz 2
Liga1P3: DFirst("[CLUB]";"[TS3.RANK]=3")   -- Vereinsname Platz 3

Liga2P1: DFirst("[CLUB]";"[TS4.RANK]=1")   -- Vereinsname Platz 1 (3. Liga)
Liga2P2: DFirst("[CLUB]";"[TS4.RANK]=2")
Liga2P3: DFirst("[CLUB]";"[TS4.RANK]=3")

Liga1OrderHelper: if([CLUB]=[Liga1P1];1;if([CLUB]=[Liga1P2];2;if([CLUB]=[Liga1P3];3;0)))
Liga2OrderHelper: if([CLUB]=[Liga2P1];1;if([CLUB]=[Liga2P2];2;if([CLUB]=[Liga2P3];3;0)))
```

`Liga1OrderHelper` gibt für jeden Teilnehmer an, ob sein Verein auf Platz 1, 2 oder 3 liegt (0 = nicht in Top 3). Wird in der Siegerehrungsliste als Sortierfeld verwendet.

---

## Gesamtzusammenfassung: Datenfluss

```
FINISHED + STATUS=0
    └─► RegulaerImZiel = true
            └─► Platzziffer = RANK101 (Gesamtplatzierung m/w gemeinsam)

Nicht-reguläre Teilnehmer:
    STATUS=3 (DNF)  ─► HelperLiga = AnzahlImZiel
    STATUS=1 (a.k.) ─► HelperLiga = AnzahlImZiel
    STATUS=2 (DSQ)  ─► HelperLiga = MaximalPunktZahl
    STATUS=4 (DNS)  ─► HelperLiga = MaximalPunktZahl

    HelperLiga + StatusMalus = Platzziffer

Ranking "ImTeam" (ID=7):
    Sortiert pro Contest+Club nach DSQPrioStatus → Zeit
    → bestimmt welche 3 Athleten pro Team in die Teamwertung eingehen

TeamScore TS3 / TS4:
    Summiert Platzziffer der 3 gewählten Athleten
    → TS3.Time1 / TS4.Time1 = Platzsumme (niedrig = besser)
    → TS3.Rank / TS4.Rank = Teamrang
```

---

## Abgleich mit Ligastatut 2026

Quelle: [BWTV Triathlonliga – Ligastatut 2026](https://baden-wuerttembergischer-triathlonverband.de/wp-content/uploads/2026/01/Ligastatut_2026.pdf)

### Übereinstimmungen ✓

| Statut-Regel | Stelle | RaceResult-Umsetzung |
|---|---|---|
| Platz 1 = 1 Punkt, jeder weitere +1 | Anlage 2 | RANK101 = Platzziffer für reguläre Finisher |
| Nicht im Ziel registriert → letzte Platzziffer +2 | Anlage 2 | StatusMalus(DNF)=2, Basis=AnzahlImZiel |
| Nicht am Start → Maximalpunktzahl +3 | Anlage 2 | StatusMalus(DNS)=3, Basis=MaximalPunktZahl |
| DSQ → Maximalpunktzahl +6 | Anlage 2 | StatusMalus(DSQ)=6, Basis=MaximalPunktZahl |
| DSQ kommt immer in die Teamaddition | Anlage 2 | DSQPrioStatus=0 → DSQ sortiert als Erster innerhalb des Teams |
| 4 Starter pro Team, 3 kommen in Wertung | §9 Abs. 2 | TeamScore-Filter `[ImTeam] <= 3` |
| Gleichstand → gleiche Teamwertung | Anlage 2 | `UseTies=true` im TeamScore |
| Keine Geschlechterbeschränkung (2./3. Liga) | §9 Abs. 1–2 | `MinFemale=0, MaxFemale=3` |

### Abweichungen / Prüfbedarf ⚠️

**MaximalPunktZahl: aktuell falsch gesetzt**

Laut Anlage 2 gilt: `MaximalPunktZahl = Anzahl Teams × 4 Starter`, berechnet nach Mannschaftsmeldungseingang vor dem **ersten** Wettkampf der Saison.

| Liga | Teams 2026 | Korrekte MaximalPunktZahl | Aktuell gesetzt | Status |
|------|-----------|--------------------------|-----------------|--------|
| 2. Liga (Wettbewerb 3) | 16 | 16 × 4 = **64** | 92 | ⚠️ zu hoch (konservativ, aber ohne Auswirkung) |
| 3. Liga (Wettbewerb 4) | 22 | 22 × 4 = **88** | 64 | ⚠️ zu niedrig – potenziell problematisch |

**Auswirkung beim 5. Lemming Swim & Run 2026: keine.** Es gab weder DSQ-Athleten noch DNS-Athleten auf einer der gewerteten ImTeam-Positionen (1–3). DNS-Starter waren durchweg der vierte Teamstarter und damit vom TeamScore-Filter `[ImTeam] <= 3` ausgeschlossen. DNF-Athleten verwenden `AnzahlImZiel + 2` als Platzziffer, was unabhängig von MaximalPunktZahl korrekt berechnet wird.

**Risikofall für zukünftige Events:** Der zu niedrige Wert (64) für die 3. Liga würde dann wirken, wenn ein Team nur 3 Starter hat und einer davon DNS ist. Dann wäre ImTeam=3 ein DNS-Athlet mit Platzziffer 64+3=67 statt korrekt 88+3=91 – seine Strafe wäre zu gering und das Team würde bevorteilt.

**Empfehlung:** Vor jedem Event die tatsächlich gemeldeten Liga-Starter zählen und beide Werte aktualisieren:
- `MaximalPunktZahlLiga1` = Anzahl angemeldete Starter in Wettbewerb 3
- `MaximalPunktZahlLiga2` = Anzahl angemeldete Starter in Wettbewerb 4

**a.k.-Athleten: im Statut nicht explizit geregelt**

Das Statut nennt keine Regel für a.k.-Teilnehmer in der Teamwertung. Die aktuelle Umsetzung (StatusMalus = 1000) schließt a.k.-Athleten faktisch aus der Teamwertung aus, indem ihre Platzziffer ins Unendliche gedrückt wird. Das erscheint sinnvoll, ist aber nicht statutgemäß geregelt – im Zweifelsfall beim BWTV nachfragen.

**Startberechtigung (DTU-Startpass)**

Laut §5 Abs. 1 benötigen alle Liga-Teilnehmer einen gültigen DTU-Startpass. In den Zusatzfeldern gibt es das Feld `Startpassnummer` (ATF, Pflichtfeld = false). Wird das Feld nicht ausgefüllt, ist **keine automatische Prüfung** in RaceResult aktiv – die Kontrolle erfolgt laut Statut stichprobenartig vor Ort.
