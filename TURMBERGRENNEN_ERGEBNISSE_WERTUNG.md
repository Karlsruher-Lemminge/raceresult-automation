# Turmbergrennen – Ergebnisse & Wertungsstruktur

**Stand:** 07.05.2026  
**Veranstaltung:** Turmbergrennen  
**Ort:** Karlsruhe

---

## Überblick: Veranstaltungsstruktur

Das Turmbergrennen besteht aus drei Wettbewerbs-Kontexten:

| ID | Name | Bedeutung |
|----|------|-----------|
| 1 | Turmberg Radrennen | Nur Radrennen (Einzelzeitfahrt + Finale + optional Anhänger) |
| 2 | Turmberg Berglauf | Nur Berglauf |
| 3 | Doppelmeldung Turmberg Radrennen und Berglauf | Beides |

Contest 1 und 3 nehmen am Radrennen teil. Contest 2 und 3 nehmen am Berglauf teil. Diese Unterscheidung wird in fast allen Formeln durch Vergleiche wie `[CONTEST]<>2` (nicht Berglauf) oder `[CONTEST]>=2` (Berglauf) abgebildet. Viele Berechnungen liefern für den falschen Contest einfach den Wert 0 zurück, sodass keine Zeitmessung entsteht.

Das Radrennen gliedert sich in zwei Phasen:
1. **Einzelzeitfahrt (EZF):** Alle Radfahrer fahren die Strecke in einem Intervallstart. Die EZF-Zeit bestimmt die Qualifikation für die Finale.
2. **Finale:** Die Top-Platzierten der EZF werden je nach Rang in A-, B- und C-Finale (Männer) bzw. ein Frauenfinale aufgeteilt und fahren erneut gegeneinander.

---

## Messstellen (Timing Points)

Alle Messstellen haben Typ 9 (Chip-Leser) und eine Doppeldetektion von 30 Sekunden (DDT), d.h. innerhalb von 30 Sekunden wird jeder Chip nur einmal erfasst.

| Name | Funktion | Farbe |
|------|----------|-------|
| START | Startzeiterfassung EZF (Chip-Leser) | gelb |
| VORWARNER | Ankunftswarnung ca. 100 m vor Ziel (für Moderator-Anzeige) | cyan |
| ZIEL | Zielmessung für alle Rennen | grün |
| TIMING | Allgemeiner Messpunkt (nicht aktiv zugewiesen) | – |
| CHIPBACK | Chip-Rückgabeerfassung nach der Veranstaltung | – |

Der VORWARNER ist zentral für die Moderator-Listen: Sobald ein Fahrer den Vorwarner passiert, erscheint er in der Live-Anzeige. Erst wenn er durch das Ziel fährt, wird die endgültige Zeit eingetragen.

---

## Ergebnisse (Results): Aufbau und Logik

RaceResult speichert Zeitmessungen und berechnete Ergebnisse in nummerierten „Result"-Slots (T1, T2, ..., Tn). Jeder Slot kann entweder Rohdaten einer Messstelle aufnehmen (`RAWDATA`) oder eine berechnete Zeit auf Basis anderer Slots darstellen. Die Numbering-Konvention ist hier: Die erste Ziffer (1, 2, 3, ...) gibt die Wettkampf-Gruppe an, die zweite Ziffer die Rolle (0=Start, 1=Ziel, 2=Vorwarner). Finale verwenden die Zehner 3x–6x.

### Gruppe 1: Einzelzeitfahrt / Radrennen

Das EZF-Timing nutzt drei Messpunkte: START, VORWARNER und ZIEL. Der Intervallstart vergibt jedem Fahrer anhand seiner Startnummer eine individuelle Startzeit.

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T9 | VergebeneStartzeit | `if([CONTEST]<>2; [StartzeitEZF] - [IntervallEZF] + ([BIB]*[IntervallEZF]); 0)` | hh:mm:ss |
| T10 | MessungStartEinzelzeitfahrt | `(RAWDATA)` @ START | – |
| T11 | MessungZielEinzelzeitfahrt | `(RAWDATA)` @ ZIEL | – |
| T12 | VorwarnerEinzelzeitfahrt | `(RAWDATA)` @ VORWARNER | – |
| **T1** | **Einzelzeitfahrt** | `if([KeinEZF]=1 OR [CONTEST]=2; 0; T11 - if(T10>0; T10; T9))` | mm:ss,kk |

