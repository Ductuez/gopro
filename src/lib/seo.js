export function canonical(pathname, base = "https://example.com") {
  const url = new URL(pathname, base)
  return url.toString()
}

export function breadcrumbJsonLd(parts = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: parts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      item: p.href,
    })),
  }
}

export function itemJsonLd({ title, description, url, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    image,
    url,
  }
}
