---
name: py-raceresult-lists-api
description: |
  Configure and save RaceResult Ergebnislisten (result lists) via the py-raceresult
  Python library. Use when: (1) creating or updating lists with filters, sort orders,
  and column expressions, (2) list fields/filters/orders are saved as empty despite
  being set in the List object, (3) ListField.expression, ListFilter, or ListOrder
  data silently disappears after save(). Root cause: Pydantic model aliases for nested
  objects (ListField "Exp", ListFilter "Or"/"Exp1", ListOrder "D"/"P") do NOT match
  the server's expected keys ("Expression", "OrConjunction", "Descending", "PageBreak").
  Workaround: manually build nested dicts with correct PascalCase keys before POSTing.
author: Claude Code
version: 1.0.0
date: 2026-05-06
---

# py-raceresult Lists API: Saving Filters, Orders, and Field Expressions

## Problem

When saving a `List` object via `event.lists.save(item=lst)`, the top-level properties
(name, headlines, page layout) are persisted correctly, but **Filter, Order, and Field
expressions are silently lost**. Reading the list back shows empty arrays for Filters
and Orders, and empty `Expression` strings in all Fields.

## Context / Trigger Conditions

- Using `event.lists.save(item=List(...))` from py-raceresult
- `list.model_dump(by_alias=True)` produces `"Exp"`, `"Or"`, `"D"` as keys
- Server GET response returns `"Expression"`, `"OrConjunction"`, `"Descending"`, etc.
- `saved_list.filters` is `[]`, `saved_list.orders` is `[]` after save+read cycle
- `saved_list.fields[n].expression` is always `""` after read

## Root Cause

The Pydantic models for nested objects use **short aliases** that the server does not
recognize. The server uses long **PascalCase** keys:

| Python field | Model alias (sent) | Server key (expected) |
|---|---|---|
| `ListField.expression` | `"Exp"` | `"Expression"` |
| `ListField.label` | `"La"` | `"Label"` |
| `ListField.alignment` | `"A"` | `"Alignment"` |
| `ListField.font_bold` | `"B"` | `"FontBold"` |
| `ListField.position` | `"P"` | `"Position"` |
| `ListFilter.or_conjunction` | `"Or"` | `"OrConjunction"` |
| `ListFilter.expression1` | `"Exp1"` | `"Expression1"` |
| `ListFilter.operator` | `"Op"` | `"Operator"` |
| `ListFilter.expression2` | `"Exp2"` | `"Expression2"` |
| `ListOrder.expression` | `"Exp"` | `"Expression"` |
| `ListOrder.descending` | `"D"` | `"Descending"` |
| `ListOrder.page_break` | `"P"` | `"PageBreak"` |
| `ListOrder.font_name` | `"F"` | `"FontName"` |
| `ListOrder.font_size` | `"S"` | `"FontSize"` |
| `ListOrder.font_bold` | `"B"` | `"FontBold"` |
| `ListOrder.background_color` | `"BC"` | `"BackgroundColor"` |
| `ListOrder.spacing` | `"SP"` | `"Spacing"` |

**Top-level `List` fields are fine** — they use matching aliases (`"ListName"`, `"HeadLine2"`, etc.).

## Solution

Override `Fields`, `Filters`, and `Orders` in the serialized dict before POSTing:

