# Ausdrücke #

RACE RESULT 12 unterstützt zwei unterschiedliche Arten von Ausdrücken. Bei **normalen Ausdrücken** stehen feste Texte in Anführungszeichen und Felder, Funktionen oder benutzerdefinierte Felder/Funktionen in eckigen Klammern. Der Text-Operator & verbindet die einzelnen Teile miteinander:

```

"Mein Name ist " & [Vorname] & " " & [Nachname]

```

Wenn Sie diesen Ausdruck auf einer Urkunde einfügen, könnte dort z.B. stehen: *Mein Name ist Max Mustermann*
 Bei so genannten **Volltext-Ausdrücken** schreiben Sie einfach einen Text, in dem Felder, Funktionen und benutzerdefinierte Felder/Funktionen in eckigen Klammern ersetzt werden. Um zu kennzeichnen, dass es sich um einen Volltext-Ausdruck handelt, muss eine Raute vorangestellt werden. Der obige Ausdruck entspräche:
 

```

#Mein Name ist [Vorname] [Nachname]

```


 Sie können in Ausdrücken ebenfalls [[@1057|Funktionen]], [[@1108|benutzerdefinierte Funktionen]], [[@1084|Operatoren]] und [[@1186|benutzerdefinierte Felder]] verwenden.

 