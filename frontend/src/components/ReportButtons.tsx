import { exportPDF, exportExcel } from "../services/export";
import { useFetch } from "../hooks/useFetch";

type Project = {
  id: string;
  name: string;
  progress: number;
};

export const ReportButtons = () => {
  const { data: projects, loading } = useFetch<Project[]>("/projects");

  if (loading) return <div>Cargando datos para exportar...</div>;

  const handleExportPDF = () => {
    const lines = projects?.map(
      (p) => `${p.name} - ${p.progress}% completado`
    ) || [];
    exportPDF("ReporteProyectos", lines);
  };

  const handleExportExcel = () => {
    exportExcel("ReporteProyectos", projects || []);
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Exportar PDF
      </button>
      <button
        onClick={handleExportExcel}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Exportar Excel
      </button>
    </div>
  );
};
