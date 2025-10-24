"use client";

interface TaskCardProps {
  title: string;
  project: string;
  progress: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, project, progress }) => {
  return (
    <div className="p-3 border rounded shadow hover:shadow-lg transition flex justify-between items-center bg-white dark:bg-gray-800">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">Proyecto: {project}</p>
      </div>
      <p>{progress}%</p>
    </div>
  );
};

export default TaskCard;
