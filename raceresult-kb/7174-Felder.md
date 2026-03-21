# Felder #

**Felder** können in Datenfelder, in denen Daten wie Nachname oder Verein gespeichert werden, und Felder, die aus anderen Daten wie Platzierungen berechnet werden, unterteilt werden.

Felder können entweder direkt in Listen oder Urkunden angezeigt werden, oder in [[@1056|Ausdrücken]] verwendet werden. Sie können einfach über die [[@1107|Feld-Auswahl]] ausgewählt werden.

Einige Felder verwenden die sog. Punkt-Logik. Bei der Punkt-Logik wird für Felder, die im gleichen Kontext stehen, das gleiche Präfix verwendet. Untergeordnete Parameter können dann getrennt durch einen Punkt angehängt werden. *Wettbewerb* verfügt bspw. über viele verschiedene Parameter, die angehängt werden können, z.B. *Wettbewerb.Name* oder *Wettbewerb.Länge*.

---

## Datenfelder der Teilnehmer ##

Die Datenfelder der Teilnehmer beziehen sich jeweils auf einen eindeutigen Teilnehmerdatensatz.

Den Inhalt der folgenden Datenfelder können Sie für jeden Teilnehmer eingeben oder importieren:

**Feld****Typ**StartnrintNachnamestring (100)
Vornamestring (100)
Titelstring (15)
Jahrgangint
GeburtstagdateGeschlechtstring (2)
Nationstring (50)
WettbewerbintVereinstring (100)
Lizenzstring (25)
StatusintKommentarstring (*)
Transponder1string (40)
Transponder2string (40)
RegNrint
Straßestring (100)
PLZstring (10)
Ortstring (50)
Bundeslandstring (3)
Landstring (50)
Mailstring (100)
Telefonstring (50)
Handystring (255)
Kontoinhaber*string (70)
KTN*string (12)
BLZ*string (12)
Bank*string (50)
IBAN*string (36)
BIC*string (11)
SEPAMandat*string (35)

*Nur bei eigener Abwicklung der Startgelder oder wenn die Felder in den Formular-Feldern abgefragt werden.

Die folgenden Felder werden automatisch vom System generiert:

**Feld****Type**IDint
Gutscheinstring (20)
ErstelltdateErstelltVonstring (25)
GeändertdateSammelAnmPos
intGroupIDint

---

### ID Feld ###

**ID** wird automatisch mit einer eindeutigen Nummer beschrieben, wenn der Datensatz angelegt wird. Das Feld kann nicht geändert werden.


---

### Status Feld ###

**Status** enthält eine Zahl, die für den Status des Teilnehmers steht:

* 0: Regulär
* 1: a.K. (außer Konkurrenz)
* 2: DSQ (disqualifiziert)
* 3: DNF (nicht gefinisht)
* 4: DNS (nicht gestartet)
* 5: n.a. (nicht angetreten)

Um die Statusbeschreibung anzuzeigen, können Sie das [[@2769|abgeleitete Feld]] **StatusText** nutzen.

Wenn Sie abweichende Statusbeschreibungen benötigen, können Sie hierfür ein benutzerdef. Feld oder Funktion anlegen, oder bearbeiten Sie die existierende MitStatus(x)-Funktion.

Beachten Sie, dass es je Teilnehmer nur ein Statusfeld gibt. Benötigen Sie mehrere Statusfelder (z.B. für eine Mannschaftswertung oder ein Etappenrennen), legen Sie hierfür Zusätzliche Textfelder an.

---

### Sprache ###

Das Feld *Sprache* wird genutzt, um zu ermitteln in welcher Sprache eine Email-Vorlage versendet werden soll, wenn über die Software RACE RESULT 12 eine mehrsprachige Email-Vorlage verschickt wird [[@1123|Email senden]].

Das *Sprache *Feld wird automatisch mit der Sprache gefüllt, welche ein Teilnehmer bei der [[@1133|Online-Anmeldung]] verwendet. Das Feld kann auch per Teilnehmerimport gefüllt oder über die Datenmanipulation angepasst werden.

Das standard *Sprache* Feld besitzt eine höhere Priorität gegenüber anderen Zusatzfeldern mit gleichem Namen (inklusive übersetzter Versionen).

---

### Zusatzfelder ###

Mit den **Zusatzfeldern** können Sie die Datenstruktur Ihrer Veranstaltung anpassen und eine beliebige Anzahl Felder anlegen, um weitere Teilnehmerdaten abzufragen. Die Zusatzfelder können entweder einen vordefinierten oder frei wählbaren Text beinhalten, wie z.B. ein Notfallkontakt oder eine T-Shirt-Größe, oder als Checkbox, die entweder 1 oder 0 (Haken gesetzt / Haken nicht gesetzt) für Ja/Nein speichert, verwendet werden.

Zusatzfelder können in der Ausgabe und Urkunden über den Feldnamen, den Sie definieren, abgerufen werden.

Löschen Sie ein Zusatzfeld werden sämtliche mit diesem Feld assoziierten Daten ebenfalls gelöscht.

## Typ ##

Der Typ bestimmt, wie Daten im Teilnehmerfenster und der Online-/Vor-Ort-Anmeldung erfasst werden. Einige Typen aktivieren weitere Eingabemasken wie die Auswahlwerte oder den Placeholder.

* Textfeld - freies Texteingabefeld
* DropDown - erstellt ein Dropdown mit den von Ihnen eingegebenen Auswahlwerten
* Checkbox - eine Checkbox, die gesetzt werden kann, liefert 1 (Haken gesetzt) oder 0 (Haken nicht gesetzt).
* Zahl (Ganzzahl) - Nur ganzzahlige Zahlen werden akzeptiert. Dezimalwerte werden abgeschnitten, Werte werden als Zahl ausgegeben.
* Zahl (Dezimal) - Jeder numerischer Wert wird akzeptiert, Werte werden als Zahl ausgegeben.
* Währung - Jeder numerische Wert wird akzeptiert. Werte werden auf 2 Dezimalstellen gerundet und mit der Veranstaltungswährung ausgegeben.

## Name ##

Der Name wird zur eindeutigen Kennung des Feldes in der Veranstaltungsdatei genutzt. Wählen Sie einen kurzen und präzisen Namen.

Im Namen können Sie ausschließlich Buchstaben und Ziffern verwenden, keine Leer- oder Sonderzeichen. Der Name ist ausschließlich intern und kann vom Teilnehmer nicht eingesehen werden. Außerdem ist der Name immer der selbe, unabhängig von der gewählten Sprache.

## Bezeichnung ##

In der Bezeichnung können Sie das Feld beschreiben. Die Bezeichnung wird im Teilnehmerfenster verwendet und standardmäßig in der Online-/Vor-Ort-Anmeldung. Sie kann Leer- und Sonderzeichen enthalten und für mehrsprachige Veranstaltungsdateien auch mehrsprachig angelegt werden.

## Auswahlwerte (mit Semikolon trennen) ##

Diese Option wird durch den Typ DropDown aktiviert. Geben Sie sämtliche Auswahlwerte durch Semikolon getrennt ein. Wenn die Standardauswahl <leer> sein soll, beginnen Sie mit einem Semikolon. Die Auswahl ";Rot;Grün;Blau" gibt 4 Möglichkeiten - <leer>, Rot, Grün, Blau.

Für mehrsprachige Auswahlwerte setzen Sie eine geschwungene Klammer um einen Wert, geben jeweils das Sprachkürzel an und trennen die Sprachen durch einen vertikalen Strich. Weitere Informationen zu mehrsprachigen Anmeldungen finden Sie [[@14363|hier]].

## Weitere Feld-Details ##

Um weitere Details zu einem Feld anzugeben, klicken Sie den Button rechts, wodurch sich ein Pop-Up mit den folgenden Einstellungen öffnet:

* Aktiviert: Standardmäßig ist ein Feld aktiviert. Nur aktivierte Felder werden im Teilnehmerfenster angezeigt und können in der Online-Anmeldung eingebunden werden.
* Pflichtfeld: Bestimmen Sie, ob ein Feld ein Pflichtfeld ist und somit nicht leer / Haken nicht gesetzt sein darf. Die Einstellung im Hauptfenster bezieht sich dabei nur auf Daten, die im Teilnehmerfenster eingegeben werden, betrifft aber nicht die Online-Anmeldung.
* Standardwert: Geben Sie einen Standardwert für Textfelder an, wählen für ein DropDown-Feld einen der angegebenen Auswahlwerte oder setzen den Haken für eine Checkbox. Diese Einstellung wirkt sich auch auf die Online-Anmeldung aus und der Standardwert wird dort gesetzt.
* Placeholder: Der Placeholder ist nur für Textfelder aktiviert. Zeigen Sie in grau eine Beschreibung des anzugebenden Textes an. Gibt der Teilnehmer keinen Text ein, bleibt das Feld im Datensatz leer.

