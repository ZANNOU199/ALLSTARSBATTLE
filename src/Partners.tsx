import React from 'react';
import { motion } from 'motion/react';
import { 
  Theater, 
  Utensils, 
  Truck, 
  Hotel, 
  Video, 
  Shield, 
  FileText, 
  Mail,
  ChevronRight
} from 'lucide-react';

interface PartnersProps {
  onContactClick?: (e: React.MouseEvent) => void;
}

const Partners = ({ onContactClick }: PartnersProps) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demande envoyée ! Notre équipe de partenariat vous contactera sous peu.");
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulating a small delay for the "preparation" effect
    setTimeout(() => {
      const content = `
ALL STARS BATTLE INTERNATIONAL 2026
DOSSIER DE SPONSORING OFFICIEL
-----------------------------------
Lieu : Palais des Congrès de Lomé, Togo
Dates : 14 - 16 Août 2026

PRÉSENTATION :
L'All Stars Battle International est le plus grand événement de breakdance 
et de culture urbaine en Afrique de l'Ouest. Pour sa version 2026, nous 
réunissons l'élite mondiale pour une compétition sans précédent.

POURQUOI DEVENIR PARTENAIRE ?
- Visibilité internationale (TV, Web, Presse)
- Accès à une audience jeune et dynamique (15-35 ans)
- Soutien à la culture et à la jeunesse africaine
- Espaces VIP et networking exclusifs

PACKS DE SPONSORING :
1. PLATINE : Visibilité maximale, logo sur scène principale, 10 pass VIP.
2. OR : Logo sur supports de communication, 5 pass VIP.
3. ARGENT : Logo sur site web et réseaux sociaux, 2 pass VIP.

CONTACT PARTENARIATS :
Email : partners@allstarsbattle.tg
Tel : +228 XX XX XX XX
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Dossier_Sponsoring_ASB_2026.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);
      alert("Le téléchargement du dossier de sponsoring a commencé !");
    }, 1500);
  };

  return (
    <div className="bg-background-dark text-slate-100 font-sans selection:bg-primary selection:text-background-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/40 via-background-dark/80 to-background-dark"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0lkyndPxHdwEfazRdjB13822YZcjixIWE8WK5GcJSXMqMAh7JeFl7FbkST2Hxc8RIh1EwCqYDWe3PQ5GGsfa4-uOKdoswIZ94ZloqPZ81knxjnWfH4OPq_RwRBkExg-z2dVZomcNPPV1WyGd_v9sSVaOxliL2oHd88sZVXU713LuZ1o-ez0V8ipxQBCFmBxpH869-CcQov884KdaVd-JnSSbtCMBsw6VWyRsyMFF0937zmPyjYiNp7bPYGdFhxPVliuRDJFOaBngQ')" }}
          ></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent-red font-bold tracking-[0.3em] uppercase mb-4 text-sm"
          >
            Alliance Stratégique
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-6xl md:text-9xl text-white mb-6 tracking-tight leading-none uppercase"
          >
            NOS <span className="text-primary">PARTENAIRES</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed italic"
          >
            Une synergie d'excellence au service de la culture urbaine internationale. Ensemble, nous repoussons les limites du breakdance au Togo.
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 space-y-32 pb-32">
        {/* Institutional Partners */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
            <h2 className="font-heading text-3xl text-primary tracking-widest uppercase px-4 text-center">Partenaires Institutionnels</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/30 to-primary/30"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBkFGR7RrXdRKdmyGnDZSotjl2ufZ_yG8-vJmU6Hux-xxV76Hk56LMpQ88oUVrq1AFD_gwLWxnoyWWU0dFT5mCJKO1qRMZvZFLQdMQqonlPS34l94A0dL3L-H78Co00M_uASekCNSF13c27iLgDL3hv8AZFCdBu0JMCEnv0rHU7wt9DSqSqk_pOJCyPsYvonfOAaY0YfWrO_sEmHGg-jQoRB0EuOHtrYLFY1YQ2T7N-TVG2PDqNDj7_4KkjAA7Nmv02f7motSH4nA6b",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDb0ulrNIl0OT5xqsT6ekK_w1aYOpgXlynyfwXUK-IRcnqdFgFH4hQnzkC6qiLMx1IhuXmAqJX8OwJmjgk4yxsGbKBbZ8ir5GhmvBgCNuwHGXubedLvAyP6_i3MQKrDgJRj6fBZwc4jfEuoFNQ_QW3IlNe-IRN7_etgHct3oynhSklvei4WLiXvqt1-5lzD_Y6-7nyfJA189A0AStMCNpzYtYK4v7jM9uYFrGZWiKbeM5dbV4bxrQ4tE2vdQqIFoKD5t_OQXJpLcOLV",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDOnGcdaFqdDpX2iGAOaJuQq-L4QeA7uhCydiZAhMD6GOd4hJM8sORFTXuUmzMLNTzg_nDVQz9xEIC0TC2ZLEPXgx2Wa09eRqNNjUWet1O3lU0GKa-V8yH86XKx3NyWYs87DBnCzI7XTfWOZYO7ZCBd6QQMy5GcEcGC63AGzgL56GPbzn2igbCGcCqcFAZKLeANgN7qvydv5oszsxoRN2w_bUJwX-GOMlyplCkpKq-zUgDQUppbpo81Z4c1l6BrweRNPDhAn3Jvdeu3",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCY7vcvXlX2Nc2svNKxvhYSkUwLwO9oB9yv6zscy7u9DalWxGuSRJG7IVjSbKQSS1vLw0FpybsyhQKJgAlz8TgnuFqUQBcNxhToWmVAbbzK73bYUov41i7J0kVoFyl5RjHqZNur-HWhDIWzm71z-xRlPMeDTvuKv8zi8RNBsAd2KHA3KJQ2T7nujcbC8wJRcXurng2-O9m6D3EKD2vWKLCnWCS-FZrV_soVe5L3WJ5yj_8xNVxilmXMT_39bpV5jXWJpdMxreBWQx9V"
            ].map((src, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-surface-dark/60 backdrop-blur-md border border-white/5 p-8 rounded-sm flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:border-primary/50"
              >
                <img src={src} alt="Partner" className="max-h-20 w-auto opacity-80 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Sponsors (Gold Tier) */}
        <section>
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl text-white tracking-widest uppercase mb-2">Sponsors Officiels</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf38dafeTorEwemYkL5_UjizZmv1fapi0WK7VDvP4PO-Ve-yGiakEOrtfWBhi8hbohDSoFbBDPaZfECBCyOTrA8fA-7kC2h9Q_G6ueMv-cbmGOAKQaUcl72cfjkdlfj7ccfvV3VlikbQdeY494e1UU1jJo34zmf3qHwjGss5G7y7o9Ay01Zk3VsKuwRKkGxM6a-kVXNUAZ2JtEXbE3TS2Ng8Vbkjwkq3tWyXBg01uuRGPUBKoJMsI36Dk2eGskdCPRqLfhqRn5MG9m", tier: "Partenaire Platine" },
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzkGTvFYT7Huft5G6CuCPwwqukP8NafTgP6nYx6n1GUQsDNn0TF2Pcr56ETYAahIHfoLbTd-3yJgZ6f_MEVsWeQzduRABKuf4skm-KKWvWOBWDccAw9J2G9mWPQ1jLFQXPI0SxUtYa6toW_JV00FYvF5khWwXtdlf345EFSrfLX2t5wT07g47e3zlBu5Tmx7ItnZ8SkMvFa9lxdO4Vuehme_08Wlnr8R_odUOLo3-zNRAjoJThcZVK84PvVlkeJSUMwd4LjWALPVOS", tier: "Partenaire Platine" },
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNUSdWoRxr7KfUDSGnOPC-w7uf9tIjAyuHjylwoS_feXWpiF5KnKjD2bwIIf3k8JBUoGyJWzjNzr5ANB9FNsvPyw9_XVOWAy8bYiXsLy7luF4dyDnAxbmd4GDPuybKRbCZ3GOxFDh3j2CsUTLl8DbXeO0vsEVkcwu9tCY7L-iWnUXyCEZmSj0U4YAdJbYyavesQTOWAN4RLE6lhgdlUcrSyaMrrGLrzckJKqyrLgZNGhY0aS8TI3I9r3r4sJMaEINGyCEKdWIaUn0b", tier: "Partenaire Platine" }
            ].map((sponsor, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-surface-dark/60 backdrop-blur-md border border-primary/20 p-12 rounded-sm flex items-center justify-center relative group overflow-hidden hover:border-primary transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-2 bg-primary text-background-dark font-black text-[10px] uppercase tracking-tighter">
                  {sponsor.tier}
                </div>
                <img src={sponsor.src} alt="Sponsor" className="max-h-32 w-auto transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Media Partners */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading text-3xl text-accent-red tracking-widest uppercase">Media & Broadcasting</h2>
            <div className="h-px flex-1 ml-12 bg-gradient-to-r from-accent-red/40 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuA_AqYLkSOlyDo4IT_In7cKHgY3msZD0uF5PWYG4ZwpRhZdqFjw78Z-o763Q_DYsXU0OIAZiAwARlSGeoVuvu8cQmkNB4VU5CwOJTOBS8HepZoXX8PNzMirK3sGmZ2847Y1Ya4Tp5L3ApdZ8pTn0RjApW8CQQSnN7CJqZh-MU-WQlA_e-JeRm7gbzEuZ8A4D1d5Qipc-MPe4EFdEBa91DdinN85xYWVrF51gEo_F2hYVo-IpHy-l2EOc7ZbgNSH6v5_U5wFTjEqwi_s",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDLX9i7lSv8TWZl1YTqwqPHPHnMc3ESxeCrQ7lRKZl-0w3vdcI90UYTBqFEth7GvCsieeiGjrwV_f_Xph4j_tT0ilna58n_oSJLMMBhPjlC96iw3sEsVFFBsovvsvoC7WL2S1QCdTG7g13V9CGXorsk8DW7dtiRMOXkN7a1pu_uCzSLPGQckzan9hhBhP7IyBilf2pw4aOCh-3ltfDRtvhsChAd35HgEoXHFWf0MOe6D3b88VYHd2nVPrFGygxCJb7XS1gvCiSagZun",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCKZ3Ywy3bjW9lb2t6-gxlVahUAr2ieWazrKN0SLzyJaw7xufuJ1Jau70v3ZGux3lnJc2LIvWw93NmPyp507EV_fKfUZG_5t9iNbaqPiaZV9rH7uuZgi35l_2bSBZrwi-42tvbEmx7GV5vpDquVHMbZIxB3OTQkI053p2TMvPZNz3TdIDYK_ubkzU2lQCGx7XgWrG2y9Y8Y5MBaCRcI0dH82upoqYVAxHTfmIM4_TxG16vbQNYMEmZx6NP6YCk9ZS5jmwWX6jPLX3W6",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDpuYVW6yxB5Lxz8bq_X4N9bciqKzNejbWuiLqIjAymgFbwvRqWp9_SqxwE2NjtUY1bE8837h2Zsl44cM140Mdel0QuXJTuvqQNHc-COiVdWJfSRkinEviCqcFcfuL4y7NIE8hh7syz5yUsc-oKKoPZqTh3rN8GJ7C44MLxYOdYQBrXl22B382saAPnzkYobTOoizANUy5ywCSTpZVkRM_sheQJUtw1fNDTea34ZET5ZescjsazUgybVj6GQeIfqy98RCVqLbTa341B",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDsxuYUIf7Fa4jhSxfK0PpYlMsy0u2CMFBMoiX9F_ewpBI8jdGoAEa_5StQ0qNy8zBnh7W7KhfHvs7mdi5AAbJMkQe9kT-IKrH_w2PisUYlfM11V2zM6IFT8UbJYEDeKI9iyNhXa_P3P4_w4vXRCelq0o5mAbjEosS08Gi2j_raqBqnVuEwPMb4yn7SOg3O_zkq5vEPBKW8S-NRg8XlmU1vt6F9R7GzwpEk3XP6kStyYCpCYPTA9l0y639uZt1Q3pX-s2XT_WE1TnXh"
            ].map((src, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/10 hover:border-accent-red/40 p-6 flex items-center justify-center grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              >
                <img src={src} alt="Media Partner" className="max-h-12 w-auto" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical & Local Partners */}
        <section>
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-white tracking-widest uppercase mb-1">Production & Partenaires Locaux</h2>
            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">L'excellence opérationnelle au cœur de l'événement</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <Theater className="w-8 h-8" />, label: "Scénographie" },
              { icon: <Utensils className="w-8 h-8" />, label: "Catering" },
              { icon: <Truck className="w-8 h-8" />, label: "Logistique" },
              { icon: <Hotel className="w-8 h-8" />, label: "Hospitalité" },
              { icon: <Video className="w-8 h-8" />, label: "Production Vidéo" },
              { icon: <Shield className="w-8 h-8" />, label: "Sécurité" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="border border-white/5 p-6 flex flex-col items-center gap-4 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <span className="text-[10px] text-center font-black tracking-tighter uppercase whitespace-nowrap">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-surface-dark border border-primary/20 rounded-sm p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="font-heading text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight leading-none">Devenez un Acteur <span className="text-primary">de l'Histoire</span></h2>
              <p className="text-slate-400 mb-10 leading-relaxed font-light italic">Associez votre image à l'événement de danse urbaine le plus prestigieux d'Afrique de l'Ouest. Bénéficiez d'une visibilité internationale et soutenez l'émergence des talents locaux.</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`btn-luxury-primary shimmer-effect w-full sm:w-auto text-center flex items-center justify-center gap-2 ${isDownloading ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isDownloading ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-background-dark border-t-transparent rounded-full"
                      />
                      Préparation...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Dossier de Sponsoring
                    </>
                  )}
                </button>
                <button 
                  onClick={onContactClick}
                  className="btn-luxury-secondary w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Nous Contacter
                </button>
              </div>
            </div>
            <div className="bg-background-dark/50 backdrop-blur-md p-10 rounded-sm border border-white/5 shadow-inner">
              <h3 className="font-black text-xl mb-8 text-primary uppercase tracking-widest">Demande d'information</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input required className="bg-surface-dark border border-white/10 rounded-sm focus:border-primary text-sm p-4 w-full outline-none transition-all" placeholder="Nom" type="text"/>
                  <input required className="bg-surface-dark border border-white/10 rounded-sm focus:border-primary text-sm p-4 w-full outline-none transition-all" placeholder="Entreprise" type="text"/>
                </div>
                <input required className="bg-surface-dark border border-white/10 rounded-sm focus:border-primary text-sm p-4 w-full outline-none transition-all" placeholder="Email professionnel" type="email"/>
                <select className="bg-surface-dark border border-white/10 rounded-sm focus:border-primary text-sm p-4 w-full outline-none transition-all text-slate-400 cursor-pointer">
                  <option>Type de Partenariat</option>
                  <option>Sponsoring Officiel</option>
                  <option>Partenariat Média</option>
                  <option>Support Technique</option>
                </select>
                <textarea required className="bg-surface-dark border border-white/10 rounded-sm focus:border-primary text-sm p-4 w-full outline-none transition-all resize-none" placeholder="Votre message" rows={4}></textarea>
                <button className="w-full bg-accent-red text-white font-black py-4 uppercase text-xs tracking-[0.3em] hover:bg-accent-red/90 transition-all flex items-center justify-center gap-2">
                  Envoyer <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Partners;
