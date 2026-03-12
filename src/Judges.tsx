import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowRight,
  Globe,
  PlayCircle,
  Share2
} from 'lucide-react';

const judgesData = [
  {
    name: "B-BOY WING",
    country: "KOR",
    countryCode: "kr",
    role: "Legendary B-Boy | Red Bull All Star",
    desc: "Maître de la précision technique et du flow aérien. Champion du monde Red Bull BC One 2008.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsMPEeS8KmTa9xlSlIItDGCdiuw6Wudk0_CuB2EXO7b15Bd0gN1iI4vxVUBsedtLDEwbh9SNuQun4w9hhyMxVTgc5xqzC9gPQ9nY3GK8GKLG7IKXa6LxRR-9nPrVdusjenLnc2ppisUbr8Dj_vIwfAVA93UwDfdipoVGs0nWdEQe7gm5WCbINkcEtdaJ-hjHwDhWxljJ95OqNZzFTarmmqB1nUoxrsCoFGRSZmwOOXwv9NJz4TKINvQKZttFhHAyqvrCTQn3EL55WU"
  },
  {
    name: "B-GIRL AYUMI",
    country: "JPN",
    countryCode: "jp",
    role: "WDSF Certified | World Champion",
    desc: "Pionnière du breaking féminin de haut niveau. Reconnue pour sa propreté et sa musicalité.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbssUEujN3rOaXpRj_GtkCEj7CgyCyUmE4Bk5GoW5m5KaVU-ojV_PhYczT3RcrAVu_zjr9afB4AgOiQt7-1QUe35cvpjwzKEOwk8tcqsxN9EHGm3mal4SVKcLRgqcjwSoQmNPF-69L3kBIEGc6dahFQFKO91KL_JezTuwktkgy0Vah1t5j-Bbau5h1R5jeIYoBnu0DkJZOuWIsQgyxCc7RizJMTEaBAH9-M0HfYYmJ7YoSu8JdFAsnElsGMbZz0jQg1RCOKm-F2ToG"
  },
  {
    name: "LILOU",
    country: "FRA",
    countryCode: "fr",
    role: "Pockemon Crew | 2x BC One Champ",
    desc: "Une légende vivante au style unique. Analyse le caractère, l'attitude et l'originalité pure.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE6F-udt9xdGLRsqWUwZ8rd4p0IoUmg2O9VgG35Ubs_FxmT09vmfN1eZr8dWcEFL3wdbJawWGDq9_oxaFRRhabe7ieVxDNABV6uMNDnmD4B1IsXQwLYcQc0tBIdPW-o9H9f2Y9qooVFJH1W-4jKgJpY_VkgQDMo70WUbR0BkgmC1TAfLiAjnhH9Z6Ml-gG7efEjWVys3Xb_n8W4em-o0hinSPjwgO1qYffWVm7sCHkdFn8IRsJMSioeHM8OuhGmOzxGpfHi1TYd9LM"
  },
  {
    name: "B-BOY ROX",
    country: "GBR",
    countryCode: "gb",
    role: "Power Moves Specialist",
    desc: "Expert en dynamique et en explosivité physique. Fondateur de l'école technique \"Iron Flow\".",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuZJeH-zbIuBL20OgGmNDkRnl81gcOeVinTVMnYv6QWGZtnAhQ_pWE7p885XQeawmpgCTh0ArEbEVaDzJreVdFvLRYRLcYehY7fG79VPPNfI-YOevSdQjjK_nI11s3d2UCZqe0h4X5KG96xUJn491V06UW14cYqTe7tpldzJ_Wz1zBhWsT5_Nm30yUQM-Ixkv8uQbQwPEXELcU7f-SDCboerYZSIwLcoVkNRBhejtgJhbHCZrMYyuFYIVJv0EkkvPvBXJl4a0Pn1lT"
  },
  {
    name: "B-GIRL AMI",
    country: "JPN",
    countryCode: "jp",
    role: "Red Bull BC One Winner",
    desc: "L'élégance alliée à la puissance. Première championne du monde de l'histoire du BC One.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOoiNcxLKtzMqHPew1g5IA80iCX8ATcVsvftsajEDg1_Sjd8Powz7dpEvwtyIuWsEjLtWVPq3e5-bHfduJNb8Uj6X2c-V22v8CXimnLHowXcA9KwvQw39d12mDm1Dtk8Uvv2CQFGXbqEBuH83KDSxe2_ZXTRLRL1vq7omBkhD6Y_4Fwx1HDOj4SkjdpyKFzVZnifgHevH1mCXZCcvzQ8xwSAJKapwbt1VLIlEN1Yw9-I4PuHvGAnA8DUAH5s2T8OG4RnK7oEWhL04X"
  }
];

