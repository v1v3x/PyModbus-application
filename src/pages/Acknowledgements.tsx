import { Link } from "react-router-dom";

export function Acknowledgements() {
  const credits = [
    {
      category: "Project Guide",
      items: [
        {
          name: "Prof. Pramod Kanjalkar",
          role: "Project Mentor & Guide",
          description: "For their invaluable guidance, continuous support, and inspiring us to push the boundaries of innovation in industrial automation."
        }
      ]
    },
    {
      category: "Core Development",
      items: [
        {
          name: "PyModbus Team",
          role: "Core Library Development",
          description: "For creating and maintaining the foundation of our project"
        }
      ]
    },
    {
      category: "Built With",
      items: [
        { name: "React", role: "UI Library", description: "Powering our interactive user interface" },
        { name: "TypeScript", role: "Programming Language", description: "Ensuring type-safe and maintainable code" },
        { name: "Tailwind CSS", role: "Styling Framework", description: "Creating a beautiful and responsive design" },
        { name: "Firebase", role: "Backend & Authentication", description: "Providing secure and scalable infrastructure" },
        { name: "Vite", role: "Build Tool", description: "Enabling lightning-fast development" },
        { name: "PyModbus", role: "Modbus Communication Library", description: "Enabling reliable industrial communication" }
      ]
    },
    {
      category: "Special Thanks",
      items: [
        {
          name: "Prof. Pramod Kanjalkar",
          role: "Project Mentor & Guide",
          description: "For their invaluable guidance, continuous support, and inspiring us to push the boundaries of innovation in industrial automation."
        },
        {
          name: "Department of Instrumentation & Control Engineering",
          role: "Vishwakarma Institute of Technology, Pune",
          description: "For their valuable support and resources"
        },
        {
          name: "Batch 3 Students",
          role: "Peer Support",
          description: "For their encouragement and collaborative spirit"
        }
      ]
    },
    {
      category: "Dedication",
      items: [
        {
          name: "To Industrial Automation",
          role: "Our Mission",
          description: "Making industrial automation more accessible, efficient, and user-friendly for the next generation of engineers"
        }
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Star background with more stars */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
        <div className="stars absolute inset-0"></div>
      </div>
      
      {/* Scrolling credits container */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 animate-scroll">
          <div className="text-center py-20 transform perspective-[1000px] rotate-x-[25deg]" style={{ transformOrigin: 'center bottom' }}>
            <h1 className="text-6xl font-bold mb-16 text-yellow-400">
              PyModbus UI
            </h1>
            
            {credits.map((section, index) => (
              <div key={index} className="mb-16">
                <h2 className="text-4xl font-bold mb-8 text-blue-400">
                  {section.category}
                </h2>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-200">
                      {item.name}
                    </h3>
                    <p className="text-xl text-gray-400 mb-2">
                      {item.role}
                    </p>
                    {item.description && (
                      <p className="text-lg text-gray-500 max-w-2xl mx-auto italic">
                        "{item.description}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
            
            <div className="mt-16 mb-32">
              <p className="text-xl text-gray-400">
                © 2024 PyModbus UI
              </p>
              <p className="text-lg text-gray-500 mt-4">
                "Bridging the gap between industrial automation and modern web technology"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back button - fixed position */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md text-sm font-medium bg-white/10 text-white hover:bg-white/20 h-10 px-4 py-2 backdrop-blur-sm transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
} 