let products = [];
let chemicalCompositions = [];

let currentOperation = null;
let currentIndex = -1;

// Función para mostrar el modal para agregar o editar producto/composición química
function showGenericModal(operation, index = -1) {
  currentOperation = operation;
  currentIndex = index;

  // Configurar el contenido del modal según la operación
  if (operation === "addProduct" || operation === "editProduct") {
    document.getElementById("modalTitle").textContent =
      operation === "addProduct"
        ? "Agregar Producto"
        : "Modificar Producto";
    document.getElementById("productFields").style.display = "block";
    document.getElementById("chemicalFields").style.display = "none";

    if (operation === "editProduct" && index >= 0) {
      const product = products[index];
      document.getElementById("modalDescription").value =
        product.description;
      document.getElementById("modalQuantity").value = product.quantity;
    } else {
      document.getElementById("modalDescription").value = "";
      document.getElementById("modalQuantity").value = "";
    }
  } else if (
    operation === "addChemical" ||
    operation === "editChemical"
  ) {
    document.getElementById("modalTitle").textContent =
      operation === "addChemical"
        ? "Agregar Composición Química"
        : "Modificar Composición Química";
    document.getElementById("productFields").style.display = "none";
    document.getElementById("chemicalFields").style.display = "block";

    if (operation === "editChemical" && index >= 0) {
      const composition = chemicalCompositions[index];
      document.getElementById("modalElement").value = composition.element;
      document.getElementById("modalSpec").value = composition.spec;
      document.getElementById("modalCasting").value = composition.casting;
    } else {
      document.getElementById("modalElement").value = "";
      document.getElementById("modalSpec").value = "";
      document.getElementById("modalCasting").value = "";
    }
  }

  document.getElementById("genericModal").style.display = "flex";
}

// Función para guardar los cambios realizados en el modal
function saveChanges() {
  if (currentOperation === "addProduct") {
    const description = document.getElementById("modalDescription").value;
    const quantity = document.getElementById("modalQuantity").value;

    if (description && quantity) {
      products.push({ description, quantity });
      renderProducts();
    }
  } else if (currentOperation === "editProduct" && currentIndex >= 0) {
    const description = document.getElementById("modalDescription").value;
    const quantity = document.getElementById("modalQuantity").value;

    if (description && quantity) {
      products[currentIndex] = { description, quantity };
      renderProducts();
    }
  } else if (currentOperation === "addChemical") {
    const element = document.getElementById("modalElement").value;
    const spec = document.getElementById("modalSpec").value;
    const casting = document.getElementById("modalCasting").value;

    if (element && spec && casting) {
      chemicalCompositions.push({ element, spec, casting });
      renderChemicalCompositions();
    }
  } else if (currentOperation === "editChemical" && currentIndex >= 0) {
    const element = document.getElementById("modalElement").value;
    const spec = document.getElementById("modalSpec").value;
    const casting = document.getElementById("modalCasting").value;

    if (element && spec && casting) {
      chemicalCompositions[currentIndex] = { element, spec, casting };
      renderChemicalCompositions();
    }
  }

  closeGenericModal();
}

// Función para cerrar el modal
function closeGenericModal() {
  document.getElementById("genericModal").style.display = "none";
}

// Funciones para mostrar el modal de agregar y editar
function addItem() {
  showGenericModal("addProduct");
}

function addRow() {
  showGenericModal("addChemical");
}

function editProduct(index) {
  showGenericModal("editProduct", index);
}

function editChemical(index) {
  showGenericModal("editChemical", index);
}

function renderProducts() {
  const tbody = document.getElementById("productsBody");
  tbody.innerHTML = ""; // Limpia la tabla existente

  products.forEach((product, index) => {
    const row = tbody.insertRow();
    row.insertCell(0).innerHTML = `<p>${product.description}</p>`;
    row.insertCell(1).innerHTML = `<p>${product.quantity}</p>`;
    row.insertCell(
      2
    ).innerHTML = `<button onclick="editProduct(${index})" class="text-blue-500 hover:text-blue-700">
    <!-- Icono de editar -->
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#270aff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
  </button>
  <button onclick="removeProduct(${index})" class="text-red-500 hover:text-red-700 ml-2">
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#ff0000" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
  </button>`;
  });
}

