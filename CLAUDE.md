# Raceresult Veranstaltung editieren

## Vorbereitung

 * erstelle eine Python Virtualenv in .venv mit Python 3.14
 * installiere das Modul https://github.com/Karlsruher-Lemminge/py-raceresult
 * der API Key ist in .env, falls nicht frage den Nutzer
 * Frage den Nutzer nach der zu bearbeitenden eventid
 * rufe die Basisdaten zur eventid ab → `event.settings.get('EventName', 'EventDate', 'EventLocation')`
 * Frage den Nutzer, ob das das richtig Event ist
 * dann führe die vom Nutzer angefragten Prüfungen oder Änderungen durch

## Tools

Für alle Prüfungen nutze die py-raceresult API. Der API Key liegt in .env mit namen API\_KEY.

Ausgenommen die Werte im my.raceresult.com Menü. Diese müssen mittels Chrome Browser MCP geprüft werden.
Dazu muss sich der Nutzer auf https://events.raceresult.com/ anmelden.
Stelle im Chrome Browser immer sicher, das die URL mit https://events.raceresult.com/_<eventid> anfängt.
Breche die Verarbeitung ab, falls das nicht mehr der Fall ist

Für Startnummern Neuvergabe nutze den Skill py-raceresult-bib-assignment

## py-raceresult API Beispiel Code

Siehe API_USAGE.md

## Raceresult Felder, Ausdrücke und Funktionen

Wenn du Feldnamen, Funktionen, Filterausdrücke, Operatoren oder Formatierungsangaben für Raceresult benötigst oder prüfen möchtest, nutze die Dokumentation in `raceresult-kb/`.

Die Übersicht aller verfügbaren Dateien und deren Inhalte findest du in:

**`raceresult-kb/INDEX.md`**

Dort ist beschrieben welche Datei welche Felder, Funktionen und Konzepte dokumentiert (z.B. Feldnamen für Zeitfelder → `7174-Felder.md`, String-Funktionen → `2057-Funktionen.md`, Filter-Syntax → `2109-Filter.md`).

## Allgemein

Für jede Veranstaltung muss vorher festgelegt werden, wann die Anmeldung öffnet <start-anmeldung>.

Für Details zu verschiedenen Wettkämpfen schaue in die Datei RACES.md. Dort sind Definitionen zu verschiedenen Veranstaltungen definiert.

Frage aber auf jeden Fall den Nutzer, ob das Datum der Veranstaltung so korrekt ist.

Prüfe das <start-anmeldung> vor <ende-anmeldung> liegt und das beide Daten vor dem Veranstaltungsdatum liegen.

Ausserdem muss das Veranstaltungsdatum im aktuellen oder kommenden Jahr liegen.

Datum Ultimo ist 31.12.2100 23:59:59.

Bei aktiv von ist immer Uhrzeit 00:00:00 gesetzt.

Bei "bis" immer die Uhrzeit 23:59:59. Alternativ auch der Folgetag mit 00:00:00 Uhr.

## Variablen

Raceresult Variablen sind in [] eingeschlossen. 

Veranstaltungsname: [Veranstaltung]
Veranstaltungs Jahr: [Veranstaltung.Jahr]
Veranstaltungsdatum: [Veranstaltung.Datum]

## Aufgabe: kopierte Veranstaltung aus dem Vorjahr editieren und anpassen

- **Grundeinstellungen**
  - Veranstaltung
    - ermittle unter "Veranstaltungsdatum von" das Datum der Veranstaltung → `event.settings.get_value('EventDate')` (Format: YYYY-MM-DD)
    - ermittle unter "Veranstaltungsname" den Namen der Veranstaltung → `event.settings.get_value('EventName')`
    - setze unter Abrechnungsmodus das auf Test-Veranstaltung → `event.settings.save_value('PaymentMode', 'Test')`
  - Altersklassen: nutzer am Ende warnen wenn Altersklassen angegeben nach Geburtsdatum → `event.agegroups.get()` → prüfe ob `AgeGroup.date_start` / `AgeGroup.date_end` tagsgenaue Grenzen enthält (dann = Geburtsdatum) statt jahrsgenaue 01.01.–31.12. (dann = Geburtsjahr)
- **Finanzen**
  - Startgeld
    - wenn es altersabängige Startgelder gibt, dann passe diese so an, das das Geburtsjahr stimmt → `event.entryfees.get()` → prüfe `EntryFee.date_start` / `EntryFee.date_end`, speichern mit `event.entryfees.save([...])`
