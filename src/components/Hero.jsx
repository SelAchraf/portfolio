import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import { useSanityData } from '../hooks/useSanityData'
import { fetchProfile, urlFor } from '../lib/sanity'

const Hero = () => {
  const { data: profileData, loading } = useSanityData(fetchProfile)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const handleScrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-accent-gold text-lg md:text-xl font-medium">
              Hi, my name is
            </span>
          </motion.div>

          {/* Profile Image */}
          {profileData?.profileImage && (
            <motion.div variants={itemVariants} className="mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-accent-magenta/30 shadow-xl">
                <img 
                  src={urlFor(profileData.profileImage).width(300).height(300).url()} 
                  alt={profileData.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-4"
          >
            <span className="gradient-text">
              {loading ? 'Loading...' : profileData?.fullName || 'Your Name'}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-secondary mb-6"
          >
            {loading ? 'Loading...' : profileData?.professionalTitle || 'Full-Stack Developer'}
          </motion.h2>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {loading 
              ? 'Loading your story...' 
              : profileData?.bio || 'I build exceptional digital experiences that live on the web. Specialized in creating beautiful, functional, and user-centric applications with modern technologies.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={handleScrollToProjects}
              className="btn-primary w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={handleScrollToContact}
              className="btn-secondary w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
            {profileData?.resumeUrl && (
              <motion.a
                href={profileData.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full sm:w-auto flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-4 h-4" />
                Resume
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center cursor-pointer"
          onClick={handleScrollToProjects}
        >
          <span className="text-text-muted text-sm mb-2">Scroll Down</span>
          <FiArrowDown className="w-6 h-6 text-accent-magenta" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
