import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLoader, FiFolder } from 'react-icons/fi'
import { useSanityData } from '../hooks/useSanityData'
import { fetchProjects, urlFor } from '../lib/sanity'
import { useState } from 'react'
import Marquee from 'react-fast-marquee'

const Projects = () => {
  const { data: projects, loading, error } = useSanityData(fetchProjects)

  // Group projects by category
  const groupedProjects = projects?.reduce((acc, project) => {
    const category = project.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {})

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
          <h2 className="section-title text-center" style={{ lineHeight: '1.2' }}>Projects</h2>
          <p className="section-subtitle text-center mb-12">
            Some of the projects I've worked on
          </p>
        </motion.div>

        {/* Projects Grouped by Category */}
        <div className="space-y-16">
          {groupedProjects && Object.entries(groupedProjects).map(([category, categoryProjects], categoryIndex) => {
            // Calculate if animation is needed (more than 3 projects means it exceeds one line)
            const needsAnimation = categoryProjects.length > 3
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Category Header */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-magenta/10 to-transparent rounded-lg border-l-4 border-accent-magenta">
                    <FiFolder className="w-5 h-5 text-accent-magenta" />
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                      {category}
                    </h3>
                    <span className="text-sm font-medium text-accent-magenta/70 ml-2">
                      {categoryProjects.length} {categoryProjects.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>
                </div>

                {/* Projects Display */}
                {needsAnimation ? (
                  /* Animated Horizontal Scroll for many projects */
                  <Marquee
                    speed={100}
                    gradient={false}
                    pauseOnHover={true}
                    direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
                    className="pb-4"
                  >
                    {categoryProjects.map((project) => (
                      <div key={project._id} className="flex-shrink-0 w-[350px] mx-3">
                        <ProjectCard 
                          project={project} 
                          itemVariants={itemVariants}
                        />
                      </div>
                    ))}
                  </Marquee>
                ) : (
                  /* Static Grid for few projects */
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {categoryProjects.map((project) => (
                      <ProjectCard 
                        key={project._id} 
                        project={project} 
                        itemVariants={itemVariants}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, itemVariants }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageUrl = project.images && project.images.length > 0 
    ? urlFor(project.images[currentImageIndex]).width(800).height(600).url() 
    : null
  const hasMultipleImages = project.images && project.images.length > 1

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
    >
      <motion.div
        className="group relative bg-card-bg border border-text-secondary/20 rounded-xl overflow-hidden hover:border-accent-magenta transition-all duration-300 h-full flex flex-col"
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
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-magenta transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <div className="text-text-muted text-sm mb-4 line-clamp-3 flex-1">
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
      </motion.div>
    )
  }

export default Projects
