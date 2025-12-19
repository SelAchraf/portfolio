// Project Schema for Sanity Studio
// Copy this file to your Sanity studio project

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this project on the home page',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Project category (e.g., Web App, Mobile App, etc.)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, media, featured } = selection
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        media: media
      }
    }
  }
}
