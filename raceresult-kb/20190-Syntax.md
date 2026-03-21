# Syntax #

**Definition von Syntax (Programmiersprache):** Die Syntax einer Computersprache ist das System aus Regeln, das die Kombination von Symbolen definiert, die als korrekt strukturiertes Dokument oder Teilstück einer Sprache angesehen werden.

**Definition von Syntax**: Die Anordnung von Symbolen und Zeichen für die Erstellung von Ausdrücken oder Funktionen.

# **Symbole und deren Namen** #

Die folgenden Zeichen werden bei der Erstellung von [[@1056|Ausdrücken]] und [[@1057|Funktionen]] verwendet.

[
Eckige Klammer auf]Eckige Klammer zu(Klammer auf)Klammer zu"Anführungszeichen|senkrechter Strich&kaufmännisches Und{Geschweifte Klammer auf}Geschweifte Klammer zu;Semikolon:Doppelpunkt#Raute

 

# Wann Sie welches Symbol verwenden sollten #

Wann verwenden wir **Eckige Klammern**?

Eckige Klammern werden verwendet, wenn ein [[@2757|Feld]] innerhalb eines [[@1056|Ausdrucks]] oder einer [[@1057|Funktion]] referenziert wird.

**Beispiel**: Um den Wettbewerb eines Teilnehmers zu erfahren, schreiben wir:

```

[Wettbewerb]
```

**Beispiel**: Um den Wettbewerb eines Teilnehmers mit einer bestimmten Wettbewerbs-ID zu vergleichen, schreiben wir:

```

[Wettbewerb] = 1
```

Wenn ein Teilnehmer in Wettbewerb 1 ist, erhalten wir bei Verwendung von [Wettbewerb] den Wert 1 zurück. Dadurch wird der Ausdruck korrekt, da 1 = 1 korrekt ist. Dies können wir zum Beispiel als Bedingung in einer if()-Formel verwenden oder in einem Filter.

 

Wann verwenden wir **Klammern**?

Klammern werden verwendet, um Parameter innerhalb einer [[@1057|Funktion]] zusammenzufassen.

**Beispiel**: Mittels einem if()-Statement wollen wir "ja" ausgeben, wenn ein Teilnehmer in Wettbewerb 1 ist, andernfalls "nein". Hierfür schreiben wir:

```

​​​​​​if(​[Wettbewerb]=1;"ja";"nein")
```

In diesem Beispiel verwenden wir die Klammern, um die zum if-Statement zugehörigen Parameter zusammenzufassen.

Klammern können auch verwendet werden, um die Reihenfolge von Operationen zu bestimmen, dies ist aus der Mathematik bekannt.

**Beispiel**: In einem Rennen mit einer variablen Anzahl Runden gibt es eine Auftaktrunde von 1km, die restlichen Runden sind 10 Kilometer lang. Um die absolvierte Strecke zu berechnen, benötigen wir mehrere Berechnungen, die wir wie folgt kombinieren und durch Verwendung von Klammern strukturieren:

```

​​​​​(​([AnzahlRunden]-1)*10)+1
```

Zunächst bestimmen wir, wie viele vollständige Runden ein Teilnehmer absolviert hat, wofür wir 1 von dem Datenfeld [AnzahlRunden] subtrahieren. Nun mulitplizieren wir diesen Wert mit 10. Abschließend addieren wir noch 1, da jeder Teilnehmer, der mindestens eine Runde absolviert hat, die kürzere Auftaktrunde beendet hat. Hat ein Teilnehmer 5 Runden absolviert, hat er 41 Kilometer zurückgelegt.

 

Wann verwenden wir **Geschweifte Klammern**?

Geschweifte Klammern werden verwendet, um den Wert des [[@1196|Datenmulitplikators]] auf [[@1120|Listen]] zu referenzieren.

**Beispiel**: Um auf die Runden 1 bis 3 zurückzugreifen, die als Runde1, Runde2 und Runde3 angelegt sind, schreiben wir:

```

[Runde{n}]

```

Wir hängen an den Text "Runde" den Wert des Datenmultiplikators an, der innerhalb der geschweiften Klammern definiert ist.

Geschweifte Klammern werden auch verwendet, um einen String in mehrere Sprachen zu übersetzen.

**Beispiel:** Wir wollen, dass bei obigem Beispiel "Yes" oder "No" angezeigt wird, wenn die Software oder my.raceresult.com auf Englisch verwendet wird, und "Si" oder "No" auf Spanisch:

```

​​​​​​if(​[Wettbewerb]=1;"{EN:yes|ES:si}";"no")
```

Beachten Sie, dass die Werte für die verschiedenen Sprachen durch einen senkrechten Strich getrennt werden.

**Beispiel**: Um den Ergebnis-Filter zu aktivieren, müssen Sie das Wort Selector in geschweifte Klammern setzen:

```

{Selector}.Zeit.Positiv
```

 

Wann verwenden wir **Anführungszeichen**?

Anführungszeichen werden verwendet, um einen String (Zeichenkette) zu referenzieren.

**Definition von String:** Ein String ist eine endliche Folge von Zeichen (z. B. Buchstaben, Ziffern, Sonderzeichen und Steuerzeichen) aus einem definierten Zeichensatz.

**Beispiel**: Um alle Teilnehmer mit dem Vornamen Max zu finden, können wir folgenden Filter verwenden:

```

[Vorname] = "Max"

```

Max ist in Anführungszeichen geschrieben, da es einen String darstellt, den wir vergleichen möchten. Vorname ist in eckigen Klammern, da es ein Feld ist, dessen Inhalt als String geliefert wird.

 

Wann verwenden wir ein **Semikolon**?

Ein Semikolon wird verwendet, um Parameter innerhalb einer [[@1057|Funktion]] zu trennen.

**Beispiel**: In einem if-Statement gibt es drei Parameter. Jeder Parameter muss durch ein Semikolon vom nächsten/vorherigen getrennt werden:

```

if([Wettbewerb]=1;"ja";"nein")
```

Wir überprüfen hier, ob der Wettbewerb = 1 ist. Wenn ja, dann liefert der Ausdruck "Ja", andernfalls "Nein".

 

Wann verwenden wir ein **kaufmännisches Und**?

Ein kaufmännisches Und wird verwendet, um Ausdrücke, Funktionen oder String miteinander zu verketten.

**Beispiel**: Um an den String "Max" das Datenfeld [Nachname] zu hängen, schreiben wir:

```

"Max " & [Nachname]

```

Ist der Nachname "Mustermann", würde dieser Ausdruck "Max Mustermann" liefern. Beachten Sie, dass das Leerzeichen im Auftaktstring enthalten ist.

 

Wann verwenden wir die **Raute**?

Eine Raute bedeutet, dass der nachfolgende Ausdruck Volltext ist. Somit müssen keine Anführungszeichen um einen String gesetzt werden und kein kaufmännisches Und zum Verketten von Inhalten verwendet werden. Felder und Funktionen müssen allerdings in eckige Klammern gesetzt werden.

**Beispiel**: Das vorherige Beispiel kann auch über folgenden Ausdruck erreicht werden:

```

#Max [Nachname]

```

 

 

 