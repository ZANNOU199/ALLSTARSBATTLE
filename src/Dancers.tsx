import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  ChevronDown
} from 'lucide-react';

const dancersData = [
  {
    id: 1,
    name: "B-Boy Alpha",
    origin: "Togo",
    countryCode: "tg",
    style: "Power Moves",
    status: "Champion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPtTjFiuFSihpmxPHHSgIfOvV9FYa16rTWDNocl90ICq2Pj4m8883_bGB7Rlq6LZydsHPFp8JJ0Pku-6O5-5KtmJSGcLS0C21O316tTSN2j8EegB2oCtAgJKvZJ4zxoZkPEqLkFpDcQfsmBlJrEbsROiFkq2rTBiiMYfv-QAmMglGbMxLqfJD_LhTP0uJh9jvHSvyiRQsBn7Up0Tmxa_cym0Xo-fOyd8AbUylS_ytS1qIgTHxTHUxQkkXwqHA29_MesHRBksJ8wONs",
    category: "B-Boy"
  },
  {
    id: 2,
    name: "B-Girl Sora",
    origin: "Bénin",
    countryCode: "bj",
    style: "Footwork",
    status: "Qualifier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQKaRo8aE-yzylqJB_3b15EQWkd6H2-sv_2lxclbORyZqB_0HW4uwSt3NvYq9p3PmDZPfVlYgLw1tNghI3akGzTjS5NcJfJlqFCLdCdRVSD7yoKHzSTXeseTIG7TVKeTnEvjawHqFs95YjX1ONLnFWlTIrBBBnSWZNf44h9iSv-y3uNwd-LeWeaFzsZuZQjxiFCS5W-edu9PRpHby8Dv0J4U1423HOhBa_PYRFFg6lkREsnT0vgsCNQ20-9ZjJ0N-N5nAgyyA7kyTX",
    category: "B-Girl"
  },
  {
    id: 3,
    name: "Crew Unity",
    origin: "France",
    countryCode: "fr",
    style: "All Styles",
    status: "Champion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYoBw1xgq95WiVuY8fLzMBoz6J6RFRaxHWVJfdJ8tunVU6SfJatGSorBeey5vyRy9Re8bFHI36-xJUBiK5Q3HdqHLe-WUpXE6GnBMOChjHHQtDDJP3w1j2yFg_q-K-2MRUiybV0ODFSKu32pi4CUKcYYpkBt6MTxDRHFwUtBvdnQM_efm04Mc1KDx8pYX2uj6J1Z2TjCtV0mD8Db4jO1_DD2axOIPsKtJmNxBRdEAlIOvLvmsL6kYI3gblAoDVbZh0t6v6LOIEwgr3",
    category: "Crew"
  },
  {
    id: 4,
    name: "B-Boy Flex",
    origin: "Sénégal",
    countryCode: "sn",
    style: "Tricks",
    status: "Qualifier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARISS-OwMF2J2Gj-u8HodfFNdtYI2tLTtvAdgYnSkn_TTLBJrdg6JM7r0oRBBXlhmfZzeFG7yZTKXlb-6-kppJ-Eb1vG_T3BaY49soT_IVrpo3rT-jLcYQu_GoCEtdf9sacz-TYWEaT6sA62jsgR_JHcGgKBVOeu0mmFbCxOkXsVvTrn0gc1EMTOceZLSPikUwEjDTAo_sCzysPYm84mE5RJsFtpJCcwAfbsJBppOgyjPaPBl9KhcHNLHYt1Ar2MdbQGMV0CXf9AKt",
    category: "B-Boy"
  },
  {
    id: 5,
    name: "B-Girl Luna",
    origin: "Ghana",
    countryCode: "gh",
    style: "Toprock",
    status: "Champion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIq6_t_GqQ1EumelgllFAq4VzViM0KnjWTi_Lqv_dXauiJWH7nWMkjTF1BhQ75NeTguYzOhmfW09QvVnSh-eas0bNRDSkIt2sZgiW3pL_WfjZJPSL3fTUCYpmhfHCnopau4sXSMp4atNM8V1qOXe0ZbfrAMvB8R0gUX9-AN--nXwBdrr3l-ISYSmJxOmP31pPpPWOgueIZ7vKHiCYDFZU8sLiOI-rMKhOWDXwQ545_M_xyDeoVMma0qevxKpLA2XhSqBsFZu0i7LbH",
    category: "B-Girl"
  },
  {
    id: 6,
    name: "Crew Elite",
    origin: "USA",
    countryCode: "us",
    style: "Choreography",
    status: "Qualifier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy-zj0KvAqe08OZxJddXkM6EM6_rfk_MCZPec39NuAiRRakzhPoctlBcYKJaRGJ7GceRZ_ZSnDrL3lk5pcN3l1zFLLDEFtkUkWdzX22kipqmIbePanx1EsEEsi6aQgz5e1_HKpKY1IDeNqFiyb-SQHvZX1FMg4JW8-tHWEKGZHyM0ikDkWzNVLeya3l3rppykSlpOhKZpSwkPznBsXxuyhIJ1R9-MMU-gY0loss7jm_0sm23XZu2WC1pgj5V4xNHJZHzH42mHX8Asj",
    category: "Crew"
  },
  {
    id: 7,
    name: "B-Boy Shadow",
    origin: "Nigéria",
    countryCode: "ng",
    style: "Abstract",
    status: "Qualifier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOCQaUlf94ROduzlo4XAH2txj7uIeXuqLSf7s7CEdrU5XYNu_fARNpwvvlawCl46_4sMXIedPGWAlFbRlVV6mhIA2A2QJjvs3yfSQdKp50nBJsuq1TxbkXZQqK-D0G9fjVxu0HGVEmh_CD2dgT8njTdOjN8M4Yzba1cRKVc71xIYpaDlQH9Ia-K-peJ0C_7Yx4iVDdAWRo2I8nCK0UU4BwdYIKFp9IKYjqizioVe_FEI_DOmMjmfrFX2xjlOvFOEVePfErlvXBeCTw",
    category: "B-Boy"
  },
  {
    id: 8,
    name: "B-Girl Jade",
    origin: "Japon",
    countryCode: "jp",
    style: "Flow",
    status: "Qualifier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtLd3_h2KPF0jvN-d23si5w3Fp16z5bQFs_5BnZN1gJejl4-esU3N2GD5slZibXIpjNh7lV-5671nkVjONMLQY2rxE_I0ukd2auLcJ6b8tQWgtmxELQthOhe3Sy4OCYUpv4agMK8xc_QVdibfwfSzyMbfy54pflaZR86z9AnqeueLq_EGLM_y9hMy9XJpQqZv3HMjIUPzEaxTUIavemdUAjWZsnh6e6USdHy-_VsPQqY_39Q6GCCN20m6bxB4kWs0yaun8pOV44C71",
    category: "B-Girl"
  }
];

