import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:your.email@example.com', label: 'Email' },
  ]

  return (
    <footer className="bg-card-bg border-t border-text-secondary/10 py-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent-magenta transition-colors duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-text-muted text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <p className="text-text-muted text-xs mt-2">
              Built with React, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
