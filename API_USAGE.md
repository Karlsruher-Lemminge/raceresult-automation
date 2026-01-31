# py-raceresult API Beispiele

Funktionierende Python Code-Beispiele für die RaceResult API.

## Setup

```python
import asyncio
from raceresult import RaceResultAPI

# API Key aus .env laden
api_key = 'DEIN_API_KEY'
event_id = '380702'
```

## Grundstruktur

```python
async def main():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        # ... API Aufrufe hier ...

asyncio.run(main())
```

## Grundeinstellungen abrufen

```python
async def get_basic_settings():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        settings = await event.settings.get(
            'EventName',      # Veranstaltungsname
            'EventDate',      # Veranstaltungsdatum (YYYY-MM-DD)
            'EventDate2',     # Zweites Datum (optional)
            'EventLocation',  # Veranstaltungsort
            'PaymentMode',    # Abrechnungsmodus (leer = echte Veranstaltung)
            'AgeGroupMode'    # Altersklassen-Modus
        )

        for key, value in settings.items():
            print(f'{key}: {value}')

asyncio.run(get_basic_settings())
```

## Anmelde-Formulare

### Alle Formulare auflisten

```python
async def list_registration_forms():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        # Namen aller Formulare abrufen
        form_names = await event.registrations.names()
        print(f'Formulare: {form_names}')
        # Beispiel: ['Einzel-Änderung', 'Einzel-Anmeldung', 'Sammel-Änderung', 'Sammel-Anmeldung']

asyncio.run(list_registration_forms())
```

### Formular-Details abrufen

```python
async def get_registration_form_details():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        form_names = await event.registrations.names()

        for name in form_names:
            form = await event.registrations.get(name)
            print(f'\nFormular: {name}')
            print(f'  Titel: {form.title}')
            print(f'  Aktiv: {form.enabled}')
            print(f'  Aktiv von: {form.enabled_from}')  # datetime mit timezone
            print(f'  Aktiv bis: {form.enabled_to}')    # datetime mit timezone
            print(f'  Max Teilnehmer: {form.limit}')
            print(f'  Typ: {form.type}')  # 'single' oder 'group'

            # Bestätigungsseite
            if form.confirmation:
                print(f'  Bestätigungsseite Titel: {form.confirmation.title}')
                print(f'  Bestätigungsseite Text: {form.confirmation.expression}')

asyncio.run(get_registration_form_details())
```

## E-Mail Templates

### Alle Templates auflisten

```python
async def list_email_templates():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        template_names = await event.email_templates.names()
        print(f'Templates: {template_names}')

asyncio.run(list_email_templates())
```

### Template-Details abrufen

```python
async def get_email_template_details():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        template_names = await event.email_templates.names()

        for name in template_names:
            template = await event.email_templates.get(name)
            print(f'\nTemplate: {name}')
            print(f'  Absender: {template.sender}')
            print(f'  BCC: {template.bcc}')
            print(f'  Betreff: {template.subject}')
            print(f'  HTML: {template.html}')
            print(f'  Text (Body): {template.text[:200]}...')  # Gekürzt

asyncio.run(get_email_template_details())
```

## Chip File

```python
async def get_chip_file():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        chipfile = await event.chipfile.get()
        count = len(chipfile) if chipfile else 0
        print(f'Chip File Einträge: {count}')

        # Erste 5 Einträge anzeigen
        if chipfile:
            for entry in chipfile[:5]:
                print(f'  {entry}')

asyncio.run(get_chip_file())
```

## Teilnehmer

### Anzahl Teilnehmer

```python
async def get_participant_count():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        count = await event.data.count()
        print(f'Anzahl Teilnehmer: {count}')

asyncio.run(get_participant_count())
```

## Gutscheine (Vouchers)

```python
async def get_vouchers():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        vouchers = await event.vouchers.get()
        count = len(vouchers) if vouchers else 0
        print(f'Anzahl Gutscheine: {count}')

asyncio.run(get_vouchers())
```

## Altersklassen

```python
async def get_age_groups():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        agegroups = await event.agegroups.get()
        print(f'Anzahl Altersklassen: {len(agegroups)}')

        for ag in agegroups:
            print(f'  {ag.name_short}: {ag.name}')
            print(f'    Alter: {ag.age_from}-{ag.age_to}')
            print(f'    Geburtsdatum: {ag.date_start} bis {ag.date_end}')
            print(f'    Geschlecht: {ag.sex}')
            print(f'    Wettbewerb: {ag.contest}')

asyncio.run(get_age_groups())
```

