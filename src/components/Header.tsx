'use client'

import Image from 'next/image'
import Link from 'next/link'

const LOGO =
  'https://x2i.dev/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-logo-Photoroom-1.png'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <Image src={LOGO} alt="x2i" width={45} height={45} />
        </Link>

        <nav className="nav">
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/project">PROJECT</Link>
          <Link href="/blog">BLOG</Link>
          <Link href="/docs">DOCS</Link>
        </nav>

        <div className="nav-right">
  <button className="globe" aria-label="language">
  
</button>
</div>
      </div>
    </header>
  )
}
