/* eslint-disable */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, Footer
} = require('docx');
const fs = require('fs');

const PAGE_W = 9356;
const MARGIN  = 851;

const SHADE_HEADER = { fill: '2E5EA8', type: ShadingType.CLEAR };
const SHADE_ALT    = { fill: 'EEF3FB', type: ShadingType.CLEAR };
const SHADE_NOTE   = { fill: 'FFF8E6', type: ShadingType.CLEAR };
const SHADE_CODE   = { fill: 'F3F3F3', type: ShadingType.CLEAR };
const SHADE_NONE   = { fill: 'FFFFFF', type: ShadingType.CLEAR };
const BD  = { style: BorderStyle.SINGLE, size: 1, color: 'BBBBBB' };
const CB  = { top: BD, bottom: BD, left: BD, right: BD };

function hc(text, width) {
  return new TableCell({
    borders: CB, width: { size: width, type: WidthType.DXA },
    shading: SHADE_HEADER, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 },
      children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 20, font: 'Arial' })]
    })]
  });
}

function dc(text, width, opts) {
  const o = opts || {};
  return new TableCell({
    borders: CB, width: { size: width, type: WidthType.DXA },
    shading: o.shade || SHADE_NONE, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.LEFT, spacing: { before: 60, after: 60 }, indent: { left: 80 },
      children: [new TextRun({ text, bold: o.bold || false, size: 19, font: o.code ? 'Courier New' : 'Arial' })]
    })]
  });
}

function tblRow(cells, alt) {
  return new TableRow({
    children: cells.map(function(c) {
      const shade = alt ? SHADE_ALT : ((c[2] && c[2].shade) ? c[2].shade : SHADE_NONE);
      return dc(c[0], c[1], Object.assign({}, c[2] || {}, { shade }));
    })
  });
}

function tbl(cols, rows) {
  return new Table({
    columnWidths: cols.map(function(c) { return c[1]; }),
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    rows: [new TableRow({ tableHeader: true, children: cols.map(function(c) { return hc(c[0], c[1]); }) })]
           .concat(rows.map(function(r, i) { return tblRow(r, i % 2 === 1); }))
  });
}

function h1(s) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(s)] }); }
function h2(s) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(s)] }); }
function h3(s) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(s)] }); }

function p(runs) {
  const children = Array.isArray(runs) ? runs : [new TextRun({ text: runs, size: 20, font: 'Arial' })];
  return new Paragraph({ spacing: { before: 80, after: 120 }, children });
}

function note(text) {
  return new Table({
    columnWidths: [PAGE_W], margins: { top: 80, bottom: 80, left: 160, right: 160 },
    rows: [new TableRow({ children: [new TableCell({
      borders: CB, width: { size: PAGE_W, type: WidthType.DXA }, shading: SHADE_NOTE,
      children: [new Paragraph({
        spacing: { before: 60, after: 60 }, indent: { left: 80 },
        children: [
          new TextRun({ text: 'Hinweis: ', bold: true, size: 19, font: 'Arial', color: '7D5A00' }),
          new TextRun({ text: text, size: 19, font: 'Arial', color: '7D5A00' })
        ]
      })]
    })] })]
  });
}

function codeblk(text) {
  return new Table({
    columnWidths: [PAGE_W], margins: { top: 40, bottom: 40, left: 160, right: 160 },
    rows: [new TableRow({ children: [new TableCell({
      borders: CB, width: { size: PAGE_W, type: WidthType.DXA }, shading: SHADE_CODE,
      children: [new Paragraph({
        spacing: { before: 80, after: 80 }, indent: { left: 120 },
        children: [new TextRun({ text: text, size: 18, font: 'Courier New' })]
      })]
    })] })]
  });
}

function gap() { return new Paragraph({ spacing: { before: 0, after: 120 }, children: [new TextRun('')] }); }

function t(s) { return new TextRun({ text: s, size: 20, font: 'Arial' }); }
function b(s) { return new TextRun({ text: s, size: 20, font: 'Arial', bold: true }); }
function c(s) { return new TextRun({ text: s, size: 19, font: 'Courier New' }); }

const W2 = [Math.round(PAGE_W / 2), Math.round(PAGE_W / 2)];
const RC = [700, 2000, 5500, 1156];

function rrow(id, name, formula, fmt, bold) {
  const idText = bold ? (id + ' ★') : id;
  return [
    [idText, RC[0], { bold: !!bold }],
    [name,   RC[1], { bold: !!bold }],
    [formula,RC[2], { code: true, bold: !!bold }],
    [fmt,    RC[3], { bold: !!bold }]
  ];
}

const ch = [];

