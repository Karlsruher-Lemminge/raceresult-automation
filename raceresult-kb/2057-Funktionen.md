# Funktionen() #

*Funktionen* stellen in [[@1056|Ausdrücken]] weitere Funktionalitäten zur Verfügung. Nach dem Funktionsnamen folgen immer die Parameter in Klammern, getrennt durch Semikolons:

```

Funktionsname(Parameter1; Parameter2; Parameter3; ...)

```

---

## Ablauf-Funktionen ##

---

### iif() ###

Die Funktion **iif** (oder **if** ) hat drei Parameter: Wenn der erste Parameter ungleich 0/wahr ist, wird der zweite Parameter, sonst der dritte Parameter zurückgeben, z.B.:

```

if([Checkbox];"ja";"nein")

```

Wenn das zusätzliche Checkbox-Feld angeklickt ist, wird *ja* und sonst *nein* zurückgegeben.
 Der dritte Parameter kann auch weggelassen werden. Im Falsch-Fall wird dann NULL zurückgegeben.

---

### switch() ###

**switch** hat beliebig viele Parameter, die abwechselnd eine Bedingung und ein Ergebnis darstellen. Ist der erste Parameter wahr, wird das Ergebnis des zweiten Parameters zurückgegeben. Andernfalls wird geprüft, ob der dritte Parameter wahr ist und in diesem Fall das Ergebnis des vierten Parameters zurückgegeben, usw. Beispiel:

```
switch([Startnr]<100;"A";[Startnr]<200;"B";[Startnr]<300;"C")

```
 Wenn die Startnummer kleiner 100 ist, wird *A* zurückgegeben. Wenn die Startnummer kleiner 200 (aber größer-gleich 100) ist, wird *B* zurückgegeben. Wenn die Startnummer kleiner 300 (aber größer-gleich 200) ist, wird *C* zurückgegeben. Wenn die Startnummer größer-gleich 300 ist, wird nichts zurückgegeben.

---

### choose() ###

**choose** hat beliebig viele Parameter. Der erste Parameter ist eine Zahl und bestimmt, welcher Parameter zurückgegeben wird, z.B.

```
choose(4;"A";"B";"C";"D";"E") - liefert den vierten Parameter, also *D*

```

Dieses Beispiel übersetzt den numerischen Status eines Teilnehmers in einen Text:




```
choose([Status]+1;"regulär";"a.k.";"DSQ";"DNF";"DNS";"n.a.")
```



---

## String-Funktionen ##

---

### left() ###

**left **hat zwei Parameter, einen Text und eine Zahl *n*, und gibt die ersten *n* Zeichen des Textes wieder, z.B.:

```

left("race result";4) - liefert *race*

```
```

left([Nachname];1) - liefert den ersten Buchstaben des Nachnamens
```

---

### right() ###

**right **hat zwei Parameter, einen Text und eine Zahl *n*, und gibt die letzten *n* Zeichen des Textes zurück, z.B.:

```

right("race result";4) - liefert *sult*

```
```

right([Nachname];1) - liefert den letzten Buchstaben des Nachnamens
```

---

### mid() ###

**mid** hat drei Parameter, einen Text und zwei Zahlen *m* und *n*. Die Funktion liefert *n* Zeichen des Textes zurück, angefangen beim *m*-ten Zeichen z.B.:

```

mid("race result"; 6; 3) - liefert *res*
```

---

### instr() ###

**instr** sucht das erste Vorkommen eines Texts in einem anderen Text, angefangen bei einer bestimmten Position, z.B.

```

instr(1;"race result";" ") - liefert *5*

```
```

instr(2;"ab";"a") - liefert 0, da *a* ab dem zweiten Zeichen nicht mehr vorkommt
```

---

### instr2() ###

**instr2** ähnelt [[@1069|instr()]], behandelt aber áàä etc. als a, éèê etc. als e, usw.

```

instr2(1;"ráce result";"a") - gibt *2* zurück

```

---

### SplitString() ###

**SplitString **benötigt 3 Parameter - einen String, ein Trennzeichen und eine Zahl *n*.

Der String wird bei jedem Vorkommen des Trennzeichens getrennt, anschließend wird das *n-te* Zeichen geliefert, zum Beispiel

```

SplitString("a,b,c,d"; ","; 3) liefert *c*
```

---

### val() ###

**val** wandelt einen Text in eine Zahl um. So können Sie z.B. nach in einem zusätzlichen Textfeld eingetragenen Zahlen sortieren. Z.B.:

```

val([ZTF1]) - kann zur numerischen Sortierung nach ZTF1 genutzt werden.

```
```

val("3")<val("20") - liefert 1 (wahr)
```
```

"3"<"20" - liefert 0 (falsch, da Text-Vergleich)
```

---

### len() ###

**len** gibt die Länge eines Textes zurück.

```

len("race result") - liefert 11.

```
```

len([Nachname]) - liefert die Länge des Nachnamens
```

---

### lcase() ###

Die Funktion*** LCase*** wandelt alle Zeichen in Kleinbuchstaben.

```

UCase([Nachname]) & ", " & LCase([Vorname]) - ergibt z.B. *MUSTERMANN, max*
```

---

### ucase() ###

Die Funktion **UCase** wandelt alle Zeichen in Großbuchstaben.

```

UCase([Nachname]) & ", " & LCase([Vorname]) - ergibt z.B. *MUSTERMANN, max*
```

---

### trim() ###

**trim** entfernt Leerzeichen am Anfang und am Ende und gibt den restlichen Text zurück:

```

trim(" Hallo Welt   ") - liefert "Hallo Welt"

```

---

### string() ###

**string** hat zwei Parameter, eine Zahl *n* und einen Text. Sie wiederholt den Text *n* mal.

```

string(3; "Lauf! ") - liefert "Lauf! Lauf! Lauf! ".

```

---

### replace() ###

**replace** ersetzt Teile eines Textes durch einen anderen Text.

```

replace("race result"; " "; "-") - liefert "race-result".

```

---

### reduceChars() ###

**reduceChars** hat zwei Texte *a* und *b* als Parameter und gibt nur die Zeichen von *a* zurück, die in *b* vorkommen.

```

reduceChars("race result 11 software 2014"; "0123456789") - ergibt *112014*

```

---

### removeAccents() ###

**removeAccents** wandelt Buchstaben mit Akzent in Buchstaben ohne Akzent um:

```

removeAccents("Café au Lait") - liefert "Cafe au Lait"

```

---

### chr() ###

**chr** hat einen Paramter und wandelt einen ASCII-Code in das entsprechende Zeichen um.

```

chr(65) - liefert "A"
```

---

### asc() ###

**Asc** hat einen Parameter und gibt den ASCII-Code des ersten Zeichen des Parameters zurück.

```

asc("A") - liefert 65.
```

---

### ordinal() ###

**ordinal** gibt englische Ordinalzahlen zurück:

```

ordinal(1) - liefert "1st"

```
```

ordinal(3) - liefert "3rd"

```
```

ordinal(15) - liefert "15th"
```

---

### similarity() ###

Die Funktion **similarity** gibt die Ähnlichkeit von zwei Strings als Wert zwischen 0 und 1 zurück.

```

similarity("Hansaplast";"HansPlasta") - liefert 0.625

```
```

similartiy([Nachname];[Nachname]) - liefert 1
```

---

### CorrectSpelling() ###

Die Funktion **CorrectSpelling** konvertiert die Buchstaben von Vor- und Nachnamen in Groß- und Kleinbuchstaben, so wie man es erwarten würde. Das heißt, der erste Buchstabe wird groß und die folgenden klein geschrieben. Die Wörter "de", "der", "und", "van", "von" und "zu" werden immer kleingeschrieben:

```

CorrectSpelling("max VON uNd zu mustERMann") - liefert *Max von und zu Mustermann*
```

---

### stringCount() ###

**stringCount** hat zwei String-Parameter *a* und *b* und gibt zurück, wie oft *b* in *a* vorkommt.

```

stringCount("race result 11"; "r") - liefert 2

```

---

## Mathematische Funktionen ##

---

### int() ###

**int** liefert den ganzzahligen Teil einer Zahl zurück, z.B.

```

int(6.7) - liefert 6

```

---

### sqrt() ###

**sqrt** gibt die Quadratwurzel einer Zahl zurück, z.B.

```

sqrt(9) - gibt 3 zurück

```

---

### quersumme() ###

**quersumme** gibt die Quersumme einer Zahl zurück, z.B.

```

quersumme(423) - gibt 9 zurück

```

---

### abs() ###

**abs** wandelt negative Zahlen in positive um:

```

abs(-9) - liefert 9

```
```

abs(18) - liefert 18
```

---

### round() ###

**round** rundet eine ganze Zahl. Optional kann ein zweiter Parameter angegeben, der angibt auf wie viele Nachkommastellen gerundet werden sollen.

