import { z } from "zod";
import { EducationalProgramSingleT, EmployeeSingleT, GraduateSingleT, DpoCoursesSingleT, StructureCategoryEnum, DepartmentSingleT, NewSingleT, ProjectsSingleT, JournalsSingleT } from "./entities";

//.........................FORMS.........................//
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const customEmailRegex = new RegExp(
  /^([a-zA-Z0-9._-])+$/
)

export const ContactFormT = z.object({
  path: z.string().optional(),
  to: z.string().optional(),
  username: z.string().min(2, {
    message: "min2symbols",
  }),
  email: z.string().email({ message: "email" }),
  phone: z.string().regex(phoneRegex, 'phone'),
  text: z.string(),
})
export type ContactFormT = z.infer<typeof ContactFormT>;

export const EmailStudEnum = z.enum(["@sfu-kras.ru", "@stud.sfu-kras.ru"]);
export type EmailStudEnum = z.infer<typeof EmailStudEnum>;

export const DocRequestFormWithPatronymicT = z.object({
  path: z.string().optional(),
  to: z.string().optional(),
  name: z.string().min(2, {
    message: "min2symbols",
  }),
  lastname: z.string().min(2, {
    message: "min2symbols",
  }),
  noPatronymic: z.literal(false),
  patronymic: z.string().min(2, {
    message: "min2symbols",
  }),
  group: z.string().min(2, {
    message: "group",
  }),
  email: z.string().regex(customEmailRegex, "email"),
  emailStud: EmailStudEnum,
  phone: z.string().regex(phoneRegex, 'phone'),
  request: z.string().min(2, {
    message: "request",
  }),
})
export type DocRequestFormWithPatronymicT = z.infer<typeof DocRequestFormWithPatronymicT>;

export const DocRequestFormNoPatronymicT = z.object({
  path: z.string().optional(),
  to: z.string().optional(),
  name: z.string().min(2, {
    message: "min2symbols",
  }),
  lastname: z.string().min(2, {
    message: "min2symbols",
  }),
  noPatronymic: z.literal(true),
  group: z.string().min(2, {
    message: "group",
  }),
  email: z.string().regex(customEmailRegex, "email"),
  emailStud: EmailStudEnum,
  phone: z.string().regex(phoneRegex, 'phone'),
  request: z.string().min(2, {
    message: "request",
  }),
})
export type DocRequestFormNoPatronymicT = z.infer<typeof DocRequestFormNoPatronymicT>;

export const DocRequestFormT = z.union([
  DocRequestFormWithPatronymicT,
  DocRequestFormNoPatronymicT
])
export type DocRequestFormT = z.infer<typeof DocRequestFormT>;


//.........................IMAGES.........................//
export const ImageT = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string(),
      }),
    })
    .nullable(),
});
export type ImageT = z.infer<typeof ImageT>;

export const ImagesArrayT = z.object({
data: z
  .object({
    attributes: z.object({
      url: z.string(),
    }),
  })
  .array(),
});
export type ImagesArrayT = z.infer<typeof ImagesArrayT>;




//..................................................COMPONENTS..................................................//

