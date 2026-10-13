import { useEffect, useRef, useState } from "react"
import content from "./content.json"
import footerMedia from "./footer-media.json"
import Pages from "./Pages"
import PaymentIcons from "./PaymentIcons"
import {
  CartContents,
  localLink,
  readCart,
  type CartItem,
  type Product,
} from "./store"

function Icon({ name }: { name: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {name === "search" ? (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </>
      ) : name === "user" ? (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
        </>
      ) : name === "bag" ? (
        <>
          <path d="M1 3h4l3 13h11l3-10H6" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </>
      ) : name === "delivery" ? (
        <>
          <path d="M8 5h14v12H8V5ZM8 9H4l-3 4v4h4M1 13h7" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </>
      ) : name === "design" ? (
        <>
          <path d="m12 2 10 7-10 13L2 9l10-7ZM2 9h20M7 9l5 13 5-13M7 9l5-7 5 7" />
        </>
      ) : name === "quality" ? (
        <>
          <circle cx="12" cy="9" r="6" />
          <path d="m8 14-2 8 6-3 6 3-2-8M9 9l2 2 4-4" />
        </>
      ) : name === "payment" ? (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 9h20M6 15h5" />
        </>
      ) : name === "menu" ? (
        <path d="M1 5h22M1 12h22M1 19h22" />
      ) : (
        <path d="m5 5 14 14M19 5 5 19" />
      )}
    </svg>
  )
}

const nav = [
  ["SHOP ALL", "/en/collections/all-products"],
  ["CLUBS", "#clubs"],
  ["PRESS", "/en/blogs/magazine"],
  ["GIFT CARD", "/en/products/gift-card-50"],
  ["ABOUT", "/en/pages/about-us"],
  ["JOIN US", "/en/pages/lavora-con-noi"],
]
const external = (path: string) => localLink(path)

