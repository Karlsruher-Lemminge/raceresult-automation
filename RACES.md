# Veranstaltungen

Jeder Abschnitt enthält genaue Vorgehensweisen zum jeweiligen Wettkampf. Der Veranstaltungsname steht jeweils im Header bzw. enthält eine Beschreibung auf welche Veranstaltungsnamen die Regeln anzuwenden sind.

Beispiel: "Verstaltungsname beginnend mit Intern"

bedeutet das alle Veranstaltungen matchen sollen, die genau mit dem String Intern anfangen

Beispiel: N. Lemming Swim & Run

bedeutet das alle Veranstaltungen matchen sollen, die vorne eine Zahl vorangestellt haben und dann mit dem nachfolgenden String matchen.

N. Lemming Swim & Run matcht auf "5. Lemming Swim & Run" oder auch "67. Lemming Swim & Run"

## Verstaltungsname beginnend mit Intern oder Lemming ohne Zahl davor

Es handelt sich sich um eine vereinsinterne Veranstaltung.

Interne Veranstaltungen haben:
- keine Startgebühren
- ein Limit auf 50 Teilnehmer im Anmeldeformular
- das <ende-anmeldung> ist am Vortag der Veranstaltung um 18:00
- beim Internen Swim & Run 7 Tage vor Veranstaltungsdatum
- genau 50 Einträge im Chip File, ZJLBX51 Startnr. 1, ZJLBX52 Startnr. 2, ..., ZJLBX99 Startnr. 49, ZJLBX00 Startnr. 50
- my.raceresult.com: Teilnehmer Liste ist aktiv von 01.01. des Veranstaltungsjahres bis 10 Tage nach Veranstaltungstag
- my.raceresult.com: Ergebnisse ist aktiv vom Veranstaltungstag bis 10 Tage nach Veranstaltung

## Turmbergrennen

Das <ende-anmeldung> ist 7 Tage vor dem Veranstaltungsdatum um 23:59:59.
Chip-File: mindestens 400 Einträge, wenn das heutige Datum drei Tage vor Veranstaltungsbeginn ist. Sonst leer und keine Einträge
Listen-Veröffentlichen: nur die Liste beginnend mit "Teilnehmerliste ABC Voranmeldung" soll Aktiv sein

## N. Lemming Swim & Run

Das <ende-anmeldung> ist 7 Tage vor dem Veranstaltungsdatum um 23:59:59.
Chip-File: mindestens 400 Einträge, wenn das heutige Datum drei Tage Woche vor Veranstaltungsbeginn ist. Sonst leer und keine Einträge
Listen-Veröffentlichen: nur die Liste beginnend mit "Teilnehmerliste ABC" soll Aktiv sein

## Interner Swim & Run

Die Teilnehmerdaten enthalten Angaben zu Bestzeiten. Die Bestzeiten sind auf das Format MM:SS zu normalisieren.
Feld ist Textfeld. Es kann aufgrund der Eingabe der Teilnehmer zu Abweichungen kommen.

Rechne aus den angegebenen Bestzeiten die jeweiligen Wettkampfzeiten aus basierend auf der Länge bei den Wettkämpfen.
Rechne dazu auch eine Zielzeit basierend auf den Startzeiten aus.

Folgende Rahmenbedingungen:
- es gibt 5 Schwimmbahnen
- maximal zwei Teilnehmer pro Bahn
- Startnummer ergibt schwimmbahn, Schwimmer mit ungerader Startnummer und der direkt drauf folgende gerade Startnummer sind auf einer Bahn

Die Startnummern Neuvergabe erfolgt nach folgender Logik:

- die langsamsten Schwimmer startet im Normalfall in der ersten Welle des Wettkampfes
- der lange Wettkampf startet vor dem kurzen Wettkampf
- auf einer Bahn sollen möglichst gleichschnelle Schwimmer starten
- die Schwimmer sollen möglichst gleichmaessig auf die Bahnen verteilt werden
- die Finishzeit des letzten Teilnehmers soll möglichst früh sein, schnelle Schwimmer mit deutlich langsamer Laufzeit starten falls notwendig dazu in einer früheren Welle
