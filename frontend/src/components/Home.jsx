import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowRight, Mic, Globe, Shield, Sparkles, CheckCircle, 
  Users, GraduationCap, Briefcase, Star, ChevronDown, ChevronUp,
  Github, Twitter, Linkedin, Mail
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 text-indigo-600 font-medium text-sm mb-8 animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>The Future of Voice AI is Here</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight animate-fade-in">
          Your Voice, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Limitless Power.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Experience natural, fluid conversations with CASK. The intelligent voice assistant that understands you in English, Hindi, and Telugu.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/assistant");
              } else {
                navigate("/signup");
              }
            }}
            className="group relative px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:bg-gray-800 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            onClick={() => navigate("/about")}
            className="px-8 py-4 bg-white text-gray-700 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative border-y border-white/50 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="99%" label="Accuracy" />
            <StatItem number="3+" label="Languages" />
            <StatItem number="24/7" label="Availability" />
            <StatItem number="0s" label="Latency" />
          </div>
        </div>
      </div>

      {/* About Preview Section */}
      <div className="relative container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              More Than Just a <br />
              <span className="text-indigo-600">Voice Assistant</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              CASK isn't just about answering questions. It's about breaking down language barriers and making technology accessible to everyone. Whether you speak English, Hindi, or Telugu, CASK is ready to listen and help.
            </p>
            <ul className="space-y-4">
              <CheckItem text="Real-time translation and understanding" />
              <CheckItem text="Context-aware conversations" />
              <CheckItem text="Seamless multi-language switching" />
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
            <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">U</div>
                  <div className="bg-indigo-50 p-4 rounded-2xl rounded-tl-none text-gray-700 text-sm">
                    Namaste! Kaise ho aap?
                  </div>
                </div>
                <div className="flex gap-4 items-start flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">AI</div>
                  <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tr-none text-sm">
                    Main theek hoon! How can I help you today?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a seamless voice interaction experience.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Mic className="w-8 h-8 text-indigo-600" />}
            title="Natural Voice"
            description="Speak naturally. CASK understands context, nuance, and intent just like a human."
            delay="0s"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-purple-600" />}
            title="Multi-Lingual"
            description="Breaking barriers with fluent support for English, Hindi, and Telugu."
            delay="0.1s"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-pink-600" />}
            title="Private & Secure"
            description="Your conversations are encrypted and private. We prioritize your data security."
            delay="0.2s"
          />
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="relative bg-white/40 backdrop-blur-sm py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who is CASK For?</h2>
            <p className="text-gray-600">Designed to empower everyone, everywhere.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <UseCaseCard 
              icon={<GraduationCap className="w-8 h-8 text-blue-600" />}
              title="Students"
              description="Research topics, practice languages, and get instant answers for your studies."
            />
            <UseCaseCard 
              icon={<Briefcase className="w-8 h-8 text-indigo-600" />}
              title="Professionals"
              description="Draft emails, brainstorm ideas, and boost productivity with voice commands."
            />
            <UseCaseCard 
              icon={<Users className="w-8 h-8 text-pink-600" />}
              title="Everyone"
              description="Daily assistance, reminders, and casual conversation in your native language."
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Users</h2>
          <p className="text-gray-600">See what our community has to say.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Finally, a voice assistant that actually understands my Hindi accent! It's a game changer."
            author="Rahul Verma"
            role="Student"
            rating={5}
          />
          <TestimonialCard 
            quote="I use CASK daily for drafting emails. The multi-lingual support is incredibly smooth."
            author="Priya Reddy"
            role="Content Creator"
            rating={5}
          />
          <TestimonialCard 
            quote="The interface is beautiful and the responses are lightning fast. Highly recommended!"
            author="Alex Thompson"
            role="Developer"
            rating={4}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative container mx-auto px-6 py-24 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          <FAQItem 
            question="Is CASK free to use?"
            answer="Yes! CASK offers a free tier for everyone. We also have premium plans for power users who need more usage limits."
          />
          <FAQItem 
            question="What languages does CASK support?"
            answer="Currently, CASK fully supports English (India/UK/US), Hindi, and Telugu. We are working on adding more regional languages soon."
          />
          <FAQItem 
            question="Is my voice data recorded?"
            answer="We value your privacy. Your voice data is processed in real-time and is not stored permanently on our servers."
          />
        </div>
      </div>

      {/* CTA Section - Only for non-logged in users */}
      {!localStorage.getItem("token") && (
        <div className="relative container mx-auto px-6 py-24">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Future?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join thousands of users who are already using CASK to supercharge their daily interactions.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">CASK</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Empowering the world through voice. Breaking language barriers one conversation at a time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                <SocialIcon icon={<Github className="w-5 h-5" />} />
                <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
                <SocialIcon icon={<Mail className="w-5 h-5" />} />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CASK AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Helper Components ---

function FeatureCard({ icon, title, description, delay }) {
  return (
    <div 
      className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:-translate-y-1 group"
      style={{ animationDelay: delay }}
    >
      <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
        {number}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-gray-700">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function UseCaseCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 text-center group">
      <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role, rating }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-600 mb-6 flex-1 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          {author[0]}
        </div>
        <div>
          <div className="font-bold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
      {icon}
    </a>
  );
}
