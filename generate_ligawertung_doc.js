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

function codeblkM(lines) {
  return new Table({
    columnWidths: [PAGE_W], margins: { top: 40, bottom: 40, left: 160, right: 160 },
    rows: [new TableRow({ children: [new TableCell({
      borders: CB, width: { size: PAGE_W, type: WidthType.DXA }, shading: SHADE_CODE,
      children: lines.map(function(line) {
        return new Paragraph({
          spacing: { before: 20, after: 20 }, indent: { left: 120 },
          children: [new TextRun({ text: line, size: 18, font: 'Courier New' })]
        });
      })
    })] })]
  });
}

function gap() { return new Paragraph({ spacing: { before: 0, after: 120 }, children: [new TextRun('')] }); }
function t(s) { return new TextRun({ text: s, size: 20, font: 'Arial' }); }
function b(s) { return new TextRun({ text: s, size: 20, font: 'Arial', bold: true }); }
function c(s) { return new TextRun({ text: s, size: 19, font: 'Courier New' }); }

const W2 = [Math.round(PAGE_W / 2), Math.round(PAGE_W / 2)];
const ch = [];

// Title
ch.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { before: 480, after: 120 }, children: [new TextRun('Ligawertung')] }));
ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 240 }, children: [new TextRun({ text: 'Dokumentation Wettbewerb 3 & 4', size: 32, font: 'Arial', bold: true, color: '444444' })] }));
ch.push(new Table({
  columnWidths: W2, margins: { top: 60, bottom: 60, left: 120, right: 120 },
  rows: [
    new TableRow({ children: [dc('Stand',         W2[0], { bold: true }),             dc('07.05.2026', W2[1])] }),
    new TableRow({ children: [dc('Veranstaltung', W2[0], { bold: true, shade: SHADE_ALT }), dc('5. Lemming Swim & Run (2026-04-26), Event 377703', W2[1], { shade: SHADE_ALT })] }),
    new TableRow({ children: [dc('Grundlage',     W2[0], { bold: true }),             dc('BWTV Triathlonliga - Ligastatut 2026, §9 und Anlage 2', W2[1])] }),
  ]
}));
ch.push(gap());

// 1
ch.push(h1('1  Ueberblick und Funktionsweise'));
ch.push(p([t('Die Ligawertung ist ein '), b('Platzpunkte-System'), t(' (auch bekannt als "niedrig gewinnt"): Jeder Athlet bekommt eine Platzziffer, und das Team mit der '), b('niedrigsten Summe'), t(' der drei besten Platzziffern seiner Mitglieder gewinnt.')]));
ch.push(gap());

ch.push(h2('Warum dieses System?'));
ch.push(p('Im Unterschied zu einer einfachen Zeitensummierung beruecksichtigt das Platzpunktesystem automatisch die Staerke des gesamten Teilnehmerfeldes. Ein Athlet, der in einem starken Feld auf Platz 5 landet, ist schlechter bewertet als derselbe Athlet mit identischer Zeit in einem schwachen Feld. Das macht die Teamwertung fairer ueber verschiedene Jahre und Felder hinweg.'));
ch.push(gap());

ch.push(h2('Die drei Stufen der Berechnung'));
ch.push(p([b('Stufe 1 - Einzelwertung (Platzziffer): '), t('Jeder Athlet erhaelt eine Platzziffer. Regulaere Finisher bekommen ihren Rang in der Gesamtplatzierung (Maenner und Frauen gemeinsam gewertet, kein Geschlechtersplit). Wer nicht regulaer finisht, bekommt eine Strafplatzziffer, die immer schlechter ist als der letzte regulaere Finisher. Die Abstufung der Strafe richtet sich nach dem Statuswert: DNF (knapp nach dem letzten Finisher) ist besser als DNS (Fixstrafe nahe am Maximum), ist besser als DSQ (hoechste Fixstrafe). Ausser-Konkurrenz-Teilnehmer (a.k.) bekommen eine so massive Strafe, dass sie die Teamwertung faktisch nicht belasten.')]));
ch.push(p([b('Stufe 2 - Teamauswahl (Ranking "ImTeam"): '), t('Innerhalb jedes Vereins werden die Athleten pro Wettbewerb sortiert: zuerst nach Prioritaetsstatus (DSQPrioStatus), dann nach Zeit. Dieses Ranking bestimmt, welche drei Athleten eines Vereins fuer die Teamwertung gezaehlt werden. DSQ-Athleten haben den niedrigsten Prioritaetswert (0) und sortieren sich daher immer auf die vordersten Positionen - sie koennen nicht durch nicht-gestartete Athleten "verdraengt" werden. Ein Team muss eine DSQ-Strafe immer tragen.')]));
ch.push(p([b('Stufe 3 - Teamwertung (TS3 / TS4): '), t('Die Platzziffern der drei ausgewaehlten Athleten werden summiert. Das Ergebnis ist die Platzsumme des Teams. Teams mit niedrigerer Platzsumme gewinnen. Bei Gleichstand werden beide Teams auf denselben Rang gesetzt (UseTies=true).')]));
ch.push(gap());