## Struktur der Zusatzfelder ##

Zusatzfelder können in verschiedenen Gruppen mit einer eigenen Gruppenüberschrift angelegt werden. Wenn Sie eine neue Gruppe erstellen, vergeben Sie einen aussagekräftigen Namen. Jede Gruppe wird als eigener Kasten im Teilnehmerfenster dargestellt.

Zusatzfelder können per Drag & Drop sortiert werden und auch kategorienübergreifend verschoben werden. Drag & Drop wird ermöglicht, wenn Sie mit der Maus links neben das Typ-Auswahlfeld fahren.

---

### Felder der Teilnehmererstellung ###

RACE RESULT 14 versieht **[****Erstellt]** automatisch mit dem Zeitstempel, wann der Datensatz angelegt wurde. **[****Geändert]** zeigt den Zeitpunkt der letzten Änderung. Die Felder werden im [[@3082|Datumsformat der Veranstaltung]] formatiert. Wenn Sie sie in einem anderen Format darstellen möchten, nutzen Sie die [[@1082|date()]] Funktion. 

**ErstelltVon** wird automatisch auf den Benutzernamen gesetzt, der den Datensatz erstellt hat. Wenn der Datensatz über eine Online-Anmeldung erstellt wurde, wird es auf "OnlineReg / 1" gesetzt.
 Das Feld **[Online]** gibt 1 zurück, wenn sich der Teilnehmer online registriert hat, ansonsten 0. Diese Werte werden auch in der oberen rechten Ecke des Teilnehmerfensters angezeigt.

**[SammelAnmPos] **speichert die Position jedes Teilnehmers innerhalb einer Sammelanmeldung. **[GroupID]** ist eine eindeutige ID, die je Anmeldung gespeichert wird, d.h. bei Sammelanmeldungen ist die GroupID für die Teilnehmer gleich. Bei Einzelanmeldungen wird jeweils eine eigene GroupID vergeben.

Mit der [[@1031|Datenmanipulation]] können Sie diese Werte theoretisch überschreiben.

---

### Jahrgang und Geburtstag ###

In die Felder *Jahrgang* und *Geburtstag *im Teilnehmerfenster können Sie sowohl ein Geburtsjahr, ein Geburtstag oder auch ein Alter (wenn Sie die entsprechende Einstellung unter *Hauptfenster > Teilnehmereingabe > Allgemeines* gesetzt haben) angeben.

Wenn Sie *Jahrgang* ändern (durch Eingabe oder Import), wird *Geburtstag* automatisch auf 01.01.*Jahrgang* gesetzt. Wenn Sie ein Alter angeben, wird das Geburtsjahr automatisch ausgehend vom Veranstaltungsdatum berechnet und der Geburtstag wird auf den Veranstaltungstag definiert.

Importieren Sie Geburtsdaten aus Excel, stellen Sie sicher, dass immer nur eines der Felder Jahrgang, Geburtstag & Alter einen Wert besitzt.

*Geburtstag* wird im [[@3082|Datumsformat der Veranstaltung]] formatiert. Wenn Sie es in einem anderen Format darstellen möchten, nutzen Sie die [[@1082|date()]] Funktion.

---

## Abgeleitete Felder ##

**Abgeleitete Felder** können wie herkömmliche Datenfelder verwendet werden, sind allerdings von anderen Datenfelder des Teilnehmers abgeleitet und können nicht geändert werden.


Alter
Abgeleitet von Geburts- und Veranstaltungsdatum
AlterAm31DezAlter des Teilnehmers am 31. Dezember des Veranstaltungsjahres
Jahrgang2
Zweistelliger Jahrgang (z.B. 83), abgeleitet vom Geburtsdatum
NachVorname
Vereint Nach- und Vorname zu bspw. *Doe, John*
VorNachnameVereint Vor- und Nachname zu bspw. *John Doe*
KTNXWie KTN, aber mit den letzten 3 Ziffern ersetzt durch XIBANXWie IBAN, aber mit den letzten 3 Ziffern ersetzt durch X
StatusTextGibt die Beschreibung des Status gemäß des Feld Status wieder (DSQ, DNF, etc.)ZufallGibt einen zufälligen Wert zwischen 0 und 1 zurückTransponderInChipFileSofern vorhanden gibt dieses Feld den Transponder Code zurück, der im Chip File zugeordnet wird

---

### Die Felder Land und Nation  ###

Land
Land, in dem der Teilnehmer wohnt (Adresse)
NationNationalität des Teilnehmers (Grunddaten)

**Land** und **Nation** sind zwei [[@2757|Felder]] mit speziellen Eigenschaften. Sie sind von Natur aus reine Datenfelder und können mit beliebigen Werten beschrieben werden, z.B. DEU, Schweiz, AT, USA, Germany, etc.

*Land* und *Nation* verwenden die Punkt-Logik. Folgende Suffixe können hierbei verwendet werden:

Land.Name
 Nation.Name
 Länderbezeichnung in Muttersprache (z.B. Deutschland, France)
 .lang
 .lang
Länderbezeichnung in der angegebenen Sprache. Z.B. *Land.Name.en* liefert den englischen Ländernamen.Land.IntName
 Nation.IntNameEnglische Länderbezeichnung (z.B. Germany, Austria) - analog zu *Land/Nation.Name.en*Land.MultiName

