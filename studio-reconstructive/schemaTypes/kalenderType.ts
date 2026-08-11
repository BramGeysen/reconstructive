import {defineField, defineType} from 'sanity'

export const kalenderType = defineType({
  name: 'kalender',
  title: 'Kalender',
  type: 'document',
  fields: [
    defineField({
      title: 'Datum title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Voor bij je construct', value: 'Voorbij je construct'},
          {title: 'Reconstructive', value: 'Reconstructive'},
          {title: 'Find your gold', value: 'Find your gold'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'Datum',
      title: 'Overnachting inbegrepen?',
      type: 'boolean',
    }),
    defineField({
      title: 'Locatie',
      name: 'locatie',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Prijs',
      name: 'prijs',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      options: {
        list: [
          {title: 'Nederlands', value: 'nl'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      initialValue: 'Nederlands',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Aantal deelnemers?',
      name: 'aantalDeelnemers',
      type: 'string',
    }),
    defineField({
      title: 'Voor wie?',
      name: 'voorWie',
      type: 'string',
    }),
    defineField({
      title: 'Start datum voor het sorteren',
      name: 'startDat',
      type: 'date',
    }),
  ],
})
