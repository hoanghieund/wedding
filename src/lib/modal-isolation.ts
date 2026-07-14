let activeCount = 0;
let snapshot: { inert: string | null; ariaHidden: string | null } | null = null;
let observer: MutationObserver | null = null;

function applyIsolation(el: HTMLElement): void {
  if (snapshot === null) {
    snapshot = {
      inert: el.getAttribute("inert"),
      ariaHidden: el.getAttribute("aria-hidden"),
    };
  }
  el.setAttribute("inert", "");
  el.setAttribute("aria-hidden", "true");
}

function restoreSnapshot(el: HTMLElement): void {
  if (!snapshot) return;
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

/**
 * Sets page-content isolation for modals/overlays.
 * Uses a balanced active count so multiple consumers (invitation + lightbox)
 * can call this without conflicting. The first `true` snapshots original
 * attributes and starts a MutationObserver to re-apply if React strips them
 * during reconciliation. The last `false` disconnects the observer and
 * restores the exact snapshot.
 */
export function setPageModalIsolation(active: boolean): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById("page-content");
  if (!el) return;

  if (active) {
    activeCount = Math.max(0, activeCount) + 1;
    if (activeCount === 1) {
      applyIsolation(el);

      // Watch for React stripping attributes after hydration reconciliation
      observer = new MutationObserver(() => {
        if (activeCount > 0 && !el.hasAttribute("inert")) {
          applyIsolation(el);
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ["inert", "aria-hidden"] });
    }
  } else {
    activeCount = Math.max(0, activeCount - 1);
    if (activeCount <= 0) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      restoreSnapshot(el);
    }
  }
}
