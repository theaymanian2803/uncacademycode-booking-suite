import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I get full source code ownership?",
      answer:
        "Yes, absolutely! Once you purchase a template, you receive complete ownership of the source code. You can modify, extend, and use it for any project without restrictions. The code is yours to keep forever.",
    },
    {
      question: "What kind of support is included?",
      answer:
        "All our templates come with comprehensive documentation and 30 days of email support. During this period, we'll help you with setup questions, customization guidance, and any technical issues you encounter.",
    },
    {
      question: "Can I use the template for multiple projects?",
      answer:
        "Each license covers a single end product. If you want to use the same template for multiple projects, you'll need to purchase additional licenses. We offer bulk discounts for multiple purchases.",
    },
    {
      question: "What technologies are the templates built with?",
      answer:
        "Our templates are built with modern, production-ready technologies including React, TypeScript, Tailwind CSS, and various backend solutions. We ensure all templates follow best practices and are easy to maintain.",
    },
    {
      question: "How long is the consultation session?",
      answer:
        "Each consultation session lasts approximately 45-60 minutes. During this time, we'll discuss your project requirements, recommend the best template for your needs, and answer any technical questions you may have.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "We offer a 14-day refund policy for unused templates. If you've already started using the template in a project, refunds are evaluated on a case-by-case basis. Contact us to discuss your situation.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our templates and services.
            </p>
          </div>

          {/* Accordion */}
          <div className="glass-card p-4 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/50"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:text-primary transition-colors py-4 sm:py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