//.........................Text.........................//
export const TextCompT = z.object({
  __typename: z.literal("ComponentContentTextBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
})
export type TextCompT = z.infer<typeof TextCompT>;




//.........................TextImages.........................//
export const AlignEnum = z.enum(["left", "right"]);
export type AlignEnum = z.infer<typeof AlignEnum>;

export const TextImagesCompT = z.object({
  __typename: z.literal("ComponentContentTextImages"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
  alignImages: AlignEnum,
  images: ImagesArrayT,
})
export type TextImagesCompT = z.infer<typeof TextImagesCompT>;





//.........................TextGrid.........................//
export const TextGridItemT = z.object({
  title: z.string(),
  text: z.any(),
})
export type TextGridItemT = z.infer<typeof TextGridItemT>;

export const TextGridCompT = z.object({
  __typename: z.literal("ComponentContentTextGrid"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: TextGridItemT.array(),
  bigTitles: z.boolean().nullable(),
  buttonTitle: z.string().nullable(),
  buttonLink: z.string().nullable(),
})
export type TextGridCompT = z.infer<typeof TextGridCompT>;




//.........................CollectionAll.........................//
export const CollectionAllEventsViewEnum = z.enum([
  "classic",
  "calendar",
  "bento"
])

export const CollectionAllViewEnum = z.enum([
  "classic",
  "bento",
]);
export type CollectionAllViewEnum = z.infer<typeof CollectionAllViewEnum>;

export const CollectionAllEnum = z.enum([
  "educational-programs", 
  "edu-educational-programs",
  "dpo-courses", 
  "graduates",
  "employees",
  "departments",
  "news",
  "events",
  "projects",
  "journals"
]);
export type CollectionAllEnum = z.infer<typeof CollectionAllEnum>;

export const CollectionAllCompT = z.object({
  __typename: z.literal("ComponentContentCollectionAll"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  entity: CollectionAllEnum.array(),
  connected: z.boolean().nullable(),
  showSearch: z.boolean().nullable(),
  showFilters: z.boolean().nullable(),
  departmentsConfig: z.object({
    category: z.lazy(() => StructureCategoryEnum).nullable(),
    type: z.object({
      data: z.object({
        id: z.string(),
      }).nullable()
    }),
    view: CollectionAllViewEnum,
  }).nullable(),
  employeesConfig: z.object({
    showContacts: z.boolean(),
    showHashtags: z.boolean()
  }).nullable(),
  newsConfig: z.object({
    count: z.number(),
    showGoToAllButton: z.boolean()
  }).nullable(),
  eventsConfig: z.object({
    view: CollectionAllEventsViewEnum,
  }).nullable()
})
export type CollectionAllCompT = z.infer<typeof CollectionAllCompT>;




//.........................Contacts.........................//
export const ContactsCompT = z.object({
  __typename: z.literal("ComponentContentContacts"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location: z.string().nullable(),
  image: ImageT,
  secondTitle: z.string().nullable(),
  additionalText: z.any(),
  alignContacts: AlignEnum.nullable(),
})
export type ContactsCompT = z.infer<typeof ContactsCompT>;




//.........................IconsBlock.........................//
export const IconsBlockItemT = z.object({
  title: z.string(),
  iconReact: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
  description: z.string().nullable(),
})
export type IconsBlockItemT = z.infer<typeof IconsBlockItemT>;

export const IconsBlockCompT = z.object({
  __typename: z.literal("ComponentContentIconsBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  backgroundOn: z.boolean(),
  isList: z.boolean(),
  image: ImageT,
  alignImage: AlignEnum,
  items: IconsBlockItemT.array(),
  moreTitle: z.string().nullable(),
  moreLink: z.string().nullable(),
})
export type IconsBlockCompT = z.infer<typeof IconsBlockCompT>;




//.........................SliderEntity.........................//
export const SliderEntityCompT = z.object({
  __typename: z.literal("ComponentContentSliderEntity"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  educational_programs: z.object({
    data: z.lazy(() => EducationalProgramSingleT).array()
  }),
  employees: z.object({
    data: z.lazy(() => EmployeeSingleT).array()
  }),
  graduates: z.object({
    data: z.lazy(() => GraduateSingleT).array()
  }),
  dpo_courses: z.object({
    data: z.lazy(() => DpoCoursesSingleT).array()
  }),
  departments: z.object({
    data: z.lazy(() => DepartmentSingleT).array()
  }),
  news: z.object({
    data: z.lazy(() => NewSingleT).array()
  }),
  projects: z.object({
    data: z.lazy(() => ProjectsSingleT).array()
  }),
  journals: z.object({
    data: z.lazy(() => JournalsSingleT).array()
  }),
  departmentsConfig: z.object({
    viewStyle: CollectionAllViewEnum,
  }).nullable(),
  employeesConfig: z.object({
    showContacts: z.boolean(),
    showHashtags: z.boolean()
  }).nullable(),
  titleAll: z.string().nullable(),
})
export type SliderEntityCompT = z.infer<typeof SliderEntityCompT>;




//.........................SliderPhotos.........................//
export const SliderPhotosCompT = z.object({
  __typename: z.literal("ComponentContentSliderPhotos"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  photos: ImagesArrayT,
})
export type SliderPhotosCompT = z.infer<typeof SliderPhotosCompT>;




//.........................SliderVideo.........................//
export const SliderVideoItemT = z.object({
  title: z.string(),
  video: ImageT,
  embed: z.string().nullable()
})
export type SliderVideoItemT = z.infer<typeof SliderVideoItemT>;

export const SliderVideoCompT = z.object({
  __typename: z.literal("ComponentContentSliderVideo"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: SliderVideoItemT.array(),
})
export type SliderVideoCompT = z.infer<typeof SliderVideoCompT>;




//.........................TextVideo.........................//
export const TextVideoCompT = z.object({
  __typename: z.literal("ComponentContentTextVideo"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
  alignVideo: AlignEnum,
  items: SliderVideoItemT.array(),
})
export type TextVideoCompT = z.infer<typeof TextVideoCompT>;



//.........................Timeline.........................//
export const TimelineItemT = z.object({
  title: z.string().nullable(),
  text: z.any(),
})
export type TimelineItemT = z.infer<typeof TimelineItemT>;

export const TimelineCompT = z.object({
  __typename: z.literal("ComponentContentTimeline"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  subTitle: z.string().nullable(),
  line: TimelineItemT.array(),
})
export type TimelineCompT = z.infer<typeof TimelineCompT>;




//.........................Numbers.........................//
export const NumbersItemT = z.object({
  number: z.number(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
})
export type NumbersItemT = z.infer<typeof NumbersItemT>;

export const NumbersCompT = z.object({
  __typename: z.literal("ComponentContentNumbers"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  subTitle: z.string().nullable(),
  items: NumbersItemT.array(),
})
export type NumbersCompT = z.infer<typeof NumbersCompT>;




//.........................Files.........................//
export const FilesItemT = z.object({
  title: z.string(),
  file: z.object({
    data: z
      .object({
        attributes: z.object({
          url: z.string(),
        }),
      })
  }),
  description: z.string().nullable(),
})
export type FilesItemT = z.infer<typeof FilesItemT>;

export const FilesCompT = z.object({
  __typename: z.literal("ComponentContentFiles"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: FilesItemT.array(),
})
export type FilesCompT = z.infer<typeof FilesCompT>;

export const FilesGridCompT = z.object({
  __typename: z.literal("ComponentContentFilesGrid"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: FilesItemT.array(),
  titleSecond: z.string().nullable(),
  linkSecond: z.string().nullable(),
  linkSecondTitle: z.string().nullable(),
  itemsSecond: FilesItemT.array(),
})
export type FilesGridCompT = z.infer<typeof FilesGridCompT>;




//.........................Accordion.........................//
export const AccordionItemT = z.object({
  title: z.string(),
  text: z.any(),
})
export type AccordionItemT = z.infer<typeof AccordionItemT>;

export const AccordionCompT = z.object({
  __typename: z.literal("ComponentContentAccordion"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: AccordionItemT.array(),
})
export type AccordionCompT = z.infer<typeof AccordionCompT>;




//.........................Accordion.........................//
export const BentoGridItemT = z.object({
  title: z.string(),
  iconReact: z.string().nullable(),
  image: ImageT,
  textDescription: z.any(),
})
export type BentoGridItemT = z.infer<typeof BentoGridItemT>;

export const BentoGridCompT = z.object({
  __typename: z.literal("ComponentContentBentoGrid"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: BentoGridItemT.array(),
})
export type BentoGridCompT = z.infer<typeof BentoGridCompT>;




//.........................FormBlock.........................//
export const FormBlockItemT = z.object({
  title: z.string(),
  description: z.string().nullable(),
  iconReact: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
})
export type FormBlockItemT = z.infer<typeof FormBlockItemT>;

export const FormBlockCompT = z.object({
  __typename: z.literal("ComponentContentFormBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
  list: FormBlockItemT.array(),
  largeTitles: z.boolean().nullable(),
  color: z.string().nullable(),
  colorDark: z.string().nullable(),
  buttonTitle: z.string().nullable(),
  buttonLink: z.string().nullable(),
  inNewTab: z.boolean().nullable(),
  formTitle: z.string().nullable(),
  formDescription: z.string().nullable(),
  textPlaceholder: z.string().nullable(),
  emailTo: z.string().nullable(),
})
export type FormBlockCompT = z.infer<typeof FormBlockCompT>;




//.........................DocRequestForm.........................//
export const DocRequestFormCompT = z.object({
  __typename: z.literal("ComponentContentDocRequestForm"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable()
})
export type DocRequestFormCompT = z.infer<typeof DocRequestFormCompT>;




//.........................GroupCalendar.........................//
export const GroupCalendarCompT = z.object({
  __typename: z.literal("ComponentContentGroupCalendar"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  connected: z.boolean().nullable(),
})
export type GroupCalendarCompT = z.infer<typeof GroupCalendarCompT>;




//.........................ButtonsBlock.........................//
export const AlignButtonsEnum = z.enum([
  "left", 
  "right", 
  "center",
  "between",
  "around",
  "evenly"
]);
export type AlignButtonsEnum = z.infer<typeof AlignButtonsEnum>;

export const ButtonsBlockItemT = z.object({
  title: z.string(),
  link: z.string(),
  icon: z.string().nullable(),
})
export type ButtonsBlockItemT = z.infer<typeof ButtonsBlockItemT>;

export const ButtonsBlockCompT = z.object({
  __typename: z.literal("ComponentContentButtonsBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  alignButtons: AlignButtonsEnum,
  items: ButtonsBlockItemT.array()
})
export type ButtonsBlockCompT = z.infer<typeof ButtonsBlockCompT>;





//..................................................DynamicZone..................................................//
export const DynamicZoneT = z.discriminatedUnion("__typename", [
  TextCompT,
  TextImagesCompT,
  TextVideoCompT,
  TextGridCompT,
  CollectionAllCompT,
  ContactsCompT,
  IconsBlockCompT,
  SliderEntityCompT,
  SliderPhotosCompT,
  SliderVideoCompT,
  TimelineCompT,
  NumbersCompT,
  FilesCompT,
  FilesGridCompT,
  AccordionCompT,
  BentoGridCompT,
  FormBlockCompT,
  DocRequestFormCompT,
  GroupCalendarCompT,
  ButtonsBlockCompT,
])
export type DynamicZoneT = z.infer<typeof DynamicZoneT>;




//.........................Error.........................//
export const ErrorCompT = z.object({
  code: z.string(),
  message: z.string().nullable(),
})
export type ErrorCompT = z.infer<typeof ErrorCompT>;