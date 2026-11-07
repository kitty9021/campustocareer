import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";
import SiteHeader from "@/app/components/SiteHeader";

const faqs = [
    {
        q: "How do I apply for jobs or internships?",
        a: "Create a student account, open any job from the Find Jobs page, and click Apply. Upload your resume as a PDF (maximum 5 MB). You can apply once per job.",
    },
    {
        q: "How can I track my submitted applications?",
        a: "Log in and open My Applications. Each application shows its status: Applied, Shortlisted or Rejected.",
    },
    {
        q: "Where will I see my interview details?",
        a: "When you are shortlisted and the admin schedules an interview, the date, time and place appear on your My Applications page.",
    },
    {
        q: "Is my resume private?",
        a: "Yes. Resumes are stored in a private bucket, and only administrators can open them.",
    },
];

const info = [
    {
        title: "Email",
        value: "support.campustocareer@gmail.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </svg>
        ),
    },
    {
        title: "Response time",
        value: "We usually reply within 1 to 2 working days",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        ),
    },
    {
        title: "Career Support",
        value: "We're here to help you with your job search and career journey.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-100 text-gray-900">
            <SiteHeader />

            <section
                aria-labelledby="contact-hero-title"
                className="relative isolate mt-6 flex min-h-[160px] items-center overflow-hidden bg-cover bg-right py-8 sm:mt-8 sm:bg-center sm:py-10"
                style={{ backgroundImage: "url('/contact-banner.png')" }}
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/30 sm:from-black/70 sm:via-black/40 sm:to-black/10"
                />
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl text-white">
                        <h1
                            id="contact-hero-title"
                            className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl"
                        >
                            Your Career Journey Starts Here ✨
                        </h1>
                        <p className="mt-2 text-sm text-white/95 sm:text-base md:text-lg">
                            We&apos;re here to support you at every step of your career
                            journey. Send us a message and we will get back to you.
                        </p>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
                    <div className="min-w-0">
                        <ContactForm />
                    </div>

                    <div className="min-w-0 rounded-2xl bg-white p-5 shadow sm:p-8">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Other ways to reach us
                        </h2>
                        <div className="mt-5 space-y-3">
                            {info.map((i) => (
                                <div
                                    key={i.title}
                                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        {i.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-700">
                                            {i.title}
                                        </p>
                                        <p className="break-words text-sm text-gray-600">
                                            {i.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section className="mt-10 max-w-3xl sm:mt-14">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base">
                        Quick answers to common questions about the platform.
                    </p>
                    <div className="mt-5 space-y-3">
                        {faqs.map((f) => (
                            <details
                                key={f.q}
                                className="group rounded-xl bg-white px-4 py-4 shadow sm:px-5"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900">
                                    {f.q}
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="shrink-0 transition group-open:rotate-180"
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </summary>
                                <p className="mt-3 text-sm text-gray-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}