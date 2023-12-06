import Image from 'next/image'
import React, { useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { Image as SanityImage } from 'sanity'
import { urlForImage } from '~/lib/sanity.image'

export interface HeroProps {
  image: SanityImage
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
        backgroundImage:
          `url(${urlForImage(props.image).url()})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold uppercase">Trenger du hjelp?</h1>

          <p className="mb-5">
            Ta kontakt med oss så finner vi en god løsning på ditt prosjekt.
          </p>
          <a href="tel:91794681" className="btn btn-accent">Ta Kontakt</a>
        </div>
      </div>
    </div>
  )
}