ch.push(h2('Zwei unabhaengige Liga-Wettbewerbe'));
ch.push(p('Wettbewerb 3 (2. Liga) und Wettbewerb 4 (3. Liga) laufen vollstaendig unabhaengig: separate Startzeiten, separate Platzierungen (RANK101 je Wettbewerb), separate TeamScores (TS3 / TS4) und separate MaximalPunktZahlen. Ein Athlet kann nur in einem der beiden Wettbewerbe starten.'));
ch.push(gap());

ch.push(h2('Wichtige Konfigurationswerte'));
ch.push(p([t('Die festen Konstanten '), b('MaximalPunktZahlLiga1=92'), t(' und '), b('MaximalPunktZahlLiga2=64'), t(' bestimmen, ab welchem Wert DNS- und DSQ-Athleten ihre Strafe erhalten. Sie muessen jaehrlich geprueft werden: Ist die tatsaechliche Finisherzahl hoeher als diese Konstante, wird DNS faelschlicherweise besser bewertet als ein DNF-Athlet nahe dem Ende des Feldes.')]));
ch.push(p([t('Laut Ligastatut 2026 Anlage 2 errechnet sich die Maximalpunktzahl aus der '), b('Gesamtzahl der gemeldeten Starter pro Liga'), t(' (Teams x 4 Starter). Fuer 2026: 2. Liga = 16 Teams x 4 = 64, 3. Liga = 22 Teams x 4 = 88. Die aktuell gesetzten Werte (92/64) weichen davon ab - Details im Abschnitt Abgleich mit Ligastatut.')]));
ch.push(gap());

// 2
ch.push(h1('2  Wettbewerbe'));
ch.push(tbl(
  [['ID', 600], ['Name', 1800], ['Startzeit', 1600], ['Strecke', 1500], ['Laps', PAGE_W - 600 - 1800 - 1600 - 1500]],
  [
    [['3', 600], ['2. Liga', 1800], ['12:00 Uhr', 1600], ['8,5 km', 1500], ['5', PAGE_W - 600 - 1800 - 1600 - 1500]],
    [['4', 600], ['3. Liga', 1800], ['13:30 Uhr', 1600], ['8,5 km', 1500], ['5', PAGE_W - 600 - 1800 - 1600 - 1500]],
  ]
));
ch.push(p('Die Liga-Wettbewerbe haben keine FinishTimeLimit und keine Sortiervorgabe im Wettbewerb selbst - die Sortierung erfolgt vollstaendig ueber Platzierungen und die TeamScore-Konfiguration.'));
ch.push(gap());

// 3
ch.push(h1('3  Statuswerte in RaceResult'));
ch.push(tbl(
  [['STATUS', 1200], ['Bedeutung', PAGE_W - 1200]],
  [
    [['0', 1200], ['Regulaer gefinisht',       PAGE_W - 1200]],
    [['1', 1200], ['a.k. (ausser Konkurrenz)', PAGE_W - 1200]],
    [['2', 1200], ['DSQ (disqualifiziert)',     PAGE_W - 1200]],
    [['3', 1200], ['DNF (did not finish)',      PAGE_W - 1200]],
    [['4', 1200], ['DNS (did not start)',       PAGE_W - 1200]],
  ]
));
ch.push(gap());

// 4
ch.push(h1('4  Benutzerdefinierte Felder (UserFields)'));

ch.push(h2('4.1  RegulaerImZiel'));
ch.push(codeblk('[FINISHED] AND [STATUS]=0'));
ch.push(p([t('Liefert '), c('true'), t(', wenn der Teilnehmer eine Zielzeit hat '), b('und'), t(' keinen Sonderstatus (kein DSQ, DNF, DNS, a.k.). Nur regulaere Finisher bekommen als Platzziffer ihren tatsaechlichen Rang.')]));
ch.push(gap());

