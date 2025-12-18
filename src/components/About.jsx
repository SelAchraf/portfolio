import { motion } from 'framer-motion'
import { FiLoader, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { useSanityMultiData } from '../hooks/useSanityData'
import { fetchAbout, fetchExperience, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

const About = () => {
  const { data, loading, error } = useSanityMultiData([fetchAbout, fetchExperience])
  const [aboutData, experienceData] = data

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
              {error || 'Failed to load about data. Please check your Sanity configuration.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">About Me</h2>
          <p className="section-subtitle text-center mb-16">
            Get to know me better
          </p>
        </motion.div>

        {/* About Content */}
        {aboutData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          >
            {/* Profile Image & Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              {aboutData.image && (
                <div className="relative w-full max-w-md mx-auto lg:mx-0">
                  <div className="aspect-square rounded-2xl overflow-hidden border-4 border-accent-magenta/30">
                    <img
                      src={urlFor(aboutData.image).width(600).height(600).url()}
                      alt={aboutData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -z-10 top-8 left-8 w-full h-full rounded-2xl bg-accent-magenta/10" />
                </div>
              )}

              <div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{aboutData.name}</h3>
                <p className="text-xl text-accent-gold mb-4">{aboutData.title}</p>
                {aboutData.shortBio && (
                  <p className="text-text-muted leading-relaxed">{aboutData.shortBio}</p>
                )}
              </div>
            </motion.div>

            {/* Full Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              {aboutData.bio && (
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText value={aboutData.bio} />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Skills Section */}
        {aboutData && aboutData.skills && aboutData.skills.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-center mb-10"
            >
              Skills & Technologies
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutData.skills.map((skillCategory, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta transition-colors duration-300"
                >
                  <h4 className="text-lg font-semibold text-accent-gold mb-4">
                    {skillCategory.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-card-bg-hover text-text-secondary text-sm rounded-lg border border-text-secondary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Experience Timeline */}
        {experienceData && experienceData.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-center mb-10"
            >
              Work Experience
            </motion.h3>

            <div className="max-w-4xl mx-auto">
              {experienceData.map((exp, index) => (
                <ExperienceItem
                  key={exp._id}
                  experience={exp}
                  index={index}
                  itemVariants={itemVariants}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

const ExperienceItem = ({ experience, index, itemVariants }) => {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      variants={itemVariants}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-magenta via-accent-gold to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 -translate-x-[5.5px] rounded-full bg-accent-magenta border-4 border-charcoal" />

      {/* Content */}
      <div className="bg-card-bg border border-text-secondary/20 rounded-xl p-6 hover:border-accent-magenta transition-all duration-300 hover:shadow-lg hover:shadow-accent-magenta/10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h4 className="text-xl font-bold text-text-primary mb-1">
              {experience.role}
            </h4>
            <p className="text-accent-gold font-medium">{experience.company}</p>
          </div>
          {experience.isCurrent && (
            <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold text-sm font-semibold rounded-full border border-accent-gold/30">
              Current
            </span>
          )}
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
          <FiCalendar className="w-4 h-4" />
          <span>
            {formatDate(experience.startDate)} - {' '}
            {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
          </span>
        </div>

        {/* Responsibilities */}
        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <ul className="space-y-2">
            {experience.responsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex items-start gap-2 text-text-muted">
                <FiCheckCircle className="w-4 h-4 text-accent-magenta mt-1 flex-shrink-0" />
                <span className="text-sm">{responsibility}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default About
