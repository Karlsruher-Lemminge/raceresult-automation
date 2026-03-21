# Dynamische Formatierung #

Die **Dynamische Formatierung** ermöglicht es, einzelne Datensätze auf [[@1120|Listen]] und [[@1019|Urkunden]] unterschiedlich zu formatieren. Zum Beispiel können bestimmte Datensätze fett oder in einer anderen Farbe dargestellt werden.

Hierfür wird ein [[@1056|Ausdruck]] verwendet, der einen Text mit Formatierungsangaben generiert. Dieser Ausdruck wird für Listen in den [[@1105|erweiterten Spalteneinstellungen]] eingegeben. Für [[@1033|Urkunden ]] können die Formatierungsangaben in der Symbolleiste am oberen Bildschirmrand bei der Erstellung des Layouts der Urkunden eingegeben werden.

Der zu formatierende Text kann mehrere Anforderungen erfüllen, die per Semikolon getrennt werden:

Element1;Element2;...

Sie können folgende Elemente verwenden:

BFett
IKursivUUnterstrichenSDurchgestrichenALlinksbündigACzentriertARrechtsbündigC(x)Es wird die Schriftfarbe x verwendetBG(x)Es wird die Hintergrundfarbe x verwendet.T(x)Transparenz (0-100%)BTC(x) / BRC(x)

BBC(x) / BLC(x)
Konturfarbe x Oben / Rechts / Unten / LinksBTW(x) / BRW(x)

BBW(x) / BLW(x)
Konturdicke x Oben / Rechts / Unten / LinksFS(x)*Schriftgröße x in pt
OC(x)**Textkonturfarbe xOW(x)**Außenkonturbreite x

Werte von 0-5 in Schritten von 0,5

* nur verfügbar für Ausgabelisten im PDF-Format und Urkunden im Designer. Für Ausgabelisten im PDF-Format muss die Schriftgröße kleiner sein als die Standard-Schriftgröße.
 ** Nur auf Urkunden im Designer anwendbar. 

Mögliche Farbwerte sind:

* HTML-Farben, z.B. #FF3300
* [[@1154|RGB]]-Werte, z.B. 255,51,0
* [[@1023|CMYK]]-Werte, z.B. 0,100,89,20

Weitere Informationen zu Farben finden Sie [[@1024|hier]].

# Beispiele #

Ein Feld wird bei Frauen kursiv formatiert:

```

if([Geschlecht]="f"; "I"; "")

```


 Ein Feld wird für Teilnehmer unter 18 Jahren mit weißem Text auf rotem Hintergrund dargestellt.

```

if([Alter]<18; "BG(#FF0000);C(#FFFFFF)"; "")

```


 Ein Feld wird für Teilnehmer aus den USA rot markiert:

```

if([NationIOC]="USA"; "C(255,0,0)"; "")

```

 