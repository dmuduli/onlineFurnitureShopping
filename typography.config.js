const {
  colors: { black, red, gray, white },
} = require("./colors.config");
const sans = [
  "'Open Sans'",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  '"Noto Sans"',
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
].join();

const maxWidth = "60vw";

module.exports = {
  default: {
    css: [
      {
        letterSpacing: "0.0125rem",
        maxWidth,
        color: "#000000",
        fontWeight: "400",
        h1: {
          lineHeight: "1.4",
          fontSize: "1.875rem",
          marginBottom: "1.25rem",
          fontWeight: "500",
        },
        h2: {
          fontSize: "2rem",
          lineHeight: "2.75rem",
          marginTop: "0",
          marginBottom: "1.25rem",
          fontWeight: 400,
          textAlign: "left",
        },
        h3: {
          fontSize: "1.625rem",
          lineHeight: "2.25rem",
          marginBottom: "1.25rem",
          textAlign: "left",
        },
        h4: {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          marginBottom: "1.25rem",
          fontWeight: "normal",
        },
        p: {
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
          marginBottom: "0.625rem",
          fontFamily: sans,
        },
        caption: {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          marginBottom: "0.625rem",
          fontFamily: sans,
        },
        "tbody tr, thead tr, tbody td, tbody th, thead td, thead th": {
          textAlign: "left",
          padding: "1rem",
          border: "1px solid #e5e5e5",
        },
        "thead td:first-child, thead th:first-child, tbody th:first-child, tbody td:first-child": {
          padding: "1rem",
        },
        "tbody tr p, thead tr p, tbody td p, thead td p": {
          margin: "0",
        },
        "ul > li": {
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
          marginBottom: "0.625rem",
          fontFamily: sans,
        },
        "ol > li": {
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
          marginBottom: "0.625rem",
          fontFamily: sans,
        },
        img: {
          marginTop: "1rem",
          marginBottom: "1rem",
        },
        ol: {
          counterReset: "none",
        },
        "div ol:first-child": {
          counterReset: "list-counter",
        },
        "ol > li::before": {
          color: black,
        },
        "ul > li::before": {
          backgroundColor: black,
        },
        a: {
          // Commented as https://jira.nagarro.com/browse/SNOOZE-621
          // wordBreak: "break-all",
          color: gray[600],
        },
        "a:hover": {
          color: gray[900],
        },
      },
    ],
  },
  center: {
    css: [
      {
        h1: {
          textAlign: "center",
        },
        h2: {
          textAlign: "center",
        },
        h3: {
          textAlign: "center",
        },
        h4: {
          textAlign: "center",
        },
        h5: {
          textAlign: "center",
        },
        h6: {
          textAlign: "center",
        },
        p: {
          textAlign: "center",
        },
        img: {
          margin: "0 auto",
        },
      },
    ],
  },
  velocity: {
    css: [
      {
        h1: {
          textAlign: "center",
          color: red[800],
          fontWeight: "500",
        },
        h2: {
          textAlign: "center",
          color: red[800],
          fontWeight: "500",
        },
        h3: {
          textAlign: "center",
          color: red[800],
          fontWeight: "500",
        },
        h4: {
          textAlign: "center",
          color: red[800],
          fontWeight: "500",
        },
        h5: {
          textAlign: "center",
          color: red[800],
        },
        h6: {
          textAlign: "center",
          color: red[800],
        },
      },
    ],
  },
  profiler: {
    css: [
      {
        h1: {
          textAlign: "center",
        },
        h2: {
          textAlign: "center",
        },
        h3: {
          textAlign: "center",
        },
        h4: {
          textAlign: "center",
        },
        h5: {
          textAlign: "center",
        },
        h6: {
          textAlign: "center",
        },
        p: {
          textAlign: "center",
        },
        iframe: {
          width: "100%",
          height: "300px",
          margin: "auto",
          marginBottom: "-6px",
        },
        img: {
          margin: "auto",
        },
      },
    ],
  },
  "profiler-lg": {
    css: [
      {
        iframe: {
          width: "70%",
          height: "600px",
          marginBottom: "0",
        },
      },
    ],
  },
  blog: {
    css: [
      {
        h3: {
          marginTop: "1.17rem",
          marginBottom: "0",
          color: gray[600],
        },
        "h3 a": {
          color: gray[600],
        },
        "h3 a:hover": {
          color: gray[900],
        },
        img: {
          marginBottom: "0",
          marginTop: "0",
        },
        "ul.inline-flex > li": {
          paddingLeft: "5px",
        },
        "ul > li::before": {
          display: "none",
        },
        ".with-category-title a h1": {
          marginBottom: "0",
        },
        a: {
          textDecoration: "none",
          color: gray[700],
          // Commented as https://jira.nagarro.com/browse/SNOOZE-621
          // wordBreak: "break-word",
        },
        "a.read-more-button": {
          color: white,
        },
        "a.nuxt-link-active": {
          color: gray[600],
        },
        "a.nuxt-link-exact-active": {
          color: gray[900],
        },
      },
    ],
  },
  static_order: {
    css: [
      {
        "counter-reset": "list-counter",
        ol: {
          "list-style": "none",
        },
        "ol li": {
          "counter-increment": "list-counter",
        },
        "ol li::before": {
          content: `counter(list-counter) ". "`,
        },
      },
    ],
  },
  right: {
    css: [
      {
        h3: {
          textAlign: "right",
          marginTop: "1.25rem",
        },
        "ul > li::before": {
          display: "none",
        },
        a: {
          color: gray[600],
          textDecoration: "none",
        },
      },
    ],
  },
  pdp: {
    css: [
      {
        h2: {
          fontSize: "1.625rem",
          fontWeight: "400",
        },
        p: {
          color: gray[700],
        },
        "p a": {
          margin: 0,
          paddingBottom: 0,
        },
        "ul li a": {
          margin: 0,
          paddingBottom: 0,
        },
        a: {
          fontSize: "0.875rem",
          color: gray[900],
          textDecoration: "none",
          marginTop: "2.1875rem",
          paddingBottom: "0.25rem",
          borderBottom: "2px solid #BFB6AD",
          display: "inline-block",
          lineHeight: "normal",
        },
      },
    ],
  },
  store: {
    css: [
      {
        h1: {
          fontSize: "1.5rem",
          fontWeight: "500",
        },
        h2: {
          fontSize: "1.675rem",
          fontWeight: "500",
        },
        h3: {
          fontSize: "1.5rem",
          fontWeight: "500",
        },
        "ul li a": {
          margin: 0,
          color: gray[900],
        },
        "ul li a:hover": {
          color: gray[900],
        },
        a: {
          color: white,
          textDecoration: "none",
        },
        "a:hover": {
          color: white,
        },
      },
    ],
  },
  latitude: {
    css: [
      {
        h1: {
          fontSize: "1.875rem",
          fontWeight: "500",
        },
        h4: {
          fontSize: "1.375rem",
          fontWeight: "500",
        },
        "ul li a": {
          margin: 0,
          color: gray[900],
        },
        "ul li a:hover": {
          color: gray[900],
        },
        a: {
          color: white,
          textDecoration: "none",
        },
        "a:hover": {
          color: white,
        },
      },
    ],
  },
  pages: {
    css: [
      {
        h1: {
          fontSize: "2.375rem",
          fontWeight: "400",
          lineHeight: "1.368421052631579",
        },
        h2: {
          fontSize: "2rem",
          fontWeight: "400",
          lineHeight: "1.375",
        },
        h3: {
          fontSize: "1.625rem",
          fontWeight: "400",
          lineHeight: "1.384615384615385",
        },
        h4: {
          fontSize: "1.25rem",
          fontWeight: "400",
          lineHeight: "1.4",
        },
        h5: {
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.5",
        },
        h6: {
          fontSize: "0.875rem",
          fontWeight: "400",
          lineHeight: "1",
        },
      },
    ],
  },
};
