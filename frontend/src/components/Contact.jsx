import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ContactCard
            icon={<Mail className="w-6 h-6 text-indigo-600" />}
            title="Email"
            info="support@cask.ai"
            subInfo="24/7 Support"
          />
          <ContactCard
            icon={<Phone className="w-6 h-6 text-purple-600" />}
            title="Phone"
            info="+91 98765 43210"
            subInfo="Mon-Fri, 9am-6pm"
          />
          <ContactCard
            icon={<MapPin className="w-6 h-6 text-pink-600" />}
            title="Office"
            info="Tech Park, Hyderabad"
            subInfo="Telangana, India"
          />
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have a specific inquiry?</h2>
          <p className="text-gray-600 mb-8">
            Our team is ready to help you with any questions about our enterprise solutions or partnerships.
          </p>
          <a
            href="mailto:contact@cask.ai"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Send us an Email
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, info, subInfo }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
      <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-indigo-600 font-medium mb-1">{info}</p>
      <p className="text-sm text-gray-500">{subInfo}</p>
    </div>
  );
}
