# Zeitnahme – Erkenntnisse & Prüfregeln

## Zwei Bauweisen
- **Split-basiert** (z.B. Interne Biermeile): Splits pro Messstelle in fester Reihenfolge, Sektoren (`split_type` 9) als Differenz zweier Splits. Reihenfolge + `time_min` (Delta zum Vorgänger, `time_mode` -2) ordnen Lesungen zu.
- **Result-basiert** (z.B. Lemming Cup): `(RAWDATA)`-Results mit `Location`=Messstelle, `rawdata_rules` (`min_offset` relativ zu vorherigem Result) statt Split-Fenstern, Zeiten als `T45-T5`, Runden über `TCount(a;b)`.

## Messstellen
- `ddt` = Sperrzeit für Mehrfachlesungen pro Chip und Messstelle. Klein (5 s) → mehr Extralesungen, wenn Läufer an der Matte stehen (Getränkestation). Groß (30 s) → sicher, solange zwei gewollte Durchgänge an derselben Matte weiter auseinander liegen.
- Erwartete Lesungen je Messstelle ausrechnen (Biermeile: START_ZIEL 5×, END_RUN_START_DRINK 3×); `<Messstelle>.Read<n+1> > 0` = zu viele Lesungen.

## Split-Fenster
- Start-Fenster (`time_max`) darf sich nicht mit der frühesten nächsten Lesung an derselben Matte überschneiden (schnellste Runde + minimale Zusatzzeit). Sonst wird bei fehlender Startlesung die Zwischenzeit zum Start.
- `time_min` an Sektoren ist die einzige Plausibilitätssperre: zu klein (z.B. 3 s Trinkzeit) → „Durchlaufen ohne Trinken“ wird gewertet.
- Runde ausgelassen → Ziel-Split findet keine Lesung mehr → nicht FINISHED (robust, gut so).

## Rankings
- Fehlender Split: `.Decimal` = 0, `min()` liefert 0 → Wertung auf schnellsten Sektor immer mit `[X.Exists]` für alle beteiligten Sektoren filtern.
- `DECIMALTIME` bei Massenstart mit Start-Split = Bruttozeit (Ziel.Gun). In Listen dieselbe Zeit anzeigen, nach der gerankt wird (Gun vs. Chip).
- Rankings rechnen ungerundet, Listen zeigen gerundet → gleiche angezeigte Zeit, unterschiedliche Plätze möglich.

## Rundung / Format
- `Contest.time_rounding` muss zum `time_format` passen. Beobachtet (nicht dokumentiert): `1` = ganze Sekunden aufgerundet (bei `m:ss,kk` steht immer „,00“), `12` = Zehntel.

## Standard-Prüflisten (Vorbild Lemming Cup)
- **Fehlende Zeiten**: ausgehend von `[FINISHED]` (oder `[Start.Exists]=0 OR …`), nicht nur `[Start.Exists]=1 AND …` – sonst fehlt genau der Fall „Startlesung verpasst“.
- **Unplausible Zeiten**: Sektoren unter Schwellwert (Biermeile-Testdaten: Trinken ≥ 8 s, Laufen ≥ 65 s → Schwellen ~5 s / ~55 s).
- **Wer ist wo?**: `[Start.Exists] AND NOT [FINISHED]`, sortiert nach letztem vorhandenen Split (Lemming Cup: `LastTimeID`/`TLast`).
- Ergebnislisten: `Status<>4` (n.a.) ausfiltern; Siegerliste: `Pl>0 AND Pl<=3`.

## Testen
- Formeln ohne Änderung testen: `event.data.list(fields=['<Ausdruck>'], filter_expr='Bib<=3')`.
- Mit `.Decimal`-Feldern rechnen; Textzeiten sind bei nicht aktivierten Teilnehmern vom Server maskiert (`_`), siehe `event.file.not_activated('')`.
- Rankings mit Testdaten von Hand nachsortieren (Gruppierung Contest/Sex beachten).
