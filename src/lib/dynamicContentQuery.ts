import { departments, dpo_courses, educationalPrograms, employees, graduates, journals, news, projects } from "./contentQueries"

//.........................dynamicContentQuery.........................//
export const dynamicContentQuery = `
  __typename
  ... on ComponentContentContacts {
    title
    link
    linkTitle
    phone
    email
    location
    image {
      data {
        attributes {
          url
        }
      }
    }
    secondTitle
    additionalText
    alignContacts
  }
  ... on ComponentContentIconsBlock {
    title
    link
    linkTitle
    backgroundOn
    isList
    image {
      data {
        attributes {
          url
        }
      }
    }
    alignImage
    items {
      title
      iconReact
      image {
        data {
          attributes {
            url
          }
        }
      }
      imageDark {
        data {
          attributes {
            url
          }
        }
      }
      description
    }
    moreTitle
    moreLink
  }
  ... on ComponentContentSliderPhotos {
    title
    link
    linkTitle
    photos {
      data {
        attributes {
          url
        }
      }
    }
  }
  ... on ComponentContentSliderVideo {
    title
    link
    linkTitle
    items {
      title
      video {
        data {
          attributes {
            url
          }
        }
      }
      embed
    }
  }
  ... on ComponentContentSliderEntity {
    title
    link
    linkTitle
    ${educationalPrograms}
    ${employees}
    ${graduates}
    ${dpo_courses}
    ${departments}
    ${news}
    ${projects}
    ${journals}
    departmentsConfig {
      viewStyle
    }
    employeesConfig {
      showContacts
      showHashtags
    }
    titleAll
  }
  ... on ComponentContentCollectionAll {
    title
    link
    linkTitle
    entity
    connected
    showSearch
    showFilters
    departmentsConfig {
      category
      type {
        data { id }
      }
      view
    }
    employeesConfig {
      showContacts
      showHashtags
    }
    newsConfig {
      count
      showGoToAllButton
    }
    eventsConfig {
      view
    }
  }
  ... on ComponentContentTextBlock {
    title
    link
    linkTitle
    text
  }
  ... on ComponentContentTextImages {
    title
    link
    linkTitle
    text
    alignImages
    images {
      data {
        attributes {
          url
        }
      }
    }
  }
  ... on ComponentContentTextVideo {
    title
    link
    linkTitle
    text
    alignVideo
    items {
      title
      video {
        data {
          attributes {
            url
          }
        }
      }
      embed
    }
  }
  ... on ComponentContentTextGrid {
    title
    link
    linkTitle
    items {
      title
      text
    }
    bigTitles
    buttonTitle
    buttonLink
  }
  ... on ComponentContentTimeline {
    title
    link
    linkTitle
    subTitle
    line {
      title
      text
    }
  }
  ... on ComponentContentNumbers {
    title
    link
    linkTitle
    subTitle
    items {
      number
      description
      icon
    }
  }
  ... on ComponentContentFiles {
    title
    link
    linkTitle
    items {
      title
      file {
        data {
          attributes { url }
        }
      }
      description
    }
  }
  ... on ComponentContentFilesGrid {
    title
    link
    linkTitle
    items {
      title
      file {
        data {
          attributes { url }
        }
      }
      description
    }
    titleSecond
    linkSecond
    linkSecondTitle
    itemsSecond {
      title
      file {
        data {
          attributes { url }
        }
      }
      description
    }
  }
  ... on ComponentContentBentoGrid {
    title
    link
    linkTitle
    items {
      title
      iconReact
      image {
        data {
          attributes { url }
        }
      }
      textDescription
    }
  }
  ...on ComponentContentAccordion {
    title
    link
    linkTitle
    items {
      title
      text
    }
  }
  ... on ComponentContentFormBlock {
    title
    link
    linkTitle
    image {
      data {
        attributes {
          url
        }
      }
    }
    imageDark {
      data {
        attributes {
          url
        }
      }
    }
    color
    colorDark
    list {
      title
      description
      iconReact
      image {
        data {
          attributes {
            url
          }
        }
      }
      imageDark {
        data {
          attributes {
            url
          }
        }
      }
    }
    largeTitles
    buttonTitle
    buttonLink
    inNewTab
    formTitle
    formDescription
    textPlaceholder
    emailTo
  }
  ...on ComponentContentDocRequestForm {
    title
    link
    linkTitle
  }
  ...on ComponentContentGroupCalendar {
    title
    link
    linkTitle
    connected
  }
  ...on ComponentContentButtonsBlock {
    title
    link
    linkTitle
    alignButtons
    items {
      title
      link
      icon
    }
  }
`

//.........................LINKS.........................//
const sameFields = `
  title
  link
  linkTitle
  linkDescription
`

export const dynamicContentLinksQuery = `
  ... on ComponentContentContacts {
    ${sameFields}
  }
  ... on ComponentContentIconsBlock {
    ${sameFields}
  }
  ... on ComponentContentSliderPhotos {
    ${sameFields}
  }
  ... on ComponentContentSliderVideo {
    ${sameFields}
  }
  ... on ComponentContentSliderEntity {
    ${sameFields}
  }
  ... on ComponentContentCollectionAll {
    ${sameFields}
  }
  ... on ComponentContentTextBlock {
    ${sameFields}
  }
  ... on ComponentContentTextImages {
    ${sameFields}
  }
  ... on ComponentContentTextVideo {
    ${sameFields}
  }
  ... on ComponentContentTextGrid {
    ${sameFields}
  }
  ... on ComponentContentTimeline {
    ${sameFields}
  }
  ... on ComponentContentNumbers {
    ${sameFields}
  }
  ... on ComponentContentFiles {
    ${sameFields}
  }
  ... on ComponentContentFilesGrid {
    ${sameFields}
    titleSecond
    linkSecond
    linkSecondTitle
    linkSecondDescription
  }
  ... on ComponentContentAccordion {
    ${sameFields}
  }
  ... on ComponentContentBentoGrid {
    ${sameFields}
  }
  ... on ComponentContentFormBlock {
    ${sameFields}
  }
  ...on ComponentContentDocRequestForm {
    ${sameFields}
  }
  ...on ComponentContentGroupCalendar {
    ${sameFields}
  }
  ...on ComponentContentButtonsBlock {
    ${sameFields}
  }
`