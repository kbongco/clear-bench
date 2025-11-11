import { useState } from "react";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: '🚀',
      title: 'Automated Workflows',
      description: 'Set up custom automation rules that trigger actions based on your team\'s needs. Save hours every week.',
      color: 'bg-purple-100'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Get intelligent suggestions, generate reports, and identify bottlenecks automatically with built-in AI.',
      color: 'bg-blue-100'
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Track progress, measure productivity, and make data-driven decisions with beautiful dashboards.',
      color: 'bg-green-100'
    },
    {
      icon: '🔗',
      title: '100+ Integrations',
      description: 'Connect with the tools you already use. Slack, GitHub, Figma, and many more.',
      color: 'bg-yellow-100'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SSO, and compliance with SOC 2, GDPR, and HIPAA standards.',
      color: 'bg-red-100'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Comments, mentions, file sharing, and video calls all in one place. Keep everyone aligned.',
      color: 'bg-pink-100'
    }
  ];

  // const testimonials = [
  //   {
  //     quote: 'ProductFlow reduced our project delivery time by 40%. The automation features alone are worth the price. Best investment we made this year.',
  //     author: 'Sarah Chen',
  //     role: 'Product Manager, TechCorp',
  //     color: 'bg-purple-200'
  //   },
  //   {
  //     quote: 'Finally, a tool that our entire team actually enjoys using. The interface is intuitive and the AI suggestions are incredibly helpful.',
  //     author: 'Marcus Johnson',
  //     role: 'CEO, StartupXYZ',
  //     color: 'bg-blue-200'
  //   },
  //   {
  //     quote: 'We\'ve tried every project management tool out there. ProductFlow is the only one that scaled with us from 5 to 50 team members seamlessly.',
  //     author: 'Emily Rodriguez',
  //     role: 'Operations Director, GrowthCo',
  //     color: 'bg-green-200'
  //   }
  // ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams',
      price: '$29',
      period: '/month',
      features: [
        'Up to 10 team members',
        '5 GB storage',
        'Basic integrations',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing teams',
      price: '$79',
      period: '/month',
      features: [
        'Up to 50 team members',
        '100 GB storage',
        'All integrations',
        'Priority support',
        'Advanced analytics',
        'AI assistant'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Custom integrations',
        '24/7 phone support',
        'Dedicated account manager',
        'Advanced security'
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What is ClearBench?",
      answer:
        "ClearBench is a lightweight, modern LIMS (Laboratory Information Management System) designed to help labs track samples, tests, and results with clarity. It provides a centralized, web-based workspace where scientists, technicians, and managers can submit samples, monitor status, and maintain organized records without spreadsheet chaos."
    },
    {
      question: "Why not just use spreadsheets?",
      answer:
        "Spreadsheets are great for quick tasks — but they don’t scale well for sample tracking. Labs deal with multiple experiments, metadata, and handoffs. That leads to version confusion, lost information, and mistakes. ClearBench stores sample data in a structured database, maintains clear traceability, and provides one reliable source of truth for all submissions and test records."
    },
    {
      question: "Who built ClearBench?",
      answer:
        "ClearBench is built by a software engineer with a background in food science and laboratory work. I've personally experienced the pain of scattered spreadsheets, missing sample notes, and miscommunication between teams — so I designed this tool for labs that want simplicity, transparency, and a better workflow."
    },
    {
      question: "Can I try the live version?",
      answer:
        "ClearBench is actively under development as an MVP. If you're a recruiter, hiring manager, or engineer curious about the technical implementation, the code and demo links are available throughout this site. If you're a scientist or developer interested in collaborating or giving feedback, feel free to reach out!"
    }
  ];


  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-cyan-600 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Keep track of your samples without excel sheets
          </h1>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            ClearBench is a LiMS (Laboratory Information Management system) built by a former
            laboratory technician to help keep track of samples going in and out of the lab
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition shadow-lg">
              Start Free Trial →
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition">
              Github Code
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition">
              Learn more about the dev
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 bg-white rounded-xl shadow-2xl p-4 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600 font-semibold">Product Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Problem/Solution */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stop using spreadsheets to manage your lab workflows</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spreadsheets shouldn't be used as a database and a way to keep track of samples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-red-500 text-3xl mb-4">❌</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Before ClearBench</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Samples misplaced or delayed</li>
                <li>• Endless spreadsheets and manual tracking</li>
                <li>• Scientists waiting on updates and chasing status</li>
                <li>• Lab techs overwhelmed and taking the blame</li>
                <li>• Miscommunication, bottlenecks, and missed deadlines</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-purple-500">
              <div className="text-green-500 text-3xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">With ClearBench</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Clear sample tracking & audit trails</li>
                <li>• Centralized, structured data (no spreadsheet drama)</li>
                <li>• Real-time status for scientists</li>
                <li>• Workflows that support lab techs — not stress them</li>
                <li>• Predictable timelines & clean handoffs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Move Fast</h2>
            <p className="text-xl text-gray-600">Powerful features designed for modern teams</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg">
                <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who is this for?</h2>
            <p className="text-xl text-gray-600">This project began as a portfolio-driven passion build — and is maturing toward a scalable, real-world lab workflow platform.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-red-500 text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">ClearBench is for you if....</h3>
              <ul className="space-y-2 text-gray-600 mt-4">
                <li>• Research labs managing multiple sample lines</li>
                <li>• Food & microbiology labs tracking QA/QC testing</li>
                <li>• Biotech & early-stage R&amp;D teams needing traceability</li>
                <li>• Academic research groups coordinating experiments</li>
                <li>• Teams moving away from spreadsheets or paper logs</li>
                <li>• Solo scientists and small labs who want clarity without enterprise LIMS complexity</li>
                <li>• You're interested in trying an early-stage tool built by a solo developer preparing to scale</li>
                

              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-purple-500">
              <div className="text-green-500 text-3xl mb-4">❌</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">ClearBench is not for you if..</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• You require full GMP/GLP validated workflows</li>
                <li>• You need 21 CFR Part 11 compliant audit trails & e-signatures</li>
                <li>• You expect automated instrument + barcode system integration</li>
                <li>• You need enterprise-level support, SLAs, and onboarding</li>
                <li>• You require multi-site governance & advanced permissioning</li>
                <li>• You want a 1:1 replacement for enterprise LIMS platforms</li>
                <li>• You prefer fully-established products over fast-evolving MVPs</li>
                <li>• You're not interested in trying an early-stage tool built by a solo developer preparing to scale</li>

              </ul>
            </div>
          </div>
        </div>
      </section>