// Title block
ch.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { before: 480, after: 120 }, children: [new TextRun('Turmbergrennen')] }));
ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 240 }, children: [new TextRun({ text: 'Ergebnisse & Wertungsstruktur', size: 32, font: 'Arial', bold: true, color: '444444' })] }));
ch.push(new Table({
  columnWidths: W2, margins: { top: 60, bottom: 60, left: 120, right: 120 },
  rows: [
    new TableRow({ children: [dc('Stand', W2[0], { bold: true }), dc('07.05.2026', W2[1])] }),
    new TableRow({ children: [dc('Veranstaltung', W2[0], { bold: true, shade: SHADE_ALT }), dc('Turmbergrennen', W2[1], { shade: SHADE_ALT })] }),
    new TableRow({ children: [dc('Ort', W2[0], { bold: true }), dc('Karlsruhe', W2[1])] }),
  ]
}));
ch.push(gap());

// 1
ch.push(h1('1  Ueberblick: Veranstaltungsstruktur'));
ch.push(p('Das Turmbergrennen besteht aus drei Wettbewerbs-Kontexten:'));
ch.push(tbl(
  [['ID', 700], ['Name', 2800], ['Bedeutung', PAGE_W - 700 - 2800]],
  [
    [['1', 700], ['Turmberg Radrennen', 2800],                         ['Nur Radrennen (Einzelzeitfahrt + Finale + optional Anhaengerrennen)', PAGE_W - 700 - 2800]],
    [['2', 700], ['Turmberg Berglauf', 2800],                          ['Nur Berglauf', PAGE_W - 700 - 2800]],
    [['3', 700], ['Doppelmeldung Radrennen und Berglauf', 2800],        ['Beides (Rad + Lauf)', PAGE_W - 700 - 2800]],
  ]
));
ch.push(gap());
ch.push(p([t('Contest 1 und 3 nehmen am Radrennen teil. Contest 2 und 3 am Berglauf. Diese Unterscheidung wird durch Vergleiche wie '), c('[CONTEST]<>2'), t(' (nicht Berglauf) oder '), c('[CONTEST]>=2'), t(' (Berglauf) abgebildet. Berechnungen fuer den falschen Contest liefern 0, sodass keine Zeitmessung entsteht.')]));
ch.push(p([b('Zwei Phasen des Radrennens: '), t('(1) Einzelzeitfahrt (EZF): Intervallstart, EZF-Zeit bestimmt Finale-Qualifikation. (2) Finale: Top-Platzierte der EZF fahren in A-, B-, C-Finale (Maenner) bzw. Frauenfinale.')]));
ch.push(gap());

// 2
ch.push(h1('2  Messstellen (Timing Points)'));
ch.push(p('Alle Messstellen: Typ 9 (Chip-Leser), Doppeldetektion 30 Sekunden (DDT).'));
ch.push(tbl(
  [['Name', 1400], ['Funktion', 6700], ['Farbe', 1256]],
  [
    [['START',     1400], ['Startzeiterfassung EZF (Chip-Leser)', 6700],                                ['#ffff80', 1256]],
    [['VORWARNER', 1400], ['Ankunftswarnung ca. 100 m vor Ziel - Grundlage der Moderator-Anzeige', 6700],['#80ffff', 1256]],
    [['ZIEL',      1400], ['Zielmessung fuer alle Rennen', 6700],                                       ['#80ff80', 1256]],
    [['TIMING',    1400], ['Allgemeiner Messpunkt (nicht aktiv zugewiesen)', 6700],                      ['-', 1256]],
    [['CHIPBACK',  1400], ['Chip-Rueckgabeerfassung nach der Veranstaltung', 6700],                      ['-', 1256]],
  ]
));
ch.push(note('Sobald ein Fahrer den Vorwarner passiert, erscheint er in der Moderator-Liste. Erst beim Ziel-Scan wird die endgueltige Zeit eingetragen.'));
ch.push(gap());

// 3
ch.push(h1('3  Ergebnisse (Results): Aufbau und Logik'));
ch.push(p([t('RaceResult speichert Zeitmessungen in nummerierten Result-Slots (T1, T2, ...). Rohdaten-Slots sind als '), c('(RAWDATA)'), t(' gekennzeichnet. Berechnete Slots enthalten Zeitformeln auf Basis anderer Slots.')]));
ch.push(p('Nummerierungskonvention: erste Ziffer = Wettkampf-Gruppe, zweite Ziffer = Rolle (0 = Start, 1 = Ziel, 2 = Vorwarner). Finale: Zehner 3x-6x. Das Symbol ★ markiert das ausgewertete Ergebnis.'));
ch.push(gap());