Nation.MultiName
Liefert einen mehrsprachigen String, der an verschiedenen Stellen in den entsprechenden Sprachen angezeigt werden kann, z.B. in Ergebnislisten, um Nationalitäten in der Sprache des Anwenders (my.raceresult.com-Sprache) anzuzeigen.Land.Alpha2
 Nation.Alpha22-stellige Abkürzung der Länderbezeichnung gemäß [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1#Current_codes)Land.Alpha3
 Nation.Alpha33-stellige Abkürzung der Länderbezeichnung gemäß [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1#Current_codes)Land.IOC
 Nation.IOCLänderbezeichnung gemäß IOCLand.UCI
 Nation.UCILänderbezeichnung gemäß UCILand.Flagge
 Nation.FlaggeZeigt die entsprechende Flagge des Landes/der NationalitätLand.Währung
 Nation.Währung
Liefert den 3-stelligen Währungscode der nationalen WährungLand.isEU
 Nation.isEU
Liefert 1, wenn das Land zur EU gehört, 0 andernfalls


 Diese Felder sind von Nation bzw. Land abgeleitet und können nicht beschrieben/geändert werden. Sie interpretieren die Eingaben in Nation bzw. Land und geben den korrespondierenden Wert zurück. Z.B. gibt Nation.IOC immer *GER* zurück, egal ob in Nation *DE*, *DEU*, *Deutschland*, *Germany* oder *GER* eingetragen ist. Damit werden auf Teilnehmer- oder Ergebnislisten die Nationen einheitlich dargestellt und normalisiert. Dies bietet besonders dann großen Komfort, wenn Teilnehmerdaten aus verschiedenen Quellen stammen, z.B. Import via Excel-Datei und Eingabe im Teilnehmerfenster.

Das [[@1147|Teilnehmer-Fenster]] speichert in den Feldern Land und Nation den numerischen Wert gem. [ISO 3166-1](https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste) ab.

---

## Datenfelder der Veranstaltung ##

Sie haben Zugriff auf sämtliche Eigenschaften der Veranstaltung sowie der angelegten Wettbewerbe / Altersklassen. Ein einfacher Anwendungsfall ist die Urkunde: Anstelle des Veranstaltungsdatums als festen Text, fügen Sie das Feld [Veranstaltung.Datum] ein, so dass Sie die Urkunde nächstes Jahr nicht mehr aktualisieren müssen.

# Veranstaltung #

VeranstaltungHaupteinstellungen - VeranstaltungsnameVeranstaltung.NameEntspricht [Veranstaltung]Veranstaltung.IDID der VeranstaltungVeranstaltung.DatumHaupteinstellungen - Veranstaltungsdatum vonVeranstaltung.Datum1Haupteinstellungen - Veranstaltungsdatum vonVeranstaltung.Datum2Haupteinstellungen - Veranstaltungsdatum bisVeranstaltung.TypHaupteinstellungen - Veranstaltungstyp (Sportart)Veranstaltung.PLZVeranstaltungsort - PostleitzahlVeranstaltung.OrtVeranstaltungsort - OrtVeranstaltung.StraßeVeranstaltungsort - StraßeVeranstaltung.LandVeranstaltungsort - LandVeranstaltung.WährungRegionseinstellungen - WährungVeranstaltung.*AttributName*Das entsprechende benutzerdefinierte Veranstaltungsattribut

# Wettbewerb #

WettbewerbWettbewerbsnummer, die dem Teilnehmer zugeordnet istWettbewerb.NameName des zugeordneten WettbewerbsWettbewerb.DatumDatum des zugeordneten WettbewerbsWettbewerb.StartGeplante Startzeit des zugeordneten Wettbewerbs formatiert als hh:mm:ss .TextGeplante Startzeit des zugeordneten Wettbewerbs formatiert als hh:mm:ss .DezimalGeplante Startzeit des zugeordneten Wettbewerbs dezimalWettbewerb.ZielschlussZielschlusszeit des zugeordneten Wettbewerbs formatiert als hh:mm:ss 
.TextZielschlusszeit des zugeordneten Wettbewerbs formatiert als hh:mm:ss .DezimalZielschlusszeit des zugeordneten Wettbewerbs dezimalWettbewerb.LängeLänge des zugeordneten Wettbewerbs .UnitVerwendete Einheit von Wettbewerb.Länge .MeterDie Länge des Wettbewerbs als Wert in MeternWettbewerb.TimeFormatDas im Wettbewerb verwendete ZeitformatWettbewerb.TimeRoundingDie im Wettbewerb verwendete Zeitrunding als Wert
 1 bis 5 = aufrunden auf die nächste Sek. bis Zehntausendstel

 -1 bis -5 = abrunden auf die nächste Sek. bis Zehntausendstel

 11 bis 15 = kaufmännisch runden auf Sek. bis ZehntausendstelWettbewerb.RundenAnzahl Runden des zugeordneten WettbewerbsWettbewerb.MinimaleRundenzeitMinimale Rundenzeit des zugeordneten WettbewerbsWettbewerb.*AttributName*Das jeweilige benutzerdefinierte Attribut des zugeordneten WettbewerbsWettbewerb.*OrderPos*Die Position des Wettbewerbs wie dargestellt im ÜberblickTeilnahmeberechtigt0 wenn der Teilnehmer für den ausgewählten Wettbewerb teilnahmeberechtigt ist

1 wenn der Teilnehmer zu alt

2 wenn der Teilnehmer zu jung ist

4 wenn das Geschlecht nicht stimmt

5 wenn das Geschlecht nicht stimmt und der Teilnehmer zu alt ist

6 wenn das Geschlecht nicht stimmt und der Teilnehmer zu jung ist

# Altersklassen #

Altersklasse/Altersklasse1*, Altersklasse2, Altersklasse3
ID der zugeordneten Altersklasse, bezogen auf das Altersklassen-Set 1, 2 oder 3AltersklasseX.NameName der zugeordneten AltersklasseAltersklasseX.AbkürzungAbkürzung der zugeordneten AltersklasseAltersklasseX.IDNummer der zugeordneten AltersklasseAltersklasseX.OrderPosSortierkriterium der Altersklassen. Verwenden Sie dieses Feld, um die Altersklassen wie eingegeben zu sortieren

*Altersklasse und Altersklasse1 haben dieselbe Funktion und können synonym für alle Ableitungen verwendet werden.

# Startgeld #

StartgeldStartgeld berechnet gemäß der [[@1158|Startgeldeinstellungen]]
GrundgebührWie *Startgeld*, aber ohne zusätzliche Startgelder.

---

## Zeitfelder ##

Die folgenden Felder beziehen sich auf das [[@1110|Zielergebnis]] gemäß der Wettbewerbseinstellungen:

Zeit Formatierte Zielzeit gemäß der Einstellungen zum [[@2177|Zeitformat]]. .ExistiertGibt 1 zurück, wenn eine Zeit oder ein Wert im Zielergebnis vorliegt. .PositivGibt 1 zurück, wenn im Zielergebnis eine Zeit > 0 gespeichert ist .DezimalNumerischer Zahlenwert (in Sekunden) des Zielergebnisses 
.GerundetZahlenwert gerundet gemäß der Einstellungen zur [[@1178|Zeitrundung]]
 .Text*Zeit* formatiert in hh:mm:ssImZielGibt 1 zurück, wenn im Zielergebnis eine Zeit > 0 gespeichert ist, equivalent zu *[Zeit.Positiv]*

Das folgende Feld bezieht sich auf das [[@1026|Startergebnis]].

GestartetGibt 1 zurück, wenn im Startergebnis eine Zeit > 0 gespeichert ist. Wenn kein Startergebnis definiert ist, wird 1 zurückgegeben, wenn eine Zeit in dem Ergebnis mit der niedrigsten ID gespeichert ist.

Die folgenden Felder beziehen sich auf die Startzeiten und Zielschlusszeiten. Die Felder für die Startzeit verhalten sich wie reguläre [[@16972|Ergebnisfelder]].

Zeit0Zugewiesene Startzeit formatiert gemäß der Einstellungen zum [[@1177|Zeitformat]]Zeit0.Dezimal
 T0Numerischer Wert (Dezimal) der zugewiesenen StartzeitZeit0.Gerundet

TR0
Numerischer, gerundeter Wert der zugewiesenen Startzeit gemäß der Einstellungen zur [[@1178|Zeitrundung]] ZielschlussZielschlusszeit als numerischer (Dezimal-)WertZielschlussTextZielschlusszeit formatiert gemäß der Einstellungen zum [[@1177|Zeitformat]]

Im [[@8056|Rohdatenmodus]] kann auf Rundenzeiten zugegriffen werden, ohne hierfür ein Ergebnis anzulegen (ersetzen Sie Messstelle durch den Namen der Messstelle und X durch die gewünschte Runde). Die Berechnung berücksichtigt die eingestelle Anzahl Runden sowie die dazugehörige minimale Rundenzeit.

Messstelle.LapXRundenzeit der Runde X in Sekunden.Messstelle.ReadXAbsolvierte Zeit nach Detektion X in Sekunden.Messstelle.LapXTextFormatierte Rundenzeit der Runde X gemäß der Einstellungen zum [[@1177|Zeitformat]].Messstelle.ReadXTextFormatierte absolvierte Zeit nach Detektion X gemäß der Einstellungen zum [[@1177|Zeitformat]].

 

---

## Felder der Zwischen- / Abschnittszeiten ##

Jede Zwischen- / Abschnittszeit berechnet automatisch eine Vielzahl an Feldern, die vormals aufwendig in Ergebnissen angelegt werden mussten. Zwischenzeiten und davon abhängige Felder werden über eine Verkettung abgerufen, die immer mit dem Namen der Zwischen-/Abschnittszeit beginnt. Zwischen-/Abschnittszeiten bedienen sich somit der [[@2757|Punkt-Logik]]. Weitere Felder können abgerufen werden, indem bestimmte Ausdrücke an den Namen der Zwischen-/Abschnittszeit durch einen Punkt getrennt angehängt werden, z.B. [*ZwischenzeitName*.*FeldName*].

Möchten Sie auf Daten von der vorherigen oder der nächsten Zwischenzeit zugreifen, erreichen Sie dies durch Anhängen von .Prev oder .Next an die gewählte Zwischenzeit. Durch Anhängen von weiteren Ausdrücken können Sie diese Zeit oder Platzierung in bestimmten Formaten abrufen, z.B. [*ZwischenzeitName*.Prev.*FeldName*] oder [*ZwischenzeitName*.Next.*FeldName*].

Auf Live-Leaderboards oder zur Überwachung des Rennverlaufs ist es notwendig, auf die letzte verfügbare Zwischenzeit eines Teilnehmers zugreifen zu können. Ersetzen Sie hierfür ZwischenzeitName durch {LastSplit}, wodurch die jeweils aktuellsten Felder der letzten Zwischenzeit gemäß der Reihenfolge im Rennverlauf abgerufen werden können, z.B. [{LastSplit}.*FeldName*].

---

### Zwischen-/Abschnittszeiten ###

Zwischenzeiten können in einer Vielzahl an Varianten und nach Bedarf abgerufen werden. 

Durch im Rennverlauf realistisch angegebene Min/Max Geschw./Pace/Zeit für jede Zwischenzeit rechnet die Software außerdem zukünftige Zwischenzeiten hoch. Die Hochrechnung basiert auf dem Perzentil der vorhergehenden Zwischenzeiten und den jeweiligen Min/Max-Werten der hochzurechnenden Zwischenzeit

Zwischenzeiten generieren außerdem [[@16986|Zwischenzeit-Rückstande]] gemäß der Zwischen-/Abschnittsplatzierungen.

---

#### Berechnete Zeiten ####

Jede Zwischenzeit kann als Tages-, Brutto- oder Nettozeit (basierend auf der letzten Zwischenzeit mit der Sportart "Dies ist der Start") ausgegeben werden.

**Zeit-Varianten**

ZwischenzeitNameliefert die Zwischenzeit als Brutto- oder Netto-Zeit gemäß der Wettbewerbseinstellungen im RennverlaufZwischenzeitName.Uhrliefert die Zwischenzeit als TageszeitZwischenzeitName.Brutto
liefert die Zwischenzeit als Bruttozeit im Wettbewerbs-ZeitformatZwischenzeitName.Netto
liefert die Zwischenzeit als Nettozeit im Wettbewerbs-ZeitformatZwischenzeitName.Abschnittliefert die Zeit seit der vorherigen Zwischenzeit im Wettbewerbs-ZeitformatAbschnittszeitNameliefert die Abschnittszeit im Wettbewerbs-Zeitformat

**Zeitformat**

Zwischen- / Abschnittszeiten können entweder im Wettbewerbs-Zeitformat abgerufen werden oder als Text, Dezimal- oder gerundete Zeit. Für ein bestimmtes Zeitformat hängen Sie folgende Ausdrücke an. Diese Ausdrücke können auch an sämtliche Zeit-Varianten gehängt werden, um die entsprechende Zeit in einem bestimmten Format zu generieren.

.Textliefert eine formatierte Zwischenzeit gemäß des Wettbewerbs-Zeitformats.Dezimal
liefert die Zwischenzeit als Dezimalzeit (Zeit in Sekunden).Gerundetliefert eine gerundete Zeit der Zwischenzeit gemäß der Wettbewerbs-Rundungseinstellungen

z.B. [10K.Uhr.Dezimal] liefert die Tageszeit der 10K-Zwischenzeit als Dezimalzeit (Zeit in Sekunden).

---

#### Hochgerechnete Zeiten ####

Für jede Zwischenzeit wird eine Hochrechnung vorgenommen. Diese Hochrechnung wird im Teilnehmer-Fenster angezeigt und kann auch für die Darstellung in Listen herangezogen werden.

Hochrechnung werden über [ZwischenzeitName.Vorhersage] abgerufen. Die Hochrechnung wird standardmäßig gemäß der Einstellungen im Rennverlauf als Brutto- oder Nettozeit zurückgegeben. 

Sonstige Zeit-Varianten (.Uhr / .Brutto / .Netto) und Zeitformat (.Text / .Dezimal / .Gerundet) können ebenfalls angewendet werden.

---

### Zwischen-/Abschnittsplatzierungen ###

Wenn Sie Zwischen- / Abschnittszeiten verwenden, werden automatisch jeweils die Platzierungen GesPl, MWPl und AKPl berechnet. Analog zu den Zeitfeldern der Zwischenzeiten können Sie die Platzierungen auch für jede berechnete Zeit abrufen (Standardzeit / Tageszeit / Brutto / Netto).

Zwischen- und Abschnittsplatzierungen berücksichtigen **NICHT** das Feld [Status]. Diese Platzierungen sind in erster Linie für schnelle, vorläufige Live-Platzierungen gedacht. Angenommen, bei einem Triathlon verlässt ein Teilnehmer das Wasser als Erstes, wird aber später im Rennen disqualifiziert, so ist er dennoch der schnellste Schwimmer. Für endgültige, offizielle Ergebnisse sollten Sie eigene [[@1151|Platzierungen]] oder den [[@15179|AutoPlatz]] verwenden.

Platzierungen werden durch folgende Zusätze abgerufen.

.GesPlGesamtplatzierung gruppiert nach Wettbewerb.MWPlM/W-Platzierung gruppiert nach Wettbewerb und Geschlecht.AKPlAltersklassenplatzierung gruppiert nach Wettbewerb, Geschlecht und Altersklasse1

z.B. [10K.MWPl] liefert die M/W-Platzierung eines Teilnehmers an der 10K-Zwischenzeit. Als Grundlage für die Berechnung der Platzierung dient entweder die Brutto- oder Nettozeit, je nach Wettbewerbseinstellungen im Rennverlauf.

z.B. [10K.Brutto.MWPl] liefert die M/W-Platzierung eines Teilnehmers an der 10K-Zwischenzeit nach der Bruttozeit.

Für eine schönere Darstellung von Platzierungen können Sie folgende Zusätze verwenden:

.PDie Platzierung wird mit einem "." angezeigt.ThDie Platzierung als [[@1210|englische Ordinalzahl]] (z.B. 1st, 2nd, 3rd).MaxDie Anzahl gewerteter Teilnehmer in dieser Platzierung.

---

#### Berechnete Gap-Zeiten ####

Gap-Zeiten (Rückstände) für eine beliebige Zwischenzeit oder Platzierung können aufgerufen werden, indem das Zwischenzeit-Feld wie folgt erweitert wird.

.GapTopRückstand auf den ersten Teilnehmer der gewählten Platzierung.GapPrevRückstand auf den vorplatzierten Teilnehmer der gewählten Platzierung

z.B. [10K.Brutto.MWPl.GapTop] liefert an der 10K-Zwischenzeit den Rückstand auf die Bruttozeit des Führenden der M/W-Platzierung.

Gap-Zeiten werden gemäß der Wettbewerbseinstellungen formatiert, mit dem Unterschied, dass sämtliche führenden Nullen gestrichen werden.

Wenn Sie in Ergebnislisten den [AutoRank]("race|result Knowledge Base > race|result 11 > Race Setup Guide > Scoring Setup > Rankings > AutoRank") verwenden, können Sie den Rückstand dynamisch berechnen lassen, je nachdem wie die Teilnehmer in der Liste aktuell gruppiert werden.

z.B. [ZwischenZeit.AutoPlatz.GapTop] liefert jeweils den Rückstand zum Erstplatzierten gemäß der aktuell gesetzten Filter.

Wenn Sie ein anderes Format benötigen, können Sie den Ausdruck wie folgt erweitern, um ein benutzerdefiniertes Zeitformat anzuwenden.

.Dezimalliefert den Rückstand als Dezimalzeit (Wert in Sekunden).Gerundetliefert den Rückstand als gerundete Zeit gemäß der Wettbewerbseinstellungen zur Rundung

---

#### Auf andere Teilnehmer zugreifen ####

Für jede Platzierung aus dem Rennverlauf können Sie auf die Daten des Erst- oder Vorplatzierten zugreifen. Um auf diese Daten zuzugreifen, erweitern Sie die Platzierung mit einem der folgenden Suffixe

.TopDer Erstplatzierte Teilnehmer.LastDer Letztplatzierte Teilnehmer.PrevDer vorplatzierte Teilnehmer.NextDer nachplatzierte Teilnehmer

Hängen Sie nun das gewünschte Datenfeld an diesen Ausdruck an, um die gewünschten Daten abzurufen.

z.B. [Zwischenzeit.MWPl.Top.VorNachname] liefert den Vor- und Nachnamen des Erstplatzierten der M/W-Platzierung dieser Zwischenzeit.

Sie können diesen Ausdruck sogar mit weiteren Platzierungen aus dem Rennverlauf erweitern, z.B. [Zwischenzeit.GesPl.Prev.Zwischenzeit.MWPl] liefert die M/W-Platzierung dieser Zwischenzeit für den vorplatzierten Teilnehmer gemäß der Gesamt-Platzierung an dieser Zwischenzeit.

---

### Berechnungen von Zwischen- / Abschnittszeiten ###

Für jede Zwischen- / Abschnittszeit werden automatisch Felder berechnet, die analog zu Zeiten / Platzierungen aufgerufen werden können.

**.Existiert **- gibt eine 1 zurück, wenn für diese Zwischenzeit eine Zeit vorliegt, andernfalls 0.

**.ZeitPositiv **- gibt eine 1 zurück, wenn für diese Zwischenzeit eine Zeit vorliegt UND diese Zeit positiv ist, andernfalls 0.

**.AnzahlZwischenzeiten **- liefert die Anzahl an ermittelten Zwischenzeiten bis zur angegebenen Zwischenzeit

**.Distance (.Meter / .KM / .Miles) **- liefert die Distanz der Zwischenzeit / des Abschnitts. Standardmäßig wird es in Kilometern angegeben, für andere Einheiten kann diese entsprechend an den Ausdruck angehängt werden

**.GeschwindigkeitOderPace **- liefert die Geschwindigkeit/Pace formatiert gemäß der Einstellungen im Rennverlauf. Das Format ist im Output enthalten, z.B. "1:40 min/100m"

**.Geschwindigkeit(.Dezimal) **- liefert die Geschwindigkeit für die voranstehende Zeit (z.B. 10K.Abschnitt.Geschwindigkeit liefert die Geschwindigkeit auf dem der 10K-Messstelle vorausgehenden Abschnitt). Geschwindigkeiten sind standardmäßig als "ss,k" formatiert. Durch Anhängen von **.Dezimal** geben Sie die Geschwindigkeit als Dezimalwert aus.

**.Pace(.Dezimal) **- liefert die Pace für die voranstehende Zeit (z.B. Ziel.Pace liefert die Pace für den Abschnitt von Start zum Ziel). Eine Pace ist standardmäßig als "HH:mm:ss" formatiert. Durch Anhängen von **.Dezimal** geben Sie die Pace als Dezimalwert aus.

---

### Datenfelder der Zwischen- / Abschnittszeiten ###

Für jede Zwischen- & Abschnittszeit können einige Datenfelder aufgerufen werden. Diese sind vor allem für Leaderboards nützlich, um Informationen zur letzten Messstelle darzustellen, z.B. wenn Sie {LastSplit} verwenden.

**.Name **- liefert den Namen der Zwischen-/Abschnittszeit

**.Bezeichnung **- liefert die Bezeichnung der Zwischen-/Abschnittszeit oder den Namen, wenn keine Bezeichnung vorliegt.

**.OrderPos** - liefert eine Zahl basierend auf der Reihenfolge der Zwischenzeiten im Rennverlauf. Beachten Sie, dass diese Zahl an sich bedeutungslos ist und sich nur als Sortierkriterium in Ausgabelisten oder Platzierungen eignet.

**.FromBackup** - gibt 1 zurück, wenn die Zwischenzeit von der Backup-Messstelle generiert wurde, andernfalls 0.

---

## Ergebnisfelder ##

[[@1153|Ergebnisse]] beinhalten Zahlenwerte, meistens Zeiten in Anzahl Sekunden, können aber auch Punkte, Anzahl Runden oder andere Werte annehmen.

Die Ergebnisfelder verwenden die Punkt-Logik und können entweder duch *ZeitX* oder *NameDesErgebnisses* abgerufen werden (ersetzen Sie X durch die ID des gewünschten Ergebnisses, z.B. Zeit5.Dezimal für den Wert im Ergebnis mit ID 5).

Für jedes Ergebnis sind die folgenden Felder verfügbar:

Zeit*X
 NameDesErgebnisses* Formatierte Zeit gemäß der Einstellungen zum [[@1177|Zeitformat]]. .DezimalGespeicherter Zahlenwert 
.GerundetZahlenwert gerundet gemäß der Einstellungen zur [[@1178|Zeitrundung]]
 .TextFormatierte Zeit gemäß der Einstellungen zum [[@1177|Zeitformat]]
 .PositivGibt 1 zurück, wenn in dem Ergebnis eine Zeit > 0 gespeichert ist .InfoText, der neben der Zeit gespeichert wird, normalerweile Details vom Timing System

Sie können auch die folgenden Kurzformen verwenden, die _nicht_ die Punkt-Logik verwenden.

T*x*Gespeicherter Zahlenwert (entspricht *ZeitX.Dezimal*)TR*x*
Zahlenwert gerundet gemäß der Einstellungen zur [[@1178|Zeitrundung]] (entspricht *ZeitX.Gerundet*)

---

## Platzierungsfelder ##

Nachdem Sie eine Platzierung mit der ID *X* angelegt haben, können Sie folgende zusätzliche Felder nutzen.

Platzierungsfelder verwenden die Punkt-Logik, um auf eine Vielzahl an weiteren Feldern zurückgreifen zu können. Es kann jeweils immer PlatzX oder der PlatzierungsName verwendet werden.

Platz*X*
*NameDerPlatzierung*
Die Platzierung des Teilnehmers gemäß Definition, z.B. 47
 Der Name der Platzierung kann ebenso verwendet werden, zum Beispiel *MWPl.*
Platz*X.*p
*NameDerPlatzierung.*p
Die Platzierung mit einem Punkt am Ende, z.B. 47.
Platz*X.th*
*NameDerPlatzierung.th*Die Platzierung als englische Ordinalzahl, z.B. 1st, 2nd, 3rd, 4th.Platz*X.max*
*NameDerPlatzierung.max*
Die Anzahl Teilnehmer in der gleichen Kategorie, z.B. 495.
 Mit PlatzX.max können Sie bspw. folgendes erstellen: 47. von 495
Platz*X.*Top.*Y*

*NameDerPlatzierung.*Top*.Y*
Das Feld *Y* des Erstplatzierten gemäß Platzierung *X.*
*Y *kann jedes beliebige Feld sein, [GesPl.Top.Startnr] liefert bspw. die Startnr des Erstplatzierten der Gesamtplatzierung.Platz*X.Last*.*Y*

*NameDerPlatzierung.*Last*.Y*
Das Feld *Y* des Letztplatzierten gemäß Platzierung *X*.
*Y *kann jedes beliebige Feld sein, [GesPl.Last.VorNachname] liefert bspw. den Vor- und Nachnamen des Letztplatzierten der Gesamtplatzierung.Platz*X.Prev*.*Y*

*NameDerPlatzierung.*Prev*.Y*
Das Feld *Y* des Vorplatzierten der Platzierung *X.*
*Y *kann jedes beliebige Feld sein, [GesPl.Prev.Startnr] liefert bspw. die Startnr des Vorplatzierten der Gesamtplatzierung.Platz*X.Next*.*Y*

*NameDerPlatzierung.*Next*.Y*
Das Feld *Y* des Nachplatzierten der Platzierung *X.*
*Y *kann jedes beliebige Feld sein, [GesPl.Next.Startnr] liefert bspw. die Startnr des Nachplatzierten der Gesamtplatzierung.

---

## Mannschaftswertungsfelder ##

Nachdem Sie die [[@1009|Mannschaftswertung]] mit ID *X* eingerichtet haben, können Sie auf folgende zusätzlichen Felder zugreifen (Sie können MW*x* hierbei jederzeit durch den Namen der Mannschaftswertung ersetzen, z.B. *Mannschaftswertung m/w.Platz*).

Die Mannschaftswertungsfelder greifen auf die [[@2757|Punkt-Logik]] zurück, um auf weitere Informationen zuzugreifen.

MW*x*.Platz
 Platzierung der Mannschaft, z.B. 13
 
.pDie Platzierung mit einem Punkt am Ende, z.B. 13.
 .thDie Platzierung als englischer Ordinalwert, z.b. 1st, 2nd, 3rd, 4th. .maxAnzahl gewerteter Mannschaften.MW*x*.DezimalZeit1
 MW*x*.DezimalZeit2
 MW*x*.DezimalZeit3
 MW*x*.DezimalZeit4
Dezimalzeit der Mannschaft.MW*x*.Zeit1
 MW*x*.Zeit2
 MW*x*.Zeit3
 MW*x*.Zeit4
Formatierte Zeit der Mannschaft.MW*x*.Gewertet
1, wenn der Teilnehmer gewertet wird, andernfalls 0.
 Wenn Sie die Option *Max. Anzahl Mannschaften: 1 und alle Teilnehmer anz.* aktiviert haben, werden nicht alle Teilnehmer gewertet.MW*x*.Geschlecht
Geschlecht aller gewerteten Teammitglieder.
 1=nur Männer, 2=nur Frauen, 3=Männer und FrauenMW*x*.GeschlechtAlle
Geschlecht aller Teammitglieder.
 1=nur Männer, 2=nur Frauen, 3=Männer und FrauenMW*x*.Position
Position des Teilnehmers innerhalb der Mannschaft.MW*x*.Nummer
Mannschaften werden durch dieses Feld nummeriert, wenn es mehrere Teams mit gleichen Namen gibt.MW*x*.Anzahl
Anzahl Teammitglieder.MW*x*.AnzahlFrauen
Anzahl Frauen in der Mannschaft.MW*x*.AnzahlGewertet
Anzahl gewerteter Teammitglieder.MW*x*.AnzahlFrauenGewertet
Anzahl gewerteter Frauen in der Mannschaft.MW*x*.DecimalTimeTop1
 MW*x*.DecimalTimeTop2
 MW*x*.DecimalTimeTop3
 MW*x*.DecimalTimeTop4
Dezimalzeit der ersten Mannschaft innerhalb der Wertung.MW*x*.DecimalTimePrev1
 MW*x*.DecimalTimePrev2
 MW*x*.DecimalTimePrev3
 MW*x*.DecimalTimePrev4
Dezimalzeit der vorigen Mannschaft innerhalb der Wertung.MW*x*.TimeTextTop1
 MW*x*.TimeTextTop2
 MW*x*.TimeTextTop3
 MW*x*.TimeTextTop4
Formatierte Zeit der ersten Mannschaft innerhalb der Wertung.MW*x*.TimeTextPrev1
 MW*x*.TimeTextPrev2
 MW*x*.TimeTextPrev3
 MW*x*.TimeTextPrev4
Formatierte Zeit der vorigen Mannschaft innerhalb der Wertung.

---

### Mannschaftswertung: Auf Team-Mitglieder zugreifen ###

Wenn Sie eine Urkunde für eine Mannschaft erstellen, können Sie auf die Daten aller Teammitglieder zugreifen:

![](https://support2.raceresult.com/kb/files/262b12dd0fb3d54712b65039907d4221.png)

Greifen Sie mit MW*x*.P*y* auf Daten des Teilnehmers *y *einer Mannschaft gemäß Mannschaftswertung *x* zu. Nutzen Sie diese Formel, um die detaillierten Mannschaftsergebnisse…

![](https://support2.raceresult.com/kb/files/bba2c49c60a0518039ffecb1f32cbf93.png)

 … auf eine Zeile pro Mannschaft zu verkürzen, aber nach wie vor die Nachnamen aller Athleten anzuzeigen.

![](https://support2.raceresult.com/kb/files/ac9d8ea929a028f78fde384404072c02.png)

 Wie das funktioniert?

![](https://support2.raceresult.com/kb/files/bfac4ea418bc224adb453b1f46b89c46.png)

MW1.P*x* greift auf die drei Namen der Teilnehmer zu und stellt diese in einer Zeile dar. Ohne eine weitere Änderung würde die Liste wie folgt aussehen:

![](https://support2.raceresult.com/kb/files/73341855181d20a16a0e935313eba6e6.png)

Es wird immer noch eine Zeile pro Teilnehmer dargestellt. Also fügen wir den Filter MW1.Position = 1 hinzu. MW1.Position ist die interne Nummerierung der Mannschaftsteilnehmer (1 => erster Teilnehmer, 2 => zweiter Teilnehmer, …). Durch Verwendung dieses Filters wird je Mannschaft nur noch eine Zeile angezeigt.

---

### Teamrundenrennen: Weitere Felder ###

Wenn Sie den Mannschafts-Rundenmodus verwenden, können Sie auf folgende Felder zugreifen:

**Teilnehmerbezogene Felder:**

MW*x*.Laps.CountAnzahl Runden dieses Teilnehmers.MW*x*.Laps.Min T, D, L Schnellste Rundenzeit dieses Teilnehmers als formatierte Zeit.MW*x*.Laps.Avg T, D
 Durchschnittliche Rundenzeit dieses Teilnehmers als formatierte Zeit.MW*x*.Laps.Max T, D, L Langsamste Rundenzeit dieses Teilnehmers als formatierte Zeit.MW*x*.Laps.Sum T, D Summe aller Rundenzeiten dieses Teilnehmers als formatierte Zeit.MW*x*.Laps.Last T, D Letzte Rundenzeit dieses Teilnehmers als formatierte Zeit.MW*x*.Laps.StagesGibt zurück, wie oft der Teilnehmer auf der Strecke war, unabhängig von der Anzahl an Runden.MW*x*.Laps.Lemans T, D Dauer zwischen T0 und der ersten registrierten Zeit, beispielsweise in einem Le Mans Start.MW*x*.Laps.ActiveBestimmt, ob der Teilnehmer momentan auf der Strecke ist.
*Nur möglich, wenn die Messstelle nach der Wechselzone ist.*MW*x*.Lap(n) T, D Zeigt die Zeit der Runde {n} dieses Teilnehmers als formatierte Zeit. .Brutto T, DZeigt die Bruttozeit nach Runde {n} dieses Teilnehmers als formatierte Zeit. .Uhr T, DZeigt die Tageszeit nach Runde {n} dieses Teilnehmers als formatierte Zeit.

Folgende Punkt-Logik-Erweiterungen sind möglich (sofern durch T, D, L angegeben):

T.TextZeigt eine formatierte ZeitD.DezimalZeigt die Zeit als DezimalwertL
.LapZeigt die Runde, in der die entsprechende Zeit erfasst wurde

Beispiel: MW1.Laps.Max.Lap gibt die Runde zurück, in der der Teilnehmer die langsamste Rundenzeit hat.

 

**Felder der Mannschaftsergebnisse:**

MW*x*.TeamLaps.Count Gesamtrundenzahl der Mannschaft .Women...aller weiblichen TeilnehmerMW*x*.TeamLaps.Min T, D, L Schnellste Rundenzeit der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.Avg T, D Durchschnittliche Rundenzeit der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.Max T, D, L Langsamste Rundenzeit der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.Last T, D Letzte Rundenzeit der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.Sum T, D Summe aller Rundenzeiten (exklusive Le Mans Startzeit) der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.Total T, D Summe aller Rundenzeiten (inklusive Le Mans Startzeit) der Mannschaft als formatierte Zeit.MW*x*.TeamLaps.StagesGesamtetappenzahl aller Teilnehmer.MWx.TeamLaps.Lemans T, D Le Mans Startzeit der Mannschaft (wird nur für den ersten Teilnehmer ermittelt, der die Messstelle überquert). .StartnrStartnummer des Teilnehmers der Mannschaft, der die Le Mans Startzeit ausgelöst hat.MW*x*.TeamLaps.Penalty   .Zeit T, DSumme der Strafzeiten der Mannschaft als formatierte Zeit. .LapsSumme der Strafrunden der MannschaftMW*x*.TeamLap(n) T, D Zeigt die Zeit der Runde {n} der Mannschaft als formatierte Zeit. .Brutto T, DZeigt die Bruttozeit nach Runde {n} der Mannschaft als formatierte Zeit. .Uhr T, DZeigt die Tageszeit nach Runde {n} der Mannschaft als formatierte Zeit.

Folgende Punkt-Logik-Erweiterungen sind möglich (sofern durch T, D, L angegeben):

T.TextZeigt eine formatierte ZeitD.DezimalZeigt die Zeit als DezimalwertL
.LapZeigt die Runde, in der die entsprechende Zeit erfasst wurde

 

Zudem kann *TSx.TeamLap(y).P.Feld* verwendet werden, um ein beliebiges Feld des Teilnehmers, der Runde *y* absolviert hat, aufzurufen. Dieses Feld gibt den Nachnamen des Teilnehmers wieder, der Runde 25 absolviert hat:

```

MW1.TeamLap(25).P.Nachname
```

---

## Felder für Online-Payment & Finanzen ##

Felder mit dem Prefix OP beziehen sich auf Zahlungen aus dem Online-Payment. Nehmen Sie z.B. nach einer erfolgten Anmeldung Änderungen an den Startgeldeinstellungen vor, wirkt sich dies auf [Startgeld] aus, nicht aber auf [OP.EntryFees], da zum Zeitpunkt der Anmeldung noch das "alte" Startgeld aktuell war.

# Online-Payment-Felder #

**Feld****Beschreibung**OP.PaymentsAnzahl Zahlungen für diesen TeilnehmerOP.EntryFees

OP.Verarbeitet

OP.Erhalten

OP.Saldo
 Summe der im Online-Payment verarbeiteten Startgelder dieses Teilnehmers.
 Summe aller im Online-Payment verarbeiteten Zahlungen, an denen der Teilnehmer beteiligt war. Bei Sammelanmeldungen wird der Gesamtbetrag einer Zahlung berücksichtigt, daher kann der Betrag höher sein als OP.EntryFees.
 Summe aller erhaltenen Zahlungen. Bei Sammelanmeldungen wird der Gesamtbetrag der Zahlungen berücksichtigt, daher kann der Betrag höher sein als OP.EntryFees.
 OP.Erhalten minus OP.Verarbeitet. .TextObige Werte im Format -s,kk und mit Währung, bspw. 12,34 EUR .DezimalObige Werte als Dezimalzahl formatiertOP.DatumDatum der letzten Aktualisierung von OP.SaldoOP.Payment{n} Felder mit Bezug zu einer bestimmten Zahlung, wobei {n} Werte von 1 bis n annehmen kann (z.B. OP.Payment3.ID liefert die ID der dritten Zahlung), oder von -1 bis -n für die nte-letzte Zahlung (OP.Payment-2.ID liefert die ID der zweitletzten Zahlung). .IDID der {n}ten Zahlung .ZahlungsmittelID des Zahlungsmittels der {n}ten Zahlung. 2=CCEUR, 3=CCCHF, 4=UEBD, 5=BAR, 6=SPF, 7=PPAL, 8=UEBCH, 10=EINZCH, 12=SOFUEB, 14=PPalGBP, 15=PPalUSD, 16=SEPA, 17=CCGBP, 19=SEPADATA, 20=OWNEPay, 21=OwnPPal, 22=OwnWireT, 26=OwnOnePay , 27=TelrAccount, 28=OwnOnePay Domestic, 29=Fatora, 30=Twint, 31=Stripe, 32=Paytrail V2, 33=Telr Sale, 34=RedSys, 35=MollieBancontact, 36=PayTabs, 38=MercadoPago, 39=PeachPayments, 40=Przelewy24 .ErstelltErstellt-Zeitstempel der {n}ten Zahlung .WährungWährung der {n}ten Zahlung .ReferenzReferenz der {n}ten Zahlung .KommentarKommentar der {n}ten Zahlung .CanceledStatus der {n}ten Zahlung. Gestrichene Zahlungen werden für OP.Saldo und OP.Verarbeitet ignoriert. Die Werte aus der Zahlung selbst sind weiterhin aufrufbar. .Betrag
 .Erhalten
 .Saldo
 .Fees Betrag der {n}ten Zahlung
 Erhaltener Betrag der {n}ten Zahlung
 OP.Payment{n}.Erhalten minus OP.Payment{n}.Betrag
 Gebühren der {n}ten Zahlung  .TextObige Werte im Format -s,kk und mit Währung, bspw. 12,34 EUR  .DezimalObige Werte als Dezimalzahl formatiertOPID *ID des ersten ZahlungsvorgangsOPSaldo *Saldo des Online-Payments (<0: Geld fehlt, >0: zu viel bezahlt)OPSaldoDatum *Datum des letzten SaldoeintragesOPWährung *Währung des verwendeten Zahlungsmittels bei der letzten ZahlungOPZahlungsmittel *Verwendetes Zahlungsmittel bei der letzten Zahlung. 2=CCEUR, 3=CCCHF, 4=UEBD, 5=BAR, 6=SPF, 7=PPAL, 8=UEBCH, 10=EINZCH, 12=SOFUEB, 14=PPalGBP, 15=PPalUSD, 16=SEPA, 17=CCGBP, 19=SEPADATA, 20=OWNEPay, 21=OwnPPal, 22=OwnWireT, 26=OwnOnePay , 27=TelrAccount, 28=OwnOnePay Domestic, 29=Fatora, 30=Twint, 31=Stripe, 32=Paytrail V2, 33=Telr Sale, 34=RedSys, 35=MollieBancontact, 36=PayTabs, 38=MercadoPago, 39=PeachPayments, 40=Przelewy24
OPStartgeld *Das gesamte bei der Online-Anmeldung berechnete StartgeldOPZuZahlen *Gesamt zu zahlender Betrag in Währung des ZahlungsmittelsOPGebühren *Gesamte Gebühren für den Bezahlvorgang (in Währung des Zahlungsmittels)OPReferenz *Zahlungsreferenz der letzten Zahlung (Verwendungszweck)

* Legacy-Felder, nicht der Punkt-Logik folgend. Verwenden Sie ab 2026 ausschließlich die neuen Felder.

# Startgeld-Felder #

StartgeldBerechnetes StartgeldGrundgebührBerechnetes Startgeld ohne optionale StartgelderStartgeldBezahlt1 wenn das Startgeld gezahlt wurde, 0 andernfallsZahlungDie Höhe des bezahlten StartgeldesKontoinhaberBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)KTNBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)KTNXKontonummer mit den letzten 3 Ziffern durch X ersetzt (nur bei eigener Zahlungsabwicklung)BLZBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)IBANBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)IBANXIBAN mit den letzten 3 Ziffern durch X ersetzt (nur bei eigener Zahlungsabwicklung)BICBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)SEPAMandatBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)BankBankverbindung des Teilnehmers (nur bei eigener Zahlungsabwicklung)

# Gutscheine #

**Feld****Beschreibung**GutscheinGutschein-CodeGutschein.BetragBetrag des GutscheinsGutschein.VermerkVermerk des Gutscheins

---

## Nummerierung in Listen ##

[[@1151|Platzierungen]] sind ein nützliches Konzept, da sie, einmal angelegt, überall verwendet werden können - auf Listen, auf Urkunden, in Nachrichten. Allerdings möchte man manchmal auch eine fortlaufende Nummerierung erstellen, ohne dafür eine Platzierung anzulegen.

Stellen Sie sich vor, Sie benötigen eine Liste aller Teilnehmer mit dem Vornamen John. Fügen Sie ganz einfach einen Filter zur Liste hinzu und verwenden Sie **Position** anstelle der Platzierung.

![](https://support2.raceresult.com/kb/files/75e7492ee0ea2f365248b50f6faadaef.png)

![](https://support2.raceresult.com/kb/files/647d880ec3d59a47619bde4441875146.png)

Das sieht soweit schon gut aus, allerdings soll die Nummerierung für das 5km-Rennen erneut bei 1 beginnen. Hierfür verwenden Sie **Position1**, wodurch die Nummerierung wieder bei 1 anfängt, wenn sich das höchste Gruppierungskriterium ändert. Mit **Position2** würde die Nummerierung wieder bei 1 beginnen, wenn sich entweder das höchste oder zweithöchste Gruppierungskriterium ändert.

![](https://support2.raceresult.com/kb/files/7ad65e0f9157aff55bcc59dc1d2ba7ab.png)

![](https://support2.raceresult.com/kb/files/1ea369fa7f9b9bee19e90957631f4230.png)

---

## Sonstige ##

**Sonstige Datenfelder**

RandomZufallszahl zwischen 0 und 1. Wird bei jedem Laden des Wertes neu randomisiert.CRLFFügt \r\n ein, um in einem Textausdruck eine neue Zeile zu erzeugen

---

## Fields List Reference ##

Type    [[@2767|Participant Data Fields]]BibLastnameFirstnameTitle YearOfBirthDateOfBirthGenderNation ContestClubLicenseStatus CommentTransponder1Transponder2RegNo StreetZIPCityState CountryEmailPhoneCellPhone CreatedModifiedCreatedByLanguage     Automatic FieldsIDAccountOwnerAccountNoBranchNo BankIBANBICSEPAMandate VoucherCreatedModifiedGroupRegPos GroupID        [[@2769|Derived Fields]]Age*AgeOnDec31YearOfBirth2StatusText LastFirstNameFirstLastNameTransponderInChipFileRandom AccountNoXIBANX       [[@1027|Country and Nation]]Country.NameNation.NameCountry.Name.langNation.Name.lang Country.IntNameNation.IntNameCountry.Alpha2Nation.Alpha2 Country.Alpha3Nation.Alpha3Country.IOCNation.IOC Country.UCINation.UCICountry.FlagNation.Flag Country.CurrencyNation.CurrencyCountry.isEUNation.isEU Country.MultiNameNation.MultiName       [[@2768|Event Data Fields]]EventEvent.NameEvent.IDEvent.Date Event.Date1Event.Date2Event.TypeEvent.Country Event.ZIPEvent.LocationEvent.StreetEvent.Currency Event.AttributeNameEvent.LogoEvent.Timezone
Event.Timezone.Offset     [[@2768|Contest]]ContestContest.NameContest.NameShortContest.Date Contest.StartContest.Start.TextContest.Start.DecimalContest.TimeFormat Contest.FinishTimeLimitContest.FinishTimeLimit.TextContest.FinishTimeLimit.DecimalContest.TimeRounding Contest.LengthContest.Length.UnitContest.Length.MeterContest.OrderPos Contest.LapsContest.MinLapTimeContest.AttributeNameEligible     [[@2768|Age Groups]]AgeGroup.NameAgeGroup.NameShortAgeGroup.IDAgeGroup.OrderPos AgeGroup2.NameAgeGroup2.NameShortAgeGroup2.IDAgeGroup2.OrderPos AgeGroup3.NameAgeGroup3.NameShortAgeGroup3.IDAgeGroup3.OrderPos     [[@16972|Result Fields]]TimeX.ExistsTimeX.PositiveTimeX.DecimalTimeX.Rounded TimeX.TextTimeX.InfoTimeX.Overwritten  TXTRX       [[@2770|Time Fields]]StartedFinished   TimeTime.ExistsTime.PositiveTime.Decimal Time.RoundedTime.Text   Time0Time0.DecimalTime0.Rounded      [[@2770|Timing Points]]TimingPoint.LapXTimingPoint.ReadXTimingPoint.LapXTextTimingPoint.ReadXText     [[@16978|Split fields]]SplitNameSplitName.TOD SplitName.GunSplitName.Chip SplitName.SectorLegNameSplitName.Prev.FieldNameSplitName.Next.FieldName .Predicted.Text.Decimal.Rounded .Name.Label.OrderPos      [[@16980|Split Ranks]].Overall.Gender.AgeGroup  .P.Th.Max      [[@16986|Split Gaps]].GapTop.GapPrev   .Top.Last.Prev.Next     [[@16981|Split/Leg Calculations]].Exists.Positive.SplitCount.Distance(.Meter/.Km/.Miles) .SpeedOrPace.Speed(.Decimal).Pace(.Decimal)           [[@3280|Rank Fields]]RankXRankX.pRankX.thRankX.Max RankX.Top.FieldNameRankX.Last.FieldNameRankX.Prev.FieldNameRankX.Next.FieldName          [[@3281|TeamScore Fields]]TSx.RankTSx.Rank.PTSx.Rank.thTSx.Rank.Max TSx.DecimalTime1..4TSx.Time1..4TSx.PositionTSx.TeamIndex TSx.ScoredTSx.NumberScoredTSx.NumberWomenScoredTSx.NumberWomen TSx.NumberTSx.GenderTSx.GenderAll  TSx.DecimalTimeTop1..4TSx.DecimalTimePrev1..4TSx.TimeTextTop1..4TSx.TimeTextPrev1..4 TSX.PY.[FieldName]             [[@2819|Team Lap Race Fields]]TSX.LTNumberTSX.LTMinTSX.LTAvgTSX.LTMax TSX.LapTimeMinTSX.LapTimeAvgTSX.LapTimeMaxTSX.LTMinLap TSX.LTMaxLapTSX.LTSumTSX.LTLastLapTSX.LTEtaps TSX.LTLemansTSX.LTActive        TSX.LTTeamNumberTSX.LTTeamNumberWomenTSX.LapTimeTeamAbs(n)TSX.LapTimeTeam(n) TSX.LTTeamMinTSX.LTTeamAvgTSX.LTTeamMaxTSX.LapTimeTeamMin TSX.LapTimeTeamAvgTSX.LapTimeTeamMaxTSX.LTTeamMinLapTSX.LTTeamMaxLap TSX.LTTeamLastLapTSX.LTTeamSumTSX.LTTeamTotalTSX.LTTeamEtaps TSX.LTTeamLemansTSX.LTTeamLemansBibTSX.LTTeamPenaltyTimeTSX.LTTeamPenaltyLaps          [[@18433|Payment & Finance Fields]]OPIDOPBalanceOPBalanceDateOPCurrency OPMethodOPEntryFeeOPToPayOPPaymentFee OPUserFeeOPReferencePaymentLinkEntryFee BasicFeeEntryFeePaidPaidEntryFeeAccountOwner AccountNoAccountNoXBranchNoIBAN IBANXBICSEPAMandateBank      VoucherVoucher.AmountVoucher.Remark 

* Age is calculated based on the Event date. 

---

## Rechnungsfelder ##

Verwenden Sie die folgenden Felder in Rechnungslayouts. Rechnungsfelder greifen auf die [[@2757|Punkt-Logik]] zurück.

Rechnung.NumberRechnungsnummerRechnung.KundenreferenzReferenz des EmpfängersRechnung.DatumRechnungsdatumRechnung.LeistungsdatumLeistungsdatumRechnung.RechtlicheHinweiseRechtliche Hinweise der RechnungRechnung.WährungWährung der RechnungRechnung.Empfänger
 Rechnung.Aussteller Felder bezogen auf den Rechnungsempfänger
 Felder bezogen auf den Rechnungsaussteller
 
.FirmaFirma des Empfängers/Aussstellers
 .NameName des Ansprechpartners des Empfängers/Aussstellers .Adresszeile1Adresszeile 1 des Empfängers/Aussstellers .Adresszeile2Adresszeile 2 des Empfängers/Aussstellers .PLZPLZ des Empfängers/Aussstellers .OrtOrt des Empfängers/Aussstellers .StateBundesland des Empfängers/Aussstellers .Land Land des Empfängers/Aussstellers  .XXXReguläre Erweiterungen der Land-Felder, zum Beispiel .Name, .ISONumber, .Alpha2, etc. .SteuerNrSteuernummer des Empfängers/Aussstellers .UmsatzStIDUmsatzsteuer-ID des Empfängers/AussstellersRechnung.Betrag
 Rechnung.Nettobetrag

Rechnung.Bruttobetrag
 Rechnung.Steuer
 Invoice.NetAmount[satz]

Invoice.Tax[satz]
 Gesamtbetrag der Rechnung gemäß des Startgeldeinstellungen. Wenn MwSt. inkludiert, entspricht es Rechnung.Bruttobetrag
 Nettobetrag der Rechnung, steuersatzübergreifend

Bruttobetrag der Rechnung
 Gesamtsteuerbetrag der Rechnung

Nettobetrag aller Rechnungsposten mit bestimmtem Steuersatz, bspw. gibt Invoice.NetAmount7 den Nettobetrag aller Rechnungsposten mit 7% MwSt. zurück
 Bestimmter Betrag eines Steuersatzes, bspw. gibt Invoice.Tax19 den Steuerbetrag aller Posten mit 19% MwSt. zurück
 .DezimalVorgenannte Werte als Dezimalwert formatiert .TextVorgenannte Werte als Text formatiertRechnung.PostenX Felder mit Bezug auf den jeweiligen Rechnungsposten X .PositionPosition von Posten X .BezeichnungBezeichnung (Startgeldbezeichnung) von Posten X .AnzahlAnzahl von Posten X .Einzelpreis
 .Preis
 .Steuersatz

.Steuer
 Einzelpreis von Posten X
 Gesamtpreis von Posten X (Einzelpreis * Anzahl)
 Steuersatz von Posten X
 Steuerbetrag von Posten X  .DezimalObige Werte als Dezimalwert formatiert  .TextObige Werte als Text formatiertRechnung.Zahlung Felder mit Bezug auf die einer Rechnung zugeordneten Zahlung. Bei Rechnungen, die unmittelbar aus einer Online-Anmeldung generiert werden, sind die nachfolgenden Felder automatisch befüllt. .MethodeVerwendete Zahlungsmethode .KontoinhaberKontoinhaber des Rechnungsausstellers .IBANIBAN des Rechnungsausstellers .BIC
BIC des Rechnungsausstellers .KTNKontonummer des Rechnungsausstellers .BLZ
Bankleitzahl des Rechnungsausstellers .BankBank des Rechnungsausstellers .Fälligkeitstage
Tage bis zur Fälligkeit der Rechnung .FälligkeitsdatumFälligkeitsdatum der Rechnung .Referenz
Zahlungsreferenz der Rechnung. Für Anmeldungen/Zahlungen über my.raceresult.com gleich [OPReferenz] .MandatsIDMandats-ID der Rechnung .Bedingungen
Besondere Bedingungen der Rechnung