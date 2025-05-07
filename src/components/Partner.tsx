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
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh8apjFI_fYfXpeRnil_74emumzrDOxUgXFeHY7kxxyz-QP61JH6FfR7Nox9amqQlxJjG4-GFcBUGGuPCflFGGFKegZ8mxq6WKHp8r3Tt-AdCK-D6UXZhucdeypBoY8VbW0kluQY1W2AiJhZ5ET_R8sM6C9i_A7SlwKQsryydc6tyTA-a9g_5Hwg-_/s2953/Logo%20Djarum_logocorelCOM.png"
            alt="Partner 1"
            className="object-contain max-h-full w-full"
          />
        </div>

        {/* Partner 2 */}
        <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center h-32 md:h-40 bg-primary p-4">
          <img
            src="https://jasalogocepat.com/wp-content/uploads/2023/09/logo-bumn-tanpa-background-png-5-jasalogocepat-768x204.png"
            alt="Partner 2"
            className="object-contain max-h-full w-full"
          />
        </div>

        {/* Partner 3 */}
        <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center h-32 md:h-40 bg-accent p-4">
          <img
            src="https://cdn.pixabay.com/photo/2022/08/22/03/34/logo-7402631_640.png"
            alt="Partner 3"
            className="object-contain max-h-full w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Partner;
