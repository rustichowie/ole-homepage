import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Hero from '~/components/Hero'
import HighlightedSection from '~/components/HighlightedSection'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getFrontPage, LandingPage, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    frontPage: LandingPage
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const frontPage = await getFrontPage(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      frontPage,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [frontPage] = useLiveQuery<LandingPage>(props.frontPage, postsQuery)

  const {
    highlightedJobs,
    highlightedServices,
    images,
    title,
    subTitle,
    contactEmail,
    contactPhone,
  } = frontPage ?? {}

  return (
    <>
      <Head>
        <title>Finvåg Service og Vedlikehold</title>
      </Head>
      <section>
        <div className="navbar bg-base-100">
          <div className="navbar-start pl-2">
            <Image src="/Logo.png" alt="logo" width="140" height="50" />
          </div>
        </div>
      </section>
      <section className="w-full">
        {images && (
          <Hero
            image={images[0]}
            subTitle={subTitle}
            title={title}
            email={contactEmail}
            phone={contactPhone}
          />
        )}
      </section>
      <article className="">
        {highlightedServices && (
          <section className="mb-8 bg-base-200 py-8 text-center">
            <h2 className="mb-8 text-3xl text-center">Våre tjenester</h2>
            <div
              className={`m-auto max-w-screen-xl w-full grid gap-4 ${
                highlightedServices.length <= 3
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4'
              }`}
            >
              {highlightedServices.map((service, index) => {
                return (
                  <Card
                    description={service.excerpt}
                    title={service.title}
                    key={'job-' + index}
                    icon={service.mainImage}
                  />
                )
              })}
            </div>
          </section>
        )}
        {highlightedJobs && (
          <section className="mx-auto max-w-screen-xl w-full mb-8">
            <h2 className="mb-4 text-3xl text-center">Tidligere prosjekter</h2>
            <div className="grid gap-4 lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-1">
              {highlightedJobs &&
                highlightedJobs.map((job, index) => {
                  return (
                    <div
                      key={'highlightedService-' + index}
                      className="xs:mb-4 lg:mb-4 flex"
                    >
                      <HighlightedSection
                        color={index % 2 == 0 ? 'primary' : 'secondary'}
                        image={job.mainImage}
                        imagePlacement={index % 2 == 0 ? 'left' : 'right'}
                        title={job.title}
                        description={job.excerpt}
                      />
                    </div>
                  )
                })}
            </div>
          </section>
        )}
      </article>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Image src="/Logo.png" alt="logo" width="140" height="50" />
          {contactPhone && (
            <h3 className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faPhone as IconProp} className="mr-1" />
              <a href={`tel:${contactPhone}`} className="underline">
                {contactPhone}
              </a>
            </h3>
          )}
          {contactEmail && (
            <h3 className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope as IconProp} className="mr-1" />
              <a href={`mailto:${contactEmail}`} className="underline">
                {contactEmail}
              </a>
            </h3>
          )}
        </aside>
      </footer>
    </>
  )
}
