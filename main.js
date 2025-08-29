/*boton de cambiar titulo*/
document.getElementById("btnModTitulo").addEventListener("click", () => {
  let nuevo = prompt("Escribe el nuevo titulo:");
  if (nuevo) {
    document.title = nuevo;
    document.querySelector("header h1").textContent = nuevo; 
  }
});

/*boton de cambiar vista de contenido*/
document.getElementById("btnModVista").addEventListener("click", () => {
  document.querySelector(".two-col").classList.toggle("stacked");
});

/*boton de agregar imagen*/
document.getElementById("btnAggImagen").addEventListener("click", () => {
  const modo = prompt("Como desea agregar su imagen?\n1 = URL\n2 = Imagen local", "1");
  if (!modo) return;

  if (modo.trim() === "1") {
    const url = prompt("Pega la URL directa de la imagen:");
    if (url) insertImage(url.trim());
  } else if (modo.trim() === "2") {
    pickLocalFile().then((dataUrl) => {
      if (dataUrl) insertImage(dataUrl);
    });
  } else {
    alert("Opcion no valida.\n Usa 1 (URL) o 2 (Imagen local).");
  }
});

function pickLocalFile(){
  return new Promise((resolve) => {
    let input = document.getElementById("hiddenImagePicker");
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.id = "hiddenImagePicker";
      input.style.display = "none";
      document.body.appendChild(input);
    }

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result); 
        reader.readAsDataURL(input.files[0]);
      } else {
        resolve(null);
      }
    };

    input.value = ""; 
    input.click();
  });
}

function insertImage(src){
  const container = document.getElementById("imgContainer");
  if (!container) return;
  let img = container.querySelector("img.extra-image");
  if (!img) {
    img = document.createElement("img");
    img.className = "extra-image";
    img.alt = "Imagen del libro";
    container.appendChild(img);
  }
  img.src = src;
}
