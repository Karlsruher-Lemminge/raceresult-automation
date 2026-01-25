# Raceresult Veranstaltung editieren

## Vorbereitung

- nutzer immer die chrome extension
- der Nutzer muss sich auf https://events.raceresult.com/ anmelden
- Frage nach der eventid, falls der Nutzer diese nicht angegeben hat

gehe dann auf:

https://events.raceresult.com/ 

und lasse den Nutzer sich anmelden. Nach Anmeldung gehe auf die Seite des jeweiligen Event:

https://events.raceresult.com/_eventid

behalte dabei aber die get parameter bei die vorher verwendet wurden

stelle immer sicher, das die URL mit https://events.raceresult.com/_eventid/ beginnt. Die eventid darf sich nie ändern.
Breche jegliche Verarbeitung ab, wenn die eventid sich geändert hat

## Allgemein

Für jede Veranstaltung muss vorher festgelegt werden, wann die Anmeldung öffnet <start-anmeldung>.

Bei Veranstaltungen die mit "Intern" beginnen oder "Lemming" ohne Zahl davor handelt es sich um eine interne Veranstaltung.
Interne Veranstaltungen haben:
- keine Startgebühren
- ein Limit auf 50 Teilnehmer im Anmeldeformular
- das <ende-anmeldung> ist entweder am Vortag der Veranstaltung um 18:00 oder auch 7 Tage vor Veranstaltungsdatum

Bei anderen öffentlichen Veranstaltungen ist:
- das <ende-anmeldung> 7 Tage vor dem Veranstaltungsdatum um 23:59:59.

Frage aber auf jeden Fall den Nutzer, ob das Datum so korrekt ist.

Prüfe das <start-anmeldung> vor <ende-anmeldung> liegt und das beide Daten vor dem Veranstaltungsdatum liegen.

Ausserdem muss das Veranstaltungsdatum im aktuellen Jahr liegen.

Datum Ultimo ist 31.12.2100 23:59:59.

Bei aktiv von ist immer Uhrzeit 00:00:00 gesetzt.
Bei "bis" immer die Uhrzeit 23:59:59.

## Menüstruktur

Die Menüstruktur kann mehrfach dieselben Texte enthalten.
Mit ** eingerahmte Texte sind immer die aus dem Hauptmenü.
Stelle immer sicher, das Du dich auch im korrekten Menü befindest.

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

## Aufgabe: Veranstaltung prüfen

Zur Prüfung der Versanstaltung vor der Verwendung zur Anmeldung werden diverse Einstellungen geprüft und dem Nutzer ausgegeben. 
Es finden keine Änderungen an der Veranstaltung statt.

- **Grundeinstellungen**
  - Veranstaltung
    - ermittle unter "Veranstaltungsdatum von" das Datum der Veranstaltung
    - ermittle unter "Veranstaltungsname" den Namen der Veranstaltung
    - ermittle ter Abrechnungsmodus den Modus, sollte echte Veranstaltung sein
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
      - ermitteln welche Listen aktiv sind
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
    - Chip File: ein Chip File sollte vorhanden sein. Öffentliche Veranstaltungen: mindestens 400 Einträge, interne: genau 50 Einträge
- **Teilnehmer**
  - Teilnehmer: keine Einträge vorhanden
- **Finanzen**
  - Gutscheine: keine Einträge vorhanden

Gebe alle geprüften Werte aus. Markiere die wo es inkonsitente Werte gibt.
