import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { Image as SanityImage } from 'sanity'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getFrontPage,
  getPosts,
  LandingPage,
  type Post,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { urlForImage } from '~/lib/sanity.image'
import Hero from '~/components/Hero'
import HighlightedSection from '~/components/HighlightedSection'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    frontPage: LandingPage
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const frontPage = await getFrontPage(client)
  console.log(frontPage, 'debug')

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
  console.log(frontPage)

  const { highlightedJobs, highlightedServices, images, title, subTitle } =
    frontPage ?? {}
  return (
    <>
      <section>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="pl-2">
              <Image src="/Logo.png" alt="logo" width="140" height="50" />
            </a>
          </div>
        </div>
      </section>
      <section className="w-full">
        {images && <Hero image={images[0]} />}
      </section>
      <article className="">
        <section className="mb-8 bg-base-200 py-8 text-center">
          <h2 className="mb-8 text-3xl text-center">Våre tjenester</h2>
          <div
            className={`m-auto max-w-screen-xl w-full grid gap-4 ${
              highlightedServices.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4'
            }`}
          >
            {highlightedServices &&
              highlightedServices.map((service, index) => {
                return (
                  <Card
                    description={service.excerpt}
                    title={service.title}
                    key={'job-' + index}
                  />
                )
              })}
          </div>
        </section>
        <section className="mx-auto max-w-screen-xl w-full mb-8">
          <h2 className="mb-4 text-3xl text-center">Tidligere prosjekter</h2>
          <div className="grid gap-4 lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-1">
            {highlightedJobs &&
              highlightedJobs.map((job, index) => {
                return (
                  <div
                    key={'highlightedService-' + index}
                    className="xs:mb-4 lg:mb-8 flex"
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
      </article>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Image src="/Logo.png" alt="logo" width="140" height="50" />
          <h3>
            tlf: 91794681
            <br />
            epost: finvag@hello.no
          </h3>
        </aside>
      </footer>
    </>
  )
}
