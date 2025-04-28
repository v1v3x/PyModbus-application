import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";

export function Index() {
  const features = [
    {
      title: "Easy Configuration",
      description: "Set up your Modbus connections with a simple and intuitive interface.",
      icon: "⚙️",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor your Modbus devices in real-time with live data updates.",
      icon: "📊",
    },
    {
      title: "Secure Authentication",
      description: "Keep your connections secure with Firebase Authentication.",
      icon: "🔒",
    },
    {
      title: "Data Logging",
      description: "Log and analyze your Modbus data over time.",
      icon: "📝",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Get Started Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start monitoring and controlling your Modbus devices with our modern web interface.
            Set up your first connection in minutes.
          </p>
          <a
            href="/connections"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Create Connection
          </a>
        </div>
      </section>
    </div>
  );
} 