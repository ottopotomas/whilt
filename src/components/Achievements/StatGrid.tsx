import React from 'react';
import { formatNumber } from '../../utils/utils';

type Props = {
  stats?: {
    collected: number;
    mastered: number;
    adoptedByOthers: number;
  };
};

const StatGrid = ({
  stats = {
    collected: 104,
    mastered: 56,
    adoptedByOthers: 89,
  },
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-2 text-center">
      {/* TILs You Logged / Collected */}
      <div className="bg-muted rounded-xl p-3 flex flex-col items-center shadow-sm">
        <div className="text-2xl font-bold">{formatNumber(stats.collected)}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-tight">
          TILs You Logged / Collected
        </div>
      </div>

      {/* TILs You Mastered */}
      <div className="bg-muted rounded-xl p-3 flex flex-col items-center shadow-sm">
        <div className="text-2xl font-bold">{formatNumber(stats.mastered)}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-tight">
          TILs You Mastered
        </div>
      </div>

      {/* Spacer if needed */}
      <div className="col-span-2" />

      {/* TILs They Adopted */}
      <div className="bg-muted rounded-xl p-3 flex flex-col items-center shadow-sm col-span-2">
        <div className="text-2xl font-bold">{formatNumber(stats.adoptedByOthers)}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-tight">
          TILs They Adopted
        </div>
      </div>
    </div>
  );
};

export default StatGrid;
