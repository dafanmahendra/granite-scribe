import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Users } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: FileText,
      title: "Professional Cover Letters",
      description: "Generate tailored, professional cover letters that highlight your strengths and match the job requirements perfectly."
    },
    {
      icon: TrendingUp,
      title: "Boost Your Confidence",
      description: "Stand out from the competition with compelling, well-structured cover letters that showcase your unique value proposition."
    },
    {
      icon: Users,
      title: "Support Economic Growth",
      description: "Help achieve SDG #8 by improving employment opportunities and contributing to decent work for economic growth."
    }
  ];

  return (
    <section className="py-20 px-4 bg-background-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Why Choose AI Job Assistant?
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Leverage the power of artificial intelligence to create compelling cover letters 
            that open doors to your dream career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card-elevated border-border-subtle"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted text-center leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;