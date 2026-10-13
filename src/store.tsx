import referenceCatalog from "./catalog.json"

export const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")
export const catalog: Product[] = referenceCatalog
export type Product = {
  id: string
  name: string
  image: string
  hover: string
  price: number
  comparePrice?: number | null
  available?: boolean
  images?: string[]
  variants?: {
    size: string
    available: boolean
  }[]
  description?: string
}
export type CartItem = {
  id: string
  size: string
  quantity: number
}
export const gift: Product = {
  id: "gift-card-50",
  name: "EZETA DIGITAL GIFT CARD",
  image: "/logo-yak-web.png",
  hover: "",
  price: 50,
}
export const findProduct = (id: string) =>
  id === gift.id
    ? gift
    : catalog.find(
        (p) =>
          p.id === id ||
          slug(p.name) === id ||
          (id === "portofino-26-27-jersey" && p.name.startsWith("PORTOFINO")),
      )
export const productLink = (name: string) =>
  `/en/products/${catalog.find((p) => p.name === name)?.id || slug(name)}`
export function localLink(path: string) {
  if (path === "#clubs") return "/en/clubs"
  if (path === "#shop") return "/en/collections/all-products"
  if (path === "#" || path === "https://ezeta.it") return "/en"
  if (path.includes("customer_authentication")) return "/en/account"
  if (path.includes("/search?q=")) {
    const name =
      new URL(path, window.location.origin).searchParams.get("q") || ""
    return productLink(name)
  }
  return path.replace(/^https:\/\/(?:www\.)?ezeta\.it/, "")
}
export function readCart(): CartItem[] {
  try {
    const value = JSON.parse(localStorage.getItem("ezeta-cart") || "[]")
    return Array.isArray(value)
      ? value.filter(
          (item) =>
            item &&
            findProduct(item.id) &&
            typeof item.size === "string" &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            item.quantity <= 99,
        )
      : []
  } catch {
    return []
  }
}

export function CartContents({
  items,
  update,
  navigate,
}: {
  items: CartItem[]
  update: (items: CartItem[]) => void
  navigate: (path: string) => void
}) {
  const total = items.reduce(
    (sum, item) => sum + (findProduct(item.id)?.price || 0) * item.quantity,
    0,
  )
  return (
    <div className="cart-contents">
      {!items.length ? (
        <div className="empty-bag">
          <p>Your bag is empty.</p>
          <a className="button dark" href="/en/collections/all-products">
            EXPLORE THE COLLECTION
          </a>
        </div>
      ) : (
        <>
          {items.map((item, index) => {
            const product = findProduct(item.id)!
            return (
              <article className="cart-line" key={`${item.id}-${item.size}`}>
                <a href={`/en/products/${item.id}`}>
                  <img src={`${product.image}&width=300`} alt={product.name} />
                </a>
                <div>
                  <a href={`/en/products/${item.id}`}>
                    <h3>{product.name}</h3>
                  </a>
                  <p>
                    {item.id === gift.id ? "Value" : "Size"}: {item.size}
                  </p>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() =>
                        update(
                          items.flatMap((line, i) =>
                            i === index
                              ? line.quantity > 1
                                ? [{ ...line, quantity: line.quantity - 1 }]
                                : []
                              : [line],
                          ),
                        )
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      disabled={item.quantity >= 99}
                      onClick={() =>
                        update(
                          items.map((line, i) =>
                            i === index
                              ? {
                                  ...line,
                                  quantity: Math.min(99, line.quantity + 1),
                                }
                              : line,
                          ),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-link"
                    onClick={() => update(items.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
                <strong>€{product.price * item.quantity}</strong>
              </article>
            )
          })}
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>€{total}</strong>
          </div>
          <p className="muted">
            Shipping and taxes are not calculated in this preview.
          </p>
          <button
            className="button dark full-width"
            onClick={() => navigate("/en/checkout")}
          >
            CONTINUE TO DEMO CHECKOUT
          </button>
          <a className="text-link" href="/en/collections/all-products">
            Continue shopping
          </a>
        </>
      )}
    </div>
  )
}