**Erklärung der Formeln:**

**T9 – VergebeneStartzeit:** Berechnet die theoretische Startzeit eines Fahrers aus der Startnummer. `[StartzeitEZF]` ist die Gesamtstartzeit der Veranstaltung, `[IntervallEZF]` der Startzeitabstand zwischen den Fahrern (z.B. 30 Sekunden). Durch `[BIB] * [IntervallEZF]` erhält jede Startnummer eine eindeutige Abfahrtzeit. Für Berglauf-Only-Teilnehmer (Contest 2) wird 0 zurückgegeben.

**T1 – Einzelzeitfahrt (berechnete Netto-Zeit):** Die Formel hat zwei Sicherheitsebenen:
- Wenn `[KeinEZF]=1` ist (manuell gesetztes Merkmal, z.B. Ausfall oder Ausschluss) oder der Teilnehmer am Berglauf (Contest 2) ist, wird 0 zurückgegeben – kein EZF-Ergebnis.
- Wenn eine echte Startmessung per Chip vorliegt (`T10>0`), wird diese genutzt: `T11 - T10`.
- Liegt keine Startmessung vor (der Fahrer ist am Startchip vorbeigefahren ohne Erfassung), fällt die Formel auf die vergebene Startzeit zurück: `T11 - T9`. Das ist der Normalfall bei Intervallstarts ohne Startchip-Pflicht.

### Gruppe 2: Anhängerrennen

Das Anhängerrennen ist ein Sonderwettbewerb für Teilnehmer, die zusätzlich mit einem Anhänger fahren. Nur wer das Merkmal `AYN1=1` hat, bekommt eine Startmessung zugeteilt.

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T20 | MessungStartAnhänger | `if([AYN1]=1; [StartzeitAnhaenger])` | – |
| T21 | MessungZielAnhänger | `(RAWDATA)` @ ZIEL | – |
| T22 | VorwarnerAnhänger | `(RAWDATA)` @ VORWARNER | – |
| **T2** | **Anhängerrennen** | `T21 - T20` | mm:ss,kk |

**Erklärung:** Anders als bei der EZF gibt es hier keinen Chip-Start. Die Startzeit `[StartzeitAnhaenger]` ist eine feste Variable (alle Anhängerfahrer starten gemeinsam). T20 wird daher nur für berechtigte Teilnehmer gesetzt. Die Zielankunft wird über denselben ZIEL-Chip-Leser wie die EZF erfasst; RaceResult trennt die Messungen intern anhand der Startnummer und der konfigurierten Result-Zuordnung.

### Gruppe 3: Berglauf

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T30 | LaufStart | `if([CONTEST]>=2; [StartzeitLauf])` | hh:mm:ss |
| T31 | MessungZielLauf | `(RAWDATA)` @ ZIEL | – |
| T32 | VorwarnerLauf | `(RAWDATA)` @ VORWARNER | – |
| **T3** | **Laufzeit** | `T31 - T30` | mm:ss,kk |

**Erklärung:** Der Berglauf hat einen Massenstart: Alle Teilnehmer (Contest 2 und 3) starten gleichzeitig zur globalen Variable `[StartzeitLauf]`. Es gibt keine individuelle Startmessung. T30 liefert für Contest 1 (reines Radrennen ohne Lauf) keine Zeit. Die Zielankunft wird – wie bei allen anderen Rennen – am gemeinsamen ZIEL-Punkt erfasst.

### Gruppen 4–7: Finale (Radrennen)

Die Finale verwenden eine einheitliche Struktur aus Startmessung + Ziel + Vorwarner. Die Qualifikation für jedes Finale wird direkt in der Startmessungsformel kodiert: Nur wer die richtige EZF-Platzierung hat und das richtige Geschlecht, bekommt eine berechnete Startzeit — alle anderen erhalten keinen Wert, womit für sie kein Finish-Ergebnis entstehen kann.

Die Platzierung aus der EZF, die für die Finale-Qualifikation genutzt wird, heißt intern `[RANK2]`. Hierbei handelt es sich um das RANK-Feld der EZF-Gesamtwertung Männer (`EinzelzeitfahrtMWPl`), das für die Qualifikation ausgewertet wird.

