export const smtpOptions = {
    host: process.env.SMTP_HOST || "mail.sfu-kras.ru",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER || "user",
        pass: process.env.SMTP_PASSWORD || "password",
    },
}

export type ToEmailT = "hi@sfu-kras.ru" | "mmazaeva@sfu-kras.ru" | "mkozlova@sfu-kras.ru" | "gi-bs@sfu-kras.ru";

export function getToEmail(pathname: string, emailTo?: string | null): string {
    if (!!emailTo) return emailTo;

    const page = pathname.split("/")[2] as string | undefined
    switch (page) {
        case undefined:
            return "hi@sfu-kras.ru";

        case "structure":
            return "hi@sfu-kras.ru";

        case "info":
            return "hi@sfu-kras.ru";

        case "education":
            return "mmazaeva@sfu-kras.ru";

        case "dpo":
            return "mmazaeva@sfu-kras.ru";

        case "science":
            return "mkozlova@sfu-kras.ru";

        case "projects":
            return "mkozlova@sfu-kras.ru";

        case "journals":
            return "mkozlova@sfu-kras.ru";

        case "admission":
            return "gi-bs@sfu-kras.ru"
     
        default:
            return "hi@sfu-kras.ru";
    }
}