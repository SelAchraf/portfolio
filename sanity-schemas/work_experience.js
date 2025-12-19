// Work Experience Schema
export default {
  name: 'work_experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Job Title/Role',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country or Remote'
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
      description: 'Leave empty if current position'
    },
    {
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      description: 'Brief overview of the role'
    },
    {
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tech stack used in this role'
    }
  ],
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [
        { field: 'startDate', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
      isCurrent: 'isCurrent',
      startDate: 'startDate'
    },
    prepare(selection) {
      const { title, subtitle, isCurrent, startDate } = selection
      const year = startDate ? new Date(startDate).getFullYear() : ''
      return {
        title: `${title}${isCurrent ? ' (Current)' : ''}`,
        subtitle: `${subtitle} ${year ? `• ${year}` : ''}`
      }
    }
  }
}
