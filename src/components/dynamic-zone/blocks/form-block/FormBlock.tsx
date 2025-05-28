"use client"

import DynamicReactIcon from '@/components/DynamicReactIcon'
import { TypographyH2 } from '@/components/typography'
import { cn } from '@/lib/utils'
import React from 'react'
import ImageComp from '@/components/ImageComp'
import { useTheme } from 'next-themes'
import { ClientHydration } from '@/components/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import type { FormBlockCompT, FormBlockItemT } from '@/lib/types/components'
 
const ButtonForm = dynamic(
  () => import('./ButtonForm'),
  {
    loading: () => <Skeleton className='h-[50px] lg:w-1/5 w-full z-10'/>,
  }
)

export default function FormBlock({
    data,
    headingBig,
    className,
}: {
    data: FormBlockCompT,
    headingBig?: boolean,
    className?: string,
}) {

    const { resolvedTheme } = useTheme()

    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 
                    className={cn(
                        'font-semibold text-primary mb-8 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}

            <div 
                className={cn(
                    'w-full flex relative lg:flex-row flex-col items-center lg:gap-6 gap-10 xl:p-16 lg:p-12 p-8 border-transparent dark:border-border/20 shadow-md rounded-3xl overflow-hidden',
                    (data.image.data || data.imageDark.data) && "dark:border",
                    data.image.data 
                        ? "bg-background" 
                        : data.color 
                            ? ""
                            : "bg-primary dark:bg-accent"
                )} 
                style={{
                    backgroundColor: (resolvedTheme === "dark" && data.colorDark)
                        ? data.colorDark 
                        : data.color
                            ? data.color
                            : ""
                }}
            >
                {data.image.data && (
                    <ClientHydration fallback={<Skeleton className={cn(
                        'absolute top-0 left-0 w-full h-full', 
                        data.imageDark.data ? "dark:hidden" : ""
                    )}/>}>
                        <ImageComp 
                            src={data.image.data.attributes.url}
                            alt=''
                            fill
                            sizes='90vw'
                            className={cn(
                                'object-cover z-0 !brightness-50 !contrast-125', 
                                data.imageDark.data ? "dark:hidden" : "dark:!brightness-[0.4]"
                            )}
                        />
                    </ClientHydration>
                )}
                {data.imageDark.data && (
                    <ClientHydration fallback={<Skeleton className='absolute top-0 left-0 w-full h-full hidden dark:block'/>}>
                        <ImageComp 
                            src={data.imageDark.data.attributes.url}
                            alt=''
                            fill
                            sizes='90vw'
                            className='object-cover z-0 !brightness-[0.4] !contrast-125 hidden dark:block'
                        />
                    </ClientHydration>
                )}
                <ul className={cn(
                    "grid xl:gap-8 xl:gap-y-14 lg:gap-y-10 gap-6 items-center text-background dark:text-foreground w-full z-10",
                    data.list.length === 4 ? "lg:grid-cols-2 grid-cols-1 lg:w-3/4" : "xl:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-4/5"
                )}>
                    {data.list.map((item, index) => (
                        <li key={index} className='flex flex-wrap items-center gap-3 self-start'>
                            <ClientHydration fallback={<Skeleton className='min-w-8 self-start lg:h-11 sm:h-10 h-9 aspect-square'/>}>
                                <FormBlockIcon item={item} className='min-w-8 self-start' />
                            </ClientHydration>
                            <p className={cn(
                                'flex-1 font-semibold break-words',
                                data.largeTitles ? "2xl:text-4xl xl:text-3xl text-2xl" : "2xl:text-[1.4rem] xl:text-xl text-lg"
                            )}>
                                {item.title}
                                <span className='block font-light text-sm mt-0.5 whitespace-pre-wrap'>{item.description}</span>
                            </p>
                        </li>
                    ))}
                </ul>
                {(data.buttonTitle && data.buttonLink) 
                    ? (
                        <Link 
                            href={data.buttonLink} 
                            target={data.inNewTab ? "_blank" : "_self"} 
                            passHref 
                            className={cn(
                                'w-full z-10',
                                data.list.length === 4 ? "lg:w-1/4" : "lg:w-1/5"
                            )}
                        >
                            <Button className='w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background dark:text-background dark:bg-primary dark:hover:text-primary dark:hover:bg-transparent dark:hover:border-primary'>
                                {data.buttonTitle}
                            </Button>
                        </Link>
                    )
                    : (
                        <ButtonForm
                            buttonTitle={data.buttonTitle}
                            listLength={data.list.length}
                            formTitle={data.formTitle}
                            formDescription={data.formDescription}
                            textPlaceholder={data.textPlaceholder}
                            emailTo={data.emailTo}
                        />
                    )
                }
            </div>
        </div>
    )
}


function FormBlockIcon({
    item,
    className
}: {
    item: FormBlockItemT,
    className?: string
}) {
    if (item.iconReact) return <DynamicReactIcon icon={item.iconReact} className={cn("h-auto lg:w-11 sm:w-10 w-9 text-background dark:text-foreground", className)} />
    else if (item.image.data) return (
        <div>
            <ImageComp
                src={item.image.data.attributes.url}
                alt='Icon'
                fill={false}
                width={48}
                height={48}
                className={cn(
                    'lg:h-11 sm:h-10 h-9 aspect-square object-contain', 
                    className,
                    item.imageDark.data ? "dark:hidden" : "dark:!filter-background"
                )}
            />
            {item.imageDark.data && (
                <ImageComp 
                    src={item.imageDark.data.attributes.url} 
                    alt='Icon'
                    fill={false}
                    width={48}
                    height={48}
                    className={cn(
                        'lg:h-11 sm:h-10 h-9 aspect-square object-contain hidden dark:block', 
                        className,
                    )}
                />
            )}
        </div>
    )
    else return null
}
