# Filter #

An vielen Stellen in der *race result* Software finden Sie ein Textfeld zur Eingabe des Filters. Ein Filter ist ein Ausdruck, der entweder *true* oder *false* liefert. Er basiert auf Vergleichen, Bereichen und logischen [[@1084|Operatoren]].
 Feldnamen stehen dabei in eckigen Klammern und Werte (außer Zahlen) in doppelten Anführungszeichen. Z.B.:

```

[Nachname]="Müller"

```

Wenn Sie mehrere Filter miteinander verknüpfen wollen, können Sie die logischen Operatoren AND und OR verwenden:

```

[Nachname]="Müller" AND [Ort]="Hamburg"
```