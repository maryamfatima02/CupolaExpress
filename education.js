import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Satellite, Shield, History } from 'lucide-react';

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1d3a] to-[#0a0e27] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-thin mb-6 tracking-wider">
            THE CUPOLA
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
            Earth's Guardian Window
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <motion.div variants={itemVariants}>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images-assets.nasa.gov/image/iss040e027007/iss040e027007~large.jpg" 
                alt="Cupola View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-sm text-cyan-400 mb-1">ISS Cupola Module</p>
                <p className="text-xs text-white/60">NASA Official Image</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6">
            <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-light mb-4">Observatory in Space</h3>
              <p className="text-white/70 leading-relaxed">
                The Cupola is a small module on the International Space Station with seven windows, 
                providing astronauts with a 360-degree view of Earth and space. Installed in 2010, 
                it serves as a crucial observation post for monitoring our planet.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-thin text-center mb-12 tracking-wide"
          >
            Disaster Prediction & Preparation
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Satellite className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-light mb-4">Real-Time Monitoring</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                From the Cupola, astronauts can observe and photograph severe weather systems, 
                wildfires, and natural disasters as they develop. These observations provide 
                crucial data for early warning systems on Earth.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Shield className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-light mb-4">Emergency Response</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                ISS observations have helped coordinate emergency responses during major hurricanes, 
                typhoons, and floods. The unique vantage point allows for tracking storm progression 
                and assessing damage extent in real-time.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <History className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-light mb-4">Historical Impact</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Since 2010, the Cupola has contributed to monitoring over 50 major disasters, 
                including Hurricane Katrina aftermath studies, Australian bushfires, and Asian 
                tsunamis, helping refine prediction models.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12 rounded-3xl border border-cyan-400/20"
        >
          <h2 className="text-3xl font-thin mb-8 text-center tracking-wide">
            The Cupola's Legacy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-cyan-400 text-lg mb-3 font-light">Key Achievements</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Tracked Hurricane Sandy's formation and path in 2012</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Monitored 2019-2020 Australian bushfire season extensively</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Provided critical data during 2011 Japan tsunami</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Documented Saharan dust storms affecting global climate</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 text-lg mb-3 font-light">Future Applications</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Enhanced machine learning for disaster prediction</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Real-time coordination with ground-based systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Climate change impact monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Agricultural and ecosystem health assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}