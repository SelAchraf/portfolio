// Skills Schema
export default {
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Icon or logo for the skill',
      options: {
        hotspot: true
      }
    },
    {
      name: 'percentage',
      title: 'Proficiency Percentage',
      type: 'number',
      description: 'Proficiency level (0-100)',
      validation: Rule => Rule.required().min(0).max(100)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Skill category (e.g., Frontend, Backend, DevOps, Tools)',
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
      percentage: 'percentage'
    },
    prepare(selection) {
      const { title, subtitle, media, percentage } = selection
      return {
        title: title,
        subtitle: `${subtitle} • ${percentage}%`,
        media: media
      }
    }
  }
}