// Función para renderizar las composiciones químicas en la tabla
function renderChemicalCompositions() {
  const tbody = document.getElementById("chemicalBody");
  tbody.innerHTML = ""; // Limpia la tabla existente

  chemicalCompositions.forEach((composition, index) => {
    const row = tbody.insertRow();
    row.insertCell(0).innerHTML = `<p>${composition.element}</p>`;
    row.insertCell(1).innerHTML = `<p>${composition.spec}</p>`;
    row.insertCell(2).innerHTML = `<p>${composition.casting}</p>`;
    row.insertCell(
      3
    ).innerHTML = ` <button onclick="editChemical(${index})" class="text-blue-500 hover:text-blue-700">
    <!-- Icono de editar -->
 <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#270aff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
  </button>
  <button onclick="removeChemical(${index})" class="text-red-500 hover:text-red-700 ml-2">
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#ff0000" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
  </button>`;
  });
}

// Función para eliminar un producto
function removeProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

// Función para eliminar una composición química
function removeChemical(index) {
  chemicalCompositions.splice(index, 1);
  renderChemicalCompositions();
}

async function fetchHTML() {
  try {
    let origen = window.location.origin;
    let url = `${origen}/formato`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/html",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function downloadPDF() {
  const button = document.getElementById("downloadButton");
  const buttonText = document.getElementById("buttonText");
  const spinner = document.getElementById("spinner");

  // Deshabilitar el botón y mostrar el spinner
  button.disabled = true;
  spinner.classList.remove("hidden");
  buttonText.classList.add("hidden");
  try {
    let content = await fetchHTML();
    if (!content) return;

    content = replaceHTML(content);

    //let content=document.getElementById('marco');

    const opt = {
      margin: [0, 0, 0, 0],
      filename: "reporte_imr.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3, // Aumenta la escala para mejorar la calidad
        useCORS: true, // Permite CORS para recursos externos (si es necesario)
      },
      jsPDF: {
        unit: "px",
        orientation: "portrait",
        format: [1440, 1000],
      },
    };

    // Inicia la conversión y descarga el PDF
    await html2pdf()
    .from(content)    
    .set(opt)
    .toPdf()
    .get('pdf')
    .then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            pdf.text('<div id="footer_content" class="flex justify-between items-center mb-8 bg-blue-900 px-8 text-white px-4"><img src="img/logo_imr_brandin.png" alt="Logo Empresa" class="h-auto" style="width:5rem"><div class="text-center text-xs">INDUSTRIAS METALURGICAS REUNIDAS S.A.C. - RUC:20562721941 - Dirección: CALLE 4 URB. AGRUP. PACHACAMAC IV ETAP LOTE 22 MZ 7 VILLA EL SALVADOR - LIMA - LIMA</div></div>', pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 10);
        }
    })
    .save();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  } finally {
    // Volver a habilitar el botón y ocultar el spinner
    button.disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }
}

function replaceHTML(datahtml) {
  let datos = {};
  // Selecciona todos los elementos que tienen el atributo data-tag
  document.querySelectorAll("[data-tag]").forEach((element) => {
    // Obtiene el valor del atributo data-tag
    let tag = element.getAttribute("data-tag");

    // Verifica el tipo de elemento para capturar su valor
    if (element.type === "checkbox") {
      datos[tag] = element.checked;
    } else {
      datos[tag] = element.value;
    }
  });

  for (const [tag, valor] of Object.entries(datos)) {
    let reemplazo =
      typeof valor === "boolean" ? (valor ? "X" : "") : valor;

      if(tag=="%FECHA%" && valor!=""){
        reemplazo=reemplazo.split("-").reverse().join("/");
      }

    const regex = new RegExp(`${tag}`, "g");
    datahtml = datahtml.replace(regex, reemplazo || "");
  }

  let arr = [];
  let regex2 = new RegExp("%PRODUCTOS%", "g");
  let regex3 = new RegExp("%COMPOSICION%", "g");

    products.forEach((product, index) => {
      arr.push(
        `<div class="grid grid-cols-1 gap-1 divide-x"><div class="flex justify-between items-center mb-2"><p class="text-xs">${product.description}</p><div class="w-8 h-8 mr-4 bg-blue-900 text-white font-bold flex justify-center items-center text-xs">${product.quantity}</div></div></div>`
      );
    });
    
    datahtml = datahtml.replace(regex2, arr.length?arr.join(""):"");
  
    arr = [];

    chemicalCompositions.forEach((composition, index) => {
      arr.push(
        `<div class="px-4 py-2"><div class="flex items-center justify-between"><h3 class="text-md leading-6 font-medium text-gray-900">% ${composition.element}</h3></div><div class="flex flex-col"><p class="text-xs font-medium flex text-gray-500 justify-between">Especificado: <span class="text-green-600">${composition.spec}</span></p><p class="text-xs font-medium flex text-gray-500 justify-between">Colada: <span class="text-green-600">${composition.casting}</span></p></div></div>`
      );
    });
   
    datahtml = datahtml.replace(regex3, arr.length?arr.join(""):"");


  return datahtml;
}

