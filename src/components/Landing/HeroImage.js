import React from 'react';
import LazyHero from 'react-lazy-hero';

const background =
  'https://images.unsplash.com/photo-1546530967-21531b891dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const HeroImage = () => {
  return (
    <div>
      <LazyHero
        imageSrc={background}
        isCentered={true}
        isFixed={false}
        minHeight="65vh"
        opacity={.1}
        parallaxOffset={50}
        style={{ overflow: 'hidden' }}
        transitionDuration={600}
        transitionTimingFunction="ease-in-out"
      >
        <h1><em>Turismo</em></h1>
      </LazyHero>
    </div>
  );
};

export default HeroImage;
