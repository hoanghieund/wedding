let snapshot: { inert: string | null; ariaHidden: string | null } | null = null;

export function setPageModalIsolation(active: boolean): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById("page-content");
  if (!el) return;

  if (active) {
    if (snapshot === null) {
      snapshot = {
        inert: el.getAttribute("inert"),
        ariaHidden: el.getAttribute("aria-hidden"),
      };
    }
    el.setAttribute("inert", "");
    el.setAttribute("aria-hidden", "true");
  } else if (snapshot !== null) {
    if (snapshot.inert === null) {
      el.removeAttribute("inert");
    } else {
      el.setAttribute("inert", snapshot.inert);
    }
    if (snapshot.ariaHidden === null) {
      el.removeAttribute("aria-hidden");
    } else {
      el.setAttribute("aria-hidden", snapshot.ariaHidden);
    }
    snapshot = null;
  }
}
