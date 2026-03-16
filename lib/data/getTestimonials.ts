import testimonialsData from '@/data/testimonials.json';
import type { Testimonial } from '@/types';

export async function getTestimonials(): Promise<Testimonial[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.testimonial.findMany({ where: { visible: true } })
  return (testimonialsData as Testimonial[]).filter((t) => t.visible);
}
