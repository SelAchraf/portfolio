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
      title: 'Professional Title',
      type: 'string',
      description: 'Your job title (e.g., Full-Stack Developer)',
      validation: Rule => Rule.required()
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