{/* Build Status / Roadmap */}
<section id="progress" className="py-20 px-4 bg-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">
      Actively Building — No Pricing Yet
    </h2>
    <p className="text-xl text-gray-600 mb-12">
      ClearBench is a real-world lab workflow tool in active development — built solo, built to scale.
      Instead of pricing tiers, I'm focused on shipping features, refining UX, and validating real lab workflows.
    </p>

    {/* Current Features */}
    <div className="text-left mb-10">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">✅ Current Features</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• Sample intake & tracking</li>
        <li>• Scientist & lab tech workflows</li>
        <li>• Result logging structure</li>
        <li>• Modern full-stack architecture (FastAPI + React + Postgres)</li>
      </ul>
    </div>

    {/* In Progress */}
    <div className="text-left mb-10">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">🚧 In Progress</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• Audit trails & user permissions</li>
        <li>• Turnaround time tracking</li>
        <li>• Lab-friendly reporting & export</li>
        <li>• Deployment + CI/CD scalability</li>
      </ul>
    </div>

    {/* Future Goals */}
    <div className="text-left mb-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌱 Future Goals</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• Notifications & automations</li>
        <li>• Instrument & ELN integrations</li>
        <li>• Collaborative roles & audit workflows</li>
      </ul>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#"
        className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
      >
        View Roadmap
      </a>
      <a
        href="#"
        className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
      >
        See Source Code
      </a>
    </div>

    <p className="text-gray-500 text-sm mt-6">
      🚀 Transparent build — this is a working product in motion, not marketing vapor.
    </p>
  </div>
</section>


      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to try it out?</h2>
          <p className="text-xl text-purple-100 mb-8">Interested in ClearBench? Want to check it out locally?</p>
          <a href='https://github.com/kbongco/clear-bench'>
            <button className="bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition shadow-lg">
              Checkout the code
            </button>
          </a>
          <p className="text-purple-100 mt-4 text-sm">Live and deployed site will be updated once MVP is completed</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">ProductFlow</div>
            <p className="text-gray-400">Streamline your workflow and ship faster.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 ProductFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}