ch.push(h2('3.1  Einzelzeitfahrt / Radrennen'));
ch.push(tbl([['ID', RC[0]], ['Name', RC[1]], ['Formel', RC[2]], ['Format', RC[3]]], [
  rrow('T9',  'VergebeneStartzeit',          'if([CONTEST]<>2; [StartzeitEZF] - [IntervallEZF] + ([BIB]*[IntervallEZF]); 0)', 'hh:mm:ss', false),
  rrow('T10', 'MessungStartEinzelzeitfahrt', '(RAWDATA) @ START',                                                              '-',        false),
  rrow('T11', 'MessungZielEinzelzeitfahrt',  '(RAWDATA) @ ZIEL',                                                               '-',        false),
  rrow('T12', 'VorwarnerEinzelzeitfahrt',    '(RAWDATA) @ VORWARNER',                                                          '-',        false),
  rrow('T1',  'Einzelzeitfahrt',             'if([KeinEZF]=1 OR [CONTEST]=2; 0; T11 - if(T10>0; T10; T9))',                   'mm:ss,kk', true),
]));
ch.push(gap());
ch.push(p([b('T9 - VergebeneStartzeit: '), t('[StartzeitEZF] ist die Gesamtstartzeit, [IntervallEZF] der Startzeitabstand. Durch [BIB] x [IntervallEZF] bekommt jede Startnummer eine eindeutige Abfahrtzeit. Fuer Contest 2 wird 0 zurueckgegeben.')]));
ch.push(p([b('T1 - Einzelzeitfahrt: '), t('Wenn KeinEZF=1 (Ausfall/Ausschluss) oder Contest=2, wird 0 zurueckgegeben. Bei Chip-Startmessung (T10>0): T11-T10. Ohne Startchip wird die vergebene Startzeit genutzt: T11-T9 (Normalfall).')]));
ch.push(gap());

ch.push(h2('3.2  Anhaengerrennen'));
ch.push(p('Sonderwettbewerb fuer Teilnehmer mit Merkmal AYN1=1. Massenstart zur globalen Variable [StartzeitAnhaenger].'));
ch.push(tbl([['ID', RC[0]], ['Name', RC[1]], ['Formel', RC[2]], ['Format', RC[3]]], [
  rrow('T20', 'MessungStartAnhaenger', 'if([AYN1]=1; [StartzeitAnhaenger])', '-',        false),
  rrow('T21', 'MessungZielAnhaenger',  '(RAWDATA) @ ZIEL',                  '-',        false),
  rrow('T22', 'VorwarnerAnhaenger',    '(RAWDATA) @ VORWARNER',             '-',        false),
  rrow('T2',  'Anhaengerrennen',       'T21 - T20',                         'mm:ss,kk', true),
]));
ch.push(note('Kein Startchip: [StartzeitAnhaenger] ist eine feste Variable (gemeinsamer Massenstart). T20 wird nur fuer Teilnehmer mit AYN1=1 gesetzt.'));
ch.push(gap());

ch.push(h2('3.3  Berglauf'));
ch.push(p('Massenstart aller Berglauf-Teilnehmer (Contest 2 und 3) zur globalen Variable [StartzeitLauf].'));
ch.push(tbl([['ID', RC[0]], ['Name', RC[1]], ['Formel', RC[2]], ['Format', RC[3]]], [
  rrow('T30', 'LaufStart',       'if([CONTEST]>=2; [StartzeitLauf])', 'hh:mm:ss', false),
  rrow('T31', 'MessungZielLauf', '(RAWDATA) @ ZIEL',                  '-',        false),
  rrow('T32', 'VorwarnerLauf',   '(RAWDATA) @ VORWARNER',             '-',        false),
  rrow('T3',  'Laufzeit',        'T31 - T30',                         'mm:ss,kk', true),
]));
ch.push(gap());

ch.push(h2('3.4  Finale Radrennen (Gruppen 4-7)'));
ch.push(p([t('Alle vier Finale teilen sich den gemeinsamen ZIEL-Chip-Leser. Qualifikation wird ueber '), c('[RANK2]'), t(' (EZF-Gesamtplatz) in der Startformel kodiert: Falsch qualifizierte Fahrer bekommen keine Startzeit => kein Ergebnis.')]));
ch.push(gap());
ch.push(tbl(
  [['Finale', 2000], ['EZF-Platz', 1200], ['Start-Formel (Auszug)', 3400], ['Result', 700], ['Format', 2056]],
  [
    [['C-Finale Maenner', 2000], ['61-90 m', 1200], ['if([RANK2]>60 AND <=90 AND [SEX]="m"; [StartzeitCFinale])',    3400, { code: true }], ['T15', 700], ['mm:ss,kk', 2056]],
    [['B-Finale Maenner', 2000], ['31-60 m', 1200], ['if([RANK2]>30 AND <=60 AND [SEX]="m"; [StartzeitBFinale])',    3400, { code: true }], ['T4',  700], ['mm:ss,kk', 2056]],
    [['Finale Frauen',    2000], [' 1-30 f', 1200], ['if([RANK2]>0  AND <=30 AND [SEX]="f"; [StartzeitFrauenFinale])',3400, { code: true }], ['T5',  700], ['mm:ss,kk', 2056]],
    [['A-Finale Maenner', 2000], [' 1-30 m', 1200], ['if([RANK2]>0  AND <=30 AND [SEX]="m"; [StartzeitAFinale])',    3400, { code: true }], ['T6',  700], ['mm:ss,kk', 2056]],
  ]
));
ch.push(note('T15 (C-Finale) traegt eine abweichende ID, da das C-Finale nachtraeglich hinzugefuegt wurde. Messungs-IDs 35-37 folgen der 3x-Konvention.'));
ch.push(gap());

