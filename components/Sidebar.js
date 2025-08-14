import Link from "next/link";
import Script from "next/script";

export default function Sidebar({ posts }) {
  return (
    <aside className="sidebar w-full md:w-1/3">
      {/* Statcounter tracking code */}
      <Script
        id="statcounter-code"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var sc_project = 12681502;
            var sc_invisible = 1;
            var sc_security = "e9d93c5a";
          `,
        }}
      />
      <Script
        src="https://www.statcounter.com/counter/counter.js"
        strategy="afterInteractive"
      />
      <noscript>
        <div className="statcounter">
          <a
            title="Web Analytics"
            href="https://statcounter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="statcounter"
              src="https://c.statcounter.com/12681502/0/e9d93c5a/1/"
              alt="Web Analytics"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
        </div>
      </noscript>

      {/* Recent Posts section */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="mb-3">
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
