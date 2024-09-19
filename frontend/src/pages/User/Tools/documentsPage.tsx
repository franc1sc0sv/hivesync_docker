
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { pdfExporter } from "quill-to-pdf"; // Librería para convertir Quill a PDF
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, ImageRun, TextRun } from "docx";
import logo from "/logo.png";
import hivesyncLogo from "/hivesyncLogo.png";

// Configuración de los módulos de Quill
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function TextEditorPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Documento sin título");
  const quillRef = useRef<ReactQuill | null>(null);

  // Función para exportar a PDF usando quill-to-pdf
  const exportToPDF = async () => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      const delta = quillEditor.getContents();
      try {
        const parsedDelta = JSON.parse(JSON.stringify(delta));
        const pdfBlob = await pdfExporter.generatePdf(parsedDelta);
        saveAs(pdfBlob, `${title || "Documento"}.pdf`);
      } catch (error) {
        console.error("Error exporting to PDF:", error);
      }
    }
  };

  // Función para exportar a Word con imágenes usando docx
  const exportToWord = async () => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      const delta = quillEditor.getContents();
      const children = [];

      if (delta && delta.ops) {
        for (const op of delta.ops) {
          if (op.insert && typeof op.insert === "string") {
            // Aplicar estilos a los textos según se detecten en Quill
            const textRun = new TextRun({
              text: op.insert,
              bold: op.attributes?.bold || false,
              italics: op.attributes?.italic || false,
            });
            children.push(new Paragraph({ children: [textRun] }));
          } else if (op.insert && op.insert.image) {
            try {
              const response = await fetch(op.insert.image);
              const blob = await response.blob();
              const arrayBuffer = await blob.arrayBuffer();
              children.push(
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: arrayBuffer,
                      transformation: { width: 300, height: 200 }, // Ajustar el tamaño según el contenido original
                    }),
                  ],
                })
              );
            } catch (error) {
              console.error("Error loading image:", error);
            }
          }
        }
      }

      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "Documento"}.docx`;
      a.click();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-overlay_1">
      {/* Barra superior */}
      <header className="p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <input
            type="text"
            className="w-full sm:max-w-xs border-none rounded p-2 focus:outline-none focus:ring-2 focus:ring-light_purple font-amiko text-custom_white bg-primary"
            placeholder="Documento sin título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              className="flex items-center border-none rounded-md px-4 py-2 text-sm hover:bg-primary-light transition duration-200 bg-primary text-custom_white font-almarai"
            >
              Exportar a PDF
            </button>
            <button
              onClick={exportToWord}
              className="flex items-center border-none rounded-md px-4 py-2 text-sm hover:bg-primary-light transition duration-200 bg-primary text-custom_white font-almarai"
            >
              Exportar a Word
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Área del editor */}
        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200 min-h-[calc(100vh-10rem)]">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-[calc(100vh-16rem)] font-amiko"
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      {/* <footer className="p-4 flex justify-center items-center bg-overlay_4">
        <div className="flex items-center space-x-2">
          <img src={hivesyncLogo} alt="HiveSync Logo" className="h-8" />
          <img src={logo} alt="Logo" className="h-8" />
        </div>
      </footer> */}
    </div>
  );
}
