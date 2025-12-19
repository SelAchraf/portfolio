import { FiGithub, FiLinkedin, FiInstagram, FiFacebook, FiSend } from 'react-icons/fi'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { useSanityData } from '../hooks/useSanityData'
import { fetchProfile } from '../lib/sanity'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: profileData } = useSanityData(fetchProfile)

  const socialLinks = [
    { 
      icon: FiGithub, 
      href: profileData?.socialLinks?.github, 
      label: 'GitHub',
      show: !!profileData?.socialLinks?.github
    },
    { 
      icon: FiLinkedin, 
      href: profileData?.socialLinks?.linkedin, 
      label: 'LinkedIn',
      show: !!profileData?.socialLinks?.linkedin
    },
    { 
      icon: FaTelegram, 
      href: profileData?.socialLinks?.telegram, 
      label: 'Telegram',
      show: !!profileData?.socialLinks?.telegram
    },
    { 
      icon: FaWhatsapp, 
      href: profileData?.socialLinks?.whatsapp, 
      label: 'WhatsApp',
      show: !!profileData?.socialLinks?.whatsapp
    },
    { 
      icon: FiInstagram, 
      href: profileData?.socialLinks?.instagram, 
      label: 'Instagram',
      show: !!profileData?.socialLinks?.instagram
    },
    { 
      icon: FiFacebook, 
      href: profileData?.socialLinks?.facebook, 
      label: 'Facebook',
      show: !!profileData?.socialLinks?.facebook
    },
  ]

  return (
    <footer className="bg-card-bg border-t border-text-secondary/10 py-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.filter(link => link.show).map((link) => (
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
              © {currentYear} {profileData?.fullName || 'Your Name'}. All rights reserved.
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
