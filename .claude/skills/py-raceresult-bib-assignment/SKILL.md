---
name: py-raceresult-bib-assignment
description: |
  Bulk-update or swap bib numbers (Startnummern) in RaceResult events using the
  py-raceresult Python library. Use when: (1) reassigning all bibs for an event,
  (2) swapping two individual bibs, (3) getting participant data including name fields.
  Covers: SaveValueArrayItem usage, two-step temp-bib conflict avoidance, correct
  field names (Firstname/Lastname not Name), and data.list() field syntax.
author: Claude Code
version: 1.0.0
date: 2026-03-16
---

# py-raceresult Bib Assignment

## Problem
Updating bib numbers (Startnummern) in RaceResult via the py-raceresult API requires
careful handling to avoid conflicts when multiple bibs are being reassigned simultaneously.

## Context / Trigger Conditions
- Bulk reassignment of all bibs (Startnummernvergabe)
- Swapping two individual bib numbers
- Reading participant data with correct name fields

## Solution

### Correct Field Names for Participant Data

`Name` returns 0 (not useful). Use `Firstname` and `Lastname`:

```python
participants = await event.data.list(
    fields=['Bib', 'Firstname', 'Lastname', 'Contest',
            'Bestzeit 1000 m Schwimmen', 'Bestzeit 10 km Laufen']
)
# Returns: [bib, firstname, lastname, contest, swim_time, run_time]
```

### Bulk Bib Reassignment (Two-Step with Temp Bibs)

When reassigning many bibs, conflicts arise if bib A→B and bib B→C (B is used twice).
Solution: first move all to temp bibs (e.g. 200+), then to final bibs.

```python
from raceresult.models.participant import SaveValueArrayItem

# Step 1: Move all to temporary bibs to avoid conflicts
temp_items = [
    SaveValueArrayItem(bib=old_bib, field_name='Bib', value=200 + i)
    for i, old_bib in enumerate(old_bibs)
]
await event.participants.save_value_array(temp_items)

# Step 2: Move from temp bibs to final bibs
final_items = [
    SaveValueArrayItem(bib=200 + i, field_name='Bib', value=new_bib)
    for i, new_bib in enumerate(new_bibs)
]
await event.participants.save_value_array(final_items)
```

### Swapping Two Bibs

Use a single temp bib (e.g. 999) to avoid the A↔B conflict:

```python
# Swap bib 2 and bib 3
await event.participants.save_value_array([
    SaveValueArrayItem(bib=2, field_name='Bib', value=999)
])
await event.participants.save_value_array([
    SaveValueArrayItem(bib=3, field_name='Bib', value=2)
])
await event.participants.save_value_array([
    SaveValueArrayItem(bib=999, field_name='Bib', value=3)
])
```

### Verification After Reassignment

```python
result = await event.data.list(fields=['Bib', 'Firstname', 'Lastname'])
bibs = sorted([x[0] for x in result])
missing = [b for b in range(1, expected_max + 1) if b not in bibs]
print(f"Bibs: {bibs[0]}–{bibs[-1]}, fehlende: {missing if missing else 'keine'}")
```

## Key API Facts

| Method | Signature | Use |
|--------|-----------|-----|
| `event.data.list(fields=[...])` | returns `list[list[Any]]` | Read participant data |
| `event.participants.save_value_array(items)` | `list[SaveValueArrayItem]` | Bulk field update |
| `SaveValueArrayItem(bib=N, field_name='Bib', value=M)` | — | Change bib N to M |
| `Identifier.by_bib(N)` | — | Single participant identifier |

## Notes
- `save_value_array` sends all changes in one API call — efficient for bulk ops
- Always use `async with RaceResultAPI() as api` pattern
- API Key in `.env` as `API_KEY`
- Event ID is a string (e.g. `"380683"`)
- `data.list()` takes `fields` as `list[str]`, NOT pipe-separated string
