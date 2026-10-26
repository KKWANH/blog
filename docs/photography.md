# Photography

The gallery is prepared for future collections at `/photography`. It stays out of production navigation and the sitemap until a real collection is added. Development mode shows an explicitly labelled layout sample using three supplied portraits; those are not credited as photographs taken by Kwanho.

## Add a photograph locally

```sh
npm run photos:add -- --file "C:/Photos/frame.jpg" --title "Evening window" --alt "Describe the visible photograph" --collection "Windows"
```

Optional arguments: `--date YYYY-MM-DD`, `--location "Place"`, `--credit "Photographer"`.

The command creates:

- a full image, up to 2400px on its long edge;
- a thumbnail, up to 1000px;
- an entry in `contents/photography/photos.json`.

It applies the image's orientation, converts to sRGB and omits embedded metadata from the public derivatives. The original file is not changed. Dates, locations and photographer credits are not inferred.

The first successful import enables the collection. Review the local gallery, then publish through the normal repository workflow. The import command does not push or deploy.

`PHOTO_IMPORT_ROOT` is a local test override. Checks use a separate fixture repository so test images do not appear in the real collection.

## Gallery behaviour

- A responsive contact sheet, with the original aspect ratio.
- Optional collection filters.
- Full-image dialog with caption and optional credit/location/date.
- Previous/next buttons and Left/Right keys, Escape to close and focus return to the originating image.
- Native Open image link.
- Hover response follows the site's motion preference.

To remove or reorder a photo, edit the manifest's items array. Set `published` to false to hide the gallery while preparing a collection. Keep `published` false when the list is empty.

The flag controls the page/navigation, not access to files already deployed under `public`. Keep unpublished original/private material outside that directory.

There is no public upload endpoint or remote account system. This is a local content workflow, consistent with the current site.
