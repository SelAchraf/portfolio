// Profile Schema for Sanity Studio
// Copy this file to your Sanity studio project

export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'resume',
      title: 'Resume',
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
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortBio'
    }
  }
}
