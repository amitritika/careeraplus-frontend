// organisms/CTA.tsx
import { H2, H1 } from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
const CTA: React.FC = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="space-y-8">
        <H2 className="text-white">
          Ready to Build Your Dream Career?
        </H2>
        <H1 className="text-blue-100 max-w-2xl mx-auto">
          Join thousands of professionals who have successfully transformed their careers 
          with CareerPlus. Start your journey today.
        </H1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline-primary" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
            View Examples
          </Button>
        </div>
        <p className="text-blue-200 text-sm">
          Need help? Email us at{" "}
          <a href="mailto:contact@careeraplus.in" className="text-white underline hover:no-underline">
            contact@careeraplus.in
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default CTA;