## Wettbewerbe (Contests)

```python
async def get_contests():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        contests = await event.contests.get()
        print(f'Anzahl Wettbewerbe: {len(contests)}')

        for c in contests:
            print(f'  ID {c.id}: {c.name}')

asyncio.run(get_contests())
```

## Veranstaltungsliste

```python
async def list_events():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)

        # Alle Events des Jahres 2026 abrufen
        events = await api.event_list(year=2026)

        for e in events:
            print(f'{e.id}: {e.event_name} ({e.event_date})')
            print(f'  Ort: {e.event_location}')
            print(f'  Teilnehmer: {e.participants}')

asyncio.run(list_events())
```

## Komplettes Prüfskript

```python
import asyncio
from datetime import datetime, timedelta
from raceresult import RaceResultAPI

async def verify_event(api_key: str, event_id: str):
    """Vollständige Prüfung einer Veranstaltung."""

    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        # 1. Grundeinstellungen
        settings = await event.settings.get(
            'EventName', 'EventDate', 'EventLocation', 'PaymentMode'
        )
        event_name = settings.get('EventName', '')
        event_date_str = settings.get('EventDate', '')
        event_date = datetime.strptime(event_date_str, '%Y-%m-%d')

        print(f'=== {event_name} ===')
        print(f'Datum: {event_date.strftime("%d.%m.%Y")}')
        print(f'Ort: {settings.get("EventLocation", "")}')

        # 2. Anmelde-Formulare
        print('\n=== Anmelde-Formulare ===')
        form_names = await event.registrations.names()
        for name in form_names:
            form = await event.registrations.get(name)
            print(f'{name}: {form.enabled_from} - {form.enabled_to}')

        # 3. E-Mail Templates
        print('\n=== E-Mail Templates ===')
        template_names = await event.email_templates.names()
        for name in template_names:
            template = await event.email_templates.get(name)
            # Prüfe auf alte Jahreszahlen
            text = (template.text or '') + (template.subject or '')
            old_years = [y for y in ['2024', '2025'] if y in text]
            status = f'⚠️ Enthält {old_years}' if old_years else '✓'
            print(f'{name}: {status}')

        # 4. Chip File
        print('\n=== Chip File ===')
        chipfile = await event.chipfile.get()
        count = len(chipfile) if chipfile else 0
        print(f'Einträge: {count}')

        # 5. Teilnehmer
        print('\n=== Teilnehmer ===')
        participant_count = await event.data.count()
        print(f'Anzahl: {participant_count}')

        # 6. Gutscheine
        print('\n=== Gutscheine ===')
        vouchers = await event.vouchers.get()
        voucher_count = len(vouchers) if vouchers else 0
        print(f'Anzahl: {voucher_count}')

        # 7. Altersklassen
        print('\n=== Altersklassen ===')
        agegroups = await event.agegroups.get()
        print(f'Anzahl: {len(agegroups)}')

# Ausführen
api_key = 'DEIN_API_KEY'
event_id = '380702'
asyncio.run(verify_event(api_key, event_id))
```

## Verfügbare Endpoints

Die `EventAPI` bietet folgende Endpoints:

| Endpoint | Beschreibung |
|----------|--------------|
| `event.settings` | Veranstaltungseinstellungen |
| `event.registrations` | Anmelde-Formulare |
| `event.email_templates` | E-Mail Vorlagen |
| `event.chipfile` | Chip-Datei |
| `event.data` | Teilnehmerdaten |
| `event.vouchers` | Gutscheine |
| `event.agegroups` | Altersklassen |
| `event.contests` | Wettbewerbe |
| `event.participants` | Teilnehmer |
| `event.times` | Zeiten |
| `event.rawdata` | Timing-Rohdaten |
| `event.history` | History-Einträge |
| `event.lists` | Listen |
| `event.results` | Ergebnisse |
| `event.entryfees` | Startgebühren |
| `event.bibranges` | Startnummernbereiche |
| `event.customfields` | Zusatzfelder |
| `event.timingpoints` | Messstellen |
| `event.exporters` | Exporter |

## Hinweise

- Die API ist **asynchron** - alle Aufrufe müssen mit `await` erfolgen
- Verwende `async with RaceResultAPI() as api` für automatisches Session-Management
- Datumsfelder in Formularen sind `datetime` Objekte mit Timezone-Info
- Die `names()` Methode gibt eine Liste von Namen zurück, `get(name)` die Details
