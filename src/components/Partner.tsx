import React from 'react';

const Partner: React.FC = ({ partnerRef }: any) => {
  return (
    <main id="partner" ref={partnerRef} className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-poppins font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Our Partners
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Partner 1 */}
        <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center h-32 md:h-40 bg-accent p-4">
          <img
            src="https://media.istockphoto.com/id/1477024718/id/vektor/huruf-j-ikon-dengan-latar-belakang-biru-desain-datar-dengan-bayangan-panjang.jpg?s=612x612&w=0&k=20&c=M_L_rCLHA-rQGw_JgHC7xAU2-2Af7T5aj6pdESEIaNk="
            alt="Partner 1"
            className="object-contain max-h-full w-full"
          />
        </div>

        {/* Partner 2 */}
        <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center h-32 md:h-40 bg-primary p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYS9YH3nmtxsKOQDMIXXsftNxSjY_gcDK0AYO2YfxrsxrBPuF5d7-Kw__XmhbdISkYWow&usqp=CAU"
            alt="Partner 2"
            className="object-contain max-h-full w-full"
          />
        </div>

        {/* Partner 3 */}
        <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center h-32 md:h-40 bg-accent p-4">
          <img
            src="https://media.istockphoto.com/id/1468451190/id/vektor/huruf-u-ikon-dengan-latar-belakang-biru-desain-datar-dengan-bayangan-panjang.jpg?s=170667a&w=0&k=20&c=u5my0YS919ZEBzJSsXEz0PnEj2RfjrhOhlJSs8EiqcA="
            alt="Partner 3"
            className="object-contain max-h-full w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Partner;
