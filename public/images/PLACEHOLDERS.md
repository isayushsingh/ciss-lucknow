# Images to add

All photos on the site are currently shown as sage/grey placeholder tiles with
the file path written on them. To make a placeholder real, drop the image at the
path below AND (in `components/Site.jsx`) swap the placeholder `<div className="focus-img">`
(or `proc-img` / `tst-img`) for an `<img src="..." />` — see the note near each section.

The logo is already live: `public/images/logo.png`

Photos referenced by the design (add when ready):

Hero carousel (portraits of guards / sites):
  public/images/carousel/1.jpg ... 5.jpg

Services (one per service, landscape/portrait works):
  public/images/services/industrial.jpg
  public/images/services/corporate.jpg
  public/images/services/residential.jpg
  public/images/services/bank.jpg
  public/images/services/hotel.jpg
  public/images/services/school.jpg
  public/images/services/events.jpg
  public/images/services/bouncers.jpg
  public/images/services/cashvan.jpg
  public/images/services/women.jpg
  public/images/services/exservice.jpg
  public/images/services/mall.jpg
  public/images/services/construction.jpg
  public/images/services/general.jpg

Process (3 steps):
  public/images/process/consult.jpg
  public/images/process/deploy.jpg
  public/images/process/support.jpg

Clients (testimonial portraits):
  public/images/clients/1.jpg ... 3.jpg

Tip: keep them roughly 1200px on the long edge and compressed (~200–400 KB each)
so the site stays fast on mobile.
