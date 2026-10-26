# Travel editor

The atlas is public to read. Editing is an opted-in **local development** feature; it is not an unauthenticated public admin API.

## Open the editor

```sh
npm run dev:edit
```

This binds Next.js to `127.0.0.1:3100` and enables the local editor. Open `/travel`, choose **Manage places**, then use **Add place** or an entry's **Edit** action.

The editor provides:

- optional location lookup, with manual name/country/coordinate entry;
- stay-category updates;
- named removal confirmation and Undo;
- refreshed map, list and counts after a saved change;
- conflict feedback when a second tab has changed the atlas.

The place index can be searched by city or country and filtered by country and stay. It remains usable if the map cannot open.

## Where changes go

The canonical data is `contents/travel/places.json`. The initial snapshot preserves all 107 records and their IDs, including the existing duplicate entry. No records were automatically removed.

Each successful mutation validates the document, writes a temporary file in the same directory, then atomically renames it. A content revision prevents an old form overwriting a newer update. Writes are serialized within the editing process; run one local editing server for a given file.

Changes survive refresh/restart and are included in the next normal site build/publish. Saving does not itself deploy or push to GitHub.

`TRAVEL_STORE_PATH` can point to a separate test file. It is a server-only setting. Tests use that override rather than changing the live atlas.

## Request boundary

All writes require:

1. `TRAVEL_EDITOR_ENABLED=1`;
2. development mode, outside Vercel;
3. loopback request URL and Host;
4. a loopback Origin;
5. the current editor request token, obtained through the same-origin bootstrap.

No CORS permission is granted for external origins. The token is generated at runtime and is not embedded in public build output. Production remains read-only even if the enable flag is accidentally supplied.

This is a local-machine editing boundary, not an account/login system. Remote editing would need owner authentication and durable hosted storage. The current interface does not promise that capability.

## Data and failure behaviour

The document has `version`, `updatedAt`, and `places`. Each place has a stable ID, name, country/code, stay category and finite latitude/longitude within valid ranges.

- New duplicate city/country entries are rejected; existing duplicate records are preserved and remain editable.
- Edits retain IDs and existing country labels unless the country changes.
- Undo restores the removed record's ID and fields.
- Corrupt saved JSON is reported; it is not silently replaced by the initial data.
- A failed or stale save keeps the form available. An uncertain network result asks the owner to reload before retrying.
- Location lookup uses the installed city dataset on the server, only in editor mode. The public atlas loads the small resolved snapshot.

Run `npm run test:content` for Markdown portability plus store/access regression checks.