#### C-Finale Männer (Plätze 61–90)

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T35 | MessungStartFinaleC | `if([RANK2]>60 AND [RANK2]<=90 AND [SEX]="m"; [StartzeitCFinale])` | – |
| T36 | MessungZielFinaleC | `(RAWDATA)` @ ZIEL | – |
| T37 | VorwarnerFinaleC | `(RAWDATA)` @ VORWARNER | – |
| **T15** | **MännerFinaleC** | `T36 - T35` | – |

> **Hinweis zur Result-ID:** Das C-Finale trägt die ID 15 statt einer sequenziellen 4x-Nummer, vermutlich weil es nachträglich hinzugefügt wurde. Die zugehörigen Messungs-IDs 35–37 folgen der 3x-Konvention (dritte Strecken-Gruppe).

#### B-Finale Männer (Plätze 31–60)

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T40 | MessungStartFinaleB | `if([RANK2]>30 AND [RANK2]<=60 AND [SEX]="m"; [StartzeitBFinale])` | – |
| T41 | MessungZielFinaleB | `(RAWDATA)` @ ZIEL | – |
| T42 | VorwarnerFinaleB | `(RAWDATA)` @ VORWARNER | – |
| **T4** | **MännerFinaleB** | `T41 - T40` | mm:ss,kk |

#### Finale Frauen (Plätze 1–31)

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T50 | MessungStartFinaleFrauen | `if([RANK2]>0 AND [RANK2]<=30 AND [SEX]="f"; [StartzeitFrauenFinale])` | – |
| T51 | MessungZielFinaleFrauen | `(RAWDATA)` @ ZIEL | – |
| T52 | VorwarnerFinaleFrauen | `(RAWDATA)` @ VORWARNER | – |
| **T5** | **FrauenFinale** | `T51 - T50` | mm:ss,kk |

> Der `[RANK2]`-Ausdruck gilt hier für die Frauen-EZF-Gesamtwertung.

#### A-Finale Männer (Plätze 1–30)

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T60 | MessungStartFinaleA | `if([RANK2]>0 AND [RANK2]<=30 AND [SEX]="m"; [StartzeitAFinale])` | – |
| T61 | MessungZielFinaleA | `(RAWDATA)` @ ZIEL | – |
| T62 | VorwarnerFinaleA | `(RAWDATA)` @ VORWARNER | – |
| **T6** | **MännerFinaleA** | `T61 - T60` | mm:ss,kk |

### Gruppe 8: Chiprückgabe

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T7000 | Chiprückgabe | `(RAWDATAA)` @ CHIPBACK | s |

Dieser Result-Slot dient der Dokumentation der Chip-Rückgabe nach der Veranstaltung. `RAWDATAA` ist eine Variante von `RAWDATA`, die nur den ersten Rohwert der Messstelle übernimmt.

---

## Spezielle Ergebnisse

### Tagesbestzeiten (T7, T8)

| ID | Name | Formel | Format |
|----|------|--------|--------|
| T7 | TagesBeste | `TTMin(1;4;5;6;15)` | mm:ss,kk |
| T8 | TagesBesteID | `TTMinID(1;4;5;6;15)` | s |

**Erklärung:** `TTMin(...)` und `TTMinID(...)` sind RaceResult-Funktionen, die das Minimum bzw. die ID des minimalen Ergebnis-Slots über eine Liste von Result-IDs berechnen. Die Intention ist es, für jeden Teilnehmer die schnellste überhaupt je im Kontext dieses Veranstaltungstages erzielte Zeit (also über alle Finale und die EZF hinweg) zu ermitteln und als „Tagesbeste" auszugeben.

- **T7 TagesBeste:** Die kleinste Zeit aus T1 (EZF), T4 (B-Finale), T5 (Frauen-Finale), T6 (A-Finale) und T15 (C-Finale).
- **T8 TagesBesteID:** Die ID des Ergebnis-Slots, aus dem T7 stammt (z.B. `6` wenn das A-Finale die Tagesbeste lieferte).

T8 wird in den Moderator-Listen genutzt, um in der Rekord-/Tagesbeste-Anzeige den richtigen Zeit-Slot zu referenzieren.

### Streckenrekorde (T1001–T1004)

