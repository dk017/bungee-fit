"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Program {
  name: string;
  description?: string;
  duration?: number;
  level?: string;
}

export const StudioPrograms = ({ programs }: { programs: Program[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full"
      >
        <h3 className="text-lg font-semibold">Classes & Programs</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {programs.map((program) => (
            <div key={program.name} className="border-b pb-4 last:border-b-0">
              <h4 className="font-medium text-purple-600">{program.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                Level: {program.level}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {program.duration} minutes
              </p>
              <p className="mt-2 text-gray-700">{program.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
