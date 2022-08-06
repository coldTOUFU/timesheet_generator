function putRangeSelect(document: Document) {
  const periodMax = parseInt((<HTMLSelectElement>document.getElementById("periodMax")).value);
  const periodRange = <HTMLElement>document.getElementById("periodRanges");

  for (let i = 1; i <= periodMax; i++) {
    const sp = document.createElement("span");
    sp.setAttribute("class", "periodRange");

    const selHourSt = document.createElement("select");
    const selMinSt = document.createElement("select");
    const selHourEn = document.createElement("select");
    const selMinEn = document.createElement("select");
    selHourSt.setAttribute("class", "hourRangeSt");
    selMinSt.setAttribute("class", "minuteRangeSt");
    selHourEn.setAttribute("class", "hourRangeEn");
    selMinEn.setAttribute("class", "minuteRangeEn");

    const timeColonSt = document.createElement("span");
    const timeColonEn = document.createElement("span");
    const tilde = document.createElement("span");
    timeColonSt.innerText = ":";
    timeColonEn.innerText = ":";
    tilde.innerText = "~";

    for (let period = 0; period < 24; period++) {
      const opt = document.createElement("option");
      opt.value = String(period).padStart(2, "0");
      selHourSt.appendChild(opt);
      selHourEn.appendChild(opt);
    }
    for (let period = 0; period < 12; period++) {
      const opt = document.createElement("option");
      opt.value = String(period * 5).padStart(2, "0");
      selMinSt.appendChild(opt);
      selMinEn.appendChild(opt);
    }
 
    sp.appendChild(selHourSt);
    sp.appendChild(timeColonSt);
    sp.appendChild(selMinSt);
    sp.appendChild(tilde);
    sp.appendChild(selHourEn);
    sp.appendChild(timeColonEn);
    sp.appendChild(selHourEn);
    if (i < periodMax) {
      sp.appendChild(document.createElement("br"));
    }
    periodRange.appendChild(sp);
  }
}