ch.push(h2('3.5  Chiprueckgabe'));
ch.push(p([b('T7000: '), c('(RAWDATAA) @ CHIPBACK'), t(' - erfasst die Chip-Rueckgabe nach der Veranstaltung. RAWDATAA uebernimmt nur den ersten Rohwert der Messstelle.')]));
ch.push(gap());

// 4
ch.push(h1('4  Spezielle Ergebnisse'));

ch.push(h2('4.1  Tagesbestzeiten (T7, T8)'));
ch.push(tbl([['ID', RC[0]], ['Name', RC[1]], ['Formel', RC[2]], ['Format', RC[3]]], [
  rrow('T7', 'TagesBeste',   'TTMin(1;4;5;6;15)',   'mm:ss,kk', false),
  rrow('T8', 'TagesBesteID', 'TTMinID(1;4;5;6;15)', 's',        false),
]));
ch.push(gap());
ch.push(p([b('TTMin(...) und TTMinID(...)'), t(' sind RaceResult-Funktionen, die das Minimum bzw. die ID des minimalen Ergebnis-Slots ueber eine Liste berechnen.')]));
ch.push(p([b('T7 TagesBeste: '), t('Kleinste Zeit aus T1 (EZF), T4 (B-Finale), T5 (Frauen-Finale), T6 (A-Finale) und T15 (C-Finale). Somit die schnellste Zeit eines Teilnehmers ueber alle Rennen des Tages.')]));
ch.push(p([b('T8 TagesBesteID: '), t('ID des Ergebnis-Slots, aus dem T7 stammt (z.B. 6 = A-Finale lieferte die Tagesbeste). Wird in Moderator-Listen fuer die Rekord-/Tagesbeste-Anzeige genutzt.')]));
ch.push(gap());

ch.push(h2('4.2  Streckenrekorde (T1001-T1004)'));
ch.push(p('Die Streckenrekorde vergleichen den historischen Rekord mit dem aktuell besten Tagesergebnis und zeigen das jeweils kleinere (schnellere) Ergebnis an. Dies ermoeglicht die Live-Anzeige "Neuer Rekord!", wenn ein Fahrer den bisherigen Rekord bricht.'));
ch.push(gap());
ch.push(p([b('Rekord-Variablen (muessen vor der Veranstaltung manuell gesetzt werden):')]));
ch.push(tbl([['Variable', W2[0]], ['Bedeutung', W2[1]]], [
  [['[RekordRadM]',        W2[0], { code: true }], ['Bisheriger Streckenrekord EZF/Finale Maenner',  W2[1]]],
  [['[RekordRadF]',        W2[0], { code: true }], ['Bisheriger Streckenrekord EZF/Finale Frauen',   W2[1]]],
  [['[RekordAnhaenger]',   W2[0], { code: true }], ['Bisheriger Streckenrekord Anhaengerrennen',     W2[1]]],
  [['[RekordSingleSpeed]', W2[0], { code: true }], ['Bisheriger Streckenrekord Single Speed',        W2[1]]],
  [['[RekordLaufM]',       W2[0], { code: true }], ['Bisheriger Streckenrekord Berglauf Maenner',    W2[1]]],
  [['[RekordLaufF]',       W2[0], { code: true }], ['Bisheriger Streckenrekord Berglauf Frauen',     W2[1]]],
]));
ch.push(gap());
ch.push(p([b('RANK-Ausdruecke in den Rekord-Formeln:')]));
ch.push(tbl([['RANK-Ausdruck', W2[0]], ['Bedeutet', W2[1]]], [
  [['[RANK11Top7]', W2[0], { code: true }], ['Beste 7 Zeiten aus T11 (Ziel-Rohzeit EZF) - 7 schnellste EZF-Zielankunften', W2[1]]],
  [['[RANK6Top2]',  W2[0], { code: true }], ['Top-2 aus T6 (MaennerFinaleA)',              W2[1]]],
  [['[RANK5Top1]',  W2[0], { code: true }], ['Beste Zeit aus T5 (FrauenFinale)',            W2[1]]],
  [['[RANK16Top3]', W2[0], { code: true }], ['Top-3 aus T16 (vermutlich interner Alias)',   W2[1]]],
]));
ch.push(gap());
ch.push(tbl(
  [['ID', 800], ['Name', 1800], ['Formel', 4600], ['Beschreibung', PAGE_W - 800 - 1800 - 4600]],
  [
    [['T1001', 800], ['StreckenRekordMW',       1800], ['switch([SEX]="f"; if([RANK11Top7]<[RekordRadF]; [RANK11Top7]; [RekordRadF]); [SEX]="m"; if([RANK11Top7]<[RekordRadM]; [RANK11Top7]; [RekordRadM]))', 4600, { code: true }], ['Min. Tagesbester & Rekord, nach Geschlecht', PAGE_W - 800 - 1800 - 4600]],
    [['T1002', 800], ['StreckenRekordAnhaenger', 1800], ['if([RANK6Top2]<[RekordAnhaenger]; [RANK6Top2]; [RekordAnhaenger])',     4600, { code: true }], ['Min. Top-2 A-Finale & Rekord',        PAGE_W - 800 - 1800 - 4600]],
    [['T1003', 800], ['StreckenRekordEingang',   1800], ['if([RANK5Top1]<[RekordSingleSpeed]; [RANK5Top1]; [RekordSingleSpeed])', 4600, { code: true }], ['Min. Frauenfinale-Bester & Rekord',   PAGE_W - 800 - 1800 - 4600]],
    [['T1004', 800], ['StreckenRekordLaufMW',    1800], ['switch([SEX]="f"; if([RANK16Top3]<[RekordLaufF]; [RANK16Top3]; [RekordLaufF]); [SEX]="m"; if([RANK16Top3]<[RekordLaufM]; [RANK16Top3]; [RekordLaufM]))', 4600, { code: true }], ['Min. Top-3 & Rekord, nach Geschlecht', PAGE_W - 800 - 1800 - 4600]],
  ]
));
ch.push(note('In Listen und Moderator-Anzeige: Ist die Zielzeit gleich dem Streckenrekordwert (z.B. T1 = T1001), hat der Fahrer gerade den Streckenrekord gebrochen.'));
ch.push(gap());