Die Streckenrekorde dienen dazu, den historischen Streckenrekord mit dem aktuell besten Tagesergebnis zu vergleichen und das jeweils kleinere (schnellere) Ergebnis anzuzeigen. Dies ermöglicht, in der Live-Ansicht „Neuer Rekord!" anzuzeigen, wenn ein Fahrer den bisherigen Rekord bricht.

Die gespeicherten Rekordzeiten werden in RaceResult-Variablen hinterlegt und müssen vor der Veranstaltung manuell gesetzt werden:

| Variable | Bedeutung |
|----------|-----------|
| `[RekordRadM]` | Bisheriger Streckenrekord EZF/Finale Männer |
| `[RekordRadF]` | Bisheriger Streckenrekord EZF/Finale Frauen |
| `[RekordAnhaenger]` | Bisheriger Streckenrekord Anhängerrennen |
| `[RekordSingleSpeed]` | Bisheriger Streckenrekord Single Speed |
| `[RekordLaufM]` | Bisheriger Streckenrekord Berglauf Männer |
| `[RekordLaufF]` | Bisheriger Streckenrekord Berglauf Frauen |

Die RANK-Ausdrücke in den Formeln greifen auf die besten aktuellen Tagesergebnisse zu:

| RANK-Ausdruck | Bedeutet |
|--------------|----------|
| `[RANK11Top7]` | Beste Zeit aus Result 11 (Ziel-Rohzeit EZF) — effektiv die 7 schnellsten EZF-Zielankunften des Tages, unabhängig von Startzeit |
| `[RANK6Top2]` | Top-2 aus Result 6 (MännerFinaleA) — die zwei schnellsten A-Finale-Zeiten |
| `[RANK5Top1]` | Beste Zeit aus Result 5 (FrauenFinale) |
| `[RANK16Top3]` | Top-3 aus Result 16 — Result 16 ist in der Konfiguration nicht explizit vergeben; vermutlich ein interner Alias oder historisches Feld |

| ID | Name | Formel | Bedeutung |
|----|------|--------|-----------|
| T1001 | StreckenRekordMW | `switch([SEX]="f"; if([RANK11Top7]<[RekordRadF]; [RANK11Top7]; [RekordRadF]); [SEX]="m"; if([RANK11Top7]<[RekordRadM]; [RANK11Top7]; [RekordRadM]))` | Rad: Minimum aus Tagesbeste und gespeichertem Rekord, getrennt nach Geschlecht |
| T1002 | StreckenRekordAnhänger | `if([RANK6Top2]<[RekordAnhaenger]; [RANK6Top2]; [RekordAnhaenger])` | Anhänger: Minimum aus Top-2 A-Finale und gespeichertem Rekord |
| T1003 | StreckenRekordEingang | `if([RANK5Top1]<[RekordSingleSpeed]; [RANK5Top1]; [RekordSingleSpeed])` | Single Speed: Minimum aus bestem Frauenfinale-Wert und gespeichertem Rekord |
| T1004 | StreckenRekordLaufMW | `switch([SEX]="f"; if([RANK16Top3]<[RekordLaufF]; [RANK16Top3]; [RekordLaufF]); [SEX]="m"; if([RANK16Top3]<[RekordLaufM]; [RANK16Top3]; [RekordLaufM]))` | Lauf: Minimum aus Top-3 und gespeichertem Rekord, getrennt nach Geschlecht |

In den Ergebnislisten und Moderator-Listen wird verglichen: Ist die Zielzeit eines Fahrers gleich dem Streckenrekord-Wert (`T1 = T1001`), bedeutet das, dieser Fahrer hat gerade den Streckenrekord gebrochen.

### Sonstige spezielle Ergebnisse

#### AnzahlRadLaufZiel (T5000)

```
if([TIMESET1] AND [TIMESET3]; 2; if([TIMESET1] OR [TIMESET3]; 1; 0))
```

Dieses Result zählt, wie viele der beiden Disziplinen (Radrennen=TIMESET1, Lauf=TIMESET3) für einen Doppelmelder bereits eine Zielankunft haben. Nützlich für Contest 3 (Doppelmeldung), um den Status in der Ergebnisdarstellung zu steuern — z.B. erst nach beiden Zieleinläufen die Gesamtplatzierung anzeigen.

#### Video-Offsets (T6001–T6006)

