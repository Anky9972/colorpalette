import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, Eye, Paintbrush, Droplet, Grid, Compass,GalleryHorizontalEnd } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center text-center space-y-4"
    >
      <div className="p-3 bg-purple-100 rounded-full">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Palette,
      title: "Generate Palettes",
      description: "Create beautiful color combinations with our intelligent palette generator."
    },
    {
      icon: Compass,
      title: "Explore Gradients",
      description: "Browse and create stunning gradient combinations for your designs."
    },
    {
      icon: Image,
      title: "Extract from Image",
      description: "Pull color palettes directly from your favorite images."
    },
    {
      icon: Eye,
      title: "Contrast Checker",
      description: "Ensure your color combinations meet accessibility standards."
    },
    {
      icon: Grid,
      title: "Preview Designs",
      description: "See how your palettes look on real design templates."
    },
    {
      icon: Paintbrush,
      title: "Recolor Designs",
      description: "Apply your custom palettes to existing designs instantly."
    },
    {
      icon: Droplet,
      title: "Color Picker",
      description: "Select and save colors from anywhere on your screen."
    },
    {
      icon: GalleryHorizontalEnd,
      title: "Create Collages",
      description: "Build beautiful color collages to showcase your palettes."
    }
  ];
  

  return (
    <section className="py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-5"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-900 mb-4"
          >
            Powerful Color Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to create and manage beautiful color palettes
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;