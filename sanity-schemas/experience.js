// Experience Schema for Sanity Studio
// Copy this file to your Sanity studio project

export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if this is your current position'
    },
    {
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
      description: 'Is this your current position?',
      initialValue: false
    },
    {
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
      isCurrent: 'isCurrent'
    },
    prepare(selection) {
      const { title, subtitle, isCurrent } = selection
      return {
        title: `${title}${isCurrent ? ' (Current)' : ''}`,
        subtitle: subtitle
      }
    }
  }
}