```

round(3.149) - liefert 3

```
```

round(3.149;2) - liefert 3.15
```

---

### speed() ###

Die Funktion **speed** berechnet die Geschwindigkeit in km/h (metrische Einheit) bzw. mph (angloamerikanische Einheiten) gemäß Ihrer Grundeinstellungen, z.B.

```

speed([Zeit10.Dezimal])

```

Wenn nicht die Streckenlänge des Wettbewerbs verwendet werden soll, kann diese als zweiter Parameter angegeben werden. Der dritte Parameter kann optional eine der folgenden Einheiten sein:

Meter - "m"
 Kilometer - "km"
 Meilen - "miles"

```

speed([Zeit10.Dezimal]; 5000)

```
```

speed([Zeit10.Dezimal]; 5000; "m")

```
```

speed([Zeit10.Dezimal]; 5; "km")

```

Mit Hilfe der [[@1083|format]]-Funktion kann die Ausgabe formatiert werden:

```

format(speed([Zeit10.Dezimal]); "s,k") & " km/h"
```

---

### pace() ###

Die Funktion **pace** berechnet entweder die Zeit pro Kilometer (metrische Einheit) oder die Zeit pro Meile (angloamerikanische Einheiten), z.B.

```

pace([Zeit10.Dezimal])

```

Wenn nicht die Streckenlänge des Wettbewerbs verwendet werden soll, kann diese als zweiter Parameter angegeben werden. Der dritte Parameter kann optional eine der folgenden Einheiten sein:

Meter - "m"
 Kilometer - "km"
 Meilen - "miles"

```

pace([Zeit10.Dezimal]; 5000)

```
```

pace([Zeit10.Dezimal]; 5000; "m")

```
```

pace([Zeit10.Dezimal]; 5; "km")

```

Mit Hilfe der [[@1083|format]]-Funktion kann die Ausgabe formatiert werden:

```

format(pace([Zeit10.Dezimal]); "m:ss") & " min/km"
```

---

## Zeit-Funktionen ##

Mit Zeit-Funktionen können Sie verschiedene Einzelergebnisse vergleichen und berechnen.

Die meisten Zeit-Funktionen verwenden das Format **TFunktion(a;b)**, wobei a und b die Spanne der Ergebnis IDs definieren, die für die Berechnung berücksichtigt werden, z.B.

TMin(1;10) - liefert die kleinste Zeit der Ergebnisse mit den IDs von 1 bis 10.

Einige Funktionen haben weitere Parameter, die zusammen mit der jeweiligen Funktion näher erläutert werden.

---

### TCount() ###

**TCount(a;b)** zählt, wie viele Zeiten in den Ergebnissen mit ID *a* bis *b* eingetragen sind, z.B.

TCount(1;10) - gibt zurück, wie viele Zeiten in der Ergebnissen mit ID 1 bis 10 eingetragen sind.

---

#### TCountIf() ####

**TCountIf(a;b;c;d)** zählt, wie viele Zeiten in den Ergebnissen *a* bis *b* größergleich *c* (in Sekunden) aber kleinergleich *d* (in Sekunden) sind, z.B.

TCountIf(21;25;25200;36000) - zählt, wie viele Ergebnisse mit ID 21-25 größergleich 25200 (07:00:00), aber kleinergleich 36000 (10:00:00) sind

---

#### TTCount() ####

**TTCount(a;b)** nimmt eine beliebige Anzahl an Ergebnis IDs und zählt, in wie vielen dieser Ergebnisse Zeiten eingetragen sind, z.B.

```

TTCount(10;20;30;40) - gibt zurück, wie viele Zeiten in den Ergebnissen mit den IDs 10, 20, 30 & 40 eingetragen sind.
```

---

### TSum() ###

Die Funktion **TSum(a;b)** ermittelt die Summe der Zeiten aller Ergebnissse mit den IDs *a* bis *b*.

```

TSum(10;12) - entspricht nz(T10)+nz(T11)+nz(T12)

```

Die Funktion *TSum(a;b;c;d)* ermittelt die Zeiten aller Ergebnisse mit den IDs *a* bis *b* und sortiert diese. Anschließend wird die Summe der besten *d* Zeiten gebildet und die Summe der *c-1* besten Zeiten abzogen.

```

TSum(10;15;1;2) - summiert die zwei besten Zeiten der Ergebnisse 10 bis 15.
TSum(10;15;3;3) - summiert die drei besten Zeiten der Ergebnisse 10 bis 15 und zieht die Summe der zwei besten Zeiten ab --> liefert die drittbeste Zeit der Ergebnisse 10 bis 15.
```

*TSum(a;b;c;d;1)* entspricht *TSum(a;b;c;d)*, sortiert die Zeiten aber absteigend.

---

#### TRSum() ####

**TRSum(a;b)**, **TRSum(a;b;c;d)**, **TRSum(a;b;c;d;1)** entsprechen [[@1094|TSum()]], verwenden aber die gerundeten Zeiten.

---

#### TTSum() ####

**TTSum() **nimmt eine beliebige Liste an Ergebnis IDs und gibt die Summe der vorliegenden Zeiten in diesen Ergebnissen wieder, z.B.

```

TTSum(10;20;30;40) - analog zu nz(T10)+nz(T20)+nz(T30)+nz(T40)
```

---

#### TTRSum() ####

**TTRSum() **entspricht [[@14952|TTSum()]], verwendet aber die gerundeten Zeiten.

---

### TMin() ###

**TMin(a;b)** gibt die kleinste Zeit oder den kleinsten Wert der Ergebnisse mit ID *a* bis *b*, z.B.

TMin(1;10) - liefert das Minimum der Ergebnisse mit ID 1 bis 10.

---

#### TRMin() ####

**TRMin(a;b)** entspricht [[@1100|TMin()]], verwendet aber die gerundeten Zeiten.

TRMin(1;10) - liefert die gerundete kleinste Zeit aus den Ergebnissen 1 bis 10.

---

#### TMinID() ####

**TMinID(a;b)** entspricht [[@1100|TMin()]], gibt aber die ID des Ergebnisses zurück, in dem das Minimum gespeichert ist.

TMinID(1;10) - liefert die ID des Ergebnisses mit der kleinsten Zeit aus den Ergebnissen mit ID 1 bis 10.

---

#### TMinText() ####

**TMinText(a;b)** entspricht [[@1100|TMin()]], aber liefert die formatierte Zeit des Ergebnisses.

---

#### TMinName() ####

**TMinName(a;b)** entspricht [[@1100|TMin()]], gibt aber den Namen des Ergebnisses zurück, in dem das Minimum gespeichert ist.

Es kann nur direkt in Ausgabelisten oder benutzerdef. Feldern/Funktionen verwendet werden, nicht aber in Ergebnisse, da es einen Textwert zurückgibt.

TMinName(1;10) - liefert den Namen des Ergebnisses mit der kleinsten Zeit aus den Ergebnissen 1 bis 10.

---

#### TTMin() ####

**TTMin()** nimmt eine beliebige Liste von Ergebnis IDs und gibt die kleinste Zeit oder den kleinsten Wert dieser Ergebnisse zurück, z.B.

```

TTMin(11;21;31;41) - liefert die kleinste Zeit aus den Ergebnissen mit den IDs 11, 21, 31 & 41.
```

---

#### TTRMin() ####

**TTRMin()** entspricht [[@14947|TTMin()]], aber liefert die gerundete Zeit des Ergebnisses mit der kleinsten Zeit.

---

#### TTMinID() ####

**TTMinID() **entspricht [[@14947|TTMin()]], aber gibt die ID des kleinsten Ergebnisses zurück.

---

#### TTMinText() ####

**TTMinText() **entspricht [[@14947|TTMin()]], liefert aber die formatierte Zeit des kleinsten Ergebnisses.

---

#### TTMinName() ####

**TTMinName() **entspricht [[@14947|TTMin()]], aber liefert den Namen des Ergebnisses mit der kleinsten Zeit.

---

#### TTMinIndex() ####

**TTMinIndex() **entspricht [[@14947|TTMin()]], aber gibt die Position des Ergebnisses mit der kleinsten Zeit aus der Liste wieder, z.B. 

```

e.g. TTMinIndex(10;20;30;40) - liefert eine Zahl zwischen 1 und 4, je nachdem welches Ergebnis der IDs 10, 20, 30 & 40 die kleinste Zeit hat.
```

---

#### TMinIf() ####

**TMinIf(a;b;c;d)** gibt die minimalste Zeit aus den IDs *a *bis *b *zurück, welche größer ist als *c* aber kleiner als *d*.

```

z.B. TMinIf(1;10;3600;3900) - gibt die minimalste Zeit aus den Ergebnissen mit ID 1 bis 10 zurück, welche größer ist als 1h aber kleiner als 1h05m.
```

---

#### TMinIfID() ####

