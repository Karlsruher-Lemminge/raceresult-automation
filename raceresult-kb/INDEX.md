# Raceresult KB: Felder, Ausdrücke und Funktionen – Index

Dieses Verzeichnis enthält die Dokumentation der Raceresult Knowledge Base zum Thema
**Felder, Ausdrücke und Funktionen** (KB-ID 2192), konvertiert nach Markdown.

Quelle: https://www.raceresult.com/de/support/kb?id=2192-Felder-Ausdrcke-und-Funktionen

---

## Dateien und Inhalte

### [`2192-Felder-Ausdruecke-und-Funktionen.md`](2192-Felder-Ausdruecke-und-Funktionen.md)
Einstiegsseite mit Überblick über das gesamte Thema: Was sind Felder, Ausdrücke und Funktionen, wofür werden sie verwendet (Listen, Urkunden, Filter etc.).

---

### [`20190-Syntax.md`](20190-Syntax.md)
Syntaxregeln für Ausdrücke und Funktionen.
- Bedeutung und Namen der Sonderzeichen: `[ ] ( ) " | & { } ; : # `
- Wann eckige Klammern, runde Klammern, Anführungszeichen verwendet werden
- Escape-Sequenzen für Sonderzeichen in Strings
- Unterschied zwischen Text- und Zahlenausdrücken

---

### [`2056-Ausdruecke.md`](2056-Ausdruecke.md)
Erläuterung der zwei Ausdruckstypen in Raceresult.
- **Normale Ausdrücke**: Felder in `[...]`, Texte in `"..."`, Verkettung mit `&`
- **Erweiterte Ausdrücke**: Berechnungen, Vergleiche, Funktionsaufrufe

---

### [`7174-Felder.md`](7174-Felder.md)
Vollständige Feldübersicht (inkl. aller Unterkapitel). Nachschlagewerk für alle verfügbaren Feldnamen.
- **Datenfelder der Teilnehmer**: ID, Status, Sprache, Zusatzfelder, Typ, Name, Bezeichnung, Auswahlwerte, Jahrgang/Geburtstag
- **Abgeleitete Felder**: Land, Nation
- **Datenfelder der Veranstaltung**: Veranstaltung, Wettbewerb, Altersklassen, Startgeld
- **Zeitfelder**: Netto-/Bruttozeiten
- **Felder der Zwischen-/Abschnittszeiten**: berechnete Zeiten, hochgerechnete Zeiten, Platzierungen, Gap-Zeiten, Zugriff auf andere Teilnehmer
- **Ergebnisfelder**
- **Platzierungsfelder**
- **Mannschaftswertungsfelder**: Team-Mitglieder, Teamrundenrennen
- **Felder für Online-Payment & Finanzen**: Online-Payment, Startgeld, Gutscheine
- **Nummerierung in Listen**
- **Sonstige Felder**
- **Fields List Reference** (englischsprachige Referenzliste)
- **Rechnungsfelder**

---

### [`2084-Operatoren.md`](2084-Operatoren.md)
Alle verfügbaren Operatoren für Ausdrücke.
- **Rechenoperatoren**: `+ - * /`
- **Vergleichsoperatoren**: `= <> < > <= >=`
- **Logische Operatoren**: `AND OR NOT`
- **Mengen-Operatoren**: `IN`, Bereichsoperatoren

---

