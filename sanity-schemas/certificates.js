// Certificates Schema
export default {
  name: 'certificates',
  title: 'Certificates',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'issuer',
      title: 'Issued By',
      type: 'string',
      description: 'Organization or institution',
      validation: Rule => Rule.required()
    },
    {
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave empty if certificate does not expire'
    },
    {
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the certificate'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of what this certificate covers'
    },
    {
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      description: 'Image of the certificate or badge',
      options: {
        hotspot: true
      }
    },
    {
      name: 'skills',
      title: 'Related Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Skills learned or demonstrated'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display prominently',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Issue Date, Newest',
      name: 'issueDateDesc',
      by: [
        { field: 'issueDate', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'image',
      featured: 'featured',
      issueDate: 'issueDate'
    },
    prepare(selection) {
      const { title, subtitle, media, featured, issueDate } = selection
      const year = issueDate ? new Date(issueDate).getFullYear() : ''
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${subtitle} ${year ? `• ${year}` : ''}`,
        media: media
      }
    }
  }
}