**TMinIfID(a;b;c;d**) hat die gleiche Funktionalität wie [[@31001|TMinIf()]], liefert aber die niedrigste ID der Ergebnisse *a *bis *b*, die größer oder gleich *c*, aber kleiner oder gleich *d* sind.

---

### TAvg() ###

**TAvg(a;b)** entspricht [[@1094|TSum()]], ermittelt aber den Durchschnitt statt der Summe der Zeiten.

TAvg(1;10) - liefert den Durchschnitt aller Zeiten aus den Ergebnissen mit den IDs 1 bis 10.

---

#### TRAvg() ####

**TRAvg(a;b)** entspricht [[@1099|TAvg()]], verwendet aber die gerundeten Zeiten.

---

#### TTAvg() ####

**TTAvg()** nimmt eine beliebige Liste an Ergebnis IDs und gibt den Durchschnitt dieser Ergebnisse zurück.

```

TTAvg(10;20;30;40) - liefert den Durchschnitt der Ergebnisse mit den IDs 10, 20, 30 & 40.returns the average time of results 10,20,30 & 40
```

---

#### TTRAvg() ####

**TTRAvg()** entspricht [[@14962|TTAvg()]], verwendet aber gerundete Zeiten.

---

### TMax() ###

Die Funktion **TMax(a;b)** ermittelt das Maximum der Zeiten aller Ergebnisse mit den IDs von *a* bis *b*.

z.B. TMax(1;10) - liefert die maximale Zeit aller ERgebnisse mit den IDs 1 bis 10.

---

#### TRMax() ####

**TRMax(a;b) **entspricht [[@1101|TMax()]], verwendet aber die gerundeten Zeiten.

---

#### TMaxID() ####

**TMaxID(a;b)** entspricht [[@1101|TMax()]], gibt aber die ID des Ergebnisses zurück, in dem das Maximum gespeichert ist.

---

#### TMaxText() ####

**TMaxText(a;b)** entspricht [[@1101|TMax()]], aber liefert die formatierte Zeit des Ergebnisses.

---

#### TMaxName() ####

**TMaxName(a;b)** entspricht [[@1101|TMax()]], gibt aber den Namen des Ergebnisses zurück, in dem das Maximum gespeichert ist.

Die Funktion kann nur in Ausgabelisten oder benutzerdef. Feldern/Funktionen verwendet werden. Da sie einen Textwert liefert, ist sie nicht für die Ergebnisberechnung geeignet.

TMaxName(1;10) - liefert den Namen des Ergebnisses mit der größten Zeit aus den Ergebnissen 1 bis 10.

---

#### TTMax() ####

**TTMax() **nimmt eine beliebige Liste von Ergebnis IDs und gibt die größte Zeit oder den größten Wert dieser Ergebnisse zurück, z.B.

```

TTMax(11;21;31;41) - liefert die größte Zeit aus den Ergebnissen mit den IDs 11, 21, 31 & 41.
```

---

#### TTRMax() ####

**TTRMax()** entspricht [[@14946|TTMax()]], aber liefert die gerundete Zeit des Ergebnisses mit der kleinsten Zeit.

---

#### TTMaxID() ####

**TTMaxID() **entspricht [[@14946|TTMax()]], aber gibt die ID des größten Ergebnisses zurück.

---

#### TTMaxText() ####

**TTMaxText()** entspricht [[@14946|TTMax()]], liefert aber die formatierte Zeit des größten Ergebnisses.

---

#### TTMaxName() ####

**TTMaxName()** entspricht [[@14946|TTMax()]], aber liefert den Namen des Ergebnisses mit der größten Zeit.

---

#### TTMaxIndex() ####

**TTMaxIndex() **entspricht [[@14946|TTMax()]], aber gibt die Position des Ergebnisses mit der kleinsten Zeit aus der Liste wieder, z.B.

```

TTMaxIndex(10;20;30;40) - liefert eine Zahl zwischen 1 und 4, je nachdem welches Ergebnis der IDs 10, 20, 30 & 40 die größe Zeit hat.
```

---

#### TMaxIf() ####

**TMaxIf(a;b;c;d)** gibt die maximale Zeit aus den Ergebnisses von *a *bis *b* zurück, welche größer oder gleich wie c ist, aber kleiner oder gleich wie *d*.

```

z.B. TMaxIf(1;10;3600;3900) - gibt die maximale Zeit aus den Ergebnissen mit ID 1 bis 10 zurück, welche größer oder gleich 1h ist aber kleiner oder gleich 1h05m.
```

---

#### TMaxIfID() ####

**TMaxIfID(a;b;c;d**) hat die gleiche Funktionalität wie [[@31002|TMaxIf()]], liefert aber die höchste ID der Ergebnisse *a *bis *b*, die größer oder gleich *c*, aber kleiner oder gleich *d* sind.

---

### TFirst() ###

**TFirst(a;b)** geht die Ergebnisse von *a* bis *b* durch und gibt die erste eingetragene Zeit zurück (niedrigste ID).

 Die Funktion **TFirst(a;b;c;d)** ermittelt die Zeiten aller Ergebnisse mit den IDs *a* bis *b* und sortiert diese. Anschließend werden nur noch das *c*-t-beste bis *d*-t-beste Ergebnise betrachtet und davon das erste (=niedrigste ID) zurückgegeben, z.B.

TFirst(1;10;1;3) - liefert von den 3 besten Zeiten aus Ergebnis ID 1-10 das Ergebnis mit der niedrigsten ID.

**TFirst(a;b;c;d;1)** entspricht **TFirst(a;b;c;d)**, sortiert die Zeiten aber absteigend.

**TFirst(a;b;0;0;0;c)** geht die Ergebnisse von *a* bis *b* durch und gibt die *c*-te eingetragene Zeit zurück, z.B.

TFirst(1;10;0;0;0;3) - liefert das dritte Ergebnis (gemäß Ergebnis ID), das innerhalb der Ergebnisse 1-10 eingetragen ist.

---

#### TRFirst() ####

**TRFirst(a;b)**, **TRFirst(a;b;c;d)**, **TRFirst(a;b;c;d;1) und TRFirst(a;b;0;0;0;c)** entsprechen [[@1095|TFirst()]], verwenden aber die gerundeten Zeiten.

---

#### TFirstID() ####

**TFirstID(a;b), TFirst(a;b;c;d), TFirst(a;b;c;d;1) und TFirst(a;b;0;0;0;d)** entsprechen [[@1095|TFirst()]], geben aber die ID des Ergebnisses zurück, in dem die erste Zeit gespeichert ist.

---

#### TFirstText() ####

**TRFirstText(a;b), TRFirstText(a;b;c;d), TRFirstText(a;b;c;d;1) and TRFirstText(a;b;0;0;0;c)** entsprechen [[@1095|TFirst()]], aber liefern die formatierte Zeit des entsprechenden Ergebnisses.

---

#### TFirstName() ####

**TFirstName(a;b)**, **TFirstName(a;b;c;d)**, **TFirstName(a;b;c;d;1) und TFirstName(a;b;0;0;0;c)** entsprichen [[@1095|TFirst()]], geben aber den Namen des Ergebnisses zurück, in dem die erste Zeit gespeichert ist.

Die Formeln können nur direkt in Ausgabelisten oder benutzerdef. Feldern/Funktionen verwendet werden, nicht aber in Ergebnissen, da sie einen Textwert zurückgeben.

---

#### TTFirst() ####

**TTFirst() **nimmt eine beliebige Liste von Ergebnis IDs und gibt die erste Zeit dieser Ergebnisliste zurück, z.B.

```

TTFirst(11;21;31;41) - liefert die erste Zeit aus den Ergebnissen mit den IDs 11, 21, 31 & 41 in dieser Reihenfolge.
```

---

#### TTRFirst() ####

**TTRFirst() **entspricht [[@14943|TTFirst()]], aber liefert die gerundete Zeit des ersten Ergebnisses.

---

#### TTFirstID() ####

**TTFirstID() **entspricht [[@14943|TTFirst()]], aber gibt die ID des ersten Ergebnisses zurück.

---

#### TTFirstText() ####

**TTFirstText()** entspricht [[@14943|TTFirst()]], aber liefert die formatierte Zeit des ersten Ergebnisses.

---

#### TTFirstName() ####

**TTFirstName() **entspricht [[@14943|TTFirst()]], aber liefert den Namen des ersten Ergebnisses.

---

#### TTFirstIndex() ####

**TTFirstIndex() **entspricht [[@14943|TTFirst()]], aber gibt die Position des Ergebnisses mit dem ersten Ergebnis aus der Liste wieder, z.B.

```

TTFirstIndex(10;20;30;40) - liefert eine Zahl zwischen 1 und 4, je nachdem welches Ergebnis der IDs 10, 20, 30 & 40 das erste mit einer Zeit ist.
```

---

### TLast() ###