ch.push(h2('4.2  AnzahlImZielLiga1 / AnzahlImZielLiga2'));
ch.push(codeblkM([
  'DCount("[FINISHED] AND [CONTEST]=3")   -- Liga1 (Wettbewerb 3)',
  'DCount("[FINISHED] AND [CONTEST]=4")   -- Liga2 (Wettbewerb 4)',
]));
ch.push(p('Datensatz-uebergreifende Zaehlung aller Teilnehmer mit Zielzeit im jeweiligen Liga-Wettbewerb. Wird als Basis-Platzziffer fuer DNF-Teilnehmer verwendet (sie kommen "nach dem letzten Finisher").'));
ch.push(gap());

ch.push(h2('4.3  MaximalPunktZahlLiga1 / MaximalPunktZahlLiga2'));
ch.push(codeblkM([
  '92   -- Liga1 (Wettbewerb 3 = 2. Liga)',
  '64   -- Liga2 (Wettbewerb 4 = 3. Liga)',
]));
ch.push(p([t('Feste Konstante, die '), b('groesser als die erwartete Finisherzahl'), t(' gesetzt sein muss. Wird als Platzziffer-Basiswert fuer DSQ- und DNS-Athleten verwendet.')]));
ch.push(p([b('Laut Ligastatut 2026, Anlage 2'), t(' errechnet sich der Wert als Gesamtzahl der gemeldeten Starter: Anzahl Teams x 4 Starter. Der korrekte Wert wird einmalig '), b('vor dem ersten Wettkampf'), t(' der Saison festgelegt und gilt dann fuer alle Events.')]));
ch.push(note('Wenn die tatsaechliche Finisherzahl diese Werte uebersteigt, kehrt sich die Strafe fuer DNS/DSQ um. Die Werte muessen jaehrlich nach Eingang der Mannschaftsmeldungen angepasst werden.'));
ch.push(gap());

ch.push(h2('4.4  StatusMalus'));
ch.push(codeblk('choose([STATUS]; 1000; 6; 2; 3)'));
ch.push(note('Im gespeicherten Ausdruck stehen ueberschuessige ))) am Ende - vermutlich ein alter Copy-Paste-Rest. RaceResult wertet den Ausdruck trotzdem korrekt aus.'));
ch.push(p('Aufschlag je nach Status auf die Platzziffer:'));
ch.push(tbl(
  [['STATUS', 800], ['Bedeutung', 1400], ['StatusMalus', 1600], ['Statut-Grundlage (Anlage 2)', PAGE_W - 800 - 1400 - 1600]],
  [
    [['1', 800], ['a.k.',  1400], ['1000 (faktischer Ausschluss)', 1600], ['nicht explizit geregelt',       PAGE_W - 800 - 1400 - 1600]],
    [['2', 800], ['DSQ',   1400], ['6',                            1600], ['Maximalpunktzahl plus 6 (ok)',  PAGE_W - 800 - 1400 - 1600]],
    [['3', 800], ['DNF',   1400], ['2',                            1600], ['letzte Platzziffer plus 2 (ok)',PAGE_W - 800 - 1400 - 1600]],
    [['4', 800], ['DNS',   1400], ['3',                            1600], ['Maximalpunktzahl plus 3 (ok)',  PAGE_W - 800 - 1400 - 1600]],
  ]
));
ch.push(gap());

ch.push(h2('4.5  HelperLiga1 / HelperLiga2'));
ch.push(codeblkM([
  '-- HelperLiga1 (Wettbewerb 3):',
  'if([STATUS]=2 OR [STATUS]=4; MaximalPunktZahlLiga1; AnzahlImZielLiga1)',
  '',
  '-- HelperLiga2 (Wettbewerb 4):',
  'if([STATUS]=2 OR [STATUS]=4; MaximalPunktZahlLiga2; AnzahlImZielLiga2)',
]));
ch.push(p('Liefert den Basisteil der Platzziffer fuer nicht-regulaere Finisher:'));
ch.push(tbl(
  [['Situation', 2400], ['Ergebnis (Basisteil)', PAGE_W - 2400]],
  [
    [['DSQ oder DNS (STATUS=2 oder 4)', 2400], ['MaximalPunktZahl (feste Konstante 92 bzw. 64) - extra hohe Platzziffer', PAGE_W - 2400]],
    [['DNF oder a.k. (STATUS=3 oder 1)', 2400], ['AnzahlImZiel (Anzahl tatsaechlicher Finisher) - Platzziffer knapp nach dem letzten Finisher', PAGE_W - 2400]],
  ]
));
ch.push(gap());

