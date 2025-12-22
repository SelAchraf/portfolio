import { motion, AnimatePresence } from 'framer-motion'
import { FiLoader, FiCalendar, FiCheckCircle, FiMapPin, FiAward, FiExternalLink, FiBriefcase, FiCode } from 'react-icons/fi'
import { useSanityMultiData } from '../hooks/useSanityData'
import { fetchWorkExperience, fetchSkills, fetchCertificates, urlFor } from '../lib/sanity'
import { useState, useEffect } from 'react'

const About = () => {
  const { data, loading, error } = useSanityMultiData([fetchWorkExperience, fetchSkills, fetchCertificates])
  const [workExperience, skillsData, certificates] = data
  const [activeTab, setActiveTab] = useState('experience')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const tabs = [
    { id: 'skills', label: 'Skills', icon: FiCode, count: skillsData?.length || 0 },
    { id: 'experience', label: 'Work Experience', icon: FiBriefcase, count: workExperience?.length || 0 },
    { id: 'certificates', label: 'Certificates', icon: FiAward, count: certificates?.length || 0 },
  ]

  // Animation variants
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

  // Loading state
  if (loading) {
    return (
      <section id="about" className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">About Me</h2>
          <div className="flex justify-center items-center py-20">
            <FiLoader className="w-12 h-12 text-accent-magenta animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section id="about" className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">About Me</h2>
          <div className="text-center py-20">
            <p className="text-text-muted">
              {error || 'Failed to load data. Please check your Sanity configuration.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Group skills by category
  const skillsByCategory = skillsData?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="about" className="section overflow-x-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">About Me</h2>
          <p className="section-subtitle text-center mb-12">
            Explore my professional journey
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-card-bg border border-text-secondary/20 rounded-2xl p-2 flex flex-wrap gap-2 justify-center backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                    isActive
                      ? 'text-white shadow-xl'
                      : 'text-text-secondary hover:text-text-primary hover:bg-card-bg-hover'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background for active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-accent-magenta via-accent-gold to-accent-magenta bg-[length:200%_100%]"
                      transition={{ type: 'tween', duration: 0.6 }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                      }}
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-3">
                    <motion.div
                      animate={isActive ? { 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-lg' : ''}`} />
                    </motion.div>
                    
                    <span className="relative">{tab.label}</span>
                    
                    {tab.count > 0 && (
                      <motion.span 
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive
                            ? 'bg-white/30 text-white backdrop-blur-sm'
                            : 'bg-accent-magenta/20 text-accent-magenta'
                        }`}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {tab.count}
                      </motion.span>
                    )}
                  </div>
                  
                  {/* Shine effect on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'linear',
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'skills' && (
            <SkillsContent 
              key="skills" 
              skillsByCategory={skillsByCategory} 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceContent 
              key="experience" 
              workExperience={workExperience} 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              isMobile={isMobile}
            />
          )}
          {activeTab === 'certificates' && (
            <CertificatesContent 
              key="certificates" 
              certificates={certificates} 
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Skills Content Component
const SkillsContent = ({ skillsByCategory, containerVariants, itemVariants }) => {
  if (!skillsByCategory || Object.keys(skillsByCategory).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <p className="text-text-muted">No skills data available</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <motion.div
          key={category}
          variants={itemVariants}
          className="bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta transition-all duration-300"
        >
          <h4 className="text-lg font-semibold text-accent-gold mb-6">{category}</h4>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill._id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {skill.logo && (
                      <img
                        src={urlFor(skill.logo).width(32).height(32).url()}
                        alt={skill.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <span className="text-text-secondary font-medium">{skill.name}</span>
                  </div>
                  <span className="text-accent-magenta font-semibold">{skill.percentage}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-card-bg-hover rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-accent-magenta to-accent-gold rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Experience Content Component
const ExperienceContent = ({ workExperience, containerVariants, itemVariants, isMobile }) => {
  if (!workExperience || workExperience.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <p className="text-text-muted">No work experience data available</p>
      </motion.div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "tween", duration: 0.4 }}
      className="max-w-6xl mx-auto relative pb-12"
    >
      {/* Center Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-accent-magenta via-accent-gold to-transparent -translate-x-1/2" />
      
      {workExperience.map((exp, index) => {
        const isLeft = index % 2 === 0
        // Mobile: always from right (50), Desktop: from respective sides
        const badgeInitialX = isMobile ? 50 : (isLeft ? 80 : -80)
        const cardInitialX = isMobile ? 50 : (isLeft ? -80 : 80)
        
        return (
          <div
            key={exp._id}
            className={`relative pb-12 last:pb-0 md:w-1/2 ${
              isLeft ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'
            }`}
          >
            {/* Timeline Dot - Static, no animation */}
            <div 
              className={`absolute top-2 w-4 h-4 rounded-full bg-accent-magenta border-4 border-bg-primary ring-2 ring-accent-magenta/20 z-10 left-0 ${
                isLeft 
                  ? 'md:right-0 md:left-auto md:translate-x-1/2' 
                  : 'md:left-0 md:-translate-x-1/2'
              }`}
            />

            {/* Mobile Timeline Line */}
            {index !== workExperience.length - 1 && (
              <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-magenta via-accent-gold to-transparent" />
            )}

            {/* Date Badge - Animates from its side */}
            <motion.div 
              initial={{ opacity: 0, x: badgeInitialX }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: badgeInitialX }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
              className={`ml-8 md:ml-0 md:absolute md:top-0 ${
                isLeft 
                  ? 'md:right-[-14rem]' 
                  : 'md:left-[-15rem]'
              } mb-4 md:mb-0`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-magenta/10 to-accent-gold/10 rounded-lg border border-accent-magenta/20 whitespace-nowrap">
                <FiCalendar className="w-4 h-4 text-accent-magenta flex-shrink-0" />
                <span className="text-sm font-semibold text-accent-magenta">
                  {formatDate(exp.startDate)}
                </span>
                <span className="text-xs text-text-muted">→</span>
                <span className="text-sm font-semibold text-accent-gold">
                  {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
            </motion.div>

            {/* Content Card - Animates from its side */}
            <motion.div 
              initial={{ opacity: 0, x: cardInitialX }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: cardInitialX }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
              className={`ml-8 md:ml-0 bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta hover:shadow-lg hover:shadow-accent-magenta/10 transition-all duration-300`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-text-primary mb-1">{exp.role}</h4>
                  <p className="text-accent-gold font-medium text-lg">{exp.company}</p>
                  {exp.location && (
                    <div className="flex items-center gap-2 text-text-muted text-sm mt-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
                {exp.isCurrent && (
                  <span className="px-4 py-1.5 bg-accent-gold/20 text-accent-gold text-sm font-semibold rounded-full border border-accent-gold/30">
                    Current
                  </span>
                )}
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-text-muted mb-4 leading-relaxed">{exp.description}</p>
              )}

              {/* Responsibilities */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-text-secondary mb-3">Key Responsibilities:</h5>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-muted">
                        <FiCheckCircle className="w-4 h-4 text-accent-magenta mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-text-secondary/10">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-card-bg-hover text-accent-magenta text-xs font-medium rounded-lg border border-accent-magenta/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}

// Certificates Content Component
const CertificatesContent = ({ certificates, containerVariants, itemVariants }) => {
  if (!certificates || certificates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <p className="text-text-muted">No certificates data available</p>
      </motion.div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {certificates.map((cert) => {
        const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date()

        return (
          <motion.div
            key={cert._id}
            variants={itemVariants}
            className="bg-card-bg border border-text-secondary/20 rounded-xl overflow-hidden hover:border-accent-magenta transition-all duration-300"
          >
            {cert.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={urlFor(cert.image).width(400).height(300).url()}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
                {cert.featured && (
                  <div className="absolute top-2 right-2 bg-accent-gold text-deep-black px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-text-primary">{cert.title}</h4>
                <FiAward className="w-5 h-5 text-accent-magenta flex-shrink-0" />
              </div>

              <p className="text-accent-gold font-medium mb-2">{cert.issuer}</p>

              <div className="text-text-muted text-sm mb-3">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>
                    {formatDate(cert.issueDate)}
                    {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                  </span>
                </div>
                {isExpired && (
                  <span className="text-red-400 text-xs mt-1 inline-block">Expired</span>
                )}
              </div>

              {cert.description && (
                <p className="text-text-muted text-sm mb-4 line-clamp-3">{cert.description}</p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-card-bg-hover text-text-secondary text-xs rounded border border-text-secondary/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 text-text-muted text-xs">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-magenta hover:text-accent-gold text-sm transition-colors"
                >
                  <span>View Credential</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default About