**TLast(a;b)** geht die Ergebnisse von *a* bis *b* durch und gibt die letzte eingetragene Zeit zurück (höchste ID).

 Die Funktion *TLast(a;b;c;d)* ermittelt die Zeiten aller Ergebnisse mit den IDs *a* bis *b* und sortiert diese. Anschließend werden nur noch das *c*-t-beste bis *d*-t-beste Ergebnise betrachtet und davon das letzte (=höchste ID) zurückgegeben, z.B.

TLast(1;10;1;3) - liefert von den 3 besten Zeiten aus Ergebnis ID 1-10 das Ergebnis mit der höchsten ID.

**TLast(a;b;c;d;1)** entspricht **TLast(a;b;c;d)**, sortiert die Zeiten aber absteigend.

**TLast(a;b;0;0;0;c)** geht die Ergebnisse von *a* bis *b* durch und gibt die *c*-te eingetragene Zeit zurück, z.B.

TLast(1;10;0;0;0;3) - liefert das dritthöchste Ergebnis (gemäß Ergebnis ID), das innerhalb der Ergebnisse 1-10 eingetragen ist.

---

#### TRLast() ####

**TRLast(a;b)**, **TRLast(a;b;c;d)**, **TRLast(a;b;c;d;1) und TRLast(a;b;0;0;0;1)** entsprechen [[@1096|TLast()]], verwenden aber die gerundeten Zeiten.

---

#### TLastID() ####

**TLastID(a;b), TLastID(a;b;c;d), TLastID(a;b;c;d;1) und TLastID(a;b;0;0;0;c)** entsprechen [[@1096|TLast()]], geben aber die ID des Ergebnisses zurück, in dem die letzte Zeit gespeichert ist.

---

#### TLastText() ####

**TLastText(a;b), TLastText(a;b;c;d), TLastText(a;b;c;d;1) and TLastText(a;b;0;0;0;c)** entsprechen TLast(), aber liefern die formatierte Zeit des entsprechenden Ergebnisses.

Unter [TLast()]("race|result Knowledge Base > race|result 11 > Fields, Expressions and Functions > Functions > Result Functions > TLast()") finden Sie Anwendungsbeispiele hierfür.

---

#### TLastName() ####

**TLastName(a;b), TLastName(a;b;c;d), TLastName(a;b;c;d;1) und TLastName(a;b;0;0;0;c) **entsprechen [[@1096|TLast()]], geben aber den Namen des Ergebnisses zurück, in dem die letzte Zeit gespeichert ist.

---

#### TTLast() ####

TTLast() nimmt eine beliebige Liste von Ergebnissen und gibt die letzte Zeit dieser Ergebnisliste gemäß der Reihenfolge zurück.

```

z.B. TTLast(11;12;14;13) - liefert die letzte Zeit der Ergebnisse mit den IDs 11, 12, 14 & 13 in dieser Reihenfolge.
```

---

#### TTRLast() ####

**TTRLast() **entspricht [[@14940|TTLast()]], aber liefert die gerundete Zeit des letzten Ergebnisses mit einer Zeit.

---

#### TTLastID() ####

**TTLastID()** entspricht [[@14940|TTLast()]], aber gibt die ID des letzten Ergebnisses mit einer Zeit zurück.

---

#### TTLastText() ####

**TTLastText() **entspricht [[@14940|TTLast()]], aber liefert die formatierte Zeit des letzten Ergebnisses mit einer Zeit.

---

#### TTLastName ####

**TTLastName()** entspricht [[@14940|TTLast()]], aber liefert den Namen des letzten Ergebnisses mit einer Zeit.

---

#### TTLastIndex() ####

**TTLastIndex() **entspricht [[@14940|TTLast()]], aber gibt die Position des letzten Ergebnisses mit einer Zeit zurück.

```

z.B. TTLastIndex(10;20;30;40) - liefert eine Zahl zwischen 1 und 4, je nachdem welches Ergebnis der IDs 10, 20, 30 & 40 das letzte mit einer Zeit ist.
```

---

### T() ###

**T(x)** gibt den Wert in Ergebnis *x* als Dezimalzahl zurück.

T(x) Numerischer Wert (=Dezimalzeit) aus Ergebnis *x*. .ExistiertLiefert 1, wenn in Ergebnis *x* ein beliebiger Wert ist. .NameName von Ergebnis *x*, enstpricht TName(). .ÜberschriebenLiefert 1, wenn Ergebnis *x* überschrieben ist. .PositivLiefert 1, wenn in Ergebnis *x* ein Wert größer 0 ist.  .DezimalNumerischer Wert aus Ergebnis *x*. 
.GerundetGerundeter Wert aus Ergebnis *x*, gerundet gemäß [[@1178|Zeitrundung]], entspricht TR().
 .TextErgebnis *x* formatiert als Text im Format hh:mm:ss, entspricht TText().
 .InfoLiefert den Info-Text von Ergebnis *x*. Nicht anwendbar für Ergebnisse, die auf Rohdaten basieren.

Verzichten Sie innerhalb von Formeln auf die T()-Funktion - diese erzeugt unnötige Abhängigkeiten in Ihrer Datei!

---

#### TR() ####

**TR(x)** gibt den gerundeten Wert in Ergebnis *x* als Dezimalzahl zurück.
 Verzichten Sie innerhalb von Formeln auf die TR()-Funktion - diese erzeugt unnötige Abhängigkeiten in Ihrer Datei!

Siehe auch [[@1183|T()]], [[@1185|TText()]], [[@1203|TName()]].

---

#### TName() ####

**TName(x)** gibt den Namen des Ergebnisses mit ID *x* zurück.
 Verzichten Sie innerhalb von Formeln auf die TName()-Funktion - diese erzeugt unnötige Abhängigkeiten in Ihrer Datei!

Siehe auch [[@1183|T()]], [[@1184|TR()]], [[@1185|TText()]].

---

#### TText() ####

**TText(x) **gibt den formatierten Zeit-Wert in Ergebnis *x* zurück.
 Verzichten Sie innerhalb von Formeln auf die TText()-Funktion - diese erzeugt unnötige Abhängigkeiten in Ihrer Datei!

Siehe auch [[@1183|T()]], [[@1184|TR()]], [[@1203|TName()]].

---

### DMaxMin() ###

**DMaxMin(a;b;c)** geht die Ergebnisse *a* bis *b* durch und liefert das Maximum aller Zeiten kleiner *c*, z.B.

DMaxMin(1;10;3600) - liefert die größte Zeit innerhalb der Ergebnisse 1-10, die kleiner ist als 3600s (1 Stunde).

---

## Konvertierungsfunktionen ##

---

### urlencode() ###

 Die Funktion **urlencode** kodiert einen String als URL.

```
urlencode("race result") - gibt *race%20result* zurück
```

---

### NumberToWords() ###

 Die Funktion **NumberToWords(a;b;c)** konvertiert eine Zahl in englische Wörter. *b* wird nach dem ganzzahligen Teil eingefügt, *c* nach den Dezimalstellen.

```
NumberToWords([Startgeld];"Euro";"Cent") - gibt das Startgeld in Worten aus, z.B. "eighteen Euro and twenty Cent".
```

---

### ZahlInWort() ###

 Die Funktion **ZahlInWort(a;b;c)** konvertiert eine Zahl in deutsche Wörter. *b* wird nach dem ganzzahligen Teil eingefügt, *c* nach den Dezimalstellen.

```
ZahlInWort([Startgeld];"Euro";"Cent") - gibt das Startgeld in Worten aus, z.B. "achtzehn Euro und zwanzig Cent"
```

---

### TimeFromString() ###

 Die Funktion **TimeFromString** ist das Gegenteil zur [[@1083|format()]]-Funktion. Sie wandelt eine beliebig formatierte Zeit in einen Dezimalwert um:

```
TimeFromString("0:02:03,4") - liefert 123.4
```

---

### md5() ###

**md5(x) e**rrechnet den MD5-Hash eines Strings.


```
md5("race result") - liefert "02185E816175C3FC6255140D2BE222C3"
```

---

### crc7() ###

Der CRC7 Check wird für die Kommunikation mit mancher Drittanbieter-Hardware benötigt.

Das Ergebnus der crc7()-Function wird als Dezimalwert zurückgegeben.

```

crc7(2) - liefert 34
```

 

---

## Zeit- und Datumsfunktionen ##

---

### format() ###

**format** formatiert eine Zahl (erster Parameter) entsprechend eines [[@1177|Zeitformats]] (zweiter Parameter), z.B.:

```
format(123.45;"h:mm:ss,k") - liefert *0:02:03,4*
```

---

### date() ###

**date()** liefert das aktuelle Datum zum Rechnen:

```

[Veranstaltung.Datum]-[Date]  - liefert die Anzahl Tage bis zum Veranstaltungstag

```

**date(a)** liefert das aktuelle Datum formatiert gemäß *a*:

```

date("dd.mm.yyyy") - könnte z.B. *01.07.2014* zurückgeben

```

**date(a;b)** liefert das Datum *b* formatiert gemäß *a*:

```

date("mm/yyyy"; [Geburtstag]) - könnte z.B. *05/1970* zurückgeben
```

Die Funktion kann zudem verwendet werden, um einen Datums- oder Zeitstempel aus Datetime-Strings wie [Erstellt] oder [Geändert] zu extrahieren.

 

**Datumsformate:**

dTag des Monats (ohne führende Nullen)ddTag des Monats (mit führenden Nullen)dddTag des Monats als Ordinalzahl (nur auf Englisch)mMonat (ohne führende Nullen)mmMonat (mit führenden Nullen)mmmMonat als Text in Kurzform (English & German only)mmmmMonat als Text in Langform (English & German only)yy2-stellige Jahreszahlyyyy4-stellige JahreszahleTag der Woche als Zahl (1-7)eeTag der Woche als Text in Kurzform (English & German only)
eeeTag der Woche als Text in Langform (English & German only)aTag des JahreswwKalenderwocheisoweekJahr und KalenderwocheunixUnixzeit

 

**Zeitformate:**

hhStundennnMinutenssSekunden

---

### now() ###

**now()** liefert Datum mit Uhrzeit für Berechnungen:

```
now()-[Erstellt]  - liefert die Anzahl Tage seitdem der Teilnehmer-Datensatz angelegt wurde

```

---

### ElapsedTime() ###

**ElapsedTime(time; format)** erzeugt einen speziellen Text, der in Listen die laufende Zeit seit *time* anzeigt.

 Wenn der Parameter *format* nicht gesetzt wird, wird *HH:mm:ss* verwendet. Um negative Zeiten bzw. einen Countdown anzuzeigen, setzen Sie bei *format *ein Minuszeichen voran, z.B. "-HH:mm:ss". Setzen Sie bei *format* ein Pluszeichen (z.B. "+HH:mm:ss") wird dieses Zeichen immer vorangestellt.

ElapsedTime funktioniert nicht bei mehrtägigen Veranstaltungen, die über Mitternacht gehen.

---

### AgeOnDate() ###

**AgeOnDate(yyyy;mm;dd) **liefert das Alter eines Teilnehmers an einem bestimmten Datum mit 3 Parametern: Jahr, Monat und Tag.

---

## Überprüfungsfunktionen ##

---

### inRange() ###

Die Funktion **InRange(a;b) **liefert 1 zurück, wenn die Zahl *a* in dem Bereich *b* vorkommt, z.B. "1-10;15".

```

inRange([Startnr];"1-10;15") - gibt 1 zurück, wenn die Startnr. zwischen 1 und 10 liegt oder 15 ist.

```

---

### isNumeric() ###

Die Funktion **isNumeric** prüft, ob ein String nur die Zeichen 0,1,2,3,4,5,6,7,8,9 enthält:

```

isNumeric("12323") - liefert true

```
```

isNumeric("12W44") - liefert false
```

---

### isAlpha() ###

Die Funktion **isAlpha** prüft, ob ein String nur die Buchstaben A-Z/a-z enthält:

```

isAlpha("ASKDEO") - liefert true

```
```

isAlpha("Straße") - liefert false

```
```

isAlpha("K3") - liefert false
```

---

### hasChip() ###

**hasChip(transponder) **liefert 1, wenn dem Teilnehmer der übergebene Transponder-Code zugeordnet ist, andernfalls 0.

```

hasChip("NUSPW44") - liefert 1 oder 0

```

Die Zuordnung des Transponders kann über die Felder Transponder1, Transponder2 oder das Chip File erfolgen.

---

### ChipFileHas() ###

** ChipFileHas(transponder) **liefert 1, wenn der Transponder-Code ist im Chip File enthalten, 0 andernfalls

```

ChipFileHas("ZABCD12") - liefert 1 or 0

```

---

### search() ###

Die Funktion **search(a;b)** liefert 1 zurück, wenn alle Wörter von *b* in *a* vorkommen.

```

search("Die ist ein Text mit race und result"; "race result") - liefert 1

```
```

search("die ersten drei Buchstaben vom Alphabet kommen in diesem Text nicht vor"; "abc") - liefert 0
```

---

### isUCICode() ###

Die Funktion **isUCICode** prüft, ob der erste Parameter ein gültiger UCI-Code ist:

```

isUCICode("GER19810312") - liefert true

```
```

isUCICode("Ger13333") - liefert false
```

---

### isUCIID() ###

Die Funktion **isUCIID** prüft, ob der erste Parameter eine gültige UCI-ID ist:

```

isUCIID("98387437864") - liefert true

```
```

isUCIID("ABCD123") - liefert false
```

---

### hasEntryFee(StartgeldID) ###

**hasEntryFee(entryFeeID)** liefert 1, wenn das angegebene Startgeld dem Teilnehmer berechnet wird, andernfalls 0.

```

hasEntryFee(1) - returns 1 or 0
```

Sie finden die StartgeldID unter *Hauptfenster > Startgelder* neben dem entsprechenden Startgeldeintrag.

Diese Funktion kann nützlich sein als Filter in einer Ausgabeliste, um zu sehen, für welche Teilnehmer ein bestimmtes Startgeld berechnet wurde.

---

### isEligible() ###

**IsEligible(a;b;c) **liefert 1, wenn der Teilnehmer teilnahmeberechtigt für den Wettbewerb ist, basierend auf dem Geburtstag und Geschlecht (sofern zutreffend), 0 andernfalls.

```

isEligible("01/01/2000") - prüft, ob Teilnehmer mit Geburtsdatum 1.1.2000 im Wettbewerb des Teilnehmers teilnahmeberechtigt sind.
```

Die Funktion akzeootiert auch ein Jahr statt eines Datums.

```

isEligible(2000) - prüft, ob ein Teilnehmer mit Jahrgang 2000 teilnahmeberechtigt ist.
```

Der zweite Parameter ist optional und dient der Prüfung des Geschlechts.

```

isEligible([Geburtstag];"m") - prüft, ob das aktuelle Geburstdatum des Teilnehmers bei Männern für eine Teilnahmeberechtigung gilt. 
```

Der dritte optionale Parameter kann den Wettbewerb bestimmen.

```

isEligible([Geburtstag];[Geschlecht];2) - prüft, ob der Teilnehmemr im Wettbewerb 2 teilnahmeberechtigt ist.
```

Diese Funktion ist hilfreich bei Staffelanmeldungen, in denen die Daten der Teilnehmer in Zusatzfeldern gespeichert werden, aber dennoch auch auf eine Teilnahmeberechtigung geprüft werden sollen.

---

### isValidEmail() ###

**IsValidEmail() **liefert 1, wenn der String einer korrekten Email-Adresse entspricht, andernfalls 0.

```

isValidEmail("max.mustermann@gmail.com") - prüft ob max.mustermann@gmail.com eine technisch korrekte Email-Adresse (keine Prüfung ob sie auch existiert) ist.

```

---

## Datensatzübergreifende Funktionen ##

---

### BunchTime() ###

**BunchTime(rankID;****resultID;offset****)** berechnet die Bunch Time für Radrennen. Ist der Rückstand im Ergebnis (*resultID*) zwischen zwei Fahrern gemäß Platzierung (*rankID*) kleinergleich *offset* (in Sekunden), erhalten alle Fahrer dieser Gruppe die Zeit des ersten Fahrers. Ist das nicht der Fall, beginnt beim nächsten Fahrer eine neue Bunch Time.

```

BunchTime(1;11;1) 
```

---

### GapTimeTop() ###

Die Funktion **GapTimeTop(resultID;rankID;text first;time format) **dient dazu, den Zeitabstand zwischen einem Teilnehmer und dem ersten Teilnehmer auszugeben. *resultID* bestimmt, welches Ergebnis betrachtet wird, *rankID* bestimmt, wer der erste Teilnehmer ist, *text first* wird für den ersten Teilnehmer angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

GapTimeTop(1;2;"--";"+m:ss,kk") 

```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Standard-Werte.

---

### GapTimePrev() ###

Die Funktion **GapTimePrev(resultID;rankID;text first;time format)** dient dazu, den Zeitabstand zwischen einem Teilnehmer und dem vorherigen Teilnehmer auszugeben. *resultID* bestimmt, welches Ergebnis betrachtet wird, *rankID* bestimmt, wer der vorherige Teilnehmer ist, *text first* wird für den ersten Teilnehmer angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

GapTimePrev(1;2;"--";"+m:ss,kk") 

```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Default-Werte.

---

### GapTimeLast() ###



