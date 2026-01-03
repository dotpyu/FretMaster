import React from 'react';
import { Plus, Save, Trash2, GripVertical } from 'lucide-react';

const BuilderPage: React.FC = () => {
  return (
    <div className="p-8 bg-slate-950 min-h-full text-slate-200 overflow-y-auto flex justify-center">
      <div className="w-full max-w-4xl">
        <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Workout Builder</h1>
                <p className="text-slate-400 mt-2">Compose custom drills and practice routines.</p>
            </div>
            <div className="flex space-x-3">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm font-medium transition-colors">Load Preset</button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium flex items-center">
                    <Save size={16} className="mr-2" /> Save Routine
                </button>
            </div>
        </header>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Routine Name</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-indigo-500 outline-none" placeholder="e.g., Morning Warmup" />
                </div>
                <div>
                     <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Focus Tags</label>
                     <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-indigo-500 outline-none" placeholder="Speed, Theory, Ear Training..." />
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase text-slate-500 mb-4">Drill Blocks</h2>
            
            {/* Block 1 */}
            <div className="group bg-slate-900 rounded-lg border border-slate-800 p-4 flex items-center hover:border-slate-700 transition-colors">
                <div className="text-slate-600 mr-4 cursor-grab"><GripVertical /></div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">Spider Walk (Chromatic)</h3>
                        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">5 mins</span>
                    </div>
                    <div className="flex space-x-4 text-sm text-slate-400">
                        <span>BPM: 80-100</span>
                        <span>•</span>
                        <span>Focus: Alternate Picking</span>
                    </div>
                </div>
                <button className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Block 2 */}
            <div className="group bg-slate-900 rounded-lg border border-slate-800 p-4 flex items-center hover:border-slate-700 transition-colors">
                <div className="text-slate-600 mr-4 cursor-grab"><GripVertical /></div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">Triad Inversions (Strings 1-3)</h3>
                         <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">10 mins</span>
                    </div>
                    <div className="flex space-x-4 text-sm text-slate-400">
                        <span>Key: Cycle of 4ths</span>
                        <span>•</span>
                        <span>Mode: Quiz</span>
                    </div>
                </div>
                 <button className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Add Button */}
            <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-lg text-slate-500 hover:border-slate-600 hover:text-slate-300 flex items-center justify-center transition-all">
                <Plus size={20} className="mr-2" /> Add Drill Block
            </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;