- **Anmelde-Formulare**
  - gehe unter Anmelde-Formulare jedes Formular durch und ändere folgendes: → `event.registrations.names()`, dann pro Formular `event.registrations.get(name)`
    - Allgemeine-Einstellungen
      - Aktiv von: <start-anmeldung> → `Registration.enabled_from`; speichern mit `event.registrations.save(registration)`
      - bis: <ende-anmeldung> → `Registration.enabled_to`
    - Bestätigungsseite
      - Prüfe den Text, ob dort der Veranstaltungsname, das Datum oder das Veranstaltungsjahr vorhanden sind und aktualisiere diese. → `Registration.confirmation.expression`
        Idealerweise sollte ein Vorkommen durch Variablen ersetzt werden.
    - Änderungsformulare benötigen kein gesetztes "Aktiv von". Dies kann entfernt werden. → erkennbar an `Registration.change_identity_field != ''`; `Registration.enabled_from = None` setzen und speichern
  - Allgemeine Payment-Einstellungen
    - Zahlungsmittel-Einstellungen
      - SEPA-Basislastschrift (EUR)
        Lastschriften nicht vor diesem Datum einziehen prüfen, ob gesetzt und dem Nutzer gegen Ende mitteilen → **Browser (Chrome MCP)**
- **my.raceresult.com**
  - my.raceresult.com aktivieren → **Browser (Chrome MCP)**
    - "Veranstaltung im my.raceresult.com Portal anzeigen" aktiv
    - "Veranstaltung im Veranstaltungskalender anzeigen" aktiv bei öffentlichen Veranstaltungen, inaktiv bei internen
  - Tab "Anmeldung" aktivieren von Jahresanfang bis Tag Anmeldeschluss → **Browser (Chrome MCP)**
  - Tab "Teilnehmer" → **Browser (Chrome MCP)**
    - Seite aktiv von: eine Woche vor Veranstaltung
    - bis: öffentliche Veranstaltungen ultimo, interne Veranstaltungen: eine Woche nach Veranstaltung
    - Listen Veröffentlichen:
      - Teilnehmerliste mit Startzeit sollten alle inaktiv sein → **Browser (Chrome MCP)** (Listennamen vorher ermitteln via `event.lists.names()`)
  - Tab "Live" → **Browser (Chrome MCP)**
    - Seite aktiv von: Veranstaltungstag
    - bis: Veranstaltungstag
  - Tab "Ergebnisse" → **Browser (Chrome MCP)**
    - Seite aktiv von: Veranstaltungstag
    - bis: ultimo bei öffentlichen Veranstaltungen, drei Wochen nach Wettkampf bei internen
- **Emails/SMS**
  - gehe alle E-Mail und SMS Templates durch. Prüfe ob der Veranstaltungsname, das Jahr oder das Datum hier gesetzt sind. Ersetze gegen Variable. → `event.email_templates.names()`, dann `event.email_templates.get(name)` → prüfe `EmailTemplate.subject` und `EmailTemplate.text`; speichern mit `event.email_templates.save(template)`

Warte mit folgenden Punkte, bis der Nutzer bestätigt hat, das diese durchgeführt werden sollen und fragen in jedem Fall nach:

- **Teilnehmer**
  - Löschen
    - Teilnehmer löschen: Klicke auf den Button "N Teilnehmer löschen" und merke Dir den Wert von N → `N = await event.data.count()`, dann `event.participants.delete(filter_expr='')`
    - History-Daten löschen: klicke auf "N History-Einträge" löschen und merke Dir den Wert von N → `N = await event.history.count(Identifier.by_filter(''))`, dann `event.history.delete(Identifier.by_filter(''))`
    - Zeiten löschen: klicke auf "N Zeiten löschen" und merke Dir den Wert von N → `N = await event.times.count(Identifier.by_filter(''))`, dann `event.times.delete(Identifier.by_filter(''))`
    - Timing-Rohdaten löschen: klicke auf "N Rohdaten löschen" und merke Dir den Wert von N → `N = await event.rawdata.count(Identifier.by_filter(''))`, dann `event.rawdata.delete(Identifier.by_filter(''))`
    - Bankinformationen löschen: klicke auf "Für N Teilnehmer Bankinformationen löschen" und merke Dir den Wert von N → `N = await event.data.count()`, dann `event.participants.clear_bank_information(filter_expr='')`
- **Finanzen**
  - Gutschein: klicke auf Alle Einträge löschen → `vouchers = await event.vouchers.get(); N = len(vouchers)`, dann `event.vouchers.delete([v.id for v in vouchers])`

Reporte danach die einzelnen gelöschten Daten und die jeweilige Zahl N der gelöschten Daten.