```python
from raceresult.endpoints.lists import List, ShowAt

def _field(expression: str, label: str, alignment: int = 1, line: int = 1) -> dict:
    return {
        'Expression': expression, 'Label': label, 'Label2': '',
        'Alignment': alignment, 'FontBold': False, 'FontItalic': False,
        'FontUnderlined': False, 'Line': line, 'Color': '', 'Link': '',
        'ColSpan': 0, 'ColOffset': 0, 'Position': 0,
        'DynamicFormat': '', 'PreviewOnly': False, 'ResponsiveHide': 0,
    }

def _filter(expression1: str, operator: str, expression2: str,
            or_conjunction: bool = False) -> dict:
    return {
        'OrConjunction': or_conjunction,
        'Expression1': expression1,   # field name WITHOUT brackets (e.g. "Contest")
        'Operator': operator,
        'Expression2': expression2,   # literal value as string (e.g. "6")
    }

def _order(expression: str, descending: bool = False, grouping: int = 0,
           font_size: int = 0, spacing: int = 0) -> dict:
    return {
        'Expression': expression, 'Descending': descending, 'Grouping': grouping,
        'GroupFilterDefault': 0, 'GroupFilterLabel': '', 'PageBreak': 0,
        'FontName': '', 'FontSize': font_size, 'FontBold': False,
        'FontItalic': False, 'FontUnderlined': False,
        'Color': '', 'BackgroundColor': '', 'Spacing': spacing,
    }

async def save_list_with_correct_keys(client, event_id: str, lst: List,
                                      filters: list, orders: list, fields: list) -> None:
    data = lst.model_dump(by_alias=True)   # top-level keys are correct
    data['Filters'] = filters              # override with correct keys
    data['Orders'] = orders
    data['Fields'] = fields
    await client.post_json(event_id, 'lists/save', data=data)
```

Usage:

```python
async with RaceResultAPI() as api:
    await api.login(api_key=API_KEY)
    event = api.event(EVENT_ID)

    lst = List(
        name='Ergebnislisten|03 Ergebnisliste AquaBike',
        head_line1='[eventname]',
        head_line1_show=ShowAt.EVERY_PAGE,
        head_line2='Ergebnisliste AquaBike',
        head_line2_show=ShowAt.EVERY_PAGE,
        font_name='Arial', font_size=10,
        # ... other top-level properties ...
    )

    filters = [_filter('Contest', '=', '6')]
    orders  = [_order('T1')]          # T1 = result ID 1 (Ziel)
    fields  = [
        _field('Position',           'Platz'),
        _field('Bib',                'Startnr.'),
        _field('FirstLastname',      'Name',  alignment=0),
        _field('Club',               'Verein', alignment=0),
        _field('AgeGroup.NameShort', 'AK'),
        _field('T21',                'Schwimmzeit'),
        _field('T13',                'Radzeit'),
        _field('T1',                 'Gesamtzeit'),
    ]

    await save_list_with_correct_keys(api._client, EVENT_ID, lst, filters, orders, fields)
```

## Field Name Conventions in RaceResult Expressions

### List Column Expressions (`_field(...).Expression`)
Use **English system names without brackets** for simple fields:

| Display | Expression |
|---------|------------|
| Laufende Nummer | `Position` |
| Startnummer | `Bib` |
| Vor- + Nachname | `FirstLastname` |
| Verein | `Club` |
| Altersklasse Kürzel | `AgeGroup.NameShort` |
| Custom Ergebnis ID n | `Tn` (e.g. `T1`, `T21`, `T13`) |
| Status-bereinigter Platz | `MitStatus([GesPlp])` |

### Filter Expression1 (field name)
Use system field names **without brackets**:
- `Contest` (not `[CONTEST]` or `[Wettbewerb]`)
- `Status` 
- `Finished`
- `Tn` for custom result ID n

### Filter Expression2 (value)
Literal string value: `"6"`, `"1"`, `"4"`.
For calculated expressions: use brackets `"[RANK1TOP4]"`.

### Order Expressions
Full expression syntax with brackets for complex conditions:
- Simple: `T1`, `GesPl`
- Complex: `iif([Swim] <> "";0;1)`

## Verification

After save, read back with raw API to confirm:

```python
raw = await api._client.get_json(event_id, 'lists/get',
    {'name': list_name, 'noTranslate': False, 'lang': ''})
print('Filters:', raw.get('Filters'))
print('Orders:', raw.get('Orders')[:1])
print('Fields:', [(f['Label'], f['Expression']) for f in raw.get('Fields', [])])
```

Fields, Filters, and Orders must be non-empty with correct values.

## Notes

- `event.lists.delete(name)` removes an existing list (use before recreating)
- `event.lists.copy(name, new_name)` clones structure but may not copy fields  
- `api._client` is a `RaceResultClient` — `post_json(event_id, endpoint, data)` is public
- The bug affects only **nested** models; top-level `List` fields serialize correctly
- `Line: 1` in field dicts = data line (not header); use `0` for header lines

## See Also

- `py-raceresult-bib-assignment` — bulk bib updates via participants API