ch.push(h2('4.3  Sonstige spezielle Ergebnisse'));
ch.push(p([b('AnzahlRadLaufZiel (T5000): '), t('Zaehlt, wie viele der beiden Disziplinen (TIMESET1 = Rad, TIMESET3 = Lauf) fuer einen Doppelmelder bereits eine Zielankunft haben (0, 1 oder 2). Nuetzlich fuer Contest 3.')]));
ch.push(p([b('Video-Offsets (T6001-T6006): '), t('Zeitabstand zwischen Zieleinlauf und Videostart ([VideoStart] = manuell gesetzte Variable). Ermoeglicht die schnelle Videosuche fuer jeden Fahrer.')]));
ch.push(tbl([['ID', 1000], ['Formel', 3500], ['Fuer Wettbewerb', PAGE_W - 1000 - 3500]], [
  [['T6001', 1000], ['T11 - VideoStart', 3500, { code: true }], ['EZF',           PAGE_W - 1000 - 3500]],
  [['T6002', 1000], ['T21 - VideoStart', 3500, { code: true }], ['Anhaengerrennen',PAGE_W - 1000 - 3500]],
  [['T6003', 1000], ['T31 - VideoStart', 3500, { code: true }], ['Berglauf',       PAGE_W - 1000 - 3500]],
  [['T6004', 1000], ['T41 - VideoStart', 3500, { code: true }], ['B-Finale',       PAGE_W - 1000 - 3500]],
  [['T6005', 1000], ['T51 - VideoStart', 3500, { code: true }], ['Frauen-Finale',  PAGE_W - 1000 - 3500]],
  [['T6006', 1000], ['T61 - VideoStart', 3500, { code: true }], ['A-Finale',       PAGE_W - 1000 - 3500]],
]));
ch.push(gap());

// 5
ch.push(h1('5  Gesamte Wertungsstruktur'));
ch.push(p([t('Die Wertungen basieren auf vorberechneten '), b('Platzierungsfeldern'), t(' (Custom Fields), die RaceResult nach jedem Zeitimport neu berechnet. Anzeigefeld ...Plp (Suffix p) gibt DNF/DNS/DSQ korrekt aus.')]));
ch.push(gap());

ch.push(h2('5.1  Einzelzeitfahrt / Radrennen (Contest 1 + 3)'));
ch.push(h3('Gesamtwertung Maenner & Frauen'));
ch.push(tbl(
  [['Wertung', 1800], ['Platzierungsfeld', 2700], ['Filter', 2500], ['Ergebnis', PAGE_W - 1800 - 2700 - 2500]],
  [
    [['Maenner',        1800], ['EinzelzeitfahrtMWPl', 2700, { code: true }], ['Contest<>2, Gender=m',             2500], ['T1', PAGE_W - 1800 - 2700 - 2500]],
    [['Frauen',         1800], ['EinzelzeitfahrtMWPl', 2700, { code: true }], ['Contest<>2, Gender=f',             2500], ['T1', PAGE_W - 1800 - 2700 - 2500]],
    [['M+F kombiniert', 1800], ['EinzelzeitfahrtMWPl', 2700, { code: true }], ['Contest<>2, Gruppe MaennerFrauen', 2500], ['T1', PAGE_W - 1800 - 2700 - 2500]],
  ]
));
ch.push(p([t('Zusatzfeld: '), c('iif(T1=T1001;"NR!")'), t(' - erscheint bei neuem Streckenrekord. Ausserdem: '), c('EtappeGeschwindigkeit(T1)'), t(' berechnet die Durchschnittsgeschwindigkeit.')]));
ch.push(gap());

