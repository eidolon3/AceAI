interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export function Card({ icon, title, description, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-left w-full"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
} 