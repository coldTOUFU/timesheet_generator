import { CannotFindElementError } from "./error/utils_error";

function load(id: string, file_name: string) {
  const xhr = new XMLHttpRequest();
  const box = document.getElementById(id);

  if (!box) {
    throw CannotFindElementError;
  }

  xhr.open("GET", file_name, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = xhr.responseText;
      box.innerHTML = box.innerHTML + response;
    }
  };
  xhr.send();
}
