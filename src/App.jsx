import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Signal Atlas",
    category: "B2B SaaS platform",
    summary:
      "A planning workspace that connected customer feedback, ops metrics, and release decisions so product teams could move from signal to shipped work in one loop.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    accent: "coral",
  },
  {
    title: "Northline OS",
    category: "Internal operations stack",
    summary:
      "A logistics dashboard rebuilt around shared data contracts, reducing handoffs across support, warehouse, and finance teams.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    accent: "teal",
  },
  {
    title: "Cinder Health",
    category: "Consumer scheduling product",
    summary:
      "A calmer booking experience with routing logic, reminders, and admin tooling designed as one system instead of separate features.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    accent: "gold",
  },
];

const principles = [
  "Map the system before polishing a screen.",
  "Design the happy path and the operational reality behind it.",
  "Treat data, workflows, and interface language as one product surface.",
];

const timeline = [
  "Product strategy paired with delivery planning",
  "Frontend systems in React with crisp interaction design",
  "Backend integration thinking across APIs, queues, and analytics",
  "Cross-functional rituals that keep execution aligned end-to-end",
];

function SystemField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pointer = { x: 0, y: 0, active: false };

    const particleCount = 34;
    const particles = Array.from({ length: particleCount }, (_, index) => ({
      x: 0,
      y: 0,
      vx: ((index % 5) - 2) * 0.18,
      vy: ((index % 7) - 3) * 0.14,
      radius: index % 3 === 0 ? 3.8 : 2.4,
      side: index < particleCount / 2 ? "left" : "right",
    }));

    const getBand = (side) => {
      const bandWidth = width * 0.18;

      if (side === "left") {
        return { min: 0, max: bandWidth };
      }

      return { min: width - bandWidth, max: width };
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles.forEach((particle, index) => {
        const band = getBand(particle.side);
        const lane = index % (particleCount / 2);
        particle.x = band.min + 20 + ((lane * 31) % Math.max(48, band.max - band.min - 40));
        particle.y = 30 + ((lane * 47) % Math.max(80, height - 60));
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const leftGradient = context.createLinearGradient(0, 0, width * 0.22, 0);
      leftGradient.addColorStop(0, "rgba(167, 208, 193, 0.24)");
      leftGradient.addColorStop(1, "rgba(167, 208, 193, 0)");
      context.fillStyle = leftGradient;
      context.fillRect(0, 0, width * 0.22, height);

      const rightGradient = context.createLinearGradient(width, 0, width * 0.78, 0);
      rightGradient.addColorStop(0, "rgba(238, 125, 104, 0.18)");
      rightGradient.addColorStop(1, "rgba(238, 125, 104, 0)");
      context.fillStyle = rightGradient;
      context.fillRect(width * 0.78, 0, width * 0.22, height);

      particles.forEach((particle) => {
        const band = getBand(particle.side);
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < band.min + 8 || particle.x > band.max - 8) {
          particle.vx *= -1;
        }

        if (particle.y < 10 || particle.y > height - 10) {
          particle.vy *= -1;
        }
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          if (a.side !== b.side) {
            continue;
          }
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            const opacity = 1 - distance / 132;
            context.strokeStyle = a.side === "left"
              ? `rgba(47, 110, 95, ${opacity * 0.26})`
              : `rgba(238, 125, 104, ${opacity * 0.22})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      particles.forEach((particle, index) => {
        const activeBand = getBand(particle.side);
        const canPull =
          pointer.active &&
          pointer.x >= activeBand.min &&
          pointer.x <= activeBand.max;
        const pullX = canPull ? (pointer.x - particle.x) * 0.0008 : 0;
        const pullY = canPull ? (pointer.y - particle.y) * 0.0008 : 0;

        particle.vx += pullX;
        particle.vy += pullY;
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        context.beginPath();
        context.fillStyle = particle.side === "left" ? "#6a9c90" : "#e98a76";
        context.globalAlpha = index % 4 === 0 ? 0.92 : 0.76;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        active: true,
      };
    };

    const handleLeave = () => {
      pointer.active = false;
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="system-field" aria-hidden="true" />;
}

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
      { threshold: 0.2 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <SystemField />
      <header className="site-header">
        <a className="brand" href="#home">
          Joe Smith
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Full stack developer • systems thinker</p>
            <h1>
              I turn messy product constraints into calm, end-to-end software
              systems.
            </h1>
            <p className="hero-text">
              Joe Smith designs and builds web products that connect interface,
              workflow, and infrastructure. The work spans discovery, product
              logic, frontend craft, and the operational details that make
              systems hold up in the real world.
            </p>
            <div className="hero-cluster" aria-label="Key strengths">
              <span>Product maps</span>
              <span>Flow design</span>
              <span>Frontend systems</span>
              <span>API thinking</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore projects
              </a>
              <a className="button button-secondary" href="#contact">
                Start a conversation
              </a>
            </div>
            <div className="hero-metrics">
              <article>
                <strong>9+</strong>
                <span>years shaping product systems</span>
              </article>
              <article>
                <strong>0 to 1</strong>
                <span>from concept maps to launch detail</span>
              </article>
              <article>
                <strong>4 layers</strong>
                <span>strategy, UI, APIs, operations</span>
              </article>
            </div>
          </div>

          <aside className="hero-panel" data-reveal>
            <div className="mosaic-card mosaic-banner">
              <div className="mosaic-inner">
                <h3>End-to-end product systems without the usual chaos.</h3>
                <p>
                  From product framing to frontend polish and backend flow, Joe
                  builds connected systems that are easier to operate and scale.
                </p>
              </div>
            </div>

            <div className="mosaic-side">
              <article className="note-card">
                <span>Current focus</span>
                <p>
                  Designing the user-facing layer and the operational layer as
                  one product, not two separate efforts.
                </p>
              </article>

              <article className="feature-matrix">
                <span>Core strengths</span>
                <div className="feature-grid">
                  <div><i />Flows</div>
                  <div><i />UI systems</div>
                  <div><i />APIs</div>
                  <div><i />Dashboards</div>
                  <div><i />Ops tools</div>
                  <div><i />Scale</div>
                </div>
              </article>
            </div>

            <div className="portrait-card">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80"
                alt="Portrait of Joe Smith"
              />
            </div>

            <article className="signal-card quote-card">
              <span>How Joe works</span>
              <p>
                “The best product work happens when the interface, data model,
                and team workflow all support the same outcome.”
              </p>
              <strong>System-first, delivery-minded.</strong>
            </article>

            <div className="mosaic-card mosaic-strip">
              <article>
                <strong>Clear product flows</strong>
                <p>Reduce friction by designing intent, state, and handoff together.</p>
              </article>
              <article>
                <strong>UI with operational depth</strong>
                <p>Frontend decisions stay grounded in real backend and process needs.</p>
              </article>
              <article>
                <strong>Calmer launches</strong>
                <p>Ship with fewer blind spots by treating rollout as part of the product.</p>
              </article>
            </div>
          </aside>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Selected projects</p>
            <h2>Product systems built across the full stack.</h2>
            <p>
              Each project started with a business bottleneck and ended as a
              clearer system: better tools, fewer blind spots, smoother handoffs.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card accent-${project.accent}`}
                data-reveal
                key={project.title}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img src={project.image} alt={project.title} />
                <div className="project-body">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-grid">
            <div className="about-copy" data-reveal>
              <p className="eyebrow">About Joe</p>
              <h2>System thinking with a builder’s bias.</h2>
              <p>
                Joe works best in environments where product ambition meets
                operational complexity. He likes uncovering the real bottleneck,
                then designing the data model, interfaces, and delivery plan as
                one coherent system.
              </p>
            </div>

            <div className="principles-card" data-reveal>
              <span className="card-label">Working principles</span>
              <ul>
                {principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="timeline-card" data-reveal>
            <span className="card-label">Capabilities across the stack</span>
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <div className="timeline-item" key={item}>
                  <span>{`0${index + 1}`}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Need someone who can connect product ideas to execution?</h2>
            <p>
              Joe is available for product-focused full stack roles, consulting,
              and selective freelance work.
            </p>
            <div className="contact-links">
              <a href="mailto:joe@joesmith.dev">joe@joesmith.dev</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