| ID | Formel | Für Wettbewerb |
|----|--------|----------------|
| T6001 | `T11 - VideoStart` | EZF |
| T6002 | `T21 - VideoStart` | Anhängerrennen |
| T6003 | `T31 - VideoStart` | Berglauf |
| T6004 | `T41 - VideoStart` | B-Finale |
| T6005 | `T51 - VideoStart` | Frauen-Finale |
| T6006 | `T61 - VideoStart` | A-Finale |

`[VideoStart]` ist eine manuell zu setzende Variable mit dem Zeitstempel, ab dem die Videoaufnahme läuft. Der Offset gibt an, nach wie vielen Sekunden ab Videostart der jeweilige Teilnehmer ins Ziel kommt. Damit kann man im Nachgang schnell die richtige Videoposition für jeden Fahrer finden.

---

## Gesamte Wertungsstruktur

Die Wertungen basieren nicht direkt auf den berechneten Zeiten, sondern auf vorberechneten **Platzierungsfeldern** (Custom Fields), die RaceResult nach jedem Zeitimport neu berechnet. Diese Felder (z.B. `EinzelzeitfahrtMWPl`) enthalten die aktuelle Platzierung eines Teilnehmers innerhalb seiner Wertungsgruppe. Für die Ergebnislisten bedeutet das: Die Listen filtern und sortieren nach diesen Platzierungsfeldern, nicht nach den Rohzeiten — was Performance-Vorteile hat und eine konsistente Darstellung sicherstellt.

Das Anzeigefeld `...Plp` (mit p am Ende) ist die statusbereinigte Version der Platzierung, die z.B. DNF, DNS oder DSQ korrekt ausgibt statt einer Zahl.

### 1. Einzelzeitfahrt / Radrennen (Contest 1 + 3)

#### 1.1 Gesamtwertung Männer & Frauen

Beide Listen nutzen dasselbe Platzierungsfeld `EinzelzeitfahrtMWPl`, unterscheiden sich aber im Gender-Filter.

| Wertung | Platzierungsfeld | Filter | Ergebnis-Spalte |
|---------|-----------------|--------|-----------------|
| Männer | `EinzelzeitfahrtMWPl` | Contest≠2, Gender=m | T1 |
| Frauen | `EinzelzeitfahrtMWPl` | Contest≠2, Gender=f | T1 |
| M+F zusammen | `EinzelzeitfahrtMWPl` | Contest≠2 | T1, gruppiert nach `MännerFrauen` |

Die kombinierte M+F-Liste gruppiert nach dem Feld `MännerFrauen` (sortiert absteigend, d.h. „m" kommt vor „f" bei alphabetischer Sortierung), bricht je Gruppe eine neue Seite an und rendert den Gruppenheader fett in Schriftgröße 12.

Zusatzfeld in allen EZF-Listen: `iif(T1=T1001;"NR!")` — erscheint, wenn die Zeit des Fahrers dem aktuellen Streckenrekordwert entspricht.

Außerdem wird die Geschwindigkeit berechnet und angezeigt: `EtappeGeschwindigkeit(T1)` ist eine RaceResult-Funktion, die aus der Zielzeit und der hinterlegten Streckenlänge die Durchschnittsgeschwindigkeit errechnet.

#### 1.2 Altersklassenwertung

| Wertung | Platzierungsfeld | Filter | Sortierung |
|---------|-----------------|--------|------------|
| Altersklassen | `EinzelzeitfahrtAKPl` | Contest≠2 | AgeGroup.Name → AgeGroup.NameShort (Seitenumbruch) → Platz |

Die doppelte Sortierung nach AgeGroup.Name und AgeGroup.NameShort stellt sicher, dass die Altersklassen sinnvoll gruppiert werden — AgeGroup.Name für die inhaltliche Reihenfolge (z.B. „Jugend", „Senioren"), AgeGroup.NameShort für den Seitenumbruch mit dem Kurzbezeichner als Überschrift.

#### 1.3 Sonderwertungen

**Single Speed** — Teilnehmer mit dem Merkmal „Eingangfahrer" (vermutlich ein Custom Field, das Single-Speed/Fixie-Fahrer kennzeichnet):

| Platzierungsfeld | Filter | NR-Kennzeichen |
|-----------------|--------|----------------|
| `EinzelzeitfahrtEingangfahrerPl` | Contest≠2 | `iif(T1=T1003;"NR!")` |