const staffData = [
  { 
    name: "Elom Kodjo", 
    role: "Directeur Fondateur & Producteur",
    bio: "Visionnaire et activiste culturel, Elom a fondé l'ASBI pour propulser le breaking africain sur la scène mondiale.",
    image: "https://picsum.photos/seed/elom/400/400"
  },
  { 
    name: "Sena Ayivi", 
    role: "Coordinatrice Artistique",
    bio: "Experte en danse urbaine, Sena veille à l'excellence artistique et à la cohérence culturelle de chaque édition.",
    image: "https://picsum.photos/seed/sena/400/400"
  },
  { 
    name: "Jean-Marc Koffi", 
    role: "Directeur Logistique",
    bio: "Le pilier opérationnel. Jean-Marc assure que l'arène et l'accueil des athlètes soient aux standards internationaux.",
    image: "https://picsum.photos/seed/jeanmarc/400/400"
  },
  { 
    name: "Afiwa Mensah", 
    role: "Relations Internationales",
    bio: "Pont entre le Togo et le monde, Afiwa gère les partenariats et la venue des délégations étrangères.",
    image: "https://picsum.photos/seed/afiwa/400/400"
  },
  { 
    name: "Yao Agbémagnon", 
    role: "Directeur Technique & Streaming",
    bio: "Maître des flux, Yao garantit une expérience immersive pour les milliers de spectateurs en ligne.",
    image: "https://picsum.photos/seed/yao/400/400"
  }
];

