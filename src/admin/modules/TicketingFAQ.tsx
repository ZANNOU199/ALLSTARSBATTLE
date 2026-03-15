import React, { useState } from 'react';
import { CMSData, Ticket, FAQItem } from '../../types';
import { Plus, Trash2, Edit, Save, X, HelpCircle, CreditCard } from 'lucide-react';

export default function TicketingFAQ({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq'>('tickets');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ticketFormData, setTicketFormData] = useState<Partial<Ticket>>({});
  const [faqFormData, setFaqFormData] = useState<Partial<FAQItem>>({});

  const handleAddTicket = () => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      name: ticketFormData.name || '',
      price: ticketFormData.price || '',
      period: ticketFormData.period || 'Par jour',
      tag: ticketFormData.tag || 'Standard',
      features: ticketFormData.features || [],
      buttonText: ticketFormData.buttonText || 'Réserver',
      color: ticketFormData.color || 'primary',
      recommended: ticketFormData.recommended || false,
      paymentLink: ticketFormData.paymentLink || '#'
    };
    setData(prev => ({ ...prev, ticketing: { ...prev.ticketing, tickets: [...prev.ticketing.tickets, newTicket] } }));
    setIsAdding(false);
    setTicketFormData({});
  };

  const handleAddFAQ = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: faqFormData.question || '',
      answer: faqFormData.answer || ''
    };
    setData(prev => ({ ...prev, ticketing: { ...prev.ticketing, faqs: [...prev.ticketing.faqs, newFAQ] } }));
    setIsAdding(false);
    setFaqFormData({});
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button 
          onClick={() => { setActiveTab('tickets'); setIsAdding(false); setEditingId(null); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'tickets' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Billets & Tarifs
        </button>
        <button 
          onClick={() => { setActiveTab('faq'); setIsAdding(false); setEditingId(null); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'faq' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          FAQ
        </button>
      </div>

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg flex items-center gap-2"><CreditCard size={20} className="text-primary" /> Gestion des Tickets</h4>
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter un Pass</button>
          </div>

          {isAdding && (
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nom du Pass (ex: Pass VIP)</label>
                  <input 
                    type="text" 
                    value={ticketFormData.name || ''} 
                    onChange={e => setTicketFormData({ ...ticketFormData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Prix (ex: 50 €)</label>
                  <input 
                    type="text" 
                    value={ticketFormData.price || ''} 
                    onChange={e => setTicketFormData({ ...ticketFormData, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lien de Paiement</label>
                  <input 
                    type="text" 
                    value={ticketFormData.paymentLink || ''} 
                    onChange={e => setTicketFormData({ ...ticketFormData, paymentLink: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={handleAddTicket} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Enregistrer</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.ticketing.tickets.map(ticket => (
              <div key={ticket.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-xl font-heading text-white">{ticket.name}</h5>
                    <p className="text-primary font-mono text-lg">{ticket.price}</p>
                  </div>
                  <button 
                    onClick={() => setData(prev => ({ ...prev, ticketing: { ...prev.ticketing, tickets: prev.ticketing.tickets.filter(t => t.id !== ticket.id) } }))}
                    className="p-2 text-slate-500 hover:text-accent-red transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  {ticket.features.map((feature, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div> {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg flex items-center gap-2"><HelpCircle size={20} className="text-primary" /> Foire Aux Questions</h4>
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter une Question</button>
          </div>

          {isAdding && (
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Question</label>
                  <input 
                    type="text" 
                    value={faqFormData.question || ''} 
                    onChange={e => setFaqFormData({ ...faqFormData, question: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Réponse</label>
                  <textarea 
                    rows={4}
                    value={faqFormData.answer || ''} 
                    onChange={e => setFaqFormData({ ...faqFormData, answer: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={handleAddFAQ} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Enregistrer</button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {data.ticketing.faqs.map(item => (
              <div key={item.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-white">{item.question}</h5>
                  <button 
                    onClick={() => setData(prev => ({ ...prev, ticketing: { ...prev.ticketing, faqs: prev.ticketing.faqs.filter(f => f.id !== item.id) } }))}
                    className="p-2 text-slate-500 hover:text-accent-red transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