Streckenrekord-Referenz ist hier T1003 (`StreckenRekordEingang`), nicht T1001 — d.h. der Single-Speed-Rekord wird separat vom allgemeinen Rad-Rekord geführt.

**Stadtmobil** — Teilnehmer, die ein Stadtmobil-Fahrzeug nutzen:

| Platzierungsfeld | Filter | Sortierung |
|-----------------|--------|------------|
| `EinzelzeitfahrtStadtmobilPl` | Contest≠2 | Gruppe nach M/W, dann Platz |

Kein NR-Feld in der Stadtmobil-Liste — diese Sonderwertung führt keinen Streckenrekord.

---

### 2. Finale Radrennen

#### Qualifikationssystem

Nach der EZF werden die Teilnehmer anhand ihrer EZF-Platzierung automatisch einem Finale zugeordnet. Die Grenzwerte sind in den Startmessungsformeln hartcodiert:

| Finale | Plätze Männer | Plätze Frauen | Startzeit-Variable |
|--------|--------------|---------------|--------------------|
| C-Finale Männer | 61–90 | – | `[StartzeitCFinale]` |
| B-Finale Männer | 31–60 | – | `[StartzeitBFinale]` |
| Finale Frauen | – | 1–30 | `[StartzeitFrauenFinale]` |
| A-Finale Männer | 1–30 | – | `[StartzeitAFinale]` |

Diese Grenzwerte bedeuten, dass bis zu 90 Männer und bis zu 30 Frauen in die Finale einziehen. Fahrer, die nicht qualifiziert sind (z.B. Männer ab Platz 91), bekommen keine Startzeit und damit kein Finale-Ergebnis.

Alle vier Finale teilen sich dieselbe Ziel-Messstelle (ZIEL-Chip-Leser). RaceResult unterscheidet die Messungen anhand der Teilnehmer-IDs und ordnet sie dem richtigen Result-Slot zu.

#### Ergebnislisten der Finale

Jede Finalliste verwendet ein eigenes Platzierungsfeld und zeigt das zugehörige berechnete Zeit-Ergebnis:

| Finale | Ergebnis-Slot | Platzierungsfeld | NR-Kennzeichen |
|--------|--------------|-----------------|----------------|
| C-Finale Männer | T15 | `MännerFinaleCPl` | `iif(T15=T1001;"NR!")` |
| B-Finale Männer | T4 | `MännerFinaleBPl` | `iif(T4=T1001;"NR!")` |
| Finale Frauen | T5 | `FrauenFinalePl` | `iif(T5=T1001;"NR!")` |
| A-Finale Männer | T6 | `MännerFinaleAPl` | `iif(T6=T1001;"NR!")` |

Alle Finale-Listen vergleichen mit T1001 (`StreckenRekordMW`), d.h. ein Finale-Sieg, der schneller als der bisherige Gesamtrekord ist, wird als „NR!" ausgezeichnet — unabhängig davon, ob es EZF oder Finale war.

---

### 3. Anhängerrennen (Contest 1 + 3)

| Platzierungsfeld | Filter | Ergebnis-Slot | NR-Kennzeichen |
|-----------------|--------|--------------|----------------|
| `AnhängerPl` | AYN1=1, Contest≠2 | T2 | `iif(T2=T1002;"NR!")` |

Das Anhängerrennen hat eine eigene Streckenrekord-Variable (`T1002`, `StreckenRekordAnhänger`). Die Liste zeigt zusätzlich die Durchschnittsgeschwindigkeit (`EtappeGeschwindigkeit(T2)`), was bei einem Anhänger-Rennen besonders interessant ist.

---

### 4. Berglauf (Contest 2 + 3)

#### 4.1 Gesamtwertung

Wie bei der EZF gibt es getrennte und kombinierte Listen, alle über dasselbe Platzierungsfeld `LaufMWPl`:

| Wertung | Platzierungsfeld | Filter | Ergebnis-Slot |
|---------|-----------------|--------|--------------|
| Männer | `LaufMWPl` | Contest≥2, Gender=m | T3 |
| Frauen | `LaufMWPl` | Contest≥2, Gender=f | T3 |
| M+F zusammen | `LaufMWPl` | Contest≥2 | T3, gruppiert nach `MännerFrauen` |

