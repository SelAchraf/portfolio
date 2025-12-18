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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
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
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this project on the home page',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
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
