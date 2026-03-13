import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube, 
  ArrowRight,
  ChevronDown,
  Send
} from 'lucide-react';

interface ContactProps {
  onNavigateToFAQ?: () => void;
}

const Contact = ({ onNavigateToFAQ }: ContactProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    alert("Message envoyé ! Notre équipe vous répondra sous 24h.");
  };

  return (
    <div className="bg-background-dark text-slate-100 font-sans selection:bg-primary selection:text-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-end px-6 md:px-20 pb-12 overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2000')" }}
          ></div>
        </div>
        <div className="relative z-20 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-accent-pink px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Support & Contact
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-heading text-white uppercase tracking-tighter italic leading-[0.9]"
          >
            Besoin <span className="text-primary">d'aide ?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 text-base md:text-xl mt-6 max-w-xl font-light italic leading-relaxed"
          >
            L'équipe All Stars Battle International est là pour vous accompagner. Retrouvez nos réponses ou contactez-nous directement.
          </motion.p>
        </div>
      </section>

      <div className="px-6 md:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
        {/* Contact Form Section */}
        <section className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading uppercase italic tracking-tighter text-white border-l-4 border-primary pl-6 mb-12">
              Contactez-Nous
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Nom Complet</label>
                  <input 
                    required
                    className="bg-surface-dark border border-white/10 text-white rounded-sm p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-slate-600 transition-all" 
                    placeholder="John Doe" 
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email</label>
                  <input 
                    required
                    className="bg-surface-dark border border-white/10 text-white rounded-sm p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-slate-600 transition-all" 
                    placeholder="contact@example.com" 
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Sujet</label>
                <select className="bg-surface-dark border border-white/10 text-white rounded-sm p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none cursor-pointer">
                  <option>Inscriptions Compétiteurs</option>
                  <option>Billetterie & Accès</option>
                  <option>Presse & Media</option>
                  <option>Partenariats</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Message</label>
                <textarea 
                  required
                  className="bg-surface-dark border border-white/10 text-white rounded-sm p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-slate-600 transition-all resize-none" 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  rows={6}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent-pink text-background-dark font-black uppercase py-5 rounded-sm hover:opacity-90 transition-all tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl"
              >
                Envoyer le message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Map Integration Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-sm overflow-hidden border border-white/10 h-[400px] bg-surface-dark relative group"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
            <div 
              className="w-full h-full grayscale opacity-40 contrast-125 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASijU0cQXjQ-d0EeSSHvbh9o9FUKMhSQpZhNf_FBFqR_rmXLZGtPVypj0mSI-ySy6GPUCU1URtO_Fv3GhUqgbxe1x-q9mJqOF2QnaFhcyMu7W7xVond7-TheZD6JpDdFe0LujkMdYzKSZhbwfxOJzztl2LCzBQQGDjM-g0M3pG0afbtWJroan4PCbhMq7gDakVebvIym5omSDnpQdoDW6qGa1I46E6m-D5t3FaXOBj0f3iSBvn82prmbKDEDgA8jn1g7kjcy-pRj8w')" }}
            ></div>
            <div className="absolute bottom-6 left-6 z-20 bg-background-dark/90 backdrop-blur-md border border-primary/30 p-6 rounded-sm shadow-2xl">
              <p className="text-primary font-black text-sm uppercase tracking-widest mb-1">Siège ASBI Togo</p>
              <p className="text-white text-xs font-light uppercase tracking-wider">Quartier Administratif, Lomé</p>
            </div>
          </motion.div>
        </section>

        {/* Sidebar / Details & FAQ */}
        <aside className="lg:col-span-5 space-y-16">
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-dark p-10 rounded-sm border border-white/10 space-y-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10"></div>
            <h3 className="text-2xl font-heading text-white uppercase tracking-tight">Coordonnées</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold uppercase tracking-wider mb-1">Lomé, Togo</p>
                  <p className="text-slate-400 text-sm font-light italic">Rue de l'Ocam, Face au Palais des Congrès</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold uppercase tracking-wider mb-1">+228 90 00 00 00</p>
                  <p className="text-slate-400 text-sm font-light italic">Lun-Ven, 09h00 - 18h00</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold uppercase tracking-wider mb-1">contact@asbi-togo2026.com</p>
                  <p className="text-slate-400 text-sm font-light italic">Réponse sous 24h</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-10 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Suivez le mouvement</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-sm bg-background-dark border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all text-white group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-sm bg-background-dark border border-white/10 flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-all text-white group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-sm bg-background-dark border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all text-white group">
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* FAQ Mini Accordion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-heading uppercase italic tracking-tighter text-white">Foire Aux Questions</h3>
            <div className="space-y-4">
              <FAQItem 
                question="Quand ouvrent les inscriptions ?" 
                answer="Les inscriptions pour les compétiteurs ouvriront officiellement en Septembre 2025. Restez connectés à nos réseaux sociaux pour l'annonce des pré-sélections."
              />
              <FAQItem 
                question="Où acheter mon billet ?" 
                answer="La billetterie en ligne sera accessible directement sur ce site via l'onglet 'Billetterie' dès Janvier 2026. Des points de vente physiques seront également installés à Lomé."
              />
              <FAQItem 
                question="Accès pour les VIP ?" 
                answer="Les packs VIP incluent un accès prioritaire, des places en bord de scène, un accès au lounge All Stars et des rencontres exclusives avec les juges internationaux."
              />
            </div>
            <button 
              onClick={onNavigateToFAQ}
              className="inline-flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest hover:gap-5 transition-all group"
            >
              Voir toutes les questions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-surface-dark rounded-sm border border-white/5 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors text-left"
      >
        <span className="text-xs font-black text-white uppercase tracking-wider">{question}</span>
        <ChevronDown className={`text-primary w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-slate-400 text-sm font-light leading-relaxed italic border-t border-white/5 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
