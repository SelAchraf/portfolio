// Profile Schema - Main personal information
export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'professionalTitle',
      title: 'Professional Titles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Your job titles (e.g., Full-Stack Developer, UI/UX Designer). They will rotate in the hero section.',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Professional biography',
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'resume',
      title: 'Resume/CV',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'telegram',
          title: 'Telegram',
          type: 'url'
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'professionalTitle',
      media: 'image'
    }
  }
}