export default function App() {
  const [path, setPath] = useState(() =>
    window.location.pathname === "/"
      ? "/en"
      : window.location.pathname.replace(/\/$/, ""),
  )
  const [cart, setCart] = useState<CartItem[]>(readCart)
  const navigate = (next: string) => {
    const destination = localLink(next)
    window.history.pushState(null, "", destination)
    setPath(destination)
    setPanel(null)
    window.scrollTo({ top: 0, behavior: "instant" })
  }
  const updateCart = (items: CartItem[]) => {
    setCart(items)
    try {
      localStorage.setItem("ezeta-cart", JSON.stringify(items))
    } catch {}
  }
  const add = (product: Product, size: string, quantity: number) => {
    if (!size || !Number.isInteger(quantity) || quantity < 1 || quantity > 99)
      return
    const existing = cart.find(
      (item) => item.id === product.id && item.size === size,
    )
    updateCart(
      existing
        ? cart.map((item) =>
            item === existing
              ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
              : item,
          )
        : [...cart, { id: product.id, size, quantity }],
    )
    setPanel("bag")
  }
  useEffect(() => {
    const back = () => {
      setPath(window.location.pathname.replace(/\/$/, "") || "/en")
      setPanel(null)
      window.scrollTo(0, 0)
    }
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      )
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return
      if (!url.pathname.startsWith("/en")) return
      event.preventDefault()
      window.history.pushState(null, "", url.pathname)
      setPath(url.pathname.replace(/\/$/, ""))
      setPanel(null)
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("popstate", back)
    document.addEventListener("click", click)
    return () => {
      window.removeEventListener("popstate", back)
      document.removeEventListener("click", click)
    }
  }, [])
  useEffect(() => {
    document.title =
      path === "/en"
        ? "Yaksha Sports | Creative Football Jersey"
        : `${path.split("/").pop()?.replace(/-/g, " ").toUpperCase()} | Yaksha Sports`
  }, [path])
  const [slide, setSlide] = useState(0)
  const [headerHidden, setHeaderHidden] = useState(false)
  const touchStart = useRef<number | null>(null)
  const [announcement, setAnnouncement] = useState(0)
  const [panel, setPanel] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const productsRef = useRef<HTMLDivElement>(null)
  const [subscribed, setSubscribed] = useState(false)
  useEffect(() => {
    let trackingPosition = 0
    const onScroll = () => {
      const current = Math.max(0, window.scrollY)
      if (current > trackingPosition + 100) {
        setHeaderHidden(true)
        trackingPosition = current
      } else if (current < trackingPosition) {
        setHeaderHidden(false)
        trackingPosition = current
      }
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.clientY < 100 && window.matchMedia("(pointer: fine)").matches)
        setHeaderHidden(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointermove", onPointerMove)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(
      () => setSlide((s) => (s + 1) % content.slides.length),
      7000,
    )
    const announce = window.setInterval(
      () => setAnnouncement((s) => 1 - s),
      5000,
    )
    return () => {
      clearInterval(timer)
      clearInterval(announce)
    }
  }, [])
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (preference.matches) return
    const animations: Animation[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          animations.push(
            element.animate(
              [
                { opacity: 0, transform: "translateY(28px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 800,
                delay: Number(element.dataset.motionDelay || 0),
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "backwards",
              },
            ),
          )
          observer.unobserve(element)
        })
      },
      { threshold: 0.12 },
    )
    document
      .querySelectorAll<HTMLElement>(
        ".shop-section h2, .product, .clubs-section h2, .club-card, .benefits > div, .footer-top > div",
      )
      .forEach((element) => {
        const siblings = Array.from(element.parentElement?.children || [])
        element.dataset.motionDelay = String(
          (siblings.indexOf(element) % 4) * 90,
        )
        observer.observe(element)
      })
    const stopMotion = () => {
      if (preference.matches) {
        observer.disconnect()
        animations.forEach((animation) => animation.cancel())
      }
    }
    preference.addEventListener("change", stopMotion)
    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      preference.removeEventListener("change", stopMotion)
    }
  }, [path])
  useEffect(() => {
    if (!panel) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    const drawer = document.querySelector<HTMLElement>(".drawer")
    const focusable = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]',
        ) || [],
      )
    focusable()[0]?.focus()
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      const elements = focusable()
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", trap)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", trap)
      previousFocus?.focus()
    }
  }, [panel])
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null)
    }
    window.addEventListener("keydown", escape)
    return () => window.removeEventListener("keydown", escape)
  }, [])
  return (
    <>
      <div className="top-bar">
        <button
          aria-label="Previous announcement"
          onClick={() => setAnnouncement(1 - announcement)}
        >
          <svg width="12" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <path d="M11 1 3 9l8 8" stroke="currentColor" />
          </svg>
        </button>
        <span key={announcement}>
          {announcement
            ? "PAY IN 3 INSTALMENTS WITH KLARNA"
            : "WORLDWIDE SHIPPING"}
        </span>
        <button
          aria-label="Next announcement"
          onClick={() => setAnnouncement(1 - announcement)}
        >
          <svg width="12" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <path d="m5 17 8-8-8-8" stroke="currentColor" />
          </svg>
        </button>
      </div>
      <header
        className={`site-header ${
          headerHidden && !panel ? "header-hidden" : ""
        }`}
      >
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, link]) => (
            <div className="nav-item" key={label}>
              <a href={external(link)}>{label}</a>
              {label === "CLUBS" && (
                <div className="club-dropdown">
                  <h3>OUR CLUBS</h3>
                  {content.clubs.map((club) => (
                    <a
                      key={club.name}
                      href={`/en/collections/${club.name.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {club.name}
                    </a>
                  ))}
                  <div className="menu-promos">
                    {[content.clubs[0], content.clubs[2]].map((club) => (
                      <a
                        key={club.name}
                        href={`/en/collections/${club.name.toLowerCase()}`}
                      >
                        <img src={`${club.image}&width=630`} alt={club.name} />
                        <span>DISCOVER {club.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="mobile-menu"
          aria-label="Open menu"
          onClick={() => setPanel("menu")}
        >
          <Icon name="menu" />
        </button>
        <a className="brand" href="/en" aria-label="YAK home">
          <img
            src="/logo-yak-web.png"
            alt="YAK"
          />
        </a>
        <nav className="utilities" aria-label="Utilities">
          <details className="language">
            <summary>
              ENGLISH <span>⌄</span>
            </summary>
            <div>
              <span className="muted">English preview</span>
              <button
                onClick={(e) =>
                  e.currentTarget.closest("details")?.removeAttribute("open")
                }
              >
                English
              </button>
            </div>
          </details>
          <a className="account" href="/en/account" aria-label="Login">
            <Icon name="user" />
          </a>
          <button aria-label="Search" onClick={() => setPanel("search")}>
            <Icon name="search" />
          </button>
          <button aria-label="Shopping bag" onClick={() => setPanel("bag")}>
            <Icon name="bag" />
            {cart.length > 0 && (
              <span className="bag-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </nav>
      </header>
      <main>
        {path !== "/en" ? (
          <Pages
            path={path}
            cart={cart}
            updateCart={updateCart}
            add={add}
            navigate={navigate}
          />
        ) : (
          <>
            <section
              className="hero"
              aria-label="Latest collections"
              onTouchStart={(event) => {
                touchStart.current = event.touches[0].clientX
              }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return
                const difference =
                  event.changedTouches[0].clientX - touchStart.current
                if (Math.abs(difference) > 45)
                  setSlide(
                    (current) =>
                      (current +
                        (difference < 0 ? 1 : content.slides.length - 1)) %
                      content.slides.length,
                  )
                touchStart.current = null
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight")
                  setSlide((slide + 1) % content.slides.length)
                if (e.key === "ArrowLeft")
                  setSlide(
                    (slide + content.slides.length - 1) % content.slides.length,
                  )
              }}
              tabIndex={0}
            >
              <button
                type="button"
                className="hero-arrow prev absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl md:text-3xl z-20 transition-all hover:scale-110 cursor-pointer select-none"
                aria-label="Previous slide"
                onClick={(e) => {
                  e.stopPropagation()
                  setSlide(
                    (slide + content.slides.length - 1) % content.slides.length,
                  )
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="hero-arrow next absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl md:text-3xl z-20 transition-all hover:scale-110 cursor-pointer select-none"
                aria-label="Next slide"
                onClick={(e) => {
                  e.stopPropagation()
                  setSlide((slide + 1) % content.slides.length)
                }}
              >
                ›
              </button>
              {content.slides.map((item, i) => (
                <div
                  className={`hero-slide ${i === slide ? "active" : ""}`}
                  key={item.image}
                  aria-hidden={i !== slide}
                >
                  <picture>
                    <source
                      media="(max-width:699px)"
                      srcSet={`${item.mobile}&width=1000`}
                    />
                    <img
                      src={`${item.image}&width=2400`}
                      alt={`${item.title} collection campaign`}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </picture>
                  <div className="hero-shade" />
                  <div className="hero-caption">
                    <h1>{item.title}</h1>
                    <a
                      className="button outline"
                      href={localLink(item.link)}
                      tabIndex={i === slide ? 0 : -1}
                    >
                      SHOP NOW
                    </a>
                  </div>
                </div>
              ))}
              <div className="slide-dots">
                {content.slides.map((s, i) => (
                  <button
                    key={s.image}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={slide === i}
                    onClick={() => setSlide(i)}
                  >
                    <svg
                      key={`${slide}-${i}`}
                      className="slide-progress"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      aria-hidden="true"
                    >
                      <circle
                        cx="4"
                        cy="4"
                        r="3.25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      {slide === i && (
                        <circle
                          className="progress-ring"
                          cx="4"
                          cy="4"
                          r="3.25"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      )}
                    </svg>
                  </button>
                ))}
              </div>
            </section>
            <div className="press-strip" aria-label="As featured in">
              <div className="press-track">
                {[...content.logos, ...content.logos].map((logo, i) => (
                  <img
                    key={i}
                    src={`${logo}&width=360`}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
            <section className="shop-section" id="shop">
              <h2>SHOP ALL JERSEYS</h2>
              <div className="product-carousel">
                <button
                  className="carousel-arrow previous"
                  aria-label="Previous products"
                  onClick={() =>
                    productsRef.current?.scrollBy({
                      left: -700,
                      behavior: "smooth",
                    })
                  }
                >
                  ‹
                </button>
                <div className="products" ref={productsRef}>
                  {content.products.map((product) => (
                    <article className="product" key={product.name}>
                      <a
                        className="product-photo"
                        href={localLink(
                          `/en/search?q=${encodeURIComponent(product.name)}`,
                        )}
                      >
                        <img
                          src={`${product.image}&width=800`}
                          alt={product.name}
                          loading="lazy"
                        />
                        <img
                          className="hover-photo"
                          src={`${product.hover}&width=800`}
                          alt=""
                          loading="lazy"
                        />
                        {product.price === 68 && (
                          <span className="sale">Save 20%</span>
                        )}
                        <span className="quick-buy">Choose options</span>
                      </a>
                      <h3>
                        <a
                          href={localLink(
                            `/en/search?q=${encodeURIComponent(product.name)}`,
                          )}
                        >
                          {product.name}
                        </a>
                      </h3>
                      <p className={product.price === 68 ? "sale-price" : ""}>
                        €{product.price}
                        {product.price === 68 && <del>€85</del>}
                      </p>
                    </article>
                  ))}
                </div>
                <button
                  className="carousel-arrow next"
                  aria-label="Next products"
                  onClick={() =>
                    productsRef.current?.scrollBy({
                      left: 700,
                      behavior: "smooth",
                    })
                  }
                >
                  ›
                </button>
              </div>
              <a
                className="button dark"
                href={external("/en/collections/all-products")}
              >
                VIEW ALL PRODUCTS
              </a>
            </section>
            <section id="clubs" className="clubs-section">
              <h2>DISCOVER OUR CLUBS</h2>
              <div className="clubs-grid">
                {content.clubs.map((club) => (
                  <a
                    className="club-card"
                    key={club.name}
                    href={`/en/collections/${club.name.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <img
                      src={`${club.image}&width=1000`}
                      alt={`${club.name} football collection`}
                      loading="lazy"
                    />
                    <span className="button outline">{club.name}</span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
        <section className="benefits">
          {[
            ["GLOBAL SHIPPING", "Get your shirt wherever you are.", "delivery"],
            [
              "UNIQUE DESIGNS",
              "Exclusive shirts you won't find in traditional stores.",
              "design",
            ],
            [
              "PREMIUM QUALITY",
              "High-quality materials for exceptional comfort and durability.",
              "quality",
            ],
            [
              "SECURE PAYMENT",
              "Protected transactions with the highest security standards.",
              "payment",
            ],
          ].map(([title, text, symbol]) => (
            <div key={title}>
              <span className="benefit-symbol" aria-hidden="true">
                <Icon name={symbol} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </section>
        <div className="reseller-strip" aria-label="Official resellers">
          <div className="reseller-track">
            {[...footerMedia, ...footerMedia].map((image, index) => (
              <img
                key={index}
                src={`${image}&width=360`}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-top">
          <a className="footer-brand" href="/en" aria-label="YAK home">
            <img
              src="/logo-yak-web.png"
              alt="YAK"
              className="footer-logo-inverted"
            />
          </a>
          <div>
            <h3>PRIVACY</h3>
            {[
              "Cookie Policy",
              "Termini e Condizioni",
              "GDPR Compliance",
              "PIPEDA Compliance",
              "Shipping policy",
              "Privacy Policy",
              "Diritto di Recesso",
            ].map((label) => (
              <a
                key={label}
                href={`/en/policies/${label.toLowerCase().replace(/ /g, "-")}`}
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <h3>MENU</h3>
            {nav.map(([label, path]) => (
              <a key={label} href={external(path)}>
                {label}
              </a>
            ))}
          </div>
          <div className="newsletter">
            <h3>SUBSCRIBE TO OUR NEWS LETTER</h3>
            <p>
              Get <strong>10% discount</strong> on your first order!
            </p>
            <p className="muted">
              Preview form — email delivery is not connected.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="E-mail"
              />
              <button aria-label="Subscribe">→</button>
            </form>
            {subscribed && (
              <p role="status">
                Newsletter preview only — no subscription was created.
              </p>
            )}
            <div className="footer-contact">
              <h3>CONTACT US</h3>
              <div className="social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn facebook"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn tiktok"
                  aria-label="TikTok"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.86-4.48V8.75a8.16 8.16 0 0 0 4.91 1.63V6.92a4.85 4.85 0 0 1-1-.23z" />
                  </svg>
                  <span>TikTok</span>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn telegram"
                  aria-label="Telegram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.943z" />
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
            <div className="newsletter-payments">
              <PaymentIcons />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Italy (EUR €) ⌄</span>
          <span>© 2026 - Yaksha Sports</span>
        </div>
        <p className="muted">
          Interactive storefront preview. No real orders or payments are
          processed.
        </p>
      </footer>
      {panel && (
        <div className="overlay" onClick={() => setPanel(null)}>
          <section
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={
              panel === "search"
                ? "Search products"
                : panel === "menu"
                  ? "Navigation"
                  : "Shopping bag"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-heading">
              <h2>
                {panel === "search"
                  ? "SEARCH"
                  : panel === "menu"
                    ? "MENU"
                    : "SHOPPING BAG"}
              </h2>
              <button onClick={() => setPanel(null)} aria-label="Close">
                <Icon name="close" />
              </button>
            </div>
            {panel === "menu" ? (
              nav.map(([label, path]) => (
                <a
                  className="drawer-link"
                  key={label}
                  href={external(path)}
                  onClick={() => setPanel(null)}
                >
                  {label}
                </a>
              ))
            ) : panel === "search" ? (
              <>
                <input
                  autoFocus
                  placeholder="Search for jerseys, clubs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search products"
                />
                <div className="search-results">
                  {query &&
                    content.products
                      .filter((p) =>
                        p.name.toLowerCase().includes(query.toLowerCase()),
                      )
                      .map((p) => (
                        <a
                          key={p.name}
                          href={localLink(
                            `/en/search?q=${encodeURIComponent(p.name)}`,
                          )}
                        >
                          <img src={`${p.image}&width=200`} alt="" />
                          <span>
                            {p.name}
                            <br />€{p.price}
                          </span>
                        </a>
                      ))}
                  {query &&
                    !content.products.some((p) =>
                      p.name.toLowerCase().includes(query.toLowerCase()),
                    ) && <p>No products found. Try a club name.</p>}
                </div>
              </>
            ) : (
              <CartContents
                items={cart}
                update={updateCart}
                navigate={navigate}
              />
            )}
          </section>
        </div>
      )}
    </>
  )
}