### [`2057-Funktionen.md`](2057-Funktionen.md)
Vollständige Funktionsreferenz (inkl. aller Unterkapitel). Nachschlagewerk für alle eingebauten Funktionen.
- **Ablauf-Funktionen**: `iif()` / `if()`, `switch()`, `choose()`
- **String-Funktionen**: `left()`, `right()`, `mid()`, `instr()`, `instr2()`, `SplitString()`, `val()`, `len()`, `lcase()`, `ucase()`, `trim()`, `string()`, `replace()`, `reduceChars()`, `removeAccents()`, `chr()`, `asc()`, `ordinal()`, `similarity()`, `CorrectSpelling()`, `stringCount()`
- **Mathematische Funktionen**: `int()`, `sqrt()`, `quersumme()`, `abs()`, `round()`, `speed()`, `pace()`
- **Zeit-Funktionen**: `TCount()`, `TCountIf()`, `TTCount()`, `TSum()`
- **Konvertierungsfunktionen**: Umwandlung zwischen Datentypen
- **Zeit- und Datumsfunktionen**: Datumsberechnungen, Formatierungen
- **Überprüfungsfunktionen**: `inRange()`, `isNumeric()`, `isAlpha()`, `hasChip()`, `ChipFileHas()`, `search()`, `isUCICode()`, `isUCIID()`, `hasEntryFee()`, `isEligible()`, `isValidEmail()`
- **Datensatzübergreifende Funktionen**: `BunchTime()`, `GapTimeTop()`, `GapTimePrev()`, `GapTimeLast()`, `GapTimeNext()`, `TeamGapTimeTop()`, `TeamGapTimePrev()`, `DCount()`, `DCountDistinct()`, `DSum()`, `DMin()`, `DAvg()`, `DMax()`, `DFirst()`, `DLast()`, `DConcat()`, `DQuantile()`, `DFunktion()`
- **Andere Funktionen**: `nz()`, `min()`, `max()`, `first()`, `last()`, `table()`, `Setting()`, `GetSex()`, `translate()`, `Rank()`, `RankMax()`, `Text()`, `ChangeLink()`
- **Auswertungsfunktionen**: Age Graded Funktionen 2015/2020/2025 (`AgeGradedOC()`, `AgeGradedLevel()`, `AgeGradedFactor()`)
- **Übersicht der Funktionen**: kompakte Gesamtübersicht aller Funktionen

---

### [`2186-Benutzerdefinierte-Felder.md`](2186-Benutzerdefinierte-Felder.md)
Benutzerdefinierte Felder: eigene Ausdrücke unter einem Namen in der Veranstaltungsdatei speichern und wiederverwenden (z.B. `AnzeigeName`).

---

### [`2108-Benutzerdefinierte-Funktionen.md`](2108-Benutzerdefinierte-Funktionen.md)
Benutzerdefinierte Funktionen: eigene Funktionen mit Parametern definieren, die überall in der Veranstaltungsdatei verwendet werden können (Beispiel: `RightCase()`-Funktion für Groß-/Kleinschreibung).

---

### [`2109-Filter.md`](2109-Filter.md)
Filter-Syntax: Ausdrücke die `true`/`false` liefern, zur Einschränkung von Datensätzen.
- Feldnamen in `[...]`, Textwerte in `"..."`, Zahlen direkt
- Verwendung von Vergleichen, Bereichen und logischen Operatoren
- Einsatzorte: Listen, Platzierungen, Altersklassen, Wettbewerbe

---

### [`2050-Dynamische-Formatierung.md`](2050-Dynamische-Formatierung.md)
Dynamische Formatierung für Listen und Urkunden: einzelne Datensätze abhängig von Bedingungen unterschiedlich formatieren (Fettschrift, Farbe, etc.).
- Formatierungsausdruck in erweiterten Spalteneinstellungen
- Beispiele für bedingte Formatierung

---

### [`2024-Farben.md`](2024-Farben.md)
Farbdefinitionen für Textelemente auf Listen und Urkunden (inkl. CMYK und RGB).
- **CMYK-Farben**: Definition als `cmyk(C;M;Y;K)` mit Werten 0–100
- **RGB-Farben**: Definition als `rgb(R;G;B)` mit Werten 0–255, sowie Hex-Notation

---

### [`2107-Feld-Auswahl.md`](2107-Feld-Auswahl.md)
Die Feld-Auswahl UI-Komponente: erscheint in Listen-, Platzierungs- und anderen Einstellungen zur einfachen Auswahl von Feldern ohne manuelle Eingabe des Feldnamens.
