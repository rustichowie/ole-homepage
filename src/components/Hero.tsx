import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { Image as SanityImage } from 'sanity'

import { urlForImage } from '~/lib/sanity.image'

export interface HeroProps {
  image: SanityImage
  title?: string
  subTitle?: string
  phone?: string
  email?: string
}

function arrayCeil(width) {
  const imageSizes = [600, 1280, 1920]
  return imageSizes.find((x) => x > width) ?? imageSizes[imageSizes.length - 1]
}

export default function Hero(props: HeroProps) {
  const [heroImage, setHeroImage] = useState(1920)
  const { observe, unobserve, width, height, entry } = useDimensions({
    onResize: ({ observe, unobserve, width, height, entry }) => {
      setHeroImage(arrayCeil(width))

      unobserve() // To stop observing the current target element
      observe() // To re-start observing the current target element
    },
  })

  return (
    <div
      className="hero h-[560px]"
      style={{
        backgroundImage: `url(${urlForImage(props.image)
          .width(heroImage)
          .url()})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold uppercase">{props.title}</h1>

          <p className="mb-5">{props.subTitle}</p>
          <div className="w-full flex items-center justify-center">
            {props.phone && (
              <h3 className="flex items-center text-lg mr-8">
                <FontAwesomeIcon icon={faPhone as IconProp} className="mr-1" />
                <a href={`tel:${props.phone}`} className="underline">
                  {props.phone}
                </a>
              </h3>
            )}
            {props.email && (
              <h3 className="flex items-center text-lg">
                <FontAwesomeIcon icon={faEnvelope as IconProp} className="mr-1" />
                <a href={`mailto:${props.email}`} className="underline">
                  {props.email}
                </a>
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
