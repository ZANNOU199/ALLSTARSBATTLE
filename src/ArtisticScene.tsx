import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  Ticket, 
  ChevronDown,
  TrendingUp,
  X
} from 'lucide-react';

const companies = [
  {
    id: "kafig",
    name: "Compagnie Käfig",
    choreographer: "Mourad Merzouki",
    piece: "PIXEL",
    origin: "FRANCE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQD_e2Ugg5Ao_csW1_ZauvToZyXVbsC9zYKaKAwM9g7x1EpbT2W736B02i7sqZR11XsIrun2dEhCv1ePLfqQjJKOmo9lyfNNeaVUo4MV0GfHi1nyIGaQRpPGS-yd_L3yD7X7DBb2Dc6-9cB-qSHrqPGkMfra2yTIgFdobWZz55gQzdy7oQll5T5xTwFNTvxM9EAx6_UwUTOg1_3rOcgSOfRBz1m6x3HyNQiEXHpbHrxTtFqH2IVsahk3f86yrlCUv8X1Pomurbnppk",
    description: "Véritable pionnier de la scène hip-hop française, Mourad Merzouki fusionne les arts avec une virtuosité rare. 'PIXEL' est une œuvre où le monde virtuel rencontre la réalité physique, créant un dialogue fascinant entre les corps et les projections numériques.",
    bio: "Mourad Merzouki, figure emblématique de la danse contemporaine, dirige le Centre Chorégraphique National de Créteil. Son travail se caractérise par une ouverture constante vers d'autres disciplines : cirque, arts martiaux, musique classique et arts numériques.",
    gallery: [
      "https://picsum.photos/seed/kafig1/800/600",
      "https://picsum.photos/seed/kafig2/800/600",
      "https://picsum.photos/seed/kafig3/800/600"
    ],
    performances: ["15 Juillet - 20h30", "16 Juillet - 18h00"]
  },
  {
    id: "ruggeds",
    name: "The Ruggeds",
    choreographer: "Niek Traa",
    piece: "STATE OF MIND",
    origin: "PAYS-BAS",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjvDKsA9eqB3p7B9q4DN0X_u7eLvnEGioJXTVAA776wNcnzNxkhfSuWDuUDx8QZjVHQSWYKbWtNmhSUQ2V6mMl028GzkI_3dbJp5QC6YBeUibwBVbleu3GvUFbXP0-GFTIXXVegaxdF6V6_saoqnU46EJNeWmey90qKxRZdAhIY0jNoEr2qsyf-DjOdcVtrqglL0XjgJpodoCJvXoyVMwn_Dzq3f6Q1P5ao_XvRSdiUTRfePYGmVDdc9C6EvkJCcbKiMzhLbza3k-m",
    description: "The Ruggeds sont connus pour leur style explosif et leur créativité sans limites. 'STATE OF MIND' explore les méandres de la psyché humaine à travers des mouvements acrobatiques d'une précision chirurgicale.",
    bio: "Originaire d'Eindhoven, ce collectif a révolutionné le breakdance mondial en remportant les plus prestigieuses compétitions avant de se tourner vers la création scénique pure.",
    gallery: [
      "https://picsum.photos/seed/ruggeds1/800/600",
      "https://picsum.photos/seed/ruggeds2/800/600",
      "https://picsum.photos/seed/ruggeds3/800/600"
    ],
    performances: ["17 Juillet - 21h00", "18 Juillet - 19h30"]
  },
  {
    id: "kpalime",
    name: "Kpalimé Crew",
    choreographer: "Yao Mensah",
    piece: "RACINES",
    origin: "TOGO",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN8Up_R0QknhWYOyC-m1mXZCBp-eS_om9wYMAo5PNS54lAz2hjBqPncm7PvcBhwy99Z7OsV4Zhb97k6eGeq-RCakEZ73NDRildr61SANWYtG8isu8c6xOb_A6PQW8sbbTqjTERfD9lIZQt7ggmvQ73lc3aug-myqIaX_B0sqewStg78nyvWbEgQmyVowm83eu2dtAIbUM4B6Dxe4fdaRHCC6W67SIXnXum2_jiPUwN7O_zIYEb65PbpvDLbbXcHQY0KmuRd4Lx-aGA",
    description: "Une fusion puissante entre les danses traditionnelles d'Afrique de l'Ouest et le breakdance contemporain. 'RACINES' est un hommage vibrant à la terre et à l'héritage culturel.",
    bio: "Yao Mensah puise son inspiration dans les rituels de son enfance au Togo pour créer un langage corporel unique, à la fois ancestral et résolument moderne.",
    gallery: [
      "https://picsum.photos/seed/kpalime1/800/600",
      "https://picsum.photos/seed/kpalime2/800/600",
      "https://picsum.photos/seed/kpalime3/800/600"
    ],
    performances: ["14 Juillet - 22h00", "15 Juillet - 17h00"]
  },
  {
    id: "redbull",
    name: "Red Bull All Stars",
    choreographer: "RoxRite",
    piece: "THE ROOTS",
    origin: "USA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQtiKDmauhpZwRdkNTYXXYzYZmWV6qF2_9bTzvqFVko1GI1WEU5NqA3z81HPkLM0AloURvbd_WB8o63dBmJL2Q7xyKk6Z4kFsNcR2F1LvXF5fOu_zy15dGDIiqOydu77K-R8uqrcAjTpJ5bh0Em3Eqxx48eUiWYJIHoQaLGi2GaY42lE0F99gtE-0pb6UOvwI5joVeCh-BBBJN9j9GnCoUIgbWg6OoRyS3ITi0-uzUnFCSvlP-H9l4vqQAEnRiwLYFfnD98prEFn9y",
    description: "Les meilleurs danseurs du monde réunis pour une pièce qui retrace l'histoire du breakdance, de ses origines dans le Bronx jusqu'aux scènes internationales.",
    bio: "RoxRite, légende vivante du breakdance avec plus de 100 victoires internationales, signe ici sa première grande chorégraphie d'ensemble.",
    gallery: [
      "https://picsum.photos/seed/redbull1/800/600",
      "https://picsum.photos/seed/redbull2/800/600",
      "https://picsum.photos/seed/redbull3/800/600"
    ],
    performances: ["16 Juillet - 22h30", "17 Juillet - 20h00"]
  }
];

