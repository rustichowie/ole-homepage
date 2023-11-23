import Image from 'next/image'
import React from 'react'
import { Image as SanityImage } from 'sanity'

import { urlForImage } from '~/lib/sanity.image'

export interface HighlightedSectionProps {
  color: 'primary' | 'secondary'
  imagePlacement: 'left' | 'right'
  image: SanityImage
  title: string
  description?: string
}

export default function HighlightedSection({
  color,
  description,
  image,
  imagePlacement,
  title,
}: HighlightedSectionProps) {
  return (
    <div
      className={`card lg:w-full rounded-none ${imagePlacement === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:max-h-[26rem] ${
        color === 'primary' ? 'bg-accent text-neutral-content' : 'bg-base-200'
      } min-h-0`}
    >
      <div className=''>
        <img alt="alt" src={urlForImage(image).width(800).height(600).url()} />
      </div>
      <div className="card-body lg:basis-full">
        <h2 className="card-title lg:text-2xl">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
