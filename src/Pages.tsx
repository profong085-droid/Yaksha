import { useEffect, useState } from "react"
import content from "./content.json"
import BrandPages from "./BrandPages"
import {
  CartContents,
  catalog,
  findProduct,
  gift,
  productLink,
  slug,
  type CartItem,
  type Product,
} from "./store"

type Props = {
  path: string
  cart: CartItem[]
  updateCart: (items: CartItem[]) => void
  add: (product: Product, size: string, quantity: number) => void
  navigate: (path: string) => void
}
const money = (value: number) => `€${value.toFixed(2)}`

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product">
      <a className="product-photo" href={productLink(product.name)}>
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
        {product.available === false ? (
          <span className="sale sold-out">Sold out</span>
        ) : (
          <span className="quick-buy">Choose options</span>
        )}
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="sale">
            Save {Math.round((1 - product.price / product.comparePrice) * 100)}%
          </span>
        )}
      </a>
      <h3>
        <a href={productLink(product.name)}>{product.name}</a>
      </h3>
      <p>
        {money(product.price)}
        {product.comparePrice && product.comparePrice > product.price && (
          <del>{money(product.comparePrice)}</del>
        )}
      </p>
    </article>
  )
}

function Collection({ path }: { path: string }) {
  const [search, setSearch] = useState("")
  const [clubFilter, setClubFilter] = useState("all")
  const [sort, setSort] = useState("featured")
  const [page, setPage] = useState(1)
  const segment = path.split("/").pop() || "all-products"
  const isAll = segment === "all-products"
  const selectedClub = segment.includes("sorrento")
    ? "SORRENTO"
    : segment.includes("latina")
      ? "LATINA"
      : segment.toUpperCase().replace(/-/g, " ")
  const club = content.clubs.find((c) => c.name === selectedClub)
  const products = catalog.filter(
    (p) =>
      (isAll || p.name.startsWith(selectedClub)) &&
      (clubFilter === "all" || p.name.startsWith(clubFilter)) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  )
  if (sort === "low") products.sort((a, b) => a.price - b.price)
  if (sort === "high") products.sort((a, b) => b.price - a.price)
  if (sort === "name") products.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      {club ? (
        <div className="collection-banner">
          <img src={`${club.image}&width=1800`} alt={`${club.name} campaign`} />
          <div>
            <p>THE CLUB COLLECTION</p>
            <h1>{club.name}</h1>
          </div>
        </div>
      ) : !isAll ? (
        <div className="page-title">
          <p>CREATIVE FOOTBALL JERSEYS</p>
          <h1>{isAll ? "SHOP ALL" : selectedClub}</h1>
          <p>Distinctive designs. A shared passion for the beautiful game.</p>
        </div>
      ) : null}
      <section className={`page-container ${isAll ? "reference-shop" : ""}`}>
        <h1 className="sr-only">{isAll ? "All Products" : selectedClub}</h1>
        <details className="filter-disclosure">
          <summary>Filter and sort</summary>
          <div className="shop-tools">
            <label className="search-field">
              Search jerseys
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder="Find your next jersey"
              />
            </label>
            {isAll && (
              <label>
                Club
                <select
                  value={clubFilter}
                  onChange={(e) => {
                    setClubFilter(e.target.value)
                    setPage(1)
                  }}
                >
                  <option value="all">All clubs</option>
                  {[...new Set(catalog.map((p) => p.name.split(" ")[0]))].map(
                    (name) => (
                      <option key={name}>{name}</option>
                    ),
                  )}
                </select>
              </label>
            )}
            <label>
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </details>
        <p className="muted" aria-live="polite">
          <span className="sr-only">{products.length} jerseys</span>
        </p>
        <div className="catalog-grid">
          {products.slice((page - 1) * 50, page * 50).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 50 && (
          <nav className="pagination" aria-label="Product pages">
            {Array.from({ length: Math.ceil(products.length / 50) }, (_, i) => (
              <button
                key={i}
                aria-current={page === i + 1 ? "page" : undefined}
                onClick={() => {
                  setPage(i + 1)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
        {!products.length && (
          <div className="empty-state">
            <h2>No jerseys available</h2>
            <p>
              This preview catalog has no matching products for this collection.
            </p>
            <a className="button dark" href="/en/collections/all-products">
              SHOP ALL JERSEYS
            </a>
          </div>
        )}
      </section>
    </>
  )
}

function ProductDetail({
  product,
  add,
}: {
  product: Product
  add: Props["add"]
}) {
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [photo, setPhoto] = useState(product.image)
  const [sizeGuide, setSizeGuide] = useState(false)
  const isGift = product.id === gift.id

  useEffect(() => {
    setPhoto(product.image)
    setSize("")
    setQuantity(1)
  }, [product.id, product.image])

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.hover].filter(Boolean)

  const currentIndex = catalog.findIndex((p) => p.id === product.id)
  const prevProduct =
    currentIndex > 0
      ? catalog[currentIndex - 1]
      : catalog[catalog.length - 1]
  const nextProduct =
    currentIndex >= 0 && currentIndex < catalog.length - 1
      ? catalog[currentIndex + 1]
      : catalog[0]

  return (
    <section className="page-container">
      <div className="product-top-nav flex items-center justify-between max-w-290 mx-auto mb-6 px-1">
        <nav className="product-breadcrumbs flex items-center gap-2 text-xs text-neutral-500" aria-label="Breadcrumb">
          <a href="/en" className="hover:underline">Home</a>
          <span>/</span>
          <a href="/en/collections/all-products" className="hover:underline">Shop all</a>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>
        {prevProduct && nextProduct && !isGift && (
          <div className="product-pagination flex items-center gap-2.5 text-xs font-semibold">
            <a
              href={productLink(prevProduct.name)}
              title={prevProduct.name}
              className="product-page-nav-btn prev inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black text-neutral-800 transition-all text-xs shadow-xs"
            >
              <span>‹</span> Previous product
            </a>
            <span className="pagination-divider text-neutral-300">|</span>
            <a
              href={productLink(nextProduct.name)}
              title={nextProduct.name}
              className="product-page-nav-btn next inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black text-neutral-800 transition-all text-xs shadow-xs"
            >
              Next product <span>›</span>
            </a>
          </div>
        )}
      </div>
      <div className="product-detail">
        <div>
          <div className={`detail-photo relative ${isGift ? "gift-art" : ""}`}>
            {galleryImages.length > 1 && !isGift && (
              <>
                <button
                  type="button"
                  className="gallery-nav-btn prev absolute top-1/2 -translate-y-1/2 left-3 w-11 h-11 rounded-full bg-white/95 hover:bg-black hover:text-white text-black shadow-lg flex items-center justify-center text-2xl z-20 cursor-pointer border border-black/10 transition-all hover:scale-110 select-none"
                  aria-label="Previous photo"
                  onClick={() => {
                    const idx = galleryImages.indexOf(photo)
                    const prevIdx =
                      (idx - 1 + galleryImages.length) % galleryImages.length
                    setPhoto(galleryImages[prevIdx])
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery-nav-btn next absolute top-1/2 -translate-y-1/2 right-3 w-11 h-11 rounded-full bg-white/95 hover:bg-black hover:text-white text-black shadow-lg flex items-center justify-center text-2xl z-20 cursor-pointer border border-black/10 transition-all hover:scale-110 select-none"
                  aria-label="Next photo"
                  onClick={() => {
                    const idx = galleryImages.indexOf(photo)
                    const nextIdx = (idx + 1) % galleryImages.length
                    setPhoto(galleryImages[nextIdx])
                  }}
                >
                  ›
                </button>
              </>
            )}
            <img src={`${photo}&width=1400`} alt={product.name} />
            {isGift && <span>THE GIFT OF THE GAME</span>}
          </div>
          {!isGift && (
            <div className="photo-thumbnails">
              {galleryImages.map(
                (image, i) => (
                  <button
                    key={image}
                    onClick={() => setPhoto(image)}
                    aria-label={`Show product photo ${i + 1}`}
                    aria-pressed={photo === image}
                  >
                    <img
                      src={`${image}&width=200`}
                      alt={`Product view ${i + 1}`}
                    />
                  </button>
                ),
              )}
            </div>
          )}
        </div>
        <div className="product-description">
          <p className="eyebrow">
            {isGift
              ? "A GIFT WITH CHARACTER"
              : product.name.startsWith("PORTOFINO")
                ? "THE COLOURS OF THE ITALIAN RIVIERA"
                : "CREATIVE FOOTBALL JERSEYS"}
          </p>
          <h1>{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p>
          <p>
            {isGift
              ? "Let them choose their favourite design. This is a demonstration gift card; no redeemable code is issued."
              : "Tax included. Shipping calculated at checkout."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              add(product, isGift ? "€50" : size, quantity)
            }}
          >
            <fieldset>
              <legend>{isGift ? "Gift card value" : "SELECT SIZE"}</legend>
              <div className="size-options">
                {(isGift
                  ? ["€50"]
                  : product.variants?.map((v) => v.size) || [
                      "XS",
                      "S",
                      "M",
                      "L",
                      "XL",
                      "XXL",
                    ]
                ).map((value) => (
                  <label
                    key={value}
                    className={size === value ? "selected" : ""}
                  >
                    <input
                      required
                      type="radio"
                      name="size"
                      value={value}
                      disabled={
                        product.variants?.find((v) => v.size === value)
                          ?.available === false
                      }
                      checked={size === value}
                      onChange={() => setSize(value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>
            {!isGift && (
              <button
                className="text-link"
                type="button"
                onClick={() => setSizeGuide(!sizeGuide)}
              >
                Size guide {sizeGuide ? "−" : "+"}
              </button>
            )}
            {sizeGuide && (
              <div className="size-guide">
                <p>
                  Preview sizing information: XS–XXL. Exact garment measurements
                  have not been supplied. Confirm measurements with the retailer
                  before purchasing.
                </p>
              </div>
            )}
            <label className="quantity-label">
              Quantity
              <input
                type="number"
                min="1"
                max="99"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </label>
            <button
              className="button dark full-width"
              type="submit"
              disabled={product.available === false}
            >
              {product.available === false ? "SOLD OUT" : "ADD TO CART"}
            </button>
          </form>
          <div className="detail-accordions">
            <details open>
              <summary>Description</summary>
              <p>
                {product.description ||
                  "Inspired by club identity and creative football culture."}
              </p>
            </details>
            <details>
              <summary>DELIVERY & RETURNS</summary>
              <p>
                This is an interactive storefront preview. No products are
                dispatched and no payment is collected.
              </p>
              <a className="text-link" href="/en/policies/shipping-policy">
                Read delivery information
              </a>
            </details>
            <details>
              <summary>CARE</summary>
              <p>
                Check the garment label for the manufacturer's wash and care
                instructions.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="related-products">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="catalog-grid">
          {catalog
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </section>
  )
}

function DemoForm({ kind }: { kind: "join" | "account" }) {
  const [sent, setSent] = useState(false)
  const [mode, setMode] = useState("sign-in")
  return (
    <div className="form-page">
      <p className="eyebrow">
        {kind === "join"
          ? "LET'S CREATE SOMETHING DIFFERENT"
          : "WELCOME TO EZETA"}
      </p>
      <h1>
        {kind === "join"
          ? "JOIN US"
          : mode === "sign-in"
            ? "YOUR ACCOUNT"
            : "CREATE ACCOUNT"}
      </h1>
      <p>
        {kind === "join"
          ? "For clubs, creatives and collaborators. Tell us about your project."
          : "Account experience preview. Secure authentication is not connected."}
      </p>
      <div className="demo-notice">
        Demo only. Do not enter passwords or sensitive personal information.
        Nothing is sent to a server.
      </div>
      {sent ? (
        <div role="status" className="empty-state">
          <h2>{kind === "join" ? "PREVIEW COMPLETE" : "ACCOUNT PREVIEW"}</h2>
          <p>
            {kind === "join"
              ? "Your form was validated, but your message has not been sent."
              : "Your email format was validated. No account or authenticated session was created."}
          </p>
          <button className="button dark" onClick={() => setSent(false)}>
            BACK TO FORM
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
          {(kind === "join" || mode === "register") && (
            <label>
              Name
              <input required autoComplete="name" placeholder="Your name" />
            </label>
          )}
          <label>
            Email
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          {kind === "join" && (
            <>
              <label>
                I'm interested in
                <select>
                  <option>Club partnership</option>
                  <option>Creative collaboration</option>
                  <option>Careers</option>
                  <option>General enquiry</option>
                </select>
              </label>
              <label>
                Your message
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project"
                />
              </label>
            </>
          )}
          <button className="button dark" type="submit">
            {kind === "join" ? "PREVIEW ENQUIRY" : "PREVIEW ACCOUNT"}
          </button>
          {kind === "account" && (
            <button
              className="text-link"
              type="button"
              onClick={() =>
                setMode(mode === "sign-in" ? "register" : "sign-in")
              }
            >
              {mode === "sign-in"
                ? "New here? Create an account preview"
                : "Already have an account? Sign-in preview"}
            </button>
          )}
        </form>
      )}
    </div>
  )
}

function Checkout({ cart }: { cart: CartItem[] }) {
  const [done, setDone] = useState(false)
  const total = cart.reduce(
    (sum, item) => sum + findProduct(item.id)!.price * item.quantity,
    0,
  )
  if (!cart.length)
    return (
      <div className="empty-state">
        <h1>YOUR BAG IS EMPTY</h1>
        <a className="button dark" href="/en/collections/all-products">
          SHOP ALL
        </a>
      </div>
    )
  return (
    <section className="page-container">
      <div className="page-title">
        <p>NO PAYMENT WILL BE COLLECTED</p>
        <h1>DEMO CHECKOUT</h1>
      </div>
      <div className="checkout-grid">
        <div>
          <div className="demo-notice">
            This checkout demonstrates the flow only. No order, payment, email
            or shipment will be created. Use sample information.
          </div>
          {done ? (
            <div role="status" className="empty-state">
              <h2>CHECKOUT PREVIEW COMPLETE</h2>
              <p>No purchase was made. Your bag is unchanged.</p>
              <a className="button dark" href="/en/collections/all-products">
                CONTINUE EXPLORING
              </a>
            </div>
          ) : (
            <form
              className="standard-form"
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
            >
              <h2>CONTACT & DELIVERY</h2>
              <label>
                Email
                <input type="email" required placeholder="sample@example.com" />
              </label>
              <div className="form-row">
                <label>
                  First name
                  <input required placeholder="Sample" />
                </label>
                <label>
                  Last name
                  <input required placeholder="Customer" />
                </label>
              </div>
              <label>
                Address
                <input required placeholder="Sample address" />
              </label>
              <div className="form-row">
                <label>
                  City
                  <input required />
                </label>
                <label>
                  Postal code
                  <input required />
                </label>
              </div>
              <label>
                Country
                <select>
                  <option>Italy</option>
                  <option>Cambodia</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>Other</option>
                </select>
              </label>
              <p className="muted">
                Shipping rates and payment providers are not connected.
              </p>
              <label className="checkbox-label">
                <input type="checkbox" required />I understand this is a demo
                and no order will be placed.
              </label>
              <button className="button dark">COMPLETE CHECKOUT PREVIEW</button>
            </form>
          )}
        </div>
        <aside className="order-summary">
          <h2>YOUR BAG</h2>
          {cart.map((item) => {
            const p = findProduct(item.id)!
            return (
              <div className="summary-line" key={`${item.id}-${item.size}`}>
                <img src={`${p.image}&width=200`} alt={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p>
                    {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span>{money(p.price * item.quantity)}</span>
              </div>
            )
          })}
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p>Shipping: not calculated</p>
          <a href="/en/cart" className="text-link">
            Edit your bag
          </a>
        </aside>
      </div>
    </section>
  )
}

const stories = [
  {
    title: "PORTOFINO — A NEW PERSPECTIVE",
    image: content.slides[0].image,
    text: "Discover the Portofino campaign: expressive football design captured through original collection photography.",
    club: "portofino",
  },
  {
    title: "SORRENTO — THE SIRENS COLLECTION",
    image: content.slides[1].image,
    text: "Explore Sorrento's distinctive collection and the visual world behind its jerseys.",
    club: "sorrento-la-terra-delle-sirene",
  },
  {
    title: "LATINA — IDENTITY IN EVERY DETAIL",
    image: content.slides[2].image,
    text: "A closer look at Latina's home and away designs. Discover the collection in the storefront.",
    club: "latina-26-27",
  },
]

export default function Pages(props: Props) {
  const { path, cart, updateCart, add, navigate } = props
  if (
    path === "/en/pages/about-us" ||
    path === "/en/pages/lavora-con-noi" ||
    path.startsWith("/en/blogs/magazine")
  )
    return <BrandPages key={path} path={path} />
  if (path.startsWith("/en/collections/") || /\/en\/pages\/_/.test(path))
    return <Collection key={path} path={path} />
  if (path.startsWith("/en/products/")) {
    const product = findProduct(path.split("/").pop() || "")
    return product ? (
      <ProductDetail key={product.id} product={product} add={add} />
    ) : (
      <NotFound />
    )
  }
  if (path === "/en/cart")
    return (
      <section className="page-container narrow">
        <div className="page-title">
          <h1>YOUR BAG</h1>
        </div>
        <CartContents items={cart} update={updateCart} navigate={navigate} />
      </section>
    )
  if (path === "/en/checkout") return <Checkout cart={cart} />
  if (path === "/en/account") return <DemoForm kind="account" />
  if (path === "/en/pages/lavora-con-noi") return <DemoForm kind="join" />
  if (path === "/en/clubs")
    return (
      <>
        <div className="page-title">
          <p>LOCAL IDENTITY. CREATIVE EXPRESSION.</p>
          <h1>OUR CLUBS</h1>
          <p>Explore the stories and designs behind each collection.</p>
        </div>
        <div className="clubs-grid">
          {content.clubs.map((club) => (
            <a
              key={club.name}
              className="club-card"
              href={`/en/collections/${slug(club.name)}`}
            >
              <img src={`${club.image}&width=1000`} alt={club.name} />
              <span className="button outline">{club.name}</span>
            </a>
          ))}
        </div>
      </>
    )
  if (path === "/en/pages/about-us")
    return (
      <>
        <div className="collection-banner">
          <img
            src={`${content.slides[0].image}&width=1800`}
            alt="Yaksha Sports campaign"
          />
          <div>
            <p>FOOTBALL. ART. IDENTITY.</p>
            <h1>ABOUT YAKSHA SPORTS</h1>
          </div>
        </div>
        <section className="editorial-copy">
          <p className="eyebrow">CREATIVE FOOTBALL JERSEYS</p>
          <h2>MORE THAN A JERSEY.</h2>
          <p>
            Yaksha Sports is an Italian creative football brand, bringing expressive
            design and club identity into the world of football jerseys.
          </p>
          <p>
            This independent storefront recreation lets you explore the
            available campaign imagery, browse a sample catalog and try a local
            shopping-bag experience.
          </p>
          <a className="button dark" href="/en/clubs">
            DISCOVER OUR CLUBS
          </a>
        </section>
      </>
    )
  if (path === "/en/blogs/magazine")
    return (
      <section className="page-container">
        <div className="page-title">
          <p>CAMPAIGNS & COLLECTIONS</p>
          <h1>THE MAGAZINE</h1>
          <p>Editorial previews created for this storefront recreation.</p>
        </div>
        <div className="story-grid">
          {stories.map((story, i) => (
            <a
              className="story-card"
              key={story.title}
              href={`/en/blogs/magazine/story-${i}`}
            >
              <img src={`${story.image}&width=1000`} alt={story.title} />
              <p className="eyebrow">COLLECTION JOURNAL</p>
              <h2>{story.title}</h2>
              <span className="text-link">Read story →</span>
            </a>
          ))}
        </div>
      </section>
    )
  if (path.startsWith("/en/blogs/magazine/story-")) {
    const story = stories[Number(path.split("story-")[1])]
    return story ? (
      <>
        <div className="collection-banner">
          <img src={`${story.image}&width=1800`} alt={story.title} />
          <div>
            <p>COLLECTION JOURNAL · PREVIEW</p>
            <h1>{story.title}</h1>
          </div>
        </div>
        <article className="editorial-copy">
          <a className="text-link" href="/en/blogs/magazine">
            ← Back to magazine
          </a>
          <p>{story.text}</p>
          <p>
            This article is a short editorial preview, not a reproduction of the
            brand's published press coverage.
          </p>
          <a className="button dark" href={`/en/collections/${story.club}`}>
            EXPLORE THE COLLECTION
          </a>
        </article>
      </>
    ) : (
      <NotFound />
    )
  }
  if (path.startsWith("/en/policies/")) {
    const title = (path.split("/").pop() || "").replace(/-/g, " ").toUpperCase()
    return (
      <section className="editorial-copy">
        <p className="eyebrow">STOREFRONT INFORMATION</p>
        <h1>{title}</h1>
        <div className="demo-notice">
          Preview information, not a legally reviewed policy. Real commerce
          policies must be supplied by the store operator before launch.
        </div>
        <h2>
          {title.includes("SHIPPING")
            ? "DELIVERY"
            : title.includes("RECESSO")
              ? "RETURNS"
              : title.includes("COOKIE")
                ? "LOCAL STORAGE & COOKIES"
                : "YOUR INFORMATION"}
        </h2>
        <p>
          This interactive recreation does not process payments, place real
          orders, create customer accounts, send enquiries or subscribe you to a
          mailing list.
        </p>
        <p>
          The shopping bag is saved in your browser's local storage. Product
          images and fonts are loaded from external providers. Demo forms are
          not sent to a backend.
        </p>
        {title.includes("COOKIE") && (
          <button
            className="button dark"
            onClick={() => {
              updateCart([])
              try {
                localStorage.removeItem("ezeta-cart")
              } catch {}
            }}
          >
            CLEAR SAVED SHOPPING BAG
          </button>
        )}
        <p>
          For actual purchases, consult the original retailer's current terms,
          delivery, privacy and return policies.
        </p>
        <a className="text-link" href="/en">
          Back to home
        </a>
      </section>
    )
  }
  return <NotFound />
}

function NotFound() {
  return (
    <div className="empty-state">
      <p className="eyebrow">404</p>
      <h1>PAGE NOT FOUND</h1>
      <p>Let's get you back to the collection.</p>
      <a className="button dark" href="/en">
        BACK TO HOME
      </a>
    </div>
  )
}
