import { Upload, Sparkles, FileText, LoaderPinwheel } from "lucide-react";
import { Motionh2, Motionp, MotionSection, MotionDiv } from "@/components/common/motion-wrapper";
import { containerVariants } from "@/utils/constants";

const steps = [
  {
    number: "01",
    title: "Upload",
    description: "Upload your PDF file to our safe site",
    icon: Upload,
    label: "Upload PDF",
  },
  {
    number: "02", 
    title: "Process",
    description: "Our AI reads and finds the main points",
    icon: LoaderPinwheel,
    label: "AI Processing",
  },
  {
    number: "03",
    title: "Get Summary",
    description: "Get your short summary in seconds",
    icon: FileText,
    label: "Get Summary",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Motionh2 
          initial={{y: 20, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          className="text-base sm:text-lg font-bold text-primary mb-6">HOW IT WORKS</Motionh2>
          <Motionp initial={{y: 20, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 0.5, delay: 0.2}} className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Fast, and Smart
          </Motionp>
          <Motionp className="mt-6 text-lg leading-8 text-muted-foreground">
            Turn that PDF into a short summary in just three steps!
          </Motionp>
        </div>

        <MotionSection variants={containerVariants} className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, idx) => (
              <MotionDiv 
                key={step.number} 
                initial={{y: 50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: idx*0.1}}
                className="text-center"
              >
                <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card shadow-sm border border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 text-primary">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
