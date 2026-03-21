# Operatoren #

Folgende **Operatoren** können Sie in Ausdrücken verwenden:

# Rechenoperatoren #

Mit diesen Rechenoperatoren können Sie ganz normal rechnen:

+Addition-Subtraktion*Multiplikation/Division\Division ganzer Zahlen%Rest nach Division ganzer Zahlen = modulo^Potenzieren
(Klammer auf)Klammer zu:Time Operator, multipliziert den linken Operanden mit 60 und addiert den rechten

Wollen Sie zum Beispiel Startnummer und Jahrgang addieren und das Ergebnis mit 2 multiplizieren, verwenden Sie diesen Ausdruck;

```

([Startnr] + [Jahrgang]) * 2

```

# Vergleichsoperatoren #

Verwenden Sie dieses Vergleichsoperatoren, um zwei Werte miteinander zu vergleichen:

<kleiner>größer=gleich<>ungleich<=kleiner oder gleich>=größer oder gleich

# Logische Operatoren #

Mit logischen Operatoren können Sie Bedingungen miteinander kombinieren, beispielsweise in [[@1109|Filtern]]. Folgende Operatoren stehen zur Verfügung:

* OR (mindestens einer der Werte ist gültig)
* XOR (Einer der beiden Werte ist wahr, nicht aber beide)
* AND

# Mengen-Operatoren #

* IN
* NIN (NOT IN)

Sie können mehrere Werte durch Kommata trennen.
 Beispiele:

```

[Wettbewerb] IN "2,4,8-10"

```
```

[Nachname] NIN "Müller,Meier,Hansen"
```