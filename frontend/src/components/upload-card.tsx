import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface UploadCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function UploadCard({ title, description, icon: Icon, onClick }: UploadCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group flex flex-col items-center justify-center p-6 rounded-xl",
        "bg-slate-800/50 border-2 border-slate-700/50 hover:border-red-900/50",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-red-500/10"
      )}
    >
      <div className="p-4 rounded-full bg-slate-700/50 group-hover:bg-red-900/20 transition-colors">
        <Icon className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-200">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 text-center">{description}</p>
    </button>
  );
}