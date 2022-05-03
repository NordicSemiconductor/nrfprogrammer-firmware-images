# nRF Programmer firmware images

[![Publish to Github Pages](https://github.com/NordicSemiconductor/nrfprogrammer-firmware-images/actions/workflows/publishToGHPages.yml/badge.svg?branch=saga)](https://github.com/NordicSemiconductor/nrfprogrammer-firmware-images/actions/workflows/publishToGHPages.yml)

Provides a list of pre-compiled firmware images for nRF Programmer in the GitHub
pages website for this repository.

## Updating the `manifest.json`

Adding a new tag will trigger a publication of the new `manifest.json` and the
archive files to GitHub pages using the
[`publishToGHPages` action](.github/workflows/publishToGHPages.yml) which runs
the [`generate-assets.ts`](./generate-assets.ts) script.

## Adding firmware images

1. Create a folder for the application in [`applications`](./applications).
2. Add one or more files containing the installable firmware images.
3. Document the application in a JSON document following the existing examples.
4. Push the changes to `saga` directly, or create a PR.
5. Create a release tag.
