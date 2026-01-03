import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', score: 400 },
  { name: 'Tue', score: 300 },
  { name: 'Wed', score: 550 },
  { name: 'Thu', score: 450 },
  { name: 'Fri', score: 600 },
  { name: 'Sat', score: 700 },
  { name: 'Sun', score: 480 },
];

const ProgressPage: React.FC = () => {
  return (
    <div className="p-8 bg-slate-950 min-h-full text-slate-200 overflow-y-auto">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Progress & Stats</h1>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
            { title: 'Total Practice', value: '12h 40m', icon: Clock, color: 'text-blue-400' },
            { title: 'Current Streak', value: '5 Days', icon: TrendingUp, color: 'text-green-400' },
            { title: 'Highest Accuracy', value: '98%', icon: Trophy, color: 'text-amber-400' },
            { title: 'Needs Work', value: 'Diminished', icon: AlertCircle, color: 'text-red-400' },
        ].map((card, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-lg flex items-center">
                <div className={`p-3 rounded-full bg-slate-800 mr-4 ${card.color}`}>
                    <card.icon size={24} />
                </div>
                <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">{card.title}</div>
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1 */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-6">Practice Consistency (XP)</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 5 ? '#6366f1' : '#475569'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Heatmap Placeholder */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-6">Fretboard Heatmap (Mistakes)</h3>
            <div className="h-64 flex items-center justify-center bg-slate-950 rounded border border-slate-800 relative overflow-hidden">
                {/* Simulated Heatmap Visual */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-red-900/20 to-transparent"></div>
                <div className="text-center">
                    <p className="text-slate-500 mb-2">Most errors occur around:</p>
                    <div className="text-2xl font-bold text-red-400">Fret 12-15 (String 2)</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;