**GapTimeLast(resultID;rankID;text last;time format), **berechnet die Zeitdifferenz zwischen einem Teilnehmer und dem letzten Teilnehmer (höchste Platzierung beim Zeitpunkt der Berechnung). *resultID* bestimmt, welches Ergebnis betrachtet wird, *rankID* bestimmt, wer der letze Teilnehmer ist, *text first* wird für den letzten Teilnehmer angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

GapTimeLast(1;2;"--";"+m:ss,kk") 
```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Default-Werte.

---

### GapTimeNext() ###



**GapTimeNext(resultID;rankID;text last;time format)** berechnet die Zeitdifferenz zwischen einem Teilnehmer und dem nächsten Teilnehmer. *resultID* bestimmt, welches Ergebnis betrachtet wird, *rankID* bestimmt, wer der nächste Teilnehmer ist, *text first* wird für den letzten Teilnehmer angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

GapTimeLast(1;3;"--";"+m:ss,kk") 
```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Default-Werte.

---

### TeamGapTimeTop() ###

Die Funktion **TeamGapTimeTop(ResultNo;TeamScoreID;text first;time format) **dient dazu, den Zeitabstand zwischen einer Mannschaft und der ersten Mannschaft auszugeben. R*esultNo* bestimmt, welches Ergebnis betrachtet wird (1 bis 4), *TeamScoreI**D* bestimmt, welches die erste Mannschaft ist, *text first* wird für die erste Mannschaft angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

TeamGapTimeTop(1;2;"--";"+m:ss,kk")  - liefert den Rückstand des ersten Ergebnisses in Mannschaftswertung 2

```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Standard-Werte.

---

### TeamGapTimePrev() ###

Die Funktion **TeamGapTimePrev(resultNo;TeamScoreID;text first;time format)** dient dazu, den Zeitabstand zwischen einer Mannschaft und der vorherigen Mannschaft auszugeben. *resultNo* bestimmt, welches Ergebnis betrachtet wird (1 bis 4), *TeamScoreID* bestimmt, welches die vorherige Mannschaft ist, *text first* wird für den ersten Teilnehmer angezeigt, und *time format* bestimmt, wie die Differenzzeiten formatiert werden.

```

TeamGapTimePrev(1;2;"--";"+m:ss,kk") - liefert den Rückstand des ersten Ergebnisses in Mannschaftswertung 1

```

Der dritte und vierte Parameter können ausgelassen werden. "-" und "+HH:MM:ss,kk" sind die Default-Werte.

---

### DCount() ###

**DCount **zählt die Anzahl Teilnehmer, die einen [[@1109|Filter]] (erster Parameter) erfüllen:

```

DCount("[ImZiel]") - gibt die Anzahl Finisher zurück

```
```

DCount("T101>0 AND [Wettbewerb]=1") - returns the number of participants registered in Contest 1, who have a result in Result 101

```

Wenn Ihr Filter Text beinhaltet, müssen Sie diesen mit Anführungszeichen kennzeichnen. Beispiele:

```

DCount("[Geschlecht]=""f""") - Gibt die Anzahl weiblicher Teilnehmer zurück
```
```

