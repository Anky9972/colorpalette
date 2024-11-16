import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Clock, Globe, Users, FileText, AlertCircle } from 'lucide-react';

// Shared animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Shared Section Component
const Section = ({ title, icon: Icon, children }) => (
  <motion.section 
    variants={itemVariants}
    className="bg-white rounded-lg shadow-md p-6 mb-8"
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-purple-100 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="prose prose-purple max-w-none">
      {children}
    </div>
  </motion.section>
);

// Terms of Service Page
export const TermsOfService = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <Section title="Acceptance of Terms" icon={FileText}>
          <p>By accessing and using Palettes, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </Section>

        <Section title="Use License" icon={Shield}>
          <ul>
            <li>Permission is granted to temporarily download one copy of the materials (information or software) on Palettes for personal, non-commercial transitory viewing only.</li>
            <li>This is the grant of a license, not a transfer of title, and under this license you may not:
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on Palettes</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="User Content" icon={Users}>
          <p>When you create, upload, or share content through our service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute that content in connection with our services.</p>
        </Section>

        <Section title="Limitations" icon={AlertCircle}>
          <p>In no event shall Palettes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Palettes.</p>
        </Section>

        <Section title="Governing Law" icon={Globe}>
          <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </Section>
      </div>
    </motion.div>
  );
};

// Privacy Policy Page
export const PrivacyPolicy = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <Section title="Information We Collect" icon={Eye}>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Profile information</li>
            <li>Your color palettes and designs</li>
            <li>Communications with us</li>
            <li>Usage information and preferences</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information" icon={Lock}>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>
        </Section>

        <Section title="Data Retention" icon={Clock}>
          <p>We retain your information for as long as your account is active or as needed to provide you services. If you wish to cancel your account or request that we no longer use your information, please contact us.</p>
        </Section>

        <Section title="Security" icon={Shield}>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
          <p>However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>
        </Section>

        <Section title="Your Rights" icon={Users}>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to our use of your data</li>
            <li>Request data portability</li>
          </ul>
        </Section>
      </div>
    </motion.div>
  );
};

// Main export for both pages
const LegalPages = {
  TermsOfService,
  PrivacyPolicy
};

export default LegalPages;