ch.push(h2('4.6  DSQPrioStatus'));
ch.push(codeblk('if([STATUS]=0; 1; choose([STATUS]; 4; 0; 2; 3))'));
ch.push(p('Sortierfeld fuer die Selektion der Teamwertungs-Athleten:'));
ch.push(tbl(
  [['STATUS', 800], ['Bedeutung', 1400], ['DSQPrioStatus', 1800], ['Sortierung', PAGE_W - 800 - 1400 - 1800]],
  [
    [['2', 800], ['DSQ',      1400], ['0', 1800], ['ERSTE Prioritaet - absichtlich',  PAGE_W - 800 - 1400 - 1800]],
    [['0', 800], ['Regulaer', 1400], ['1', 1800], ['danach, nach Zeit',               PAGE_W - 800 - 1400 - 1800]],
    [['3', 800], ['DNF',      1400], ['2', 1800], ['danach',                          PAGE_W - 800 - 1400 - 1800]],
    [['4', 800], ['DNS',      1400], ['3', 1800], ['danach',                          PAGE_W - 800 - 1400 - 1800]],
    [['1', 800], ['a.k.',     1400], ['4', 1800], ['letzte Prioritaet',               PAGE_W - 800 - 1400 - 1800]],
  ]
));
ch.push(p([b('Warum DSQ zuerst? '), t('DSQ-Athleten koennen nicht "versteckt" werden: Sie landen immer auf den ersten ImTeam-Positionen und muessen in den Top-3 des Teams mitgezaehlt werden (falls vorhanden).')]));
ch.push(gap());

// 5
ch.push(h1('5  Platzziffer (Ergebnis ID 4000)'));
ch.push(codeblkM([
  'choose([CONTEST]; 0; 0;',
  '  if([RegulaerImZiel]; [RANK101]; [HelperLiga1] + [StatusMalus]);',
  '  if([RegulaerImZiel]; [RANK101]; [HelperLiga2] + [StatusMalus]))',
]));
ch.push(tbl(
  [['Wettbewerb', 2000], ['Anwendung', PAGE_W - 2000]],
  [
    [['1 (Kurzstrecke)', 2000], ['0 - nicht relevant fuer Ligawertung',                                            PAGE_W - 2000]],
    [['2 (Langstrecke)', 2000], ['0 - nicht relevant fuer Ligawertung',                                            PAGE_W - 2000]],
    [['3 (2. Liga)',     2000], ['if([RegulaerImZiel]; [RANK101]; [HelperLiga1] + [StatusMalus])', PAGE_W - 2000, { code: true }]],
    [['4 (3. Liga)',     2000], ['if([RegulaerImZiel]; [RANK101]; [HelperLiga2] + [StatusMalus])', PAGE_W - 2000, { code: true }]],
  ]
));
ch.push(gap());
ch.push(p([b('Platzziffer-Berechnung im Detail (niedrig = besser):')]));
ch.push(tbl(
  [['Situation', 2600], ['Platzziffer 2. Liga (Wb3)', 2400], ['Platzziffer 3. Liga (Wb4)', PAGE_W - 2600 - 2400]],
  [
    [['Regulaer (STATUS=0, FINISHED)', 2600], ['RANK101 (1, 2, 3, ...)',    2400], ['RANK101 (1, 2, 3, ...)',    PAGE_W - 2600 - 2400]],
    [['DNF (STATUS=3)',                2600], ['AnzahlImZielLiga1 + 2',     2400], ['AnzahlImZielLiga2 + 2',    PAGE_W - 2600 - 2400]],
    [['DNS (STATUS=4)',                2600], ['92 + 3 = 95',               2400], ['64 + 3 = 67',              PAGE_W - 2600 - 2400]],
    [['DSQ (STATUS=2)',                2600], ['92 + 6 = 98',               2400], ['64 + 6 = 70',              PAGE_W - 2600 - 2400]],
    [['a.k. (STATUS=1)',               2600], ['AnzahlImZielLiga1 + 1000',  2400], ['AnzahlImZielLiga2 + 1000', PAGE_W - 2600 - 2400]],
  ]
));
ch.push(gap());

