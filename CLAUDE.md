# Raceresult Veranstaltung editieren

## Vorbereitung

 * erstelle eine Python Virtualenv in .venv mit Python 3.14
 * installiere das Modul https://github.com/Karlsruher-Lemminge/py-raceresult
 * der API Key ist in .env, falls nicht frage den Nutzer
 * Frage den Nutzer nach der zu bearbeitenden eventid
 * rufe die Basisdaten zur eventid ab
 * Frage den Nutzer, ob das das richtig Event ist
 * dann führe die vom Nutzer angefragten Prüfungen oder Änderungen durch

## Tools

Für alle Prüfungen nutze die py-raceresult API. Der API Key liegt in .env mit namen API_KEY.

Ausgenommen die Werte im my.raceresult.com Menü. Diese müssen mittels Chrome Browser MCP geprüft werden.
Dazu muss sich der Nutzer auf https://events.raceresult.com/ anmelden.
Stelle im Chrome Browser immer sicher, das die URL mit https://events.raceresult.com/_<eventid> anfängt.
Breche die Verarbeitung ab, falls das nicht mehr der Fall ist

## Allgemein

Für jede Veranstaltung muss vorher festgelegt werden, wann die Anmeldung öffnet <start-anmeldung>.

Für Details zu verschiedenen Wettkämpfen schaue in die Datei RACES.md. Dort sind Definitionen zu verschiedenen Veranstaltungen definiert.

Frage aber auf jeden Fall den Nutzer, ob das Datum der Veranstaltung so korrekt ist.

Prüfe das <start-anmeldung> vor <ende-anmeldung> liegt und das beide Daten vor dem Veranstaltungsdatum liegen.

Ausserdem muss das Veranstaltungsdatum im aktuellen oder kommenden Jahr liegen.

Datum Ultimo ist 31.12.2100 23:59:59.

Bei aktiv von ist immer Uhrzeit 00:00:00 gesetzt.

Bei "bis" immer die Uhrzeit 23:59:59.

## Variablen

Raceresult Variablen sind in [] eingeschlossen. 

Veranstaltungsname: [Veranstaltung]
Veranstaltungs Jahr: [Veranstaltung.Jahr]
Veranstaltungsdatum: [Veranstaltung.Datum]

## Aufgabe: kopierte Veranstaltung aus dem Vorjahr editieren und anpassen

- **Grundeinstellungen**
  - Veranstaltung
    - ermittle unter "Veranstaltungsdatum von" das Datum der Veranstaltung
    - ermittle unter "Veranstaltungsname" den Namen der Veranstaltung
    - setze unter Abrechnungsmodus das auf Test-Veranstaltung
  - Altersklassen: nutzer am Ende warnen wenn Altersklassen angegeben nach Geburtsdatum
- **Anmelde-Formulare**
  - gehe unter Anmelde-Formulare jedes Formular durch und ändere folgendes:
    - Allgemeine-Einstellungen
      - Aktiv von: <start-anmeldung>
      - bis: <ende-anmeldung>
    - Bestätigungsseite
      - Prüfe den Text, ob dort der Veranstaltungsname, das Datum oder das Veranstaltungsjahr vorhanden sind und aktualisiere diese.
        Idealerweise sollte ein Vorkommen durch Variablen ersetzt werden.
    - Änderungsformulare benötigen kein gesetztes "Aktiv von". Dies kann entfernt werden.
  - Allgemeine Payment-Einstellungen
    - Zahlungsmittel-Einstellungen
      - SEPA-Basislastschrift (EUR)
        Lastschriften nicht vor diesem Datum einziehen prüfen, ob gesetzt und dem Nutzer gegen Ende mitteilen
- **my.raceresult.com**
  - my.raceresult.com aktivieren
    - "Veranstaltung im my.raceresult.com Portal anzeigen" aktiv
    - "Veranstaltung im Veranstaltungskalender anzeigen" aktiv bei öffentlichen Veranstaltungen, inaktiv bei internen
  - Seite "Anmeldung" aktivieren von Jahresanfang bis Jahresende des Veranstaltungsjahres
  - Seite "Teilnehmer"
    - Seite aktiv von: eine Woche vor Veranstaltung
    - bis: öffentliche Veranstaltungen ultimo, interne Veranstaltungen: eine Woche nach Veranstaltung
    - Listen Veröffentlichen:
      - Teilnehmerliste mit Startzeit sollten alle inaktiv sein
  - Seite "Live"
    - Seite aktiv von: Veranstaltungstag
    - bis: Veranstaltungstag
  - Seite "Ergebnisse"
    - Seite aktiv von: Veranstaltungstag
    - bis: ultimo bei öffentlichen Veranstaltungen, drei Wochen nach Wettkampf bei internen
