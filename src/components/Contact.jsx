import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { useSanityData } from '../hooks/useSanityData'
import { fetchAbout } from '../lib/sanity'

const Contact = () => {
  const { data: aboutData } = useSanityData(fetchAbout)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">Get In Touch</h2>
          <p className="section-subtitle text-center mb-12">
            Have a question or want to work together?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Email */}
            {aboutData?.socialLinks?.email && (
              <motion.a
                href={`mailto:${aboutData.socialLinks.email}`}
                variants={itemVariants}
                className="group bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta transition-all duration-300 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-accent-magenta/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-magenta/30 transition-colors">
                  <FiMail className="w-6 h-6 text-accent-magenta" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Email</h3>
                <p className="text-text-muted text-sm break-all">{aboutData.socialLinks.email}</p>
              </motion.a>
            )}

            {/* GitHub */}
            {aboutData?.socialLinks?.github && (
              <motion.a
                href={aboutData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-gold transition-all duration-300 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/30 transition-colors">
                  <FiMapPin className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">GitHub</h3>
                <p className="text-text-muted text-sm">View my repositories</p>
              </motion.a>
            )}

            {/* LinkedIn */}
            {aboutData?.socialLinks?.linkedin && (
              <motion.a
                href={aboutData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta transition-all duration-300 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-accent-magenta/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-magenta/30 transition-colors">
                  <FiPhone className="w-6 h-6 text-accent-magenta" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">LinkedIn</h3>
                <p className="text-text-muted text-sm">Connect professionally</p>
              </motion.a>
            )}
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-accent-magenta/10 to-accent-gold/10 border border-accent-magenta/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            {aboutData?.socialLinks?.email && (
              <motion.a
                href={`mailto:${aboutData.socialLinks.email}`}
                className="btn-primary inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Me an Email
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
