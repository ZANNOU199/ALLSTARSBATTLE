import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronDown
} from 'lucide-react';

const History = () => {
  const [showAll, setShowAll] = useState(false);

  const timelineEvents = [
    {
      year: "2024",
      title: "PARIS GLOBAL FINALS",
      champion: "B-BOY VICTOR (USA)",
      desc: "A monumental shift in the urban landscape, merging high-fashion aesthetics with the raw energy of street dance at the base of the Eiffel Tower.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOx4OzohzjsebHSpXNRLbJUXW6WVxoF-h5ZWWdYAPLRsqMHN0ISKYVTl8XtTOHBIyQZgSMsysZSSu3oXWzU4LwUm3j7lrGxSodGzapkgo0K_92_yEjlDGWjD6wQql1IfknOoFB_mYkTQnpYR-3TEi17A5eMhQ_dBtWTDJ-hTajKo4lyUqpx6LlL67pOv3wt4Ocih-sa-5aJUjhUXzBlOnEsCCSwhSZ9jB7Dst6Iy8Y0mIVF91ttwx0912nsUSANTC_-ACgEdibcYeb",
      current: true,
      side: "left"
    },
    {
      year: "2023",
      title: "TOKYO CHAMPIONSHIP",
      champion: "B-GIRL AMI (JAPAN)",
      desc: "Cyberpunk aesthetics met traditional discipline in a neon-soaked night that redefined technical precision in breaking.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6CWcQa_uAGgsJxtzxl9-GzdnIk-BFIyr-fzuqbS5n8k7qtUoRDmr_R_E-rlUL7EWMpTVRL-9P3hBMqzRDutKuDiT6IjatWN2SWmQjDEw_QvHd5DzSHAJD2bBTW4GhU8pakFdMsB_8SS4TMX5O0U_-8VFf94tv6AH2EGG_XugLYqkzoLay2hUWvdK_MvaPLxLZSw965WUGjiEig_QDlAWqItpQTTMZ7JzxsjSnEWXX1EIoT9RwmbPO1jondjCb550E90E8HGe2e6fR",
      side: "right"
    },
    {
      year: "2022",
      title: "NYC MASTERCLASS",
      champion: "B-BOY PHIL WIZARD (CANADA)",
      desc: "Returning to the roots. A gritty, raw underground aesthetic paired with luxury street culture in the heart of Brooklyn.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyicg2jKpaBPx_2O7US73hOurQVb_IKmSeNfBa-VG8jAAcDxh9AZzkFMiS86Vzq8_gOOEHKg7iCe98_H9hUjzIRXI4eAnTuCPUS8xAfToDtXWfgdW00v9l__F_E1IwHHJeS14ausDvysdTD9JGNim-ihP2HTA4lz9PBNH2a7Qkcp-grF2pp4Ol-BvACNRxFy4-jPDpTR7uf6nA7p-IGWN3M8kJlWq2xqInV5UeEvtO0np9xNCNLpfoeRjrjfHCLsNWAoEnCcDyaxNo",
      side: "left"
    },
    {
      year: "2021",
      title: "LONDON UNDERGROUND",
      champion: "B-BOY SUNNI (UK)",
      desc: "The return of live battles in an industrial warehouse setting, celebrating the resilience of the global breaking community.",
      image: "https://picsum.photos/seed/london/800/450",
      side: "right"
    },
    {
      year: "2020",
      title: "DIGITAL WORLD SERIES",
      champion: "B-BOY SHIGEKIX (JAPAN)",
      desc: "A revolutionary virtual edition that connected dancers from across the globe during the global lockdown.",
      image: "https://picsum.photos/seed/digital/800/450",
      side: "left"
    }
  ];

  const olderEvents = [
    {
      year: "2019",
      title: "SEOUL SOUL BATTLE",
      champion: "B-BOY HONG10 (KOREA)",
      desc: "High-octane energy in the heart of Seoul, where technical mastery reached new heights.",
      image: "https://picsum.photos/seed/seoul/800/450",
      side: "right"
    },
    {
      year: "2018",
      title: "GENESIS: LOMÉ ORIGINS",
      champion: "B-BOY KODJO (TOGO)",
      desc: "The first international expansion, bringing the battle to the vibrant streets of Lomé.",
      image: "https://picsum.photos/seed/lome/800/450",
      side: "left"
    },
    {
      year: "2017",
      title: "BERLIN WALL BATTLE",
      champion: "B-BOY LILOU (FRANCE)",
      desc: "A historic showdown in Berlin, blending street art and breaking in an iconic urban setting.",
      image: "https://picsum.photos/seed/berlin/800/450",
      side: "right"
    },
    {
      year: "2016",
      title: "RIO RHYTHM",
      champion: "B-BOY NEGUIN (BRAZIL)",
      desc: "Explosive energy and capoeira-influenced breaking in the colorful streets of Rio.",
      image: "https://picsum.photos/seed/rio/800/450",
      side: "left"
    },
    {
      year: "2015",
      title: "CASABLANCA CLASH",
      champion: "B-BOY WOLF (MOROCCO)",
      desc: "The North African debut, showcasing the incredible talent of the Maghreb scene.",
      image: "https://picsum.photos/seed/casa/800/450",
      side: "right"
    },
    {
      year: "2014",
      title: "AMSTERDAM FLOW",
      champion: "B-BOY MENNO (NETHERLANDS)",
      desc: "A masterclass in flow and creativity in the artistic hub of Amsterdam.",
      image: "https://picsum.photos/seed/ams/800/450",
      side: "left"
    },
    {
      year: "2013",
      title: "THE FOUNDATION: PARIS",
      champion: "B-BOY LIL ZOU (FRANCE)",
      desc: "Where it all began. A small underground battle in Paris that would grow into a global phenomenon.",
      image: "https://picsum.photos/seed/paris13/800/450",
      side: "right"
    }
  ];

  const legends = [
    { name: "VICTOR", origin: "USA | 2024 CHAMPION", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeIRl1SEpeZjPquIcm7ees8kaqYCWr6MwFe_dRs-rOTA_pRwNi8hyArMxrQtRyiO6dJlTXu-Gz7Pivmja7wPmUyYt3gQmiN6XJmPpHHDlgnfa716reFMuXm1KwHNxWbFRvY_RC0JcQ16-TVkxKjl2RUKe1NEApbS8usjPkH_ORF2Dl-SlbUzb_RPchwwak0lO89YKeawgR3MahHH87oeBNnCJcPAWAhwlqYKgbokgcgoFw74E2qNMRGLm4YFD5qNwWlDN4sqyjoovo" },
    { name: "AMI", origin: "JAPAN | 2023 CHAMPION", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9vZtROxn4QYY_Kj3UpuJ36ZcOXShG8wXX05dsys5cO0wu8zPXzn0Wa2G_6BTeQRE4GuaGyy8v8d1wwTjkDXJvaEGofZgG_TQA3K237vKvCC0o8Uyn_-PBg4e2zF_6_9p_h-QABhgfb3wSiCV2u9QTnJNQvkPQE6UVofYKLKdULBB_VhQb_VMZNof_6H-epIFDi-cjOsyfLdE3_mFkCcS2VnRWXw6oDDYVQyorj-Wds9ThX9qDl3JD_2dhMY-E_LFZ2-HMtlXTeq8J" },
    { name: "PHIL WIZARD", origin: "CANADA | 2022 CHAMPION", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCwR9ZPJ3KMP8f0jkQpkK3bojhN1jxxjMj9dgSdEFmmaiU4aE9HeK9nSQmkdmXuYnPdEjHbLnV8KDU__gT67t8kRqD-F0x81967hK_svJh0BZRXsnNLVQ19dG1XZ8ofJAx8RNRz7ugMfJUNZD4t66QIP23KhyVbyMogj-FH5t5KOLMVvAafYso3k7lny_wm-9KrLwvOv3VDfeatHsZhHdJafVjuGQBaVT-ApNu7_jJxCbzh3yJYQpaelXg8aLoP1GG6gT5UI2YrjMj" },
    { name: "HONG10", origin: "KOREA | 2019 FINALIST", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnFNpVNy_C0Tl3Vv-uxRblts5oK_QdX0OBdDeTq8sWLEYEabwWAu-rhhFY6gSvENNf_13xM5IuV1HPUPEYT6_Yk3aQKk-hmVY8wFcr-pwbJ51TI3zws4rAJHfnIra4Bs3QnTlzKxBas3buOy-30pzPlfOOY2iTV1fTpgtY352x3RLZ6pFrhwhgrRQA8CSAQuij4vXaP6nZfqg0N8nRg2gzNz3GlUoeFA4WsljiMd0_pBqhgFdweDLLMupD7BMZJgvJyn0tEt0O12ep" }
  ];

  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased">
      {/* Hero Section - Improved responsiveness */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grainy-bg pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd1VTyAZyyZGaq3VJUTbCIx1IiDThn8h-wO9I1BZhj_dPmDpq8TGCvt5HQBTEq7lWaJlOG8kajuntaJ6Iir74MgDLTAWr3cy8XLHGVG28pxHr_E2oHY7hMYFpc1sfe26HnZA2ZI7q1P18lXBLZW0bgqZ3Bhd16m-sJOphITZXDisohjsTGokeXh9_rsuiqFvxrrFXh_a9wTldDbaUA48rqyOPi0uqku-S0_YGtb94_dkhOawO2sRvlwJKOleSukCppSESR_L9RB6EI" 
            alt="Heritage Background"
          />
        </div>
        <div className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-red font-bold tracking-[0.4em] text-xs sm:text-sm mb-4 block"
          >
            DEPUIS 2013 • 12 ÉDITIONS
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-heading text-5xl sm:text-7xl md:text-9xl text-white tracking-tighter leading-none mb-6 uppercase"
          >
            L'HÉRITAGE <span className="text-primary italic">DU BREAK</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg uppercase tracking-[0.2em] font-light px-4"
          >
            Tracing the evolution of urban-luxury breakdance from Genesis to the Global Stage.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-6"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('timeline');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-luxury-primary w-full sm:w-auto !px-10 !py-4 shimmer-effect"
            >
              EXPLORE TIMELINE
            </button>
            <button className="btn-luxury-secondary w-full sm:w-auto !px-10 !py-4">REWATCH FINALS</button>
          </motion.div>
        </div>
      </section>

      {/* Vertical Timeline Section */}
      <section id="timeline" className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-accent-red/50 to-transparent hidden lg:block"></div>
        
        <div className="space-y-24 lg:space-y-40">
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={event.year}
              initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative group ${event.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Year for Mobile */}
              <div className="lg:hidden w-full text-center mb-4">
                <span className="font-heading text-6xl text-primary/40 tracking-widest">{event.year}</span>
              </div>

              <div className={`lg:w-1/2 hidden lg:block ${event.side === 'left' ? 'text-right' : 'text-left'}`}>
                <h3 className="font-heading text-[10rem] text-stroke opacity-30 group-hover:opacity-100 transition-all duration-700">
                  {event.year}
                </h3>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:flex items-center justify-center">
                <div className="size-4 rounded-full bg-primary ring-8 ring-primary/20"></div>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-surface-dark border border-white/10 p-2 rounded-xl group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                  <div className="aspect-video overflow-hidden rounded-lg mb-6 lg:mb-8 relative">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      src={event.image} 
                      alt={event.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 lg:mb-6">
                      <div>
                        <h4 className="font-heading text-3xl lg:text-4xl text-white tracking-wide mb-2">{event.title}</h4>
                        <p className="text-accent-red font-bold text-xs tracking-widest uppercase">{event.champion}</p>
                      </div>
                      {event.current && (
                        <span className="bg-primary/20 text-primary font-bold text-[10px] px-3 py-1 rounded uppercase tracking-widest border border-primary/30">
                          CURRENT EDITION
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 font-light mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                      {event.desc}
                    </p>
                    <button className="flex items-center gap-3 text-primary font-bold text-xs tracking-[0.2em] uppercase group/btn">
                      VIEW GALLERY <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Show More Button */}
          {!showAll && (
            <div className="flex justify-center pt-10 lg:pt-20 relative z-20">
              <button 
                onClick={() => setShowAll(true)}
                className="group flex flex-col items-center gap-4 text-primary"
              >
                <span className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-center">VOIR LES ÉDITIONS PRÉCÉDENTES</span>
                <div className="size-10 lg:size-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                  <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
                </div>
              </button>
            </div>
          )}

          {/* Older Events */}
          <AnimatePresence>
            {showAll && (
              <div className="space-y-24 lg:space-y-40 mt-24 lg:mt-40">
                {olderEvents.map((event, index) => (
                  <motion.div 
                    key={event.year}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative group ${event.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
                  >
                    {/* Year for Mobile */}
                    <div className="lg:hidden w-full text-center mb-4">
                      <span className="font-heading text-6xl text-primary/40 tracking-widest">{event.year}</span>
                    </div>

                    <div className={`lg:w-1/2 hidden lg:block ${event.side === 'left' ? 'text-right' : 'text-left'}`}>
                      <h3 className="font-heading text-[10rem] text-stroke opacity-30 group-hover:opacity-100 transition-all duration-700">
                        {event.year}
                      </h3>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:flex items-center justify-center">
                      <div className="size-4 rounded-full bg-primary ring-8 ring-primary/20"></div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                      <div className="bg-surface-dark border border-white/10 p-2 rounded-xl group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                        <div className="aspect-video overflow-hidden rounded-lg mb-6 lg:mb-8 relative">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            src={event.image} 
                            alt={event.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
                        </div>
                        <div className="p-6 lg:p-8">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 lg:mb-6">
                            <div>
                              <h4 className="font-heading text-3xl lg:text-4xl text-white tracking-wide mb-2">{event.title}</h4>
                              <p className="text-accent-red font-bold text-xs tracking-widest uppercase">{event.champion}</p>
                            </div>
                          </div>
                          <p className="text-slate-400 font-light mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                            {event.desc}
                          </p>
                          <button className="flex items-center gap-3 text-primary font-bold text-xs tracking-[0.2em] uppercase group/btn">
                            VIEW GALLERY <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Wall of Fame */}
      <section className="py-32 bg-surface-dark/30 border-y border-white/5 grainy-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl md:text-8xl text-white mb-4 uppercase tracking-tight">WALL OF FAME</h2>
            <p className="text-slate-500 font-bold tracking-[0.4em] uppercase text-xs">The Legends Who Defined ASBI</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {legends.map((legend, index) => (
              <motion.div 
                key={legend.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-background-dark border border-white/5 hover:border-primary/30 transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    src={legend.image} 
                    alt={legend.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary font-heading text-4xl mb-1">{legend.name}</p>
                  <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {legend.origin}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
