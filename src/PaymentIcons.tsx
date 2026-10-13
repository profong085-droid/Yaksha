export default function PaymentIcons() {
  return (
    <div className="payments" role="group" aria-label="Accepted payment methods">
      {/* Visa */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visa"
        role="img"
      >
        <title>Visa</title>
        <rect width="40" height="26" rx="4" fill="#FFFFFF" />
        <path
          d="M16.5 17.5H14.1L15.6 7.5H18L16.5 17.5ZM26.4 7.7C25.9 7.5 25.1 7.3 24.1 7.3C21.7 7.3 20 8.5 20 10.3C20 11.6 21.2 12.4 22.1 12.8C23.1 13.3 23.4 13.6 23.4 14.1C23.4 14.8 22.6 15.1 21.8 15.1C20.8 15.1 20.2 14.9 19.5 14.6L19.2 14.5L18.8 16.5C19.5 16.8 20.6 17.1 21.7 17.1C24.3 17.1 26 15.8 26 13.9C26 12.8 25.2 11.9 23.8 11.2C23 10.8 22.5 10.6 22.5 10.1C22.5 9.7 23.1 9.4 24 9.4C24.8 9.4 25.4 9.5 25.9 9.7L26.1 9.8L26.4 7.7ZM31 7.5H29.1C28.4 7.5 28 7.7 27.7 8.3L23.8 17.5H26.3L26.8 16H29.9L30.2 17.5H32.4L31 7.5ZM27.5 14.1L28.7 10.4C28.7 10.4 29 9.3 29.2 8.7L29.4 10.2L30 14.1H27.5ZM12.5 7.5L10.1 14.4L9.8 13.1C9.5 11.7 8.3 10.2 7.1 9.5L9.3 17.5H11.9L15.2 7.5H12.5Z"
          fill="#1434CB"
        />
        <path
          d="M8.7 9.6C7.9 9.6 6.9 9.7 6.1 10L6 10.3C7.6 10.6 9 12 9.6 13.3L10.4 8.9C10.1 8.8 9.4 8.7 8.7 8.7"
          fill="#F9A51A"
        />
      </svg>

      {/* Mastercard */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mastercard"
        role="img"
      >
        <title>Mastercard</title>
        <rect width="40" height="26" rx="4" fill="#FFFFFF" />
        <circle cx="16" cy="13" r="7.5" fill="#EB001B" />
        <circle cx="24" cy="13" r="7.5" fill="#F79E1B" />
        <path
          d="M20 7.3C21.6 8.6 22.7 10.7 22.7 13C22.7 15.3 21.6 17.4 20 18.7C18.4 17.4 17.3 15.3 17.3 13C17.3 10.7 18.4 8.6 20 7.3Z"
          fill="#FF5F00"
        />
      </svg>

      {/* PayPal */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PayPal"
        role="img"
      >
        <title>PayPal</title>
        <rect width="40" height="26" rx="4" fill="#FFFFFF" />
        <path
          d="M15.5 6.5H20.2C22.4 6.5 24 7.6 23.7 9.7C23.4 11.8 21.5 13 19.5 13H17.4L16.3 19.5H13.8L15.5 6.5Z"
          fill="#003087"
        />
        <path
          d="M18 8.8H21.7C23.5 8.8 24.7 9.7 24.4 11.4C24.1 13.2 22.5 14.2 21 14.2H19.2L18.4 19.5H16.5L18 8.8Z"
          fill="#0079C1"
        />
        <path d="M18 14.2L17.3 18.5H19.2L19.9 14.2H18Z" fill="#00457C" />
      </svg>

      {/* Klarna */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Klarna"
        role="img"
      >
        <title>Klarna</title>
        <rect width="40" height="26" rx="4" fill="#FFB3C7" />
        <path
          d="M10 7.5h2.2v11H10V7.5zm5 5.8L19.1 7.5h2.9l-5 6.7 4.4 4.3h-3l-4.4-4.8v4.8H12v-11h2v6.8zm7.2 4.1a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8z"
          fill="#000000"
        />
      </svg>

      {/* Apple Pay */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Apple Pay"
        role="img"
      >
        <title>Apple Pay</title>
        <rect width="40" height="26" rx="4" fill="#FFFFFF" />
        <path
          d="M13.8 10.4c-.4.5-1.1.9-1.7.9-.1-.6.2-1.2.6-1.7.4-.5 1.1-.8 1.6-.8.1.6-.1 1.2-.5 1.6zm.5.9c-.9 0-1.6.6-2 .6-.5 0-1-.6-1.8-.6-.9 0-1.8.6-2.3 1.5-1 1.7-.2 4.3.7 5.7.5.7 1 1.5 1.8 1.5.7 0 1-.5 1.8-.5s1.1.5 1.8.5c.8 0 1.4-.7 1.8-1.5.6-.8.8-1.6.8-1.7-.1 0-1.5-.6-1.5-2.2 0-1.4 1.1-2 1.2-2.1-.7-1-1.7-1.2-2.1-1.2z"
          fill="#000000"
        />
        <path
          d="M18 9.5h2.2c1.5 0 2.5 1 2.5 2.4 0 1.5-1 2.4-2.5 2.4h-1v3.2H18V9.5zm2.1 3.8c.9 0 1.5-.6 1.5-1.4s-.6-1.4-1.5-1.4h-.9v2.8h.9zm4.1 2.6c0-1 .8-1.7 2.2-1.7h1v-.5c0-.7-.5-1-1.3-1-.7 0-1.2.2-1.4.5l-.4-.8c.5-.4 1.2-.6 2-.6 1.4 0 2.1.7 2.1 1.8v3.6h-1v-.8c-.4.6-1 .9-1.7.9-.9 0-1.5-.6-1.5-1.4zm3.2-.8v-.5h-.9c-.8 0-1.3.3-1.3.9 0 .5.5.8 1 .8.7 0 1.2-.5 1.2-1.2zm3.8 4.4l1-3.1-1.9-5.4h1.3l1.2 3.9 1.1-3.9h1.2l-2.8 7.3h-1.1z"
          fill="#000000"
        />
      </svg>

      {/* ABA Bank */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ABA Bank"
        role="img"
      >
        <title>ABA Bank</title>
        <rect width="40" height="26" rx="4" fill="#003B64" />
        <text
          x="18"
          y="17"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="11.5"
          letterSpacing="0.8"
        >
          ABA
        </text>
        <circle cx="33" cy="8" r="2.5" fill="#00B2E2" />
        <text
          x="20"
          y="22"
          textAnchor="middle"
          fill="#00B2E2"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="3.5"
          letterSpacing="0.6"
        >
          BANK
        </text>
      </svg>

      {/* ACLEDA Bank */}
      <svg
        className="payment-icon"
        viewBox="0 0 40 26"
        width="40"
        height="26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ACLEDA Bank"
        role="img"
      >
        <title>ACLEDA Bank</title>
        <rect width="40" height="26" rx="4" fill="#0B2B5C" />
        {/* ACLEDA Golden Emblem */}
        <circle cx="12" cy="13" r="6.8" fill="#C99726" />
        <path
          d="M12 7.5C12.8 8.8 13.5 10 14.8 10.5C13.8 11.2 13 12.2 12.8 13.5C12.5 12.2 11.7 11.2 10.7 10.5C12 10 12.7 8.8 12 7.5Z"
          fill="#0B2B5C"
        />
        <path
          d="M9 13.5C10.5 13.8 11.5 15 12 16.5C12.5 15 13.5 13.8 15 13.5C13.8 13 13 11.8 12.8 10.5C12.5 11.8 11.7 13 9 13.5Z"
          fill="#0B2B5C"
        />
        <text
          x="21"
          y="13.5"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="6.2"
          letterSpacing="0.3"
        >
          ACLEDA
        </text>
        <text
          x="21.5"
          y="18"
          fill="#C99726"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="3.8"
          letterSpacing="0.3"
        >
          BANK
        </text>
      </svg>
    </div>
  )
}
