import jsPDF from "jspdf";
import * as XLSX from "xlsx";

// Exportar PDF
export const exportPDF = (title: string, data: string[]) => {
  const doc = new jsPDF();
  doc.text(title, 10, 10);
  data.forEach((line, i) => doc.text(line, 10, 20 + i * 10));
  doc.save(`${title}.pdf`);
};

// Exportar Excel
export const exportExcel = (fileName: string, data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
