import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, ArrowRight, Activity, Map, Globe, Shield, 
  BarChart, Users, CheckCircle, Package
} from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-50 font-body">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-tertiary-50 rounded-full blur-3xl opacity-30" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Next-Gen Disaster Intelligence
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-neutral-900 leading-[1.1] mb-6">
                Precision Response for <br/>
                <span className="text-primary-600">Global Safety.</span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed max-w-2xl mb-10">
                Aegis represents the pinnacle of disaster management technology. We empower rescue teams with real-time predictive analytics, satellite monitoring, and rapid coordination tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary-500/20 transition-all group">
                  Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/map" className="flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 px-8 py-4 rounded-lg font-bold text-lg transition-all">
                  <Map className="w-5 h-5 text-primary-500" /> Live Incident Map
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Proof Section */}
      <section className="py-20 bg-background-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Network Accuracy', val: '99.8%', desc: 'Satellite AI verified precision', icon: Activity, color: 'text-primary-600' },
              { label: 'Active Deployments', val: '1.2k+', desc: 'Operational teams worldwide', icon: Users, color: 'text-tertiary-600' },
              { label: 'Response Time', val: '< 2m', desc: 'Average alert dissemination', icon: CheckCircle, color: 'text-green-600' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-custom"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                <h3 className="text-4xl font-extrabold text-neutral-900 mb-1">{stat.val}</h3>
                <p className="font-heading font-bold text-sm text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm text-neutral-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-6">Built for High-Stakes Operations</h2>
            <p className="text-lg text-neutral-500">Every feature is engineered for reliability, speed, and clarity in the most challenging environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Satellite Heatmaps', text: 'Real-time thermal and water-level sensing directly from orbital nodes.', icon: Globe },
              { title: 'AI Risk Prediction', text: 'Proprietary neural networks forecast hazards with unprecedented multi-hour lead time.', icon: BarChart },
              { title: 'Rapid SOS Protocol', text: 'One-touch emergency broadcasts to decentralized rescue clusters.', icon: ShieldAlert },
              { title: 'Resource Logistics', text: 'Automated tracking of medical supplies, ambulances, and shelter capacity.', icon: Package },
              { title: 'Team Coordination', text: 'Seamless communication across encrypted channels for rescue units.', icon: Users },
              { title: 'Global Resilience', text: 'Designed to scale across borders for unified disaster management.', icon: Shield }
            ].map((feat, i) => (
              <div key={i} className="group">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-xl text-neutral-900 mb-3">{feat.title}</h4>
                <p className="text-neutral-500 leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-neutral-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-8">Integrated Disaster Protection.</h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">Join the institutions relying on Aegis to protect lives and infrastructure.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth" className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl shadow-primary-500/20">
              Get Started for Free
            </Link>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-lg font-bold text-lg transition-all">
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-tertiary-500 p-1.5 rounded-md">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-neutral-900">Aegis Response</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-neutral-500">
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-100 text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} Aegis Response Intelligence Platforms. Built by Persistence Pixel.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
