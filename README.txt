PANDA — SHARED HEADER & FOOTER BUILD
======================================
Every page now uses the same:
- header.html markup
- footer.html markup
- mobile bottom navigation
- drawer, search, reviews modal and MORE sheet

Added standalone reusable files:
- header.html
- footer.html

The actual .html pages contain the same header/footer structure so they work directly
when opened as static files. For PHP/SSI/templating systems, header.html and footer.html
can be included instead.

Footer layout was rebuilt with fixed columns and nowrap/overflow-safe links so ABOUT US
and the other navigation groups keep their intended alignment on desktop and mobile.
