import React from 'react';
import LazyHero from 'react-lazy-hero';

const background =
  'https://images.unsplash.com/photo-1546530967-21531b891dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const HeroImage = (search) => {
  console.log(search)
  return (
    <div>
      <LazyHero
        imageSrc={
          search.image
            ? search.image.urls.regular
            : background
        }
        isCentered={true}
        isFixed={false}
        minHeight="65vh"
        opacity={0.1}
        parallaxOffset={50}
        style={{ overflow: 'hidden' }}
        transitionDuration={600}
        transitionTimingFunction="ease-in-out"
      ></LazyHero>
    </div>
  );
};

export default HeroImage;
