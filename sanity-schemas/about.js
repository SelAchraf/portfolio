// About Schema for Sanity Studio
// Copy this file to your Sanity studio project

export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Your full name',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'Your job title or profession (e.g., Full-Stack Developer)',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Your professional biography and background',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'A brief bio for the hero section (2-3 sentences)',
      validation: Rule => Rule.required().max(300)
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      description: 'Your professional photo',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Skill category (e.g., Frontend, Backend, Tools)',
              validation: Rule => Rule.required()
            },
            {
              name: 'items',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of skills in this category',
              validation: Rule => Rule.required().min(1)
            }
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'items'
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: subtitle ? `${subtitle.length} skills` : 'No skills'
              }
            }
          }
        }
      ],
      description: 'Your technical skills organized by category'
    },
    {
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'City, Country or "Remote"'
            },
            {
              name: 'period',
              title: 'Time Period',
              type: 'string',
              description: 'e.g., "Jan 2020 - Present" or "2019 - 2021"',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'What you did in this role'
            },
            {
              name: 'achievements',
              title: 'Key Achievements',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Bullet points of your achievements'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'company',
              period: 'period'
            },
            prepare(selection) {
              const { title, subtitle, period } = selection
              return {
                title: title,
                subtitle: `${subtitle} (${period})`
              }
            }
          }
        }
      ]
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Graduation year or period',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Additional details (optional)'
            }
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution',
              year: 'year'
            },
            prepare(selection) {
              const { title, subtitle, year } = selection
              return {
                title: title,
                subtitle: `${subtitle} (${year})`
              }
            }
          }
        }
      ]
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'date',
              title: 'Date Obtained',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'credentialUrl',
              title: 'Credential URL',
              type: 'url',
              description: 'Link to verify the certification'
            }
          ]
        }
      ]
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      description: 'Upload your resume as a PDF',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
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
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
}