NR-Kennzeichen: `iif(T3=T1004;"NR!")` — Vergleich mit `StreckenRekordLaufMW`, der nach Geschlecht unterscheidet.

#### 4.2 Altersklassenwertung

| Platzierungsfeld | Filter | Sortierung |
|-----------------|--------|------------|
| `LaufAKPl` | Contest≥2 | AgeGroup.Name → AgeGroup.NameShort (Seitenumbruch) → Platz |

Identische Struktur wie die EZF-Altersklassenwertung.

#### 4.3 Stadtmobil-Sonderwertung

| Platzierungsfeld | Filter | Sortierung |
|-----------------|--------|------------|
| `LaufStadtmobilPl` | Contest≥2 | Gruppe nach M/W, dann Platz |

---

### 5. Mannschaftswertung

Die Mannschaftswertung nutzt das RaceResult-Objekt **Team Scoring 3 (TS3)**, das eine eigenständige Wertungslogik implementiert. Team Scoring in RaceResult summiert oder aggregiert die Einzel-Ergebnisse der Mitglieder eines Teams (identifiziert durch das Feld `Club`) nach einer vorab konfigurierten Regel — hier TS3.

Die Ergebnisliste zeigt eine gruppierte Ansicht: Pro Team gibt es eine Kopfzeile und darunter die einzelnen Mitglieder. Die Kopfzeile wird dynamisch aus folgendem Ausdruck gerendert:

```
[TS3.RankP] & "///" & [Club] & "" & "///" & "# " & [TS3.Time1]
```

Das bedeutet: `<Teamplatz> /// <Vereinsname> /// # <Teamscore>`. Die `///` sind vermutlich optische Trennzeichen für die Display-Formatierung der Liste.

Sortierung:
1. `TS3.Rank` (Gesamtteamplatz, aufsteigend)
2. `Contest` (Wettbewerb des Teammitglieds)
3. `Lastname` (Alphabetisch)
4. Gruppenzeile mit `TS3.Position` (Position des Mitglieds innerhalb des Teams)

Angezeigte Felder pro Mitglied: Name (`AnzeigeName`), Wettbewerb (`Contest.NameShort`).

---

## Moderator-Listen (04-Moderator | Zieleinlauf)

Die Moderator-Listen sind für die Zielmoderator-Ansicht konzipiert: Sie zeigen in Echtzeit, welche Fahrer sich gerade in der Zielkurve befinden oder bereits eingelaufen sind, und aktualisieren sich mit jedem Chip-Scan.

### Grundprinzip

Jede Liste filtert nach dem Vorwarner-Feld: Nur wer den Vorwarner passiert hat (Feld ≠ ""), erscheint in der Liste. Das verhindert, dass alle gemeldeten Fahrer von Anfang an in der Liste stehen.

Die Sortierung ist **absteigend nach Zeit**, was bedeutet: Der zuletzt Eingetroffene steht oben. Dies entspricht der Logik eines Moderators, der das aktuellste Ereignis immer oben sehen möchte.

### Intelligente Sortier-Umschaltung (Vorwarner → Zielzeit)

Das entscheidende Detail ist, dass die Sortierung sich automatisch zwischen Vorwarner- und Zielzeit-Messung umschaltet:

```
iif([MännerFinaleB]=""; [DecimalTime42]; [DecimalTime4])
```

- Solange der Fahrer noch nicht im Ziel ist (`[MännerFinaleB]=""`), wird nach `[DecimalTime42]` (Dezimaldarstellung der Vorwarner-Zeit T42) sortiert.
- Sobald eine Zielzeit existiert, wird nach `[DecimalTime4]` (Dezimaldarstellung der Zielzeit T4) sortiert.

`DecimalTime` ist eine RaceResult-Funktion, die eine Uhrzeit als Dezimalzahl darstellt (z.B. 10:30:15 Uhr = 37815 Sekunden seit Mitternacht). Durch die absteigende Sortierung erscheinen die zuletzt erfassten Zeiten oben — das gilt sowohl für Vorwarner-Durchgänge als auch für Zielankunften.

Die Ausnahme ist die **Einzelzeitfahrt**: Hier wird immer nur `DecimalTime12` (Vorwarner-Dezimalzeit) sortiert, da bei der EZF alle Fahrer zu unterschiedlichen Startzeiten fahren und die Vorwarnermessung bereits eine klare zeitliche Reihenfolge liefert.

