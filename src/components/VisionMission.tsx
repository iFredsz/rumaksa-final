// src/components/VisionMission.tsx
import React from 'react';

const VisionMission: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-accent to-primary rounded-lg shadow-xl max-w-4xl mx-auto mt-16 mb-8">
      <h2 className="text-3xl font-poppins font-bold text-center text-white mb-6">
        Our Vision & Mission
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-6">
          <div>
            <p className="text-xl font-semibold text-primary">Vision</p>
            <p className="text-lg text-foreground/80">
              At PT Rumah Karya Semesta, our vision is to create innovative solutions that not only meet today's technological needs but also shape the future of technology and digital transformation. We believe in driving change through continuous innovation, enabling businesses to harness the full potential of the digital world and beyond.
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold text-primary">Mission</p>
            <p className="text-lg text-foreground/80">
              Our mission is to deliver top-tier services and products that empower businesses to thrive in the digital age. We focus on providing tailored solutions in cybersecurity, digital business, and multimedia technology, helping our clients stay ahead in a rapidly evolving marketplace. Our commitment to excellence, security, and customer satisfaction is the core of everything we do.
            </p>
            <p className="mt-4 text-lg text-foreground/80">
              We strive to foster a partnership with our clients, understanding their unique needs and providing solutions that drive growth, enhance efficiency, and protect their digital assets. Through collaborative efforts and a passion for progress, we aim to make a meaningful impact on the businesses we serve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
