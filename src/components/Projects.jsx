import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLoader, FiFolder } from 'react-icons/fi'
import { useSanityData } from '../hooks/useSanityData'
import { fetchProjects, urlFor } from '../lib/sanity'
import { useState } from 'react'

const Projects = () => {
  const { data: projects, loading, error } = useSanityData(fetchProjects)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="section bg-soft-charcoal">
        <div className="container-custom">
          <h2 className="section-title text-center">Featured Projects</h2>
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
      <section id="projects" className="section bg-soft-charcoal">
        <div className="container-custom">
          <h2 className="section-title text-center">Featured Projects</h2>
          <div className="text-center py-20">
            <p className="text-text-muted">
              {error || 'Failed to load projects. Please check your Sanity configuration.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // No projects state
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="section bg-soft-charcoal">
        <div className="container-custom">
          <h2 className="section-title text-center">Featured Projects</h2>
          <div className="text-center py-20">
            <p className="text-text-muted">
              No projects yet. Add some projects in your Sanity Studio!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section bg-soft-charcoal">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">Projects</h2>
          <p className="section-subtitle text-center mb-12">
            Some of the projects I've worked on
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-magenta/30 transform md:-translate-x-1/2" />
            
            {projects.map((project, index) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                itemVariants={itemVariants}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, itemVariants, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageUrl = project.images && project.images.length > 0 
    ? urlFor(project.images[currentImageIndex]).width(800).height(600).url() 
    : null
  const hasMultipleImages = project.images && project.images.length > 1

  // Alternate sides for desktop
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={itemVariants}
      className={`relative mb-12 md:mb-16 ${
        isLeft ? 'md:pr-1/2' : 'md:pl-1/2'
      }`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-4 h-4 bg-accent-magenta rounded-full border-4 border-soft-charcoal z-10"
        />
      </div>

      {/* Project Card */}
      <div className={`ml-8 md:ml-0 ${
        isLeft ? 'md:mr-12' : 'md:ml-12'
      }`}>
        <motion.div
          className="group relative bg-card-bg border border-text-secondary/20 rounded-xl overflow-hidden hover:border-accent-magenta transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold text-xs font-semibold rounded-full border border-accent-gold/30">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          {project.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-accent-magenta/20 text-accent-magenta text-xs font-semibold rounded-full border border-accent-magenta/30 flex items-center gap-1">
                <FiFolder className="w-3 h-3" />
                {project.category}
              </span>
            </div>
          )}

          {/* Project Image with Navigation */}
          <div className="relative h-48 bg-card-bg-hover overflow-hidden">
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Image Navigation */}
                {hasMultipleImages && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex 
                            ? 'bg-accent-magenta w-6' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <span>No Image</span>
              </div>
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Project Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-magenta transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <div className="text-text-muted text-sm mb-4 line-clamp-3">
              <p>{project.description || 'No description available'}</p>
            </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-card-bg-hover text-accent-magenta text-xs font-medium rounded border border-accent-magenta/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-text-muted text-xs">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action Links */}
        <div className="flex gap-3 pt-4 border-t border-text-secondary/20">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-magenta transition-colors duration-300"
            >
              <FiGithub className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
        </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
  )
}

export default Projects
