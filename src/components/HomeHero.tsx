import React from "react";

export const HomeHero: React.FC = () => {
  // Pinata IPFS gateway prefix
  const IPFS_PREFIX = "https://ipfs.io/ipfs/";

  // CIDs for assets
  const logoCID = "bafybeibncsdo66azn7vfahhkqtp724s3zwgabhqouhuhc6nsfhoq7vfjxy";
  const heroImages = [
    "bafybeifnfusfppbjxwdcor25ze77kdfdtcdmo5b6lgngwkvtyb4jufnh3i",
    "bafybeiduwkmyuotsoyuyjygvpqdod2wzdipb7n4doppn5t25cwaer6tbxi",
    "bafybeibq3adsil4k6ugl6z4uay2h5lueyv2khbyt3tsts6c7g45rhvp3ka",
  ];

  return (
    <section className="relative py-16 bg-gray-900 text-white">
      {/* Logo */}
      <div className="text-center mb-12">
        <img
          src={`${IPFS_PREFIX}${logoCID}`}
          alt="FX1 Digital Hubs Logo"
          className="mx-auto w-40 h-40 rounded-full shadow-lg border-4 border-gradient-primary"
        />
      </div>

      {/* Hero Images Carousel */}
      <div className="flex justify-center gap-4 overflow-x-auto px-4">
        {heroImages.map((cid, idx) => (
          <div key={idx} className="flex-shrink-0 w-64 h-64 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${IPFS_PREFIX}${cid}`}
              alt={`FX1 Hero ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Hero Text */}
      <div className="text-center mt-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          FX1 Digital Hubs
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Styling the Blockchain – Explore Onchain Fashion, $FX1_HUBS & $FDH token utilities
        </p>
      </div>
    </section>
  );
};