// 6
ch.push(h1('6  Platzierung 101 "Gesamt M UND W" (RANK101)'));
ch.push(codeblkM([
  '{',
  '  "ID": 101,',
  '  "Name": "Gesamt M UND W",',
  '  "Group": ["CONTEST"],',
  '  "Sort": ["STATUS", "DECIMALTIME"],',
  '  "Filter": "FINISHED",',
  '  "UseTies": false',
  '}',
]));
ch.push(p([t('Gruppierung nur nach Wettbewerb (M und W zusammen, kein Geschlechtersplit). Sortierung nach STATUS (0 vor 2 = regulaere Finisher vor DSQ), dann nach Zeit. Filter '), c('FINISHED'), t(': Nur Teilnehmer mit Zielzeit werden gezaehlt.')]));
ch.push(p('Regulaere Finisher bekommen RANK101 = 1, 2, 3, ... - das ist direkt ihre Platzziffer.'));
ch.push(gap());

// 7
ch.push(h1('7  Platzierung 7 "ImTeam"'));
ch.push(codeblkM([
  '{',
  '  "ID": 7,',
  '  "Name": "ImTeam",',
  '  "Group": ["CONTEST", "CLUB"],',
  '  "Sort": ["DSQPrioStatus", "DECIMALTIME"],',
  '  "Filter": ""',
  '}',
]));
ch.push(p([t('Gruppierung nach Wettbewerb + Verein: jeder Athlet hat eine Position '), b('innerhalb seines Teams.'), t(' Kein Filter: '), b('alle'), t(' Teilnehmer (auch ohne Zielzeit) werden einbezogen. Sortierung: DSQPrioStatus zuerst (DSQ kommt vor regulaeren Finishern!), dann Zeit.')]));
ch.push(p([c('[ImTeam]'), t(' = Position des Athleten innerhalb seines Team-Wettbewerb-Paares.')]));
ch.push(gap());

// 8
ch.push(h1('8  Mannschaftswertung (TeamScore)'));

ch.push(h2('8.1  TS3 "2. Liga" (ID=3) - fuer Wettbewerb 3'));
ch.push(codeblkM([
  '{',
  '  "ResultID1": 4000,',
  '  "MinTotal": 3, "MaxTotal": 3,',
  '  "MinFemale": 0, "MaxFemale": 3,',
  '  "Filter": "[CLUB]<>\\"\\" AND [CONTEST]=3 AND [ImTeam] >= 1 AND [ImTeam] <= 3",',
  '  "Assigning1": "CONTEST", "Grouping1": "CONTEST",',
  '  "Assigning2": "CLUB",    "Grouping2": "",',
  '  "UseTies": true,',
  '  "SortDesc1": false',
  '}',
]));
ch.push(gap());

ch.push(h2('8.2  TS4 "3. Liga" (ID=4) - fuer Wettbewerb 4'));
ch.push(p([t('Identische Konfiguration wie TS3, nur mit '), c('[CONTEST]=4'), t(' im Filter.')]));
ch.push(gap());

ch.push(h2('8.3  Erklaerung der TS-Konfiguration'));
ch.push(tbl(
  [['Feld', 2500], ['Wert', 1600], ['Bedeutung', PAGE_W - 2500 - 1600]],
  [
    [['ResultID1=4000',           2500], ['Platzziffer',  1600], ['Die Platzziffern der 3 Athleten werden summiert',               PAGE_W - 2500 - 1600]],
    [['SortDesc1=false',          2500], ['aufsteigend',  1600], ['Niedrigste Summe = bestes Team',                                PAGE_W - 2500 - 1600]],
    [['MinTotal=MaxTotal=3',      2500], ['genau 3',      1600], ['Jedes Team muss exakt 3 Athleten haben',                       PAGE_W - 2500 - 1600]],
    [['MinFemale=0, MaxFemale=3', 2500], ['0-3 Frauen',   1600], ['Kein Geschlechterzwang in der Teamwertung',                    PAGE_W - 2500 - 1600]],
    [['UseTies=true',             2500], ['Gleichstand',  1600], ['Teams mit gleicher Summe bekommen gleichen Rang',              PAGE_W - 2500 - 1600]],
    [['Filter [ImTeam] <= 3',    2500], ['Top-3',        1600], ['Nur die 3 ersten Positionen in Ranking "ImTeam" pro Team',    PAGE_W - 2500 - 1600]],
  ]
));
ch.push(p([c('TS3.Time1'), t(' (bzw. '), c('TS4.Time1'), t(') = Platzsumme (Summe der 3 Platzziffern des Teams). Wird in der Ergebnisliste als "Platzsumme: X" angezeigt.')]));
ch.push(gap());

