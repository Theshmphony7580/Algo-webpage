import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Heart, Users, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to create shopping experiences that feel magical.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and privacy are protected with military-grade encryption and best practices.'
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description: 'Every decision we make puts you, our customer, at the center of the experience.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'We optimize every millisecond to deliver instant gratification in your shopping journey.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by shoppers, for shoppers. Your feedback shapes our evolution.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every product is carefully curated to meet our high standards of excellence.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-primary glow-strong" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            About AURA MART
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're reimagining e-commerce for the future. Where artificial intelligence meets 
            elegant design to create shopping experiences that feel personal, intuitive, and extraordinary.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 mb-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            To democratize access to cutting-edge technology and premium products through 
            an AI-powered platform that understands your needs before you do. We believe 
            shopping should be smart, beautiful, and effortless.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-smooth"
                >
                  <value.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Premium Products' },
              { number: '99.9%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-5xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
