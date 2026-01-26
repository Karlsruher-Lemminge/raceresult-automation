# Raceresult Automation Skill

Ein Claude Code Skill zur Automatisierung von Verwaltungsaufgaben im Raceresult 14 Webfrontend.

## Überblick

Dieser Skill unterstützt bei der Bearbeitung und Validierung von Sportveranstaltungen auf [events.raceresult.com](https://events.raceresult.com/). Er automatisiert wiederkehrende Aufgaben wie das Anpassen kopierter Vorjahresveranstaltungen und die Prüfung vor Freischaltung der Anmeldung.

## Voraussetzungen

- **Chrome Extension**: Der Skill nutzt die Playwright Chrome Extension für Browser-Automatisierung
- **Anmeldung**: Gültiger Account auf events.raceresult.com
- **Event-ID**: Die numerische ID der zu bearbeitenden Veranstaltung

## Hauptfunktionen

### 1. Kopierte Veranstaltung editieren

Passt eine aus dem Vorjahr kopierte Veranstaltung an:

- **Grundeinstellungen**: Veranstaltungsdatum/-name ermitteln, Testmodus setzen
- **Anmelde-Formulare**: Aktivierungszeiträume setzen, Bestätigungstexte prüfen
- **Payment-Einstellungen**: SEPA-Lastschriftdatum prüfen
- **my.raceresult.com**: Portal- und Kalendereinstellungen, Seitenaktivierungen
- **E-Mail/SMS Templates**: Jahreszahlen und Datumsangaben aktualisieren
- **Daten löschen**: Teilnehmer, History, Zeiten, Rohdaten, Gutscheine (nach Bestätigung)

### 2. Veranstaltung prüfen

Validiert eine Veranstaltung ohne Änderungen vorzunehmen:

- Prüft alle Datumseinstellungen auf Konsistenz
- Kontrolliert Aktivierungszeiträume der Formulare und Seiten
- Verifiziert E-Mail/SMS Templates auf korrekte Jahresangaben
- Prüft ob Teilnehmer/Gutscheine vorhanden sind (sollten leer sein)
- Gibt einen vollständigen Prüfbericht aus

## Konventionen

### Datumsformate

| Feldtyp | Uhrzeit |
|---------|---------|
| "Aktiv von" | 00:00:00 |
| "bis" | 23:59:59 |
| Ultimo | 31.12.2100 23:59:59 |

### Variablen

Raceresult-Variablen werden in eckigen Klammern verwendet:

- `[Veranstaltung]` - Veranstaltungsname
- `[Veranstaltung.Jahr]` - Veranstaltungsjahr
- `[Veranstaltung.Datum]` - Veranstaltungsdatum

### Validierungsregeln

- Start-Anmeldung muss vor Ende-Anmeldung liegen
- Beide Anmeldedaten müssen vor dem Veranstaltungsdatum liegen
- Veranstaltungsdatum muss im aktuellen oder kommenden Jahr liegen

## Verwendung

1. Auf events.raceresult.com anmelden
2. Event-ID der Veranstaltung angeben
3. Gewünschte Aufgabe auswählen:
   - "Veranstaltung editieren" für kopierte Vorjahresveranstaltungen
   - "Veranstaltung prüfen" für Validierung vor Freischaltung

## Hinweise

- Der Skill navigiert durch die Menüstruktur des Raceresult-Backends
- Bei mehrdeutigen Menüpunkten wird das Hauptmenü (mit ** markiert) priorisiert
- Destruktive Aktionen (Löschen) erfordern explizite Nutzerbestätigung
- Die Event-ID wird während der gesamten Session überwacht und darf sich nicht ändern