// 9
ch.push(h1('9  Welche 3 Athleten werden pro Team ausgewaehlt?'));
ch.push(p([t('Der Filter '), c('[ImTeam] >= 1 AND [ImTeam] <= 3'), t(' kombiniert mit der Sortierung von Ranking 7 (DSQPrioStatus -> Zeit) ergibt folgende Selektionslogik:')]));
ch.push(gap());

ch.push(p([b('Beispiel 1: Team mit 1 DSQ + 4 regulaeren Finishern')]));
ch.push(tbl(
  [['ImTeam', 1200], ['Athlet', PAGE_W - 1200]],
  [
    [['ImTeam=1', 1200], ['DSQ-Athlet (DSQPrioStatus=0, zuerst sortiert)',  PAGE_W - 1200]],
    [['ImTeam=2', 1200], ['Schnellster regulaerer Finisher',                PAGE_W - 1200]],
    [['ImTeam=3', 1200], ['Zweitschnellster regulaerer Finisher',           PAGE_W - 1200]],
  ]
));
ch.push(p('Ergebnis: Team wird mit DSQ-Strafe belastet - kein Verstecken des DSQ-Athleten moeglich.'));
ch.push(gap());

ch.push(p([b('Beispiel 2: Team mit 5 regulaeren Finishern')]));
ch.push(tbl(
  [['ImTeam', 1200], ['Athlet', PAGE_W - 1200]],
  [
    [['ImTeam=1', 1200], ['Schnellster Finisher',     PAGE_W - 1200]],
    [['ImTeam=2', 1200], ['Zweitschnellster Finisher',PAGE_W - 1200]],
    [['ImTeam=3', 1200], ['Drittschnellster Finisher',PAGE_W - 1200]],
  ]
));
ch.push(p('Ergebnis: Summe der 3 besten Platzziffern.'));
ch.push(gap());

ch.push(p([b('Beispiel 3: Team mit nur 2 Finishern + 1 DNF')]));
ch.push(tbl(
  [['ImTeam', 1200], ['Athlet', PAGE_W - 1200]],
  [
    [['ImTeam=1', 1200], ['Schnellster Finisher',           PAGE_W - 1200]],
    [['ImTeam=2', 1200], ['Zweiter Finisher',               PAGE_W - 1200]],
    [['ImTeam=3', 1200], ['DNF-Athlet (AnzahlImZiel + 2)', PAGE_W - 1200]],
  ]
));
ch.push(p('Ergebnis: Team wird mit DNF-Strafe belastet.'));
ch.push(gap());

// 10
ch.push(h1('10  Ergebnisliste Liga'));
ch.push(p([b('Filter: '), c('Contest > 2'), t(' (nur Wettbewerbe 3 und 4)')]));
ch.push(p([b('Sortierung: '), t('Contest -> Status -> ZielzeitVorhanden (desc) -> Rank101')]));
ch.push(p([b('Spalten: '), t('Rank101p (Platz), Bib, Name, Verein, AK, AK-Platz, Schwimmen (mit Rank102p), Wechsel (mit Rank103p), Laufen (mit Rank104p), Gesamt')]));
ch.push(gap());

// 11
ch.push(h1('11  Ergebnisliste Teamwertung (Liga1/Liga2)'));
ch.push(p([b('Filter: '), c('TS3.Rank > 0 AND Contest = 3'), t(' (bzw. TS4 fuer Liga2)')]));
ch.push(p([b('Sortierung: '), t('TS3.Rank -> Team-Kopfzeile -> TS3.Position')]));
ch.push(p([b('Kopfzeile je Team: '), t('"1./// Vereinsname ///  Platzsumme: X" (TS3.Time1)')]));
ch.push(p([b('Spalten je Athlet: '), t('Platzziffer, Name, Schwimmen, Wechsel, Laufen, Gesamt')]));
ch.push(gap());

