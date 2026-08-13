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

## Identifier

Viele Endpoints brauchen einen `Identifier` zum Adressieren von Teilnehmern:

```python
from raceresult.endpoints.participants import Identifier

Identifier.by_bib(123)          # nach Startnummer
Identifier.by_pid(456)          # nach interner Participant-ID
Identifier.by_filter('')        # nach Filter-Ausdruck (leer = alle)
Identifier.by_filter('Contest=1')  # nur Wettbewerb 1
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

## Check-In Kioske

### Kiosk-Namen abrufen

```python
async def list_kiosks():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        names = await event.kiosks.names()
        print(f'Kioske: {names}')

asyncio.run(list_kiosks())
```

### Kiosk abrufen und anpassen

```python
from raceresult.models.kiosk import KioskAfterSave, KioskDisplayField, KioskStep

async def configure_kiosk():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        kiosk = await event.kiosks.get('Check-In')

        # Bedingten Schritt hinzufügen (nur für Teilnehmer unter 18)
        kiosk.steps.append(KioskStep(
            type='edit',
            label='Erziehungsberechtigte',
            only_show_if='AgeOnDate(2026;06;13)<18',
            display_fields=[
                KioskDisplayField(type='field', value='EBZustimmung', label='Zustimmung EB'),
                KioskDisplayField(type='field', value='EBName', label='Name EB'),
            ],
        ))

        # Nach Check-In ein Feld automatisch setzen
        kiosk.after_save = [
            KioskAfterSave(type='SaveValue', destination='CheckIn', value='1')
        ]

        await event.kiosks.save(kiosk)

asyncio.run(configure_kiosk())
```

### Kiosk kopieren und umbenennen

```python
async def manage_kiosks():
    async with RaceResultAPI() as api:
        await api.login(api_key=api_key)
        event = api.event(event_id)

        await event.kiosks.new('Neuer Kiosk')
        await event.kiosks.copy('Check-In', 'Check-In Backup')
        await event.kiosks.rename('Check-In Backup', 'Check-In 2')
        await event.kiosks.delete('Check-In 2')

asyncio.run(manage_kiosks())
```

## Daten löschen (mit Identifier)

Für `history`, `times` und `rawdata` ist ein `Identifier` als erstes Argument Pflicht:

```python
from raceresult.endpoints.participants import Identifier

# History
N = await event.history.count(Identifier.by_filter(''))
await event.history.delete(Identifier.by_filter(''))

# Zeiten
N = await event.times.count(Identifier.by_filter(''))
await event.times.delete(Identifier.by_filter(''))

# Timing-Rohdaten
N = await event.rawdata.count(Identifier.by_filter(''))
await event.rawdata.delete(Identifier.by_filter(''))

# Teilnehmer löschen (kein Identifier nötig)
N = await event.data.count()
await event.participants.delete(filter_expr='')

