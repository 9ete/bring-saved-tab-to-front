# Change Log

All notable changes to the "Bring Saved Tab to Front" extension are documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.0] - 2026-06-25

### Added

- Initial public release.
- Automatically moves the most recently saved tab to index `0` of its editor group and the top of the Open Editors list (~300 ms debounce after save).
- Pins preview tabs before repositioning so the working file stays open.
- Skips work when the tab is already first or when multiple files are saved together (e.g. Save All).
