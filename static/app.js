// Client-side filters only. No tracking, no network calls.
(function () {
  function applyRowFilters(root) {
    var text = (root.querySelector("[data-filtro-texto]") || {}).value || "";
    text = text.toLowerCase().trim();
    var active = root.querySelector(".chip.ativo[data-classe]");
    var classe = active ? active.getAttribute("data-classe") : "";
    root.querySelectorAll("tbody tr").forEach(function (tr) {
      var okText = !text || (tr.getAttribute("data-texto") || "").indexOf(text) !== -1;
      var okClass = !classe || tr.getAttribute("data-classe") === classe;
      tr.classList.toggle("oculto", !(okText && okClass));
    });
  }
  document.querySelectorAll("[data-filtro-texto]").forEach(function (input) {
    var root = input.closest("section, main") || document;
    input.addEventListener("input", function () { applyRowFilters(root); });
  });
  document.querySelectorAll(".chip[data-classe]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var root = chip.closest("section, main") || document;
      root.querySelectorAll(".chip[data-classe]").forEach(function (c) { c.classList.remove("ativo"); });
      chip.classList.add("ativo");
      applyRowFilters(root);
    });
  });
  document.querySelectorAll("[data-filtro-casa] .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll("[data-filtro-casa] .chip").forEach(function (c) { c.classList.remove("ativo"); });
      chip.classList.add("ativo");
      var casa = chip.getAttribute("data-casa");
      document.querySelectorAll(".cartao[data-casa]").forEach(function (card) {
        card.style.display = !casa || card.getAttribute("data-casa") === casa ? "" : "none";
      });
    });
  });
})();