ch.push(h3('Altersklassenwertung'));
ch.push(tbl([['Platzierungsfeld', 2500], ['Filter', 3000], ['Sortierung', PAGE_W - 2500 - 3000]], [
  [['EinzelzeitfahrtAKPl', 2500, { code: true }], ['Contest<>2', 3000], ['AgeGroup.Name -> AgeGroup.NameShort (Seitenumbruch) -> Platz', PAGE_W - 2500 - 3000]],
]));
ch.push(gap());

ch.push(h3('Sonderwertungen'));
ch.push(tbl(
  [['Wertung', 1800], ['Platzierungsfeld', 2800], ['Filter', 2500], ['NR-Kennzeichen', PAGE_W - 1800 - 2800 - 2500]],
  [
    [['Single Speed', 1800], ['EinzelzeitfahrtEingangfahrerPl', 2800, { code: true }], ['Contest<>2',             2500], ['iif(T1=T1003;"NR!")', PAGE_W - 1800 - 2800 - 2500, { code: true }]],
    [['Stadtmobil',   1800], ['EinzelzeitfahrtStadtmobilPl',   2800, { code: true }], ['Contest<>2, Gruppe M/W', 2500], ['-',                  PAGE_W - 1800 - 2800 - 2500]],
  ]
));
ch.push(p('Single Speed vergleicht mit T1003 (StreckenRekordEingang) - der Single-Speed-Rekord wird separat vom allgemeinen Rad-Rekord gefuehrt.'));
ch.push(gap());

ch.push(h2('5.2  Finale Radrennen'));
ch.push(tbl(
  [['Finale', 2000], ['Plaetze', 1300], ['Platzierungsfeld', 2700], ['NR-Kennzeichen', PAGE_W - 2000 - 1300 - 2700]],
  [
    [['C-Finale Maenner', 2000], ['61-90 maennlich', 1300], ['MaennerFinaleCPl', 2700, { code: true }], ['iif(T15=T1001;"NR!")', PAGE_W - 2000 - 1300 - 2700, { code: true }]],
    [['B-Finale Maenner', 2000], ['31-60 maennlich', 1300], ['MaennerFinaleBPl', 2700, { code: true }], ['iif(T4=T1001;"NR!")',  PAGE_W - 2000 - 1300 - 2700, { code: true }]],
    [['Finale Frauen',    2000], [' 1-30 weiblich',  1300], ['FrauenFinalePl',   2700, { code: true }], ['iif(T5=T1001;"NR!")',  PAGE_W - 2000 - 1300 - 2700, { code: true }]],
    [['A-Finale Maenner', 2000], [' 1-30 maennlich', 1300], ['MaennerFinaleAPl', 2700, { code: true }], ['iif(T6=T1001;"NR!")',  PAGE_W - 2000 - 1300 - 2700, { code: true }]],
  ]
));
ch.push(note('Alle Finale-Listen vergleichen mit T1001 (StreckenRekordMW). Ein Finale-Sieg schneller als der bisherige Gesamtrekord wird als "NR!" ausgezeichnet.'));
ch.push(gap());

ch.push(h2('5.3  Anhaengerrennen (Contest 1 + 3, AYN1=1)'));
ch.push(tbl([['Platzierungsfeld', 2000], ['Filter', 3000], ['Ergebnis', 1200], ['NR-Kennzeichen', PAGE_W - 2000 - 3000 - 1200]], [
  [['AnhaengerPl', 2000, { code: true }], ['AYN1=1, Contest<>2', 3000], ['T2', 1200], ['iif(T2=T1002;"NR!")', PAGE_W - 2000 - 3000 - 1200, { code: true }]],
]));
ch.push(p([t('Zusaetzlich: '), c('EtappeGeschwindigkeit(T2)'), t('. Fuehrt einen eigenen Streckenrekord (T1002).')]));
ch.push(gap());

