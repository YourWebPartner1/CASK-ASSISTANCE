import { 
  Target, Lightbulb, Users, Heart, Shield, Globe, 
  Award, Zap, CheckCircle, ArrowRight, Mail, Twitter, Linkedin 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans">
      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Bridging the World Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Intelligent Voice
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            We are on a mission to make technology accessible to everyone, regardless of language or location.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <InfoCard 
            icon={<Target className="w-8 h-8 text-indigo-600" />}
            title="Our Mission"
            description="To democratize access to AI through natural, intuitive voice interactions in multiple languages, making technology accessible to everyone, regardless of their native tongue."
            delay="0.2s"
          />
          <InfoCard 
            icon={<Lightbulb className="w-8 h-8 text-purple-600" />}
            title="Our Vision"
            description="A world where language is no longer a barrier to knowledge, connection, and opportunity. We envision a future where anyone can interact with technology as naturally as talking to a friend."
            delay="0.3s"
          />
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white/50 backdrop-blur-sm py-20 border-y border-white/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                CASK began as a simple idea during a late-night hackathon: "What if my grandmother could use the internet just by talking to it in her native language?"
              </p>
              <p>
                That question sparked a journey. We realized that while AI was advancing rapidly, it was leaving behind billions of people who didn't speak English or weren't tech-savvy. We set out to build a voice assistant that wasn't just smart, but also culturally aware and linguistically diverse.
              </p>
              <p>
                Today, CASK serves thousands of users, breaking down barriers one conversation at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-600">Empowering users with cutting-edge voice technology.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureItem 
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Instant Voice AI"
            description="Real-time speech recognition and synthesis with near-zero latency."
          />
          <FeatureItem 
            icon={<Globe className="w-6 h-6 text-blue-500" />}
            title="Multi-Lingual Support"
            description="Native support for English, Hindi, and Telugu, with more languages coming soon."
          />
          <FeatureItem 
            icon={<Shield className="w-6 h-6 text-green-500" />}
            title="Secure Processing"
            description="Enterprise-grade encryption ensures your conversations remain private."
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400">The principles that guide every decision we make.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <ValueCard 
              icon={<Award className="w-8 h-8 text-indigo-400" />}
              title="Quality"
              description="We don't settle for 'good enough'. We strive for excellence in every interaction."
            />
            <ValueCard 
              icon={<Shield className="w-8 h-8 text-green-400" />}
              title="Trust"
              description="Your privacy and security are paramount. We build systems you can rely on."
            />
            <ValueCard 
              icon={<Lightbulb className="w-8 h-8 text-yellow-400" />}
              title="Innovation"
              description="We constantly push the boundaries of what's possible with Voice AI."
            />
            <ValueCard 
              icon={<Heart className="w-8 h-8 text-red-400" />}
              title="User-First"
              description="We design for people, not just for engineers. Simplicity is key."
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="container mx-auto px-6 py-20 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat number="10k+" label="Active Users" />
          <Stat number="5M+" label="Conversations" />
          <Stat number="99.9%" label="Uptime" />
          <Stat number="3" label="Core Languages" />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose CASK?</h2>
            <div className="space-y-4">
              <CheckItem text="Native language understanding, not just translation." />
              <CheckItem text="Privacy-first architecture. Your voice is yours." />
              <CheckItem text="Simple, intuitive interface designed for everyone." />
              <CheckItem text="Constant updates and improvements based on user feedback." />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-3xl">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">C</div>
                <div>
                  <div className="font-bold text-gray-900">CASK AI</div>
                  <div className="text-sm text-gray-500">Always here to help</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"I can help you draft that email, explain complex topics, or just chat about your day - in the language you're most comfortable with."</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Join the Voice Revolution</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Experience the power of a voice assistant that truly understands you.
          </p>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/assistant");
              } else {
                navigate("/signup");
              }
            }}
            className="bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Start Using CASK
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
          <div className="flex justify-center gap-8">
            <SocialLink icon={<Mail className="w-5 h-5" />} label="support@cask.ai" />
            <SocialLink icon={<Twitter className="w-5 h-5" />} label="@cask_ai" />
            <SocialLink icon={<Linkedin className="w-5 h-5" />} label="CASK Technologies" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function InfoCard({ icon, title, description, delay }) {
  return (
    <div 
      className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-all"
      style={{ animationDelay: delay }}
    >
      <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm text-indigo-600">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="text-center p-6 rounded-2xl hover:bg-white/50 transition-colors">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold text-indigo-600 mb-2">{number}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
      {icon}
      <span>{label}</span>
    </a>
  );
}
