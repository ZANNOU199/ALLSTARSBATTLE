import React, { useState } from 'react';
import { CMSData, ProgramDay, Activity } from '../../types';
import { Plus, Trash2, Edit, Save, X, Clock, MapPin, Tag } from 'lucide-react';

export default function ProgramPlanning({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [selectedDayId, setSelectedDayId] = useState<string>(data.program[0]?.id || '');
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [activityFormData, setActivityFormData] = useState<Partial<Activity>>({});

  const handleAddDay = () => {
    let newLabel = '';
    let newDate = '';

    if (data.program.length === 0) {
      // First day - set default values
      newLabel = 'JOUR 01';
      newDate = new Date().toISOString().split('T')[0]; // Today's date
    } else {
      // Auto-increment for subsequent days
      const lastDay = data.program[data.program.length - 1];
      const lastLabelMatch = lastDay.label.match(/JOUR (\d+)/);
      if (lastLabelMatch) {
        const lastNum = parseInt(lastLabelMatch[1]);
        const nextNum = lastNum + 1;
        newLabel = `JOUR ${nextNum.toString().padStart(2, '0')}`;
      }

      // Auto-increment date
      if (lastDay.date) {
        try {
          const lastDate = new Date(lastDay.date);
          if (!isNaN(lastDate.getTime())) {
            lastDate.setDate(lastDate.getDate() + 1);
            newDate = lastDate.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        } catch (e) {
          newDate = new Date().toISOString().split('T')[0];
        }
      }
    }

    const newDay: ProgramDay = {
      id: Date.now().toString(),
      date: newDate,
      label: newLabel,
      activities: []
    };
    setData(prev => ({ ...prev, program: [...prev.program, newDay] }));
    setSelectedDayId(newDay.id); // Select the new day
  };

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      time: activityFormData.time || '',
      title: activityFormData.title || '',
      location: activityFormData.location || '',
      description: activityFormData.description || '',
      category: activityFormData.category || 'other'
    };
    setData(prev => ({
      ...prev,
      program: prev.program.map(d => d.id === selectedDayId ? { ...d, activities: [...d.activities, newActivity] } : d)
    }));
    setIsAddingActivity(false);
    setActivityFormData({});
  };

  const handleUpdateActivity = () => {
    setData(prev => ({
      ...prev,
      program: prev.program.map(d => d.id === selectedDayId ? {
        ...d,
        activities: d.activities.map(a => a.id === editingActivityId ? { ...a, ...activityFormData } : a)
      } : d)
    }));
    setEditingActivityId(null);
    setActivityFormData({});
  };

  const handleUpdateDate = (dayId: string, newDate: string) => {
    setData(prev => ({
      ...prev,
      program: prev.program.map(d => d.id === dayId ? { ...d, date: newDate } : d)
    }));
    setEditingDateId(null);
  };

  const handleInsertDay = (afterDayId: string) => {
    setData(prev => {
      const program = [...prev.program];
      const insertIndex = program.findIndex(d => d.id === afterDayId);
      
      if (insertIndex === -1) return prev;

      // Get the number for the new day
      const afterDay = program[insertIndex];
      const afterLabelMatch = afterDay.label.match(/JOUR (\d+)/);
      let newNum = 1;
      if (afterLabelMatch) {
        newNum = parseInt(afterLabelMatch[1]) + 1;
      }

      // Shift all days with number >= newNum
      for (let i = 0; i < program.length; i++) {
        const day = program[i];
        const labelMatch = day.label.match(/JOUR (\d+)/);
        if (labelMatch) {
          const currentNum = parseInt(labelMatch[1]);
          if (currentNum >= newNum) {
            day.label = `JOUR ${(currentNum + 1).toString().padStart(2, '0')}`;
          }
        }
      }

      // Create new day
      const newDate = afterDay.date ? (() => {
        try {
          const date = new Date(afterDay.date);
          date.setDate(date.getDate() + 1);
          return date.toISOString().split('T')[0];
        } catch {
          return new Date().toISOString().split('T')[0];
        }
      })() : new Date().toISOString().split('T')[0];

      const newDay: ProgramDay = {
        id: Date.now().toString(),
        date: newDate,
        label: `JOUR ${newNum.toString().padStart(2, '0')}`,
        activities: []
      };

      // Insert at the correct position (after the day we clicked)
      program.splice(insertIndex + 1, 0, newDay);

      return { ...prev, program };
    });
  };

  const handleDeleteDay = (dayId: string) => {
    if (confirm('Supprimer ce jour et toutes ses activités ?')) {
      setData(prev => {
        const newProgram = prev.program.filter(d => d.id !== dayId);
        return { ...prev, program: newProgram };
      });
      // Update selected day if we're deleting the current one
      setSelectedDayId(current => current === dayId ? data.program.find(d => d.id !== dayId)?.id || '' : current);
    }
  };

  const selectedDay = data.program.find(d => d.id === selectedDayId);

  return (
    <div className="space-y-8">
      {/* Days List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-heading">Jours du Programme</h2>
          <button
            onClick={handleAddDay}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark rounded-xl font-bold hover:bg-primary/90 transition-all"
          >
            <Plus size={18} /> Ajouter Jour
          </button>
        </div>

        <div className="space-y-3">
          {data.program.map((day, index) => (
            <div key={day.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedDayId(day.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                      selectedDayId === day.id
                        ? 'bg-primary text-background-dark'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {day.label}
                  </button>

                  {editingDateId === day.id ? (
                    <input
                      type="date"
                      value={day.date || ''}
                      onChange={(e) => handleUpdateDate(day.id, e.target.value)}
                      onBlur={() => setEditingDateId(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingDateId(null)}
                      className="bg-white/5 border border-primary rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-sm text-slate-400 cursor-pointer hover:text-white"
                      onClick={() => setEditingDateId(day.id)}
                    >
                      {day.date}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInsertDay(day.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg hover:bg-green-600/30 transition-all text-xs"
                    title="Insérer un jour après"
                  >
                    <Plus size={14} /> Créer
                  </button>

                  <button
                    onClick={() => handleDeleteDay(day.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-all"
                    title="Supprimer ce jour"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-heading">Activités du {selectedDay?.label}</h3>
          <button
            onClick={() => setIsAddingActivity(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-primary border border-primary/20 font-bold rounded-xl hover:bg-primary/10 transition-all"
          >
            <Plus size={18} /> Nouvelle Activité
          </button>
        </div>

        {(isAddingActivity || editingActivityId) && (
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Heure (ex: 10:00 - 12:00)</label>
                <input 
                  type="text" 
                  value={activityFormData.time || ''} 
                  onChange={e => setActivityFormData({ ...activityFormData, time: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
                <input 
                  type="text" 
                  value={activityFormData.title || ''} 
                  onChange={e => setActivityFormData({ ...activityFormData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lieu</label>
                <input 
                  type="text" 
                  value={activityFormData.location || ''} 
                  onChange={e => setActivityFormData({ ...activityFormData, location: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Catégorie</label>
                <select 
                  value={activityFormData.category || 'other'} 
                  onChange={e => setActivityFormData({ ...activityFormData, category: e.target.value as any })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all appearance-none"
                >
                  <option value="workshop">Workshop</option>
                  <option value="battle">Battle</option>
                  <option value="after-party">After-party</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
                <textarea 
                  rows={2}
                  value={activityFormData.description || ''} 
                  onChange={e => setActivityFormData({ ...activityFormData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => { setIsAddingActivity(false); setEditingActivityId(null); }} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
              <button onClick={isAddingActivity ? handleAddActivity : handleUpdateActivity} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Enregistrer</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {selectedDay?.activities.map(activity => (
            <div key={activity.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-8">
                <div className="text-primary font-mono text-sm w-32">{activity.time}</div>
                <div>
                  <h4 className="font-bold text-lg">{activity.title}</h4>
                  <div className="flex gap-4 mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {activity.location}</span>
                    <span className="flex items-center gap-1"><Tag size={12} /> {activity.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingActivityId(activity.id); setActivityFormData(activity); }} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white"><Edit size={18} /></button>
                <button onClick={() => handleDeleteActivity(activity.id)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-accent-red"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
          {selectedDay?.activities.length === 0 && (
            <div className="text-center py-12 text-slate-500 italic">Aucune activité pour ce jour.</div>
          )}
        </div>
      </div>
    </div>
  );
}