DCount("[Verein]="""  & [Verein] & """") - Gibt die Anzahl Teilnehmer des gleichen Vereins wie der gewählte Teilnehmer zurück.

```

Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DCountDistinct() ###

**DCountDistinct()** bestimmt, wie viele unterschiedliche Werte eines Feldes exisiteren (erster Parameter), für aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DCountDistinct("[Verein]"; "[ImZiel]") - gibt die Anzahl unterschiedlicher Vereine im Ziel zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DSum() ###

**DSum **summiert die Werte eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DSum("[Alter]"; "[ImZiel]") - gibt die Summe der Alter aller Finisher zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DMin() ###

**DMin** bestimmt das Minimum eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DMin("[Alter]"; "[ImZiel]") - gibt das kleinste Alter aller Finisher zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DAvg() ###

**DAvg** bestimmt den Mittelwert eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DAvg("[Alter]"; "[ImZiel]") - gibt das Durchschnittsalter aller Finisher zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DMax() ###

**DMax** bestimmt das Maximum eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DMax("[Alter]"; "[ImZiel]") - gibt das größte Alter aller Finisher zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DFirst() ###

**DFirst** gibt den Wert eines Feldes (erster Parameter) des ersten Teilnehmer zurück, der einen [[@1109|Filter]] (zweiter Parameter) erfüllt:

```

DFirst("[Nachname]"; "[Startnr]=1") - gibt den Nachnamen des Teilnehmers mit Startnr. 1 zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DLast() ###

**DLast **gibt den Wert eines Feldes (erster Parameter) des letzten Teilnehmers zurück, der einen [[@1109|Filter]] (zweiter Parameter) erfüllt:

```

DLast("[Nachname]"; "[Startnr]<100") - gibt den Nachnamen des Teilnehmers mit Startnr. 99 zurück

```

Warum stehen Feldname und Filter in Anführungszeichen? Weil der Parameter der Name des Feldes ist - nicht dessen Inhalt!
 Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DConcat() ###

**DConcat **verbindet die (String-)Werte eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen.

Mit DConcat können Sie in einem Feld z.B. alle Teilnehmer mit demselben Nachnamen auflisten.

```

DConcat("#[Vorname] [Nachname] [crlf]"; "[Nachname]=""" & [Nachname] & """")

```

---

### DQuantile() ###

**DQuantile** berechnet das Quantil eines Feldes (erster Parameter) aller Teilnehmer, die einen [[@1109|Filter]] (zweiter Parameter) erfüllen:

```

DQuantile("[Zeit1.Dezimal]"; "[Zeit1.Positiv]"; 25) - berechnet das 25%-Quantil der Zeiten in Ergebnis 1

```

Beachten Sie, dass die Aggregationsfunktionen nicht sehr schnell sind und sparsam genutzt werden sollten.

---

### DFunktion() Erklärung ###

Datensatzübergreifende Funktionen sind durch die Notwendigkeit der Anführungszeichen komplex im Aufbau. Die verwendeten Parameter müssen als String geschrieben werden, für einen Vergleich des Parameters mit einem dynamischen Wert muss das entsprechende Feld aber auch mit seinem Wert in den String geholt werden. Nachfolgend finden Sie eine Erklärung, wie Sie DFunktionen schreiben.

## Standard Text String ##

Die nachfolgende Funktion liefert die Anzahl aller Teilnehmer, deren Geschlecht und Wettbewerb mit dem gesuchten Teilnehmer übereinstimmen.

```

DCount("[Wettbewerb]=" & [Wettbewerb] & " AND [Geschlecht]=""" & [Geschlecht] & """")

```
* Die ersten gelben Anführungszeichen öffnen den String, die zweiten gelben schließen diesen.
* Das kaufmännische Und verbindet den gelben String mit dem Werte von [Wettbewerb].
* Da [Wettbewerb] numerisch ist und kein String, muss der Wert nicht mit Anführungszeichen umklammert werden. Als Filter gelesen entspricht der obige String folgendem, wenn der Teilnehmer in Wettbewerb 1 ist.
```

[Wettbewerb]=1
```
* Die ersten orangen Anführungszeichen öffnen einen neuen String und die zweiten orangen schließen diesen.
* Durch die ersten grünen Anführungszeichen werden die zweiten grünen Anführungszeichen als String innerhalb der orangen Anführungszeichen geschrieben. Bei der Berechnung sieht der String innerhalb der orangen Anführungszeichen dann wie folgt aus (beachten Sie das Leerzeichen vor AND)
```

 AND [Geschlecht]="
```
* Ein kaufmännisches Und verbindet wieder den orangen String mit dem Wert von [Geschlecht]. Der resultierende zusammengeführte String für einen männlichen Teilnehmer wäre daher wie folgt:
```

 AND [Geschlecht]="m
```
* Die ersten roten Anführungszeichen öffnen einen neuen String und die zweiten roten schließen diesen.
* Durch die ersten blauen Anführungszeichen werden die zweiten blauen Anführungszeichen als String innerhalb der beiden roten Anführungszeichen geschrieben.
* Bei der Berechnung werden die zweiten grünen Anführungszeichen mit den zweiten blauen Anführungszeichen kombiniert, die den Wert von [Geschlecht] umklammern. Diese werden benötigt, da [Geschlecht] selbst ein String und keine Zahl ist.
* Sobald alle Bestandteile zusammengeführt sind und die Funktion berechnet wird, ergibt das folgenden String innerhalb der DCount()-Funktion
```

[Wettbewerb]=1 UND [Geschlecht]="m"
```

 

---

## Andere Funktionen ##

---

### nz() ###

Die Funktion **nz** dient primär für [[@1153|Formelergebnisse]]. Ausdrücke mit [[@1084|Operator]] können nur ausgewertet werden, wenn beide Operanden vorhanden sind (nicht NULL sind). Beispielsweise kann die Formel *T2-T1* nur ausgewertet werden, wenn beide Zeiten der Ergebnisse 1 und 2 existieren. Wollen Sie aber die Formel auch auswerten, wenn ein Operand nicht existiert, benötigen Sie die nz-Funktion, die 0 zurückliefert, wenn der Parameter nicht existiert (NULL ist). Im Beispiel der Nettozeitmessung wollen Sie vielleicht die Nettozeit berechnen, auch wenn die Startzeit nicht vorliegt; nicht aber wenn die Zielzeit nicht vorliegt. So ergibt sich die Formel:

```

T2-nz(T1)
```

---

### min() ###

**min** hat eine beliebige Anzahl Parameter und gibt das Minimum dieser Parameter wieder:

```

min(2;3;1;5;6) - liefert 1

```
```

min([Jahrgang];[Startnr]) - liefert den Jahrgang oder die Startnummer, je nachdem was kleiner ist
```

---

### max() ###

**max** hat eine beliebige Anzahl Parameter und gibt das Maximum aller Parameter wieder:

```

max(2;3;1;5;6) - liefert 6

```
```

max([Jahrgang];[Startnr]) - liefert den Jahrgang oder die Startnummer, je nachdem was größer ist
```

---

### first() ###

first() hat eine beliebige Anzahl Parameter und gibt den ersten Parameter (in der gelisteten Reihenfolge) zurück, der nicht null ist. 

```

first(T11;T12;T0) - liefert T0, wenn sowohl T11 als auch T12 null sind. Ansonsten den ersten Parameter, der nicht null ist.
```

---

### last() ###

last() hat eine beliebige Anzahl Parameter und gibt den letzten Parameter (in der gelisteten Reihenfolge) zurück, der nicht null ist. 

```

last(T11;T12;T0) - liefert T0, selbst wenn T11 und T12 nicht null sind.

```

---

### table() ###

Die **table**-Funktion gibt einen Wert aus der Tabelle zurück, wenn Sie [[@3977|Formelergebnisse]] verwenden. Die Parameter entsprechen den 4 Indizes der Tabelle. Beispiel:

```

table([Rank1];0;0;0) - könnte einen Punktewert aus der Tabelle zurückgeben
```

---

### Setting() ###

**Setting **hat einen Parameter und liefert den Wert der entsprechenden Einstellung zurück. Dies kann auch über die direkte Eingabe der [[@2768|Datenfelder der Veranstaltung]] erreicht werden.

```

Setting("EventName") - gibt den Veranstaltungsnamen zurück.

```

---

### GetSex() ###

**GetSex** gibt das zu einem Vornamen gespeicherte Geschlecht zurück.

```

GetSex("Frank") - gibt *m* zurück

```
```

GetSex("Martina") - gibt *f* zurück

```
```

GetSex("Andrea") - gibt *f/m* zurück (meistens weiblich, in Italien männlich)
```

---

### translate() ###

**tanslate **dient zum Übersetzen des Geschlechts eines Teilnehmers. Wenn der erste Parameter 'f' ('m', 'a') ist, wird der zweite (dritte, vierte) Parameter zurückgegeben und sonst der erste Parameter. Ist der erste Parameter weder 'f' noch 'm' oder 'a', wird der erste Parameter zurückgegeben. Verwenden Sie z.B. den Ausdruck:

```

translate([Geschlecht];"Frauen";"Männer";"Divers")

```

*Translate* ist äquivalent zu:

```

translate(a; b; c; d) := switch([a]="f";[b]; [a]="m";[c]; [a]="a";[d]; 1;[a])

```

---

### Rank() ###

**Rank(*x*)** liefert die Platzierung des Teilnehmers gemäß der Definition für *x*, wobei *x* auch eine Formel sein kann. Mit **RankP(*x*)** wird die Platzierung mit einem Punkt am Ende ausgegeben.

Zum Beispiel:

Rank(TLastID(a;b)) - liefert die Platzierung mit der ID, die durch TLastID(a;b) geliefert wird.

---

### RankMax() ###

RankMax(X) gibt die Anzahl der Teilnehmer zurück, welche in der selben Platzierung gewertet wurden (in Abhängigkeit der dortigen Gruppierung). Die ID der Platzierung wird dabei mit X übergeben, wobei X auch eine Formel darstellen kann.

z.B. 

```

RankMax(TLastID(a;b)) - Gibt die Anzahl der Teilnehmer zurück, die in der gleichen Platzierung gewertet wurden mit der Platzierungs-ID die über TLastID(a;b) definiert wird.
```

---

### Text() ###

Um einen Wert eines Feldes (z.B. [Wettbewerb.Name] oder [Veranstaltung.Name]) in der korrekten Sprache in Ausgabelisten, Emails/SMS, Urkunden etc. anzuzeigen, nutze die *Text() *Funktion.

```

Text([Feld];"Länder code")
```

Das entsprechende Feld will in der angegeben Sprache angezeigt, z.B. wird *Text([Wettbewerb.Name];"en") *den Namen des Wettbewerbs auf englisch ausgeben, wohingegen *Text([Wettbewerb.Name];"de") *den deutschen Namen des Wettbewerbs zurückgibt.

Siehe [[@14363|hier]] für mehr Informationen inwieweit die *Text() *Funktion verwendet werden kann und welche Länder codes zur Verfügung stehen.

---

### ChangeLink() ###

Die ChangeLink() Funktion wird in Zusammenhang mit den [[@32814|Anmeldeformularen]] des *Änderung *Typs verwendet, um eine eindeutige URL für jeden Teilnehmer zu generieren. Über diese URL kann der Teilnehmer sein persönliches Formular zur Einzel-Änderung aufrufen.

Diese URL beinhaltet den Formular-Namen, einen eindeutigen Schlüssel für das Formular, eine ID für den Teilnehmer und einen Sicherheitsschlüssel für den Teilnehmer, um die Einzel-Änderung aufzurufen. 

Der Name des Formulars wird als Parameter übergeben. Standardmäßig wird die URL und das Änderungs-Formular auf der my.raceresult Seite gehostet. 

```

ChangeLink("EinzelÄnderung") - gibt die eindeutige URL des Formulars der Änderung *EinzelÄnderung *zurück. 
```

Sind die Anmelde-Formulare in Gruppen aufgeteilt, muss sowohl der Name der Gruppe, als auch der Name des Änderungsformulars in der *ChangeLink()* Funktion hinterlegt werden. Gruppen-Name und Formular-Name werden dabei mit einem vertikalen Strich von einander getrennt.

```

ChangeLink("Gruppe1|EinzelÄnderung") - gibt die eindeutige URL des Formulars der Änderung *EinzelÄnderung *aus *Gruppe1* zurück. 

```

Über einen zweiten Parameter kann optional das Ziel der URL übergeben werden. Dies kann dazu genutzt werden um das Änderungs-Formular über eine eigene URL in die eigene Website zu integrieren.

```

ChangeLink("SelfService"; "my") - gibt die standard my.raceresult URL zurück

ChangeLink("SelfService"; "events") - gibt eine URL zurück, welche zum events.raceresult server weiterleitet

ChangeLink("SelfService"; "www.mywebsite.com/event/reg") - gibt eine URL mit der angpassten URL zurück, die Abfrageparameter werden direkt nach dem "?" angehängt

```

Wenn die eigene Website als Ziel für das Änderungs-Formular verwendet werden soll, muss das Formular in die eigene Website, über die Nutzung der [[@3323|Website Integration]], integriert werden.

---

## Auswertungsfunktionen ##

---

### 2015 Age Graded Funktionen ###

Für neue Veranstaltungen sollten die [[@27206|2020 Age Graded Funktionen]] verwendet werden. Die 2015er-Funktionen werden für vergangene Events weiterhin unterstützt.

---

#### AgeGradedOC2015() ####

**AgeGradedOC2015(DistanzInMetern;Geschlecht) **gibt die Age Graded OpenClass-Standard-Zeit für die angegebene Streckenlänge zurück.
 Die zwei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedOC2015() - gibt die AgeGraded OpenClass-Standard-Zeit zurück.

```
```

AgeGradedOC2015([Wettbewerb.Länge];[Geschlecht]) - ist äquivalent sofern die Wettbewerblänge in Metern angelegt ist
```

---

#### AgeGradedLevel2015() ####

**AgeGradedLevel2015(Zeit;DistanzInMetern;Geschlecht;Alter)** berechnet das AgeGraded-Level. Die Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet. Als Zeit wird die Zeit des [[@1110|Zielergebnisses]] verwendet.

 Das Level wird wie folgt berechnet: [[@1212|AgeGradedOC2015()]]/([[@1213|AgeGradedFactor2015()]]*[DezimalZeit])

```

AgeGradedLevel2015() - liefert das AgeGraded-Level für das Zielergebnis.

```
```

AgeGradedLevel2015([Zeit.Dezimal];[Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent

```


 Um den Wert als Prozent-Zahl zu formatieren, können Sie verwenden:

```

format(100*AgeGradedLevel2015(); "s.k %")

```

---

#### AgeGradedFactor2015() ####

**AgeGradedFactor2015(DistanzInMeters;Geschlecht;Alter)** gibt den Faktor der AgeGraded-Wertungstabellen von 2015 zurück. Die drei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedFactor2015() - gibt den AgeGraded-Faktor zurück.

```
```

AgeGradedFactor2015([Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent wenn die Wettbewerblänge in Metern angelegt ist
```

---

### 2020 Age Graded Funktionen ###

---

#### AgeGradedOC2020() ####

**AgeGradedOC2020(DistanzInMetern;Geschlecht) **gibt die Age Graded OpenClass-Standard-Zeit für die angegebene Streckenlänge zurück.
 Die zwei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedOC2020() - gibt die AgeGraded OpenClass-Standard-Zeit zurück.

```
```

AgeGradedOC2020([Wettbewerb.Länge];[Geschlecht]) - ist äquivalent sofern die Wettbewerblänge in Metern angelegt ist
```

---

#### AgeGradedLevel2020() ####

**AgeGradedLevel2020(Zeit;DistanzInMetern;Geschlecht;Alter)** berechnet das AgeGraded-Level. Die Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet. Als Zeit wird die Zeit des [[@1110|Zielergebnisses]] verwendet.

 Das Level wird wie folgt berechnet: [[@1212|AgeGradedOC2020()]]/([[@1213|AgeGradedFactor2020()]]*[DezimalZeit])

```

AgeGradedLevel2020() - liefert das AgeGraded-Level für das Zielergebnis.

```
```

AgeGradedLevel2020([Zeit.Dezimal];[Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent

```


 Um den Wert als Prozent-Zahl zu formatieren, können Sie verwenden:

```

format(100*AgeGradedLevel2020(); "s.k %")
```

---

#### AgeGradedFactor2020() ####

**AgeGradedFactor2020(DistanzInMeters;Geschlecht;Alter)** gibt den Faktor der AgeGraded-Wertungstabellen von 2020 zurück. Die drei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedFactor2020() - gibt den AgeGraded-Faktor zurück.

```
```

AgeGradedFactor2020([Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent wenn die Wettbewerblänge in Metern angelegt ist
```

---

### 2025 Age Graded Funktionen ###

---

#### AgeGradedOC2025() ####

**AgeGradedOC2025(DistanzInMetern;Geschlecht) **gibt die Age Graded OpenClass-Standard-Zeit für die angegebene Streckenlänge zurück.
 Die zwei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedOC2020() - gibt die AgeGraded OpenClass-Standard-Zeit zurück.

```
```

AgeGradedOC2020([Wettbewerb.Länge];[Geschlecht]) - ist äquivalent sofern die Wettbewerblänge in Metern angelegt ist
```

---

#### AgeGradedLevel2025() ####

**AgeGradedLevel2025(Zeit;DistanzInMetern;Geschlecht;Alter)** berechnet das AgeGraded-Level. Die Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet. Als Zeit wird die Zeit des [[@1026|Zielergebnisses]] verwendet.

 Das Level wird wie folgt berechnet: [[@48161|AgeGradedOC2025()]]/([[@48163|AgeGradedFactor2025()]]*[DezimalZeit])

```

AgeGradedLevel2025() - liefert das AgeGraded-Level für das Zielergebnis.

```
```

AgeGradedLevel2025([Zeit.Dezimal];[Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent

```


 Um den Wert als Prozent-Zahl zu formatieren, können Sie verwenden:

```

format(100*AgeGradedLevel2025(); "s.k %")
```

---

#### AgeGradedFactor2025() ####

**AgeGradedFactor2025(DistanzInMeters;Geschlecht;Alter)** gibt den Faktor der AgeGraded-Wertungstabellen von 2025 zurück. Die drei Parameter sind optional. Wenn sie ausgelassen werden, werden die Werte des Teilnehmers verwendet.

```

AgeGradedFactor2025() - gibt den AgeGraded-Faktor zurück.

```
```

AgeGradedFactor2025([Wettbewerb.Länge];[Geschlecht];[Alter]) - ist äquivalent wenn die Wettbewerblänge in Metern angelegt ist
```

---

## Übersicht der Funktionen ##

**Type**  
  **[[@1084|Rechenoperatoren]]**+ (Addition)- (Subtraktion)* (Multiplikation)/ (Division) \ (Division ganzer Zahlen)% (Rest nach Division ganzer Zahlen)^ (Potenzieren): (Time Operator)     **[[@1084|Vergleichsoperatoren]]**< (kleiner)> (größer)= (gleich)<> (ungleich) <= (kleiner oder gleich)>= (größer oder gleich)       **[[@1084|Logische Operatoren]]**OR XOR (eines oder das andere)AND      **[[@1084|Mengen-Operatoren]] **INNIN (not in)   
    **[[@2954|Ablauf-Funktionen]]**[[@1058|if()]][[@1059|switch()]][[@1060|choose()]]      **[[@2956|String-Funktionen]]**[[@1067|left()]][[@1066|right()]][[@1068|mid()]][[@1069|instr()]] [[@1034|instr2()]][[@1075|val()]][[@1070|len()]][[@1071|lcase()]] [[@1072|ucase()]][[@1074|trim()]][[@1076|string()]][[@1077|replace()]] [[@1181|reduceChars()]][[@1206|removeAccents()]][[@1209|chr()]][[@1208|asc()]] [[@1210|ordinal()]][[@1008|similarity()]][[@1073|CorrectSpelling()]][[@1207|stringCount()]] [[@27021|SplitString()]]        **[[@2955|Mathematische Funktionen]]**[[@1061|int()]][[@1062|sqrt()]][[@1063|quersumme()]][[@1064|abs()]] [[@1065|round()]][[@1197|speed()]][[@1198|pace()]]      **[[@2970|Zeit-Funktionen]]**[[@1169|TCount()]][[@1097|TCountIf()]][[@1094|TSum()]][[@1044|TRSum()]] [[@1100|TMin()]][[@1046|TRMin()]][[@1103|TMinID()]][[@1102|TMinName()]] [[@1099|TAvg()]][[@1045|TRAvg()]][[@1101|TMax()]][[@1047|TRMax()]] [[@1164|TMaxID()]][[@1104|TMaxName()]][[@1095|TFirst()]][[@1048|TRFirst()]] [[@1165|TFirstName()]][[@1166|TFirstID()]][[@1096|TLast()]][[@1049|TRLast()]] [[@1168|TLastID()]][[@1167|TLastName()]][[@1183|T()]][[@1184|TR()]] [[@1203|TName()]][[@1185|TText()]][[@1043|TPrev()]][[@1098|DMaxMin()]] [[@31001|TMinIf()]][[@31002|TMaxIf()]]       **[[@2957|Konvertierungsfunktionen]]**[[@1081|urlencode()]][[@1078|NumberToWords()]][[@1079|ZahlInWort()]][[@1085|TimeFromString()]] [[@1080|md5()]][[@16996|crc7()]]       **[[@2958|Zeit- und Datumsfunktionen]]**[[@1083|format()]][[@1082|date()]][[@1215|now()]][[@1216|ElapsedTime()]] [[@15229|AgeOnDate()]]        **[[@2959|Überprüfungsfunktionen]]**[[@1086|inRange()]][[@1188|isNumeric()]][[@1091|isAlpha()]][[@1217|hasChip()]] [[@1190|search()]][[@1092|isUCICode()]][[@1214|isUCIID()]][[@26250|hasEntryFee(entryFeeID)]] [[@34099|isEligible()]][[@39470|isValidEmail()]]       **[[@2961|Datensatzübergreifende Funktionen]]**[[@4881|BunchTime()]][[@1093|GapTimeTop()]][[@1180|GapTimePrev()]][[@6917|TeamGapTimeTop()]] [[@6918|TeamGapTimePrev()]][[@1037|DCount()]][[@1038|DSum()]][[@1040|DMin()]] [[@1039|DAvg()]][[@1041|DMax()]][[@1042|DFirst()]][[@1218|DLast()]] [[@1201|DConcat()]][[@1199|DQuantile()]]       **[[@2960|Andere Functions]]**[[@1087|nz()]][[@1088|min()]][[@1089|max()]][[@14933|first()]] [[@14934|last()]][[@1036|table()]][[@1006|Setting()]][[@1007|GetSex()]] [[@1090|translate()]][[@8931|rank(x)]][[@23085|Text()]][[@32950|ChangeLink()]]     **[[@2965|Auswertungsfunktionen]]**[[@1212|AgeGradedOC2015()]][[@1211|AgeGradedLevel2015()]][[@1213|AgeGradedFactor2015()]]  [[@27207|AgeGradedOC2020()]][[@27208|AgeGradedLevel2020()]][[@27209|AgeGradedFactor2020()]] 

 