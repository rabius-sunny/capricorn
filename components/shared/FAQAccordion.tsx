import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import type { FAQItem } from '@/types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion className='w-full space-y-3'>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className='bg-white rounded-2xl border border-gray-100 shadow-card px-6 data-[state=open]:border-teal/30 data-[state=open]:shadow-elevated transition-all duration-200'
        >
          <AccordionTrigger className='text-left text-base font-semibold text-text-dark hover:text-teal hover:no-underline py-5 [&[data-state=open]]:text-teal'>
            {item.question}
          </AccordionTrigger>
          <AccordionContent className='text-sm text-text-mid leading-relaxed pb-5'>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