// 12
ch.push(h1('12  Siegerehrungsliste - Hilfsvariablen'));
ch.push(p('Fuer die Siegerehrung der Top-3-Teams werden diese Hilfsfelder verwendet:'));
ch.push(codeblkM([
  'Liga1P1: DFirst("[CLUB]";"[TS3.RANK]=1")   -- Vereinsname Platz 1 (2. Liga)',
  'Liga1P2: DFirst("[CLUB]";"[TS3.RANK]=2")   -- Vereinsname Platz 2',
  'Liga1P3: DFirst("[CLUB]";"[TS3.RANK]=3")   -- Vereinsname Platz 3',
  '',
  'Liga2P1: DFirst("[CLUB]";"[TS4.RANK]=1")   -- Vereinsname Platz 1 (3. Liga)',
  'Liga2P2: DFirst("[CLUB]";"[TS4.RANK]=2")',
  'Liga2P3: DFirst("[CLUB]";"[TS4.RANK]=3")',
  '',
  'Liga1OrderHelper: if([CLUB]=[Liga1P1];1;if([CLUB]=[Liga1P2];2;if([CLUB]=[Liga1P3];3;0)))',
  'Liga2OrderHelper: if([CLUB]=[Liga2P1];1;if([CLUB]=[Liga2P2];2;if([CLUB]=[Liga2P3];3;0)))',
]));
ch.push(p([c('Liga1OrderHelper'), t(' gibt fuer jeden Teilnehmer an, ob sein Verein auf Platz 1, 2 oder 3 liegt (0 = nicht in Top 3). Wird in der Siegerehrungsliste als Sortierfeld verwendet.')]));
ch.push(gap());

// 13
ch.push(h1('13  Gesamtzusammenfassung: Datenfluss'));
ch.push(codeblkM([
  'FINISHED + STATUS=0',
  '    └─► RegulaerImZiel = true',
  '            └─► Platzziffer = RANK101 (Gesamtplatzierung m/w gemeinsam)',
  '',
  'Nicht-regulaere Teilnehmer:',
  '    STATUS=3 (DNF)  ─► HelperLiga = AnzahlImZiel',
  '    STATUS=1 (a.k.) ─► HelperLiga = AnzahlImZiel',
  '    STATUS=2 (DSQ)  ─► HelperLiga = MaximalPunktZahl',
  '    STATUS=4 (DNS)  ─► HelperLiga = MaximalPunktZahl',
  '',
  '    HelperLiga + StatusMalus = Platzziffer',
  '',
  'Ranking "ImTeam" (ID=7):',
  '    Sortiert pro Contest+Club nach DSQPrioStatus -> Zeit',
  '    => bestimmt welche 3 Athleten pro Team in die Teamwertung eingehen',
  '',
  'TeamScore TS3 / TS4:',
  '    Summiert Platzziffer der 3 gewaehlten Athleten',
  '    => TS3.Time1 / TS4.Time1 = Platzsumme (niedrig = besser)',
  '    => TS3.Rank / TS4.Rank = Teamrang',
]));
ch.push(gap());

// 14
ch.push(h1('14  Abgleich mit Ligastatut 2026'));
ch.push(p([b('Quelle: '), t('BWTV Triathlonliga - Ligastatut 2026, Anlage 2 (Wertungsmodus)')]));
ch.push(gap());

ch.push(h2('14.1  Uebereinstimmungen'));
ch.push(tbl(
  [['Statut-Regel', 3000], ['Stelle', 1200], ['RaceResult-Umsetzung', PAGE_W - 3000 - 1200]],
  [
    [['Platz 1 = 1 Punkt, jeder weitere +1',           3000], ['Anlage 2',   1200], ['RANK101 = Platzziffer fuer regulaere Finisher',                       PAGE_W - 3000 - 1200]],
    [['Nicht im Ziel -> letzte Platzziffer +2',         3000], ['Anlage 2',   1200], ['StatusMalus(DNF)=2, Basis=AnzahlImZiel',                              PAGE_W - 3000 - 1200]],
    [['Nicht am Start -> Maximalpunktzahl +3',          3000], ['Anlage 2',   1200], ['StatusMalus(DNS)=3, Basis=MaximalPunktZahl',                           PAGE_W - 3000 - 1200]],
    [['DSQ -> Maximalpunktzahl +6',                    3000], ['Anlage 2',   1200], ['StatusMalus(DSQ)=6, Basis=MaximalPunktZahl',                           PAGE_W - 3000 - 1200]],
    [['DSQ kommt immer in die Teamaddition',            3000], ['Anlage 2',   1200], ['DSQPrioStatus=0 => DSQ sortiert als Erster innerhalb des Teams',       PAGE_W - 3000 - 1200]],
    [['4 Starter pro Team, 3 kommen in Wertung',       3000], ['§9 Abs. 2', 1200], ['TeamScore-Filter [ImTeam] <= 3',                                       PAGE_W - 3000 - 1200]],
    [['Gleichstand => gleiche Teamwertung',             3000], ['Anlage 2',   1200], ['UseTies=true im TeamScore',                                            PAGE_W - 3000 - 1200]],
    [['Keine Geschlechterbeschraenkung (2./3. Liga)',   3000], ['§9 Abs. 1', 1200], ['MinFemale=0, MaxFemale=3',                                             PAGE_W - 3000 - 1200]],
  ]
));
ch.push(gap());

