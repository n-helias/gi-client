"use client"

import { sendEmail } from '@/app/[locale]/actions';
import CredenzaPopup from '@/components/CredenzaPopup';
import ContactForm from '@/components/forms/ContactForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { getToEmail } from '@/lib/email';
import { cn, getShortText } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom';

type Props = {
    buttonTitle: string | null,
    listLength: number,
    formTitle: string | null,
    formDescription: string | null,
    textPlaceholder: string | null,
    emailTo?: string | null,
}

export default function ButtonForm({
    buttonTitle,
    listLength,
    formTitle,
    formDescription,
    textPlaceholder,
    emailTo
}: Props) {
    const dict = useDictionary()

    const [open, setOpen] = useState(false);

    const { toast } = useToast();

    const path = usePathname();

    const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
        error: null,
        success: false
    })

    useEffect(() => {
        if (sendEmailState.success) {
            toast({
                title: dict.ContactForm.sendMessage.success.title,
                description: dict.ContactForm.sendMessage.success.description,
                className: "font-Din text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
            });
            setOpen(false)
        }
        if (sendEmailState.error) {
            toast({
                variant: "destructive",
                title: dict.ContactForm.sendMessage.error,
                description: <p>{getShortText(sendEmailState.error, 50)}</p>,
                className: "font-Din",
            });
            setOpen(false)
        }
    }, [sendEmailState.error, sendEmailState.success, toast, dict.ContactForm.sendMessage])

    const handleAction = (formData: FormData) => {
        sendEmailAction({
            to: getToEmail(path, emailTo),
            path,
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            text: formData.get("text") as string,
        })
    }

    return (
        <CredenzaPopup
            open={open} 
            onOpenChange={setOpen}
            trigger={
                <Button className={cn(
                    'w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background z-10',
                    "dark:text-background dark:bg-primary dark:hover:text-primary dark:hover:bg-transparent dark:hover:border-primary",
                    listLength === 4 ? "lg:w-1/4" : "lg:w-1/5 "
                )}>
                    {buttonTitle}
                </Button>
            }
            title={formTitle ?? dict.ContactForm.placeholder}
            description={formDescription ?? ""}
        >
            <ScrollArea type='scroll' className='md:mb-1 mb-6' classNameViewport='max-h-[70vh]'>
                <div className='py-2 px-4'>
                    <ContactForm textPlaceholder={textPlaceholder} handleAction={handleAction} />
                </div>
            </ScrollArea>
        </CredenzaPopup>
    )
}