const Judges = () => {
  const [expandedStaff, setExpandedStaff] = React.useState<string | null>(null);

  const toggleStaff = (name: string) => {
    setExpandedStaff(expandedStaff === name ? null : name);
  };
  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 grainy-bg border-b-4 border-accent-red overflow-hidden">
        <div className="absolute inset-0 diagonal-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-red font-bold tracking-[0.3em] text-xs uppercase mb-4"
          >
            International Breaking Summit
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-heading text-7xl md:text-9xl text-white leading-none mb-6 uppercase"
          >
            JUGES & <span className="text-primary italic">ORGANISATION</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-400 text-lg md:text-xl border-l-2 border-primary pl-6 py-2 text-left"
          >
            L’expertise au service de la culture. Une sélection d'élite pour garantir l'excellence du breaking mondial au Togo.
          </motion.p>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-5xl text-white uppercase mb-2 tracking-tight">JURY INTERNATIONAL</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="text-slate-400 text-sm max-w-xs uppercase tracking-wider font-light">
            Cinq icônes mondiales, représentant les cinq piliers du jugement technique et artistique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {judgesData.map((judge, index) => (
            <motion.div 
              key={judge.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-surface-dark p-2 border border-white/10 relative overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                <img 
                  src={judge.image} 
                  alt={judge.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-primary text-background-dark px-3 py-1 font-heading text-xl flex items-center gap-2">
                  <img 
                    src={`https://flagcdn.com/w40/${judge.countryCode}.png`}
                    alt={judge.country}
                    className="w-6 h-auto rounded-sm shadow-sm"
                  />
                  {judge.country}
                </div>
              </div>
              <div className="px-2 pb-4">
                <h3 className="font-heading text-3xl text-white group-hover:text-primary transition-colors leading-none mb-1">{judge.name}</h3>
                <p className="text-accent-red text-[10px] font-black tracking-widest uppercase mb-3">{judge.role}</p>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {judge.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DJs & MCs Section */}
      <section className="py-24 bg-surface-dark/30 grainy-bg border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="font-heading text-5xl text-white uppercase tracking-tight">DJS & MC<span className="text-accent-red">S</span></h2>
            <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold">The heart and soul of the battle</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "DJ RENEGADE", origin: "United Kingdom", countryCode: "gb", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5JTF4OsaOf6rbdourJaJs5vj_L7rXs0jEPEjNEKB8PitMuuLGo-KB7E2O6NRhQE0gQ_r62lD9NgRt7H4-vgqHLSPH3FIJTjmGy0s2YedAuebIW30f97QMTbDq8Qk4ADw_s6PvS1lACmdoZl-eVSA760nBfBYa-uAM4m94xqMy3ETiG3GGSrC90aYnorsNzbEXgD_l1hTbQ2ZaXTDQoheD0GPl009GJ39a5Dzw5uSqhiaK4yLiVwFmwp0edfA20isOWS0E6rbsBJ0h" },
              { name: "DJ LEAN ROCK", origin: "USA", countryCode: "us", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCkgAXcxsIIu6odehzModyeJPuIN8FF1dM78v2skW-S1tmDpB0SVteumvBKjChgHB3Rq6e-D1gMbGhPaOJlxxAFMbFM3s555duwgzLb8NmCL8f5sqAZ7bliaBzyLQkqtix1pJ8tzaGGl76GlVRshoU63tIXS7jbD-kP5WNNR_ZYmITqJBOuMsShI1MluneOFFtENjbBgyxVhTkGmxjNe4pFwngLIXCDNy-Jc-bI8KcxEDRbLPIi6WMlgzRX22TtZUrypv_1POo36ph" },
              { name: "MC TRIX", origin: "Germany", countryCode: "de", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD04vI0-akhv-mVtidAHRvb_bB9zpxSSIMZai2QqthaLQQ7WIxXoSfdO0ZLClWxalB7WLto1O0GmIJPbGku2ghpGAHph_FmOfIvO3EP_cYHr3f_WeW96Z2iRf3Xo8dDrtV1zwVaTtBSTVh6i4WKJm2vKhuLUbU5dnD8yHEujf6ARcGHKht1wZ-7Mpkd3KzN0U0dbTYxHOGtUAOlKJ4KLMKwXxN4eX8ZZ9f662GLZYU-C8SmCsV0vX2k4wPXJI5IBxyp3Qe9hGjfNGi_" },
              { name: "MC MALIK", origin: "Togo", countryCode: "tg", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZfn95Rns5ClAhkSoAspij6-UeWhRjLlsiD2ecIP43P0HGMhRCKkqK6mvE1ayax5An9vtB9mTmtjre5xq_avdG7ox2k8X2pN-C5QgloEhxkmIx7xgkBGAc_ip2i0WaYJREMa8Ya8l_Yhpz0x7IEudj2cTbJ0ozPG-H-RH5gXyjruOK34lyS7TIxHbl4q50FHapad4Rbc5h4oYoGZI68_O3EofNU9j0m-fZ02Vt6bO28TZL8P2pZJFiNwlD6z12VMWh-lxUO0cTv8hs" }
            ].map((artist) => (
              <div key={artist.name} className="flex gap-4 p-4 border border-white/5 bg-background-dark group hover:border-primary/40 transition-all duration-300">
                <div className="size-20 bg-primary/10 overflow-hidden flex-shrink-0">
                  <img src={artist.img} alt={artist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-heading text-2xl text-white leading-none mb-1">{artist.name}</h4>
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/w40/${artist.countryCode}.png`}
                      alt={artist.origin}
                      className="w-4 h-auto rounded-sm shadow-sm"
                    />
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">{artist.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Team Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-heading text-6xl text-white uppercase leading-none mb-6 tracking-tighter">L’EQUIPE <br/><span className="text-accent-red italic">ORGANISATION</span></h2>
            <p className="text-slate-400 leading-relaxed font-light">
              Derrière le plus grand événement de breaking d'Afrique de l'Ouest, se trouve une équipe passionnée d'activistes culturels et d'experts en événementiel.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-0.5 bg-primary"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">ASBI Togo 2026</span>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            {staffData.map((staff) => (
              <div key={staff.name} className="border-b border-white/10">
                <div 
                  onClick={() => toggleStaff(staff.name)}
                  className="group flex items-center justify-between py-6 hover:bg-white/5 px-4 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="size-16 rounded-full overflow-hidden border border-primary/20 flex-shrink-0">
                      <img 
                        src={staff.image} 
                        alt={staff.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading text-3xl text-white uppercase group-hover:text-primary transition-colors leading-none mb-1">{staff.name}</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{staff.role}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedStaff === staff.name ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedStaff === staff.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 px-24 text-slate-400 text-sm font-light leading-relaxed max-w-xl">
                        {staff.bio}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Judges;
