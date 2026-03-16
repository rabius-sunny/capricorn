import Image from 'next/image';
import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CTABanner } from '@/components/shared/CTABanner';
import { getTeamMembers } from '@/lib/data/getTeamMembers';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Capricorn Group Care LLC — our mission, values, and the experienced team dedicated to compassionate residential senior care.'
};

const coreValues = [
  {
    icon: '🏡',
    title: 'Home-First Philosophy',
    description:
      'Care delivered in a real home — not a clinical setting — so residents feel safe, comfortable, and respected.'
  },
  {
    icon: '❤️',
    title: 'Compassion in Every Interaction',
    description:
      'Every resident is treated like family. We lead with empathy, patience, and genuine warmth.'
  },
  {
    icon: '🔒',
    title: 'Safety & Dignity',
    description:
      'Accessible spaces, trained staff, and individualized care plans protect both the health and dignity of every resident.'
  },
  {
    icon: '📋',
    title: 'RN-Backed Excellence',
    description:
      'Registered nurses lead our care planning, ensuring clinical standards are met with a human touch.'
  }
];

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <PageHero
        title='About Capricorn Group Care'
        subtitle='Founded with a simple mission: to provide the kind of care we would want for our own families.'
      />

      {/* ── Mission & Story ───────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <SectionHeader
                label='Our Mission'
                title='Care That Feels Like Family'
                align='left'
              />
              <div className='mt-6 space-y-4 text-base text-text-mid leading-relaxed'>
                <p>
                  Capricorn Group Care LLC was founded on the belief that every
                  individual — regardless of age or ability — deserves to live
                  with dignity in a place that truly feels like home. Our
                  residential group homes are warm, supportive environments
                  where residents receive personalized care, build meaningful
                  relationships, and maintain their quality of life.
                </p>
                <p>
                  Led by registered nurses with deep experience in senior and
                  residential care, we go beyond the basics to understand each
                  resident as a whole person — their history, preferences, and
                  individual needs. That understanding shapes every care plan we
                  develop.
                </p>
                <p>
                  We serve families across McKinney, Plano, Frisco, and the
                  greater Dallas-Fort Worth area, offering an alternative to
                  large nursing facilities that is more personal, more
                  attentive, and more like home.
                </p>
              </div>
            </div>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated'>
              <Image
                src='https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=720&h=540&auto=format&fit=crop&q=80'
                alt='Capricorn Group Care team and residents'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Values'
            title='What We Stand For'
            subtitle='These principles guide everything we do — from how we design our spaces to how we train our staff.'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {coreValues.map((value) => (
              <div
                key={value.title}
                className='bg-white rounded-2xl p-6 shadow-card text-center'
              >
                <div className='text-4xl mb-4'>{value.icon}</div>
                <h3 className='font-semibold text-text-dark mb-2'>
                  {value.title}
                </h3>
                <p className='text-sm text-text-mid leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Team'
            title='Meet the People Behind the Care'
            subtitle='Our staff brings clinical expertise and heartfelt dedication to every resident interaction.'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {team.map((member) => (
              <div
                key={member.id}
                className='text-center'
              >
                <div className='relative h-48 w-48 mx-auto rounded-full overflow-hidden shadow-card mb-4'>
                  <Image
                    src={
                      member.photoUrl ??
                      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&auto=format&fit=crop&q=80'
                    }
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <h3 className='font-semibold text-text-dark text-lg'>
                  {member.name}
                </h3>
                <p className='text-sm text-teal font-medium mt-1'>
                  {member.title}
                </p>
                <p className='text-sm text-text-mid leading-relaxed mt-3 max-w-xs mx-auto'>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading='Ready to Learn More?'
        subtext='Schedule a tour to meet our team and see our homes in person.'
        buttonLabel='Schedule a Tour'
        buttonHref='/schedule-a-tour'
        secondaryButtonLabel='Contact Us'
        secondaryButtonHref='/contact'
      />
    </>
  );
}
