import { useState } from "react"
import magazine from "./magazine.json"

const image = (file: string) => `https://ezeta.it/cdn/shop/files/${file}`
const aboutPhotos = [
  "ezeta_latina_sibo_24-25_FED03357.jpg?v=1734018735",
  "ezeta_storytelling_Mosaici-Naturalistic.jpg?v=1733183528",
  "3_e8e3305b-7e28-4eac-9130-4c792c631ac2.jpg?v=1720446692",
]

export default function BrandPages({ path }: { path: string }) {
  const [sent, setSent] = useState(false)
  if (path === "/en/pages/about-us")
    return (
      <div className="brand-about">
        <section className="about-hero">
          <h1 className="sr-only">About Yaksha Sports</h1>
          <img
            src={image("HEADER.png?v=1750841670&width=2400")}
            alt="Michele and Enzo, the founders of Yaksha Sports"
          />
          <a
            href="#two-minds"
            className="next-section"
            aria-label="Navigate to next section"
          >
            ↓
          </a>
        </section>
        <section className="brand-statement" id="two-minds">
          <h2>Two minds. One mission.</h2>
          <p>
            YAKSHA SPORTS IS A COMPANY MADE UP OF PEOPLE, CREATIVE AND INNOVATIVE MINDS
            READY TO REVOLUTIONIZE THE WAY SPORTSWEAR AND FOOTBALL KITS ARE
            DESIGNED AND EXPERIENCED WORLDWIDE.
          </p>
        </section>
        <div className="brand-photo-grid">
          {aboutPhotos.map((file, i) => (
            <img
              key={file}
              src={`${image(file)}&width=1000`}
              loading="lazy"
              alt={
                [
                  "Yaksha Sports Latina campaign",
                  "The art behind Yaksha Sports designs",
                  "Creative football identity",
                ][i]
              }
            />
          ))}
        </div>
        <div className="brand-quote">
          <div>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i}>
                "If the football world isn't ready, we'll change it"
              </span>
            ))}
          </div>
        </div>
        <section className="brand-statement">
          <h2>
            Why settle for ordinary when you can wear something with soul?
          </h2>
          <p>
            YAKSHA SPORTS BLENDS THE WORLDS OF SPORT, HISTORY, AND CULTURE INTO EVERY
            KIT. EACH ONE DRAWS INSPIRATION FROM MYTHS, ARCHITECTURE, AND LOCAL
            IDENTITY. FROM THE MOSAIC OF SANTA COSTANZA TO THE LEGEND OF ULYSSES
            AND CIRCE, THESE DESIGNS BRING FOOTBALL CLOSER TO ART AND CULTURE.
          </p>
        </section>
        <section className="founders-section">
          <img
            src={image(
              "755---enzo-e-michele_5ac3e13b-6560-4d5f-96ff-1dab553db5b9.jpg?v=1750778157&width=1400",
            )}
            loading="lazy"
            alt="Enzo and Michele"
          />
          <div>
            <h2>MICHELE AND ENZO</h2>
            <h3>THE PEOPLE CHANGING THE GAME</h3>
            <p>
              WITH COMPLEMENTARY SKILLS AND SHARED PASSION, ENZO AND MICHELE
              FUSE CREATIVITY AND STRATEGY TO REINVENT WHAT A FOOTBALL KIT CAN
              BE: AUTHENTIC, INSPIRING, UNFORGETTABLE.
            </p>
            <a className="button outline" href="/en/collections/all-products">
              SHOP
            </a>
          </div>
        </section>
        <div className="brand-values">
          <h3>UNIQUE DESIGN</h3>
          <h3>PREMIUM QUALITY</h3>
          <h3>LIMITED EDITION</h3>
        </div>
      </div>
    )
  if (path === "/en/pages/lavora-con-noi")
    return (
      <>
        <section className="hiring-hero">
          <img
            src={image("WIDE-PC.jpg?v=1765873261&width=2400")}
            alt="Yaksha Sports creative team"
          />
          <h1>WE’RE HIRING</h1>
          <a
            href="#hiring-story"
            className="next-section"
            aria-label="Navigate to next section"
          >
            ↓
          </a>
        </section>
        <section className="hiring-story" id="hiring-story">
          {[
            [
              "Progetto_senza_titolo_24.png?v=1755854389",
              "We are a brand that defies convention. If you are a creative, passionate person and ready to bring your talent to the world of sports design, we are looking for you.",
            ],
            [
              "cfd34ed1-c59f-4a16-8bf8-41c97dfe68da.png?v=1765820433",
              "Ezeta is a dynamic environment where every day is a new challenge, with innovative projects that transform the design of the jerseys into unique stories. We are looking for designers with an original vision and passion for sports, digital marketers capable of telling engaging and creative stories ready to think outside the box.",
            ],
            [
              "Progetto_senza_titolo_4_750x_crop_center_cf7f1016-8d14-4c56-b48a-cb95d7fc4f0b.webp?v=1751883654",
              "We work as a team, always aiming for excellence, and we enjoy always exceeding all expectations. If you want to be part of a team that is changing the game, send your CV and portfolio to joinus@ezeta.it. Or fill out the form below.",
            ],
          ].map(([file, text]) => (
            <article key={file}>
              <img
                src={`${image(file)}&width=1000`}
                alt="Inside the Ezeta creative world"
                loading="lazy"
              />
              <p>{text}</p>
            </article>
          ))}
        </section>
        <section className="hiring-form">
          <h2>Are you ready for the challenge?</h2>
          {sent ? (
            <div role="status" className="empty-state">
              <h3>APPLICATION PREVIEW COMPLETE</h3>
              <p>Your form was validated. No application has been sent.</p>
              <button className="text-link" onClick={() => setSent(false)}>
                Back to form
              </button>
            </div>
          ) : (
            <form
              className="standard-form"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="form-row">
                <label>
                  Name
                  <input
                    required
                    placeholder="Name"
                    autoComplete="given-name"
                  />
                </label>
                <label>
                  Last Name
                  <input
                    required
                    placeholder="Last Name"
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                />
              </label>
              <label>
                Link al tuo CV / Portfolio (Google Drive, WeTransfer, Instagram
                ecc.)
                <input type="url" required placeholder="https://" />
              </label>
              <small>
                Carica il tuo file su Drive o Dropbox e incolla qui il link di
                condivisione, oppure condividi i tuoi social.
              </small>
              <label>
                Tell us about yourself
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </label>
              <button className="button dark">SEND APPLICATION</button>
              <small className="muted">
                Preview only. Nothing is sent to the retailer. Use sample
                information.
              </small>
            </form>
          )}
        </section>
      </>
    )
  if (path === "/en/blogs/magazine")
    return (
      <section className="reference-magazine">
        <h1 className="sr-only">Magazine</h1>
        <div className="magazine-grid">
          {magazine.map((article) => (
            <article key={article.path}>
              <a className="magazine-image" href={article.path}>
                <img src={article.image} alt={article.title} loading="lazy" />
              </a>
              <div>
                <h2>
                  <a href={article.path}>{article.title}</a>
                </h2>
                <p>{article.excerpt}</p>
                <a className="text-link" href={article.path}>
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  const article = magazine.find((article) => article.path === path)
  if (article)
    return (
      <article className="reference-article">
        <p className="eyebrow">{article.publication}</p>
        <h1>{article.title}</h1>
        {article.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <img src={article.image} alt={article.title} />
        <a className="button dark" href="/en/blogs/magazine">
          BACK TO MAGAZINE
        </a>
      </article>
    )
  return (
    <div className="empty-state">
      <h1>ARTICLE NOT FOUND</h1>
      <a className="button dark" href="/en/blogs/magazine">
        BACK TO MAGAZINE
      </a>
    </div>
  )
}