ch.push(h2('14.2  Abweichungen / Pruefbedarf'));
ch.push(p([b('MaximalPunktZahl: aktuell falsch gesetzt.'), t(' Laut Anlage 2: MaximalPunktZahl = Anzahl Teams x 4 Starter, berechnet nach Mannschaftsmeldungseingang vor dem ersten Wettkampf der Saison.')]));
ch.push(tbl(
  [['Liga', 1400], ['Teams 2026', 1400], ['Korrekte Punktzahl', 2000], ['Aktuell', 1200], ['Status', PAGE_W - 1400 - 1400 - 2000 - 1200]],
  [
    [['2. Liga (Wb 3)', 1400], ['16', 1400], ['16 x 4 = 64', 2000], ['92', 1200], ['zu hoch - konservativ, ohne Auswirkung',  PAGE_W - 1400 - 1400 - 2000 - 1200]],
    [['3. Liga (Wb 4)', 1400], ['22', 1400], ['22 x 4 = 88', 2000], ['64', 1200], ['zu niedrig - potenziell problematisch',    PAGE_W - 1400 - 1400 - 2000 - 1200]],
  ]
));
ch.push(gap());
ch.push(note('Beim 5. Lemming Swim & Run 2026 gab es weder DSQ noch DNS-Athleten auf gewerteten ImTeam-Positionen (1-3). Die falschen Werte hatten daher keine Auswirkung auf das Ergebnis.'));
ch.push(gap());
ch.push(p([b('Risikofall fuer zukuenftige Events: '), t('Der zu niedrige Wert (64) fuer die 3. Liga wuerde wirken, wenn ein Team nur 3 Starter hat und einer davon DNS ist: Platzziffer waere 64+3=67 statt korrekt 88+3=91 - die Strafe waere zu gering und das Team wuerde bevorteilt.')]));
ch.push(p([b('Empfehlung: '), t('Vor jedem Event die tatsaechlich gemeldeten Liga-Starter zaehlen und beide Werte aktualisieren:')]));
ch.push(codeblkM([
  'MaximalPunktZahlLiga1 = Anzahl angemeldete Starter in Wettbewerb 3',
  'MaximalPunktZahlLiga2 = Anzahl angemeldete Starter in Wettbewerb 4',
]));
ch.push(gap());

ch.push(h2('14.3  a.k.-Athleten: im Statut nicht explizit geregelt'));
ch.push(p('Das Statut nennt keine Regel fuer a.k.-Teilnehmer in der Teamwertung. Die aktuelle Umsetzung (StatusMalus=1000) schliesst a.k.-Athleten faktisch aus der Teamwertung aus, indem ihre Platzziffer ins Unendliche gedrueckt wird. Das erscheint sinnvoll, ist aber nicht statutgemaess geregelt - im Zweifelsfall beim BWTV nachfragen.'));
ch.push(gap());

ch.push(h2('14.4  Startberechtigung (DTU-Startpass)'));
ch.push(p([t('Laut §5 Abs. 1 benoetigen alle Liga-Teilnehmer einen gueltigen DTU-Startpass. In den Zusatzfeldern gibt es das Feld '), c('Startpassnummer'), t(' (ATF, Pflichtfeld = false). Wird das Feld nicht ausgefuellt, ist '), b('keine automatische Pruefung'), t(' in RaceResult aktiv - die Kontrolle erfolgt laut Statut stichprobenartig vor Ort.')]));

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
          new TextRun({ text: 'Ligawertung - Dokumentation  |  Stand 07.05.2026  |  Seite ', size: 17, font: 'Arial', color: '888888' }),
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
  fs.writeFileSync('LIGAWERTUNG.docx', buf);
  console.log('Fertig: LIGAWERTUNG.docx');
});
