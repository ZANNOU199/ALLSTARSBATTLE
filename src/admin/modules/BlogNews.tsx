import React, { useState, useEffect, useRef } from 'react';
import { CMSData, Article } from '../../types';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Tag, Calendar } from 'lucide-react';

const availableTags = ['EVENT', 'NEWS', 'TALENTS', 'BILLETTERIE', 'OFFICIEL', 'CULTURE', 'COMPETITION', 'COMMUNIQUE'];
const availableCategories = ['Actualités', 'OFFICIEL', 'TALENTS', 'BILLETTERIE', 'Competition', 'Workshop', 'Événement'];

export default function BlogNews({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      title: formData.title || '',
      content: formData.content || '',
      category: formData.category || 'Actualités',
      coverImage: formData.coverImage || 'https://picsum.photos/seed/news/800/450',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      tag: formData.tag || 'EVENT'
    };
    setData(prev => ({ 
      ...prev, 
      blog: { 
        ...prev.blog,
        articles: [...prev.blog.articles, newArticle] 
      }
    }));
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Actualités',
      coverImage: 'https://picsum.photos/seed/news/800/450',
      tag: 'EVENT'
    });
  };

  const handleOpenNewArticle = () => {
    resetForm();
    setEditingId(null);
    setIsAdding(true);
  };

  const handleUpdate = () => {
    setData(prev => ({
      ...prev,
      blog: {
        ...prev.blog,
        articles: prev.blog.articles.map(a => a.id === editingId ? { ...a, ...formData } : a)
      }
    }));
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer cet article ?')) {
      setData(prev => ({ 
        ...prev, 
        blog: {
          ...prev.blog,
          articles: prev.blog.articles.filter(a => a.id !== id)
        }
      }));
    }
  };

  const startEdit = (article: Article) => {
    setIsAdding(false);
    setEditingId(article.id);
    setFormData(article);
  };

  // Auto-scroll au formulaire quand on édite
  useEffect(() => {
    if ((isAdding || editingId) && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isAdding, editingId]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-heading">Gestion du Blog</h3>
        <button 
          onClick={handleOpenNewArticle}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl hover:shadow-[0_0_20px_rgba(211,95,23,0.4)] transition-all"
        >
          <Plus size={18} /> Nouvel Article
        </button>
      </div>

      {(isAdding || editingId) && (
        <div ref={formRef} className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg">
              {isAdding ? 'Nouvel Article' : `Modifier Article : ${formData.title || 'Sans titre'}`}
            </h4>
            <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="text-slate-500 hover:text-white"><X size={20} /></button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de l'article</label>
                <input 
                  type="text" 
                  value={formData.title || ''} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tag</label>
                <select 
                  value={formData.tag || 'EVENT'} 
                  onChange={e => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all min-h-[44px]"
                >
                  {availableTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Catégorie</label>
                <select 
                  value={formData.category || 'Actualités'} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all min-h-[44px]"
                >
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Image de Couverture (URL)</label>
                <input 
                  type="text" 
                  value={formData.coverImage || ''} 
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Contenu (Éditeur Riche Simulé)</label>
              <textarea 
                rows={10}
                value={formData.content || ''} 
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button 
              onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }}
              className="px-6 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
            >
              Annuler
            </button>
            <button 
              onClick={isAdding ? handleAdd : handleUpdate}
              className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Save size={16} /> Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.blog.articles.map(article => (
          <div key={article.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all flex flex-col">
            <div className="aspect-video bg-zinc-800 relative">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-primary text-background-dark px-3 py-1 text-[10px] font-black tracking-widest">
                {article.tag}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(article)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-accent-red transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="text-xl font-heading mb-4 group-hover:text-primary transition-colors">{article.title}</h4>
              <p className="text-slate-400 text-xs line-clamp-3 mb-6 flex-1">{article.content}</p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <Tag size={12} /> {article.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
