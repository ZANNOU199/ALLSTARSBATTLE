import React, { useState } from 'react';
import { CMSData } from '../../types';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon } from 'lucide-react';

export default function SiteImagesManager({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'backgrounds' | 'illustrations' | 'videos'>('backgrounds');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleAddAsset = () => {
    if (!formData.url) return;

    const newAsset = {
      url: formData.url,
      size: formData.size || '0 MB',
      width: parseInt(formData.width) || 1920,
      height: parseInt(formData.height) || 1080,
      type: formData.type || 'image'
    };

    setData(prev => ({
      ...prev,
      siteAssets: {
        ...prev.siteAssets,
        [activeTab]: {
          ...prev.siteAssets[activeTab as 'backgrounds' | 'illustrations' | 'videos'],
          [Date.now().toString()]: newAsset
        }
      }
    }));

    setIsAdding(false);
    setFormData({});
  };

  const handleDeleteAsset = (assetId: string) => {
    setData(prev => ({
      ...prev,
      siteAssets: {
        ...prev.siteAssets,
        [activeTab]: Object.fromEntries(
          Object.entries(prev.siteAssets[activeTab as 'backgrounds' | 'illustrations' | 'videos']).filter(
            ([key]) => key !== assetId
          )
        )
      }
    }));
  };

  const currentAssets = data.siteAssets[activeTab as 'backgrounds' | 'illustrations' | 'videos'] || {};

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary/20 to-accent-red/20 border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-heading text-primary mb-2">📦 Assets du Site</h3>
        <p className="text-slate-400 text-sm">Gérez les images et vidéos organisées par catégories</p>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button 
          onClick={() => { setActiveTab('backgrounds'); setIsAdding(false); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'backgrounds' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          🖼️ Backgrounds
        </button>
        <button 
          onClick={() => { setActiveTab('illustrations'); setIsAdding(false); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'illustrations' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          🎨 Illustrations
        </button>
        <button 
          onClick={() => { setActiveTab('videos'); setIsAdding(false); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          🎬 Vidéos
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h4 className="font-heading text-lg">
          {activeTab === 'backgrounds' && '🖼️ Images de Fond'}
          {activeTab === 'illustrations' && '🎨 Illustrations'}
          {activeTab === 'videos' && '🎬 Vidéos'}
        </h4>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h5 className="text-lg font-heading text-white">Ajouter un nouvel Asset</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">URL</label>
              <input 
                type="text" 
                value={formData.url || ''} 
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Taille (ex: 2.5 MB)</label>
              <input 
                type="text" 
                value={formData.size || ''} 
                onChange={e => setFormData({ ...formData, size: e.target.value })}
                placeholder="2.5 MB"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Largeur (px)</label>
              <input 
                type="number" 
                value={formData.width || 1920} 
                onChange={e => setFormData({ ...formData, width: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Hauteur (px)</label>
              <input 
                type="number" 
                value={formData.height || 1080} 
                onChange={e => setFormData({ ...formData, height: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => { setIsAdding(false); setFormData({}); }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Annuler
            </button>
            <button 
              onClick={handleAddAsset}
              className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(currentAssets).map(([id, asset]: [string, any]) => (
          <div key={id} className="bg-[#111] border border-white/5 p-6 rounded-2xl">
            {asset.url && (
              <div className="relative w-full h-40 bg-black rounded-xl overflow-hidden mb-4">
                {activeTab === 'videos' ? (
                  <video src={asset.url} className="w-full h-full object-cover" />
                ) : (
                  <img src={asset.url} alt="asset" className="w-full h-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+not+available';
                  }} />
                )}
              </div>
            )}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Taille:</span>
                <span className="text-white font-mono">{asset.size}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Résolution:</span>
                <span className="text-white font-mono">{asset.width} × {asset.height}px</span>
              </div>
            </div>
            <button 
              onClick={() => handleDeleteAsset(id)}
              className="w-full px-4 py-2 bg-accent-red/20 text-accent-red rounded-xl font-bold text-xs"
            >
              <Trash2 size={14} className="inline mr-2" /> Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
