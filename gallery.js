import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Camera } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const cupolaImages = [
    { url: './images/cupola-inner.jpg', title: 'Cupola Interior View', description: "The iconic seven-windowed observatory module on the ISS" },
    { url: './images/earths-horizon.jpg', title: "Earth's Horizon", description: "Stunning view of Earth's curvature and atmosphere from the Cupola" },
    { url: './images/cupola-sunset.jpg', title: 'Cupola Sunset', description: 'Sunset scenes from orbit' },
    { url: './images/interior-view.jpg', title: 'Interior View', description: 'Module interior and observation station' },
    { url: './images/nanoracks-cupola.jpg', title: 'Nanoracks Cupola', description: 'Commercial research at the window' },
    { url: './images/ISS-training.jpg', title: 'ISS Training', description: 'Astronaut training and preparation' },
    { url: './images/flood.jpg', title: 'Floods', description: 'From space: Floodwaters turn land unusually dark or blue, expanding beyond normal riverbanks seen in pre-event images. Space imagery quickly outlines the true size of affected areas, even when clouds obscure the ground. Key features: Large swaths of darkened or shimmering area, water pooled in fields and urban landscapes.' },
    { url: './images/sandstorm.jpg', title: 'Sandstorm', description: 'From space: Massive sand or dust storms appear as tan or yellowish clouds moving across continents. These plumes can be traced from their origin (like the Sahara) as they travel thousands of kilometers, sometimes crossing oceans. Key features: Thick, billowing clouds of dust, often obscuring the surface below, moving in distinct fronts or swirls.' },
    { url: './images/wildfire.jpg', title: 'Wildfires', description: 'From space: Wildfires show up as bright orange/red hotspots using thermal sensors, while thick brown or gray smoke plumes often stretch for hundreds of kilometers. Burn scars appear as dark patches contrasting with surrounding land. Key features: Long smoke trails, rapid expansion, thermal signatures even through clouds.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1d3a] to-[#0a0e27] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl md:text-7xl font-thin tracking-wider">
              CUPOLA GALLERY
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
            Breathtaking views captured from humanity's window to the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {cupolaImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-light mb-2">{image.title}</h3>
                <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/20 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-400/20"
        >
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto">
            All images are official NASA photography captured from the International Space Station's Cupola module.
            The Cupola provides astronauts with a 360-degree view for Earth observation and scientific research.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-cyan-400 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span>Source: NASA Image Library</span>
          </div>
        </motion.div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full"
          >
            <div className="relative">
              <img 
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                <h2 className="text-3xl font-light mb-2">{selectedImage.title}</h2>
                <p className="text-white/70">{selectedImage.description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}