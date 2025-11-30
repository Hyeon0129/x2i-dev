// src/components/Header.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SearchModal from './SearchModal'; 

const LOGO = '/images/logo.png';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false); 

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <Image src={LOGO} alt="Pyron" width={45} height={45} />
          </Link>

          <nav className="nav">
            <Link href="/">HOME</Link>
            <Link href="/#records" scroll={true}>ABOUT</Link>
            <Link href="/#projects" scroll={true}>PROJECT</Link>
            <Link href="/blog">BLOG</Link>
            <Link href="/docs">DOCS</Link>
          </nav>

          <div className="nav-right">
            
            <button
              className="globe"
              aria-label="search"
              onClick={() => setSearchOpen(true)}
            />
          </div>
        </div>
      </header>

      
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}