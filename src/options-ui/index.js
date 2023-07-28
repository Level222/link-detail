// import React, { useState, useEffect } from "react";
// import ReactDOM from "react";
import "./style.css";

(async () => {
  "use strict";


  const animation = (await chrome.storage.sync.get("animation")).animation ?? {};
  animation.fadeIn = animation.fadeIn ?? {};
  animation.fadeOut = animation.fadeOut ?? {};

  const animationInputRule = [
    {
      id: "fade-in-delay",
      animation: "fadeIn",
      prop: "delay"
    },
    {
      id: "fade-in-duration",
      animation: "fadeIn",
      prop: "duration"
    },
    {
      id: "fade-out-delay",
      animation: "fadeOut",
      prop: "delay"
    },
    {
      id: "fade-out-duration",
      animation: "fadeOut",
      prop: "duration"
    }
  ];

  for (const rule of animationInputRule) {
    const elem = document.getElementById(rule.id);
    elem.value = animation[rule.animation][rule.prop];
    elem.addEventListener("input", () => {
      animation[rule.animation][rule.prop] = elem.value
        ? Number(elem.value)
        : null;
    });
  }

  const notice = (text) => {
    const elem = document.createElement("div");
    elem.textContent = text;
    elem.classList.add("notice");
    elem.addEventListener("animationend", () => {
      elem.remove();
    });
    document.body.append(elem);
  };

  const form = document.getElementById("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await chrome.storage.sync.set({ animation });
    notice("Settings have been updated.");
  });
})();
