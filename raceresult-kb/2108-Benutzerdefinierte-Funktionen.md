# Benutzerdefinierte Funktionen #

Genauso wie [[@1186|benutzerdefinierte Felder]] können Sie ebenfalls Ihre eigenen **Benutzerdefinierten Funktionen** definieren.

Angenommen Sie möchten die Groß- und Kleinschreibung von Wörtern ändern, so dass der erste Buchstabe groß und die restlichen Buchstaben kleingeschrieben werden. Dafür könnten Sie eine Funktion *RightCase* definieren:

```

RightCase(x)
ucase(left([x];1)) & lcase(mid([x]; 2))
```

Diese Funktion können Sie nun wie jede andere Funktion verwenden. Dieses Beispiel gibt *Raceresult* zurück:

```

RightCase("raCEreSuLt")

```

Benutzerdefinierte Funktionen können mehrere Parameter haben. Zum Beispiel könnten Sie eine Additionsfunktion *add *definieren:

```

add(x;y)
[x]+[y]

```

Die Namen der Parameter können frei gewählt werden. Innerhalb der Definition der Funktion müssen diese genau wie Felder in eckigen Klammern stehen.