import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Building <span className="text-blue-600">Digital Experiences</span> <br />
          that matter.
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl mb-8">
          I'm Rayhan, a Full-stack Software Engineer from Bangladesh. I specialize in building
          modern, high-performance web applications with a focus on user experience and animation.
        </p>
        <div className="flex gap-4">
          <button className="bg-foreground text-background px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
            View Projects
          </button>
          <button className="border border-border px-8 py-4 rounded-full font-bold hover:bg-foreground/5 transition-colors">
            Contact Me
          </button>
        </div>
      </section>

      <section id="about" className="py-24 border-t border-border/40">
        <h2 className="text-3xl font-bold mb-12">About Me</h2>
        <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl">
          I love turning complex problems into simple, beautiful and intuitive designs. 
          When I'm not coding, you'll find me exploring new technologies or sharing my knowledge 
          with the developer community.
        </p>
      </section>

      <div className="h-[100vh]" /> {/* Just for scrolling demo */}
    </div>
  );
}
