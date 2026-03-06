import { useEffect } from "react";

const caseStudies = [
  {
    title: "Northstar Pay",
    summary:
      "A fintech dashboard redesigned around trust, progress visibility, and quicker decision-making for finance teams.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    alt: "UX case study showing a modern dashboard interface on a laptop",
  },
  {
    title: "Kinwell Care",
    summary:
      "A calmer appointment journey for patients, with simpler intake steps and a service blueprint for clinic staff.",
  },
  {
    title: "Fieldnote",
    summary:
      "A research repository for product teams that turned scattered interview notes into reusable insight patterns.",
  },
  {
    title: "Luma Home",
    summary:
      "An ecommerce flow tuned for confidence, from product comparison to post-purchase guidance and onboarding.",
  },
];

const strengths = [
  "UX strategy",
  "Research synthesis",
  "Service blueprints",
  "Design systems",
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <header
        className="site-header"
        id="home"
        data-reveal
        style={{ transitionDelay: "40ms" }}
      >
        <a className="brand" href="#home">
          <span>Lena</span> Hart
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="bento-grid">
        <section
          className="card intro-card"
          data-reveal
          style={{ transitionDelay: "90ms" }}
        >
          <p className="eyebrow">UX designer based in Copenhagen</p>
          <h1>
            Designing digital products that feel clear, warm, and human.
          </h1>
          <p className="intro-text">
            Lena Hart helps ambitious teams turn complexity into flows people
            trust. Her work combines research, interaction design, and systems
            thinking to make products easier to navigate and easier to love.
          </p>
          <div className="tag-row" aria-label="Core strengths">
            {strengths.map((strength) => (
              <span key={strength}>{strength}</span>
            ))}
          </div>
        </section>

        <aside
          className="portrait-card"
          data-reveal
          style={{ transitionDelay: "140ms" }}
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
            alt="Portrait of Lena Hart, a UX designer"
          />
        </aside>

        <section
          className="card work-card"
          id="work"
          data-reveal
          style={{ transitionDelay: "190ms" }}
        >
          <div className="card-topline">
            <p className="card-title">Selected work</p>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </div>

          {caseStudies.map((study, index) => (
            <article className="work-item" key={study.title}>
              {study.image ? (
                <img src={study.image} alt={study.alt} className="work-image" />
              ) : null}
              <div className="work-copy">
                <h2>{study.title}</h2>
                <p>{study.summary}</p>
              </div>
              {index < caseStudies.length - 1 ? <div className="work-divider" /> : null}
            </article>
          ))}
        </section>

        <section
          className="card about-card"
          id="about"
          data-reveal
          style={{ transitionDelay: "240ms" }}
        >
          <p>
            Lena is a UX designer with 8 years of experience shaping products
            across health, finance, and lifestyle. She leads with listening,
            maps the service around the screen, and builds visual systems that
            make teams faster after launch, not just before it.
          </p>
        </section>

        <section
          className="card contact-card"
          id="contact"
          data-reveal
          style={{ transitionDelay: "290ms" }}
        >
          <div className="contact-topline">
            <p>Need a designer for a new product, a redesign, or a sharper UX strategy?</p>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div>
            <p className="contact-label">Contact</p>
            <a className="contact-link" href="mailto:lena@lenahart.design">
              lena@lenahart.design
            </a>
          </div>
        </section>

        <section
          className="card socials-card"
          data-reveal
          style={{ transitionDelay: "340ms" }}
        >
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
