'use client'

import React, { useEffect, useRef, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper } from 'swiper/react'

interface SwipperProps {
  children: React.ReactNode
  height?: string
}

export const SwipperWrapper: React.FC<SwipperProps> = ({
  children,
  height,
}) => {
  const [slidesPerView, setSlidesPerView] = useState(1.5)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        if (width < 500) {
          setSlidesPerView(1)
        } else if (width < 900) {
          setSlidesPerView(1.5)
        } else if (width < 1200) {
          setSlidesPerView(2.5)
        } /* else if (width < 1324) {
          setSlidesPerView(2.5)
        } */ else if (width < 1500) {
          setSlidesPerView(3.5)
        } else {
          setSlidesPerView(4.5)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <Swiper
        modules={[Navigation]}
        className={`h-[${height}px] w-full`}
        slidesPerView={slidesPerView}
        spaceBetween={20}
      >
        {children}
      </Swiper>
    </div>
  )
}