### Übersicht der Sortierausdrücke

| Moderator-Liste | Sortierausdruck | Vorwarner-Fallback | Ziel-Aktivierung |
|-----------------|----------------|-------------------|-----------------|
| Einzelzeitfahrt | `DecimalTime12` ↓ | immer Vorwarner | – |
| Anhängerrennen | `iif([Anhängerrennen]=""; [DecimalTime22]; [DecimalTime2])` ↓ | T22 | T2 |
| Berglauf | `[DecimalTime32]` ↓ | immer Vorwarner | – |
| C-Finale Männer | `iif([MännerFinaleC]=""; [DecimalTime37]; [DecimalTime15])` ↓ | T37 | T15 |
| B-Finale Männer | `iif([MännerFinaleB]=""; [DecimalTime42]; [DecimalTime4])` ↓ | T42 | T4 |
| Finale Frauen | `iif([FrauenFinale]=""; [DecimalTime52]; [DecimalTime5])` ↓ | T52 | T5 |
| A-Finale Männer | `iif([MännerFinaleA]=""; [DecimalTime62]; [DecimalTime6])` ↓ | T62 | T6 |

### Filter je Liste

| Moderator-Liste | Filterbedingungen |
|-----------------|------------------|
| Einzelzeitfahrt | VorwarnerEinzelzeitfahrt≠"" und Contest≠2 |
| Anhängerrennen | VorwarnerAnhänger≠"" und AYN1=1 und Contest≠2 |
| Berglauf | VorwarnerLauf≠"" und Contest≥2 |
| C-Finale Männer | VorwarnerFinaleC≠"" und Finale="C-Finale Männer" |
| B-Finale Männer | VorwarnerFinaleB≠"" und Finale="B-Finale Männer" |
| Finale Frauen | VorwarnerFinaleFrauen≠"" und Finale="Finale Frauen" |
| A-Finale Männer | VorwarnerFinaleA≠"" |

Das Feld `Finale` (für C/B/Frauen) ist vermutlich ein berechnetes Custom Field, das anhand der Qualifikationsformel den Finale-Namen des Teilnehmers enthält. Das A-Finale benötigt keinen zusätzlichen Finale-Filter, weil für das A-Finale kein weiteres Korrektiv nötig ist — wer VorwarnerFinaleA passiert hat, ist im A-Finale.

### Rekord- und Tagesbeste-Anzeige

Alle Moderator-Listen zeigen in einer zusätzlichen Spalte einen Status-Text, wenn der aktuell angezeigte Fahrer besonderes geleistet hat:

| Moderator-Liste | Streckenrekord-Bedingung | Tagesbeste-Bedingung |
|-----------------|--------------------------|---------------------|
| Einzelzeitfahrt | `T1=T1001` → „Neuer Rekord!" | `T1=[RANK11Top7]` → „Tagesbestzeit" |
| Anhängerrennen | `T2=T1002` → „Neuer Rekord!" | – |
| Berglauf | `T3=T1004` → „Neuer Rekord!" | `T3=[RANK15Top3]` → „Tagesbeste" |
| C-Finale | `T15=T1001` → „Neuer Rekord!" | `T15=[RANK11Top7]` → „Tagesbeste" |
| B-Finale | `T4=T1001` → „Neuer Rekord!" | `T4=[RANK11Top7]` → „Tagesbeste" |
| Finale Frauen | `T5=T1001` → „Neuer Rekord!" | `T5=[RANK11Top7]` → „Tagesbeste" |
| A-Finale | `T6=T1001` → „Neuer Rekord!" | `T6=[RANK11Top7]` → „Tagesbeste" |

Die Tagesbeste-Anzeige bei Finale-Listen vergleicht mit `[RANK11Top7]`, also der besten EZF-Zielzeit des Tages. Das bedeutet: Wenn ein Finale-Fahrer schneller fährt als alle EZF-Fahrer bisher, wird „Tagesbeste" angezeigt — also die schnellste Zeit des gesamten Wettkampftags.

Die Anhängerrennen-Moderatorliste hat keine Tagesbeste-Anzeige, da das Anhängerrennen eine isolierte Sonderwertung ist.