const Dancers = () => {
  const [filter, setFilter] = useState('All');

  const filteredDancers = filter === 'All' 
    ? dancersData 
    : dancersData.filter(d => d.category === filter);

  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 urban-texture" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)), url('https://picsum.photos/seed/dancers/1920/1080')` 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-6xl sm:text-7xl md:text-9xl gold-gradient-text tracking-tighter leading-none mb-6 drop-shadow-2xl uppercase"
          >
            LES DANSEURS STARS
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative py-6 px-4 md:px-12 border-y border-white/30 backdrop-blur-md bg-black/20">
              <p className="text-sm sm:text-lg md:text-2xl text-white font-medium uppercase tracking-[0.15em] md:tracking-[0.25em] leading-relaxed">
                L'élite de la danse urbaine réunie pour la bataille ultime en Afrique de l'Ouest.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-10">
          <ChevronDown className="text-4xl text-primary" />
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-surface-dark/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
              <span className="text-primary/50 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Filtrer par :</span>
              {['All', 'B-Boy', 'B-Girl', 'Crew'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === cat 
                      ? 'bg-primary text-background-dark shadow-[0_0_20px_rgba(244,209,37,0.3)]' 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="RECHERCHER UN DANSEUR..." 
                className="w-full bg-background-dark/50 border border-white/10 rounded-full py-3 pl-12 pr-6 text-[10px] uppercase tracking-widest text-white focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dancers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDancers.map((dancer, index) => (
            <motion.div
              key={dancer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-surface-dark border border-white/5 p-4 rounded-xl overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10 opacity-60"></div>
                <img 
                  src={dancer.image} 
                  alt={dancer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest ${
                  dancer.status === 'Champion' ? 'bg-primary text-background-dark' : 'bg-white/20 backdrop-blur-md text-white'
                }`}>
                  {dancer.status}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-heading text-3xl text-white group-hover:text-primary transition-colors leading-none">{dancer.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src={`https://flagcdn.com/w40/${dancer.countryCode}.png`}
                    alt={dancer.origin}
                    className="w-5 h-auto rounded-sm shadow-sm"
                  />
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{dancer.origin}</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Style</span>
                  <span className="text-xs text-white font-bold uppercase tracking-widest">{dancer.style}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dancers;
