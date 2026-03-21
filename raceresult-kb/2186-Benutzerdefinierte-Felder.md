# Benutzerdefinierte Felder #

**Benutzerdefinierte Felder** erlauben, beliebigen [[@1056|Ausdrücken]] einen bestimmten Namen zuzuweisen, unter dem sie in der gesamten [[@1053|Veranstaltungsdatei]] aufgerufen werden können. 

 Standardmäßig ist zum Beispiel das benutzerdefinierte Feld *AnzeigeName* wie folgt definiert:

```

trim([Anrede] & " " & [Vorname] & " " & [Nachname])

```

*AnzeigeName* wird auf etlichen [[@1120|Listen]] benutzt, um diesen Ausdruck anzuzeigen. Wenn Sie sich hingegen entschließen, stattdessen auf allen Listen den Ausdruck

```

UCase([Nachname]) & ", " & [Vorname]

```

anzeigen zu wollen, können Sie einfach das benutzerdefinierte Feld entsprechend ändern, ohne jede einzelne Liste anpassen zu müssen.