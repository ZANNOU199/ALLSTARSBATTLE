import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Music, 
  Star, 
  Trophy, 
  Users,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Filter,
  Download,
  Ticket,
  Loader2
} from 'lucide-react';

interface ProgramProps {
  onReserveTickets?: () => void;
}

const Program: React.FC<ProgramProps> = ({ onReserveTickets }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [startIndex, setStartIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Responsive days per page
  const [daysPerPage, setDaysPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDaysPerPage(3);
      } else if (window.innerWidth < 1024) {
        setDaysPerPage(4);
      } else {
        setDaysPerPage(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ["Tous", "Competition", "Workshop", "Show", "Talk", "Social"];

  const schedule = [
    {
      date: "14 AOÛT",
      theme: "CULTURE & TRANSMISSION",
      events: [
        {
          time: "10:00",
          title: "MASTERCLASS BREAKING FOUNDATIONS",
          location: "Studio A - Palais des Congrès",
          category: "Workshop",
          desc: "Apprenez les bases du footwork avec les pionniers du mouvement.",
          icon: <Users className="w-5 h-5" />
        },
        {
          time: "14:00",
          title: "CONFÉRENCE : L'ÉVOLUTION DU BREAK",
          location: "Auditorium",
          category: "Talk",
          desc: "Discussion sur l'intégration du breaking aux Jeux Olympiques et son futur.",
          icon: <Star className="w-5 h-5" />
        },
        {
          time: "18:00",
          title: "OPENING CEREMONY",
          location: "Main Stage",
          category: "Show",
          desc: "Spectacle chorégraphique mêlant danses traditionnelles togolaises et breaking moderne.",
          icon: <Music className="w-5 h-5" />
        },
        {
          time: "21:00",
          title: "WELCOME PARTY",
          location: "Rooftop Hotel 2 Février",
          category: "Social",
          desc: "Soirée de réseautage pour les danseurs, juges et partenaires.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    },
    {
      date: "15 AOÛT",
      theme: "THE BATTLE BEGINS",
      events: [
        {
          time: "09:00",
          title: "QUALIFICATIONS OPEN 1VS1",
          location: "Arena B",
          category: "Competition",
          desc: "Plus de 100 danseurs s'affrontent pour intégrer le Top 16.",
          icon: <Trophy className="w-5 h-5" />
        },
        {
          time: "13:00",
          title: "BATTLE KIDS EXHIBITION",
          location: "Main Stage",
          category: "Show",
          desc: "La relève du breakdance africain montre son talent.",
          icon: <Star className="w-5 h-5" />
        },
        {
          time: "15:00",
          title: "TOP 16 - 2VS2 MIXED GENDER",
          location: "Main Stage",
          category: "Competition",
          desc: "Les duos s'affrontent pour une place en finale.",
          icon: <Trophy className="w-5 h-5" />
        },
        {
          time: "20:00",
          title: "BEATBOX SHOWCASE",
          location: "Main Stage",
          category: "Show",
          desc: "Performance live des meilleurs beatboxers de la région.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    },
    {
      date: "16 AOÛT",
      theme: "THE GRAND FINALE",
      events: [
        {
          time: "11:00",
          title: "WORKSHOP : ADVANCED POWERMOVES",
          location: "Studio A",
          category: "Workshop",
          desc: "Session technique intensive sur les rotations et acrobaties.",
          icon: <Users className="w-5 h-5" />
        },
        {
          time: "15:00",
          title: "FINALES 2VS2",
          location: "Main Stage",
          category: "Competition",
          desc: "Le couronnement des meilleurs duos de l'édition 2026.",
          icon: <Trophy className="w-5 h-5" />
        },
        {
          time: "19:00",
          title: "WORLD FINALS - TOP 16 1VS1",
          location: "Main Stage",
          category: "Competition",
          desc: "L'événement principal. Le combat pour le trône international.",
          icon: <Trophy className="w-5 h-5" />
        },
        {
          time: "23:00",
          title: "OFFICIAL AFTER-PARTY",
          location: "Club VIP",
          category: "Social",
          desc: "Célébration finale avec DJ sets internationaux.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    },
    {
      date: "17 AOÛT",
      theme: "RECOVERY & COMMUNITY",
      events: [
        {
          time: "12:00",
          title: "YOGA FOR DANCERS",
          location: "Plage de Lomé",
          category: "Workshop",
          desc: "Session de récupération et de mobilité face à l'océan.",
          icon: <Users className="w-5 h-5" />
        },
        {
          time: "16:00",
          title: "COMMUNITY JAM",
          location: "Place de l'Indépendance",
          category: "Social",
          desc: "Cercle ouvert pour tous les niveaux. Danse libre et partage.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    },
    {
      date: "18 AOÛT",
      theme: "STREET ART DAY",
      events: [
        {
          time: "10:00",
          title: "GRAFFITI LIVE SESSION",
          location: "Murs du Palais",
          category: "Show",
          desc: "Fresque géante réalisée en direct par des artistes locaux.",
          icon: <Star className="w-5 h-5" />
        }
      ]
    },
    {
      date: "19 AOÛT",
      theme: "FASHION & STYLE",
      events: [
        {
          time: "18:00",
          title: "URBAN FASHION SHOW",
          location: "Main Stage",
          category: "Show",
          desc: "Défilé des marques de streetwear émergentes du Togo.",
          icon: <Star className="w-5 h-5" />
        }
      ]
    },
    {
      date: "20 AOÛT",
      theme: "DJ BATTLES",
      events: [
        {
          time: "20:00",
          title: "SCRATCH CHAMPIONSHIP",
          location: "Main Stage",
          category: "Competition",
          desc: "Les meilleurs DJs s'affrontent sur les platines.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    },
    {
      date: "21 AOÛT",
      theme: "EXPERIMENTAL DANCE",
      events: [
        {
          time: "17:00",
          title: "ALL STYLES EXPERIMENTAL",
          location: "Arena B",
          category: "Competition",
          desc: "Battle sans limites de style, focus sur la créativité pure.",
          icon: <Trophy className="w-5 h-5" />
        }
      ]
    },
    {
      date: "22 AOÛT",
      theme: "CLOSING WORKSHOPS",
      events: [
        {
          time: "10:00",
          title: "FINAL MASTERCLASS",
          location: "Studio A",
          category: "Workshop",
          desc: "Dernière session intensive avant la clôture du festival.",
          icon: <Users className="w-5 h-5" />
        }
      ]
    },
    {
      date: "23 AOÛT",
      theme: "GRAND FINALE CONCERT",
      events: [
        {
          time: "20:00",
          title: "CLOSING CONCERT",
          location: "Stade de Lomé",
          category: "Show",
          desc: "Concert géant avec des têtes d'affiche internationales.",
          icon: <Music className="w-5 h-5" />
        }
      ]
    }
  ];

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(211, 95, 23); // Primary color
      doc.setFontSize(24);
      doc.text('ALL STARS BATTLE 2026', 105, 20, { align: 'center' });
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('PROGRAMME COMPLET DU FESTIVAL - LOMÉ, TOGO', 105, 30, { align: 'center' });

      let currentY = 50;

      schedule.forEach((day, index) => {
        // Check for new page
        if (currentY > 240) {
          doc.addPage();
          currentY = 20;
        }

        doc.setTextColor(211, 95, 23);
        doc.setFontSize(16);
        doc.text(`JOUR ${index + 1} : ${day.date}`, 14, currentY);
        currentY += 8;

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(12);
        doc.text(day.theme, 14, currentY);
        currentY += 10;

        const tableData = day.events.map(event => [
          event.time,
          event.title,
          event.category,
          event.location
        ]);

        autoTable(doc, {
          startY: currentY,
          head: [['Heure', 'Événement', 'Catégorie', 'Lieu']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [211, 95, 23] },
          styles: { fontSize: 10, cellPadding: 5 },
          margin: { left: 14, right: 14 }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      });

      // Footer on last page
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2026 All Stars Battle International. Tous droits réservés.', 105, 285, { align: 'center' });

      doc.save('Programme_AllStarsBattle_2026.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased min-h-screen">
      {/* Header Section */}
      <section className="relative py-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden grainy-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
        <div className="relative z-20 space-y-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-red font-heading text-2xl tracking-[0.3em] block uppercase"
          >
            FESTIVAL PROGRAM
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-heading leading-[0.85] uppercase tracking-tighter"
          >
            PROGRAMME <br/> <span className="text-primary italic">COMPLET</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic"
          >
            10 jours d'immersion totale dans la culture urbaine.
          </motion.p>
        </div>
      </section>

      {/* Navigation Jours - Paginated */}
      <section className="sticky top-16 z-40 bg-background-dark/80 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between">
            {/* Back to Start */}
            <div className="w-12 md:w-20 flex justify-center">
              <button 
                onClick={() => {
                  setStartIndex(0);
                  setSelectedDay(0);
                }}
                className={`p-2 md:p-4 text-slate-500 hover:text-primary transition-all duration-300 flex flex-col items-center gap-1 ${startIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                title="Retour au début"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter">Début</span>
              </button>
            </div>

            <div className="flex flex-1 justify-center overflow-hidden">
              {schedule.slice(startIndex, startIndex + daysPerPage).map((day, idx) => {
                const actualIdx = startIndex + idx;
                return (
                  <button
                    key={actualIdx}
                    onClick={() => {
                      setSelectedDay(actualIdx);
                      setSelectedCategory("Tous");
                    }}
                    className={`flex-1 py-6 md:py-8 px-1 md:px-4 border-b-2 transition-all duration-300 flex flex-col items-center gap-1 md:gap-2 min-w-0
                      ${selectedDay === actualIdx ? 'border-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-white'}`}
                  >
                    <span className="text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase whitespace-nowrap">J{actualIdx + 1}</span>
                    <span className={`font-heading text-sm md:text-2xl whitespace-nowrap ${selectedDay === actualIdx ? 'text-primary' : ''}`}>{day.date}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Set */}
            <div className="w-12 md:w-20 flex justify-center">
              <button 
                onClick={() => {
                  const nextIndex = startIndex + daysPerPage;
                  if (nextIndex < schedule.length) {
                    setStartIndex(nextIndex);
                    setSelectedDay(nextIndex);
                  }
                }}
                className={`p-2 md:p-4 text-slate-500 hover:text-primary transition-all duration-300 flex flex-col items-center gap-1 ${startIndex + daysPerPage >= schedule.length ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                title="Jours suivants"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter">Suivant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-background-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300
                  ${selectedCategory === cat 
                    ? 'bg-primary border-primary text-background-dark' 
                    : 'bg-transparent border-white/10 text-slate-400 hover:border-primary/50 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-16 text-center">
          <motion.h2 
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl text-white uppercase tracking-widest mb-4"
          >
            {schedule[selectedDay].theme}
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDay}-${selectedCategory}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {schedule[selectedDay].events
                .filter(event => selectedCategory === "Tous" || event.category === selectedCategory)
                .map((event, idx) => (
                  <div 
                    key={idx}
                    className="group bg-surface-dark border border-white/5 p-8 rounded-xl hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[120px] border-r border-white/10 pr-8">
                      <Clock className="text-primary w-6 h-6 mb-2" />
                      <span className="font-heading text-4xl text-white">{event.time}</span>
                    </div>
                    
                    <div className="flex-grow space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter text-primary border border-primary/20">
                          {event.category}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                      <h3 className="font-heading text-3xl text-white group-hover:text-primary transition-colors uppercase tracking-wide">
                        {event.title}
                      </h3>
                      <p className="text-slate-400 font-light leading-relaxed">
                        {event.desc}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                        {event.icon}
                      </div>
                    </div>
                  </div>
                ))}
              {schedule[selectedDay].events.filter(event => selectedCategory === "Tous" || event.category === selectedCategory).length === 0 && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                  <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Aucun événement trouvé dans cette catégorie pour ce jour.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-surface-dark/30 border-t border-white/5 grainy-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-5xl text-white mb-8 uppercase">NE MANQUEZ RIEN</h2>
          <p className="text-slate-400 mb-12 italic">Certains événements comme les Masterclasses et le Lounge VIP nécessitent des réservations spécifiques.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onReserveTickets}
              className="btn-luxury-primary !px-12 !py-4 shimmer-effect flex items-center justify-center gap-3"
            >
              <Ticket className="w-5 h-5" />
              RÉSERVER MES BILLETS
            </button>
            <button 
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="btn-luxury-secondary !px-12 !py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {isGeneratingPDF ? 'GÉNÉRATION...' : 'TÉLÉCHARGER LE PDF'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Program;