interface ArtisticSceneProps {
  onNavigateToProgram?: () => void;
  onNavigateToTickets?: () => void;
}

const ArtisticScene = ({ onNavigateToProgram, onNavigateToTickets }: ArtisticSceneProps) => {
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  return (
    <div className="bg-background-dark text-slate-100 font-sans selection:bg-primary selection:text-background-dark">
      <AnimatePresence mode="wait">
        {!selectedCompany ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-20">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <motion.div 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="w-full h-full bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDI8WzswOB2uB-qOUd3Dhqa2Gey4xBH5kW3ybyesbj6_bKDCQ_mjQ4CwUY2vZbNoSSvM5ZDbNeO1MSNK-Bd7Ix63DSV7_5LDRL6w--ll1y58Rdick4pZ2QZuRJi54_67fcUXStbiwjkbUWK8xPKmsBfRy60UjDgHqbJwI36UuE7X8kqoictCds8CvEf140Fen70QaQvGeyMZMwzXlFgcmVDIQp4tMMPzlFc8p5QW235-Ipf_43sYfneElm3Iu3zia4hRmSa6NQnbIII')" }}
                ></motion.div>
              </div>
              
              <div className="relative z-20 text-center px-6 max-w-5xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1 border border-accent-red text-accent-red font-display text-lg md:text-xl tracking-[0.2em] mb-8 uppercase"
                >
                  Édition Spéciale
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-5xl sm:text-7xl md:text-9xl font-heading leading-[0.9] mb-6 tracking-tighter uppercase"
                >
                  LA SCÈNE <span className="text-primary italic">ARTISTIQUE</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-xl font-light text-slate-300 max-w-2xl mx-auto uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed"
                >
                  Quand le Breakdance rencontre la Création Chorégraphique
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
                >
                  <button 
                    onClick={onNavigateToProgram}
                    className="btn-luxury-secondary !px-10 !py-4 !text-lg flex items-center justify-center gap-3"
                  >
                    PROGRAMME <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={onNavigateToTickets}
                    className="btn-luxury-primary !px-10 !py-4 !text-lg flex items-center justify-center gap-3 shimmer-effect"
                  >
                    BILLETTERIE <Ticket className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
              >
                <ChevronDown className="text-primary w-8 h-8 opacity-50" />
              </motion.div>
            </section>

            {/* Companies Section */}
            <section className="py-20 md:py-32 px-6 md:px-16 bg-background-dark grainy-bg">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
                  <div className="max-w-2xl">
                    <h2 className="text-accent-pink font-display text-xl md:text-2xl tracking-[0.3em] mb-4 uppercase">LES PROTAGONISTES</h2>
                    <h3 className="text-4xl sm:text-6xl md:text-7xl font-heading text-white uppercase leading-none">COMPAGNIES <span className="text-primary italic">INVITÉES</span></h3>
                  </div>
                  <p className="text-slate-400 max-w-sm text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
                    Cliquez sur une compagnie pour découvrir son univers et ses créations.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                  {companies.map((company, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedCompany(company)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-surface-dark mb-8 rounded-sm border border-white/5">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                        <img 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                          src={company.image} 
                          alt={company.name}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-primary text-background-dark text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                            {company.origin}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-heading text-white group-hover:text-primary transition-colors tracking-wide uppercase mb-2">
                        {company.name}
                      </h4>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-3 italic">
                        Chorégraphie: {company.choreographer}
                      </p>
                      <div className="h-px w-12 bg-accent-pink/30 mb-4 group-hover:w-full transition-all duration-500"></div>
                      <p className="text-accent-pink text-xs font-black uppercase tracking-[0.2em]">
                        Pièce: '{company.piece}'
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Piece Section */}
            <section className="py-20 md:py-32 bg-surface-dark/30 border-y border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10"></div>
              
              <div className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/50"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-pink/50"></div>
                    
                    <div className="relative overflow-hidden aspect-video rounded-sm shadow-2xl group">
                      <img 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFFVjlS0aV2aTZ_NOUWSPOLFwvZDL53_dHLHupDNuVMhBZlkX7CnONhZG-SOJnA70FigEjAj6fHlw1dX_QNjvlouaXTV7FpZAXArqfjERLDvl6Cy48tFNGGL6rFGW1y4K1v_8gLWpXw9U-t6RhMPGVxdPc9kfXz5lgGmOZsIdsyqxJ8XtocNNGz91LRaDnMusjC2cud0R5XhBaE_0Ifh_vQJNugwvgwOBYr3hxh492ZauvzD8RKjUl3QeOwy71EzcXE5PeEQ3CspOm" 
                        alt="L'éveil des ombres"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="w-20 h-20 rounded-full bg-primary text-background-dark flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8 md:gap-10"
                  >
                    <div>
                      <span className="text-primary font-display text-lg md:text-xl tracking-[0.4em] uppercase block mb-4">Mise en lumière</span>
                      <h2 className="text-5xl sm:text-7xl md:text-8xl font-heading text-white leading-[0.9] uppercase">
                        L'ÉVEIL DES <span className="text-accent-pink italic">OMBRES</span>
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-8 md:gap-12">
                      <div className="space-y-1">
                        <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] font-black">Durée</p>
                        <p className="text-white font-heading text-2xl md:text-3xl uppercase">45 MIN</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] font-black">Chorégraphe</p>
                        <p className="text-white font-heading text-2xl md:text-3xl uppercase">K. AFRIKA</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] font-black">Musique</p>
                        <p className="text-white font-heading text-2xl md:text-3xl uppercase">LIVE DJ SET</p>
                      </div>
                    </div>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light italic">
                      Une exploration viscérale du lien entre le corps et son environnement numérique. Cette pièce fusionne le breakdance académique avec des projections interactives en temps réel, créant une illusion de mouvement où l'ombre devient l'acteur principal.
                    </p>

                    <button 
                      onClick={() => setShowSynopsis(true)}
                      className="w-fit flex items-center gap-6 group"
                    >
                      <span className="text-white font-heading text-xl md:text-2xl tracking-widest uppercase border-b border-primary/30 pb-2 group-hover:text-primary group-hover:border-primary transition-all duration-300">
                        Synopsis complet
                      </span>
                      <TrendingUp className="text-primary group-hover:translate-x-3 transition-transform w-6 h-6" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="min-h-screen bg-background-dark pt-24 pb-20"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-16">
              {/* Back Button */}
              <button 
                onClick={() => setSelectedCompany(null)}
                className="flex items-center gap-4 text-slate-500 hover:text-primary transition-colors mb-12 group"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Retour à la liste</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Visuals */}
                <div className="lg:col-span-7 space-y-12">
                  <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/5"
                  >
                    <img 
                      src={selectedCompany.image} 
                      alt={selectedCompany.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <span className="bg-primary text-background-dark px-4 py-1 text-[10px] font-black uppercase tracking-widest">{selectedCompany.origin}</span>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-4">
                    {selectedCompany.gallery.map((img, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="aspect-square overflow-hidden rounded-sm border border-white/5 grayscale hover:grayscale-0 transition-all cursor-pointer"
                      >
                        <img src={img} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Info */}
                <div className="lg:col-span-5 flex flex-col gap-12">
                  <div>
                    <h2 className="text-accent-pink font-display text-xl tracking-[0.3em] uppercase mb-4">COMPAGNIE</h2>
                    <h1 className="text-6xl md:text-8xl font-heading text-white leading-none uppercase mb-6">{selectedCompany.name}</h1>
                    <div className="h-1 w-24 bg-primary"></div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">La Pièce</p>
                      <p className="text-white font-heading text-3xl uppercase text-primary italic">"{selectedCompany.piece}"</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-slate-400 leading-relaxed text-lg font-light">
                        {selectedCompany.description}
                      </p>
                    </div>

                    <div className="p-8 bg-surface-dark/50 border-l-4 border-accent-pink">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-4">Le Chorégraphe</p>
                      <h4 className="text-white font-heading text-2xl uppercase mb-4">{selectedCompany.choreographer}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        {selectedCompany.bio}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Représentations ASBI 2026</p>
                      <div className="flex flex-col gap-3">
                        {selectedCompany.performances.map((perf, i) => (
                          <div key={i} className="flex items-center gap-4 text-white">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="font-heading text-xl uppercase">{perf}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={onNavigateToTickets}
                      className="btn-luxury-primary w-full !py-6 !text-xl shimmer-effect"
                    >
                      RÉSERVER POUR CETTE COMPAGNIE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synopsis Modal */}
      <AnimatePresence>
        {showSynopsis && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSynopsis(false)}
              className="absolute inset-0 bg-background-dark/95 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-surface-dark border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowSynopsis(false)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="space-y-8">
                <div>
                  <span className="text-primary font-display text-xl tracking-[0.3em] uppercase block mb-2">Synopsis Complet</span>
                  <h2 className="text-5xl md:text-7xl font-heading text-white uppercase leading-none">L'ÉVEIL DES <span className="text-accent-pink italic">OMBRES</span></h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                      "L'Éveil des Ombres" est une œuvre chorégraphique révolutionnaire qui explore la dualité entre l'existence physique et l'identité numérique.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      Dans un monde saturé d'écrans et de données, que reste-t-il de notre essence corporelle ? La pièce commence dans une obscurité totale, où seul le souffle des danseurs est audible. Progressivement, des particules de lumière projetées commencent à interagir avec leurs mouvements.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      Le breakdance, ici dépouillé de son aspect purement compétitif, devient un langage de résistance et d'adaptation. Les danseurs luttent contre leurs propres ombres numériques, qui parfois les précèdent, parfois les imitent, et parfois les emprisonnent.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 p-6 border-l-4 border-primary">
                      <h4 className="text-white font-heading text-xl uppercase mb-4">Note d'intention</h4>
                      <p className="text-slate-400 text-sm italic leading-relaxed">
                        "Je voulais créer un espace où la technologie ne se contente pas d'illustrer la danse, mais devient un partenaire de jeu imprévisible. L'ombre n'est plus une absence de lumière, mais une présence numérique qui nous force à redéfinir notre propre réalité physique."
                        <br/>
                        <span className="text-primary block mt-2">— K. Afrika, Chorégraphe</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-black mb-1">Interprètes</p>
                        <p className="text-white font-bold text-sm">8 B-Boys & B-Girls</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-black mb-1">Technologie</p>
                        <p className="text-white font-bold text-sm">Motion Capture Live</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex justify-end">
                  <button 
                    onClick={() => setShowSynopsis(false)}
                    className="btn-luxury-primary !px-8 !py-3"
                  >
                    FERMER
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtisticScene;