ch.push(h2('5.4  Berglauf (Contest 2 + 3)'));
ch.push(tbl(
  [['Wertung', 1800], ['Platzierungsfeld', 2200], ['Filter', 2800], ['Ergebnis', PAGE_W - 1800 - 2200 - 2800]],
  [
    [['Maenner',        1800], ['LaufMWPl',         2200, { code: true }], ['Contest>=2, Gender=m',             2800], ['T3', PAGE_W - 1800 - 2200 - 2800]],
    [['Frauen',         1800], ['LaufMWPl',         2200, { code: true }], ['Contest>=2, Gender=f',             2800], ['T3', PAGE_W - 1800 - 2200 - 2800]],
    [['M+F kombiniert', 1800], ['LaufMWPl',         2200, { code: true }], ['Contest>=2, Gruppe MaennerFrauen', 2800], ['T3', PAGE_W - 1800 - 2200 - 2800]],
    [['Altersklassen',  1800], ['LaufAKPl',         2200, { code: true }], ['Contest>=2, Gruppe AgeGroup',      2800], ['T3', PAGE_W - 1800 - 2200 - 2800]],
    [['Stadtmobil',     1800], ['LaufStadtmobilPl', 2200, { code: true }], ['Contest>=2, Gruppe M/W',           2800], ['T3', PAGE_W - 1800 - 2200 - 2800]],
  ]
));
ch.push(p([t('NR-Kennzeichen: '), c('iif(T3=T1004;"NR!")'), t(' (StreckenRekordLaufMW, geschlechtsspezifisch).')]));
ch.push(gap());

ch.push(h2('5.5  Mannschaftswertung'));
ch.push(p([b('Team Scoring 3 (TS3): '), t('aggregiert Einzel-Ergebnisse der Mitglieder eines Teams (Club-Feld). Sortierung: TS3.Rank -> Contest -> Lastname -> TS3.Position.')]));
ch.push(p('Gruppenzeile pro Team:'));
ch.push(codeblk('[TS3.RankP] & "///" & [Club] & "" & "///" & "# " & [TS3.Time1]'));
ch.push(p('Bedeutung: <Teamplatz> /// <Vereinsname> /// # <Teamscore>.'));
ch.push(gap());

// 6
ch.push(h1('6  Moderator-Listen (04-Moderator | Zieleinlauf)'));
ch.push(p('Die Moderator-Listen zeigen in Echtzeit die Zieleinlaeufe und aktualisieren sich mit jedem Chip-Scan.'));
ch.push(gap());

ch.push(h2('6.1  Grundprinzip'));
ch.push(p([t('Jede Liste filtert nach dem Vorwarner-Feld: Nur wer den Vorwarner passiert hat, erscheint. Sortierung '), b('absteigend nach Zeit'), t(' - der zuletzt Eingetroffene steht oben.')]));
ch.push(gap());

ch.push(h2('6.2  Intelligente Sortier-Umschaltung'));
ch.push(p('Die Sortierung wechselt automatisch zwischen Vorwarner- und Zielzeit-Messung. Beispiel B-Finale:'));
ch.push(codeblk('iif([MaennerFinaleB]=""; [DecimalTime42]; [DecimalTime4])'));
ch.push(p([t('Solange der Fahrer noch nicht im Ziel ist, wird nach '), c('DecimalTime42'), t(' (Vorwarner-Zeit T42 als Sekunden seit Mitternacht) sortiert. Sobald die Zielzeit existiert, nach '), c('DecimalTime4'), t(' (Zielzeit). Absteigende Sortierung = zuletzt Eingetroffener steht oben.')]));
ch.push(note('Die EZF hat keine Umschaltung - die Vorwarnermessung liefert bei Intervallstarts bereits eine eindeutige zeitliche Reihenfolge.'));
ch.push(gap());

ch.push(h2('6.3  Uebersicht Sortierausdruecke'));
ch.push(tbl(
  [['Moderator-Liste', 2200], ['Sortierausdruck', 4500], ['Vorwarner', 1300], ['Ziel', 1356]],
  [
    [['Einzelzeitfahrt',  2200], ['DecimalTime12  (immer Vorwarner)',                            4500, { code: true }], ['T12', 1300], ['-',   1356]],
    [['Anhaengerrennen',  2200], ['iif([Anhaengerrennen]=""; DecimalTime22; DecimalTime2)',       4500, { code: true }], ['T22', 1300], ['T2',  1356]],
    [['Berglauf',         2200], ['DecimalTime32  (immer Vorwarner)',                             4500, { code: true }], ['T32', 1300], ['-',   1356]],
    [['C-Finale Maenner', 2200], ['iif([MaennerFinaleC]=""; DecimalTime37; DecimalTime15)',       4500, { code: true }], ['T37', 1300], ['T15', 1356]],
    [['B-Finale Maenner', 2200], ['iif([MaennerFinaleB]=""; DecimalTime42; DecimalTime4)',        4500, { code: true }], ['T42', 1300], ['T4',  1356]],
    [['Finale Frauen',    2200], ['iif([FrauenFinale]=""; DecimalTime52; DecimalTime5)',           4500, { code: true }], ['T52', 1300], ['T5',  1356]],
    [['A-Finale Maenner', 2200], ['iif([MaennerFinaleA]=""; DecimalTime62; DecimalTime6)',        4500, { code: true }], ['T62', 1300], ['T6',  1356]],
  ]
));
ch.push(gap());

