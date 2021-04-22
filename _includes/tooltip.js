/**
 * Usage
    <div x-data="tooltip('main-tooltip')" x-init="init">
      <p x-spread="tooltip" class="tooltip">Dropdown Contents</p>
      <button x-spread="toggle">Open Dropdown</button>
    </div>
 */
function tooltip(tooltipId, type = "label", delay = 500, spacing = 8) {
  let timerId;
  const ariaAttribute =
    type === "label" ? "aria-labelledby" : "aria-describedby";

  return {
    open: false,
    init() {
      const tooltip = this.$el.querySelector('[x-spread="tooltip"]');

      tooltip.id = tooltipId;
      tooltip.setAttribute("role", "tooltip");
      tooltip.style.position = "absolute";
    },
    _toggle(toggle) {
      this.open = true;

      const tooltip = this.$el.querySelector('[x-spread="tooltip"]');

      requestAnimationFrame(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const toggleRect = toggle.getBoundingClientRect();

        const widthDifference = (tooltipRect.width - toggleRect.width) / 2;
        const left = toggleRect.left - widthDifference + window.pageXOffset;

        const top =
          toggleRect.top -
          toggleRect.height -
          tooltipRect.height -
          spacing +
          window.pageYOffset;

        tooltip.style.left = left > 0 ? left : spacing + "px";
        tooltip.style.top = top + "px";

        toggle.setAttribute(ariaAttribute, tooltipId);
      });
    },
    toggle: {
      ["@mouseenter"](e) {
        timerId = setTimeout(() => {
          this._toggle(e.target);
        }, delay);
      },
      ["@mouseleave"](e) {
        clearTimeout(timerId);
        this.open = false;
      },
      ["@focus"](e) {
        this._toggle(e.target);
      },
      ["@blur"](e) {
        const toggle = e.target;
        toggle.removeAttribute(ariaAttribute);
        this.open = false;
      },
    },
    tooltip: {
      ["x-show"]() {
        return this.open;
      },
    },
  };
}