# Bankinformationen löschen
await event.participants.clear_bank_information(filter_expr='')
```

## Verfügbare Endpoints

Die `EventAPI` bietet folgende Endpoints:

| Endpoint | Beschreibung | Wichtige Methoden |
|----------|--------------|-------------------|
| `event.settings` | Veranstaltungseinstellungen | `get(*names)`, `get_value(name)`, `save_value(name, value)` |
| `event.registrations` | Anmelde-Formulare | `names()`, `get(name)`, `save(reg)`, `delete(name)`, `copy(name, new_name)`, `rename(name, new_name)`, `new(name)` |
| `event.email_templates` | E-Mail Vorlagen | `names()`, `get(name)`, `save(template)`, `delete(name)`, `send(name)` |
| `event.chipfile` | Chip-Datei | `get()`, `save(entries)`, `clear()` |
| `event.data` | Teilnehmerdaten (Query) | `count(filter_expr)`, `list(fields, filter_expr)` |
| `event.vouchers` | Gutscheine | `get()`, `save(vouchers)`, `delete(ids)` |
| `event.agegroups` | Altersklassen | `get(contest, set, name)`, `save(items)`, `delete(id)`, `generate(mode)`, `reassign(contest, identifier)` |
| `event.contests` | Wettbewerbe | `get()`, `get_one(id)`, `save(contest)`, `delete(id)` |
| `event.participants` | Teilnehmer (Schreiben) | `get_fields(identifier, fields)`, `save_fields(identifier, values)`, `save_value_array(values)`, `delete(filter_expr)`, `new(bib)`, `swap_bibs(bib1, bib2)`, `reset_bibs(sort)`, `clear_bank_information(filter_expr)` |
| `event.times` | Zeiten | `get(identifier, result)`, `count(identifier)`, `delete(identifier)`, `add(passings)` |
| `event.rawdata` | Timing-Rohdaten | `get(identifier)`, `count(identifier)`, `delete(identifier)`, `add_manual(tp, identifier, time)` |
| `event.history` | History-Einträge | `get(identifier)`, `count(identifier)`, `delete(identifier)` |
| `event.lists` | Listen | `names()`, `get(name)`, `save(list)`, `delete(name)`, `create_pdf(name)`, `create_html(name)`, `create_csv(name)`, `create_xlsx(name)`, `create_json(name)` |
| `event.results` | Ergebnisse | `get()`, `get_one(id)`, `save(items)`, `delete(id)` |
| `event.entryfees` | Startgebühren | `get(contest, id)`, `save(items)`, `delete(id)` |
| `event.bibranges` | Startnummernbereiche | `get()`, `save(items)`, `delete(id)` |
| `event.customfields` | Zusatzfelder | `get()`, `save(items)`, `delete(id)` |
| `event.timingpoints` | Messstellen | `get()`, `save(item, old_name='')`, `delete(name)` |
| `event.timingpointrules` | Messstellen-Regeln | `get()`, `save(items)`, `delete(id)` |
| `event.exporters` | Exporter | `get()`, `get_one(id)`, `save(item)`, `delete(id)` |
| `event.kiosks` | Check-In Kioske | `names()`, `get(name)`, `save(kiosk)`, `delete(name)`, `new(name)`, `copy(name, new_name)`, `rename(name, new_name)` |
| `event.splits` | Zwischenwertungen | `get()`, `save(items)`, `delete(id)` |
| `event.rankings` | Rankings | `get()`, `save(items)`, `delete(id)` |
| `event.team_scores` | Teamwertungen | `get()`, `save(items)`, `delete(id)` |
| `event.user_defined_fields` | Nutzerdefinierte Felder | `get()`, `set(items)` |
| `event.group_times` | Gruppenzeiten / Wellen | `get(ttype)`, `save(ttype, item)` |
| `event.rawdata_rules` | Rohdaten-Regeln | `get()`, `save(items)`, `delete(id)` |
| `event.webhooks` | Webhooks | `get()`, `save(items)`, `delete(id)` |
| `event.simple_api` | Simple-API Einträge | `get()`, `save(items)`, `delete(key)` |
| `event.statistics` | Statistiken | `names()`, `get(name)`, `save(item)`, `create(name, format, contests)`, `query(row, col, filter_expr, field, aggregation)` |
| `event.overwrite_values` | Überschreibwerte | `count(identifier, result, contest, filter_expr)`, `save(identifier, result, value)`, `delete(identifier, result, contest, filter_expr)` |
| `event.information` | Vorname/Namens-Infos | `frequent_names(prefix, max_no)`, `get_sex(name)`, `add_first_name(name, sex)` |
| `event.labels` | Etiketten | `names()`, `get(name)`, `save(label)` |
| `event.pictures` | Fotos | `names(folder)`, `get(name)`, `import_picture(folder, name, content)`, `delete(name)` |
| `event.archives` | Archiv | `get_matches(prefix, max_number)`, `get_entry(id, reg_no)`, `get_participations(identifier)`, `download()`, `import_file(data)` |
| `event.backup` | Backup | `active()`, `start(hostname, filename)`, `restart()`, `stop()`, `info()` |
| `event.certificate_sets` | Urkunden-Sets | `names()`, `get(name)`, `save(cs)`, `count(name, contests)`, `create(name, contests, filter, lang)` |
| `event.certificates` | Urkunden | `names()`, `get(name)`, `save(cert)`, `create_pdf(name, page, bib, lang)`, `create_jpg(name, page, bib, dpi, lang)` |
| `event.chat` | Chat | `get_messages(min_id)`, `get_users(username)`, `post_message(username, msg)` |
| `event.dependencies` | Abhängigkeiten | `show()`, `circular_references()` |
| `event.file` | SES-Freigabestatus | `get_file()`, `not_activated(filter_expr)`, `mod_job_id()`, `ses_version()` |
| `event.forwarding` | Weiterleitung | `active()`, `start(hostname, eventid, auth_token)`, `restart()`, `stop()`, `info()` |
| `event.synchronization` | Synchronisation | `is_checked_out()`, `set_checked_in()` |

## Hinweise

- Die API ist **asynchron** - alle Aufrufe müssen mit `await` erfolgen
- Verwende `async with RaceResultAPI() as api` für automatisches Session-Management
- Datumsfelder in Formularen sind `datetime` Objekte mit Timezone-Info
- Die `names()` Methode gibt eine Liste von Namen zurück, `get(name)` die Details
