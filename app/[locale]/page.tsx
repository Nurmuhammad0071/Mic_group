import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyMicGroup from "@/components/WhyMicGroup";
import HowWeWork from "@/components/HowWeWork";
import CtaSection from "@/components/CtaSection";
import LeadFormSection from "@/components/LeadFormSection";
import Footer from "@/components/Footer";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} />
        <Services dict={dict} />
        <WhyMicGroup dict={dict} />
        <HowWeWork dict={dict} />
        <CtaSection dict={dict} />
        <LeadFormSection dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
