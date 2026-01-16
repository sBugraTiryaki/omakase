'use client';

import { SITE_NAME, SITE_TAGLINE, NAV_LINKS, CONTACT, OPERATING_HOURS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="section-secondary py-20 px-6"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-2xl mb-4"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
              }}
            >
              {SITE_NAME}
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {SITE_TAGLINE}
            </p>
            <p
              className="text-xs italic"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              お任せ
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              Hours
            </h4>
            <ul className="space-y-4">
              <li>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {OPERATING_HOURS.lunch.label}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {OPERATING_HOURS.lunch.days}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {OPERATING_HOURS.lunch.time}
                </p>
              </li>
              <li>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {OPERATING_HOURS.dinner.label}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {OPERATING_HOURS.dinner.days}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {OPERATING_HOURS.dinner.time}
                </p>
              </li>
              <li>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {OPERATING_HOURS.closed.days} - Closed
                </p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              Contact
            </h4>
            <address className="not-italic space-y-3">
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {CONTACT.address}
                <br />
                {CONTACT.city}
              </p>
              <p>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-sm transition-colors duration-300"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-gold-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm transition-colors duration-300"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-gold-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Reservations required. By appointment only.
          </p>
          <a
            href="https://bugratiryaki.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-300"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-gold-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Design by Bugra Tiryaki
          </a>
        </div>
      </div>
    </footer>
  );
}