## Aufgabe: Veranstaltung prüfen

Zur Prüfung der Versanstaltung vor der Verwendung zur Anmeldung werden diverse Einstellungen geprüft und dem Nutzer ausgegeben. 
Es finden keine Änderungen an der Veranstaltung statt.

- **Grundeinstellungen**
  - Veranstaltung
    - ermittle unter "Veranstaltungsdatum von" das Datum der Veranstaltung → `event.settings.get_value('EventDate')`
    - ermittle unter "Veranstaltungsname" den Namen der Veranstaltung → `event.settings.get_value('EventName')`
    - ermittle ter Abrechnungsmodus den Modus, sollte echte Veranstaltung sein. Das entspricht einem leeren Wert → `event.settings.get_value('PaymentMode')` (leer = echte Veranstaltung)
  - Altersklassen: ermittle ob nach Geburtsjahr oder Geburtsdatum → `event.agegroups.get()` → jahrsgenaue Grenzen (01.01.–31.12.) = Geburtsjahr, tagsgenaue Grenzen = Geburtsdatum; Modell: `AgeGroup.date_start` / `AgeGroup.date_end`
- **Finanzen**
  - Startgeld
    - wenn es altersabängige Startgelder gibt, dann prüfe ob der Bereich für Geboren von bis auch dazu passt → `event.entryfees.get()` → prüfe `EntryFee.date_start` / `EntryFee.date_end`
- **Anmelde-Formulare**
  - gehe unter Anmelde-Formulare jedes Formular durch → `event.registrations.names()`, dann `event.registrations.get(name)`
    - ermittle Aktiv von und bis → `Registration.enabled_from`, `Registration.enabled_to`
  - Bestätigungsseite
    - prüfe den Text, ob alle Referenzen auf das Datum der Versanstaltung korrekt sind bzw. das aktuelle Jahr genannt wird → `Registration.confirmation.expression`
  - Allgemeine Payment-Einstellungen
    - Zahlungsmittel-Einstellungen
      - SEPA-Basislastschrift (EUR)
        Lastschriften nicht vor diesem Datum einziehen: Datum ermitteln falls gesetzt → **Browser (Chrome MCP)**
- **my.raceresult.com**
  - my.raceresult.com Status → **Browser (Chrome MCP)**
    - "Veranstaltung im my.raceresult.com Portal anzeigen" ermitteln, sollte aktiv sein
    - "Veranstaltung im Veranstaltungskalender anzeigen" aktiv/inaktiv prüfen
      - bei öffentlichen Veranstaltungen aktiv
      - bei internen Veranstaltungen inaktiv
  - Seite "Anmeldung" → **Browser (Chrome MCP)**
    - Seite Aktiv von: ermitteln
    - bis: ermitteln
  - Seite "Teilnehmer" → **Browser (Chrome MCP)**
    - Seite aktiv von: ermitteln
    - bis: ermitteln
    - Listen Veröffentlichen:
      - ermitteln welche Listen aktiv sind. falls definitionen im RACES.md vorhanden sind, prüfe die dort erwähnten zu veröffentlichenden Listen → Listennamen ermitteln via `event.lists.names()`; Veröffentlichungsstatus nur über **Browser (Chrome MCP)**
  - Seite "Live" → **Browser (Chrome MCP)**
    - Seite aktiv von: ermitteln
    - bis: ermitteln
  - Seite "Ergebnisse" → **Browser (Chrome MCP)**
    - Seite aktiv von: ermitteln
    - bis: ermitteln
- **Emails/SMS**
  - gehe alle E-Mail und SMS Templates durch, prüfe: → `event.email_templates.names()`, dann `event.email_templates.get(name)`
    - Veranstaltungsjahr → in `EmailTemplate.subject` und `EmailTemplate.text`
    - Veranstaltungsname → in `EmailTemplate.subject` und `EmailTemplate.text`
    - Veranstaltungsdatum → in `EmailTemplate.subject` und `EmailTemplate.text`
- **Timing**
  - Einstellungen
    - Chip File: sollte den Informationen in RACES.md entsprechen → `event.chipfile.get()` → Anzahl: `len(entries)`, Inhalt: `ChipFileEntry.transponder` / `ChipFileEntry.identification`
- **Teilnehmer**
  - Teilnehmer: keine Einträge vorhanden → `await event.data.count()` muss 0 sein
- **Finanzen**
  - Gutscheine: keine Einträge vorhanden → `vouchers = await event.vouchers.get()` → `len(vouchers)` muss 0 sein

Gebe alle geprüften Werte aus. Markiere die wo es inkonsitente Werte gibt.
