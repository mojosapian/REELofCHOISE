import React from 'react';

const AdPlaceholder = () => {
  return (
    <div className="ad-container mt-8 p-4 bg-slate-100 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center min-h-[100px]">
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Advertisement</span>
      <div className="w-full h-full flex items-center justify-center text-slate-300 font-medium italic">
        Banner Ad Space (320x100)
      </div>
    </div>
  );
};

export default AdPlaceholder;