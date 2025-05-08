// src/components/OrganizeStructure.tsx
import React from 'react';
import { Users, ShieldCheck, Briefcase, Monitor, Headphones, UserCog } from 'lucide-react';

const structure = [
  {
    title: 'Director',
    name: 'John Thomas Edward M, BA., S.IP., MA',
    icon: UserCog,
    color: 'bg-primary text-white',
  },
  {
    title: 'Chief Executive Officer',
    name: 'Adit, Alfian, Arya',
    icon: Users,
    color: 'bg-accent text-white',
  },
  {
    title: 'Cyber Security Division',
    name: 'Alfian',
    icon: ShieldCheck,
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    title: 'Digital Business Division',
    name: 'Adit',
    icon: Briefcase,
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    title: 'Multimedia & Creative Division',
    name: 'Arya',
    icon: Monitor,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Support & Customer Service Team',
    name: 'Alfian',
    icon: Headphones,
    color: 'bg-teal-100 text-teal-700',
  },
];

const OrganizeStructure: React.FC = () => {
  return (
    <section className="py-16 bg-background rounded-xl">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-poppins font-bold text-center text-primary mb-12">
          Organizational Structure
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {structure.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 text-xl ${item.color}`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizeStructure;