ch.push(h2('6.4  Filter je Liste'));
ch.push(tbl([['Moderator-Liste', 2200], ['Filterbedingungen', PAGE_W - 2200]], [
  [['Einzelzeitfahrt',  2200], ['VorwarnerEinzelzeitfahrt != leer  und  Contest != 2',            PAGE_W - 2200]],
  [['Anhaengerrennen',  2200], ['VorwarnerAnhaenger != leer  und  AYN1 = 1  und  Contest != 2',   PAGE_W - 2200]],
  [['Berglauf',         2200], ['VorwarnerLauf != leer  und  Contest >= 2',                       PAGE_W - 2200]],
  [['C-Finale Maenner', 2200], ['VorwarnerFinaleC != leer  und  Finale = C-Finale Maenner',       PAGE_W - 2200]],
  [['B-Finale Maenner', 2200], ['VorwarnerFinaleB != leer  und  Finale = B-Finale Maenner',       PAGE_W - 2200]],
  [['Finale Frauen',    2200], ['VorwarnerFinaleFrauen != leer  und  Finale = Finale Frauen',     PAGE_W - 2200]],
  [['A-Finale Maenner', 2200], ['VorwarnerFinaleA != leer',                                       PAGE_W - 2200]],
]));
ch.push(p([t('Das Feld '), c('Finale'), t(' ist ein berechnetes Custom Field mit dem Finale-Namen des Teilnehmers. Das A-Finale benoetigt keinen Finale-Filter.')]));
ch.push(gap());

ch.push(h2('6.5  Rekord- und Tagesbeste-Anzeige'));
ch.push(p('Alle Moderator-Listen zeigen in einer Zusatzspalte einen Status-Text bei besonderen Leistungen:'));
ch.push(tbl(
  [['Liste', 1800], ['Streckenrekord-Bedingung', 2778], ['Tagesbeste-Bedingung', PAGE_W - 1800 - 2778]],
  [
    [['Einzelzeitfahrt', 1800], ['T1 = T1001  ->  Neuer Rekord!',   2778, { code: true }], ['T1 = [RANK11Top7]  ->  Tagesbestzeit',   PAGE_W - 1800 - 2778, { code: true }]],
    [['Anhaengerrennen',  1800], ['T2 = T1002  ->  Neuer Rekord!',  2778, { code: true }], ['-',                                      PAGE_W - 1800 - 2778]],
    [['Berglauf',         1800], ['T3 = T1004  ->  Neuer Rekord!',  2778, { code: true }], ['T3 = [RANK15Top3]  ->  Tagesbeste',      PAGE_W - 1800 - 2778, { code: true }]],
    [['C-Finale',         1800], ['T15 = T1001  ->  Neuer Rekord!', 2778, { code: true }], ['T15 = [RANK11Top7]  ->  Tagesbeste',    PAGE_W - 1800 - 2778, { code: true }]],
    [['B-Finale',         1800], ['T4 = T1001  ->  Neuer Rekord!',  2778, { code: true }], ['T4 = [RANK11Top7]  ->  Tagesbeste',     PAGE_W - 1800 - 2778, { code: true }]],
    [['Finale Frauen',    1800], ['T5 = T1001  ->  Neuer Rekord!',  2778, { code: true }], ['T5 = [RANK11Top7]  ->  Tagesbeste',     PAGE_W - 1800 - 2778, { code: true }]],
    [['A-Finale',         1800], ['T6 = T1001  ->  Neuer Rekord!',  2778, { code: true }], ['T6 = [RANK11Top7]  ->  Tagesbeste',     PAGE_W - 1800 - 2778, { code: true }]],
  ]
));
ch.push(p([t('Tagesbeste bei Finale-Listen vergleicht mit '), c('[RANK11Top7]'), t(' (beste EZF-Zielzeit des Tages). Faehrt ein Finale-Fahrer schneller als alle EZF-Fahrer bisher, erscheint "Tagesbeste". Das Anhaengerrennen hat keine Tagesbeste-Anzeige.')]));

// Build
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal',
        run: { size: 52, bold: true, color: '1E3A6E', font: 'Arial' },
        paragraph: { spacing: { before: 480, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal',
        run: { size: 30, bold: true, color: '1E3A6E', font: 'Arial' },
        paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '2E5EA8', space: 4 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal',
        run: { size: 24, bold: true, color: '2E5EA8', font: 'Arial' },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal',
        run: { size: 21, bold: true, color: '444444', font: 'Arial' },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: { page: { margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Turmbergrennen - Ergebnisse & Wertungsstruktur  |  Stand 07.05.2026  |  Seite ', size: 17, font: 'Arial', color: '888888' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 17, font: 'Arial', color: '888888' }),
          new TextRun({ text: ' von ', size: 17, font: 'Arial', color: '888888' }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 17, font: 'Arial', color: '888888' }),
        ]
      })] })
    },
    children: ch
  }]
});

Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync('TURMBERGRENNEN_ERGEBNISSE_WERTUNG.docx', buf);
  console.log('Fertig: TURMBERGRENNEN_ERGEBNISSE_WERTUNG.docx');
});
