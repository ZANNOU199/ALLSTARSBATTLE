import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { cmsService } from './services/cmsService';
import { MediaItem } from './types';

const Media = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedYear, setSelectedYear] = useState(2026);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const data = cmsService.getData();
    setMediaItems(data.media || []);
  }, []);

  // Fallback data if CMS is empty
  const fallbackPhotos = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9xPXChwqoHKYNjo6-R2Iielz0x1_qdIaedLHTI-SxhMsLB2uZjRgmQZt55dP7f1Qawd3uU-df4W1wi6UxJcHsq5LrEgCU4iDgMEe2oBm5k50RdXP3uvyj_IQJ86Mu0mzEjefEM_kwogdioXdVnC3ZRJAc2RhKLqVbwkgueQP4-v8GPLV9qM_CZQQARhn2kcLpupXzhH1ZIhC0CLoyBeSwTQH2vUK0_K5twIrvHM0b96u_Y5_0X_1WooLz1zJhuH3B_cf_UO8LGkaN",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUhFl2n0qh-ZGeucLIhUqCXQgpDjQce1YXl1v1DXlyMEirhTmaz0Xl3sNoOUhMKNabQVLMsIRx3jZoQoxGXwENVOn6AC9OdUhu3Z6p6RkZckIwfOEGtpYMa_uklFtAg5hnxv6UtyqUsjIjENF3YtJGd_6SHhY2spXJrnQQ2cvzwoQno8Cr8DqKYT1ZNdiyRy8cUB8VaxazhlsVERIASD30T0EuwR2WvLOuuO6ul2rAcGiyXdMACpxKxpvdYNiZGqRsJ6qWOKuEDXYn",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlYi46n2V_gWoARvufGOALxqIMik-sJTRgYn9sWhELo8icVITWM8I0ia9AOgZF6NkDu_WUwsLOO5UJdckyMsXG4TsilpOdOL8ZRRGbXIVhxOfz5p7Dt2Nmf6QRKyfMchgX2saH9Yx5Nu13Md0fr5La_D-XHELIkBnS3T3GTkTX-xZvBSJjTUXdBs_uZzDdTDILrI8F-NwxaRaEH-FZbqRzV1a_xqCl78heyGFQyofoxQ2ipdHrApQf3UQ-PGGlAgJ8I-xG_YofUz7M",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAPY8pW4yquxlXj_gmPW3ktaDHPZqc0Lg34Ca7SDGSN7TJDvgMLm8AziEWmiz7I-1NtsriRVLpPAWoM6UKbhWHOknaUkZlCc4suS0FtAwSAenU2BuJxsOHOXokg0-Kafj0nBWFgG7lXKalvYvdydYxNstKAjZ7FiOAEf1nnYTRoxMHpddETmdeAlPXVS6_gFe-3ZMDqFUpAi2Dk8VxmmmpaEYLwCJF1U45Yrdwpnx7jvGto3bN3sWc8xspsFi4tOQWzcB70ut25zfxk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDv7dDfTrKQfSOcHBSioqejsrURxghmsb7VGJEVYb2fRLG-ZDez3Q1u-Xx-5jES8SPGeVrvX4xiJzuEYdy9-F9SUdpmrVyJy08_KisCwo3T1zhGkWHQZQCvbzfiW-tZLGm2SB08DQl74G5KPLX5UyKGhi825Vdd2XTOmXTnnXddg67VMJu1utljtmjZZpatzp3O8GSCAEAlRfZYyC7e72iHdVjEOuSS0nQrApz8jibMt_FH4PRH7DrmSrQLhY1sATbUmluqmmNJU8fY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxwPxmZ5ltHpl70EHoIX88NCXfX-CnA-Msk8H7itZuOsFeaoVvx6pPIWSQhziLpKmbhbavNo8aVptJcrDWAeYjG14DBqxxOUwV15Lr8K2u9VQxhLVE2u_dB_0NNgYdy6ni-UMr-_rCHFz5HP3206TmmVZGQ0OWC4LNOBXETMl6qqWRa4tp0JsR_yNkCCHZsjIVcOgeQg_fTeAyydukjadNfoNKNBIzAIlBxQflStxan25vcLIeUEf9eoTnJ_1fiEyD10rj-0oLiCQj"
  ];

  const fallbackVideos = [
    {
      title: "Grande Finale : Junior vs Flash | Edition 2026",
      desc: "Une bataille épique pour le titre de champion d'Afrique. Intensité maximum au Palais des Congrès.",
      thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMkGNpuifFwnVWmRyAEi62j4okjsk2AGk7htsWqJJ5Tgq2tcP3SJAyJ1rdE3dGctaaGP9fviSs9AJ7eQ-W8v_wa1YiAVPUcll9BPeXmpOKbxc639NFT_BIoDxo0PllGZheqyXUk3J172KVKat4u56ZikImlZNkV8lF3fDwC5h0EqrtHFkBvgXp1PmQRk_7Hwt9FDuAzEzStye-cDpUfIV-wt5BJxS6F_752z7NIIDm6iMn_NHIFBQ3clAQvAJonPZTHTf4FE4rb_FB",
      duration: "12:45",
      tag: "Replay"
    },
    {
      title: "Aftermovie Officiel : L'énergie de Lomé",
      desc: "Plongez dans les coulisses et l'ambiance électrique de l'ASBI Togo 2026.",
      thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6Y5KhdIdLdMWZqG8ujhfsSHsWDUItyVRMHAkK1iti02_vL4V-f94Xqm6b8UExrKratgJMlIqoUupZFn3v8_8qaC-ZZEdoHIweTlolLZfwbawWlTIUHH1bdwLjjfzQo2uu_3TAAT3ogtMPDIrSeRdJA3hpbH4fDGtfLmN_aHJb4JBCYRlMP3pVmysYXurV2VXW2-bWBek0rxLu6OEjVRSfng3r6UdcAYcPl6O1mtCqAujrPGczBSXa0O-0xFI7IeI-lyVJ46RGgTJI",
      duration: "04:20",
      tag: "Exclusif"
    }
  ];

  const filteredPhotos = mediaItems.length > 0 
    ? mediaItems.filter(item => item.year === selectedYear && item.type === 'photo').map(item => item.url)
    : (selectedYear === 2026 ? fallbackPhotos : []);

  const filteredVideos = mediaItems.length > 0
    ? mediaItems.filter(item => item.year === selectedYear && item.type === 'video').map(item => ({
        title: item.title,
        desc: item.description,
        thumb: item.thumbnail || item.url,
        duration: item.duration,
        tag: item.tag
      }))
    : (selectedYear === 2026 ? fallbackVideos : []);

  return (
    <div className="bg-background-dark text-slate-100 font-display min-h-screen grainy-bg">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-32 pb-20 flex items-center justify-center overflow-hidden border-b-8 border-accent-red">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_lpERPa9NunQSXwBDnHkdYXWkWpPCZMYYseIzSoRmKm4vZyvNzQzNYYxesAdYo7uITZV1CGIzvOMNgq2zMbsZ0YM5r5bob_CqY5vvtRF0LHXklp0FBEiBzsRQd8MGQcOqRDEQ-nteRAphfCZguHeVY2srcWophQCcWOiCsWBRV8CPIhO-xFulocGbbn-79wPdP2NYI99Sctefrm22L4q-PFYaPO5yxBe-dX1VBTFJadgPPA_4MUtIr7zkWToK5Qzec3jUGGRGqKqj')" }}
        ></div>
        <div className="relative z-20 text-center px-4 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl leading-none tracking-tighter text-white drop-shadow-2xl uppercase"
          >
            MÉDIAS & <span className="text-primary">HIGHLIGHTS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm sm:text-lg md:text-xl font-light uppercase tracking-[0.3em] sm:tracking-[0.5em] text-slate-300 max-w-2xl mx-auto border-y border-white/20 py-4"
          >
            Revivez l'intensité brute et l'énergie pure de la scène
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 border-b border-white/10 pb-8">
          {[2026, 2024, 2022, 2020, 2018, 2016, 2015].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`text-lg sm:text-xl font-heading tracking-widest transition-all ${selectedYear === year ? 'text-primary scale-110 sm:scale-125' : 'text-slate-500 hover:text-white'}`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {['photos', 'vidéos', 'aftermovies'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 font-black uppercase tracking-widest rounded-lg skew-x-[-12deg] transition-all ${activeTab === tab ? 'bg-primary text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            >
              <span className="inline-block skew-x-[12deg]">{tab}</span>
            </button>
          ))}
        </div>

        {activeTab === 'photos' && (
          <motion.div 
            key={`${selectedYear}-photos`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-24"
          >
            {filteredPhotos.map((src: string, i: number) => (
              <div key={i} className="masonry-item relative group overflow-hidden rounded-xl border-2 border-white/5 hover:border-primary transition-all">
                <img 
                  src={src} 
                  alt={`Gallery ${i}`} 
                  className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-primary font-bold uppercase tracking-widest">Edition {selectedYear}</p>
                  <p className="text-xs text-slate-400">Lomé, Togo</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {(activeTab === 'vidéos' || activeTab === 'aftermovies') && (
          <motion.div 
            key={`${selectedYear}-videos`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-heading text-6xl text-white uppercase">REPLAYS <span className="text-accent-red">&</span> EXCLUSIFS {selectedYear}</h2>
              <div className="h-1 flex-grow bg-gradient-to-r from-accent-red to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              {filteredVideos.map((video: any, i: number) => (
                <div key={i} className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumb} 
                      alt={video.title} 
                      className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-black w-10 h-10 fill-current" />
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 bg-accent-red text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest">{video.tag}</span>
                    <span className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">{video.duration}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{video.title}</h3>
                    <p className="text-slate-400 text-sm">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Media;