- **Emails/SMS**
  - gehe alle E-Mail und SMS Templates durch. Prüfe ob der Veranstaltungsname, das Jahr oder das Datum hier gesetzt sind. Ersetze gegen Variable.

Warte mit folgenden Punkte, bis der Nutzer bestätigt hat, das diese durchgeführt werden sollen und fragen in jedem Fall nach:

- **Teilnehmer**
  - Löschen
    - Teilnehmer löschen: Klicke auf den Button "N Teilnehmer löschen" und merke Dir den Wert von N
    - History-Daten löschen: klicke auf "N History-Einträge" löschen und merke Dir den Wert von N
    - Zeiten löschen: klicke auf "N Zeiten löschen" und merke Dir den Wert von N
    - Timing-Rohdaten löschen: klicke auf "N Rohdaten löschen" und merke Dir den Wert von N
    - Bankinformationen löschen: klicke auf "Für N Teilnehmer Bankinformationen löschen" und merke Dir den Wert von N
- **Finanzen**
  - Gutschein: klicke auf Alle Einträge löschen

Reporte danach die einzelnen gelöschten Daten und die jeweilige Zahl N der gelöschten Daten.

## Aufgabe: Veranstaltung prüfen

Zur Prüfung der Versanstaltung vor der Verwendung zur Anmeldung werden diverse Einstellungen geprüft und dem Nutzer ausgegeben. 
Es finden keine Änderungen an der Veranstaltung statt.

- **Grundeinstellungen**
  - Veranstaltung
    - ermittle unter "Veranstaltungsdatum von" das Datum der Veranstaltung
    - ermittle unter "Veranstaltungsname" den Namen der Veranstaltung
    - ermittle ter Abrechnungsmodus den Modus, sollte echte Veranstaltung sein. Das entspricht einem leeren Wert
  - Altersklassen: ermittle ob nach Geburtsjahr oder Geburtsdatum
- **Anmelde-Formulare**
  - gehe unter Anmelde-Formulare jedes Formular durch
    - ermittle Aktiv von und bis
  - Bestätigungsseite
    - prüfe den Text, ob alle Referenzen auf das Datum der Versanstaltung korrekt sind bzw. das aktuelle Jahr genannt wird
  - Allgemeine Payment-Einstellungen
    - Zahlungsmittel-Einstellungen
      - SEPA-Basislastschrift (EUR)
        Lastschriften nicht vor diesem Datum einziehen: Datum ermitteln falls gesetzt
- **my.raceresult.com**
  - my.raceresult.com Status
    - "Veranstaltung im my.raceresult.com Portal anzeigen" ermitteln, sollte aktiv sein
    - "Veranstaltung im Veranstaltungskalender anzeigen" aktiv/inaktiv prüfen
      - bei öffentlichen Veranstaltungen aktiv
      - bei internen Veranstaltungen inaktiv
  - Seite "Anmeldung"
    - Seite Aktiv von: ermitteln
    - bis: ermitteln
  - Seite "Teilnehmer"
    - Seite aktiv von: ermitteln
    - bis: ermitteln
    - Listen Veröffentlichen:
      - ermitteln welche Listen aktiv sind. falls definitionen im RACES.md vorhanden sind, prüfe die dort erwähnten zu veröffentlichenden Listen
  - Seite "Live"
    - Seite aktiv von: ermitteln
    - bis: ermitteln
  - Seite "Ergebnisse"
    - Seite aktiv von: ermitteln
    - bis: ermitteln
- **Emails/SMS**
  - gehe alle E-Mail und SMS Templates durch, prüfe:
    - Veranstaltungsjahr
    - Veranstaltungsname
    - Veranstaltungsdatum
- **Timing**
  - Einstellungen
    - Chip File: sollte den Informationen in RACES.md entsprechen
- **Teilnehmer**
  - Teilnehmer: keine Einträge vorhanden
- **Finanzen**
  - Gutscheine: keine Einträge vorhanden

Gebe alle geprüften Werte aus. Markiere die wo es inkonsitente Werte gibt.
